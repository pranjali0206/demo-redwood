import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useInView, animate } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Eye, Target, Heart, ArrowRight, Sparkles, TrendingUp } from "lucide-react";
import heroImg from "../assets/about-hero.webp";
import forestImg from "../assets/forest-light.webp";
import saplingImg from "../assets/sapling-new.webp";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import agroforestryField from "../assets/agroforestry-field.webp";
import commerceBg from "../assets/About-commercebg.webp";
export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Redwood Biotech" },
      { name: "description", content: "Redwood Biotech: where science, nature and smart investments meet. Discover our vision, mission and values." },
      { property: "og:title", content: "About Redwood Biotech" },
      { property: "og:description", content: "The future of wealth creation, rooted in nature." },
      { property: "og:image", content: heroImg },
    ],
  }),
  component: AboutPage,
});

// ─── DATA ────────────────────────────────────────────────────────────────────

const story = [
  "At Redwood Biotech, we believe that the future of wealth creation lies at the intersection of Science, Nature, and Smart Investments.",
  "Our journey began with a simple vision—to create an investment model that not only generates long-term value for investors but also contributes positively to the environment. After extensive research into land development, biotechnology, and forestry economics, we identified a unique opportunity: combining strategically located real estate with scientifically managed Genitically Hi-Tech Sagwan (Teak) plantations.",
  "This dual-asset approach allows investors to benefit from two powerful growth drivers—potential land appreciation and the long-term value of premium timber. We chose Sagwan because of its global demand, durability, and reputation as one of the world's most valuable timber species.",
  "What sets Redwood apart is our commitment to science-backed plantation management, careful land selection, and complete transparency. Every project is designed with a long-term perspective, ensuring that growth is driven by both natural and economic fundamentals.",
  "But beyond land and plantations, our greatest asset is the trust of our investors. We believe relationships are built through honesty, communication, and consistent delivery. That's why we focus on creating lifelong partnerships rather than one-time transactions.",
  "As India continues to grow and the demand for sustainable assets increases, Redwood Biotech remains committed to building opportunities that generate value for investors while creating a greener future for generations to come.",
];

const vision = [
  "To be India's trusted agroforestry investment brand.",
  "To create wealth through nature, science, and land.",
  "To build a greener and more prosperous future.",
  "To deliver sustainable value for generations.",
];

const mission = [
  "Develop premium Genitically Hi-Tech Sagwan plantations on strategic land.",
  "Create long-term value through land and timber growth.",
  "Maintain transparency and investor trust.",
  "Promote sustainable and responsible development.",
];

const values = [
  { name: "Trust", desc: "Relationships built on transparency." },
  { name: "Integrity", desc: "Ethical practices in every decision." },
  { name: "Innovation", desc: "Science-driven growth and management." },
  { name: "Sustainability", desc: "Wealth creation with environmental responsibility." },
  { name: "Commitment", desc: "Delivering long-term value to investors." },
];

// Chart data: Year → [Land index, Timber index] (base 100 = Year 1)
const chartData = [
  { year: "Y1",  land: 100,  timber: 100  },
  { year: "Y2",  land: 112,  timber: 108  },
  { year: "Y3",  land: 126,  timber: 122  },
  { year: "Y4",  land: 141,  timber: 141  },
  { year: "Y5",  land: 158,  timber: 166  },
  { year: "Y6",  land: 175,  timber: 198  },
  { year: "Y7",  land: 194,  timber: 238  },
  { year: "Y8",  land: 215,  timber: 288  },
  { year: "Y9",  land: 238,  timber: 350  },
  { year: "Y10", land: 264,  timber: 425  },
  { year: "Y12", land: 321,  timber: 620  },
  { year: "Y15", land: 428,  timber: 1040 },
];

const statsData = [
  { label: "Annual Growth Rate", value: 35, suffix: "%", sub: "over 15 years" },
  { label: "Timber Value at Maturity", value: 940, suffix: "%", sub: "above initial cost" },
  { label: "Dual Growth Drivers", value: 2, suffix: "x", sub: "compounding simultaneously" },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────

/** Animated counting number */
function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const controls = animate(0, target, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate(v) {
        if (ref.current) ref.current.textContent = Math.round(v) + suffix;
      },
    });
    return () => controls.stop();
  }, [inView, target, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

// ─── CHART COMPONENT ─────────────────────────────────────────────────────────

function DualLineChart() {
  const svgRef = useRef<SVGSVGElement>(null);
  const inView = useInView(svgRef, { once: true, margin: "-100px" });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, 1, {
      duration: 2.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: setProgress,
    });
    return () => controls.stop();
  }, [inView]);

  // SVG coordinate system
  const W = 760;
  const H = 320;
  const PAD = { top: 20, right: 28, bottom: 52, left: 52 };
  const innerW = W - PAD.left - PAD.right;
  const innerH = H - PAD.top - PAD.bottom;

  const maxVal = 1040;
  const minVal = 80;
  const range = maxVal - minVal;

  const xOf = (i: number) => PAD.left + (i / (chartData.length - 1)) * innerW;
  const yOf = (v: number) => PAD.top + innerH - ((v - minVal) / range) * innerH;

  // Build full path strings
  const landPath = chartData
    .map((d, i) => `${i === 0 ? "M" : "L"}${xOf(i)},${yOf(d.land)}`)
    .join(" ");
  const timberPath = chartData
    .map((d, i) => `${i === 0 ? "M" : "L"}${xOf(i)},${yOf(d.timber)}`)
    .join(" ");

  // Area fills (close path down to baseline)
  const baselineY = yOf(minVal);
  const landArea = landPath + ` L${xOf(chartData.length - 1)},${baselineY} L${xOf(0)},${baselineY} Z`;
  const timberArea = timberPath + ` L${xOf(chartData.length - 1)},${baselineY} L${xOf(0)},${baselineY} Z`;

  // Y-axis grid lines
  const gridValues = [200, 400, 600, 800, 1000];

  // Approximate stroke-dashoffset animation: use very long dasharray and offset
  const DASH = 2000;

  return (
    <div className="relative w-full overflow-x-auto">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        style={{ minWidth: 340 }}
        aria-label="Dual growth chart: land appreciation and timber value over 15 years"
      >
        <defs>
          {/* Land gradient fill */}
          <linearGradient id="landGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.65 0.18 152)" stopOpacity="0.22" />
            <stop offset="100%" stopColor="oklch(0.65 0.18 152)" stopOpacity="0.0" />
          </linearGradient>
          {/* Timber gradient fill */}
          <linearGradient id="timberGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.80 0.16 60)" stopOpacity="0.20" />
            <stop offset="100%" stopColor="oklch(0.80 0.16 60)" stopOpacity="0.0" />
          </linearGradient>
          {/* Clip for animated reveal */}
          <clipPath id="revealClip">
            <rect
              x={PAD.left}
              y={0}
              width={innerW * progress}
              height={H}
            />
          </clipPath>
        </defs>

        {/* Grid lines */}
        {gridValues.map((v) => (
          <g key={v}>
            <line
              x1={PAD.left} y1={yOf(v)}
              x2={PAD.left + innerW} y2={yOf(v)}
              stroke="oklch(1 0 0 / 0.07)" strokeWidth="1"
            />
            <text
              x={PAD.left - 8} y={yOf(v) + 4}
              textAnchor="end" fontSize="11"
              fill="oklch(1 0 0 / 0.35)"
            >
              {v}
            </text>
          </g>
        ))}

        {/* X axis labels */}
        {chartData.map((d, i) => (
          <text
            key={d.year}
            x={xOf(i)} y={H - PAD.bottom + 18}
            textAnchor="middle" fontSize="11"
            fill="oklch(1 0 0 / 0.35)"
          >
            {d.year}
          </text>
        ))}

        {/* Y axis label */}
        <text
          transform={`translate(14, ${PAD.top + innerH / 2}) rotate(-90)`}
          textAnchor="middle" fontSize="11"
          fill="oklch(1 0 0 / 0.30)"
        >
          Growth Index (Base 100)
        </text>

        {/* Area fills — revealed by clip */}
        <g clipPath="url(#revealClip)">
          <path d={timberArea} fill="url(#timberGrad)" />
          <path d={landArea} fill="url(#landGrad)" />
        </g>

        {/* Lines — revealed by clip */}
        <g clipPath="url(#revealClip)">
          {/* Land line */}
          <path
            d={landPath}
            fill="none"
            stroke="oklch(0.65 0.18 152)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Timber line */}
          <path
            d={timberPath}
            fill="none"
            stroke="oklch(0.80 0.16 60)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>

        {/* Dots at data points (fade in with progress) */}
        {chartData.map((d, i) => {
          const pct = i / (chartData.length - 1);
          const visible = progress > pct + 0.05;
          return (
            <g key={d.year} opacity={visible ? 1 : 0} style={{ transition: "opacity 0.3s" }}>
              <circle cx={xOf(i)} cy={yOf(d.land)} r="4"
                fill="oklch(0.13 0.02 150)" stroke="oklch(0.65 0.18 152)" strokeWidth="2" />
              <circle cx={xOf(i)} cy={yOf(d.timber)} r="4"
                fill="oklch(0.13 0.02 150)" stroke="oklch(0.80 0.16 60)" strokeWidth="2" />
            </g>
          );
        })}

        {/* End-of-line callout labels */}
        {progress > 0.92 && (
          <>
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              <rect x={xOf(chartData.length - 1) + 6} y={yOf(1040) - 12} width={64} height={22} rx={6}
                fill="oklch(0.80 0.16 60 / 0.18)" />
              <text x={xOf(chartData.length - 1) + 38} y={yOf(1040) + 3}
                textAnchor="middle" fontSize="12" fontWeight="600"
                fill="oklch(0.80 0.16 60)">Timber</text>
            </motion.g>
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.15 }}>
              <rect x={xOf(chartData.length - 1) + 6} y={yOf(428) - 12} width={52} height={22} rx={6}
                fill="oklch(0.65 0.18 152 / 0.18)" />
              <text x={xOf(chartData.length - 1) + 32} y={yOf(428) + 3}
                textAnchor="middle" fontSize="12" fontWeight="600"
                fill="oklch(0.65 0.18 152)">Land</text>
            </motion.g>
          </>
        )}
      </svg>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-6">
        <span className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="inline-block h-0.5 w-6 rounded bg-[oklch(0.65_0.18_152)]" />
          Land Appreciation
        </span>
        <span className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="inline-block h-0.5 w-6 rounded bg-[oklch(0.80_0.16_60)]" />
          Timber Value (Sagwan)
        </span>
      </div>
    </div>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

function GrowthEngineSection() {
  return (
    <section className="relative overflow-hidden px-6 py-32">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/3 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[oklch(0.42_0.11_152/0.06)] blur-[120px]" />
      </div>

      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="mb-14 text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">Our Foundation</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">
            Investing in <span className="italic text-gradient-gold">tomorrow's growth</span>
          </h2>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
          {/* LEFT — narrative */}
          <div className="space-y-6">
            <motion.p
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-display text-2xl leading-snug text-foreground md:text-3xl"
            >
              Redwood Biotech was founded on a simple belief: the most rewarding
              investments are those that grow in more than one way.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg leading-relaxed text-muted-foreground"
            >
              We identify land in carefully chosen growth corridors surrounding
              expanding cities, where future urban development has the potential
              to accelerate property appreciation over time. Every plot is then
              registered in the investor's name and developed into a
              professionally managed teak plantation using advanced, genetically
              engineered hi tech Sagwan.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg leading-relaxed text-muted-foreground"
            >
              As cities expand, your land has the potential to increase in value.
              At the same time, your teak plantation matures into a premium
              timber asset. One investment, one registered property, and two
              powerful engines of long-term wealth creation.
            </motion.p>
          </div>

          {/* RIGHT — two engine cards, stacked */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group relative overflow-hidden rounded-3xl border border-border bg-card p-8"
            >
              <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-60" />
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <TrendingUp className="h-6 w-6" />
              </div>
              <p className="text-xs font-medium uppercase tracking-widest text-primary/70">Engine One</p>
              <h3 className="mt-1 font-display text-2xl text-foreground">Land Appreciation</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                Registered land in growth corridors around expanding cities, positioned
                to benefit as urban development accelerates.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.12 }}
              className="group relative overflow-hidden rounded-3xl border border-border bg-card p-8"
            >
              <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-[oklch(0.70_0.16_60)] to-transparent opacity-60" />
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[oklch(0.55_0.16_60/0.12)] text-[oklch(0.70_0.16_60)]">
                <Sparkles className="h-6 w-6" />
              </div>
              <p className="text-xs font-medium uppercase tracking-widest text-[oklch(0.60_0.16_60)]">Engine Two</p>
              <h3 className="mt-1 font-display text-2xl text-foreground">Premium Timber Growth</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                A professionally managed, genetically engineered hi-tech Sagwan
                plantation that matures into a high-value timber asset.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const blur = useTransform(scrollYProgress, [0, 1], ["blur(0px)", "blur(6px)"]);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      {/* Ambient page background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <img src={forestImg} alt="" aria-hidden className="h-full w-full object-cover opacity-[0.18]" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/92 to-background/95" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,transparent_0%,oklch(0.15_0.02_150/0.65)_75%)]" />
      </div>
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative flex h-[100vh] items-end overflow-hidden">
        <motion.div style={{ y, filter: blur }} className="absolute inset-0">
          <img src={heroImg} alt="Sapling held at sunset over plantation" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/10" />
        </motion.div>

        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-24">
          <motion.span
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 rounded-full border border-foreground/20 bg-background/60 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-foreground backdrop-blur"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Our Story
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 1 }}
            className="mt-6 max-w-5xl font-display text-5xl font-medium leading-[0.95] md:text-8xl"
          >
            Where <span className="italic text-gradient-gold">nature</span> grows,<br />
            <span className="text-gradient-hero">wealth follows.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
            className="mt-8 max-w-2xl text-xl text-muted-foreground"
          >
            The intersection of science, nature, and smart investment — built for generations, not transactions.
          </motion.p>
        </div>
      </section>

      {/* ── STORY ────────────────────────────────────────────────────────── */}
      <section className="relative px-6 py-32">
        <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-[1fr_1.2fr]">
          <div className="lg:sticky lg:top-32 lg:h-[calc(100vh-10rem)]">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="h-[420px] lg:h-[70%] overflow-hidden rounded-3xl shadow-[var(--shadow-elegant)]"
            >
              <img src={saplingImg} alt="Hands planting a sapling" loading="lazy" className="h-full w-full object-cover" />
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="mt-6 font-display text-2xl italic text-muted-foreground"
            >
              "Redwood Biotech — where nature grows, wealth follows."
            </motion.p>
          </div>

          <div className="space-y-8">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">The Beginning</p>
            {story.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: 0.05 * i }}
                className={i === 0 ? "font-display text-3xl leading-tight text-foreground md:text-4xl" : "text-lg leading-relaxed text-muted-foreground"}
              >
                {p}
              </motion.p>
            ))}
          </div>
        </div>
      </section>



      <GrowthEngineSection />



      

      {/* ── VISION · MISSION · VALUES — horizontal strip ─────────────────── */}
      <section className="relative bg-black px-6 py-28">
        {/* subtle section divider glow */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

        <div className="mx-auto max-w-6xl">
          {/* Section label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="mb-14 text-center"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">What we stand for</p>
            <h2 className="mt-3 font-display text-4xl text-amber-50 md:text-5xl">
              The principles that <span className="italic text-gradient-gold">guide us</span>
            </h2>
          </motion.div>

          {/* 3-column horizontal layout */}
          <div className="grid gap-6 md:grid-cols-3">

            {/* VISION */}
            <motion.div
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0 }}
              className="group relative overflow-hidden rounded-3xl border border-border bg-card p-8"
            >
              {/* top accent bar */}
              <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-60" />
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Eye className="h-6 w-6" />
              </div>
              <h3 className="font-display text-3xl text-foreground">Vision</h3>
              <p className="mt-1 text-xs font-medium uppercase tracking-widest text-primary/70">Where we're headed</p>
              <ul className="mt-6 space-y-3">
                {vision.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                    transition={{ delay: i * 0.07 }}
                    className="flex items-start gap-3 text-[15px] text-muted-foreground"
                  >
                    <span className="mt-[7px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* MISSION */}
            <motion.div
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.12 }}
              className="group relative overflow-hidden rounded-3xl border border-border bg-card p-8"
            >
              <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-[oklch(0.70_0.16_60)] to-transparent opacity-60" />
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[oklch(0.55_0.16_60/0.12)] text-[oklch(0.70_0.16_60)]">
                <Target className="h-6 w-6" />
              </div>
              <h3 className="font-display text-3xl text-foreground">Mission</h3>
              <p className="mt-1 text-xs font-medium uppercase tracking-widest text-[oklch(0.60_0.16_60)]">How we operate</p>
              <ul className="mt-6 space-y-3">
                {mission.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                    transition={{ delay: 0.12 + i * 0.07 }}
                    className="flex items-start gap-3 text-[15px] text-muted-foreground"
                  >
                    <span className="mt-[7px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[oklch(0.70_0.16_60)]" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* CORE VALUES */}
            <motion.div
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.24 }}
              className="group relative overflow-hidden rounded-3xl border border-border bg-card p-8"
            >
              <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-rose-400/50 to-transparent opacity-60" />
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-rose-500/10 text-rose-400">
                <Heart className="h-6 w-6" />
              </div>
              <h3 className="font-display text-3xl text-foreground">Values</h3>
              <p className="mt-1 text-xs font-medium uppercase tracking-widest text-rose-400/70">What we live by</p>
              <ul className="mt-6 space-y-3">
                {values.map((v, i) => (
                  <motion.li
                    key={v.name}
                    initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                    transition={{ delay: 0.24 + i * 0.07 }}
                    className="flex items-start gap-3 text-[15px] text-muted-foreground"
                  >
                    <span className="mt-[7px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-rose-400" />
                    <span>
                      <span className="font-semibold text-foreground/80">{v.name}</span>
                      {" — "}
                      {v.desc}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

          </div>
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      </section>

      {/* ── COMMERCE SECTION ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-6 py-32">
            {/* Background Image */}
            <div
              className="absolute inset-0 -z-0 bg-cover bg-center bg-no-repeat opacity-[0.2]"
              style={{
                backgroundImage: `url(${commerceBg})`,
              }}
            />
            
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/75 -z-10" />

            {/* Optional Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/80 -z-10" />

            {/* Existing background glows */}
            <div className="pointer-events-none absolute inset-0 -z-10">
              <div className="absolute left-1/2 top-1/3 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[oklch(0.42_0.11_152/0.08)] blur-[120px]" />
              <div className="absolute left-2/3 top-2/3 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[oklch(0.70_0.16_60/0.05)] blur-[100px]" />
            </div>
      {/* Deep background glow */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-1/3 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[oklch(0.42_0.11_152/0.08)] blur-[120px]" />
          <div className="absolute left-2/3 top-2/3 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[oklch(0.70_0.16_60/0.05)] blur-[100px]" />
        </div>

        <div className="mx-auto max-w-6xl">

          {/* Eyebrow + heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="mb-6 flex items-center gap-3"
          >
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[oklch(0.70_0.16_60/0.15)] text-[oklch(0.80_0.16_60)]">
              <TrendingUp className="h-5 w-5" />
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[oklch(0.70_0.16_60)]">
              The Commerce Behind the Opportunity
            </p>
          </motion.div>

          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">

            {/* LEFT — text */}
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="font-display text-4xl leading-tight md:text-5xl"
              >
              You now understand the {" "}
                <span className="italic text-gradient-gold">two growth engines</span>{" "}
                working simultaneously.
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="mt-6 text-lg leading-relaxed text-muted-foreground"
              >
                You now understand the science, biotechnology, and plantation management that form the foundation of our projects. The next question is simple: <span className="font-medium text-foreground">how does this translate into wealth creation?</span>
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.25 }}
                className="mt-5 text-lg leading-relaxed text-muted-foreground"
              >
                Redwood Biotech's model is built around a dual-asset strategy that combines the growth potential of strategically selected land with the long-term value creation of premium Genitically Hi-Tech Sagwan (Teak) plantations. Unlike traditional investments that depend on a single source of returns, our model is designed around multiple growth drivers working simultaneously.
              </motion.p>

              {/* Stat pills */}
              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {statsData.map((s, i) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    transition={{ duration: 0.55, delay: 0.1 + i * 0.1 }}
                    className="rounded-2xl border border-border bg-card p-5"
                  >
                    <p className="font-display text-4xl font-medium text-[oklch(0.80_0.16_60)]">
                      <CountUp target={s.value} suffix={s.suffix} />
                    </p>
                    <p className="mt-1 text-sm font-semibold text-foreground/80">{s.label}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{s.sub}</p>
                  </motion.div>
                ))}
              </div>

              {/* Key callout */}
              <motion.div
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="mt-8 rounded-2xl border border-primary/20 bg-primary/5 px-6 py-5"
              >
                <p className="text-sm leading-relaxed text-muted-foreground">
                  <span className="font-semibold text-primary">Why two assets matter:</span>{" "}
                  Land appreciates as India's land markets grow. Sagwan timber compounds in value as trees mature — reaching peak timber pricing at Year 12–15. Together, they create a return profile no single asset class can replicate.
                </p>
              </motion.div>
            </div>

            {/* RIGHT — chart */}
            <motion.div
              initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-elegant)]"
            >
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="font-display text-xl">Growth Index</p>
                  <p className="text-xs text-muted-foreground">Projected over 12 years · Base = 100 at Y1</p>
                </div>
                <span className="rounded-full border border-[oklch(0.70_0.16_60/0.3)] bg-[oklch(0.70_0.16_60/0.08)] px-3 py-1 text-xs font-semibold text-[oklch(0.80_0.16_60)]">
                  Dual-asset
                </span>
              </div>

              <DualLineChart />

              <p className="mt-5 text-center text-[11px] text-muted-foreground/60">
                Indicative projections based on historical Sagwan market data and regional land appreciation trends. Past performance does not guarantee future results.
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      <section className="relative overflow-hidden px-6 py-36">

  {/* Background */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,200,80,0.18),transparent_35%),linear-gradient(180deg,#06110B_0%,#0D1E15_45%,#1A1208_100%)]" />

  {/* Gold Glow */}
  <div className="absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-amber-400/10 blur-[160px]" />

  {/* Green Glow */}
  <div className="absolute -left-32 bottom-0 h-[450px] w-[450px] rounded-full bg-emerald-500/10 blur-[130px]" />

  {/* Right Glow */}
  <div className="absolute -right-24 top-24 h-[350px] w-[350px] rounded-full bg-yellow-300/10 blur-[120px]" />

  {/* Grid */}
  <div
    className="absolute inset-0 opacity-[0.05]"
    style={{
      backgroundImage: `
        linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)
      `,
      backgroundSize: "70px 70px",
    }}
  />

  <div className="relative z-10 mx-auto max-w-4xl text-center text-white">

    <motion.h2
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="font-display text-4xl md:text-6xl leading-tight"
    >
      Build wealth that{" "}
      <span className="bg-gradient-to-r from-yellow-300 via-amber-400 to-orange-300 bg-clip-text text-transparent italic">
        grows with time
      </span>
    </motion.h2>

    <motion.p
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: .15 }}
      className="mx-auto mt-6 max-w-2xl text-lg text-white/70"
    >
      Own premium land. Grow genetically engineered Hi-Tech Sagwan.
      Create a legacy backed by science and long-term value.
    </motion.p>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: .25 }}
      className="mt-12 flex flex-wrap justify-center gap-5"
    >
      <Link
        to="/model"
        className="group relative overflow-hidden rounded-full px-9 py-4 font-semibold text-white transition-all duration-500 hover:scale-105"
      >
        <span className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-500 via-amber-400 to-orange-500" />
        <span className="absolute inset-0 rounded-full opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-70 bg-yellow-400" />
        <span className="relative flex items-center gap-2">
          Explore the Model
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </Link>

      <Link
        to="/investment"
        className="group relative overflow-hidden rounded-full border border-white/20 bg-white/5 px-9 py-4 font-semibold text-white backdrop-blur-xl transition-all duration-500 hover:border-amber-400/70 hover:bg-white/10 hover:shadow-[0_0_40px_rgba(251,191,36,0.2)]"
      >
        <span className="relative flex items-center gap-2">
          Know Investment Plan
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </Link>
    </motion.div>

  </div>

</section>
      <Footer />
    </div>
  );
}