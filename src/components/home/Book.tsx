import { useRef } from "react";
import { gsap } from "@/components/triangle/gsapSetup";
import { SITE_PHOTOS } from "./content";
import { LeadForm } from "./LeadForm";
import { EASE, Headline, Media, useReveal } from "./ui";

/** 3.1 — "Your Land Is Waiting.": capture the lead while interest is highest. */
export function BookSection() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref, (root) => {
    gsap.from(root.querySelector(".rwh-book__card"), {
      y: 16,
      autoAlpha: 0,
      duration: 0.7,
      delay: 0.15,
      ease: EASE,
      scrollTrigger: {
        trigger: root.querySelector(".rwh-book__card"),
        start: "top 85%",
        once: true,
      },
    });
  });
  const still = SITE_PHOTOS[0];
  return (
    <section
      ref={ref}
      id="contact"
      className="rwh rwh-sec rwh-bg-50 rwh-book"
      aria-labelledby="book-title"
    >
      <div className="rwh-wrap rwh-book__grid">
        <div className="rwh-book__intro">
          <p className="rwh-eyebrow" data-rv="up">
            BOOK A SITE VISIT
          </p>
          <Headline id="book-title" className="rwh-book__h2">
            <span className="rwh-line">Your Land</span> <em>Is Waiting.</em>
          </Headline>
          <p className="rwh-lead" data-rv="up">
            Tell us a little about you. We'll take it from there.
          </p>
        </div>
        <div data-rv="unmask" className="rwh-book__photo">
          <Media
            src={still.src}
            alt={still.alt}
            ratio="4 / 3"
            placeholder="[Site photo / drone still]"
            sizes="(min-width: 1024px) 460px, 100vw"
          />
        </div>
        <div className="rwh-book__card rwh-card">
          <LeadForm variant="full" location="cta" />
        </div>
      </div>
    </section>
  );
}
