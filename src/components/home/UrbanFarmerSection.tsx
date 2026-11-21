import { useRef } from "react";
import { gsap } from "@/components/triangle/gsapSetup";
import { UF_CITY_IMG, UF_FARM_IMG, URBAN_POINTS } from "./content";
import { BookLink, EASE, Headline, Icon, Media, useReveal } from "./ui";

/** 3.6 — Urban Farmer.: city people who own a farm without moving. */
export function UrbanFarmerSection() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref, (root) => {
    const pair = root.querySelector(".rwh-uf__pair")!;
    const tl = gsap.timeline({ scrollTrigger: { trigger: pair, start: "top 85%", once: true } });
    tl.fromTo(
      pair.querySelector(".rwh-uf__city"),
      { clipPath: "inset(100% 0% 0% 0%)" },
      { clipPath: "inset(0% 0% 0% 0%)", duration: 0.8, ease: EASE, clearProps: "clipPath" },
    )
      .fromTo(
        pair.querySelector(".rwh-uf__link"),
        { clipPath: "inset(0% 100% 0% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 0.6,
          ease: "power1.inOut",
          clearProps: "clipPath",
        },
      )
      .fromTo(
        pair.querySelector(".rwh-uf__farm"),
        { clipPath: "inset(100% 0% 0% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 0.8, ease: EASE, clearProps: "clipPath" },
        "-=0.1",
      );
  });

  return (
    <section ref={ref} className="rwh rwh-sec rwh-bg-0" aria-labelledby="uf-title">
      <div className="rwh-wrap">
        <header className="rwh-head rwh-head--center">
          <p className="rwh-eyebrow" data-rv="up">
            FOR CITY PEOPLE
          </p>
          <Headline id="uf-title">
            Urban <em>Farmer.</em>
          </Headline>
        </header>

        <div className="rwh-uf__pair">
          <Media
            src={UF_CITY_IMG.src}
            alt={UF_CITY_IMG.alt}
            ratio="4 / 5"
            placeholder="[City life photo]"
            icon="user"
            className="rwh-uf__city"
          />
          <div className="rwh-uf__link" aria-hidden="true">
            <svg viewBox="0 0 120 24" preserveAspectRatio="none">
              <line x1="4" y1="12" x2="108" y2="12" />
              <path d="M102 6l8 6-8 6" />
            </svg>
          </div>
          <Media
            src={UF_FARM_IMG.src}
            alt={UF_FARM_IMG.alt}
            ratio="4 / 5"
            placeholder="[The same person on the farm]"
            icon="leaf"
            className="rwh-uf__farm"
          />
        </div>

        <div className="rwh-uf__text">
          <p className="rwh-uf__body" data-rv="up">
            You live in the city. Your farm grows while you work.
          </p>
          <ul className="rwh-checks" data-rv="stagger">
            {URBAN_POINTS.map((p) => (
              <li key={p}>
                <span className="rwh-checks__icon" aria-hidden="true">
                  <Icon name="check" size={14} />
                </span>
                {p}
              </li>
            ))}
          </ul>
          <div className="rwh-actions" data-rv="up">
            <BookLink />
          </div>
        </div>
      </div>
    </section>
  );
}
