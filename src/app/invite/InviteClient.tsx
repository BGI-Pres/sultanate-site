"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import EnrollmentForm from "@/components/EnrollmentForm";
import styles from "./invite.module.css";

/* ── Data ── */
const PRINCIPLES = ["Love", "Truth", "Peace", "Freedom", "Justice"];

const PILLARS = [
  {
    title: "Nationality & Standing",
    desc: "Formal identity under the custodianship of the Sultanate — documentation, constitutional protections, and proclaimed standing.",
    items: ["Official identification", "Constitutional protections", "Proclaimed nationality status"],
    icon: "M3 21V7l9-4 9 4v14M3 21h18M9 21V11h6v10",
  },
  {
    title: "Economic Security",
    desc: "A nation that does not control its economics controls nothing. Cooperative commerce and ventures born from our own membership.",
    items: ["Cooperative commercial ventures", "Collective business network", "Institutional development"],
    icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    title: "Culture & Presence",
    desc: "Our customs and culture presented to the world on our terms — ensuring our heritage is recognized and preserved for generations.",
    items: ["Global cultural presentation", "Heritage preservation", "Community network"],
    icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
  },
];

const HOW = [
  {
    h: "Submit your application",
    p: "Complete the membership application below — your details, heritage, intent, and affirmation of the five principles.",
  },
  {
    h: "Council review",
    p: "The Supreme Grand Council reviews each application. Estimated review time is two to four weeks.",
  },
  {
    h: "Orientation & welcome",
    p: "Upon acceptance you are invited to New Members Orientation, covering the sacred texts and the Constitution.",
  },
];

/* ── Cinematic intro overlay ── */
function IntroOverlay({
  inviter,
  phase,
  onSkip,
}: {
  inviter: string;
  phase: "in" | "out" | "done";
  onSkip: () => void;
}) {
  if (phase === "done") return null;
  return (
    <div
      className={`${styles.intro} ${phase === "out" ? styles.introOut : styles.introIn}`}
      onClick={onSkip}
      role="presentation"
      aria-hidden="true"
    >
      <div className={styles.introPat} />
      <div className={styles.introGlow} />
      <div className={styles.introStack}>
        <div className={styles.introEmblemWrap}>
          <span className={styles.introRing} />
          <span className={`${styles.introRing} ${styles.introRing2}`} />
          <Image
            src="/images/emblem.svg"
            alt="Sultanate of Amexem seal"
            width={132}
            height={132}
            className={styles.introEmblem}
            priority
          />
        </div>
        <p className={styles.introEyebrow}>
          {inviter ? "You have received" : "You are cordially invited"}
        </p>
        <h2 className={styles.introTitle}>An Invitation</h2>
        <div className={styles.introRule} />
        <p className={styles.introSub}>
          {inviter ? (
            <>
              Extended to you by <strong>{inviter}</strong>
            </>
          ) : (
            "Sultanate of Amexem · Custodian of the Nation of Moab"
          )}
        </p>
        <p className={styles.introSkip}>Tap to enter</p>
      </div>
    </div>
  );
}

/* ── Main client component ── */
export default function InviteClient() {
  const [inviter, setInviter] = useState("");
  const [code, setCode] = useState("");
  const [intro, setIntro] = useState<"in" | "out" | "done">("in");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setInviter((params.get("inviter") || "").trim());
    setCode((params.get("code") || "").trim());

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const holdMs = reducedMotion ? 900 : 3000;
    const t1 = setTimeout(() => setIntro("out"), holdMs);
    const t2 = setTimeout(() => setIntro("done"), holdMs + 800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  function skipIntro() {
    setIntro("out");
    setTimeout(() => setIntro("done"), 650);
  }

  function scrollTo(id: string) {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 16, behavior: "smooth" });
    }
  }

  return (
    <>
      <IntroOverlay inviter={inviter} phase={intro} onSkip={skipIntro} />

      {/* ═══════════ HERO ═══════════ */}
      <div className={styles.hero}>
        <div className={styles.utilityBar}>
          <div className={styles.wrap}>
            <span className={styles.utilityText}>Reconstituted October 2020</span>
            <a
              className={styles.utilityLink}
              href="#enroll"
              onClick={(e) => { e.preventDefault(); scrollTo("enroll"); }}
            >
              Member Portal
            </a>
          </div>
        </div>

        <div className={styles.heroPat} aria-hidden="true" />
        <div className={styles.heroGlow} aria-hidden="true" />

        <div className={styles.heroInner}>
          <div className={styles.inviteToken}>
            <span className={styles.dot} />
            <span className={styles.tokenTxt}>
              {inviter ? (
                <>You have been invited by <strong>{inviter}</strong></>
              ) : (
                <>A personal invitation to <strong>enroll</strong></>
              )}
            </span>
          </div>

          <Image
            src="/images/emblem.svg"
            alt="Sultanate of Amexem emblem"
            width={116}
            height={116}
            className={styles.heroEmblem}
            priority
          />

          <h1 className={styles.heroH1}>
            Proclaim Your <em className={styles.accent}>Nationality</em>
          </h1>

          <p className={styles.heroLead}>
            You are invited to enroll as a member of the Sultanate of Amexem &mdash; the
            custodial governing authority for the descendants of the Nation of Moab,
            modernly identified as Moorish American. Standing, economic security, and
            heritage &mdash; secured from within our own membership.
          </p>

          <div className={styles.heroCta}>
            <a
              className={styles.btnGold}
              href="#enroll"
              onClick={(e) => { e.preventDefault(); scrollTo("enroll"); }}
            >
              Begin Enrollment <span aria-hidden="true">→</span>
            </a>
            <a
              className={styles.btnOutlineLight}
              href="#learn"
              onClick={(e) => { e.preventDefault(); scrollTo("learn"); }}
            >
              What membership secures
            </a>
          </div>

          <div className={styles.heroFoot}>
            <span>Chicago, Illinois</span>
            <span className={styles.sep} aria-hidden="true" />
            <span>House of Simmons Bey</span>
            {code && (
              <>
                <span className={styles.sep} aria-hidden="true" />
                <span className={styles.invitationCode}>Invitation {code}</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ═══════════ PRINCIPLES BAND ═══════════ */}
      <div className={styles.principles}>
        <div className={styles.wrap}>
          <div className={styles.principlesRow}>
            {PRINCIPLES.map((p, i) => (
              <div className={styles.principle} key={p}>
                <span className={styles.principleNum}>{String(i + 1).padStart(2, "0")}</span>
                <span className={styles.principleName}>{p}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════ PILLARS ═══════════ */}
      <section className={`${styles.section} ${styles.sectionLight}`} id="learn">
        <div className={styles.wrap}>
          <div className={styles.sectionHead}>
            <div className={`${styles.eyebrow} ${styles.eyebrowCenter}`}>
              <span className={styles.eyebrowLine} />
              <span className={styles.eyebrowText}>What Membership Secures</span>
              <span className={styles.eyebrowLine} />
            </div>
            <h2>Nationality Is the Order of the Day</h2>
            <p>
              Without nationality, there is no standing, no protection, no commerce.
              The Sultanate secures all three.
            </p>
          </div>

          <div className={styles.pillars}>
            {PILLARS.map((pl) => (
              <div className={styles.pillar} key={pl.title}>
                <div className={styles.chip}>
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width={28} height={28} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={pl.icon} />
                  </svg>
                </div>
                <h3>{pl.title}</h3>
                <p>{pl.desc}</p>
                <ul>
                  {pl.items.map((it) => (
                    <li key={it}>
                      <span className={styles.bullet} aria-hidden="true" />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ CONSTITUTION QUOTE ═══════════ */}
      <section className={`${styles.section} ${styles.sectionDark}`}>
        <div className={`${styles.wrapNarrow} ${styles.quoteBlock}`}>
          <blockquote>
            &ldquo;We, the Moorish American people of the Sultanate of Amexem &mdash; descendants
            and successors in interest to the ancient Nation of Moab &mdash; gather in
            fidelity to the principles of Love, Truth, Peace, Freedom, and Justice,
            and in reverence to Allah, the Most High.&rdquo;
          </blockquote>
          <div className={styles.quoteDivider} />
          <p className={styles.quoteCite}>
            From the Constitution of the Sultanate of Amexem &mdash; Chicago, Illinois
          </p>
        </div>
      </section>

      {/* ═══════════ HOW IT WORKS ═══════════ */}
      <section className={`${styles.section} ${styles.sectionLight}`}>
        <div className={styles.wrap}>
          <div className={styles.sectionHead}>
            <div className={`${styles.eyebrow} ${styles.eyebrowCenter}`}>
              <span className={styles.eyebrowLine} />
              <span className={styles.eyebrowText}>The Path to Membership</span>
              <span className={styles.eyebrowLine} />
            </div>
            <h2>How Enrollment Works</h2>
          </div>

          <div className={styles.steps}>
            {HOW.map((s, i) => (
              <div className={styles.howStep} key={s.h}>
                <div className={styles.stepIdx}>{String(i + 1).padStart(2, "0")}</div>
                <h4>{s.h}</h4>
                <p>{s.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ ENROLLMENT FORM ═══════════ */}
      <section className={styles.enrollSection} id="enroll">
        <div className={styles.wrap}>
          <div className={styles.sectionHead} style={{ marginBottom: 38 }}>
            <div className={`${styles.eyebrow} ${styles.eyebrowCenter}`}>
              <span className={styles.eyebrowLine} />
              <span className={styles.eyebrowText}>Enroll Now</span>
              <span className={styles.eyebrowLine} />
            </div>
            <h2>Begin Your Membership Application</h2>
            <p>Complete the application below. Your information is used for membership processing only.</p>
          </div>
          <EnrollmentForm inviter={inviter} code={code} />
        </div>
      </section>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer className={styles.foot}>
        <div className={styles.wrap}>
          <Image
            src="/images/emblem.svg"
            alt=""
            width={48}
            height={48}
            className={styles.footEmblem}
          />
          <p className={styles.footName}>Sultanate of Amexem</p>
          <p className={styles.footTag}>Custodian of the Nation of Moab</p>
          <p className={styles.footMeta}>
            Chicago, Illinois &middot; Reconstituted October 2020 &middot; House of Simmons Bey
            <br />
            sultanateofamexem.com
          </p>
        </div>
      </footer>
    </>
  );
}
