"use client";

import Link from "next/link";
import { useState, useEffect, useCallback } from "react";

const slides = [
  {
    tag: "Authority",
    headline: "The Governing Body of a Nation",
    description:
      "The Sultanate of Amexem — reconstituted October 2020 as the custodial authority for the protection and advancement of the descendants of the Nation of Moab.",
    cta: { label: "Learn More", href: "/about" },
    accent: "var(--gold)",
  },
  {
    tag: "Economics",
    headline: "Build Collective Wealth",
    description:
      "Economic security is not optional. The Sultanate builds cooperative ventures, commercial infrastructure, and institutional wealth from within its own membership.",
    cta: { label: "Support the Mission", href: "/gifting" },
    accent: "var(--cherry-red)",
  },
  {
    tag: "Culture",
    headline: "Our Customs. Our Terms.",
    description:
      "A comprehensive global presentation of our heritage, traditions, and collective identity — ensuring the world engages with our culture on our terms.",
    cta: { label: "Proclaim Your Nationality", href: "/citizenship" },
    accent: "var(--forest-green)",
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[current];

  return (
    <section className="relative bg-[var(--dark-bg)] text-white overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0 transition-all duration-1000"
          style={{
            backgroundImage: `radial-gradient(circle at 30% 50%, ${slide.accent} 0%, transparent 50%)`,
          }}
        />
      </div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-28">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-4 animate-fade-in">
            <div className="h-px w-8" style={{ backgroundColor: slide.accent }} />
            <p
              className="text-xs uppercase tracking-[0.2em] font-semibold transition-colors duration-500"
              style={{ color: slide.accent }}
            >
              {slide.tag}
            </p>
          </div>

          <h1
            key={`headline-${current}`}
            className="text-3xl sm:text-4xl md:text-6xl font-bold leading-[1.1] mb-5 animate-fade-in-up"
          >
            {slide.headline}
          </h1>

          <p
            key={`desc-${current}`}
            className="text-lg text-gray-300 leading-relaxed mb-8 max-w-2xl animate-fade-in-up animate-delay-1"
          >
            {slide.description}
          </p>

          <div className="animate-fade-in-up animate-delay-2">
            <Link
              href={slide.cta.href}
              className="inline-block px-7 py-3.5 bg-[var(--gold)] text-[var(--dark-bg)] font-semibold rounded-md hover:bg-[var(--gold-light)] transition-colors"
            >
              {slide.cta.label}
            </Link>
          </div>
        </div>

        {/* Slide indicators */}
        <div className="flex items-center gap-3 mt-12">
          {slides.map((s, i) => (
            <button
              key={s.tag}
              onClick={() => setCurrent(i)}
              className="group flex items-center gap-2"
              aria-label={`Go to slide ${i + 1}`}
            >
              <div
                className={`h-1 rounded-full transition-all duration-500 ${
                  i === current ? "w-10" : "w-3 group-hover:w-5"
                }`}
                style={{
                  backgroundColor: i === current ? slide.accent : "rgba(255,255,255,0.2)",
                }}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--cherry-red)] via-[var(--gold)] to-[var(--forest-green)]" />
    </section>
  );
}
