import { Resend } from "resend";

/**
 * Form-submission and decision notifications.
 *
 * Setup: provision a Resend account, verify a sending domain (or use the
 * temporary onboarding domain), then set these env vars in Vercel:
 *   - RESEND_API_KEY   — required for emails to actually send
 *   - NOTIFY_FROM      — optional, defaults to onboarding@resend.dev which
 *                        works without a verified domain but is rate-limited
 *                        and may land in spam. Set to a verified sender like
 *                        "Sultanate of Amexem <notifications@sultanateofamexem.com>"
 *                        once the domain is verified.
 *
 * If RESEND_API_KEY is not set, the route still returns 200 and logs the
 * payload so form submissions never fail just because the email side is
 * unconfigured.
 */
const ADMIN_EMAILS = ["sultanateofamexem@gmail.com"];

const FROM_DEFAULT = "Sultanate of Amexem <onboarding@resend.dev>";
const SITE = "https://www.sultanateofamexem.com";

type NotifyKind =
  | "membership_application"
  | "membership_card"
  | "business_certification"
  | "event_rsvp"
  | "asset_inquiry"
  | "service_application"
  | "cooperative_application"
  | "commerce_application"
  | "venture_proposal"
  | "contact"
  | "newsletter_signup"
  | "membership_approved"
  | "membership_rejected";

interface NotifyPayload {
  kind?: NotifyKind;
  name?: string;
  email?: string;
  details?: Record<string, string | null | undefined>;
  // Legacy field kept so older callers don't break before they're migrated.
  surnamePref?: string;
}

const SUBJECT_BY_KIND: Record<NotifyKind, (p: NotifyPayload) => string> = {
  membership_application: (p) => `New Membership Application — ${p.name ?? "Unknown"}`,
  membership_card: (p) => `New Membership Card Request — ${p.name ?? "Unknown"}`,
  business_certification: (p) =>
    `New Business Certification — ${p.details?.business_name ?? p.name ?? "Unknown"}`,
  event_rsvp: (p) =>
    `New Event RSVP — ${p.details?.event_name ?? "event"} — ${p.name ?? "Unknown"}`,
  asset_inquiry: (p) => `New Asset Inquiry — ${p.name ?? "Unknown"}`,
  service_application: (p) =>
    `New Service Application — ${p.details?.provider_name ?? p.name ?? "Unknown"}`,
  cooperative_application: (p) =>
    `New Cooperative Application — ${p.details?.venture_name ?? p.name ?? "Unknown"}`,
  commerce_application: (p) =>
    `New Commerce Application — ${p.details?.business_name ?? p.name ?? "Unknown"}`,
  venture_proposal: (p) =>
    `New Venture Proposal — ${p.details?.proposal_name ?? p.name ?? "Unknown"}`,
  contact: (p) => `Contact Form: ${p.details?.subject ?? "general"} — ${p.name ?? "Unknown"}`,
  newsletter_signup: (p) => `Newsletter signup — ${p.email ?? "Unknown"}`,
  membership_approved: () => `Welcome to the Sultanate of Amexem`,
  membership_rejected: () => `Update on your Sultanate of Amexem application`,
};

function renderAdminBody(payload: NotifyPayload): { text: string; html: string } {
  const lines: string[] = [];
  if (payload.name) lines.push(`Name: ${payload.name}`);
  if (payload.email) lines.push(`Email: ${payload.email}`);
  if (payload.surnamePref) lines.push(`Surname / context: ${payload.surnamePref}`);
  for (const [k, v] of Object.entries(payload.details ?? {})) {
    if (v === null || v === undefined || v === "") continue;
    const label = k
      .replace(/_/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
    lines.push(`${label}: ${v}`);
  }
  lines.push("");
  lines.push(`Submitted: ${new Date().toISOString()}`);

  const text = lines.join("\n");
  const html = `<pre style="font: 14px/1.5 ui-monospace, SFMono-Regular, monospace; white-space: pre-wrap;">${escapeHtml(text)}</pre>`;
  return { text, html };
}

function renderApplicantBody(
  kind: "membership_approved" | "membership_rejected",
  payload: NotifyPayload,
): { text: string; html: string } {
  const name = payload.name?.split(" ")[0] || "Applicant";
  const tier = payload.details?.tier;
  const reason = payload.details?.decision_reason;

  if (kind === "membership_approved") {
    const tierLine = tier
      ? `You have been accepted at the ${tier} tier of the Sultanate.`
      : "You have been accepted as a member of the Sultanate.";

    const text = [
      `Greetings ${name},`,
      "",
      `Your application to the Sultanate of Amexem has been reviewed and approved. ${tierLine}`,
      "",
      "Next steps:",
      `  1. Sign in to the member portal: ${SITE}/portal`,
      "  2. Review the orientation materials and the Constitution.",
      "  3. Attend the next Friday Holy Day Meeting (7:30 PM CST).",
      tier && tier !== "Affiliate"
        ? "  4. Monthly dues information is available on your dashboard."
        : "",
      "",
      "Welcome to the body. Stand in your nationality.",
      "",
      "— The Sultanate of Amexem",
    ]
      .filter(Boolean)
      .join("\n");

    const html = textToHtml(text);
    return { text, html };
  }

  // Rejection
  const reasonBlock = reason
    ? `\nThe review noted: "${reason}"\n`
    : "";

  const text = [
    `Greetings ${name},`,
    "",
    "Thank you for submitting your application to the Sultanate of Amexem. After careful review, your application is not approved at this time.",
    reasonBlock,
    "You are welcome to continue attending Friday meetings as an Affiliate, complete the orientation study, and reapply when you feel called to do so. The path remains open.",
    "",
    `Membership details: ${SITE}/citizenship`,
    "",
    "— The Sultanate of Amexem",
  ]
    .filter(Boolean)
    .join("\n");

  return { text, html: textToHtml(text) };
}

function textToHtml(s: string): string {
  return `<div style="font: 15px/1.6 -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #111; max-width: 560px;">${escapeHtml(s).replace(/\n/g, "<br>")}</div>`;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function isValidEmail(e: string | undefined | null): e is string {
  return typeof e === "string" && /.+@.+\..+/.test(e);
}

export async function POST(request: Request) {
  let payload: NotifyPayload;
  try {
    payload = (await request.json()) as NotifyPayload;
  } catch {
    return Response.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const kind: NotifyKind = payload.kind ?? "membership_application";
  const subjectFn = SUBJECT_BY_KIND[kind] ?? SUBJECT_BY_KIND.membership_application;
  const subject = subjectFn(payload);

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.NOTIFY_FROM ?? FROM_DEFAULT;

  // Decision emails: send to applicant + admin FYI copy.
  // Everything else: admin notification only.
  const isDecision = kind === "membership_approved" || kind === "membership_rejected";

  if (!apiKey) {
    console.warn(
      `[notify] RESEND_API_KEY not set — skipping email send. Subject was: "${subject}"`,
    );
    return Response.json({ ok: true, sent: false, reason: "no_api_key" });
  }

  const resend = new Resend(apiKey);

  try {
    if (isDecision) {
      const applicantEmail = payload.email;
      if (!isValidEmail(applicantEmail)) {
        return Response.json(
          { ok: false, sent: false, error: "invalid_applicant_email" },
          { status: 400 },
        );
      }

      const applicantBody = renderApplicantBody(
        kind as "membership_approved" | "membership_rejected",
        payload,
      );
      const adminBody = renderAdminBody(payload);
      const adminSubject =
        kind === "membership_approved"
          ? `Application APPROVED — ${payload.name ?? applicantEmail}`
          : `Application REJECTED — ${payload.name ?? applicantEmail}`;

      const [applicantResult, adminResult] = await Promise.all([
        resend.emails.send({
          from,
          to: [applicantEmail],
          subject,
          text: applicantBody.text,
          html: applicantBody.html,
          replyTo: ADMIN_EMAILS[0],
        }),
        resend.emails.send({
          from,
          to: ADMIN_EMAILS,
          subject: adminSubject,
          text: adminBody.text,
          html: adminBody.html,
          replyTo: applicantEmail,
        }),
      ]);

      const errors = [applicantResult.error, adminResult.error].filter(Boolean);
      if (errors.length > 0) {
        console.error("[notify] resend error", errors);
        return Response.json(
          { ok: false, sent: false, error: errors.map((e) => e?.message).join("; ") },
          { status: 502 },
        );
      }
      return Response.json({
        ok: true,
        sent: true,
        applicantId: applicantResult.data?.id,
        adminId: adminResult.data?.id,
      });
    }

    // Standard form notification: admin only.
    const { text, html } = renderAdminBody(payload);
    const replyTo = isValidEmail(payload.email) ? payload.email : undefined;
    const result = await resend.emails.send({
      from,
      to: ADMIN_EMAILS,
      subject,
      text,
      html,
      replyTo,
    });
    if (result.error) {
      console.error("[notify] resend error", result.error);
      return Response.json({ ok: false, sent: false, error: result.error.message }, { status: 502 });
    }
    return Response.json({ ok: true, sent: true, id: result.data?.id });
  } catch (err) {
    console.error("[notify] send threw", err);
    return Response.json({ ok: false, sent: false, error: "send_failed" }, { status: 502 });
  }
}
