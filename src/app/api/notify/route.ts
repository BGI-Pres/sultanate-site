const ADMIN_EMAILS = [
  "sultanateofamexem@gmail.com",
  "pres@beygroupintl.com",
  "vp@beygroupintl.com",
  "secretary@beygroupintl.com",
];

export async function POST(request: Request) {
  const { name, email, surnamePref } = await request.json();

  // TODO: Connect email service (Resend, SendGrid, or nodemailer)
  // When connected, send to ADMIN_EMAILS with:
  // Subject: "New Membership Application: {name}"
  // Body: Application received from {name} ({email}), surname preference: {surnamePref}
  //
  // Example with Resend:
  //   import { Resend } from "resend";
  //   const resend = new Resend(process.env.RESEND_API_KEY);
  //   await Promise.all(ADMIN_EMAILS.map((to) =>
  //     resend.emails.send({
  //       from: "notifications@sultanateofamexem.org",
  //       to,
  //       subject: `New Membership Application: ${name}`,
  //       text: `Application received from ${name} (${email}), surname preference: ${surnamePref || "not specified"}`,
  //     })
  //   ));

  console.log(
    `[APPLICATION NOTIFICATION] New application from ${name} (${email}), surname: ${surnamePref || "not specified"}`
  );
  console.log(`[NOTIFICATION] Would send to: ${ADMIN_EMAILS.join(", ")}`);

  return Response.json({ ok: true });
}
