import { useRef } from "react";
import { gsap } from "@/components/triangle/gsapSetup";
import { SERVICES, YOUR_PART } from "./content";
import { drawPaths, EASE, Headline, Icon, Media, useReveal } from "./ui";

/** 3.3 — You Own. We Manage.: irrigation, security, care and sale, all by Redwood. */
export function WeManage() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref, (root) => {
    const cards = root.querySelector(".rwh-svcs")!;
    gsap.from(cards.children, {
      y: 16,
      autoAlpha: 0,
      duration: 0.6,
      stagger: 0.08,
      ease: EASE,
      scrollTrigger: { trigger: cards, start: "top 85%", once: true },
    });
    root
      .querySelectorAll(".rwh-svc")
      .forEach((card, i) => drawPaths(card, { trigger: cards, delay: 0.2 + i * 0.08 }));
    const tl = root.querySelector(".rwh-tl")!;
    const t = gsap.timeline({ scrollTrigger: { trigger: tl, start: "top 90%", once: true } });
    t.from(tl.querySelectorAll(".rwh-tl__axis, .rwh-tl__span"), {
      scaleX: 0,
      transformOrigin: "0% 50%",
      duration: 1,
      stagger: 0.08,
      ease: "power2.inOut",
    }).from(
      tl.querySelectorAll(".rwh-tl__dot, .rwh-tl__tick, .rwh-tl__label"),
      { autoAlpha: 0, duration: 0.4, stagger: 0.04 },
      0.4,
    );
  });

  return (
    <section ref={ref} className="rwh rwh-sec rwh-bg-50" aria-labelledby="manage-title">
      <div className="rwh-wrap">
        <header className="rwh-head">
          <p className="rwh-eyebrow" data-rv="up">
            HANDS-FREE OWNERSHIP
          </p>
          <Headline id="manage-title">
            You Own. <em>We Manage.</em>
          </Headline>
          <p className="rwh-lead" data-rv="up">
            From the first sapling to the final sale, Redwood looks after your land for 12 years.
          </p>
        </header>

        <div className="rwh-svcs">
          {SERVICES.map((s) => (
            <article key={s.title} className="rwh-svc rwh-card">
              <span className="rwh-svc__icon">
                <Icon name={s.icon} size={40} draw />
              </span>
              <h3 className="rwh-svc__title">{s.title}</h3>
              <p className="rwh-svc__body">{s.body}</p>
              <Media
                src={s.photo}
                alt={s.alt}
                ratio="4 / 3"
                placeholder={`[Photo — ${s.title.toLowerCase()}]`}
                className="rwh-svc__photo"
                sizes="(min-width: 1024px) 260px, 45vw"
              />
            </article>
          ))}
        </div>

        {/* Where each service applies across the 12 years. */}
        <div className="rwh-tl">
          <p className="rwh-sr">
            Irrigation, security and care run from year 1 to year 12. The sale happens at harvest.
          </p>
          <div className="rwh-tl__track" aria-hidden="true">
            <span className="rwh-tl__axis" />
            {[
              ["Year 1", 0],
              ["Year 12", 82],
              ["Harvest", 100],
            ].map(([label, at], i) => (
              <span
                key={label}
                className={`rwh-tl__tick ${i === 0 ? "is-start" : i === 2 ? "is-end" : ""}`}
                style={{ left: `${at}%` }}
              >
                <span className="rwh-tl__label">{label}</span>
              </span>
            ))}
            {["Irrigation", "Security", "Care"].map((s, i) => (
              <span key={s} className="rwh-tl__span" style={{ top: `${30 + i * 16}px` }}>
                <span className="rwh-tl__dot" />
                <span className="rwh-tl__label rwh-tl__label--span">{s}</span>
              </span>
            ))}
            <span className="rwh-tl__sale" style={{ top: "30px" }}>
              <span className="rwh-tl__dot" />
              <span className="rwh-tl__label rwh-tl__label--sale">Sale</span>
            </span>
          </div>
        </div>

        <p className="rwh-part" data-rv="up">
          <span className="rwh-part__k">Your part:</span> {YOUR_PART}
        </p>
      </div>
    </section>
  );
}
