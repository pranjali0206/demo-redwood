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

export const Route = createFileRoute("/investment")({
  head: () => ({
    meta: [
      { title: "The Commerce Behind the Opportunity — Redwood Biotech" },
      { name: "description", content: "An investment is only as strong as the logic behind it. Explore the Redwood Biotech Sagwan plantation investment model." },
      { property: "og:title", content: "The Logic Behind the Opportunity — Redwood Biotech" },
      { property: "og:description", content: "Strategic land, premium Sagwan timber, scientific management — one structured asset." },
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

/* ---------- DATA ---------- */

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
    body: "India is among the world's largest consumers of timber, yet domestic production continues to lag behind demand, resulting in substantial timber imports every year. As natural forest resources become increasingly limited, professionally managed plantations are expected to play a vital role in bridging this supply gap. This demand-supply imbalance creates a strong long-term market opportunity for premium timber assets such as Sagwan — one of the world's most valuable timber species, known for its durability, quality, and consistent demand across furniture, construction, and export industries.",
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
    body: "Investors benefit from ownership, while Redwood manages the execution — from plantation development and maintenance to monitoring, compliance, harvesting, and market facilitation. Upon maturity, Redwood facilitates the harvesting and commercialisation of the timber asset. As per the agreed investment structure, 75% of the net proceeds generated from timber sales are shared with the investor, while 25% is retained by the company towards plantation management, maintenance, operational expenses, and market execution. Our objective is to maximise value through professional management and responsible market participation while ensuring complete transparency throughout the process.",
    img: heroImg,
  },
  {
    n: "05",
    icon: ShieldCheck,
    title: "Investor Protection Framework",
    lede: "Registered land ownership, legal agreements, plantation records — clarity at every step.",
    body: "Every investment is supported by a structured legal framework designed to provide transparency and confidence. Our commitment is to ensure clarity, accountability, and peace of mind throughout the investment journey.",
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

          {/* ── Enhanced badge ── */}
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

            {/* ── Headline: white + red ── */}
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

            {/* ── Subheading: white ── */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 1 }}
              className="mt-8 max-w-xl text-lg text-white/80 leading-relaxed"
            >
              Where strategic land, premium Sagwan timber, and scientific management converge into one structured ecosystem for long-term value.
            </motion.p>
            <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            {/* Primary Button */}
            <a
              href="#enquire"
              className="group inline-flex items-center gap-2 rounded-full bg-red-600 px-6 py-3.5 text-sm font-medium text-white hover:bg-red-700 transition"
            >
              Book a discovery call
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          
            {/* Secondary Button */}
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

function PillarRow({ p, i }: { p: typeof pillars[number]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const Icon = p.icon;
  const reverse = i % 2 === 1;

  return (
    <div ref={ref} className="relative py-24 md:py-32 border-t border-border">
      <div
        className={`mx-auto max-w-7xl px-6 grid md:grid-cols-12 gap-10 md:gap-16 items-center ${
          reverse ? "md:[&>*:first-child]:order-2" : ""
        }`}
      >
        {/* Image */}
        <Reveal y={48}>
          <div className="md:col-span-6 relative overflow-hidden rounded-2xl bg-muted aspect-[4/5] md:aspect-[5/6]">
            <motion.img
              style={{ y: imgY, scale: 1.15 }}
              src={p.img}
              alt={p.title}
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
              width={1600}
              height={1024}
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-ink/40 via-transparent to-transparent" />
            <div className="absolute top-6 left-6 inline-flex items-center gap-2 rounded-full bg-background/80 backdrop-blur px-3 py-1.5 text-xs font-medium">
              <Icon className="h-3.5 w-3.5 text-primary" /> Pillar {p.n}
            </div>
          </div>
        </Reveal>

        {/* Text */}
        <div className="md:col-span-6">
          <Reveal>
            <div className="font-display text-7xl md:text-9xl leading-none text-primary/15 select-none">
              {p.n}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h3 className="mt-2 font-display text-3xl md:text-5xl leading-tight text-balance">
              {p.title}
            </h3>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-4 text-sm font-medium text-primary uppercase tracking-widest">
              {p.lede}
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-5 text-base text-muted-foreground leading-relaxed max-w-lg">
              {p.body}
            </p>
          </Reveal>

          {/* Checks list (pillar 05) */}
          {p.checks && (
            <Reveal delay={0.25}>
              <ul className="mt-6 space-y-2.5">
                {p.checks.map((t) => (
                  <li key={t} className="flex items-center gap-3 text-sm text-foreground">
                    <span className="h-6 w-6 shrink-0 rounded-full bg-primary/10 grid place-items-center">
                      <Check className="h-3.5 w-3.5 text-primary" strokeWidth={3} />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
          )}

          {/* Drivers list (pillar 06) */}
          {p.drivers && (
            <Reveal delay={0.25}>
              <ul className="mt-6 space-y-2.5">
                {p.drivers.map((t) => (
                  <li key={t} className="flex items-center gap-2 text-sm text-foreground">
                    <TrendingUp className="h-4 w-4 text-primary shrink-0" />
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
          )}
        </div>
      </div>
    </div>
  );
}


function Pillars() {
  return (
    <section id="pillars" className="relative bg-surface">
      <div className="mx-auto max-w-7xl px-6 pt-32 pb-8">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-6">— Six Pillars</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-4xl md:text-6xl max-w-3xl text-balance">
            The foundations of a <span className="italic text-primary">structured</span> opportunity.
          </h2>
        </Reveal>
        {/* ── NEW: intro line ── */}
        <Reveal delay={0.2}>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed">
            The following pillars form the foundation of this opportunity.
          </p>
        </Reveal>
      </div>

      {pillars.map((p, i) => <PillarRow key={p.n} p={p} i={i} />)}

      {/* ── NEW: Outcome block ── */}
      <PillarOutcome />
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
              A 20-minute call. <br /><span className="italic text-primary">Complete clarity.</span>
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
    <div className="relative border-t border-border py-28 md:py-40 bg-gradient-to-b from-surface to-background overflow-hidden">
      {/* decorative blurred orb */}
      <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[120px]" />

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 px-3 py-1 text-xs uppercase tracking-[0.2em] text-primary mb-8">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            The Outcome
          </span>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="font-display text-4xl md:text-6xl leading-[1.05] text-balance">
            When land, timber, science, and demand{" "}
            <span className="italic text-primary">converge.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-8 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            When strategic land ownership, premium timber cultivation, scientific management, and growing market demand come together, the result is a unique asset designed for both{" "}
            <strong className="text-foreground">stability</strong> and{" "}
            <strong className="text-foreground">long-term growth.</strong>
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-14 grid grid-cols-2 md:grid-cols-3 gap-4 text-left">
            {[
              { icon: Map,         label: "Strategic Land",       sub: "Emerging corridors" },
              { icon: TreePine,    label: "Premium Sagwan",       sub: "Grade-A teak timber" },
              { icon: FlaskConical,label: "Biotech Management",   sub: "Science-led growth" },
              { icon: TrendingUp,  label: "Rising Demand",        sub: "Supply-gap opportunity" },
              { icon: ShieldCheck, label: "Legal Framework",      sub: "Registered ownership" },
              { icon: Sparkles,    label: "Multiple Drivers",     sub: "Diversified value" },
            ].map(({ icon: Icon, label, sub }, i) => (
              <Reveal key={label} delay={0.04 * i}>
                <div className="flex items-start gap-3 rounded-2xl bg-card border border-border p-5 hover:border-primary/40 hover:shadow-[0_4px_24px_-8px_rgba(120,30,20,0.18)] transition-all duration-300">
                  <span className="mt-0.5 h-8 w-8 shrink-0 rounded-full bg-primary/10 grid place-items-center">
                    <Icon className="h-4 w-4 text-primary" />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-foreground">{label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>
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
  // silence unused import
  void logo;
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ScrollProgress />
      <Navbar />
      <Hero />
      <LogicIntro />
      <Pillars />
      <DemandSection />
      <EconomicsSection />
      <OutcomeSection />
      <EnquiryForm />
      <Footer />
    </div>
  );
}
