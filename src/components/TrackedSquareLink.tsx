"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import { trackSquareClick } from "@/lib/analytics";

interface TrackedSquareLinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "onClick"> {
  href: string;
  label: string;
  children: ReactNode;
}

export default function TrackedSquareLink({
  href,
  label,
  children,
  target = "_blank",
  rel = "noopener noreferrer",
  ...rest
}: TrackedSquareLinkProps) {
  return (
    <a
      {...rest}
      href={href}
      target={target}
      rel={rel}
      onClick={() => trackSquareClick(label, href)}
    >
      {children}
    </a>
  );
}
