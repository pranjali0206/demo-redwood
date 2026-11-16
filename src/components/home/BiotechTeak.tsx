import { useRef, useState } from "react";
import { gsap } from "@/components/triangle/gsapSetup";
import { COMPARISON } from "./content";
import { EASE, Headline, Icon, useReveal } from "./ui";

/** 3.2 — Why Biotech Teak: normal teak and Redwood tissue-culture teak, point by point. */
export function BiotechTeak() {
  const ref = useRef<HTMLElement>(null);
  const [view, setView] = useState<"normal" | "redwood">("redwood");
  useReveal(ref, (root) => {
    const grid = root.querySelector(".rwh-compare")!;
    const tl = gsap.timeline({ scrollTrigger: { trigger: grid, start: "top 85%", once: true } });
    tl.from(root.querySelector(".rwh-cmp--normal"), {
      y: 16,
      autoAlpha: 0,
      duration: 0.6,
      ease: EASE,
    })
      .from(root.querySelector(".rwh-vs"), { autoAlpha: 0, duration: 0.4 }, 0.2)
      .from(
        root.querySelector(".rwh-cmp--rw"),
        { x: 24, autoAlpha: 0, duration: 0.6, ease: EASE },
        0.3,
      )
      .from(
        root.querySelectorAll(".rwh-cmp--rw .rwh-cmp__tick"),
        { scale: 0.4, autoAlpha: 0, duration: 0.35, stagger: 0.08, ease: "back.out(2)" },
        0.6,
      );
  });

  return (
    <section ref={ref} className="rwh rwh-sec rwh-bg-0" aria-labelledby="teak-title">
      <div className="rwh-wrap">
        <header className="rwh-head">
          <p className="rwh-eyebrow" data-rv="up">
            THE TREE
          </p>
          <Headline id="teak-title">
            Why <em>Biotech Teak</em>
          </Headline>
          <p className="rwh-lead" data-rv="up">
            Not all teak is the same. Redwood plants tissue-culture teak, raised in a lab from
            [selected mother trees].
          </p>
        </header>

        <TreeStrip />

        <div className="rwh-toggle" role="group" aria-label="Compare">
          {(["normal", "redwood"] as const).map((v) => (
            <button
              key={v}
              type="button"
              className="rwh-toggle__btn"
              aria-pressed={view === v}
              aria-controls={`cmp-${v}`}
              onClick={() => setView(v)}
            >
              {v === "normal" ? "Normal" : "Redwood"}
            </button>
          ))}
        </div>

        <div className="rwh-compare" data-view={view}>
          <article
            id="cmp-normal"
            className="rwh-cmp rwh-cmp--normal"
            aria-labelledby="cmp-normal-title"
          >
            <header className="rwh-cmp__head">
              <h3 id="cmp-normal-title" className="rwh-cmp__name">
                Normal Teak
              </h3>
            </header>
            {COMPARISON.map((r) => (
              <div key={r.point} className="rwh-cmp__row">
                <span className="rwh-cmp__point">{r.point}</span>
                <span className="rwh-cmp__val">
                  <span className="rwh-cmp__mark" aria-hidden="true" />
                  {r.normal}
                </span>
              </div>
            ))}
          </article>
          <div className="rwh-vs" aria-hidden="true">
            vs
          </div>
          <article id="cmp-redwood" className="rwh-cmp rwh-cmp--rw" aria-labelledby="cmp-rw-title">
            <header className="rwh-cmp__head">
              <span className="rwh-tag">REDWOOD</span>
              <h3 id="cmp-rw-title" className="rwh-cmp__name">
                Redwood Tissue-Culture Teak
              </h3>
            </header>
            {COMPARISON.map((r) => (
              <div key={r.point} className="rwh-cmp__row">
                <span className="rwh-cmp__point">{r.point}</span>
                <span className="rwh-cmp__val">
                  <span className="rwh-cmp__tick" aria-hidden="true">
                    <Icon name="check" size={14} />
                  </span>
                  {r.redwood}
                </span>
              </div>
            ))}
          </article>
        </div>

        <p className="rwh-closing" data-rv="up">
          Better plants at the start. Fewer surprises at harvest.
        </p>
      </div>
    </section>
  );
}

/**
 * A slim line-art strip in the City map's style: one uneven row of trees (mixed seed) beside one
 * even row (tissue-culture clones).
 */
function TreeStrip() {
  const uneven = [0.62, 0.95, 0.5, 0.82, 0.7, 1, 0.56, 0.88];
  const tree = (x: number, s: number, even: boolean, k: number) => {
    const h = 54 * s;
    const r = 15 * (0.7 + 0.3 * s);
    const lean = even ? 0 : [-3, 2, -1, 3, -2, 1, -3, 2][k];
    return (
      <g key={`${even}-${k}`} className={even ? "rwh-strip__tree is-even" : "rwh-strip__tree"}>
        <path d={`M${x} 92 L${x + lean} ${92 - h}`} className="rwh-strip__trunk" />
        <circle cx={x + lean} cy={92 - h - r * 0.55} r={r} className="rwh-strip__crown" />
      </g>
    );
  };
  return (
    <div className="rwh-strip" data-rv="up" aria-hidden="true">
      <svg viewBox="0 0 960 100" preserveAspectRatio="xMidYMid meet">
        <path d="M24 92H448M512 92H936" className="rwh-strip__ground" />
        {uneven.map((s, k) => tree(56 + k * 52, s, false, k))}
        {uneven.map((_, k) => tree(544 + k * 52, 0.86, true, k))}
      </svg>
      <div className="rwh-strip__labels">
        <span>Mixed seed</span>
        <span className="is-rw">Tissue-culture clones</span>
      </div>
    </div>
  );
}
