"use client";

// Variants persist for a session via localStorage to keep the same user in the same variant
export function getVariant(testName: string, variants: string[]): string {
  if (typeof window === "undefined") return variants[0];

  const storageKey = `ab_${testName}`;
  const existing = window.localStorage.getItem(storageKey);

  if (existing && variants.includes(existing)) {
    return existing;
  }

  const chosen = variants[Math.floor(Math.random() * variants.length)];
  window.localStorage.setItem(storageKey, chosen);

  // Fire GA4 event so we can see which variant each user is in
  if (typeof window.gtag === "function") {
    window.gtag("event", "ab_test_assigned", {
      test_name: testName,
      variant: chosen,
    });
  }

  return chosen;
}
