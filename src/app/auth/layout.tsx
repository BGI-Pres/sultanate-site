import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication",
  description:
    "Sign in or register for the Sultanate of Amexem Citizen Portal.",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
