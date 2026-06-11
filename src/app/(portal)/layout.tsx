import { Analytics } from "@vercel/analytics/react";
import MicrosoftClarity from "@/components/MicrosoftClarity";

// The portal renders its own chrome (the dark utility bar with the ADMIN
// badge / "Sultanate Administration" / Sign Out, plus the sidebar) inside
// `portal/layout.tsx`. Keeping it out of the `(site)` group means we don't
// stack the public marketing Header + Footer on top of an admin console,
// which was squeezing the dashboard so the stats cards and tables ran
// off the viewport.
export default function PortalGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="flex-1">{children}</main>
      <MicrosoftClarity />
      <Analytics />
    </>
  );
}
