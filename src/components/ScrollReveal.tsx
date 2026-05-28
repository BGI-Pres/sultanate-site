"use client";

import { useEffect } from "react";

export default function ScrollReveal() {
  useEffect(() => {
    // Fallback: if IntersectionObserver isn't supported, show everything immediately
    if (typeof IntersectionObserver === "undefined") {
      document.querySelectorAll(".reveal").forEach((el) => el.classList.add("visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px 0px 0px" }
    );

    const elements = document.querySelectorAll(".reveal");
    elements.forEach((el) => observer.observe(el));

    // Safety net: reveal anything still hidden after 2 seconds
    const timeout = setTimeout(() => {
      document.querySelectorAll(".reveal:not(.visible)").forEach((el) => {
        el.classList.add("visible");
      });
    }, 2000);

    return () => {
      observer.disconnect();
      clearTimeout(timeout);
    };
  }, []);

  return null;
}
