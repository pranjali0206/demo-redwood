import { useEffect, useRef, type CSSProperties } from "react";
import { Pause, Play } from "lucide-react";
import clipLg from "@/assets/city-timelapse.mp4";
import clipSm from "@/assets/city-timelapse-sm.mp4";
import poster from "@/assets/city-timelapse-poster.webp";
import { autoplayFilm } from "@/components/media/autoplayFilm";

/*
 * "The City Is Coming to You." — twelve years, playing on its own.
 *
 * A centred time-lapse film plays by itself whenever the section is on screen: homes, shops and
 * streets spread across the open fields until a broad, vast city meets the fence of Redwood land,
 * while the Sagwan behind it grows to full height. The film is graded into the site's palette and
 * its edges dissolve into the page.
 *
 * The text below runs with the film: the year counts 2026 → 2038 and the motto follows, and
 * landmarks are called out as the city reaches them. At 2038 the film holds for a moment, then
 * plays again. Desktop visitors can pause it; anyone can jump to a year. On phones it simply
 * keeps playing (no pause button, and only a brief rest at 2038).
 */

/* The film ------------------------------------------------------------------------------------- */

/** The view starts this close on the land and eases out to the whole city by 2038. */
const ZOOM_FROM = 1.1;
/** How long 2038 holds before the film plays again, in ms (phones barely pause). */
const HOLD_MS = 2600;
const HOLD_MS_PHONE = 700;

/** Landmarks, placed in % of the film frame, called out once the city has reached them. */
const LANDMARKS = [
  { key: "highway", label: "Highway · 2 km", x: 15, y: 50.5, at: 0.08 },
  { key: "hospital", label: "Hospital · 8 min", x: 38, y: 29, at: 0.4 },
  { key: "school", label: "School · 5 min", x: 37, y: 71, at: 0.64 },
];

const YEARS = [2026, 2030, 2034, 2038];

const easeInOut = (t: number) => (t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2);

const PHRASES = ["The city grows.", "Your land grows.", "Your trees grow."];

const FILM_LABEL =
  "Time-lapse from 2026 to 2038: homes, shops and streets spread across the open fields until a broad, vast city reaches the fence of Redwood land, while the Sagwan on the land grows to full height.";

/* Component ------------------------------------------------------------------------------------ */

type Controls = { seek: (i: number) => void; toggle: () => void };
const idle: Controls = { seek: () => {}, toggle: () => {} };

export function CitySection() {
  const rootRef = useRef<HTMLElement>(null);
  const controls = useRef<Controls>(idle);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    return setup(root, reduce, controls);
  }, []);

  return (
    <section ref={rootRef} className="rwc" aria-labelledby="rwc-title" data-paused="false">
      <div className="rwc-frame">
        <header className="rwc-head">
          <p className="rwc-eyebrow rwc-in" style={{ "--d": 0 } as CSSProperties}>
            <span aria-hidden /> Why it wins <span aria-hidden />
          </p>
          <h2 id="rwc-title" className="rwc-title rwc-in" style={{ "--d": 1 } as CSSProperties}>
            The City Is <em>Coming to You.</em>
          </h2>
          <p className="rwc-lede rwc-in" style={{ "--d": 2 } as CSSProperties}>
            Homes, shops and streets are spreading across the open fields as a broad, vast city
            grows toward Redwood land. By the time it reaches the fence, your Sagwan stands tall.
          </p>
        </header>

        {/* The time-lapse film, as large as the screen allows once the text has its room */}
        <div className="rwc-stagebox">
        <div className="rwc-film rwc-in" style={{ "--d": 3 } as CSSProperties}>
          <div className="rwc-film__media" role="img" aria-label={FILM_LABEL}>
            <div className="rwc-film__stage" data-stage>
              <video
                data-video
                className="rwc-film__video"
                poster={poster}
                muted
                playsInline
                preload="none"
                tabIndex={-1}
                aria-hidden
              />
              {/* Landmarks, which appear as the city reaches them. */}
              {LANDMARKS.map((l) => (
                <span
                  key={l.key}
                  data-landmark={l.key}
                  className="rwc-pin"
                  style={{ "--x": `${l.x}%`, "--y": `${l.y}%` } as CSSProperties}
                  aria-hidden
                >
                  <span className="rwc-pin__body">
                    <b>{l.label}</b>
                  </span>
                </span>
              ))}
            </div>
            <span className="rwc-film__grade" aria-hidden />
          </div>

          <span className="rwc-live" aria-hidden>
            <i /> Time-lapse · <span data-film-year>2026</span>
          </span>
          <button
            type="button"
            className="rwc-toggle"
            onClick={() => controls.current.toggle()}
            data-toggle
            aria-label="Pause the time-lapse"
          >
            <Pause className="rwc-toggle__pause" aria-hidden />
            <Play className="rwc-toggle__play" aria-hidden />
          </button>
          <span className="rwc-zone rwc-zone--city" aria-hidden>
            The growing city
          </span>
          <span className="rwc-zone rwc-zone--land" aria-hidden>
            Redwood land
          </span>
          <span className="rwc-progress" aria-hidden>
            <i data-progress />
          </span>
        </div>
        </div>

        {/* The readout, running with the film */}
        <div className="rwc-readout">
          <div className="rwc-year rwc-in" style={{ "--d": 4 } as CSSProperties} aria-hidden>
            <span className="rwc-year__label">Year</span>
            <span className="rwc-year__value" data-year>
              2026
            </span>
          </div>

          <div className="rwc-side rwc-in" style={{ "--d": 5 } as CSSProperties}>
            <p className="rwc-phrases">
              {PHRASES.map((t, i) => (
                <span key={t} data-phrase={i}>
                  {t}{" "}
                </span>
              ))}
            </p>
            <div className="rwc-timeline">
              <span className="rwc-timeline__track" aria-hidden>
                <i data-track />
              </span>
              <div className="rwc-timeline__years">
                {YEARS.map((y, i) => (
                  <button
                    key={y}
                    type="button"
                    data-chip={i}
                    onClick={() => controls.current.seek(i)}
                    aria-label={`Show ${y}`}
                  >
                    {y}
                  </button>
                ))}
              </div>
            </div>
            <p className="rwc-note">Illustrative projection.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Playback ------------------------------------------------------------------------------------- */

function setup(root: HTMLElement, reduce: boolean, controls: { current: Controls }) {
  const $ = <T extends Element = HTMLElement>(sel: string) => root.querySelector<T>(sel);
  const $$ = <T extends Element = HTMLElement>(sel: string) =>
    Array.from(root.querySelectorAll<T>(sel));

  const stage = $("[data-stage]")!;
  const landmarks = LANDMARKS.map((l) => ({ ...l, el: $(`[data-landmark="${l.key}"]`)! }));
  const yearEls = [$("[data-year]")!, $("[data-film-year]")!];
  const phrases = $$("[data-phrase]");
  const track = $("[data-track]")!;
  const progress = $("[data-progress]")!;
  const chips = $$("[data-chip]");

  /** Paints the text and overlays for progress p (0 = 2026, 1 = 2038). */
  const render = (p: number) => {
    const year = String(2026 + Math.round(12 * p));
    yearEls.forEach((el) => el.textContent !== year && (el.textContent = year));

    const z = ZOOM_FROM - (ZOOM_FROM - 1) * easeInOut(p);
    stage.style.transform = `scale(${z.toFixed(4)})`;
    landmarks.forEach((l) => l.el.classList.toggle("is-on", p >= l.at));

    phrases.forEach((el, i) => el.classList.toggle("is-on", p >= i * 0.33));
    track.style.transform = `scaleX(${p.toFixed(4)})`;
    progress.style.transform = `scaleX(${p.toFixed(4)})`;
    chips.forEach((el, i) => el.classList.toggle("is-on", p >= (YEARS[i] - 2026) / 12 - 0.001));
  };

  const film = autoplayFilm({
    root,
    frame: $(".rwc-film")!,
    video: $<HTMLVideoElement>("[data-video]")!,
    src: { large: clipLg, small: clipSm },
    reduce,
    holdMs: window.matchMedia("(max-width: 899px)").matches ? HOLD_MS_PHONE : HOLD_MS,
    onProgress: render,
    onEnter: () => root.classList.add("is-live"),
    toggleButton: $<HTMLElement>("[data-toggle]"),
    labels: { pause: "Pause the time-lapse", play: "Play the time-lapse" },
  });
  if (reduce) root.classList.add("is-live");

  controls.current = {
    toggle: film.toggle,
    seek: (i) => film.seek((YEARS[i] - 2026) / 12),
  };

  return () => {
    film.destroy();
    controls.current = idle;
  };
}
