// Canonical definition of every member tier in the Sultanate.
// Used by the public /citizenship page, the admin members portal,
// and anywhere else tier metadata is rendered.

export interface MemberTier {
  name: string;
  price: string;
  priceNote: string | null;
  shortDescription: string;
  description: string;
  benefits: readonly string[];
  requirements: readonly string[];
  rankUp: { target: string; steps: readonly string[] } | null;
  cta: string;
  featured: boolean;
  requiresDues: boolean;
  requiresCharter: boolean;
  badgeClass: string;
}

export const MEMBER_TIERS = [
  {
    name: "Affiliate",
    price: "Free",
    priceNote: null,
    shortDescription: "Free tier — meeting access, no card, no dues.",
    description:
      "Support the mission. Attend meetings and community events — no card, no dues.",
    benefits: [
      "Virtual & physical meeting access",
      "Community event attendance",
      "Public educational content & study groups",
      "On-site news & press updates",
    ],
    requirements: ["Open to all — no application required"],
    rankUp: {
      target: "Community",
      steps: [
        "Attend meetings consistently for at least 3 months",
        "Complete orientation study: Holy Koran, Divine Constitution & Bylaws, and Moorish Questionnaire",
        "Apply for Community membership",
      ],
    },
    cta: "Join as Affiliate",
    featured: false,
    requiresDues: false,
    requiresCharter: false,
    badgeClass: "bg-gray-100 text-gray-700",
  },
  {
    name: "Community",
    price: "$50",
    priceNote: "per month",
    shortDescription: "Recognized member with voting rights and required dues.",
    description:
      "A recognized member of the Sultanate. Required to attend meetings, pay monthly dues, and participate in community affairs.",
    benefits: [
      "All Affiliate benefits",
      "Official membership card (purchase required)",
      "Newsletter via mail & SMS",
      "Member-only resources & study materials",
      "Voting rights in community decisions",
      "Required meeting attendance",
      "Involvement in community affairs",
    ],
    requirements: [
      "3 months consistent meeting attendance as Affiliate",
      "Completed orientation study (sacred texts & Constitution)",
      "Approved by leadership",
    ],
    rankUp: {
      target: "General",
      steps: [
        "Active Community member for a minimum period",
        "Demonstrated involvement in community affairs",
        "Complete leadership training",
        "Organize a local chapter/temple body",
        "Pay $100 charter registration fee",
      ],
    },
    cta: "Apply Now",
    featured: true,
    requiresDues: true,
    requiresCharter: false,
    badgeClass: "bg-[var(--gold)]/15 text-[var(--gold-dark)]",
  },
  {
    name: "General",
    price: "$50",
    priceNote: "per month + $100 charter registration",
    shortDescription: "Chapter-leadership tier — Grand Body member.",
    description:
      "Part of the Grand Body — the chartered chapter-leadership tier of the Sultanate.",
    benefits: [
      "All Community benefits",
      "Organize & lead a local chapter/temple",
      "Chapter leadership authority",
      "Expanded resources & incentive programs",
      "Local representation & member recruiting",
      "Leadership development & mentorship access",
    ],
    requirements: [
      "Active Community member with demonstrated involvement",
      "Leadership training completed",
      "Organized a local chapter/temple body",
    ],
    rankUp: {
      target: "Lead",
      steps: [
        "Maintain an active chapter with regular attendance",
        "Secure a physical location for your body",
        "Receive leadership approval",
        "Pay $100 charter registration fee",
      ],
    },
    cta: "Apply Now",
    featured: false,
    requiresDues: true,
    requiresCharter: true,
    badgeClass: "bg-blue-50 text-blue-700",
  },
  {
    name: "Lead",
    price: "$50",
    priceNote: "per month + $100 charter registration",
    shortDescription: "Senior operational leadership — chartered body with a physical location.",
    description:
      "Senior operational leadership — established bodies with regional reach and advisory access.",
    benefits: [
      "All General benefits",
      "Established body with a physical location",
      "Lead meetings & mentor members",
      "Regional operational decision-making",
      "Priority communications & direct advisory access",
    ],
    requirements: [
      "Active chapter as General member",
      "Physical location established for your body",
      "Leadership approval",
    ],
    rankUp: null,
    cta: "Apply Now",
    featured: false,
    requiresDues: true,
    requiresCharter: true,
    badgeClass: "bg-purple-50 text-purple-700",
  },
] as const satisfies readonly MemberTier[];

export type MemberTierName = (typeof MEMBER_TIERS)[number]["name"];

export const MEMBER_TIER_NAMES: readonly MemberTierName[] = MEMBER_TIERS.map(
  (t) => t.name,
);

export function getTier(name: string | null | undefined): MemberTier | undefined {
  return MEMBER_TIERS.find((t) => t.name === name);
}

// Format the price for inline display (dropdown options, badges).
export function tierPriceLabel(tier: MemberTier): string {
  return tier.priceNote ? `${tier.price}/${tier.priceNote.replace(/^per\s+/, "")}` : tier.price;
}
