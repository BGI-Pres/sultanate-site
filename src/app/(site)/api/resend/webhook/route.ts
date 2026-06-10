import { createClient } from "@supabase/supabase-js";
import { Webhook } from "svix";

/**
 * Resend webhook endpoint.
 *
 * Setup:
 *   1. In Resend dashboard → Webhooks, add the endpoint
 *      `https://www.sultanateofamexem.com/api/resend/webhook`
 *   2. Subscribe at minimum to `email.bounced`. Optionally `email.delivered`
 *      and `email.complaint` for richer status.
 *   3. Copy the signing secret and set `RESEND_WEBHOOK_SECRET` in Vercel.
 *   4. The route uses `SUPABASE_SERVICE_ROLE_KEY` to update the invites row
 *      out-of-band (no admin session is present on a webhook).
 *
 * Resend uses Svix for signature verification. If the secret isn't set the
 * route still 200s in dev so the platform doesn't retry indefinitely.
 */

type ResendEvent = {
  type: string;
  data?: {
    email_id?: string;
    to?: string | string[];
    bounce?: { message?: string; subType?: string };
    [k: string]: unknown;
  };
};

export async function POST(request: Request) {
  const raw = await request.text();
  const secret = process.env.RESEND_WEBHOOK_SECRET;

  let event: ResendEvent;
  if (secret) {
    try {
      const wh = new Webhook(secret);
      event = wh.verify(raw, {
        "svix-id": request.headers.get("svix-id") ?? "",
        "svix-timestamp": request.headers.get("svix-timestamp") ?? "",
        "svix-signature": request.headers.get("svix-signature") ?? "",
      }) as ResendEvent;
    } catch (err) {
      console.error("[resend-webhook] signature verification failed", err);
      return Response.json({ ok: false, error: "bad_signature" }, { status: 401 });
    }
  } else {
    console.warn("[resend-webhook] RESEND_WEBHOOK_SECRET not set — accepting unverified event");
    try {
      event = JSON.parse(raw) as ResendEvent;
    } catch {
      return Response.json({ ok: false, error: "invalid_json" }, { status: 400 });
    }
  }

  if (event.type !== "email.bounced" && event.type !== "email.complained") {
    return Response.json({ ok: true, ignored: event.type });
  }

  const recipientsRaw = event.data?.to;
  const recipients = Array.isArray(recipientsRaw)
    ? recipientsRaw
    : recipientsRaw
      ? [recipientsRaw]
      : [];
  if (recipients.length === 0) {
    return Response.json({ ok: true, ignored: "no_recipient" });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) {
    console.error("[resend-webhook] supabase env not set");
    return Response.json({ ok: false, error: "server_misconfigured" }, { status: 500 });
  }

  const supabase = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const reason =
    event.data?.bounce?.message ??
    event.data?.bounce?.subType ??
    (event.type === "email.complained" ? "spam_complaint" : "bounced");

  const { error } = await supabase
    .from("invites")
    .update({
      status: "bounced",
      bounce_reason: reason,
      last_activity: new Date().toISOString(),
    })
    .in("email", recipients)
    .is("revoked_at", null);

  if (error) {
    console.error("[resend-webhook] update failed", error);
    return Response.json({ ok: false, error: "update_failed" }, { status: 500 });
  }
  return Response.json({ ok: true, marked: recipients.length });
}
