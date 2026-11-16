import { useId, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/components/triangle/gsapSetup";
import { useEffect } from "react";

const FAQS = [
  {
    q: "Will the land be registered in my name?",
    a: "Yes. The ownership structure and registration process will be clearly explained as per the selected investment plan and applicable legal framework.",
  },
  {
    q: "Who manages the plantation?",
    a: "Redwood Biotech's professional plantation management team handles cultivation, irrigation, nutrition, monitoring, and overall maintenance throughout the investment tenure.",
  },
  {
    q: "What is biotechnology?",
    a: "Biotechnology is the use of scientific plant selection and advanced cultivation techniques to develop healthier, faster-growing, and higher-quality plantations. It's the same science behind hybrid tomatoes, tissue-culture cauliflower, and disease-resistant crops.",
  },
  {
    q: "Can I visit the project site?",
    a: "Yes. Investors can visit the project site by scheduling a visit with the Redwood Biotech team. Transparency is a core principle — you are always welcome to see your investment in person.",
  },
  {
    q: "How are returns generated?",
    a: "The investment is designed around two long-term value drivers: land appreciation (as surrounding areas develop) and the growth in value of premium teak timber as the trees mature.",
  },
  {
    q: "Is my investment backed by a real asset?",
    a: "Yes. Redwood Biotech investments are backed by tangible land and professionally managed plantations — physical assets you can visit and verify.",
  },
  {
    q: "What happens when the timber is harvested?",
    a: "After harvesting and sale, profits are distributed according to the terms of the selected investment plan. The entire process is managed by Redwood Biotech's team.",
  },
  {
    q: "Are there any hidden charges?",
    a: "No. All applicable costs are disclosed transparently before investment. What you see is what you agree to.",
  },
];

function LeafSvg({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 64"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M24 4C12 16 4 30 8 48c2 8 8 12 16 12s14-4 16-12c4-18-4-32-16-44Z"
        fill="currentColor"
        opacity="0.12"
      />
      <path
        d="M24 4C12 16 4 30 8 48c2 8 8 12 16 12s14-4 16-12c4-18-4-32-16-44Z"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.2"
        fill="none"
      />
      <path d="M24 14v40" stroke="currentColor" strokeWidth="1" opacity="0.15" />
      <path d="M24 24c-6 2-10 6-12 10" stroke="currentColor" strokeWidth="0.8" opacity="0.12" />
      <path d="M24 32c6 2 10 5 11 9" stroke="currentColor" strokeWidth="0.8" opacity="0.12" />
    </svg>
  );
}

export function UrbanFarmerFaq() {
  const rootRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<number | null>(null);
  const uid = useId().replace(/:/g, "");

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      gsap.from(root.querySelector(".uf-faq__header"), {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: root, start: "top 80%", once: true },
      });
      gsap.from(root.querySelectorAll(".uf-faq__item"), {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: root.querySelector(".uf-faq__list"), start: "top 85%", once: true },
      });
      gsap.from(root.querySelectorAll(".uf-faq__leaf"), {
        opacity: 0,
        scale: 0.6,
        rotation: -20,
        duration: 1.2,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: { trigger: root, start: "top 75%", once: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="uf-faq" aria-labelledby="uf-faq-title">
      {/* Decorative leaves */}
      <LeafSvg className="uf-faq__leaf uf-faq__leaf--tl" />
      <LeafSvg className="uf-faq__leaf uf-faq__leaf--tr" />
      <LeafSvg className="uf-faq__leaf uf-faq__leaf--bl" />
      <LeafSvg className="uf-faq__leaf uf-faq__leaf--br" />

      <div className="uf-faq__inner">
        <header className="uf-faq__header">
          <p className="uf-faq__eyebrow">
            <span className="uf-faq__rule" aria-hidden="true" />
            For City People
          </p>
          <h2 id="uf-faq-title" className="uf-faq__title">
            Questions from <em>Urban Farmers.</em>
          </h2>
          <p className="uf-faq__subtitle">
            Everything you need to know — answered honestly.
          </p>
        </header>

        <div className="uf-faq__list">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className={`uf-faq__item ${isOpen ? "is-open" : ""}`}
              >
                <h3>
                  <button
                    type="button"
                    id={`${uid}-q${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`${uid}-a${i}`}
                    className="uf-faq__q"
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span className="uf-faq__num">{String(i + 1).padStart(2, "0")}</span>
                    <span className="uf-faq__qtext">{f.q}</span>
                    <span className="uf-faq__icon" aria-hidden="true">
                      <svg viewBox="0 0 20 20" width="18" height="18">
                        <line x1="10" y1="4" x2="10" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        <line x1="4" y1="10" x2="16" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </span>
                  </button>
                </h3>
                <div
                  id={`${uid}-a${i}`}
                  role="region"
                  aria-labelledby={`${uid}-q${i}`}
                  className="uf-faq__panel"
                  hidden={!isOpen}
                >
                  <div className="uf-faq__answer">
                    <p>{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
}
