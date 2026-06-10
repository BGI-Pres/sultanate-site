import type { Metadata } from "next";
import InviteClient from "./InviteClient";

export const metadata: Metadata = {
  title: "An Invitation to Enroll — Sultanate of Amexem",
  description:
    "You have been invited to enroll as a member of the Sultanate of Amexem — custodial governing authority for the descendants of the Nation of Moab. Proclaim your nationality.",
  robots: { index: false, follow: false },
};

export default function InvitePage() {
  return <InviteClient />;
}
