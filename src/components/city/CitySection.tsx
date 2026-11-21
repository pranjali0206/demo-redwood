import { useEffect, useRef, type CSSProperties } from "react";
import { gsap, ScrollTrigger } from "@/components/triangle/gsapSetup";
import satellite from "@/assets/city-satellite.webp";
import plantation from "@/assets/city-plantation.webp";

/*
 * "The City Is Coming to You." — from orbit to your plot, in one screen.
 *
 * A live satellite view: the city's footprint spreads across the farmland towards Redwood land, a
 * highway draws in, landmarks appear as the city reaches them, and the camera closes in on the
 * plot. A callout links the plot to a live view of the plantation, where the saplings grow up the
 * frame. Beside it the year runs 2026 → 2038 and three figures move with it.
 *
 * The section pins at the top of the screen and the visitor's scrolling drives the years: scroll
 * on and time moves forward, stop and it holds, scroll back and it rewinds. Nothing can rush past
 * unseen, and the release comes only once 2038 is reached.
 */

/* Scene geometry, in the satellite's own units: the photo is 500×887, so the view is 100×177. --- */

const VB = { w: 100, h: 177 };
const CORE = { x: 74, y: 16 }; // where the city starts
const PLOT = { x: 52, y: 106 }; // Redwood land
const PLOT_POLY = "45,99 60,98 61,112 46,113";
const FRONT = { from: 18, to: 80 }; // city edge radius from the core, 2026 → 2038
const ZOOM_MAX = 1.45; // the camera closes in on the plot
const HIGHWAY = "M74 16 C78 40 66 66 62 84 S55 97 53 99";

const LANDMARKS = [
  { key: "hospital", label: "Hospital · 8 min", x: 72, y: 50 },
  { key: "school", label: "School · 5 min", x: 42, y: 60 },
  { key: "highway", label: "Highway · 2 km", x: 66, y: 86 },
].map((l) => {
  const d = Math.hypot(l.x - CORE.x, l.y - CORE.y);
  // The progress at which the city edge reaches this landmark.
  return { ...l, at: (d - FRONT.from) / (FRONT.to - FRONT.from) };
});

/* The time-lapse ------------------------------------------------------------------------------- */

const TOTAL = 1; // the timeline is scrubbed by scroll, so its length is only a unit
/** How much scrolling 2026 → 2038 takes, in screen heights: one scroll covers the whole story. */
const SCROLL_SCREENS = 1;
const YEARS = [2026, 2030, 2034, 2038];
const NAV_HIDDEN = "rwc-nav-hidden";
const navHidden = (on: boolean) => document.documentElement.classList.toggle(NAV_HIDDEN, on);

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const span = (p: number, a: number, b: number) => clamp01((p - a) / (b - a));
const easeOut = (t: number) => 1 - (1 - t) ** 3;
const easeInOut = (t: number) => (t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2);

// Illustrative figures, 2026 → 2038.
const STATS = [
  {
    key: "distance",
    label: "Distance to city edge",
    value: (p: number) => `${(14 - 11.5 * easeOut(p)).toFixed(1)} km`,
    bar: (p: number) => 1 - 0.82 * easeOut(p),
  },
  {
    key: "land",
    label: "Land value",
    value: (p: number) => `${(1 + 2.4 * p ** 1.3).toFixed(1)}×`,
    bar: (p: number) => 0.18 + 0.82 * p ** 1.3,
  },
  {
    key: "trees",
    label: "Tree height",
    value: (p: number) => `${Math.round(1 + 17 * p)} m`,
    bar: (p: number) => 0.06 + 0.94 * p,
  },
] as const;

const PHRASES = ["The city grows.", "Your land grows.", "Your trees grow."];

const MAP_LABEL =
  "Satellite view: from 2026 to 2038 the city spreads across the farmland towards Redwood land, while the teak on the land grows to full height.";

/* Component ------------------------------------------------------------------------------------ */

export function CitySection() {
  const rootRef = useRef<HTMLElement>(null);
  const seekRef = useRef<(i: number) => void>(() => {});

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    let cleanup = () => {};
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add({ reduce: "(prefers-reduced-motion: reduce)", any: "all" }, (c) => {
        cleanup = setup(root, Boolean(c.conditions?.reduce), seekRef);
        return () => cleanup();
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="rwc" aria-labelledby="rwc-title">
      <div className="rwc-frame">
        {/* Story column */}
        <div className="rwc-story">
          <p className="rwc-eyebrow rwc-in" style={{ "--d": 0 } as CSSProperties}>
            <span aria-hidden /> Why it wins
          </p>
          <h2 id="rwc-title" className="rwc-title rwc-in" style={{ "--d": 1 } as CSSProperties}>
            The City Is <em>Coming to You.</em>
          </h2>

          <div className="rwc-year rwc-in" style={{ "--d": 2 } as CSSProperties} aria-hidden>
            <span className="rwc-year__label">Year</span>
            <span className="rwc-year__value" data-year>
              2026
            </span>
          </div>

          <dl className="rwc-stats">
            {STATS.map((s, i) => (
              <div
                key={s.key}
                className={`rwc-stat rwc-stat--${s.key} rwc-in`}
                style={{ "--d": 3 + i } as CSSProperties}
              >
                <dt>{s.label}</dt>
                <dd data-stat={s.key}>{s.value(0)}</dd>
                <span className="rwc-stat__bar" aria-hidden>
                  <i data-bar={s.key} />
                </span>
              </div>
            ))}
          </dl>

          <p className="rwc-phrases rwc-in" style={{ "--d": 6 } as CSSProperties}>
            {PHRASES.map((t, i) => (
              <span key={t} data-phrase={i}>
                {t}{" "}
              </span>
            ))}
          </p>

          <div className="rwc-timeline rwc-in" style={{ "--d": 7 } as CSSProperties}>
            <span className="rwc-timeline__track" aria-hidden>
              <i data-track />
            </span>
            <div className="rwc-timeline__years">
              {YEARS.map((y, i) => (
                <button
                  key={y}
                  type="button"
                  data-chip={i}
                  onClick={() => seekRef.current(i)}
                  aria-label={`Show ${y}`}
                >
                  {y}
                </button>
              ))}
            </div>
          </div>
          <p className="rwc-note rwc-in" style={{ "--d": 8 } as CSSProperties}>
            Illustrative projection.
          </p>
          <p className="rwc-hint" data-hint aria-hidden>
            <span className="rwc-hint__mouse">
              <i />
            </span>
            Scroll to move through time
          </p>
        </div>

        {/* Satellite view */}
        <div className="rwc-map rwc-in" style={{ "--d": 1 } as CSSProperties}>
          <svg
            className="rwc-map__svg"
            viewBox={`0 0 ${VB.w} ${VB.h}`}
            preserveAspectRatio="xMidYMid slice"
            role="img"
            aria-label={MAP_LABEL}
          >
            <defs>
              <pattern id="rwc-blocks" width="3.2" height="3.2" patternUnits="userSpaceOnUse">
                <rect width="3.2" height="3.2" fill="#e9e4d8" />
                <rect x="0.35" y="0.35" width="1.2" height="1.1" fill="#cfc8b8" />
                <rect x="1.85" y="0.35" width="1" height="1.4" fill="#d9d2c3" />
                <rect x="0.35" y="1.75" width="1.4" height="1.1" fill="#d6cfbf" />
                <rect x="2" y="2" width="0.85" height="0.85" fill="#c7bfae" />
              </pattern>
              <clipPath id="rwc-city-clip">
                <circle data-city-clip cx={CORE.x} cy={CORE.y} r={FRONT.from} />
              </clipPath>
              <radialGradient
                id="rwc-city-fade"
                cx={CORE.x}
                cy={CORE.y}
                r="95"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stopColor="#fff" stopOpacity="0.92" />
                <stop offset="1" stopColor="#fff" stopOpacity="0.55" />
              </radialGradient>
              <mask id="rwc-city-mask">
                <rect width={VB.w} height={VB.h} fill="url(#rwc-city-fade)" />
              </mask>
            </defs>

            {/* Everything inside this group moves with the camera. */}
            <g data-camera>
              <image href={satellite} width={VB.w} height={VB.h} className="rwc-map__photo" />
              <rect width={VB.w} height={VB.h} className="rwc-map__grade" />

              {/* The city's footprint, spreading from its core. */}
              <g clipPath="url(#rwc-city-clip)" mask="url(#rwc-city-mask)">
                <rect width={VB.w} height={VB.h} fill="url(#rwc-blocks)" />
              </g>
              <circle data-city-edge className="rwc-edge" cx={CORE.x} cy={CORE.y} r={FRONT.from} />

              {/* Distance rings around the plot. */}
              <circle className="rwc-ring" cx={PLOT.x} cy={PLOT.y} r="16" />
              <circle className="rwc-ring" cx={PLOT.x} cy={PLOT.y} r="32" />
              <text className="rwc-ring__label" x={PLOT.x + 16.8} y={PLOT.y - 1}>
                5 km
              </text>
              <text className="rwc-ring__label" x={PLOT.x + 32.8} y={PLOT.y - 1}>
                10 km
              </text>

              {/* The highway, drawing in towards the land. */}
              <path className="rwc-highway rwc-highway--casing" d={HIGHWAY} />
              <path data-highway className="rwc-highway" d={HIGHWAY} pathLength={1} />

              {/* Redwood land. */}
              <polygon data-plot className="rwc-plot" points={PLOT_POLY} />
              <circle className="rwc-plot__pulse" cx={PLOT.x} cy={PLOT.y} r="3" />
              <circle className="rwc-plot__dot" cx={PLOT.x} cy={PLOT.y} r="1.3" />

              {/* Landmarks, which appear as the city reaches them. */}
              {LANDMARKS.map((l) => (
                <g
                  key={l.key}
                  data-landmark={l.key}
                  className="rwc-pin"
                  transform={`translate(${l.x} ${l.y})`}
                >
                  <g className="rwc-pin__body">
                    <circle r="1.6" className="rwc-pin__dot" />
                    <rect x="-0.2" y="-7.6" width="0.4" height="6" className="rwc-pin__stem" />
                    <g transform="translate(0 -10.2)">
                      <rect
                        x={-l.label.length * 0.78 - 2}
                        y="-2.6"
                        width={l.label.length * 1.56 + 4}
                        height="5.2"
                        rx="2.6"
                        className="rwc-pin__tag"
                      />
                      <text className="rwc-pin__text" textAnchor="middle" y="1.05">
                        {l.label}
                      </text>
                    </g>
                  </g>
                </g>
              ))}
            </g>
          </svg>

          {/* Satellite instrument details (not moved by the camera). */}
          <span className="rwc-hud rwc-hud--tl" aria-hidden />
          <span className="rwc-hud rwc-hud--tr" aria-hidden />
          <span className="rwc-hud rwc-hud--bl" aria-hidden />
          <span className="rwc-hud rwc-hud--br" aria-hidden />
          <span className="rwc-scan" aria-hidden />
          <span className="rwc-live" aria-hidden>
            <i /> Sat · Live
          </span>
          <span className="rwc-coords" aria-hidden>
            21.14° N &nbsp; 79.08° E
          </span>
          <span className="rwc-scale" aria-hidden>
            <i />2 km
          </span>
          <span className="rwc-north" aria-hidden>
            <svg viewBox="0 0 12 16">
              <path d="M6 1 10 13 6 10.5 2 13Z" />
            </svg>
            N
          </span>
          <span className="rwc-plot-tag" aria-hidden>
            Redwood land
          </span>

          {/* Desktop: the callout from the plot to the plantation view. */}
          <span className="rwc-callout" aria-hidden>
            <i data-callout />
          </span>

          {/* Phones: the plantation view as a lens over the map. */}
          <span className="rwc-lens" data-lens aria-hidden>
            <img src={plantation} alt="" />
          </span>
        </div>

        {/* Plantation view */}
        <figure className="rwc-plant rwc-in" style={{ "--d": 2 } as CSSProperties}>
          <div className="rwc-plant__frame">
            <img
              data-plant
              src={plantation}
              alt="Young teak trees growing in rows on Redwood land"
              className="rwc-plant__photo"
            />
            <span className="rwc-plant__sky" aria-hidden />
          </div>
          <span className="rwc-ruler" aria-hidden>
            <i data-ruler />
            <b data-ruler-label>1 m</b>
          </span>
          <figcaption>
            <span className="rwc-live rwc-live--inline" aria-hidden>
              <i /> Live
            </span>
            Redwood land · <span data-plant-year>2026</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

/* Animation ------------------------------------------------------------------------------------ */

function setup(root: HTMLElement, reduce: boolean, seekRef: { current: (i: number) => void }) {
  const $ = <T extends Element = HTMLElement>(sel: string) => root.querySelector<T>(sel);
  const $$ = <T extends Element = HTMLElement>(sel: string) =>
    Array.from(root.querySelectorAll<T>(sel));

  const camera = $<SVGGElement>("[data-camera]")!;
  const cityClip = $<SVGCircleElement>("[data-city-clip]")!;
  const cityEdge = $<SVGCircleElement>("[data-city-edge]")!;
  const highway = $<SVGPathElement>("[data-highway]")!;
  const plot = $<SVGPolygonElement>("[data-plot]")!;
  const landmarks = LANDMARKS.map((l) => ({ ...l, el: $(`[data-landmark="${l.key}"]`)! }));
  const yearEls = [$("[data-year]")!, $("[data-plant-year]")!];
  const stats = STATS.map((s) => ({
    value: s.value,
    fill: s.bar,
    el: $(`[data-stat="${s.key}"]`)!,
    bar: $(`[data-bar="${s.key}"]`)!,
  }));
  const phrases = $$("[data-phrase]");
  const track = $("[data-track]")!;
  const chips = $$("[data-chip]");
  const callout = $("[data-callout]")!;
  const lens = $("[data-lens]")!;
  const plant = $("[data-plant]")!;
  const ruler = $("[data-ruler]")!;
  const rulerLabel = $("[data-ruler-label]")!;
  const hint = $("[data-hint]")!;

  const state = { p: 0 };

  // The plot's tag and the callout are HTML over the map: pin them to the plot's on-screen point.
  // The camera zooms about the plot, so that point only moves when the map is resized (phones crop
  // the view to fill, so it is not simply 52% / 60%).
  const map = $(".rwc-map")!;
  const svg = $<SVGSVGElement>(".rwc-map__svg")!;
  const place = () => {
    const m = svg.getScreenCTM();
    if (!m) return;
    const box = map.getBoundingClientRect();
    const pt = new DOMPoint(PLOT.x, PLOT.y).matrixTransform(m);
    map.style.setProperty("--plot-x", `${(pt.x - box.left).toFixed(1)}px`);
    map.style.setProperty("--plot-y", `${(pt.y - box.top).toFixed(1)}px`);
  };
  const ro = new ResizeObserver(place);
  ro.observe(map);
  place();

  /** Paints the whole scene for progress p (0 = 2026, 1 = 2038). */
  const render = () => {
    const p = state.p;
    const year = String(2026 + Math.round(12 * p));
    yearEls.forEach((el) => el.textContent !== year && (el.textContent = year));

    // Camera: closes in on the plot (the plot stays put on screen).
    const z = 1 + (ZOOM_MAX - 1) * easeInOut(p);
    camera.setAttribute(
      "transform",
      `translate(${PLOT.x} ${PLOT.y}) scale(${z.toFixed(4)}) translate(${-PLOT.x} ${-PLOT.y})`,
    );

    // City: its edge moves out from the core.
    const r = FRONT.from + (FRONT.to - FRONT.from) * easeOut(p);
    cityClip.setAttribute("r", r.toFixed(2));
    cityEdge.setAttribute("r", r.toFixed(2));
    // Landmarks keep their size on screen while the camera closes in.
    landmarks.forEach((l) => {
      l.el.classList.toggle("is-on", easeOut(p) >= l.at);
      l.el.setAttribute("transform", `translate(${l.x} ${l.y}) scale(${(1 / z).toFixed(4)})`);
    });

    highway.style.strokeDashoffset = String(1 - easeInOut(span(p, 0.08, 0.7)));
    plot.style.fillOpacity = String(0.12 + 0.5 * p);

    // Figures.
    stats.forEach((s) => {
      const v = s.value(p);
      if (s.el.textContent !== v) s.el.textContent = v;
      s.bar.style.transform = `scaleX(${s.fill(p).toFixed(4)})`;
    });
    phrases.forEach((el, i) => el.classList.toggle("is-on", p >= i * 0.33));
    track.style.transform = `scaleX(${p.toFixed(4)})`;
    chips.forEach((el, i) => el.classList.toggle("is-on", p >= (YEARS[i] - 2026) / 12 - 0.001));

    // Plantation: the trees grow up the frame and the colour comes in.
    const g = easeOut(span(p, 0.12, 0.92));
    plant.style.clipPath = `inset(${((1 - g) * 100).toFixed(2)}% 0 0 0)`;
    plant.style.filter = `saturate(${(0.35 + 0.75 * g).toFixed(3)})`;
    plant.style.transform = `scale(${(1.18 - 0.18 * g).toFixed(4)})`;
    ruler.style.transform = `scaleY(${(0.04 + 0.96 * g).toFixed(4)})`;
    rulerLabel.textContent = `${Math.round(1 + 17 * p)} m`;
    rulerLabel.style.bottom = `${(4 + 92 * g).toFixed(2)}%`;
    callout.style.transform = `scaleX(${easeOut(span(p, 0.04, 0.24)).toFixed(4)})`;
    lens.style.setProperty("--lens", easeOut(span(p, 0.3, 0.55)).toFixed(4));
    hint.style.opacity = String(1 - span(p, 0.01, 0.08));
  };

  const tl = gsap.timeline({ paused: true });
  tl.to(state, { p: 1, duration: TOTAL, ease: "none", onUpdate: render });

  const live = (on: boolean) => root.classList.toggle("is-live", on);
  const finish = () => {
    tl.pause();
    state.p = 1;
    render();
  };

  render();

  if (reduce) {
    live(true);
    finish();
    seekRef.current = (i) => {
      state.p = (YEARS[i] - 2026) / 12;
      render();
    };
    return () => {
      ro.disconnect();
      seekRef.current = () => {};
    };
  }

  // The pin: the section holds at the top while scrolling drives the timeline (smoothed slightly).
  const pin = ScrollTrigger.create({
    trigger: root,
    start: "top top",
    end: () => `+=${Math.round(window.innerHeight * SCROLL_SCREENS)}`,
    pin: true,
    anticipatePin: 1,
    scrub: 0.6,
    animation: tl,
    invalidateOnRefresh: true,
    onToggle: (self) => self.isActive && live(true),
  });

  // The copy and frames arrive a little before the pin, as the section rises into view (and are
  // simply shown if the page loads with the section already above or inside the screen).
  ScrollTrigger.create({
    trigger: root,
    start: "top 70%",
    end: "max",
    onToggle: (self) => self.isActive && live(true),
  });

  // The site navigation steps away while the section fills the screen.
  const navST = ScrollTrigger.create({
    trigger: root,
    start: "top 3px",
    end: () => pin.end,
    onToggle: (self) => navHidden(self.isActive),
  });

  // Once the section is wholly below the screen again, it rests until the visitor comes back.
  ScrollTrigger.create({
    trigger: root,
    start: "top bottom",
    onLeaveBack: () => live(false),
  });

  // Year buttons scroll to that year's point in the pin.
  seekRef.current = (i) => {
    live(true);
    const f = (YEARS[i] - 2026) / 12;
    const top = pin.start + (pin.end - pin.start) * f + (i === 0 ? 1 : 0);
    window.scrollTo({ top, behavior: "smooth" });
  };

  if (import.meta.env.DEV) {
    (window as unknown as { __rwc?: unknown }).__rwc = { tl, state, pin };
  }

  return () => {
    ro.disconnect();
    navST.kill();
    navHidden(false);
    seekRef.current = () => {};
  };
}
