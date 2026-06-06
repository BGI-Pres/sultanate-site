import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { createClient } from "@/lib/supabase-client";

/**
 * Returns `raw` if it's a safe same-origin relative path; otherwise returns
 * the fallback. Blocks absolute URLs (http://, javascript:), protocol-relative
 * URLs (//evil.com), and backslash tricks (/\evil.com).
 *
 * Use anywhere a user-supplied redirect target enters a router.push or
 * NextResponse.redirect to prevent open-redirect attacks.
 */
export function safeRelativePath(
  raw: string | null | undefined,
  fallback: string = "/portal",
): string {
  if (!raw) return fallback;
  if (!raw.startsWith("/")) return fallback;
  if (raw.startsWith("//") || raw.startsWith("/\\")) return fallback;
  return raw;
}

/**
 * Sign out and bounce to the home page. Used by the Header utility bar,
 * the portal layout's top bar, and the portal dashboard's heading button so
 * sign-out behavior stays identical across all three entry points.
 */
export async function signOutAndRedirect(router: AppRouterInstance): Promise<void> {
  const supabase = createClient();
  await supabase.auth.signOut();
  router.push("/");
  router.refresh();
}
