import { useRef } from "react";
import { gsap } from "@/components/triangle/gsapSetup";
import { SERVICES } from "./content";
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
      </div>
    </section>
  );
}
