import { useRef, useState, type CSSProperties } from "react";
import { gsap } from "@/components/triangle/gsapSetup";
import { BIOTECH_PROOF, COMPARISON } from "./content";
import { EASE, Headline, Icon, useReveal } from "./ui";
import cloneTree from "@/assets/teak-clone-tree.webp";
import mixed1 from "@/assets/teak-mixed-1.webp";
import mixed2 from "@/assets/teak-mixed-2.webp";
import mixed3 from "@/assets/teak-mixed-3.webp";
import mixed4 from "@/assets/teak-mixed-4.webp";

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
            selected mother trees.
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

        {/* Proof: biotech has already paid off for farmers, crop by crop; Sagwan is next. */}
        <div className="rwh-proof" data-rv="up">
          <p className="rwh-proof__eyebrow">Proven on farms worldwide</p>
          <h3 className="rwh-proof__title">
            Biotech already pays farmers. <em>Sagwan is next.</em>
          </h3>
          <ol className="rwh-proof__list">
            {BIOTECH_PROOF.map((p) => (
              <li key={p.crop} className={p.ours ? "rwh-proof__item is-ours" : "rwh-proof__item"}>
                <span className="rwh-proof__media" aria-hidden="true">
                  <img src={p.img} alt="" loading="lazy" decoding="async" />
                </span>
                {p.ours ? <span className="rwh-tag rwh-proof__tag">REDWOOD</span> : null}
                <span className="rwh-proof__crop">{p.crop}</span>
                <span className="rwh-proof__how">{p.how}</span>
                <span className="rwh-proof__result">{p.result}</span>
              </li>
            ))}
          </ol>
        </div>

        <p className="rwh-closing" data-rv="up">
          Better plants at the start. Fewer surprises at harvest.
        </p>
      </div>
    </section>
  );
}

/**
 * The mixed-seed row: different trees, heights and spacing, each swaying to its own rhythm.
 * `aspect` is the cut-out's width ÷ height; `cx` the trunk's position; `h` the tree's height.
 * Drawn tallest first, so the smaller trees stand in front.
 */
const MIXED = [
  { src: mixed2, aspect: 0.976, cx: 255, h: 170, dur: 5.2, delay: -1.1 },
  { src: mixed1, aspect: 0.769, cx: 58, h: 150, dur: 6.4, delay: -3.2 },
  { src: mixed1, aspect: 0.769, cx: 402, h: 118, dur: 4.6, delay: -0.4, flip: true },
  { src: mixed4, aspect: 1.117, cx: 150, h: 112, dur: 7.1, delay: -2.5 },
  { src: mixed3, aspect: 1.014, cx: 342, h: 98, dur: 5.8, delay: -4.0 },
];

/**
 * Mixed seed beside clones. Left: a mix of different trees — uneven in height, shape and spacing,
 * each swaying to its own rhythm. Right: one tree repeated — clones, identical in height, shape and
 * spacing, swaying together in one breath of wind. Both halves share one frame and ground line.
 */
function TreeStrip() {
  // One frame for both halves, ground 8 units above its foot.
  const W = 448;
  const H = 209;
  const ground = H - 8;
  // The clone row: five copies of one tree (cut-out is 287×460), evenly spaced.
  const CLONES = 5;
  const treeH = 178;
  const treeW = (treeH * 287) / 460;
  const step = (W - 12 - treeW) / (CLONES - 1);
  return (
    <div className="rwh-strip" data-rv="up" aria-hidden="true">
      <div className="rwh-strip__pair">
        <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMax meet">
          <path d={`M6 ${ground}H${W - 6}`} className="rwh-strip__ground" />
          {MIXED.map((t, k) => {
            const w = t.h * t.aspect;
            return (
              <g key={k} transform={t.flip ? `translate(${2 * t.cx} 0) scale(-1 1)` : undefined}>
                <ellipse cx={t.cx} cy={ground} rx={w * 0.22} ry="3" className="rwh-strip__shadow" />
                <image
                  href={t.src}
                  x={t.cx - w / 2}
                  y={ground - t.h + 2}
                  width={w}
                  height={t.h}
                  className="rwh-strip__tree"
                  style={
                    { "--sway-dur": `${t.dur}s`, "--sway-delay": `${t.delay}s` } as CSSProperties
                  }
                />
              </g>
            );
          })}
        </svg>
        <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMax meet">
          <path d={`M6 ${ground}H${W - 6}`} className="rwh-strip__ground" />
          {Array.from({ length: CLONES }, (_, k) => {
            const cx = 6 + treeW / 2 + k * step;
            return (
              <g key={k}>
                <ellipse
                  cx={cx}
                  cy={ground}
                  rx={treeW * 0.24}
                  ry="3"
                  className="rwh-strip__shadow"
                />
                <image
                  href={cloneTree}
                  x={cx - treeW / 2}
                  y={ground - treeH + 1}
                  width={treeW}
                  height={treeH}
                  className="rwh-strip__clone"
                />
              </g>
            );
          })}
        </svg>
      </div>
      <div className="rwh-strip__labels">
        <span>Mixed seed</span>
        <span className="is-rw">Tissue-culture clones</span>
      </div>
    </div>
  );
}
