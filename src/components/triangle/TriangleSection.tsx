import { useEffect, useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger, SplitText, prepDraw, token } from "./gsapSetup";
import { RedwoodMark } from "./RedwoodMark";
import { RwButton } from "./RwButton";
import { Scene01, Scene02, Scene03 } from "./scenes";
import { BOOK_HREF, RINGS, TRIANGLE_FONTS_ITALIC } from "./constants";
import greeneryImg from "@/assets/sapling-new.webp";
import growthImg from "@/assets/plantation-field.webp";
import logsImg from "@/assets/triangle-logs.webp";

/* Geometry ------------------------------------------------------------------------------------ */

type Pt = { x: number; y: number };
type Geo = { w: number; h: number; pts: [Pt, Pt, Pt]; tail: number };
const DESK: Geo = {
  w: 1440,
  h: 900,
  pts: [
    { x: 720, y: 220 },
    { x: 1040, y: 760 },
    { x: 400, y: 760 },
  ],
  tail: 1,
};
/** Phones: the corner tiles are 42% of the stage wide (see .rw-mcorner .rw-tile). */
const MOB: Geo = {
  w: 340,
  h: 380,
  pts: [
    { x: 170, y: 66 },
    { x: 268, y: 300 },
    { x: 72, y: 300 },
  ],
  tail: 0.6,
};

/** Seconds for the light's first lap (it draws the triangle), then for each calm lap after. */
const FIRST_LAP = 3;
const LAP = 6;

/** Each corner's colour token, in corner order: land (brown), growth (green), returns (logo red). */
const CORNER_TOKENS = ["--earth-500", "--leaf-600", "--red-600"];

const pct = (v: number, total: number) => `${(v / total) * 100}%`;
const dist = (a: Pt, b: Pt) => Math.hypot(b.x - a.x, b.y - a.y);
const edgeD = (a: Pt, b: Pt) => `M${a.x} ${a.y} L${b.x} ${b.y}`;
const loopD = ({ pts: [a, b, c] }: Geo) => `M${a.x} ${a.y} L${b.x} ${b.y} L${c.x} ${c.y} Z`;
/** The three edges in drawing order: corner 1 → 2, 2 → 3, 3 → 1. */
const edgesOf = ({ pts: [a, b, c] }: Geo): [Pt, Pt][] => [
  [a, b],
  [b, c],
  [c, a],
];

/* Copy ---------------------------------------------------------------------------------------- */

const CORNERS: {
  key: string;
  short: string;
  title: string;
  line: string;
  tag: ReactNode;
  Scene: () => ReactNode;
}[] = [
  {
    key: "Ownership",
    short: "Own the Land",
    title: "You Own the Land",
    line: "A registered plot in your name, from day one.",
    tag: (
      <>
        REGISTRY · <span className="s1-tag">YOUR NAME</span>
      </>
    ),
    Scene: Scene01,
  },
  {
    key: "Growth",
    short: "We Grow 12 Years",
    title: "We Grow for 12 Years",
    line: "We plant teak, irrigate and tend it, season after season.",
    tag: (
      <>
        IRRIGATED · YEAR <span className="s2-year rw-tab">01</span>
      </>
    ),
    Scene: Scene02,
  },
  {
    key: "Returns",
    short: "You Earn Twice",
    title: "You Earn Twice",
    line: "Your share of the timber at harvest — plus the land, still in your name.",
    tag: (
      <>
        <span className="rw-tag__timber">TIMBER</span> ·{" "}
        <span className="rw-tag__land">+ LAND VALUE</span>
      </>
    ),
    Scene: Scene03,
  },
];

const TRIANGLE_LABEL =
  "Diagram of the Redwood model as a triangle. Ownership: you own the land. Growth: we grow teak for twelve years. Returns: you earn twice, from the timber and from the land.";

/* Component ----------------------------------------------------------------------------------- */

/**
 * "One Land. Two Growths." — the Redwood model as a triangle, on a light ground with greenery,
 * growth and timber photographs. Each corner has its own colour from the brand: brown for the
 * land, green for the growth, the logo's red for the returns. It plays by itself when it scrolls
 * into view: the three scenes animate together while a travelling light draws the triangle,
 * blending from one corner's colour to the next, then keeps circling it.
 */
export function TriangleSection() {
  const rootRef = useRef<HTMLElement>(null);
  const replayRef = useRef<(i: number) => void>(() => {});

  // The italic accent face loads after first paint.
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      if (document.querySelector(`link[href="${TRIANGLE_FONTS_ITALIC}"]`)) return;
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = TRIANGLE_FONTS_ITALIC;
      document.head.appendChild(link);
    });
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    let cancelled = false;
    const ctx = gsap.context(() => {}, root);

    // Fonts first, so SplitText measures the real line breaks.
    document.fonts.ready.then(() => {
      if (cancelled) return;
      ctx.add(() => {
        const mm = gsap.matchMedia();
        mm.add(
          {
            desktop: "(min-width: 1180px)",
            mobile: "(max-width: 1179px)",
            reduce: "(prefers-reduced-motion: reduce)",
          },
          (c) => {
            const { desktop, reduce } = c.conditions as { desktop: boolean; reduce: boolean };
            root.classList.remove("rw-pre");
            const tok = (name: string) => token(root, name);
            return desktop
              ? setupDesktop(root, reduce, tok, replayRef)
              : setupMobile(root, reduce, tok);
          },
        );
      });
    });

    return () => {
      cancelled = true;
      ctx.revert();
    };
  }, []);

  return (
    <section ref={rootRef} className="rw rw-tri rw-pre" aria-labelledby="rw-tri-title">
      <h2 id="rw-tri-title" className="rw-sr">
        One Land. Two Growths.
      </h2>
      <div className="rw-survey rw-anim" aria-hidden="true" />

      {/* Desktop ------------------------------------------------------------------------------ */}
      <div className="rw-desk">
        <div className="rw-stage">
          <Photo kind="greenery" src={greeneryImg} />
          <Photo kind="growth" src={growthImg} />
          <Photo kind="logs" src={logsImg} />
          <Intro />
          <WoodBeams geo={DESK} />
          <TriangleSvg geo={DESK} uid="rwd" />
          {CORNERS.map((c, k) => (
            <Corner
              key={c.key}
              i={k + 1}
              c={c}
              pt={DESK.pts[k]}
              side={k === 2 ? "left" : "right"}
              onHover={(i) => replayRef.current(i)}
            />
          ))}
          <div className="rw-centre rw-anim">
            <RedwoodMark className="rw-mark" />
            <Headline />
            <div className="rw-cta">
              <RwButton href={BOOK_HREF} magnetic ring>
                Book a Site Visit
              </RwButton>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile ------------------------------------------------------------------------------- */}
      <div className="rw-mob">
        <Intro mobile />
        <div className="rw-mtri rw-anim">
          <Photo kind="greenery" src={greeneryImg} />
          <WoodBeams geo={MOB} />
          <TriangleSvg geo={MOB} uid="rwm" mark />
          {CORNERS.map((c, k) => (
            <div
              key={c.key}
              className="rw-mcorner"
              data-i={k + 1}
              style={{ left: pct(MOB.pts[k].x, MOB.w), top: pct(MOB.pts[k].y, MOB.h) }}
            >
              <div className="rw-tile">
                <span className="rw-tile__glow" aria-hidden="true" />
                <span className="rw-tile__ring" aria-hidden="true" />
                <c.Scene />
                <p className="rw-mtile__title rw-title" aria-hidden="true">
                  {c.short}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="rw-steps">
          <span className="rw-steps__rail" aria-hidden="true" />
          <ol className="rw-steps__list">
            {CORNERS.map((c, k) => (
              <li key={c.key} className="rw-step rw-anim" data-i={k + 1}>
                <span className="rw-step__dot" aria-hidden="true">
                  <span className="rw-step__pulse" />
                </span>
                <p className="rw-key">{c.key}</p>
                <h3 className="rw-step__title rw-title">{c.title}</h3>
                <p className="rw-step__line">{c.line}</p>
                <p className="rw-tag">{c.tag}</p>
              </li>
            ))}
          </ol>
        </div>
        <div className="rw-mfinale rw-anim">
          <Photo kind="logs" src={logsImg} />
          <RedwoodMark className="rw-mark" />
          <Headline />
          <div className="rw-cta">
            <RwButton href={BOOK_HREF} block ring>
              Book a Site Visit
            </RwButton>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Pieces -------------------------------------------------------------------------------------- */

function Photo({ kind, src }: { kind: "greenery" | "growth" | "logs"; src: string }) {
  return (
    <div
      className={`rw-photo rw-photo--${kind}`}
      style={{ backgroundImage: `url(${src})` }}
      aria-hidden="true"
    />
  );
}

function WoodBeams({ geo }: { geo: Geo }) {
  const edges = edgesOf(geo);
  const isDesk = geo.w > 400;
  const t = isDesk ? 24 : 12;
  const ext = isDesk ? 30 : 16;

  return (
    <div className="rw-beams" aria-hidden="true">
      {edges.map(([a, b], k) => {
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const len = Math.hypot(dx, dy);
        const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
        const ux = dx / len;
        const uy = dy / len;
        return (
          <div
            key={k}
            className="rw-beam"
            style={{
              left: `${((a.x - ux * ext) / geo.w) * 100}%`,
              top: `${((a.y - uy * ext) / geo.h) * 100}%`,
              width: `${((len + 2 * ext) / geo.w) * 100}%`,
              height: `${(t / geo.h) * 100}%`,
              transform: `translateY(-50%) rotate(${angle.toFixed(2)}deg)`,
              transformOrigin: "0% 50%",
            }}
          />
        );
      })}
    </div>
  );
}

function Intro({ mobile }: { mobile?: boolean }) {
  return (
    <div className={mobile ? "rw-intro rw-intro--m rw-anim" : "rw-intro rw-anim"}>
      <p className="rw-eyebrow">
        <span className="rw-mask">
          <span className="rw-mask__in">MANAGED TEAK FARMLAND</span>
        </span>
      </p>
      <p className="rw-body-l">
        Buy a registered plot. We plant teak on it and care for it for 12 years. Then you earn from
        the harvest — and from the land.
      </p>
    </div>
  );
}

function Headline() {
  return (
    <p className="rw-headline rw-display" aria-hidden="true">
      <span className="rw-mask">
        <span className="rw-mask__in rw-hl-line">One Land.</span>
      </span>
      <span className="rw-mask">
        <span className="rw-mask__in rw-hl-line rw-hl-accent rw-italic">Two Growths.</span>
      </span>
    </p>
  );
}

/**
 * The triangle. Each edge is its own path stroked with a gradient from one corner's colour to the
 * next, so the drawn triangle blends brown → green → red → brown. `uid` keeps the gradient ids
 * apart, since the desktop and mobile triangles are both in the page.
 */
function TriangleSvg({ geo, uid, mark }: { geo: Geo; uid: string; mark?: boolean }) {
  const [a, b, c] = geo.pts;
  const loop = loopD(geo);
  const edges = edgesOf(geo);
  const cx = (a.x + b.x + c.x) / 3;
  const cy = (a.y + b.y + c.y) / 3;
  return (
    <svg
      className="rw-stage__svg"
      viewBox={`0 0 ${geo.w} ${geo.h}`}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label={TRIANGLE_LABEL}
    >
      <defs>
        {edges.map(([p, q], k) => (
          <linearGradient
            key={k}
            id={`${uid}-edge${k}`}
            gradientUnits="userSpaceOnUse"
            x1={p.x}
            y1={p.y}
            x2={q.x}
            y2={q.y}
          >
            <stop offset="0.08" className={`rw-stop--${k + 1}`} />
            <stop offset="0.92" className={`rw-stop--${((k + 1) % 3) + 1}`} />
          </linearGradient>
        ))}
      </defs>
      <polygon className="rw-tri-fill" points={`${a.x},${a.y} ${b.x},${b.y} ${c.x},${c.y}`} />
      {edges.map(([p, q], k) => (
        <path key={`i${k}`} className="rw-edge--idle" d={edgeD(p, q)} />
      ))}
      {edges.map(([p, q], k) => (
        <path key={`e${k}`} className="rw-edge--eraser" d={edgeD(p, q)} />
      ))}
      {edges.map(([p, q], k) => (
        <path
          key={`g${k}`}
          className="rw-seg rw-seg--glow"
          data-k={k}
          d={edgeD(p, q)}
          stroke={`url(#${uid}-edge${k})`}
        />
      ))}
      {edges.map(([p, q], k) => (
        <path
          key={`s${k}`}
          className="rw-seg"
          data-k={k}
          d={edgeD(p, q)}
          stroke={`url(#${uid}-edge${k})`}
        />
      ))}
      <path className="rw-loop" d={loop} />
      {mark ? (
        <g className="rw-mmark" transform={`translate(${cx} ${cy - 18})`}>
          {RINGS.map((r, k) => (
            <circle key={r} className={`rw-ring rw-ring--${k + 1}`} r={r} />
          ))}
          <circle className="rw-mmark__seed" r="1.6" />
        </g>
      ) : null}
      <g className="rw-light" aria-hidden="true">
        <path className="rw-tail rw-tail--3" d={loop} data-d={140 * geo.tail} />
        <path className="rw-tail rw-tail--2" d={loop} data-d={70 * geo.tail} />
        <path className="rw-tail rw-tail--1" d={loop} data-d={26 * geo.tail} />
        <g className="rw-head">
          <circle className="rw-head__halo" r="13" />
          <circle className="rw-head__core" r="4" />
          <path
            className="rw-head__spark"
            d="M0 -10 L1.7 -1.7 L10 0 L1.7 1.7 L0 10 L-1.7 1.7 L-10 0 L-1.7 -1.7 Z"
          />
        </g>
      </g>
    </svg>
  );
}

function Corner({
  i,
  c,
  pt,
  side,
  onHover,
}: {
  i: number;
  c: (typeof CORNERS)[number];
  pt: Pt;
  side: "left" | "right";
  onHover: (i: number) => void;
}) {
  return (
    <div
      className="rw-corner rw-anim"
      data-i={i}
      style={{ left: pct(pt.x, DESK.w), top: pct(pt.y, DESK.h) }}
    >
      <div className="rw-tile" onMouseEnter={() => onHover(i)}>
        <span className="rw-tile__glow" aria-hidden="true" />
        <span className="rw-tile__ring" aria-hidden="true" />
        <c.Scene />
        <p className="rw-tag">{c.tag}</p>
      </div>
      <div className={`rw-label rw-label--${side}`}>
        <p className="rw-key">{c.key}</p>
        <h3 className="rw-label__title rw-title">
          <span className="rw-mask">
            <span className="rw-mask__in">{c.title}</span>
          </span>
        </h3>
        <p className="rw-label__line">{c.line}</p>
      </div>
    </div>
  );
}

/* Animation ----------------------------------------------------------------------------------- */

type Tok = (name: string) => string;
type Q = ReturnType<typeof gsap.utils.selector>;

/** Plays `tl` once when `el` scrolls into view (or straight away if it already has). */
function playOnEnter(el: Element, tl: gsap.core.Animation, start = "top 85%") {
  let done = false;
  const play = () => {
    if (done) return;
    done = true;
    tl.play();
  };
  const st = ScrollTrigger.create({ trigger: el, start, onEnter: play });
  if (st.progress > 0) play();
  return () => done;
}

/**
 * When the light passes a corner, that tile glows in its own colour, keeps a coloured outline from
 * then on, and its scene gets a small touch (unless the scene is still playing).
 */
function cornerPulse(tiles: HTMLElement[], scenes: gsap.core.Timeline[]) {
  const glows = tiles.map((t) => t.querySelector(".rw-tile__glow"));
  const rings = tiles.map((t) => t.querySelector(".rw-tile__ring"));
  return {
    pulse(v: number) {
      gsap.to(rings[v], { opacity: 1, duration: 0.4, overwrite: "auto" });
      gsap.fromTo(
        glows[v],
        { opacity: 0.2 },
        {
          keyframes: [
            { opacity: 0.9, duration: 0.35, ease: "power2.out" },
            { opacity: 0.2, duration: 1.1, ease: "power2.inOut" },
          ],
          overwrite: true,
        },
      );
      if (!scenes[v].isActive()) accent(v + 1, tiles[v]);
    },
    /** Reduced motion: every corner already visited. */
    settle() {
      gsap.set(rings, { opacity: 1 });
      gsap.set(glows, { opacity: 0.2 });
    },
  };
}

function setupDesktop(
  root: HTMLElement,
  reduce: boolean,
  tok: Tok,
  replayRef: { current: (i: number) => void },
) {
  const scope = root.querySelector<HTMLElement>(".rw-desk")!;
  const q = gsap.utils.selector(scope);
  const tiles = [1, 2, 3].map((i) => q<HTMLElement>(`.rw-corner[data-i="${i}"] .rw-tile`)[0]);
  const scenes = tiles.map((tile, k) => buildScene(k + 1, tile, tok));
  const corners = cornerPulse(tiles, scenes);
  const finale = buildDesktopFinale(q, tok);

  const light = buildLight(q<SVGSVGElement>(".rw-stage__svg")[0], DESK, CORNER_TOKENS.map(tok), {
    onVertex: corners.pulse,
    onClose: () => finale.play(),
  });

  const erasers = q<SVGPathElement>(".rw-edge--eraser");
  prepDraw(erasers, true);
  const split = SplitText.create(q(".rw-intro .rw-body-l")[0], { type: "lines", mask: "lines" });

  const intro = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });
  intro
    .from(root.querySelector(".rw-survey"), { opacity: 0, duration: 0.8 }, 0)
    .from(
      q(".rw-photo"),
      { opacity: 0, scale: 1.05, duration: 1.6, stagger: 0.12, ease: "power2.out" },
      0,
    )
    .from(q(".rw-intro .rw-eyebrow .rw-mask__in"), { yPercent: 105, duration: 0.8 }, 0.1)
    .from(split.lines, { yPercent: 105, duration: 0.8, stagger: 0.07 }, 0.18)
    .to(
      erasers,
      {
        strokeDashoffset: (_i, el) => Number((el as SVGElement).dataset.len),
        duration: 0.9,
        ease: "power1.inOut",
      },
      0.2,
    )
    .from(q(".rw-beam"), { opacity: 0, duration: 0.9, stagger: 0.12, ease: "power2.out" }, 0.15)
    .from(q(".rw-corner"), { opacity: 0, y: 18, duration: 0.8, stagger: 0.08 }, 0.25)
    .from(q(".rw-label .rw-key"), { opacity: 0, x: -10, duration: 0.6, stagger: 0.08 }, 0.35)
    .from(q(".rw-label__title .rw-mask__in"), { yPercent: 105, duration: 0.8, stagger: 0.08 }, 0.4)
    // Everything at once: the three scenes and the light start together.
    .call(() => scenes.forEach((s) => s.play(0)), undefined, 0.55)
    .call(() => light.start(), undefined, 0.6);

  if (reduce) {
    intro.progress(1, true);
    // Not suppressed: the year counter writes its final value in onUpdate.
    scenes.forEach((s) => s.progress(1));
    finale.progress(1, true);
    light.finish();
    corners.settle();
    return () => split.revert();
  }

  const started = playOnEnter(scope, intro, "top 72%");
  const vis = ScrollTrigger.create({
    trigger: scope,
    start: "top bottom",
    end: "bottom top",
    onToggle: (s) => light.setVisible(s.isActive),
  });
  light.setVisible(vis.isActive);

  replayRef.current = (i) => {
    if (!started() || intro.isActive()) return;
    if (!window.matchMedia("(hover: hover)").matches) return;
    const s = scenes[i - 1];
    if (!s.isActive()) s.timeScale(1.5).restart();
  };

  if (import.meta.env.DEV) {
    (window as unknown as { __rw?: unknown }).__rw = { intro, scenes, finale, light };
  }

  return () => {
    light.stop();
    split.revert();
    replayRef.current = () => {};
  };
}

function setupMobile(root: HTMLElement, reduce: boolean, tok: Tok) {
  const scope = root.querySelector<HTMLElement>(".rw-mob")!;
  const q = gsap.utils.selector(scope);
  const tiles = [1, 2, 3].map((i) => q<HTMLElement>(`.rw-mcorner[data-i="${i}"] .rw-tile`)[0]);
  const steps = q<HTMLElement>(".rw-step");
  // The scenes play in the corner tiles; their tag text (registry name, year count) is in the steps.
  const scenes = tiles.map((tile, k) => buildScene(k + 1, tile, tok, steps[k]));
  const corners = cornerPulse(tiles, scenes);

  const markRings = q<SVGCircleElement>(".rw-mmark .rw-ring");
  prepDraw(markRings);
  const closeTl = gsap
    .timeline({ paused: true })
    .to(q(".rw-tri-fill"), { opacity: 0.07, duration: 1 }, 0)
    .to(markRings, { strokeDashoffset: 0, duration: 0.6, stagger: 0.1, ease: "power1.inOut" }, 0)
    .from(q(".rw-mmark__seed"), { scale: 0, svgOrigin: "0 0", duration: 0.4 }, 0.2);

  const light = buildLight(q<SVGSVGElement>(".rw-stage__svg")[0], MOB, CORNER_TOKENS.map(tok), {
    onVertex: corners.pulse,
    onClose: () => closeTl.play(),
  });

  const split = SplitText.create(q(".rw-intro .rw-body-l")[0], { type: "lines", mask: "lines" });
  const introTl = gsap
    .timeline({ paused: true, defaults: { ease: "power3.out" } })
    .from(root.querySelector(".rw-survey"), { opacity: 0, duration: 0.8 }, 0)
    .from(q(".rw-intro .rw-eyebrow .rw-mask__in"), { yPercent: 105, duration: 0.8 }, 0.1)
    .from(split.lines, { yPercent: 105, duration: 0.8, stagger: 0.07 }, 0.18);

  const erasers = q<SVGPathElement>(".rw-edge--eraser");
  prepDraw(erasers, true);
  const triTl = gsap
    .timeline({ paused: true, defaults: { ease: "power3.out" } })
    .from(q(".rw-mtri .rw-photo"), { opacity: 0, scale: 1.05, duration: 1.4 }, 0)
    .from(q(".rw-beam"), { opacity: 0, duration: 0.9, stagger: 0.12, ease: "power2.out" }, 0.1)
    .to(
      erasers,
      {
        strokeDashoffset: (_i, el) => Number((el as SVGElement).dataset.len),
        duration: 0.9,
        ease: "power1.inOut",
      },
      0.1,
    )
    .from(
      tiles,
      { opacity: 0, y: 16, scale: 0.88, duration: 0.8, stagger: 0.12, ease: "back.out(1.5)" },
      0.2,
    )
    .from(q(".rw-mtile__title"), { opacity: 0, y: 6, duration: 0.5, stagger: 0.12 }, 0.45)
    // As on desktop: the three scenes and the light start together.
    .call(() => scenes.forEach((s) => s.play(0)), undefined, 0.6)
    .call(() => light.start(), undefined, 0.65);

  // The process steps: a rail in the three colours draws down as you scroll; each step slides in
  // and its dot pops with a ripple in its corner's colour.
  const rail = q(".rw-steps__rail")[0];
  const stepTls = steps.map((step) => {
    const sq = gsap.utils.selector(step);
    return gsap
      .timeline({ paused: true })
      .from(step, { opacity: 0, x: -18, duration: 0.8, ease: "power3.out" }, 0)
      .from(sq(".rw-step__dot"), { scale: 0, duration: 0.5, ease: "back.out(2.4)" }, 0.15)
      .fromTo(
        sq(".rw-step__pulse"),
        { scale: 1, opacity: 0.7 },
        { scale: 3, opacity: 0, duration: 0.9, ease: "power2.out", immediateRender: false },
        0.4,
      );
  });

  const fin = q(".rw-mfinale")[0];
  const finQ = gsap.utils.selector(fin);
  const finRings = finQ<SVGCircleElement>(".rw-ring");
  prepDraw(finRings);
  const finTl = gsap
    .timeline({ paused: true })
    .from(finQ(".rw-photo"), { opacity: 0, duration: 1.2 }, 0)
    .to(finRings, { strokeDashoffset: 0, duration: 0.6, stagger: 0.1, ease: "power1.inOut" }, 0)
    .from(
      finQ(".rw-hl-line"),
      { yPercent: 105, duration: 0.8, stagger: 0.12, ease: "power3.out" },
      0.1,
    )
    .to(finQ(".rw-hl-accent"), { color: tok("--red-700"), duration: 0.4 }, 0.6)
    .from(finQ(".rw-cta"), { y: 16, opacity: 0, duration: 0.8, ease: "power3.out" }, 0.4)
    .fromTo(
      finQ(".rw-btn-ring"),
      { opacity: 0.6, scale: 1 },
      { opacity: 0, scale: 1.08, duration: 1.2, ease: "power2.out", immediateRender: false },
      1.0,
    );

  if (reduce) {
    [introTl, triTl, closeTl, finTl, ...stepTls].forEach((t) => t.progress(1, true));
    // Not suppressed: the year counter writes its final value in onUpdate.
    scenes.forEach((s) => s.progress(1));
    light.finish();
    corners.settle();
    return () => split.revert();
  }

  playOnEnter(q(".rw-intro")[0], introTl);
  playOnEnter(q(".rw-mtri")[0], triTl, "top 80%");
  steps.forEach((step, k) => playOnEnter(step, stepTls[k]));
  playOnEnter(fin, finTl);
  gsap.fromTo(
    rail,
    { scaleY: 0 },
    {
      scaleY: 1,
      ease: "none",
      scrollTrigger: {
        trigger: q(".rw-steps")[0],
        start: "top 80%",
        end: "bottom 65%",
        scrub: 0.6,
      },
    },
  );
  const vis = ScrollTrigger.create({
    trigger: q(".rw-mtri")[0],
    start: "top bottom",
    end: "bottom top",
    onToggle: (s) => light.setVisible(s.isActive),
  });
  light.setVisible(vis.isActive);

  if (import.meta.env.DEV) {
    (window as unknown as { __rw?: unknown }).__rw = {
      introTl,
      triTl,
      stepTls,
      finTl,
      scenes,
      light,
    };
  }

  return () => {
    light.stop();
    split.revert();
  };
}

function buildDesktopFinale(q: Q, tok: Tok) {
  const markRings = q<SVGCircleElement>(".rw-centre .rw-ring");
  prepDraw(markRings);
  const lines = q(".rw-centre .rw-hl-line");
  const cta = q(".rw-centre .rw-cta");
  gsap.set(q(".rw-centre .rw-mark"), { opacity: 0 });
  gsap.set(lines, { yPercent: 105 });
  gsap.set(cta, { y: 16, opacity: 0 });
  return gsap
    .timeline({ paused: true })
    .to(q(".rw-tri-fill"), { opacity: 0.07, duration: 1 }, 0)
    .to(q(".rw-centre .rw-mark"), { opacity: 1, duration: 0.2 }, 0)
    .to(markRings, { strokeDashoffset: 0, duration: 0.6, stagger: 0.1, ease: "power1.inOut" }, 0)
    .to(lines, { yPercent: 0, duration: 0.8, stagger: 0.12, ease: "power3.out" }, 0.25)
    .to(q(".rw-centre .rw-hl-accent"), { color: tok("--red-700"), duration: 0.4 }, 0.75)
    .to(cta, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, 0.55)
    .fromTo(
      q(".rw-centre .rw-btn-ring"),
      { opacity: 0.6, scale: 1 },
      { opacity: 0, scale: 1.5, duration: 1.2, ease: "power2.out" },
      1.0,
    );
}

/**
 * The travelling light: a bright head with a comet tail, moved along the triangle's perimeter
 * every frame. Its colour blends from one corner's colour to the next as it goes. Its first lap
 * draws the gradient edges behind it; after the triangle closes it slows to a calm loop. It only
 * runs while the triangle is on screen.
 */
function buildLight(
  svg: SVGSVGElement,
  geo: Geo,
  colors: string[],
  { onVertex, onClose }: { onVertex: (v: number) => void; onClose: () => void },
) {
  const path = svg.querySelector<SVGPathElement>(".rw-loop")!;
  const T = path.getTotalLength();
  const lens = edgesOf(geo).map(([p, q]) => dist(p, q));
  const marks = [0, lens[0], lens[0] + lens[1]];
  const mixes = [0, 1, 2].map((k) => gsap.utils.interpolate(colors[k], colors[(k + 1) % 3]));
  const tails = Array.from(svg.querySelectorAll<SVGPathElement>(".rw-tail"));
  const tailLens = tails.map((t) => Number(t.dataset.d));
  tails.forEach((t, k) =>
    gsap.set(t, { strokeDasharray: `${tailLens[k]} ${T - tailLens[k]}` }),
  );
  const segs = Array.from(svg.querySelectorAll<SVGPathElement>(".rw-seg"));
  const segK = segs.map((s) => Number(s.dataset.k));
  segs.forEach((s, j) => {
    const L = lens[segK[j]];
    gsap.set(s, { strokeDasharray: `${L} ${L + 4}`, strokeDashoffset: L });
  });
  const head = svg.querySelector<SVGGElement>(".rw-head")!;
  const group = svg.querySelector<SVGGElement>(".rw-light")!;

  const st = { h: 0, speed: T / FIRST_LAP }; // h = total distance travelled
  let prev = 0;
  let closed = false;
  let started = false;
  let visible = false;
  let running = false;

  const render = () => {
    const m = ((st.h % T) + T) % T;
    tails.forEach((t, k) => {
      t.style.strokeDashoffset = String(tailLens[k] - m);
    });
    const p = path.getPointAtLength(m);
    head.setAttribute("transform", `translate(${p.x.toFixed(2)} ${p.y.toFixed(2)})`);
    const e = m < marks[1] ? 0 : m < marks[2] ? 1 : 2;
    group.style.setProperty("--lc", mixes[e](Math.min(1, (m - marks[e]) / lens[e])));
    if (!closed) {
      segs.forEach((s, j) => {
        const k = segK[j];
        const drawn = Math.min(lens[k], Math.max(0, st.h - marks[k]));
        s.style.strokeDashoffset = String(lens[k] - drawn);
      });
    }
    for (let v = 0; v < 3; v++) {
      let at = marks[v] + Math.ceil((prev - marks[v]) / T) * T;
      if (at <= prev) at += T;
      if (at <= st.h) onVertex(v);
    }
    if (!closed && st.h >= T) {
      closed = true;
      gsap.set(segs, { strokeDashoffset: 0 });
      onClose();
      gsap.to(st, { speed: T / LAP, duration: 1.5, ease: "power1.inOut" });
    }
    prev = st.h;
  };
  const tick = (_time: number, deltaTime: number) => {
    st.h += (st.speed * Math.min(deltaTime, 50)) / 1000;
    render();
  };
  const sync = () => {
    const should = started && visible;
    if (should && !running) gsap.ticker.add(tick);
    if (!should && running) gsap.ticker.remove(tick);
    running = should;
  };

  return {
    start() {
      if (started) return;
      started = true;
      gsap.to(group, { opacity: 1, duration: 0.4 });
      render();
      onVertex(0);
      sync();
    },
    setVisible(v: boolean) {
      visible = v;
      sync();
    },
    /** Reduced motion: the finished triangle, no light. */
    finish() {
      closed = true;
      gsap.set(segs, { strokeDashoffset: 0 });
    },
    stop() {
      started = false;
      sync();
    },
  };
}

/** A small touch on a corner's scene as the light passes. */
function accent(i: number, host: Element) {
  const q = gsap.utils.selector(host);
  if (i === 1) {
    gsap.fromTo(
      q(".s1-ripple"),
      { scale: 1, opacity: 0.8 },
      { scale: 2.6, opacity: 0, duration: 0.9, ease: "power2.out", transformOrigin: "50% 50%" },
    );
  } else if (i === 2) {
    gsap.fromTo(
      q(".s2-drop"),
      { opacity: 0, y: 0 },
      {
        keyframes: [
          { opacity: 1, y: 10, duration: 0.3 },
          { opacity: 0, y: 34, duration: 0.6 },
        ],
        stagger: 0.12,
      },
    );
  } else {
    gsap.fromTo(
      q(".s3-arrow"),
      { scale: 1 },
      { scale: 1.35, duration: 0.25, yoyo: true, repeat: 1, transformOrigin: "50% 50%" },
    );
  }
}

/**
 * One corner's scene as a paused timeline, so it can play with the others or replay alone.
 * `extra` holds the scene's tag text when that lives outside `host` (the mobile steps).
 */
function buildScene(i: number, host: Element, tok: Tok, extra?: Element) {
  const q = gsap.utils.selector(host);
  const qText = (sel: string): Element[] =>
    extra ? [...q(sel), ...Array.from(extra.querySelectorAll(sel))] : q(sel);
  const tl = gsap.timeline({ paused: true });

  if (i === 1) {
    const doc = q(".s1-doc");
    const flight = q<SVGPathElement>(".s1-path")[0];
    const seal = q(".s1-seal");
    const ripple = q(".s1-ripple");
    const name = q<SVGPathElement>(".s1-name");
    const plotSolid = q<SVGPathElement>(".s1-plot-solid");
    const pegs = q(".s1-peg");
    gsap.set(doc, { opacity: 0, rotation: 14, scale: 0.7, transformOrigin: "50% 50%" });
    gsap.set(seal, { scale: 1.4, opacity: 0, transformOrigin: "50% 50%" });
    gsap.set(ripple, { opacity: 0, transformOrigin: "50% 50%" });
    gsap.set(pegs, { opacity: 0.3, transformOrigin: "50% 50%" });
    prepDraw(name);
    prepDraw(plotSolid);
    tl.to(
      doc,
      {
        motionPath: { path: flight, align: flight, alignOrigin: [0.5, 0.5] },
        rotation: 8,
        scale: 1,
        duration: 1.2,
        ease: "power2.inOut",
      },
      0,
    )
      .to(doc, { opacity: 1, duration: 0.3 }, 0)
      .to(seal, { scale: 1, opacity: 1, duration: 0.35, ease: "power3.out" }, 1.15)
      .fromTo(
        ripple,
        { scale: 1, opacity: 0.8 },
        { scale: 2.6, opacity: 0, duration: 0.7, ease: "power2.out", immediateRender: false },
        1.25,
      )
      .to(name, { strokeDashoffset: 0, duration: 0.6, ease: "power1.inOut" }, 1.4)
      .to(q(".s1-plot-dash"), { opacity: 0, duration: 0.4 }, 1.4)
      .to(plotSolid, { strokeDashoffset: 0, duration: 0.7, ease: "power1.inOut" }, 1.4)
      .to(pegs, { opacity: 1, scale: 1.2, duration: 0.3, stagger: 0.07 }, 1.6)
      .to(qText(".s1-tag"), { color: tok("--earth-700"), duration: 0.4 }, 1.8);
  } else if (i === 2) {
    const saplings = q(".s2-sapling");
    const leaves = q<SVGElement>(".s2-leaf");
    const drops = q(".s2-drop");
    const years = qText(".s2-year");
    gsap.set(saplings, { scaleY: 0, transformOrigin: "50% 100%" });
    leaves.forEach((leaf) =>
      gsap.set(leaf, { rotation: 0, scale: 0, svgOrigin: leaf.dataset.origin }),
    );
    gsap.set(drops, { opacity: 0, y: 0 });
    gsap.set(q(".s2-canopy"), { scale: 0, svgOrigin: "133 48" });
    gsap.set(q(".s2-trunk"), { opacity: 0 });
    tl.to(saplings, { scaleY: 1, duration: 0.9, stagger: 0.15, ease: "power2.out" }, 0);
    leaves.forEach((leaf, k) =>
      tl.to(
        leaf,
        { rotation: Number(leaf.dataset.rot), scale: 1, duration: 0.5, ease: "power2.out" },
        0.3 + k * 0.05,
      ),
    );
    drops.forEach((d, k) =>
      tl.to(
        d,
        {
          keyframes: [
            { opacity: 1, y: 10, duration: 0.3 },
            { opacity: 0, y: 34, duration: 0.6 },
          ],
        },
        0.05 + k * 0.22,
      ),
    );
    const year = { v: 1 };
    tl.to(
      year,
      {
        v: 12,
        duration: 2.2,
        ease: "none",
        onUpdate: () => {
          const s = String(Math.round(year.v)).padStart(2, "0");
          years.forEach((el) => (el.textContent = s));
        },
      },
      0,
    )
      .to(q(".s2-canopy"), { scale: 1, duration: 1.2, ease: "power2.out" }, 1.0)
      .to(q(".s2-trunk"), { opacity: 1, duration: 0.6 }, 1.1)
      .to(q(".s2-leaf--3"), { opacity: 0, duration: 0.4 }, 1.3);
  } else {
    const tree = q(".s3-tree");
    const rings = q<SVGCircleElement>(".s3-ring");
    const line = q<SVGPathElement>(".s3-line");
    const arrow = q(".s3-arrow");
    gsap.set(tree, { rotation: 0, opacity: 1, svgOrigin: "40 70" });
    gsap.set(q(".s3-log"), { scale: 0, transformOrigin: "50% 50%" });
    gsap.set(arrow, { opacity: 0, scale: 0.6, transformOrigin: "50% 50%" });
    gsap.set(q(".s3-fill"), { opacity: 0 });
    prepDraw(rings);
    prepDraw(line);
    tl.to(tree, { rotation: -14, duration: 0.5, ease: "power2.in" }, 0.1)
      .to(tree, { opacity: 0, duration: 0.3 }, 0.45)
      .to(q(".s3-log"), { scale: 1, duration: 0.45, stagger: 0.08, ease: "power3.out" }, 0.55)
      .to(rings, { strokeDashoffset: 0, duration: 0.4, stagger: 0.04, ease: "power1.inOut" }, 0.85)
      .to(line, { strokeDashoffset: 0, duration: 1, ease: "power1.inOut" }, 1.0)
      .to(q(".s3-fill"), { opacity: 0.14, duration: 0.8 }, 1.3)
      .to(arrow, { opacity: 1, scale: 1, duration: 0.35, ease: "power2.out" }, 1.9);
  }
  return tl;
}
