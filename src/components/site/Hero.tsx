import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  Calculator,
  FileCheck2,
  HandCoins,
  LandPlot,
  ShieldCheck,
  Trees,
} from "lucide-react";
import forestPhoto from "@/assets/hero-forest.webp";
import urbanFarmerStamp from "@/assets/urban-farmer-stamp.webp";
import { PlantationTreeRow } from "./HeroScenery";

// Figures mirror the Investment page stats row — keep them in sync.
const stats: { value: ReactNode; label: string; gold?: boolean }[] = [
  { value: <StatCount to={75} suffix="%" />, label: "Investor Share of Proceeds" },
  { value: <StatCount to={12} suffix=" yrs" />, label: "Plantation Cycle" },
  { value: <StatCount to={100} suffix="%" />, label: "Professionally Managed" },
  { value: "Tax-Free", label: "Agricultural Income", gold: true },
];

// The three promises, in plain words.
const points = [
  {
    icon: LandPlot,
    text: (
      <>
        Purchase agricultural land with{" "}
        <strong className="rwb-keyphrase">premium Sagwan plantations</strong>.
      </>
    ),
  },
  {
    icon: Trees,
    text: (
      <>
        Become part of <strong className="rwb-keyphrase">timber production</strong>.
      </>
    ),
  },
  {
    icon: HandCoins,
    text: (
      <>
        Land grown, managed and sold by Redwood Biotech, with{" "}
        <strong className="rwb-keyphrase">proceeds shared with and earned by the landowner</strong>.
      </>
    ),
  },
];

// The Urban Farmer card's perks.
const CARD_PERKS = [
  { icon: Trees, label: "Premium Sagwan" },
  { icon: FileCheck2, label: "Land in your name" },
  { icon: ShieldCheck, label: "Managed by Redwood" },
];

/** Load-in delay for an element with the `rwb-rise` class (see styles/hero.css). */
const rise = (seconds: number) => ({ "--rise-delay": `${seconds}s` }) as CSSProperties;

/** Whether fine-pointer hover effects should run (not on touch, not with reduced motion). */
function canHover() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Eased pointer position over an element, written to --px / --py (each -1…1) on that element.
 * The forest layers read the two variables to drift gently against the pointer.
 */
function usePointerParallax<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !canHover()) return;
    let tx = 0;
    let ty = 0;
    let x = 0;
    let y = 0;
    let frame = 0;
    const tick = () => {
      x += (tx - x) * 0.05;
      y += (ty - y) * 0.05;
      el.style.setProperty("--px", x.toFixed(4));
      el.style.setProperty("--py", y.toFixed(4));
      frame = Math.abs(tx - x) + Math.abs(ty - y) > 0.001 ? requestAnimationFrame(tick) : 0;
    };
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width) * 2 - 1;
      ty = ((e.clientY - r.top) / r.height) * 2 - 1;
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const onLeave = () => {
      tx = 0;
      ty = 0;
      if (!frame) frame = requestAnimationFrame(tick);
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);
  return ref;
}

/** Tilts an element slightly towards the pointer and moves a soft glare with it. */
function useTilt<T extends HTMLElement>(max = 4) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !canHover()) return;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width;
      const ny = (e.clientY - r.top) / r.height;
      el.style.setProperty("--ry", `${((nx - 0.5) * 2 * max).toFixed(2)}deg`);
      el.style.setProperty("--rx", `${((0.5 - ny) * 2 * max).toFixed(2)}deg`);
      el.style.setProperty("--gx", `${(nx * 100).toFixed(1)}%`);
      el.style.setProperty("--gy", `${(ny * 100).toFixed(1)}%`);
      el.dataset.tilting = "true";
    };
    const onLeave = () => {
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
      delete el.dataset.tilting;
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [max]);
  return ref;
}

/** Words that rise out of a soft blur one after another; `start` is the first word's index. */
function Words({ text, start, className }: { text: string; start: number; className?: string }) {
  return (
    <>
      {text.split(" ").map((w, i) => (
        <span key={i}>
          <span
            className={className ? `rwb-word ${className}` : "rwb-word"}
            style={{ "--i": start + i } as CSSProperties}
          >
            {w}
          </span>{" "}
        </span>
      ))}
    </>
  );
}

export function Hero() {
  const sceneRef = usePointerParallax<HTMLDivElement>();

  return (
    <section className="rwb-hero flex min-h-svh flex-col font-manrope text-rwb-ink">
      <div
        ref={sceneRef}
        className="relative isolate flex flex-1 flex-col overflow-hidden bg-white"
      >
        <ForestSide />

        <div className="@container relative mx-auto flex w-full max-w-[1280px] flex-1 flex-col px-5 pb-[168px] pt-[108px] sm:px-10 sm:pt-[124px]">
          <p
            className="rwb-rise flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-rwb-champagne sm:text-xs"
            style={rise(0.05)}
          >
            <span aria-hidden className="h-px w-8 shrink-0 bg-rwb-champagne/60" />
            Innovative Science · Wealthier Tomorrow
          </p>

          {/*
              The headline, three lines in one face and weight. Only the brand is in red: "Redwood
              Biotech" catches one champagne sweep on load and is underlined by a gold swash.
            */}
          <h1
            aria-label="Purchase a farmland of genetically engineered Sagwan from Redwood Biotech"
            className="rwb-headline mt-6 font-lobster text-[clamp(40px,6cqi,80px)] font-normal leading-[1.1] tracking-[0.005em] text-rwb-ink max-sm:font-abril max-sm:text-[clamp(32px,10cqi,46px)] max-sm:leading-[1.1] max-sm:tracking-normal"
          >
            {/* Three set lines from small tablets up; on phones the words flow as one sentence. */}
            <span aria-hidden className="sm:block">
              <Words text="Purchase a Farmland of" start={0} />
            </span>
            <span aria-hidden className="sm:block">
              <Words text="Genetically Engineered Sagwan" start={4} />
            </span>
            <span aria-hidden className="sm:block">
              {/* "from" set small, so the brand carries the line. */}
              <span className="text-[0.6em]">
                <Words text="from" start={7} />
              </span>
              <span className="rwb-brand-line relative text-rwb-red sm:text-[1.08em] sm:inline-block sm:whitespace-nowrap">
                <Words text="Redwood Biotech" start={8} />
                <span aria-hidden className="rwb-brand-underline" />
              </span>
            </span>
          </h1>

          {/* The species and spacing, with the way into the timber calculator. */}
          <div className="rwb-rise mt-5 flex flex-wrap items-center gap-x-5 gap-y-3" style={rise(0.5)}>
            <p className="font-instrument text-[19px] italic leading-snug text-rwb-emerald sm:text-[22px]">
              (Tectona grandis · planted 10 × 10 feet)
            </p>
            <Link
              to="/timber-calculator"
              className="rwb-calc-cta group inline-flex h-11 items-center gap-2.5 rounded-full pl-2 pr-5 text-[14.5px] font-semibold text-rwb-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rwb-ink"
            >
              <span className="flex size-8 items-center justify-center rounded-full bg-rwb-ink text-rwb-gold-soft transition-transform duration-500 group-hover:-rotate-12">
                <Calculator size={16} strokeWidth={2} />
              </span>
              Timber Calculator
              <ArrowRight
                size={15}
                strokeWidth={2}
                className="transition-transform duration-300 ease-out group-hover:translate-x-1"
              />
            </Link>
          </div>

          <div className="mt-7 grid flex-1 items-end gap-x-16 gap-y-12 sm:mt-8 min-[1100px]:grid-cols-[minmax(0,1fr)_minmax(0,360px)]">
            {/* Starts right under the species line (not pushed down to the card's baseline). */}
            <div className="min-w-0 max-w-[660px] self-start">
              <p
                className="rwb-rise text-[28px] font-semibold leading-[1.14] tracking-[-0.025em] text-rwb-ink sm:text-[36px] min-[1100px]:text-[40px]"
                style={rise(0.6)}
              >
                Growth of land, growth of timber,
                <br className="hidden sm:inline" /> is actually{" "}
                <span className="whitespace-nowrap font-instrument text-[1.16em] font-normal italic tracking-normal text-rwb-emerald">
                  growth of yours.
                </span>
              </p>

              <ul className="mt-7 grid gap-3.5 font-dmsans text-[16px] leading-[1.6] text-[#3f6b57] sm:text-[17px]">
                {points.map((p, i) => (
                  <li
                    key={i}
                    className="rwb-rise flex items-start gap-3.5"
                    style={rise(0.8 + i * 0.1)}
                  >
                    <span
                      aria-hidden
                      className="mt-[3px] flex size-7 shrink-0 items-center justify-center rounded-full bg-rwb-emerald/[0.08] text-rwb-emerald"
                    >
                      <p.icon size={15} strokeWidth={1.75} />
                    </span>
                    <span className="text-pretty">{p.text}</span>
                  </li>
                ))}
              </ul>

              <div className="rwb-rise mt-10 flex flex-wrap gap-3" style={rise(1.15)}>
                <Link
                  to="/agroforestry"
                  className="rwb-cta group inline-flex h-[52px] items-center justify-center gap-3 rounded-[10px] bg-rwb-ink px-7 text-[15px] font-semibold text-white transition-colors duration-300 hover:bg-rwb-emerald focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rwb-ink"
                >
                  Learn More
                  <ArrowRight
                    size={17}
                    strokeWidth={2}
                    className="transition-transform duration-300 ease-out group-hover:translate-x-1"
                  />
                </Link>
                <Link
                  to="/model"
                  className="group inline-flex h-[52px] items-center justify-center gap-3 rounded-[10px] border border-rwb-ink/25 px-7 text-[15px] font-semibold text-rwb-ink transition-colors duration-300 hover:border-rwb-ink hover:bg-rwb-ink/[0.03] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rwb-ink"
                >
                  Explore the Model
                  <ArrowUpRight
                    size={17}
                    strokeWidth={2}
                    className="transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </Link>
              </div>
            </div>

            {/* The campaign, set into the forest. On phones the forest becomes this block's backdrop. */}
            <div className="rwb-campaign relative w-full max-w-[460px] min-[1100px]:max-w-none min-[1100px]:self-end min-[1100px]:pb-4">
              <p
                className="rwb-rise rwb-growth relative flex items-center gap-2.5 text-[10.5px] font-semibold uppercase tracking-[0.14em]"
                style={rise(1.0)}
              >
                <span aria-hidden className="h-px w-6 bg-current opacity-60" />
                Growth of land &amp; growth of timber
              </p>
              <div className="rwb-rise relative mt-4" style={rise(1.1)}>
                <UrbanFarmerCard />
              </div>
            </div>
          </div>
        </div>

        {/* The plantation along the bottom edge of the hero. */}
        <PlantationTreeRow className="rwb-treerow pointer-events-none absolute inset-x-0 bottom-0 h-[150px] w-full" />
      </div>

      {/* Stats */}
      <div className="bg-rwb-ink">
        <dl className="mx-auto flex max-w-[1280px] flex-wrap px-5 sm:px-10">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rwb-stat flex flex-col-reverse justify-end px-4 py-6 first:pl-0 sm:px-7 sm:py-8"
            >
              <dt className="mt-2.5 text-[11.5px] font-bold uppercase leading-snug tracking-[1.6px] text-rwb-mist sm:tracking-[2.6px]">
                {s.label}
              </dt>
              <dd
                className={`whitespace-nowrap font-playfair text-[clamp(24px,7.4vw,32px)] font-semibold leading-none lining-nums min-[960px]:text-[clamp(34px,3.6vw,44px)] ${
                  s.gold ? "text-rwb-gold-soft" : "text-rwb-cream"
                }`}
              >
                {s.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/**
 * The forest photograph on the right, full height, eased into the white page. It breathes very
 * slowly, drifts against the pointer, and carries a soft shimmer in its sunbeams.
 */
function ForestSide() {
  return (
    <div aria-hidden className="rwb-forest pointer-events-none absolute inset-y-0 right-0">
      <div className="rwb-forest__layer absolute -inset-[3%]">
        <img
          src={forestPhoto}
          alt=""
          decoding="async"
          fetchPriority="high"
          className="rwb-forest__photo size-full object-cover"
        />
        <div className="rwb-forest__rays absolute inset-0" />
      </div>
    </div>
  );
}

/**
 * The Urban Farmer campaign: a frosted-glass card over the forest. The whole card is one link; it leans
 * slightly towards the pointer with a soft glare.
 */
function UrbanFarmerCard() {
  const tiltRef = useTilt<HTMLAnchorElement>();
  return (
    <div className="rwb-tilt-stage">
      <Link
        ref={tiltRef}
        to="/urban-farmer"
        className="rwb-card group relative block rounded-[16px] p-7 text-rwb-ink outline-none focus-visible:ring-2 focus-visible:ring-rwb-champagne focus-visible:ring-offset-4"
      >
        <span aria-hidden className="rwb-card__glare" />

        <span className="relative flex items-center gap-3.5">
          <img
            src={urbanFarmerStamp}
            alt=""
            className="size-11 shrink-0 rounded-full object-cover ring-1 ring-rwb-ink/10"
          />
          <span className="leading-tight">
            <span className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-rwb-red">
              New campaign
            </span>
            <span className="mt-1 block text-[15px] font-semibold tracking-[-0.01em] text-rwb-ink">
              The Urban Farmer
            </span>
          </span>
        </span>

        <span className="relative mt-5 block font-instrument text-[30px] leading-[1.1] tracking-[-0.01em] text-rwb-ink">
          Invest in Sagwan agroforestry.{" "}
          <em className="text-rwb-emerald">Watch your wealth grow, ring by ring.</em>
        </span>
        <span className="relative mt-3 block text-[14.5px] leading-relaxed text-rwb-ink/75">
          Join the revolutionary journey by{" "}
          <b className="whitespace-nowrap font-semibold text-rwb-red">Redwood Biotech</b> and become an Urban Farmer.
        </span>

        {/* What an Urban Farmer gets, at a glance. */}
        <span className="relative mt-4 flex flex-wrap gap-1.5">
          {CARD_PERKS.map((p) => (
            <span
              key={p.label}
              className="inline-flex items-center gap-1.5 rounded-full bg-white/55 px-2.5 py-1 text-[12px] font-semibold text-rwb-ink shadow-[inset_0_0_0_1px_rgba(16,62,48,0.1)]"
            >
              <p.icon size={13} strokeWidth={2} className="text-rwb-emerald" />
              {p.label}
            </span>
          ))}
        </span>

        <span className="relative mt-5 flex h-[50px] items-center justify-between gap-3 rounded-[10px] bg-rwb-ink pl-5 pr-4 text-[15px] font-semibold text-white transition-colors duration-300 group-hover:bg-rwb-emerald">
          Become The Urban Farmer
          <ArrowRight
            size={17}
            className="transition-transform duration-300 ease-out group-hover:translate-x-1"
          />
        </span>
      </Link>
    </div>
  );
}

/**
 * Counts up from 0 once the strip is on screen. The server HTML carries the real figure, and the
 * `rwb-count` CSS keeps it hidden until this takes over, so it never visibly drops back to 0.
 * With reduced motion, or if JavaScript arrives after the CSS fallback, the real figure stays.
 */
function StatCount({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    // The dataset guard makes a second effect run (Strict Mode, hot reload) a no-op.
    if (!el || el.dataset.counted || getComputedStyle(el).opacity !== "0") return;
    el.dataset.counted = "true";
    el.textContent = `0${suffix}`;
    el.style.animation = "none";

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = Math.max(performance.now(), 900); // no earlier than ~0.9s after page load
        const tick = (now: number) => {
          const p = Math.min(1, Math.max(0, (now - start) / 1800));
          el.textContent = `${Math.round(to * (1 - (1 - p) ** 3))}${suffix}`;
          if (p < 1 && el.isConnected) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
  }, [to, suffix]);

  return (
    <span ref={ref} className="rwb-count">
      {`${to}${suffix}`}
    </span>
  );
}
