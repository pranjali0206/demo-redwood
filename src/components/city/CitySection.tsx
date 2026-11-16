import { useEffect, useRef } from "react";
import { Cross, GraduationCap } from "lucide-react";
import { gsap, ScrollTrigger } from "@/components/triangle/gsapSetup";
import {
  CLOCK,
  clockEase,
  clockInverse,
  desktopLayout,
  mobileLayout,
  polyPoints,
  type Landmark,
  type Layout,
} from "./cityLayout";
import { createRenderer, cubicBezier, type CityRenderer } from "./cityPaint";

/* Constants ---------------------------------------------------------------------------------- */

const DESK = desktopLayout();
const MOB = mobileLayout();

/** The master timeline is 5 s on desktop; phones play the same timeline in 4.5 s. */
const TOTAL = 5;
const MOBILE_SPEED = TOTAL / 4.5;
/** Scrolling on before the time-lapse has finished fast-forwards it. */
const FAST = 4;
const MARK_YEARS = [2026, 2030, 2034, 2038];

const EASE_OUT = cubicBezier(0.22, 1, 0.36, 1);

const NAV_HIDDEN = "rwc-nav-hidden";
const navHidden = (on: boolean) => document.documentElement.classList.toggle(NAV_HIDDEN, on);

const MAP_LABEL =
  "Illustrated site plan: a city grows from 2026 to 2038 up to the green buffer beside Redwood land, while teak trees on the land grow to full size.";

const METERS = [
  { key: "land", label: ["Land", "Value"] },
  { key: "timber", label: ["Timber", "Value"] },
] as const;

const pct = (v: number, total: number) => `${(v / total) * 100}%`;

/* Component ---------------------------------------------------------------------------------- */

/**
 * "The City Is Coming to You." — a light architectural site plan. The city, in pale line-art,
 * grows from its old core toward Redwood land, the only area in colour. One scroll brings the
 * section into view; the 2026 → 2038 time-lapse then plays by itself in about five seconds.
 */
export function CitySection() {
  const rootRef = useRef<HTMLElement>(null);
  const seekRef = useRef<(i: number) => void>(() => {});

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    let cancelled = false;
    const ctx = gsap.context(() => {}, root);

    document.fonts.ready.then(() => {
      if (cancelled) return;
      ctx.add(() => {
        const mm = gsap.matchMedia();
        mm.add(
          {
            desktop: "(min-width: 1024px)",
            mobile: "(max-width: 1023px)",
            reduce: "(prefers-reduced-motion: reduce)",
          },
          (c) => {
            const { desktop, reduce } = c.conditions as { desktop: boolean; reduce: boolean };
            return setup(root, desktop, reduce, seekRef);
          },
        );
      });
      ScrollTrigger.refresh();
    });

    return () => {
      cancelled = true;
      ctx.revert();
      navHidden(false);
    };
  }, []);

  return (
    <section ref={rootRef} className="rwc" aria-labelledby="rwc-title">
      <h2 id="rwc-title" className="rwc-sr">
        The City Is Coming to You.
      </h2>
      <Scene kind="desk" L={DESK} onSeek={(i) => seekRef.current(i)} />
      <Scene kind="mob" L={MOB} />
      <p className="rwc-sr" aria-live="polite" data-rwc-announce="" />
    </section>
  );
}

/* Pieces ------------------------------------------------------------------------------------- */

function Scene({
  kind,
  L,
  onSeek,
}: {
  kind: "desk" | "mob";
  L: Layout;
  onSeek?: (i: number) => void;
}) {
  const lines =
    kind === "desk" ? ["The City Is Coming to You."] : ["The City Is", "Coming to You."];
  return (
    <div className={`rwc-scene rwc-scene--${kind}`}>
      <div className="rwc-frame">
        <header className="rwc-top">
          <div className="rwc-head">
            <p className="rwc-eyebrow">WHY IT WINS</p>
            <p className="rwc-headline" aria-hidden="true">
              {lines.map((l) => (
                <span key={l} className="rwc-mask">
                  <span className="rwc-mask__in">{l}</span>
                </span>
              ))}
            </p>
          </div>
          <div className="rwc-year">
            <p className="rwc-year__label">YEAR</p>
            <p className="rwc-year__num" aria-live="off" data-year="">
              2026
            </p>
            {onSeek ? (
              <div className="rwc-ylinks" role="group" aria-label="Show the map in a given year">
                {MARK_YEARS.map((y, i) => (
                  <button
                    key={y}
                    type="button"
                    className="rwc-ylink"
                    aria-label={`Show the map in ${y}`}
                    onClick={() => onSeek(i)}
                  >
                    {y}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </header>

        <div className="rwc-body">
          <MapPanel L={L} />
          <div className="rwc-meters">
            {METERS.map((m) => (
              <div key={m.key} className="rwc-gauge" data-m={m.key}>
                <div className="rwc-gauge__bar" aria-hidden="true">
                  <div className="rwc-gauge__track">
                    <span className="rwc-gauge__fill" />
                  </div>
                  <svg className="rwc-gauge__chev" viewBox="0 0 10 6" focusable="false">
                    <path d="M1 5.2 5 1.2l4 4" />
                  </svg>
                </div>
                <p className="rwc-gauge__label">
                  {m.label[0]}
                  <br />
                  {m.label[1]}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rwc-closing">
          <p className="rwc-hint" aria-hidden="true">
            Keep scrolling
            <svg viewBox="0 0 10 6" focusable="false">
              <path d="M1 1 5 5l4-4" />
            </svg>
          </p>
          <p className="rwc-close">
            <span className="rwc-ph">
              <span className="rwc-ph__in">The City Grows.</span>
            </span>{" "}
            <span className="rwc-ph">
              <span className="rwc-ph__in">Your Land Grows.</span>
            </span>{" "}
            <span className="rwc-ph">
              <span className="rwc-ph__in rwc-accent">Your Trees Grow.</span>
            </span>
          </p>
          <p className="rwc-sub">Every Redwood land is chosen in the path of growth.</p>
        </div>
      </div>
    </div>
  );
}

function MapPanel({ L }: { L: Layout }) {
  const hw = L.highway;
  // The gate: two crimson posts either side of the highway where it meets the boundary.
  const dx = hw.gate.x - hw.a.x;
  const dy = hw.gate.y - hw.a.y;
  const dl = Math.hypot(dx, dy) || 1;
  const nx = -dy / dl;
  const ny = dx / dl;
  const off = hw.w / 2 + 3;
  return (
    <div className="rwc-map" role="img" aria-label={MAP_LABEL}>
      <div className="rwc-world" aria-hidden="true">
        <canvas className="rwc-cv" data-cv="ground" />
        <canvas className="rwc-cv rwc-cv--city" data-cv="city" />
        <canvas className="rwc-cv" data-cv="trees" />
        <div className="rwc-stage">
          <svg className="rwc-overlay" viewBox={`0 0 ${L.fw} ${L.fh}`} preserveAspectRatio="none">
            <polygon className="rwc-boundary" points={polyPoints(L.land)} />
            {L.land.map((p, i) => (
              <circle key={i} className="rwc-peg" cx={p.x} cy={p.y} r={L.mobile ? 2.2 : 2.8} />
            ))}
            <g className="rwc-gate">
              <line
                x1={hw.gate.x + nx * off}
                y1={hw.gate.y + ny * off}
                x2={hw.gate.x - nx * off}
                y2={hw.gate.y - ny * off}
              />
              {[1, -1].map((s) => (
                <rect
                  key={s}
                  x={hw.gate.x + nx * off * s - 2}
                  y={hw.gate.y + ny * off * s - 2}
                  width="4"
                  height="4"
                />
              ))}
            </g>
          </svg>
          <span
            className="rwc-chip"
            style={{ left: pct(L.chip.x, L.fw), top: pct(L.chip.y, L.fh) }}
          >
            REDWOOD LAND
          </span>
          {L.landmarks.map((l, i) => (
            <Pin key={i} l={l} L={L} />
          ))}
        </div>
      </div>
    </div>
  );
}

/** A landmark pin: 28 px white disc with a line glyph, and a pill label under it. */
function Pin({ l, L }: { l: Landmark; L: Layout }) {
  const anchorY = L.pinMode === "above" ? l.y - l.h / 2 - 2 : l.y;
  return (
    <div
      className={`rwc-pin rwc-pin--${L.pinMode}`}
      style={{ left: pct(l.x, L.fw), top: pct(anchorY, L.fh) }}
    >
      <span className="rwc-pin__disc">
        <Glyph kind={l.kind} />
      </span>
      <span className="rwc-pin__label">{l.label}</span>
    </div>
  );
}

function Glyph({ kind }: { kind: Landmark["kind"] }) {
  if (kind === "school") return <GraduationCap size={15} strokeWidth={1.5} />;
  if (kind === "hospital") return <Cross size={14} strokeWidth={1.5} />;
  // Two houses, side by side.
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
      strokeLinecap="round"
    >
      <path d="M2.5 20.5v-8l5-4.5 5 4.5v8z" />
      <path d="M12.5 12.5 16.5 9l5 4.5v7h-9" />
      <path d="M6 20.5v-4h3v4M16 20.5v-3h2.5v3" />
    </svg>
  );
}

/* DOM state from the clock ------------------------------------------------------------------- */

/** Year, year links and the two gauges follow the clock. */
function bindUi(scope: HTMLElement, root: HTMLElement) {
  const year = scope.querySelector<HTMLElement>("[data-year]")!;
  const links = Array.from(scope.querySelectorAll<HTMLElement>(".rwc-ylink"));
  const gauges = Array.from(scope.querySelectorAll<HTMLElement>(".rwc-gauge")).map((g) => ({
    track: g.querySelector<HTMLElement>(".rwc-gauge__track")!,
    fill: g.querySelector<HTMLElement>(".rwc-gauge__fill")!,
    chev: g.querySelector<SVGElement>(".rwc-gauge__chev")!,
    h: 0,
  }));
  const announce = root.querySelector<HTMLElement>("[data-rwc-announce]");
  let lastYear = -1;
  let announced = false;
  let last = 0;

  const apply = (p: number) => {
    last = p;
    const y = 2026 + Math.round(p * 12);
    if (y !== lastYear) {
      lastYear = y;
      year.textContent = String(y);
      links.forEach((l, i) => {
        const on = y >= MARK_YEARS[i] && (i === 3 || y < MARK_YEARS[i + 1]);
        l.classList.toggle("is-active", on);
        l.setAttribute("aria-pressed", String(on));
      });
    }
    // Gauges: 25% of the track in 2026, 88% in 2038. Timber starts slower (progress^1.4).
    const shares = [p, p ** 1.4];
    gauges.forEach((g, i) => {
      if (!g.h) g.h = g.track.clientHeight;
      const h = g.h * (0.25 + 0.63 * shares[i]);
      g.fill.style.transform = `translate3d(0, ${(g.h - h).toFixed(2)}px, 0)`;
      g.chev.style.transform = `translate3d(0, ${(g.h - h - 6 - 6).toFixed(2)}px, 0)`;
    });
    if (p >= 1 && !announced && announce) {
      announced = true;
      announce.textContent = "Year 2038";
    }
  };
  return {
    apply,
    /** Track heights change with the layout: re-measure. */
    remeasure() {
      gauges.forEach((g) => (g.h = 0));
      apply(last);
    },
  };
}

/* Setup -------------------------------------------------------------------------------------- */

/** Paints the static layers when the section is about one viewport away, in idle time. */
function lazyPrepare(root: Element, renderer: CityRenderer) {
  const io = new IntersectionObserver(
    (entries) => {
      if (!entries.some((e) => e.isIntersecting)) return;
      io.disconnect();
      const idle = (window as { requestIdleCallback?: (cb: () => void) => number })
        .requestIdleCallback;
      if (idle) idle(() => renderer.prepare());
      else window.setTimeout(() => renderer.prepare(), 0);
    },
    { rootMargin: "100% 0px" },
  );
  io.observe(root);
  return io;
}

/**
 * The master timeline (5 s): headline, map fade-up and camera ease-out; the highway draws to
 * the gate; the clock runs 2026 → 2038 with the city, trees and gauges; the four pins pop; the
 * boundary pulses once; the camera settles toward the land, the city fades lighter, and the
 * closing line arrives. Everything rests at the end.
 */
function buildMaster(
  scope: HTMLElement,
  L: Layout,
  state: { p: number; hwy: number },
  render: () => void,
  camera: boolean,
) {
  const q = gsap.utils.selector(scope);
  const map = q(".rwc-map")[0];
  const world = q(".rwc-world")[0];
  const tl = gsap.timeline({ paused: true });

  tl.fromTo(q(".rwc-eyebrow"), { opacity: 0 }, { opacity: 1, duration: 0.5, ease: "none" }, 0)
    .fromTo(
      q(".rwc-headline .rwc-mask__in"),
      { yPercent: 108 },
      { yPercent: 0, duration: 0.6, stagger: 0.07, ease: EASE_OUT },
      0,
    )
    .fromTo(map, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6, ease: EASE_OUT }, 0);
  if (camera) {
    tl.fromTo(
      world,
      { scale: 1.06, transformOrigin: "0% 50%" },
      { scale: 1, duration: 1, ease: "power2.inOut" },
      0.4,
    );
  }
  tl.fromTo(
    state,
    { hwy: 0 },
    { hwy: 1, duration: 2.4, ease: "power1.inOut", onUpdate: render },
    0.4,
  ).fromTo(
    state,
    { p: 0 },
    { p: 1, duration: CLOCK.dur, ease: clockEase, onUpdate: render },
    CLOCK.start,
  );

  q(".rwc-pin").forEach((pin, i) => {
    const at = L.landmarks[i].at;
    tl.fromTo(
      pin.querySelector(".rwc-pin__disc"),
      { scale: 0.6, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.6)" },
      at,
    ).fromTo(
      pin.querySelector(".rwc-pin__label"),
      { opacity: 0, y: -3 },
      { opacity: 1, y: 0, duration: 0.25, ease: EASE_OUT },
      at + 0.1,
    );
  });

  // The highway arrives: a brief crimson tick on the gate.
  tl.fromTo(
    q(".rwc-gate"),
    { opacity: 0.35, scale: 1 },
    {
      keyframes: [
        { opacity: 1, scale: 1.5, duration: 0.14, ease: "power2.out" },
        { scale: 1, duration: 0.3, ease: "power2.inOut" },
      ],
      transformOrigin: "50% 50%",
    },
    2.8,
  )
    // The last suburbs settle; the boundary breathes once.
    .fromTo(
      q(".rwc-boundary"),
      { opacity: 0.8, strokeWidth: 1.5 },
      {
        keyframes: [
          { opacity: 1, strokeWidth: 2.2, duration: 0.15, ease: "power1.out" },
          { opacity: 0.9, strokeWidth: 1.5, duration: 0.3, ease: "power1.inOut" },
        ],
      },
      4.2,
    );

  if (camera) {
    tl.set(world, { transformOrigin: "100% 50%" }, 4.4).to(
      world,
      { scale: 1.03, duration: 0.6, ease: "power2.out" },
      4.4,
    );
  }
  tl.to(q(".rwc-cv--city"), { opacity: 0.7, duration: 0.6, ease: "power1.out" }, 4.4)
    .to(q(".rwc-hint"), { opacity: 0, duration: 0.3, ease: "none" }, 4.3)
    .fromTo(
      q(".rwc-close .rwc-ph__in"),
      { yPercent: 110 },
      { yPercent: 0, duration: 0.6, stagger: 0.07, ease: EASE_OUT },
      4.4,
    )
    .fromTo(
      q(".rwc-sub"),
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.5, ease: EASE_OUT },
      4.74,
    )
    .set({}, {}, TOTAL);
  return tl;
}

function setup(
  root: HTMLElement,
  desktop: boolean,
  reduce: boolean,
  seekRef: { current: (i: number) => void },
) {
  const scope = root.querySelector<HTMLElement>(desktop ? ".rwc-scene--desk" : ".rwc-scene--mob")!;
  const L = desktop ? DESK : MOB;
  const q = gsap.utils.selector(scope);
  const mapEl = q<HTMLElement>(".rwc-map")[0];
  const stageEl = q<HTMLElement>(".rwc-stage")[0];
  const cv = (k: string) => q<HTMLCanvasElement>(`[data-cv="${k}"]`)[0];
  const renderer = createRenderer(
    { ground: cv("ground"), city: cv("city"), trees: cv("trees") },
    L,
    { halos: desktop, grain: desktop },
  );
  const ui = bindUi(scope, root);
  const state = { p: 0, hwy: 0 };
  const render = () => {
    renderer.set(state);
    ui.apply(state.p);
  };

  // The frame fits the panel whole; on desktop it hugs the right (more old city shows on wide
  // panels), on phones the top (more old city shows below).
  const fit = () => {
    const W = mapEl.clientWidth;
    const H = mapEl.clientHeight;
    if (!W || !H) return;
    const s = Math.min(W / L.fw, H / L.fh);
    const w = L.fw * s;
    const h = L.fh * s;
    const x = L.mobile ? (W - w) / 2 : W - w;
    const y = L.mobile ? 0 : (H - h) / 2;
    Object.assign(stageEl.style, {
      left: `${x}px`,
      top: `${y}px`,
      width: `${w}px`,
      height: `${h}px`,
    });
    renderer.resize(W, H, { x, y, s });
    ui.remeasure();
  };
  const ro = new ResizeObserver(fit);
  ro.observe(mapEl);
  fit();
  const io = lazyPrepare(root, renderer);

  const tl = buildMaster(scope, L, state, render, desktop && !reduce);
  const base = desktop ? 1 : MOBILE_SPEED;
  const finish = () => {
    if (tl.progress() < 1) {
      tl.progress(1);
      renderer.snap();
    }
  };

  const cleanup = () => {
    ro.disconnect();
    io.disconnect();
    renderer.destroy();
    navHidden(false);
    seekRef.current = () => {};
  };

  if (reduce) {
    // No pin, no autoplay, no camera: the finished 2038 state.
    renderer.prepare();
    finish();
    render();
    renderer.snap();
    return cleanup;
  }

  render();

  // The pin: when the section reaches the top, it holds for 100vh and the time-lapse plays by
  // itself. Scrolling on early fast-forwards to 2038, so the payoff is always seen.
  const pin = ScrollTrigger.create({
    trigger: root,
    start: "top top",
    end: "+=100%",
    pin: true,
    anticipatePin: 1,
    onEnter: () => {
      renderer.prepare();
      if (tl.progress() === 0) tl.timeScale(base).play(0);
    },
    onEnterBack: finish,
    onLeave: finish,
    onUpdate: (self) => {
      if (
        self.direction > 0 &&
        self.progress > 0.02 &&
        tl.isActive() &&
        tl.timeScale() < base * FAST
      ) {
        tl.timeScale(base * FAST);
      }
    },
  });

  // The site navigation steps away while the section fills the screen.
  ScrollTrigger.create({
    trigger: root,
    start: "top 3px",
    end: () => pin.end,
    onToggle: (self) => navHidden(self.isActive),
  });

  // Once the section is wholly below the screen again, reset it, so coming back down replays.
  ScrollTrigger.create({
    trigger: root,
    start: "top bottom",
    onLeaveBack: () => {
      tl.pause(0);
      state.p = 0;
      state.hwy = 0;
      render();
      renderer.snap();
    },
  });

  // Year links seek the time-lapse; 2026 replays it from the start.
  seekRef.current = (i) => {
    if (i === 0) {
      tl.timeScale(base).restart();
      return;
    }
    const p = (MARK_YEARS[i] - 2026) / 12;
    const t = i === 3 ? TOTAL : CLOCK.start + CLOCK.dur * clockInverse(p);
    tl.pause();
    gsap.to(tl, { time: t, duration: 0.6, ease: "power2.inOut", overwrite: true });
  };

  if (import.meta.env.DEV) {
    (window as unknown as { __rwc?: unknown }).__rwc = { tl, state, pin, renderer, L };
  }

  return cleanup;
}
