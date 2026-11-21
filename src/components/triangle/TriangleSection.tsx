import {
  useEffect,
  useRef,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import { gsap, ScrollTrigger, SplitText, prepDraw, token } from "./gsapSetup";
import { RedwoodMark } from "./RedwoodMark";
import { RwButton } from "./RwButton";
import { BOOK_HREF, TRIANGLE_FONTS_ITALIC } from "./constants";
import greeneryImg from "@/assets/sapling-new.webp";
import growthImg from "@/assets/plantation-field.webp";
import logsImg from "@/assets/triangle-logs.webp";
import logBeam from "@/assets/triangle-log-beam.webp";
import woodImg from "@/assets/wood-texture.webp";
import ownLandVideo from "@/assets/triangle-own-land.mp4";
import ownLandPoster from "@/assets/triangle-own-land.webp";
import weGrowVideo from "@/assets/triangle-we-grow.mp4";
import weGrowPoster from "@/assets/triangle-we-grow.webp";
import earnTwiceVideo from "@/assets/triangle-earn-twice.mp4";
import earnTwicePoster from "@/assets/triangle-earn-twice.webp";

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
  title: string;
  line: string;
  tag: ReactNode;
  /** The corner's live clip (blue screen keyed out onto white) and its final frame. */
  video: { src: string; poster: string };
}[] = [
  {
    key: "Ownership",
    title: "Invest in Redwood Estates",
    line: "A registered plot in your name, from day one.",
    tag: (
      <>
        REGISTRY · <span className="s1-tag">YOUR NAME</span>
      </>
    ),
    video: { src: ownLandVideo, poster: ownLandPoster },
  },
  {
    key: "Growth",
    title: "12 Years of Cultivating Premium Sagwan",
    line: "We plant teak, irrigate and tend it, season after season.",
    tag: (
      <>
        IRRIGATED · YEAR <span className="s2-year rw-tab">01</span>
      </>
    ),
    video: { src: weGrowVideo, poster: weGrowPoster },
  },
  {
    key: "Returns",
    title: "Invest, Grow & Earn with Redwood Biotech",
    line: "Your share of the timber at harvest — plus the land, still in your name.",
    tag: (
      <>
        <span className="rw-tag__timber">TIMBER</span> ·{" "}
        <span className="rw-tag__land">+ LAND VALUE</span>
      </>
    ),
    video: { src: earnTwiceVideo, poster: earnTwicePoster },
  },
];

const TRIANGLE_LABEL =
  "Diagram of the Redwood model as a triangle. Ownership: invest in Redwood Estates. Growth: twelve years of cultivating premium Sagwan. Returns: invest, grow and earn with Redwood Biotech.";

/* Component ----------------------------------------------------------------------------------- */

/**
 * "One Land. Two Growths." — the Redwood model as a triangle, on a light ground with greenery,
 * growth and timber photographs. Each corner has its own colour from the brand: brown for the
 * land, green for the growth, the logo's red for the returns. It plays by itself when it scrolls
 * into view: the three corner clips start together while a travelling light draws the triangle,
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

    // Fonts first, so everything measured at setup uses the real typefaces.
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

      {/* Mobile: no triangle, just the three steps on a rail. ---------------------------------- */}
      <div className="rw-mob">
        <Intro mobile />
        <div className="rw-steps">
          <span className="rw-steps__rail" aria-hidden="true" />
          <ol className="rw-steps__list">
            {CORNERS.map((c, k) => (
              <li key={c.key} className="rw-step rw-anim" data-i={k + 1}>
                <span className="rw-step__dot" aria-hidden="true">
                  <span className="rw-step__pulse" />
                  {k + 1}
                </span>
                <p className="rw-key">{c.key}</p>
                <h3 className="rw-step__title rw-title">{c.title}</h3>
                <CornerVideo {...c.video} />
                <p className="rw-step__line">{c.line}</p>
                <p className="rw-tag">{c.tag}</p>
              </li>
            ))}
          </ol>
        </div>
        {/* The close, as a timber card: real wood grain graded into the brand green, a crisp
            log cross-section whose growth rings draw in, the promise, and the visit. */}
        <div className="rw-mfinale rw-anim">
          <div className="rw-mfinale__card">
            <div
              className="rw-photo rw-mfinale__wood"
              style={{ backgroundImage: `url(${woodImg})` }}
              aria-hidden="true"
            />
            <TimberRound />
            <Headline />
            <p className="rw-mfinale__line">
              Your land appreciates while your Sagwan grows into premium timber, and you earn from
              both.
            </p>
            <div className="rw-cta">
              <RwButton href={BOOK_HREF} block ring>
                Book a Site Visit
              </RwButton>
            </div>
            <ul className="rw-mfinale__facts">
              <li>Registered in your name</li>
              <li>Managed for 12 years</li>
              <li>75% of the timber sale</li>
            </ul>
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

/**
 * A Sagwan log's cut face, drawn (so it stays sharp on any screen): bark, heartwood and growth
 * rings around the pith, stamped "Premium Sagwan". The rings carry .rw-ring, so the finale's
 * timeline draws them in, ring by ring.
 */
function TimberRound() {
  const rings = [12, 18, 24, 30, 36];
  return (
    <svg className="rw-round" viewBox="0 0 100 100" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id="rw-round-face" cx="0.46" cy="0.42" r="0.62">
          <stop offset="0" stopColor="#efc98a" />
          <stop offset="0.6" stopColor="#d39a52" />
          <stop offset="1" stopColor="#a8692e" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="47" fill="#4a2c16" />
      <circle cx="50" cy="50" r="42.5" fill="url(#rw-round-face)" />
      <g fill="none" stroke="#7d4a1e" strokeWidth="1" strokeOpacity="0.7">
        {rings.map((r, i) => (
          <circle key={r} className="rw-ring" cx={50 + (i % 2 ? 0.6 : -0.4)} cy={50 + (i % 3) * 0.4} r={r} />
        ))}
      </g>
      <path d="M50 50 L 79 31" stroke="#7a4a1f" strokeWidth="0.8" strokeOpacity="0.5" />
      <circle cx="50" cy="50" r="2.2" fill="#7a4a1f" />
      <text x="50" y="44" textAnchor="middle" className="rw-round__text">
        PREMIUM
      </text>
      <text x="50" y="62" textAnchor="middle" className="rw-round__text">
        SAGWAN
      </text>
    </svg>
  );
}

function WoodBeams({ geo }: { geo: Geo }) {
  const edges = edgesOf(geo);
  const isDesk = geo.w > 400;
  // Thick enough for the log's bark and cut face to read.
  const t = isDesk ? 30 : 15;
  const ext = isDesk ? 30 : 16;

  return (
    <div
      className="rw-beams"
      aria-hidden="true"
      style={{ "--log-beam": `url(${logBeam})` } as CSSProperties}
    >
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
function TriangleSvg({ geo, uid }: { geo: Geo; uid: string }) {
  const [a, b, c] = geo.pts;
  const loop = loopD(geo);
  const edges = edgesOf(geo);
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

/**
 * A corner's live clip: the diorama on white, with a LIVE marker and a progress line in the
 * corner's colour. Playback is driven by the scene timelines (see buildScene): the clip loops while
 * the triangle is on screen and rests when it scrolls away.
 */
function CornerVideo({ src, poster }: { src: string; poster: string }) {
  return (
    <div className="rw-video">
      <video
        className="rw-video__el"
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="metadata"
        disablePictureInPicture
        aria-hidden="true"
        tabIndex={-1}
      />
      <span className="rw-live" aria-hidden="true">
        <i />
        Live
      </span>
      <span className="rw-video__progress" aria-hidden="true">
        <i />
      </span>
    </div>
  );
}

/** Desktop tiles lean a few degrees towards a mouse pointer (CSS reads --tx / --ty). */
function tiltTile(e: ReactPointerEvent<HTMLDivElement>) {
  if (e.pointerType !== "mouse") return;
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  const nx = (e.clientX - r.left) / r.width - 0.5;
  const ny = (e.clientY - r.top) / r.height - 0.5;
  el.style.setProperty("--ty", `${(nx * 10).toFixed(2)}deg`);
  el.style.setProperty("--tx", `${(-ny * 10).toFixed(2)}deg`);
}

function untiltTile(e: ReactPointerEvent<HTMLDivElement>) {
  e.currentTarget.style.setProperty("--tx", "0deg");
  e.currentTarget.style.setProperty("--ty", "0deg");
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
      <div
        className="rw-tile"
        onMouseEnter={() => onHover(i)}
        onPointerMove={tiltTile}
        onPointerLeave={untiltTile}
      >
        <span className="rw-tile__glow" aria-hidden="true" />
        <span className="rw-tile__ring" aria-hidden="true" />
        <CornerVideo {...c.video} />
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

/**
 * Rises a paragraph in, line by line. The lines are measured when the animation plays, not when
 * the section is set up: at setup the block can be hidden or mid-resize (switching between the
 * desktop and phone layouts), and lines measured then would break after every word. Once the rise
 * is done the split is undone, so the text reflows normally at any later width.
 */
function riseLines(el: Element) {
  gsap.set(el, { autoAlpha: 0 });
  let split: ReturnType<typeof SplitText.create> | null = null;
  const undo = () => {
    split?.revert();
    split = null;
  };
  return {
    play() {
      undo();
      split = SplitText.create(el, { type: "lines", mask: "lines" });
      gsap.set(el, { autoAlpha: 1 });
      gsap.from(split.lines, {
        yPercent: 105,
        duration: 0.8,
        stagger: 0.07,
        ease: "power3.out",
        onComplete: undo,
      });
    },
    /** Reduced motion: just show it. */
    show() {
      gsap.set(el, { autoAlpha: 1 });
    },
    revert() {
      undo();
      gsap.set(el, { clearProps: "opacity,visibility" });
    },
  };
}

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
  const bodyLines = riseLines(q(".rw-intro .rw-body-l")[0]);

  const intro = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });
  intro
    .from(root.querySelector(".rw-survey"), { opacity: 0, duration: 0.8 }, 0)
    .from(
      q(".rw-photo"),
      { opacity: 0, scale: 1.05, duration: 1.6, stagger: 0.12, ease: "power2.out" },
      0,
    )
    .from(q(".rw-intro .rw-eyebrow .rw-mask__in"), { yPercent: 105, duration: 0.8 }, 0.1)
    .call(() => bodyLines.play(), undefined, 0.18)
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
    bodyLines.show();
    scenes.forEach((s) => s.settle());
    finale.progress(1, true);
    light.finish();
    corners.settle();
    return () => bodyLines.revert();
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
    bodyLines.revert();
    replayRef.current = () => {};
  };
}

function setupMobile(root: HTMLElement, reduce: boolean, tok: Tok) {
  const scope = root.querySelector<HTMLElement>(".rw-mob")!;
  const q = gsap.utils.selector(scope);
  // No triangle on phones: each step holds its corner's clip and tag.
  const steps = q<HTMLElement>(".rw-step");
  const scenes = steps.map((step, k) => buildScene(k + 1, step, tok));

  const bodyLines = riseLines(q(".rw-intro .rw-body-l")[0]);
  const introTl = gsap
    .timeline({ paused: true, defaults: { ease: "power3.out" } })
    .from(root.querySelector(".rw-survey"), { opacity: 0, duration: 0.8 }, 0)
    .from(q(".rw-intro .rw-eyebrow .rw-mask__in"), { yPercent: 105, duration: 0.8 }, 0.1)
    .call(() => bodyLines.play(), undefined, 0.18);

  // The process steps: a rail in the three colours draws down as you scroll; each step slides in,
  // its dot pops with a ripple in its corner's colour, and its clip starts.
  const rail = q(".rw-steps__rail")[0];
  const stepTls = steps.map((step, k) => {
    const sq = gsap.utils.selector(step);
    return gsap
      .timeline({ paused: true })
      .from(step, { opacity: 0, x: -18, duration: 0.8, ease: "power3.out" }, 0)
      .call(() => scenes[k].play(0), undefined, 0.3)
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
    [introTl, finTl, ...stepTls].forEach((t) => t.progress(1, true));
    bodyLines.show();
    scenes.forEach((s) => s.settle());
    return () => bodyLines.revert();
  }

  playOnEnter(q(".rw-intro")[0], introTl);
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
  if (import.meta.env.DEV) {
    (window as unknown as { __rw?: unknown }).__rw = { introTl, stepTls, finTl, scenes };
  }

  return () => bodyLines.revert();
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
  tails.forEach((t, k) => gsap.set(t, { strokeDasharray: `${tailLens[k]} ${T - tailLens[k]}` }));
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

/**
 * A small touch on a corner's clip as the light passes. It scales the video itself, not its frame:
 * a transform on the frame would isolate the video's multiply blend and show its white ground.
 */
function accent(_i: number, host: Element) {
  const video = host.querySelector(".rw-video__el");
  if (!video) return;
  gsap.fromTo(
    video,
    { scale: 1.04 },
    {
      scale: 1.09,
      duration: 0.25,
      yoyo: true,
      repeat: 1,
      ease: "power2.out",
      clearProps: "transform",
    },
  );
}

/** Corner 2's clip runs from planting to harvest; its year tag follows the clip's own clock. */
const YEARS = 12;

/**
 * One corner's clip as a paused timeline, so it can start with the others or replay alone on hover.
 * Playing the timeline restarts the clip; the timeline spans one pass, after which the clip keeps
 * looping by itself. A frame loop moves the progress line and, for corner 2, the year count. Clips
 * rest while their tile is off screen. `extra` holds the tag text when that lives outside `host`
 * (the mobile steps).
 */
function buildScene(i: number, host: Element, tok: Tok, extra?: Element) {
  const q = gsap.utils.selector(host);
  const qText = (sel: string): Element[] =>
    extra ? [...q(sel), ...Array.from(extra.querySelectorAll(sel))] : q(sel);
  const video = q<HTMLVideoElement>(".rw-video__el")[0];
  const bar = q<HTMLElement>(".rw-video__progress i")[0];
  const years = qText(".s2-year");
  // The tile shows the clip's final frame (its poster) until the clip first plays.
  let started = false;
  let onScreen = true;
  let frame = 0;

  const paint = () => {
    const d = video.duration || 1;
    const p = Math.min(1, video.currentTime / d);
    if (bar) bar.style.transform = `scaleX(${p.toFixed(4)})`;
    if (i === 2) {
      const y = String(Math.min(YEARS, 1 + Math.floor(p * YEARS))).padStart(2, "0");
      years.forEach((el) => {
        if (el.textContent !== y) el.textContent = y;
      });
    }
  };
  const loop = () => {
    paint();
    frame = video.paused ? 0 : requestAnimationFrame(loop);
  };
  video.addEventListener("play", () => {
    if (!frame) frame = requestAnimationFrame(loop);
  });

  const play = () => {
    started = true;
    video.currentTime = 0;
    if (onScreen) video.play().catch(() => {});
  };
  // Off screen the clip rests; back on screen it carries on where it was.
  new IntersectionObserver(([entry]) => {
    onScreen = entry.isIntersecting;
    if (!started) return;
    if (onScreen) video.play().catch(() => {});
    else video.pause();
  }).observe(host);

  const tl = gsap.timeline({ paused: true });
  tl.call(play, undefined, 0).to({}, { duration: 6 }, 0);
  if (i === 1) {
    tl.to(qText(".s1-tag"), { color: tok("--earth-700"), duration: 0.4 }, 4.8);
  }

  // Reduced motion: no playback. The poster shows the finished scene; tags show their end state.
  const settle = () => {
    if (i === 2) years.forEach((el) => (el.textContent = String(YEARS)));
    if (i === 1) gsap.set(qText(".s1-tag"), { color: tok("--earth-700") });
    if (bar) bar.style.transform = "scaleX(1)";
  };
  return Object.assign(tl, { settle });
}
