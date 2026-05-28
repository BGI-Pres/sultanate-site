import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Frequently Asked Questions — Sultanate of Amexem",
  description:
    "Sultanate of Amexem FAQ: Moorish American questions, Nation of Moab, Noble Drew Ali, membership, dues, meetings, cooperative economics answered here.",
  alternates: { canonical: "/faq" },
};

type QA = { q: string; a: string };

const aboutQAs: QA[] = [
  {
    q: "What is the Sultanate of Amexem?",
    a: "The Sultanate of Amexem is the custodial governing authority for the descendants of the Nation of Moab, modernly identified as Moorish American. It exists to protect Moorish American nationality, preserve heritage, and coordinate cooperative economic and civic life among its members.",
  },
  {
    q: "When was the Sultanate of Amexem founded?",
    a: "The Sultanate was reconstituted in October 2020 under the House of Simmons Bey. This was a restoration of a governing authority rooted in the lineage of Noble Drew Ali and the Moorish Science Temple of America — not the founding of a new organization.",
  },
  {
    q: "Where is the Sultanate of Amexem based?",
    a: "The Sultanate operates across Amexem (the Americas) with members and lodges throughout the continental United States. Administrative coordination is centralized through the Sultanate's offices, while local community activity takes place through regional chapters and trade circles.",
  },
  {
    q: "Who leads the Sultanate of Amexem?",
    a: "The Sultanate is led by the House of Simmons Bey, which reconstituted the governing authority in 2020. Day-to-day operations are coordinated through ministries and councils that report through a defined chain of governance.",
  },
  {
    q: "Is the Sultanate of Amexem a religion?",
    a: "No. The Sultanate is a nationality and governing body, not a religious denomination. It honors the principles taught by Noble Drew Ali — Love, Truth, Peace, Freedom, and Justice — but membership is rooted in nationality and lineage rather than religious doctrine.",
  },
];

const heritageQAs: QA[] = [
  {
    q: "Who is Noble Drew Ali?",
    a: "Noble Drew Ali (1886–1929) was the prophet and founder of the Moorish Science Temple of America. He restored the nationality of the so-called Negro by proclaiming them Moorish American — descendants of the ancient Moabites — and established the institutional framework that underpins Moorish American life today.",
  },
  {
    q: "What is the Moorish Science Temple of America (MSTA)?",
    a: "The MSTA was founded by Noble Drew Ali in 1925 as the institutional vehicle for Moorish American nationality, faith, and self-governance. It introduced the surnames Bey and El, codified the principles of Moorish life, and provided the foundation upon which the Sultanate of Amexem stands.",
  },
  {
    q: "What is the Nation of Moab?",
    a: "The Nation of Moab refers to the ancient nation from which Moorish Americans descend. Noble Drew Ali restored this identity in the modern era, teaching that the people commonly labeled Negro, Black, or African American are in fact the heirs of Moab — a sovereign nation with its own history, lineage, and law.",
  },
  {
    q: "Who are Moorish Americans?",
    a: "Moorish Americans are the descendants of the Nation of Moab living in Amexem (the Americas). They carry the surnames Bey and El, claim their nationality through proclamation, and inherit the lineage restored by Noble Drew Ali through the Moorish Science Temple of America.",
  },
  {
    q: "What do the surnames Bey and El mean?",
    a: "Bey and El are ancestral surnames that mark Moorish American nationality. They identify the bearer as a free national descendant of Moab, restored through the work of Noble Drew Ali, and are taken on through proclamation as part of reclaiming one's true heritage.",
  },
];

const membershipQAs: QA[] = [
  {
    q: "How do I become a member?",
    a: "Begin by submitting an application through the Sultanate's apply page. Applicants are reviewed by the membership council and, once accepted, are inducted at the Initiate tier before progressing through the membership pathway.",
  },
  {
    q: "What are the membership tiers?",
    a: "Membership progresses through clearly defined tiers — typically Initiate, Citizen, and Community member — with additional standing for those who hold office or lead trade circles. Each tier carries its own rights, responsibilities, and expectations within the Sultanate.",
  },
  {
    q: "Is there a fee to join?",
    a: "There is a one-time application and processing contribution required at the time of application. This covers administrative review, onboarding materials, and the initial enrollment of the new member into the Sultanate's rolls.",
  },
  {
    q: "What are monthly dues?",
    a: "Members in good standing contribute modest monthly dues that fund the Uplifting Fund, member services, events, and the day-to-day operation of the Sultanate. Dues amounts scale with tier and are kept deliberately accessible.",
  },
  {
    q: "How long does it take to become a Community member?",
    a: "The typical pathway from Initiate to Community member takes several months of consistent participation, attendance at meetings, and demonstrated alignment with Sultanate principles. There is no single fixed timeline — advancement reflects engagement, character, and standing.",
  },
  {
    q: "Do I need to be Moorish American to attend meetings?",
    a: "Public events and select educational meetings are open to all who approach in good faith. Internal governance meetings, ceremonies, and member-only programming are reserved for proclaimed Moorish Americans in good standing with the Sultanate.",
  },
];

const meetingsQAs: QA[] = [
  {
    q: "When are meetings held?",
    a: "General community meetings are held on a recurring monthly schedule, with additional working sessions, classes, and trade circles convened throughout the month. A current calendar is published on the events page.",
  },
  {
    q: "Are meetings open to the public?",
    a: "Designated public meetings are open to non-members who wish to learn about the Sultanate and Moorish American heritage. Internal governance, ritual, and member-only sessions are closed to the general public.",
  },
  {
    q: "How do I RSVP for a meeting?",
    a: "RSVPs are submitted through the events page, where each meeting lists its date, location, format, and registration link. Members in good standing may also RSVP through the member portal.",
  },
  {
    q: "What is the Business Mastermind?",
    a: "The Business Mastermind is a member-only working group focused on cooperative economics, business formation, and peer accountability among Moorish American entrepreneurs. Members workshop ventures, share resources, and coordinate trade through this circle.",
  },
];

const economicsQAs: QA[] = [
  {
    q: "What is the Uplifting Fund?",
    a: "The Uplifting Fund is the Sultanate's cooperative capital pool, funded by member dues and contributions. It is deployed to support member businesses, community development, mutual aid, and the institutional growth of the Sultanate.",
  },
  {
    q: "How do I get business certification?",
    a: "Members who own businesses may apply for Sultanate certification through the certify page. Certification requires review of the business, agreement to the Sultanate's standards of trade, and placement within the Sultanate's directory and trade network.",
  },
  {
    q: "What is the Sultanate's trade network?",
    a: "The trade network is the coordinated economic circle of certified Moorish American businesses operating under the Sultanate's standards. Members trade with one another preferentially, building cooperative economic strength within the nation.",
  },
  {
    q: "What is Bey Group International?",
    a: "Bey Group International is the commercial arm associated with the Sultanate's economic activity. It coordinates large-scale trade, partnerships, and ventures that extend the Sultanate's economic footprint beyond the member-to-member trade network.",
  },
];

const categories: { id: string; label: string; heading: string; items: QA[] }[] = [
  { id: "about", label: "About the Sultanate", heading: "About the Sultanate", items: aboutQAs },
  { id: "heritage", label: "Heritage & History", heading: "Heritage & History", items: heritageQAs },
  { id: "membership", label: "Membership", heading: "Membership", items: membershipQAs },
  { id: "events", label: "Events & Meetings", heading: "Events & Meetings", items: meetingsQAs },
  { id: "economics", label: "Economics", heading: "Cooperative Economics", items: economicsQAs },
];

function CategorySection({
  id,
  label,
  heading,
  items,
  dark = false,
}: {
  id: string;
  label: string;
  heading: string;
  items: QA[];
  dark?: boolean;
}) {
  return (
    <section
      id={id}
      className={
        dark
          ? "py-12 md:py-20 bg-[var(--dark-bg)] arabesque-pattern dark-gradient-radial scroll-mt-24"
          : "py-12 md:py-20 scroll-mt-24"
      }
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px w-12 bg-[var(--gold)]" />
          <span className="text-xs uppercase tracking-[0.2em] text-[var(--gold)] font-semibold">
            {label}
          </span>
          <div className="h-px w-12 bg-[var(--gold)]" />
        </div>
        <h2
          className={
            dark
              ? "text-2xl md:text-3xl font-bold text-white mb-8"
              : "text-2xl md:text-3xl font-bold text-[var(--gray-900)] mb-8"
          }
        >
          {heading}
        </h2>
        <div className="space-y-6">
          {items.map((item) => (
            <article key={item.q} className={dark ? "border-b border-white/10 pb-6 last:border-0" : "border-b border-[var(--gray-200)] pb-6 last:border-0"}>
              <h3
                className={
                  dark
                    ? "font-semibold text-white mb-2"
                    : "font-semibold text-[var(--gray-900)] mb-2"
                }
              >
                {item.q}
              </h3>
              <p
                className={
                  dark
                    ? "text-white/70 leading-relaxed text-[15px]"
                    : "text-[var(--gray-700)] leading-relaxed text-[15px]"
                }
              >
                {item.a}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function FAQPage() {
  const allQAs: QA[] = categories.flatMap((c) => c.items);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allQAs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <>
      {/* ── Hero ── */}
      <section className="bg-[var(--dark-bg)] arabesque-pattern dark-gradient-radial py-12 md:py-20 border-b-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-px w-16 bg-[var(--gold)] mb-6" />
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-white/70 max-w-3xl leading-relaxed">
            Answers to the most common questions about the Sultanate of
            Amexem, Moorish American heritage, membership, meetings, and
            cooperative economics. If your question isn&apos;t covered here,{" "}
            <Link
              href="/contact"
              className="text-[var(--gold)] hover:text-[var(--gold-light)] underline underline-offset-4"
            >
              reach out directly
            </Link>
            .
          </p>
        </div>
      </section>
      <div className="gold-divider" />

      {/* ── Quick links ── */}
      <section className="py-10 md:py-12 bg-[var(--gray-50)] border-b border-[var(--gray-200)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-[var(--gold)]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[var(--gold)] font-semibold">
              Jump to a Section
            </span>
            <div className="h-px w-12 bg-[var(--gold)]" />
          </div>
          <nav aria-label="FAQ categories" className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                className="inline-flex items-center px-4 py-2 rounded-full border border-[var(--gray-300)] bg-white text-sm font-medium text-[var(--gray-900)] hover:border-[var(--gold)] hover:text-[var(--gold-dark)] transition-colors"
              >
                {cat.label}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* ── Category sections ── */}
      <CategorySection
        id={categories[0].id}
        label={categories[0].label}
        heading={categories[0].heading}
        items={categories[0].items}
      />
      <CategorySection
        id={categories[1].id}
        label={categories[1].label}
        heading={categories[1].heading}
        items={categories[1].items}
        dark
      />
      <CategorySection
        id={categories[2].id}
        label={categories[2].label}
        heading={categories[2].heading}
        items={categories[2].items}
      />
      <CategorySection
        id={categories[3].id}
        label={categories[3].label}
        heading={categories[3].heading}
        items={categories[3].items}
        dark
      />
      <CategorySection
        id={categories[4].id}
        label={categories[4].label}
        heading={categories[4].heading}
        items={categories[4].items}
      />

      {/* ── Related links ── */}
      <section className="py-12 md:py-16 bg-[var(--gray-50)] border-t border-[var(--gray-200)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-[var(--gold)]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[var(--gold)] font-semibold">
              Learn More
            </span>
            <div className="h-px w-12 bg-[var(--gold)]" />
          </div>
          <h2 className="text-2xl font-bold text-[var(--gray-900)] mb-6">
            Continue exploring the Sultanate
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[15px]">
            <li>
              <Link href="/about" className="text-[var(--gray-900)] hover:text-[var(--gold-dark)] underline underline-offset-4">
                About the Sultanate
              </Link>
            </li>
            <li>
              <Link href="/noble-drew-ali" className="text-[var(--gray-900)] hover:text-[var(--gold-dark)] underline underline-offset-4">
                Noble Drew Ali &amp; the MSTA
              </Link>
            </li>
            <li>
              <Link href="/moorish-american" className="text-[var(--gray-900)] hover:text-[var(--gold-dark)] underline underline-offset-4">
                Moorish American heritage
              </Link>
            </li>
            <li>
              <Link href="/citizenship" className="text-[var(--gray-900)] hover:text-[var(--gold-dark)] underline underline-offset-4">
                Citizenship &amp; nationality
              </Link>
            </li>
            <li>
              <Link href="/apply" className="text-[var(--gray-900)] hover:text-[var(--gold-dark)] underline underline-offset-4">
                Apply for membership
              </Link>
            </li>
            <li>
              <Link href="/events" className="text-[var(--gray-900)] hover:text-[var(--gold-dark)] underline underline-offset-4">
                Upcoming events &amp; meetings
              </Link>
            </li>
            <li>
              <Link href="/economics" className="text-[var(--gray-900)] hover:text-[var(--gold-dark)] underline underline-offset-4">
                Cooperative economics
              </Link>
            </li>
            <li>
              <Link href="/certify" className="text-[var(--gray-900)] hover:text-[var(--gold-dark)] underline underline-offset-4">
                Business certification
              </Link>
            </li>
          </ul>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="bg-[var(--dark-bg)] arabesque-pattern dark-gradient-radial py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="h-px w-16 bg-[var(--gold)] mb-6 mx-auto" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Still have questions?
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto mb-8 leading-relaxed text-[15px]">
            If your question wasn&apos;t answered here, reach out to the
            Sultanate directly. A member of our council will respond.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-[var(--gold)] text-[var(--dark-bg)] font-semibold hover:bg-[var(--gold-light)] transition-colors"
          >
            Contact the Sultanate
          </Link>
        </div>
      </section>

      {/* ── JSON-LD FAQPage schema ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
