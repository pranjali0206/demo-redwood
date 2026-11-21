import { useEffect, useRef, type CSSProperties } from "react";
import { motion } from "framer-motion";
import {
  Axe,
  FlaskConical,
  HandCoins,
  IndianRupee,
  Pause,
  Play,
  Sprout,
  Truck,
  type LucideIcon,
} from "lucide-react";
import clipLg from "@/assets/teak-growth.mp4";
import clipSm from "@/assets/teak-growth-sm.mp4";
import poster from "@/assets/teak-growth-poster.webp";
import { autoplayFilm, type FilmControls } from "@/components/media/autoplayFilm";

/*
 * "From one seed to premium timber": on the About page, after "Investing in tomorrow's growth".
 *
 * A ten-second film of a Sagwan seed becoming a plantation plays on its own while on screen. Its
 * cream ground is the page's own, so with feathered edges it reads as part of the page.
 *
 * Below it the journey is told in three boxes that light up with the film: Lab work (seed,
 * sprout), Field work (sapling, young tree, plantation), and, as the film ends and holds, Sold:
 * the timber is harvested and sold, and the proceeds are shared. Each stage jumps the film to its
 * moment. Styles: styles/growth.css.
 */

/** The film's stages, with where each begins (as a share of the clip). */
const STAGES = [
  { at: 0, name: "Seed", text: "One hi-tech Sagwan seed, set in living soil." },
  { at: 0.17, name: "Sprout", text: "Roots reach down as the first shoot breaks through." },
  { at: 0.34, name: "Sapling", text: "Broad teak leaves unfold under expert care." },
  { at: 0.56, name: "Young tree", text: "A straight, strong trunk climbs towards the light." },
  { at: 0.76, name: "Plantation", text: "Rows of premium Sagwan, growing in value every year." },
];

/** The film ends, and holds, on the grown plantation: that is the moment it is sold. */
const SOLD_AT = 0.985;

type Group = {
  key: "lab" | "field";
  label: string;
  where: string;
  note: string;
  icon: LucideIcon;
  stages: number[];
};

const GROUPS: Group[] = [
  {
    key: "lab",
    label: "Lab work",
    where: "In our biotech lab",
    note: "Hi-tech Sagwan is germinated and raised under lab control.",
    icon: FlaskConical,
    stages: [0, 1],
  },
  {
    key: "field",
    label: "Field work",
    where: "On your land",
    note: "Planted out and expertly managed until full maturity.",
    icon: Sprout,
    stages: [2, 3, 4],
  },
];

const SALE: { icon: LucideIcon; text: string }[] = [
  { icon: Axe, text: "Harvested at maturity" },
  { icon: Truck, text: "Sold as premium timber" },
  { icon: IndianRupee, text: "75% of the proceeds to you" },
];

const FILM_LABEL =
  "Animation: a Sagwan seed in a mound of soil sprouts, grows into a sapling and then a young tree, and becomes one of many in a mature teak plantation, ready for sale.";

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const stageAt = (p: number) => STAGES.reduce((cur, s, i) => (p >= s.at - 0.001 ? i : cur), 0);
/** How far the film is through a group, from its first stage to its last (fills its track). */
const groupFill = (g: Group, p: number) => {
  const first = STAGES[g.stages[0]].at;
  const last = STAGES[g.stages[g.stages.length - 1]].at;
  return clamp01((p - first) / (last - first));
};

export function GrowthFilm() {
  const rootRef = useRef<HTMLElement>(null);
  const film = useRef<FilmControls | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const $ = <T extends Element = HTMLElement>(sel: string) => root.querySelector<T>(sel)!;
    const steps = Array.from(root.querySelectorAll<HTMLElement>("[data-step]"));
    const boxes = {
      lab: $("[data-box='lab']"),
      field: $("[data-box='field']"),
      sold: $("[data-box='sold']"),
    };
    const tracks = GROUPS.map((g) => ({ g, el: $(`[data-track='${g.key}']`) }));
    const badge = $("[data-stage-name]");
    const progress = $("[data-progress]");
    let current = "";

    const render = (p: number) => {
      progress.style.transform = `scaleX(${p.toFixed(4)})`;
      tracks.forEach(({ g, el }) => (el.style.transform = `scaleX(${groupFill(g, p).toFixed(4)})`));

      const sold = p >= SOLD_AT;
      const i = stageAt(p);
      const key = sold ? "sold" : String(i);
      if (key === current) return;
      current = key;

      steps.forEach((el, j) => {
        el.classList.toggle("is-on", !sold && j === i);
        el.classList.toggle("is-done", sold || j < i);
      });
      boxes.lab.classList.toggle("is-on", !sold && i <= 1);
      boxes.lab.classList.toggle("is-done", sold || i > 1);
      boxes.field.classList.toggle("is-on", !sold && i >= 2);
      boxes.field.classList.toggle("is-done", sold);
      boxes.sold.classList.toggle("is-on", sold);
      root.classList.toggle("is-sold", sold);
      badge.textContent = sold ? "Sold" : STAGES[i].name;
    };

    film.current = autoplayFilm({
      root,
      frame: $(".rwg-film"),
      video: $<HTMLVideoElement>("video"),
      src: { large: clipLg, small: clipSm },
      reduce: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
      holdMs: 3600,
      threshold: 0.35,
      onProgress: render,
      toggleButton: $<HTMLElement>("[data-toggle]"),
      labels: { pause: "Pause the growth film", play: "Play the growth film" },
    });
    return () => {
      film.current?.destroy();
      film.current = null;
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className="rwg relative overflow-hidden px-5 py-20 sm:px-6 md:py-20"
      aria-labelledby="rwg-title"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">Watch it grow</p>
          <h2 id="rwg-title" className="mt-3 font-display text-4xl md:text-5xl">
            From one seed to <span className="italic text-gradient-gold">premium timber</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
            Ten seconds, twelve years: how every Redwood Sagwan tree goes from our lab, to your land,
            to the timber market.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="rwg-film"
        >
          <div className="rwg-film__media" role="img" aria-label={FILM_LABEL}>
            <video
              className="rwg-film__video"
              poster={poster}
              muted
              playsInline
              preload="none"
              tabIndex={-1}
              aria-hidden
            />
          </div>
          <span className="rwg-badge" aria-hidden>
            <i /> <span data-stage-name>{STAGES[0].name}</span>
          </span>
          <button
            type="button"
            className="rwg-toggle"
            onClick={() => film.current?.toggle()}
            data-toggle
            aria-label="Pause the growth film"
          >
            <Pause className="rwg-toggle__pause" aria-hidden />
            <Play className="rwg-toggle__play" aria-hidden />
          </button>
          {/* As the grown plantation holds on screen, it is stamped sold. */}
          <span className="rwg-film__sold" aria-hidden>
            <b>Sold</b>
            <small>Premium Sagwan timber</small>
          </span>
          <span className="rwg-progress" aria-hidden>
            <i data-progress />
          </span>
        </motion.div>

        {/* The journey in three boxes, lighting up with the film. */}
        <div className="rwg-boxes">
          {GROUPS.map((g, gi) => (
            <motion.div
              key={g.key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: gi * 0.1 }}
              className={`rwg-box rwg-box--${g.key}`}
              data-box={g.key}
              style={{ "--n": g.stages.length } as CSSProperties}
            >
              <BoxHead icon={g.icon} label={g.label} where={g.where} step={gi + 1} />
              <p className="rwg-box__note">{g.note}</p>
              <div className="rwg-box__steps">
                <span className="rwg-box__track" aria-hidden>
                  <i data-track={g.key} />
                </span>
                <ol className="rwg-stages" aria-label={`${g.label} stages`}>
                  {g.stages.map((i) => (
                    <li key={STAGES[i].name} data-step>
                      <button type="button" onClick={() => film.current?.seek(STAGES[i].at + 0.002)}>
                        <span className="rwg-stages__dot" aria-hidden>
                          {i + 1}
                        </span>
                        <b>{STAGES[i].name}</b>
                        <span className="rwg-stages__text">{STAGES[i].text}</span>
                      </button>
                    </li>
                  ))}
                </ol>
              </div>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="rwg-box rwg-box--sold"
            data-box="sold"
          >
            <BoxHead icon={HandCoins} label="Sold" where="At the timber market" step={3} />
            <ul className="rwg-sale">
              {SALE.map((s) => (
                <li key={s.text}>
                  <span className="rwg-sale__icon" aria-hidden>
                    <s.icon />
                  </span>
                  {s.text}
                </li>
              ))}
            </ul>
            <span className="rwg-box__stamp" aria-hidden>
              Profit
            </span>
            <span className="rwg-coins" aria-hidden>
              <i>₹</i>
              <i>₹</i>
              <i>₹</i>
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function BoxHead({
  icon: Icon,
  label,
  where,
  step,
}: {
  icon: LucideIcon;
  label: string;
  where: string;
  step: number;
}) {
  return (
    <header className="rwg-box__head">
      <span className="rwg-box__icon" aria-hidden>
        <Icon />
      </span>
      <span className="min-w-0">
        <span className="rwg-box__kicker">Step {step}</span>
        <b className="rwg-box__label">{label}</b>
        <span className="rwg-box__where">{where}</span>
      </span>
    </header>
  );
}
