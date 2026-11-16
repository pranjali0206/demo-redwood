import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, FlaskConical, Sprout } from "lucide-react";
import forestBg from "@/assets/forest-bg.jpg";
import { PlantationSilhouette, SunriseScene, TeakLeaf, TeakLeafOutline } from "./HeroScenery";
import { Reveal } from "./Reveal";

// Figures mirror the Investment page stats row — keep them in sync.
const stats: { value: ReactNode; label: string; gold?: boolean }[] = [
  { value: <StatCount to={75} suffix="%" />, label: "Investor Share of Proceeds" },
  { value: <StatCount to={12} suffix=" yrs" />, label: "Plantation Cycle" },
  { value: <StatCount to={100} suffix="%" />, label: "Professionally Managed" },
  { value: "Tax-Free", label: "Agricultural Income", gold: true },
];

/** Load-in delay for an element with the `rwb-rise` class (see styles/hero.css). */
const rise = (seconds: number) => ({ "--rise-delay": `${seconds}s` }) as CSSProperties;

export function Hero() {
  return (
    <section className="rwb-hero flex min-h-svh flex-col font-jakarta text-rwb-ink">
      <div className="relative isolate flex flex-1 flex-col overflow-hidden">
        {/* Background: gradient, a faint forest photo, two outline leaves */}
        <div aria-hidden className="rwb-hero__canvas absolute inset-0" />
        <div
          aria-hidden
          className="rwb-hero__forest absolute inset-0"
          style={{ backgroundImage: `url(${forestBg})` }}
        />
        <TeakLeafOutline className="pointer-events-none absolute -right-28 -top-24 w-[300px] rotate-[215deg] opacity-50 sm:w-[400px]" />
        <TeakLeafOutline className="pointer-events-none absolute -left-36 top-[40%] w-[280px] rotate-[62deg] opacity-50 sm:w-[360px]" />

        {/* Content */}
        <div className="relative mx-auto flex w-full max-w-[1280px] flex-1 flex-wrap items-center gap-16 px-5 pb-[170px] pt-[108px] sm:px-10 sm:pt-[136px]">
          <div className="@container min-w-0 flex-[1_1_560px]">
            <p
              className="rwb-rise flex items-center gap-3.5 text-xs font-extrabold uppercase tracking-[3.5px] text-rwb-label"
              style={rise(0.1)}
            >
              <span aria-hidden className="h-px w-10 shrink-0 bg-rwb-gold-deep" />
              Innovative Science · Wealthier Tomorrow
            </p>

            {/* 10.3cqi caps the size so each line fits the column on one row (a line is ~9.5em). */}
            <h1
              className="rwb-rise mt-6 font-playfair text-[clamp(46px,min(5.4vw,10.3cqi),78px)] font-bold leading-[1.08] tracking-[-1px]"
              style={rise(0.2)}
            >
              <span className="block">Genetically Premium</span>{" "}
              <span className="block">
                <em className="italic text-rwb-emerald">Sagwan</em> Agroforestry
              </span>
            </h1>

            <p
              className="rwb-rise mt-6 max-w-[560px] text-[19px] leading-[1.55] text-rwb-sub sm:text-[21px]"
              style={rise(0.35)}
            >
              Purchase agricultural land with{" "}
              <strong className="rwb-highlight font-bold">premium Sagwan plantations done</strong>
            </p>

            <p
              className="rwb-rise mt-4 flex items-center gap-2.5 font-playfair text-[22px] font-semibold italic leading-snug text-rwb-emerald"
              style={rise(0.45)}
            >
              <TeakLeaf className="size-[18px] shrink-0 -rotate-30 text-rwb-gold-deep" />
              Be a part of timber producers
            </p>

            <hr
              className="rwb-rise mt-8 max-w-[560px] border-t border-[rgba(14,59,46,0.14)]"
              style={rise(0.55)}
            />

            <p
              className="rwb-rise mt-6 max-w-[560px] text-base leading-relaxed text-rwb-body sm:text-[17px]"
              style={rise(0.65)}
            >
              Grown on your land, managed and sold by us,{" "}
              <strong className="font-extrabold text-rwb-ink">profit earned by you.</strong>
            </p>

            <div className="rwb-rise mt-9 flex flex-wrap gap-3.5" style={rise(0.75)}>
              <Link
                to="/agroforestry"
                className="group inline-flex h-14 items-center justify-center gap-2.5 rounded-full bg-rwb-gold px-8 text-[15px] font-bold text-rwb-ink shadow-[0_14px_30px_-12px_rgba(217,164,65,0.75)] transition-[translate,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-12px_rgba(217,164,65,0.85)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rwb-ink"
              >
                Learn More
                <ArrowRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-[3px]"
                />
              </Link>
              <Link
                to="/model"
                className="group inline-flex h-14 items-center justify-center gap-2.5 rounded-full border-[1.5px] border-rwb-ink bg-white/45 px-8 text-[15px] font-bold text-rwb-ink transition-[translate,background-color] duration-300 hover:-translate-y-0.5 hover:bg-white/75 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rwb-ink"
              >
                Explore the Model
                <ArrowUpRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-[3px]"
                />
              </Link>
            </div>
          </div>

          {/* Once the columns stack (≤1173px) the card moves below the triangle section instead. */}
          <div className="rwb-rise min-w-0 flex-[0_1_470px] max-[1173px]:hidden" style={rise(0.9)}>
            <UrbanFarmerCard />
          </div>
        </div>

        <PlantationSilhouette className="rwb-silhouette pointer-events-none absolute inset-x-0 bottom-0 h-[150px] w-full" />
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
 * The Urban Farmer card on phones and tablets: there the hero stacks, so instead of sitting under
 * the hero copy the card follows the triangle section (hero → triangle → card). On a parchment
 * ground so it runs on from the triangle section. Hidden once the hero shows it beside the copy.
 */
export function UrbanFarmerAfterTriangle() {
  return (
    <div className="rwb-uf-after bg-[#f7f3ea] px-5 pb-16 pt-2 font-jakarta text-rwb-ink sm:px-10 min-[1174px]:hidden">
      <Reveal className="mx-auto max-w-[560px]">
        <UrbanFarmerCard />
      </Reveal>
    </div>
  );
}

function UrbanFarmerCard() {
  return (
    <Link
      to="/urban-farmer"
      className="group block overflow-hidden rounded-[24px] border border-[rgba(14,59,46,0.12)] bg-white shadow-[0_30px_70px_-30px_rgba(14,59,46,0.45)] outline-none transition-[translate,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-[0_40px_90px_-28px_rgba(14,59,46,0.55)] focus-visible:ring-2 focus-visible:ring-rwb-gold focus-visible:ring-offset-2"
    >
      <div className="relative h-[250px] overflow-hidden">
        <SunriseScene className="absolute inset-0 size-full" />
        <span className="absolute left-3.5 top-3.5 inline-flex max-w-[calc(100%-1.75rem)] items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-[11.5px] font-bold uppercase leading-tight tracking-[1.6px] text-rwb-label sm:tracking-[2.4px]">
          <Sprout size={13} className="shrink-0 text-rwb-emerald" />
          A Movement Beyond Rural Boundaries
        </span>
        <span className="absolute bottom-3.5 left-3.5 flex items-center gap-2.5 rounded-[14px] bg-white py-2 pl-2 pr-4 shadow-[0_10px_24px_-12px_rgba(14,59,46,0.5)]">
          <span className="flex size-9 items-center justify-center rounded-[10px] bg-rwb-ink text-rwb-gold-soft">
            <FlaskConical size={18} />
          </span>
          <span className="leading-tight">
            <span className="block font-playfair text-[15px] font-bold text-rwb-ink">
              Hi-Tech Sagwan
            </span>
            <span className="block text-[11.5px] text-rwb-body">Tissue-culture grown</span>
          </span>
        </span>
      </div>

      <div className="px-6 pb-7 pt-[30px] sm:px-8 sm:pb-8">
        <p className="text-xs font-extrabold uppercase tracking-[3.5px] text-rwb-label">
          The Urban Farmer
        </p>
        <h2 className="mt-2.5 font-playfair text-[26px] font-bold leading-[1.2] text-rwb-ink sm:text-[28px]">
          Farming isn't just a rural legacy anymore.
        </h2>
        <p className="mt-3 text-[15px] leading-relaxed text-rwb-body">
          Your address doesn't decide your roots. Wherever you live, your land can still grow your
          future — with Redwood Biotech.
        </p>
        <span className="mt-6 flex h-[58px] items-center justify-between gap-3 rounded-[14px] bg-rwb-gold pl-5 pr-2 text-[15px] font-bold text-rwb-ink">
          Become The Urban Farmer
          <span className="flex size-[42px] items-center justify-center rounded-[10px] bg-rwb-ink/10 transition-transform duration-300 group-hover:translate-x-[3px]">
            <ArrowRight size={17} />
          </span>
        </span>
      </div>
    </Link>
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
