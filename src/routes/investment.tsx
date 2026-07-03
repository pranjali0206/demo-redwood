import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView, useSpring, AnimatePresence } from "framer-motion";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar,
} from "recharts";
import {
  ArrowDownRight, ArrowUpRight, Map, TreePine, FlaskConical, ShieldCheck,
  Sparkles, Layers, ChevronRight, Phone, Mail, Check, Leaf, TrendingUp,
} from "lucide-react";

import logo from "../assets/rw-logo.png";
import heroImg from "../assets/teak-plantation-hero.jpg";
import timberImg from "../assets/agroforestry-field.jpg";
import biotechImg from "../assets/biotech-lab.jpg";
import landImg from "../assets/RealEstateandAgrobg.png";

import { Navbar } from "../components/site/Navbar";
import { Footer } from "../components/site/Footer";
import "../styles/investment-style.css";
import nidhivanImg from "../assets/nidhivan.png";

export const Route = createFileRoute("/investment")({
  head: () => ({
    meta: [
      { title: "The Commerce Behind the Opportunity — Redwood Biotech" },
      { name: "description", content: "An investment is only as strong as the logic behind it. Explore the Redwood Biotech Genitically Hi-Tech Sagwan plantation investment model." },
      { property: "og:title", content: "The Logic Behind the Opportunity — Redwood Biotech" },
      { property: "og:description", content: "Strategic land, premium Genitically Hi-Tech Sagwan timber, scientific management — one structured asset." },
      { property: "og:image", content: heroImg },
      { name: "twitter:image", content: heroImg },
    ],
  }),
  component: Page,
});

/* ---------- DATA ---------- */
const demandData = [
  { y: "2019", domestic: 48, demand: 72 },
  { y: "2020", domestic: 49, demand: 78 },
  { y: "2021", domestic: 51, demand: 85 },
  { y: "2022", domestic: 53, demand: 94 },
  { y: "2023", domestic: 55, demand: 104 },
  { y: "2024", domestic: 57, demand: 116 },
  { y: "2025", domestic: 59, demand: 130 },
];

const growthCurve = [
  { y: "Y0", v: 4 }, { y: "Y2", v: 12 }, { y: "Y4", v: 28 },
  { y: "Y6", v: 52 }, { y: "Y8", v: 86 }, { y: "Y10", v: 130 }, { y: "Y12", v: 188 },
];

const splitData = [
  { name: "Investor Share", value: 75, color: "oklch(0.48 0.18 25)" },
  { name: "Redwood Mgmt", value: 25, color: "oklch(0.32 0.04 40)" },
];

const driversData = [
  { name: "Land Appreciation", value: 88, fill: "oklch(0.48 0.18 25)" },
  { name: "Timber Growth", value: 95, fill: "oklch(0.62 0.21 28)" },
  { name: "Market Demand", value: 82, fill: "oklch(0.42 0.09 145)" },
  { name: "Scientific Mgmt", value: 90, fill: "oklch(0.32 0.04 40)" },
];

/* ---------- PILLARS ---------- */
const pillars = [
  {
    n: "01",
    icon: Map,
    title: "Strategic Land Selection",
    lede: "Land in emerging growth corridors — primed for infrastructure, demand, and long-term appreciation.",
    body: "Our projects begin with carefully selected land located in emerging growth corridors with strong potential for future development, infrastructure expansion, and increasing demand. This creates the foundation for long-term land value appreciation.",
    img: landImg,
  },
  {
    n: "02",
    icon: TrendingUp,
    title: "Growing Demand for Premium Timber",
    lede: "India's timber demand outpaces domestic supply — creating a structural market opportunity for premium Sagwan.",
    body: "India is among the world's largest consumers of timber, yet domestic production continues to lag behind demand, resulting in substantial timber imports every year. As natural forest resources become increasingly limited, professionally managed plantations are expected to play a vital role in bridging this supply gap.",
    img: timberImg,
  },
  {
    n: "03",
    icon: FlaskConical,
    title: "Biotechnology-Driven Growth",
    lede: "Scientific plantation management and biotech-based practices that maximise quality through science.",
    body: "We integrate scientific plantation management and biotechnology-based practices to support healthy growth, efficient resource utilization, and long-term asset development. Our objective is simple: maximize quality through science.",
    img: biotechImg,
  },
  {
    n: "04",
    icon: Layers,
    title: "Professional Asset Management",
    lede: "From planting to harvest, the entire lifecycle is executed by Redwood. You own the asset; we run the operation.",
    body: "Investors benefit from ownership, while Redwood manages the execution — from plantation development and maintenance to monitoring, compliance, harvesting, and market facilitation. Upon maturity, Redwood facilitates the harvesting and commercialisation of the timber asset.",
    img: heroImg,
  },
  {
    n: "05",
    icon: ShieldCheck,
    title: "Investor Protection Framework",
    lede: "Registered land ownership, legal agreements, plantation records — clarity at every step.",
    body: "Every investment is supported by a structured legal framework designed to provide transparency and confidence.",
    checks: [
      "Registered Land Ownership",
      "Legal Documentation & Agreements",
      "Plantation Registration Records",
      "Defined Operational Responsibilities",
      "Transparent Asset Management",
    ],
    img: timberImg,
  },
  {
    n: "06",
    icon: Sparkles,
    title: "Multiple Growth Drivers, One Asset",
    lede: "Land + Timber + Demand + Science. One diversified asset engineered for sustainable wealth.",
    body: "Unlike traditional investments that depend on a single source of returns, this model combines multiple value drivers to create a diversified framework for sustainable wealth creation.",
    drivers: [
      "Strategic Land Appreciation",
      "Sagwan Timber Growth",
      "Rising Timber Demand",
      "Scientific Management",
      "Long-Term Asset Ownership",
    ],
    img: landImg,
  },
];

/* ---------- BUILDING BLOCKS ---------- */

function Reveal({ children, delay = 0, y = 32 }: { children: React.ReactNode; delay?: number; y?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Counter({ to, suffix = "", prefix = "", decimals = 0 }: { to: number; suffix?: string; prefix?: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1600;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min((t - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(to * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return <span ref={ref}>{prefix}{val.toFixed(decimals)}{suffix}</span>;
}

/* ---------- SECTIONS ---------- */

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative h-[100svh] overflow-hidden bg-ink text-ivory">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <img src={heroImg} alt="Redwood Biotech Sagwan plantation at sunrise" className="h-full w-full object-cover" width={1920} height={1280} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/50 to-black/80" />
      </motion.div>

      <motion.div style={{ opacity: fade }} className="relative z-10 h-full flex flex-col">
        <div className="flex-1 flex items-end pb-16 md:pb-24">
          <div className="mx-auto max-w-7xl px-6 w-full">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2.5 rounded-full border border-red-600/50 bg-red-600/10 backdrop-blur px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-white mb-8 shadow-[0_0_20px_rgba(220,38,38,0.25)]"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-600 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-red-600" />
            </span>
            Investment Thesis · 2026
          </motion.div>

            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] text-balance max-w-5xl">
              {"The Commerce Behind".split(" ").map((w, i) => (
                <motion.span
                  key={i}
                  initial={{ y: 60, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 + i * 0.08, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block mr-3 text-white"
                >
                  {w}
                </motion.span>
              ))}
              <br />
              <motion.span
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block italic text-red-700"
              >
                the Opportunity.
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 1 }}
              className="mt-8 max-w-xl text-lg text-white/80 leading-relaxed"
            >
              Where strategic land, premium Genitically Hi-Tech Sagwan timber, and scientific management converge into one structured ecosystem for long-term value.
            </motion.p>
            <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a
              href="#enquire"
              className="group inline-flex items-center gap-2 rounded-full bg-red-600 px-6 py-3.5 text-sm font-medium text-white hover:bg-red-700 transition"
            >
              Book a discovery call
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="#logic"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-transparent px-6 py-3.5 text-sm font-medium text-white hover:bg-white/10 transition"
            >
              Read the thesis
              <ArrowDownRight className="h-4 w-4" />
            </a>
          </motion.div>

          </div>
        </div>

        {/* Ticker */}
          <div className="border-t border-white/15 bg-zinc-600 overflow-hidden">
            <div className="ticker-mask">
              <motion.div
                className="flex gap-12 whitespace-nowrap py-4 text-sm text-white"
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                  duration: 35,
                  ease: "linear",
                  repeat: Infinity,
                }}
              >
                {[...Array(2)].map((_, k) => (
                  <div key={k} className="flex gap-12">
                    <span>SAGWAN · TEAK GRADE A</span>
                    <span>+12.4% ↗ DEMAND YoY</span>
                    <span>LAND CORRIDOR INDEX +8.1%</span>
                    <span>HARVEST CYCLE · 12 YRS</span>
                    <span>NET PROCEEDS SPLIT · 75 / 25</span>
                    <span>BIOTECH MANAGED</span>
                    <span>REGISTERED LAND OWNERSHIP</span>
                    <span>PREMIUM EXPORT TIMBER</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

      </motion.div>
    </section>
  );
}

function LogicIntro() {
  return (
    <section id="logic" className="relative py-32 md:py-48 grain">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-6">— The Thesis</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-4xl md:text-6xl leading-[1.05] text-balance">
            An investment is only as strong as the{" "}
            <span className="italic text-primary">logic</span> behind it.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-10 text-lg text-muted-foreground max-w-2xl leading-relaxed">
            At Redwood Biotech, every component of our model has been carefully designed through a combination of scientific research, strategic planning, legal transparency, and commercial viability.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Rather than relying on a single growth factor, we have created an ecosystem where land, nature, and market demand work together to create long-term value.
          </p>
        </Reveal>

        {/* Stats row */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden border border-border">
          {[
            { v: 6, suf: "", lab: "Foundational Pillars" },
            { v: 75, suf: "%", lab: "Investor Share of Proceeds" },
            { v: 12, suf: " yrs", lab: "Plantation Cycle" },
            { v: 100, suf: "%", lab: "Professionally Managed" },
          ].map((s, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="bg-card p-8 h-full">
                <div className="font-display text-5xl text-primary tabular-nums">
                  <Counter to={s.v} suffix={s.suf} />
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{s.lab}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── NEW: Horizontal pillar card (replaces PillarRow) ── */
function PillarCard({ p, i }: { p: typeof pillars[number]; i: number }) {
  const Icon = p.icon;
  return (
    <Reveal delay={i * 0.07}>
      <div className="group relative flex flex-col rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm hover:border-white/25 hover:bg-white/10 transition-all duration-500 hover:shadow-[0_8px_40px_-12px_rgba(180,40,20,0.35)] h-full">
        {/* Image strip */}
        <div className="relative h-44 overflow-hidden shrink-0">
          <img
            src={p.img}
            alt={p.title}
            className="absolute inset-0 h-full w-full object-cover scale-105 group-hover:scale-110 transition-transform duration-700"
            loading="lazy"
            width={800}
            height={520}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/80" />
          {/* Pillar number — large watermark */}
          <div className="absolute bottom-3 right-4 font-display text-6xl leading-none text-white/20 select-none">
            {p.n}
          </div>
          {/* Icon badge */}
          <div className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full bg-black/50 backdrop-blur border border-white/15 px-3 py-1.5 text-xs font-medium text-white">
            <Icon className="h-3.5 w-3.5 text-red-400" />
            Pillar {p.n}
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-6">
          <h3 className="font-display text-xl leading-snug text-white mb-2">
            {p.title}
          </h3>
          <p className="text-xs font-medium text-red-400 uppercase tracking-widest mb-3">
            {p.lede}
          </p>
          <p className="text-sm text-white/60 leading-relaxed flex-1">
            {p.body}
          </p>

          {/* Checks list (pillar 05) */}
          {p.checks && (
            <ul className="mt-5 space-y-2">
              {p.checks.map((t) => (
                <li key={t} className="flex items-center gap-2.5 text-xs text-white/80">
                  <span className="h-5 w-5 shrink-0 rounded-full bg-red-600/20 grid place-items-center">
                    <Check className="h-3 w-3 text-red-400" strokeWidth={3} />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          )}

          {/* Drivers list (pillar 06) */}
          {p.drivers && (
            <ul className="mt-5 space-y-2">
              {p.drivers.map((t) => (
                <li key={t} className="flex items-center gap-2 text-xs text-white/80">
                  <TrendingUp className="h-3.5 w-3.5 text-red-400 shrink-0" />
                  {t}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Reveal>
  );
}

/* ── NEW: Pillars section — 3 × 2 horizontal grid with gradient bg ── */
function Pillars() {
  const topRow = pillars.slice(0, 3);
  const bottomRow = pillars.slice(3, 6);

  return (
    <section
      id="pillars"
      className="relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #0f0500 0%, #1c0803 18%, #2a0d08 35%, #1a1008 55%, #0d1a0a 75%, #060e14 100%)",
      }}
    >
      {/* Ambient orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full opacity-30"
          style={{ background: "radial-gradient(circle, rgba(180,30,15,0.5) 0%, transparent 70%)", filter: "blur(80px)" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[800px] w-[800px] rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, rgba(120,60,10,0.6) 0%, transparent 70%)", filter: "blur(120px)" }}
        />
        <div
          className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full opacity-25"
          style={{ background: "radial-gradient(circle, rgba(20,80,40,0.5) 0%, transparent 70%)", filter: "blur(80px)" }}
        />
      </div>

      {/* Subtle grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 pt-32 pb-32">
        {/* Header */}
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-red-400 mb-6">— Six Pillars</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-4xl md:text-6xl max-w-3xl text-balance text-white">
            The foundations of a <span className="italic text-red-500">structured</span> opportunity.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-6 text-lg text-white/50 max-w-2xl leading-relaxed">
            The following pillars form the foundation of this opportunity.
          </p>
        </Reveal>

        {/* ── Row 1: pillars 01–03 ── */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-5">
          {topRow.map((p, i) => (
            <PillarCard key={p.n} p={p} i={i} />
          ))}
        </div>

        {/* ── Row 2: pillars 04–06 ── */}
        <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-5">
          {bottomRow.map((p, i) => (
            <PillarCard key={p.n} p={p} i={i + 3} />
          ))}
        </div>
      </div>

      {/* ── Outcome block (unchanged content, re-styled for dark bg) ── */}
      <PillarOutcome />
    </section>
  );
}


function DualAssetSection() {
  return (
    <section id="dual-asset" className="relative py-28 md:py-40 bg-surface overflow-hidden">
      {/* ambient accent */}
      <div className="pointer-events-none absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid md:grid-cols-12 gap-12 items-start">
          {/* Left: narrative */}
          <div className="md:col-span-6">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.3em] text-primary mb-6">
                — Dual Asset Growth Strategy
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display text-4xl md:text-5xl leading-tight text-balance">
                Two engines of wealth.{" "}
                <span className="italic text-primary">One investment.</span>
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="mt-8 text-lg text-muted-foreground leading-relaxed">
                At Redwood Biotech, we don't just offer land — we create a dual-growth
                investment designed to build long-term wealth.
              </p>
            </Reveal>
            <Reveal delay={0.25}>
              <p className="mt-5 text-muted-foreground leading-relaxed">
                Every plot is strategically selected on the developing outskirts of
                rapidly expanding cities, where land values have the potential to
                appreciate significantly as urban infrastructure and population move
                outward. Instead of investing in already expensive city properties
                with comparatively slower appreciation, you own land positioned in
                tomorrow's growth corridors.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="mt-5 text-muted-foreground leading-relaxed">
                Once the land is legally registered in your name, it is transformed
                into a professionally managed teak plantation using genetically
                engineered high tech Sagwan variety. While the land steadily
                appreciates in value, the teak trees continue to mature into a
                premium timber asset.
              </p>
            </Reveal>
            <Reveal delay={0.35}>
              <p className="mt-5 text-foreground leading-relaxed font-medium">
                This creates two independent sources of wealth from a single
                investment — capital appreciation from strategically located land
                and future income from high-value teak harvesting.
              </p>
            </Reveal>
          </div>

          {/* Right: two stacked "engine" cards */}
          <div className="md:col-span-6 space-y-6">
            <Reveal delay={0.15} y={48}>
              <div className="relative rounded-3xl bg-card border border-border p-8 shadow-[0_20px_60px_-30px_rgba(120,30,20,0.2)]">
                <div className="flex items-start gap-4">
                  <span className="h-12 w-12 shrink-0 rounded-full bg-primary/10 grid place-items-center">
                    <Map className="h-5 w-5 text-primary" />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-primary font-medium">
                      Engine 01
                    </p>
                    <h3 className="font-display text-2xl mt-1">
                      Land Appreciation
                    </h3>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                      Plots positioned on the developing outskirts of fast-growing
                      cities — tomorrow's growth corridors, not today's already-priced
                      real estate.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.25} y={48}>
              <div className="relative rounded-3xl bg-card border border-border p-8 shadow-[0_20px_60px_-30px_rgba(120,30,20,0.2)]">
                <div className="flex items-start gap-4">
                  <span className="h-12 w-12 shrink-0 rounded-full bg-primary/10 grid place-items-center">
                    <TreePine className="h-5 w-5 text-primary" />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-primary font-medium">
                      Engine 02
                    </p>
                    <h3 className="font-display text-2xl mt-1">
                      Premium Timber Income
                    </h3>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                      Your registered land is developed into a professionally managed,
                      genetically engineered high-tech Sagwan plantation — maturing
                      into a high-value harvestable asset.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.35}>
              <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6 flex items-center gap-3">
                <span className="h-9 w-9 shrink-0 rounded-full bg-primary/15 grid place-items-center">
                  <Sparkles className="h-4 w-4 text-primary" />
                </span>
                <p className="text-sm text-foreground">
                  <strong>Two independent value streams</strong> — land appreciation
                  and timber income — from a single, structured investment.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}




function DemandSection() {
  return (
    <section className="relative py-28 md:py-40 bg-[#000000] text-white grain">
      <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-12 gap-12 items-start">
        <div className="md:col-span-5">
          <Reveal><p className="text-xs uppercase tracking-[0.3em] text-ember mb-6">— Market Dynamics</p></Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-4xl md:text-5xl leading-tight text-balance">
              India's timber demand outpaces domestic supply — by a widening margin.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 text-ivory/70 leading-relaxed">
              As natural forest resources tighten, professionally managed plantations become essential to bridge the supply gap. Premium Sagwan sits at the centre of this demand.
            </p>
          </Reveal>

          <div className="mt-10 grid grid-cols-2 gap-px bg-ivory/10 rounded-xl overflow-hidden">
            <div className="bg-ink p-6">
              <div className="text-3xl font-display tabular-nums text-ember"><Counter to={71} suffix="M m³" /></div>
              <p className="mt-2 text-xs text-ivory/60">Annual demand · 2025E</p>
            </div>
            <div className="bg-ink p-6">
              <div className="text-3xl font-display tabular-nums text-ember"><Counter to={45} prefix="-" suffix="%" /></div>
              <p className="mt-2 text-xs text-ivory/60">Domestic supply gap</p>
            </div>
          </div>
        </div>

        <div className="md:col-span-7">
          <Reveal y={48}>
            <div className="rounded-2xl bg-ivory/5 border border-ivory/10 p-6 backdrop-blur">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-xs uppercase tracking-widest text-ivory/50">Demand vs Domestic Production</p>
                  <p className="font-display text-xl mt-1">Million cubic metres · India</p>
                </div>
                <div className="flex items-center gap-4 text-xs">
                  <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-ember" />Demand</span>
                  <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-ivory/40" />Domestic</span>
                </div>
              </div>
              <div className="h-72">
                <ResponsiveContainer>
                  <AreaChart data={demandData}>
                    <defs>
                      <linearGradient id="dg" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="oklch(0.62 0.21 28)" stopOpacity={0.6} />
                        <stop offset="100%" stopColor="oklch(0.62 0.21 28)" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="oklch(0.97 0.012 80)" stopOpacity={0.25} />
                        <stop offset="100%" stopColor="oklch(0.97 0.012 80)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
                    <XAxis dataKey="y" stroke="rgba(255,255,255,0.5)" tickLine={false} axisLine={false} />
                    <YAxis stroke="rgba(255,255,255,0.5)" tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ background: "oklch(0.18 0.02 30)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "white" }} />
                    <Area type="monotone" dataKey="demand" stroke="oklch(0.62 0.21 28)" fill="url(#dg)" strokeWidth={2.5} />
                    <Area type="monotone" dataKey="domestic" stroke="oklch(0.97 0.012 80)" fill="url(#sg)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <Reveal y={48} delay={0.1}>
              <div className="rounded-2xl bg-ivory/5 border border-ivory/10 p-6">
                <p className="text-xs uppercase tracking-widest text-ivory/50 mb-2">Sagwan Asset Trajectory</p>
                <p className="font-display text-lg mb-4">Relative biological value · 12-yr cycle</p>
                <div className="h-40">
                  <ResponsiveContainer>
                    <LineChart data={growthCurve}>
                      <XAxis dataKey="y" stroke="rgba(255,255,255,0.4)" tickLine={false} axisLine={false} />
                      <Tooltip contentStyle={{ background: "oklch(0.18 0.02 30)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8 }} />
                      <Line type="monotone" dataKey="v" stroke="oklch(0.62 0.21 28)" strokeWidth={2.5} dot={{ fill: "oklch(0.62 0.21 28)", r: 3 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </Reveal>
            <Reveal y={48} delay={0.15}>
              <div className="rounded-2xl bg-ivory/5 border border-ivory/10 p-6">
                <p className="text-xs uppercase tracking-widest text-ivory/50 mb-2">Growth Driver Composite</p>
                <p className="font-display text-lg mb-4">Index strength</p>
                <div className="h-40">
                  <ResponsiveContainer>
                    <BarChart data={driversData} layout="vertical" margin={{ left: 0 }}>
                      <XAxis type="number" hide />
                      <YAxis dataKey="name" type="category" stroke="rgba(255,255,255,0.6)" tickLine={false} axisLine={false} width={120} fontSize={11} />
                      <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                        {driversData.map((d, i) => <Cell key={i} fill={d.fill} />)}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function FarmPlanSection() {
  return (
    <section className="py-28 md:py-40 bg-[#060606] text-white">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-red-400 mb-6">— Farm Plan</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl leading-snug text-balance max-w-4xl uppercase tracking-wide">
            Redwood Biotech Proposed Planning of Farm Land on Land Bearing Khasra No.{" "}
            <span className="text-red-500">47/1/1, 47/1/2, 47/2/1, 47/2/2, 47/3/1, 47/3/2</span>{" "}
            at Vill. Kharkua Teh. Balwara
          </h2>
        </Reveal>

        {/* Farm plan image */}
        <Reveal delay={0.2} y={48}>
          <div className="mt-12 rounded-2xl overflow-hidden border border-white/10 shadow-[0_30px_80px_-20px_rgba(180,30,20,0.2)]">
            <img
              src={nidhivanImg}
              alt="Redwood Biotech proposed farm planning map — Khasra No. 47/1/1 to 47/3/2, Vill. Kharkua Teh. Balwara"
              className="w-full object-contain bg-white"
              loading="lazy"
            />
          </div>
        </Reveal>

        {/* Location map */}
        <Reveal delay={0.3} y={48}>
          <div className="mt-8 rounded-2xl overflow-hidden border border-white/10 shadow-[0_20px_60px_-20px_rgba(180,30,20,0.15)]">
            {/* Map header bar */}
            <div className="flex items-center justify-between px-5 py-4 bg-white/5 border-b border-white/10">
              <div className="flex items-center gap-3">
                <span className="h-8 w-8 rounded-full bg-red-600/20 grid place-items-center">
                  <Map className="h-4 w-4 text-red-400" />
                </span>
                <div>
                  <p className="text-sm font-medium text-white/90">Site Location · Vill. Kharkua, Teh. Balwara</p>
                  <p className="text-xs text-white/40">22°22'30.8"N 75°56'8.2"E</p>
                </div>
              </div>
              
              <a
                href="https://www.google.com/maps/place/Green+project/@22.3751268,75.9357087,17z"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/80 hover:bg-white/10 hover:border-white/40 transition"
              >
                View on Google Maps
                <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>

            {/* Embedded map */}
            <div className="relative h-[420px] md:h-[520px]">
              <iframe
                title="Redwood Biotech Farm Site Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3672.8!2d75.9357087!3d22.3751268!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962930026951ef9%3A0xc5bbcfd6c577c1e3!2sGreen%20project!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.4}>
          <p className="mt-6 text-xs text-white/30 text-center">
            Site plan subject to final survey and regulatory approval. For illustrative purposes only.
          </p>
        </Reveal>
      </div>
    </section>
  );
}



function EconomicsSection() {
  return (
    <section id="economics" className="py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-6">
            <Reveal><p className="text-xs uppercase tracking-[0.3em] text-primary mb-6">— Investor Economics</p></Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display text-4xl md:text-5xl leading-tight text-balance">
                You own the asset. <br />
                <span className="italic text-primary">We run the operation.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-lg">
                Upon maturity of the plantation, Redwood facilitates harvesting and commercialisation. As per the agreed structure, <strong className="text-foreground">75% of net proceeds</strong> from timber sales are shared with the investor, while 25% is retained by the company for management, maintenance, operations, and market execution.
              </p>
            </Reveal>

            <div className="mt-10 space-y-3">
              {[
                "Registered Land Ownership",
                "Legal Documentation & Agreements",
                "Plantation Registration Records",
                "Defined Operational Responsibilities",
                "Transparent Asset Management",
              ].map((t, i) => (
                <Reveal key={t} delay={0.05 * i}>
                  <div className="flex items-center gap-3 text-foreground">
                    <span className="h-6 w-6 rounded-full bg-primary/10 grid place-items-center">
                      <Check className="h-3.5 w-3.5 text-primary" strokeWidth={3} />
                    </span>
                    <span className="text-sm md:text-base">{t}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="md:col-span-6">
            <Reveal y={48}>
              <div className="relative rounded-3xl bg-card border border-border p-8 md:p-10 shadow-[0_30px_80px_-30px_rgba(120,30,20,0.25)]">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Net Proceeds Distribution</p>
                <p className="font-display text-2xl mt-1">Harvest economics</p>

                <div className="relative h-72 mt-4">
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie data={splitData} dataKey="value" innerRadius={80} outerRadius={120} paddingAngle={2} startAngle={90} endAngle={-270}>
                        {splitData.map((d, i) => <Cell key={i} fill={d.color} />)}
                      </Pie>
                      <Tooltip contentStyle={{ background: "white", border: "1px solid oklch(0.89 0.01 40)", borderRadius: 8 }} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 grid place-items-center pointer-events-none">
                    <div className="text-center">
                      <div className="font-display text-5xl text-primary tabular-nums"><Counter to={75} suffix="%" /></div>
                      <p className="text-xs text-muted-foreground mt-1">to the investor</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-primary/5 p-4 border border-primary/20">
                    <div className="flex items-center gap-2 text-primary">
                      <span className="h-2 w-2 rounded-full bg-primary" />
                      <span className="text-xs font-medium uppercase tracking-wider">Investor</span>
                    </div>
                    <div className="font-display text-3xl mt-2 text-primary">75%</div>
                    <p className="text-xs text-muted-foreground mt-1">of net timber proceeds</p>
                  </div>
                  <div className="rounded-xl bg-bark/5 p-4 border border-bark/20">
                    <div className="flex items-center gap-2 text-bark">
                      <span className="h-2 w-2 rounded-full bg-bark" />
                      <span className="text-xs font-medium uppercase tracking-wider">Redwood</span>
                    </div>
                    <div className="font-display text-3xl mt-2 text-bark">25%</div>
                    <p className="text-xs text-muted-foreground mt-1">management & execution</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Growth drivers radial */}
        <div className="mt-24 rounded-3xl bg-gradient-to-br from-primary/[0.04] via-transparent to-ember/[0.06] border border-border p-8 md:p-12">
          <div className="grid md:grid-cols-12 gap-10 items-center">
            <div className="md:col-span-5">
              <Reveal><p className="text-xs uppercase tracking-[0.3em] text-primary mb-4">— One Asset, Many Drivers</p></Reveal>
              <Reveal delay={0.1}>
                <h3 className="font-display text-3xl md:text-4xl text-balance leading-tight">
                  Unlike single-source investments, this model layers value.
                </h3>
              </Reveal>
              <Reveal delay={0.2}>
                <ul className="mt-6 space-y-2 text-muted-foreground">
                  {["Strategic Land Appreciation", "Sagwan Timber Growth", "Rising Timber Demand", "Scientific Management", "Long-Term Asset Ownership"].map(t => (
                    <li key={t} className="flex items-center gap-2"><TrendingUp className="h-4 w-4 text-primary" />{t}</li>
                  ))}
                </ul>
              </Reveal>
            </div>
            <div className="md:col-span-7">
              <Reveal y={48}>
                <div className="h-80">
                  <ResponsiveContainer>
                    <RadialBarChart innerRadius="25%" outerRadius="100%" data={driversData} startAngle={90} endAngle={-270}>
                      <RadialBar background dataKey="value" cornerRadius={8} />
                      <Tooltip contentStyle={{ background: "white", border: "1px solid oklch(0.89 0.01 40)", borderRadius: 8 }} />
                    </RadialBarChart>
                  </ResponsiveContainer>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function OutcomeSection() {
  return (
    <section className="py-32 md:py-48 bg-black text-white">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-red-500 mb-6">
            — The Outcome
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="font-display text-4xl md:text-6xl leading-[1.05] text-balance">
            When land, timber, science, and demand converge — the result is a
            unique asset designed for both{" "}
            <span className="italic text-red-500">stability</span> and{" "}
            <span className="italic text-red-500">
              long-term growth.
            </span>
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-8 text-lg text-white/70 max-w-2xl mx-auto">
            At Redwood Biotech, we are not simply developing plantations—we are
            building a structured ecosystem where science, nature, and commerce
            work together to create lasting value.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <a
            href="#enquire"
            className="mt-12 inline-flex items-center gap-2 rounded-full bg-red-600 px-7 py-4 text-sm font-medium text-white hover:bg-red-700 transition"
          >
            Book your discovery call
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

function EnquiryForm() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");
  const [form, setForm] = useState({ name: "", email: "", phone: "", investment: "10-25L", message: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sent");
  };

  return (
    <section id="enquire" className="py-28 md:py-36 bg-surface">
      <div className="mx-auto max-w-6xl px-6 grid md:grid-cols-12 gap-12">
        <div className="md:col-span-5">
          <Reveal><p className="text-xs uppercase tracking-[0.3em] text-primary mb-6">— Begin the Conversation</p></Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-4xl md:text-5xl leading-tight text-balance">
               Book Your   <br /><span className="italic text-primary">Appointment Now .</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              Share a few details and our investment team will walk you through plot availability, legal structure, plantation cycle, and projected economics tailored to your goals.
            </p>
          </Reveal>

          <div className="mt-10 space-y-4 text-sm">
            <div className="flex items-center gap-3 text-foreground">
              <span className="h-9 w-9 rounded-full bg-primary/10 grid place-items-center"><Phone className="h-4 w-4 text-primary" /></span>
              <div><div className="font-medium">+91 · Investor Desk</div><div className="text-xs text-muted-foreground">Mon–Sat · 10am–7pm IST</div></div>
            </div>
            <div className="flex items-center gap-3 text-foreground">
              <span className="h-9 w-9 rounded-full bg-primary/10 grid place-items-center"><Mail className="h-4 w-4 text-primary" /></span>
              <div><div className="font-medium">invest@redwoodbiotech.in</div><div className="text-xs text-muted-foreground">Replies within 24 hours</div></div>
            </div>
            <div className="flex items-center gap-3 text-foreground">
              <span className="h-9 w-9 rounded-full bg-primary/10 grid place-items-center"><Leaf className="h-4 w-4 text-primary" /></span>
              <div><div className="font-medium">Site visit on request</div><div className="text-xs text-muted-foreground">Walk the plantation in person</div></div>
            </div>
          </div>
        </div>

        <div className="md:col-span-7">
          <Reveal y={48}>
            <div className="relative rounded-3xl bg-card border border-border p-8 md:p-10 shadow-[0_30px_80px_-30px_rgba(120,30,20,0.2)]">
              <AnimatePresence mode="wait">
                {status === "idle" ? (
                  <motion.form key="form" onSubmit={submit}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="space-y-5">
                    <div className="grid md:grid-cols-2 gap-5">
                      <Field label="Full name">
                        <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                          className="w-full bg-transparent border-b border-border focus:border-primary outline-none py-2 text-foreground" />
                      </Field>
                      <Field label="Email">
                        <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                          className="w-full bg-transparent border-b border-border focus:border-primary outline-none py-2 text-foreground" />
                      </Field>
                    </div>
                    <div className="grid md:grid-cols-2 gap-5">
                      <Field label="Phone">
                        <input required value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                          className="w-full bg-transparent border-b border-border focus:border-primary outline-none py-2 text-foreground" />
                      </Field>
                      <Field label="Investment range">
                        <select value={form.investment} onChange={e => setForm({ ...form, investment: e.target.value })}
                          className="w-full bg-transparent border-b border-border focus:border-primary outline-none py-2 text-foreground">
                          <option value="5-10L">₹5–10 Lakh</option>
                          <option value="10-25L">₹10–25 Lakh</option>
                          <option value="25-50L">₹25–50 Lakh</option>
                          <option value="50L+">₹50 Lakh +</option>
                        </select>
                      </Field>
                    </div>
                    <Field label="What would you like to know?">
                      <textarea rows={3} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                        className="w-full bg-transparent border-b border-border focus:border-primary outline-none py-2 text-foreground resize-none" />
                    </Field>

                    <button type="submit"
                      className="group mt-4 w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-4 text-sm font-medium hover:bg-primary/90 transition">
                      Request a call back
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>
                    <p className="text-xs text-muted-foreground text-center">Your details remain confidential. No spam — ever.</p>
                  </motion.form>
                ) : (
                  <motion.div key="ok" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="py-12 text-center">
                    <div className="mx-auto h-14 w-14 rounded-full bg-primary/10 grid place-items-center mb-6">
                      <Check className="h-7 w-7 text-primary" strokeWidth={3} />
                    </div>
                    <h3 className="font-display text-2xl">Thank you, {form.name || "investor"}.</h3>
                    <p className="mt-3 text-muted-foreground max-w-sm mx-auto">Our team will reach out within 24 hours to schedule your discovery call.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-widest text-muted-foreground">{label}</span>
      <div className="mt-1">{children}</div>
    </label>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const w = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });
  return <motion.div style={{ scaleX: w, transformOrigin: "0%" }} className="fixed top-0 left-0 right-0 h-[2px] bg-primary z-[60]" />;
}

function PillarOutcome() {
  return (
    <div className="relative border-t border-white/10 py-28 md:py-40 overflow-hidden">
      {/* decorative blurred orb */}
      <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-red-600/10 blur-[120px]" />

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-red-500/30 px-3 py-1 text-xs uppercase tracking-[0.2em] text-red-400 mb-8">
            <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
            The Outcome
          </span>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="font-display text-4xl md:text-6xl leading-[1.05] text-balance text-white">
            When land, timber, science, and demand{" "}
            <span className="italic text-red-500">converge.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-8 text-lg text-white/50 max-w-2xl mx-auto leading-relaxed">
            When strategic land ownership, premium timber cultivation, scientific management, and growing market demand come together, the result is a unique asset designed for both{" "}
            <strong className="text-white/80">stability</strong> and{" "}
            <strong className="text-white/80">long-term growth.</strong>
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-14 grid grid-cols-2 md:grid-cols-3 gap-4 text-left">
            {[
              { icon: Map,          label: "Strategic Land",      sub: "Emerging corridors" },
              { icon: TreePine,     label: "Premium Genitically Hi-Tech Sagwan",      sub: "Grade-A teak timber" },
              { icon: FlaskConical, label: "Biotech Management",  sub: "Science-led growth" },
              { icon: TrendingUp,   label: "Rising Demand",       sub: "Supply-gap opportunity" },
              { icon: ShieldCheck,  label: "Legal Framework",     sub: "Registered ownership" },
              { icon: Sparkles,     label: "Multiple Drivers",    sub: "Diversified value" },
            ].map(({ icon: Icon, label, sub }, i) => (
              <Reveal key={label} delay={0.04 * i}>
                <div className="flex items-start gap-3 rounded-2xl bg-white/5 border border-white/10 p-5 hover:border-red-500/40 hover:bg-white/10 hover:shadow-[0_4px_24px_-8px_rgba(180,30,20,0.3)] transition-all duration-300">
                  <span className="mt-0.5 h-8 w-8 shrink-0 rounded-full bg-red-600/15 grid place-items-center">
                    <Icon className="h-4 w-4 text-red-400" />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-white/90">{label}</p>
                    <p className="text-xs text-white/40 mt-0.5">{sub}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  );
}

/* ---------- PAGE ---------- */
function Page() {
  void logo;
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ScrollProgress />
      <Navbar />
      <Hero />
      <LogicIntro />
      <Pillars />
      <DualAssetSection />
      <DemandSection />
      <EconomicsSection />
      <FarmPlanSection />
      <OutcomeSection />
      <EnquiryForm />
      <Footer />
    </div>
  );
}