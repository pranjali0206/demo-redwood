import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import {
  Sprout, TrendingUp, Trees, MapPin, Coins, Recycle,
  BarChart3, ShieldCheck, Globe2, Rocket, ArrowRight, ChevronDown,
} from "lucide-react";
import heroImg from "../assets/teak-plantation-hero.jpg";
import saplingImg from "../assets/sapling-new.jpg";
import forestImg from "../assets/forest-light.jpg";
import { Navbar } from "../components/site/Navbar";
import { Footer } from "../components/site/Footer";

export const Route = createFileRoute("/model")({
  head: () => ({
    meta: [
      { title: "The Model — Redwood Biotech" },
      { name: "description", content: "Dual-asset strategy: strategic land appreciation combined with premium Genitically Hi-Tech Sagwan (Teak) plantations." },
      { property: "og:title", content: "The Redwood Biotech Model" },
      { property: "og:description", content: "Where land appreciation meets the long-term value of premium teak." },
      { property: "og:image", content: heroImg },
    ],
  }),
  component: ModelPage,
});

const highlights = [
  { icon: Sprout,      title: "Dual Asset Strategy",         text: "Benefit from both land appreciation and timber growth.",                                      color: "from-emerald-500/20 to-emerald-500/0" },
  { icon: TrendingUp,  title: "Long-Term Wealth Creation",   text: "Designed to generate value through multiple growth drivers.",                                  color: "from-amber-500/20 to-amber-500/0" },
  { icon: Trees,       title: "Premium Genitically enginered Hi-Tech Sagwan Plantation",   text: "Invest in one of the world's most sought-after timber species.",                              color: "from-lime-500/20 to-lime-500/0" },
  { icon: MapPin,      title: "Ownership of Real Assets",    text: "Backed by tangible land ownership and natural resources.",                                     color: "from-orange-500/20 to-orange-500/0" },
  { icon: Coins,       title: "Multiple Revenue Potential",  text: "Land value growth combined with future timber income opportunities.",                          color: "from-yellow-500/20 to-yellow-500/0" },
  { icon: Recycle,     title: "Sustainable & Future-Focused",text: "Supports environmental restoration while creating economic value.",                            color: "from-teal-500/20 to-teal-500/0" },
  { icon: BarChart3,   title: "Growing Demand for Timber",   text: "Teak enjoys strong demand across furniture, construction, and export markets.",               color: "from-emerald-500/20 to-emerald-500/0" },
  { icon: ShieldCheck, title: "Stability Meets Growth",      text: "The security of real estate with the compounding potential of agroforestry.",                 color: "from-amber-500/20 to-amber-500/0" },
  { icon: Globe2,      title: "Impact-Driven Investment",    text: "Create wealth while contributing to greener landscapes.",                                      color: "from-green-500/20 to-green-500/0" },
  { icon: Rocket,      title: "A New-Age Alternative Asset", text: "A unique investment model beyond traditional real estate and financial products.",             color: "from-orange-500/20 to-orange-500/0" },
];

// ─── WORD-BY-WORD HEADLINE ────────────────────────────────────────────────────
const heroLines = [
  { words: ["The", "reason"], normal: true },
  { words: ["this", "model"], normal: false },
  { words: ["is", "different."], normal: true },
];

function AnimatedHeroHeadline() {
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.09, delayChildren: 0.4 } },
  };
  const word = {
    hidden: { opacity: 0, y: 48, rotateX: -30 },
    show: {
      opacity: 1, y: 0, rotateX: 0,
      transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.h1
      variants={container}
      initial="hidden"
      animate="show"
      className="font-display text-[clamp(2.6rem,10vw,6rem)] font-medium leading-[1.0] text-white"
      style={{ perspective: 600 }}
    >
      {heroLines.map((line, li) => (
        <div key={li} className="flex flex-wrap gap-x-[0.28em] overflow-hidden">
          {line.words.map((w, wi) => (
            <motion.span
              key={wi}
              variants={word}
              className={line.normal ? "text-white" : "italic text-[var(--gold)]"}
              style={{ display: "inline-block" }}
            >
              {w}
            </motion.span>
          ))}
        </div>
      ))}
    </motion.h1>
  );
}

// ─── FLOATING STAT CHIPS (hero overlay) ──────────────────────────────────────
const chips = [
  { label: "Dual-asset strategy", sub: "Land + Timber",   x: "6%",  y: "22%", delay: 1.0 },
  { label: "15-yr growth model",  sub: "Compounding",     x: "62%", y: "14%", delay: 1.3 },
  { label: "Premium Sagwan",      sub: "Global demand",   x: "68%", y: "70%", delay: 1.6 },
];

function FloatingChip({ label, sub, x, y, delay }: typeof chips[0]) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="absolute hidden md:block"
      style={{ left: x, top: y }}
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: delay * 0.5 }}
        className="rounded-xl border border-white/20 bg-black/30 px-3.5 py-2.5 backdrop-blur-md"
      >
        <p className="text-[11px] font-semibold uppercase tracking-widest text-[var(--gold)]">{label}</p>
        <p className="mt-0.5 text-xs text-white/60">{sub}</p>
      </motion.div>
    </motion.div>
  );
}

// ─── SCROLL PROGRESS BAR ─────────────────────────────────────────────────────
function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });
  return (
    <motion.div
      style={{ scaleX, transformOrigin: "left" }}
      className="fixed top-0 left-0 right-0 z-[999] h-0.5 bg-[var(--gold)] origin-left"
    />
  );
}

// ─── MOBILE HERO PARTICLES (css-only, pure divs) ─────────────────────────────
function HeroParticles() {
  const dots = Array.from({ length: 18 }, (_, i) => i);
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {dots.map((i) => {
        const size = 2 + (i % 3);
        const left = `${5 + (i * 53) % 90}%`;
        const top = `${10 + (i * 37) % 80}%`;
        const dur = 3 + (i % 4);
        const del = (i * 0.3) % 2.5;
        return (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/20"
            style={{ width: size, height: size, left, top }}
            animate={{ opacity: [0.1, 0.5, 0.1], scale: [1, 1.4, 1] }}
            transition={{ duration: dur, repeat: Infinity, delay: del, ease: "easeInOut" }}
          />
        );
      })}
    </div>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
function ModelPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y      = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const scale  = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  // Subtle mouse-parallax on hero image (desktop only)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const imgX = useSpring(useTransform(mouseX, [-1, 1], ["-1.5%", "1.5%"]), { stiffness: 80, damping: 20 });
  const imgY = useSpring(useTransform(mouseY, [-1, 1], ["-1.5%", "1.5%"]), { stiffness: 80, damping: 20 });

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    mouseX.set(((clientX - left) / width) * 2 - 1);
    mouseY.set(((clientY - top) / height) * 2 - 1);
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <ScrollProgressBar />

      {/* Ambient page background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <img src={forestImg} alt="" aria-hidden className="h-full w-full object-cover opacity-[0.18]" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/92 to-background/95" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_0%,oklch(0.15_0.02_150/0.6)_70%)]" />
      </div>
      <Navbar />

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        onMouseMove={handleMouseMove}
        className="relative flex min-h-[100svh] w-full flex-col overflow-hidden"
      >
        {/* Parallax background image */}
        <motion.div
          style={{ y, scale, x: imgX }}
          className="absolute inset-0"
        >
          <motion.img
            src={heroImg}
            alt="Aerial view of teak plantation"
            style={{ y: imgY }}
            className="h-full w-full object-cover object-center"
          />
          {/* Layered overlays for depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-background" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />
        </motion.div>

        {/* Floating particles */}
        <HeroParticles />

        {/* Floating stat chips */}
        {chips.map((c) => <FloatingChip key={c.label} {...c} />)}

        {/* Main content */}
        <motion.div
          style={{ opacity }}
          className="relative z-10 flex flex-1 flex-col justify-end px-5 pb-20 pt-28 sm:px-8 md:justify-center md:pb-0 md:pt-0 max-w-6xl mx-auto w-full"
        >
          {/* Eyebrow pill */}
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mb-7 inline-flex w-fit items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.22em] text-white/90 backdrop-blur"
          >
            <motion.span
              animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="h-1.5 w-1.5 rounded-full bg-[var(--gold)]"
            />
            The Redwood Biotech Model
          </motion.span>

          {/* Main headline — word-by-word */}
          <AnimatedHeroHeadline />

          {/* Sub-copy */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.75 }}
            className="mt-6 max-w-md text-base leading-relaxed text-white/75 sm:text-lg"
          >
            A dual-asset investment model combining strategic land ownership with scientifically managed premium Genitically Hi-Tech Sagwan (Teak) plantations.
          </motion.p>

          {/* CTA row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            {/* PRIMARY — high-conversion investment button */}
            <Link to="/investment" className="group relative">
              {/* Pulsing ring behind the button */}
              <span className="absolute inset-0 rounded-2xl bg-[var(--gold)] opacity-30 blur-md
                               animate-[ping_2.2s_ease-in-out_infinite]" aria-hidden />
              <span className="relative inline-flex items-center gap-3 rounded-2xl
                               bg-gradient-to-br from-[oklch(0.82_0.18_75)] via-[var(--gold)] to-[oklch(0.65_0.18_55)]
                               px-7 py-4 font-semibold text-white
                               shadow-[0_4px_32px_oklch(0.70_0.18_65/0.55)]
                               transition-all duration-200 active:scale-95
                               group-hover:shadow-[0_6px_40px_oklch(0.70_0.18_65/0.75)]
                               group-hover:scale-[1.03]">
                {/* Icon badge */}
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center
                                 rounded-lg bg-white/20 backdrop-blur">
                  <TrendingUp className="h-4 w-4" />
                </span>
                <span className="flex flex-col items-start leading-none">
                  <span className="text-[10px] font-medium uppercase tracking-widest text-white/70">
                    Explore now
                  </span>
                  <span className="text-base font-bold tracking-tight">Investment Plans</span>
                </span>
                <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>

            {/* SECONDARY — ghost */}
            <Link
              to="/about"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3.5 text-sm font-semibold text-white/85 backdrop-blur hover:bg-white/10 active:scale-95 transition-all"
            >
              Our Story
            </Link>
          </motion.div>

          {/* Two key pillars — mobile-visible quick stats */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
            className="mt-10 flex gap-5 md:hidden"
          >
            {[
              { n: "2", label: "Growth drivers" },
              { n: "15yr", label: "Long-term model" },
              { n: "1%", label: "Global timber demand" },
            ].map((s) => (
              <div key={s.label} className="rounded-xl border border-white/15 bg-black/25 px-3 py-2 backdrop-blur">
                <p className="font-display text-xl font-medium text-[var(--gold)]">{s.n}</p>
                <p className="mt-0.5 text-[10px] uppercase tracking-wider text-white/50">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/50"
        >
          <span className="text-[10px] uppercase tracking-[0.25em]">Scroll</span>
          {/* Animated scroll line */}
          <div className="relative h-8 w-px overflow-hidden bg-white/15">
            <motion.div
              className="absolute inset-x-0 top-0 h-1/2 bg-white/60"
              animate={{ y: ["0%", "200%"] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </motion.div>

        {/* Bottom vignette for smooth blend into next section */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* ── INTRO ──────────────────────────────────────────────────────────── */}
      <section className="relative px-6 py-28 sm:py-32">
        <div className="mx-auto max-w-4xl">
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="mb-6 text-sm font-semibold uppercase tracking-[0.3em] text-primary"
          >
            The Commerce Behind the Opportunity
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-display text-4xl leading-tight md:text-6xl"
          >
            You understand the <span className="text-gradient-hero">science</span>. Now meet the <span className="italic">economics</span>.
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-10 space-y-6 text-lg leading-relaxed text-muted-foreground"
          >
            <p>You now understand the science, biotechnology, and plantation management that form the foundation of our projects. The next question is simple:</p>
            <p className="font-display text-2xl italic text-foreground">How does this translate into wealth creation?</p>
            <p>Redwood Biotech's model is built around a <span className="font-semibold text-foreground">dual-asset strategy</span> that combines the growth potential of strategically selected land with the long-term value creation of premium Sagwan (Teak) plantations.</p>
            <p>Unlike traditional investments that depend on a single source of returns, our model is designed around <span className="font-semibold text-foreground">multiple growth drivers working simultaneously</span>.</p>
          </motion.div>
        </div>
      </section>

      {/* ── DUAL ASSET SHOWCASE ────────────────────────────────────────────── */}
      <section className="relative bg-[oklch(0.18_0.03_150/0.55)] backdrop-blur-sm px-6 py-32">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2">
          {[
            { img: forestImg,  tag: "Asset One", title: "Land",        text: "Strategically located parcels with strong appreciation fundamentals." },
            { img: saplingImg, tag: "Asset Two", title: "Sagwan Teak",  text: "Premium timber with global demand and decades of compounding value." },
          ].map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              className="group relative overflow-hidden rounded-3xl shadow-[var(--shadow-elegant)]"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img src={c.img} alt={c.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-110" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--gold)]">{c.tag}</span>
                <h3 className="mt-2 font-display text-4xl">{c.title}</h3>
                <p className="mt-3 max-w-sm text-white/80">{c.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── HIGHLIGHTS GRID ────────────────────────────────────────────────── */}
      <section className="relative px-6 py-32">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="mb-16 max-w-2xl"
          >
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-primary">Key Highlights</p>
            <h2 className="font-display text-4xl md:text-5xl">Multiple growth drivers. <span className="text-gradient-gold">One asset.</span></h2>
          </motion.div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {highlights.map((h, i) => (
              <motion.div
                key={h.title}
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-7 transition-shadow hover:shadow-[var(--shadow-elegant)]"
              >
                <div className={`absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br ${h.color} opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100`} />
                <div className="relative">
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <h.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-display text-xl font-medium">{h.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{h.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

{/* ── PREMIUM CTA ───────────────────────────────────────────────────── */}
<section className="relative overflow-hidden px-6 py-36">

  {/* ── Premium Cinematic Background ─────────────────────────────── */}
  <div className="absolute inset-0 z-0 overflow-hidden">

    {/* Base Gradient */}
    <div className="absolute inset-0 bg-[linear-gradient(135deg,#020403_0%,#081A12_22%,#103223_55%,#06110C_100%)]" />

    {/* Animated Aurora */}
    <motion.div
      className="absolute inset-0 opacity-30 blur-3xl"
      animate={{
        backgroundPosition: [
          "0% 50%",
          "100% 50%",
          "0% 50%",
        ],
      }}
      transition={{
        duration: 18,
        repeat: Infinity,
        ease: "linear",
      }}
      style={{
        background:
          "linear-gradient(120deg,#0f5132,#2f855a,#d4af37,#1d6b46,#0f5132)",
        backgroundSize: "250% 250%",
      }}
    />

    {/* Emerald Center Glow */}
    <div
      className="absolute left-1/2 top-1/2
                 h-[900px] w-[900px]
                 -translate-x-1/2 -translate-y-1/2
                 rounded-full
                 blur-[180px]
                 opacity-60"
      style={{
        background:
          "radial-gradient(circle, rgba(31,122,76,.95) 0%, rgba(20,82,52,.55) 45%, transparent 72%)",
      }}
    />

    {/* Gold Highlight */}
    <div
      className="absolute right-[-120px] top-[-120px]
                 h-[420px] w-[420px]
                 rounded-full blur-[120px] opacity-35"
      style={{
        background:
          "radial-gradient(circle, rgba(215,185,80,.95) 0%, transparent 72%)",
      }}
    />

    {/* Bottom Green Glow */}
    <div
      className="absolute left-[-120px] bottom-[-120px]
                 h-[500px] w-[500px]
                 rounded-full blur-[140px] opacity-30"
      style={{
        background:
          "radial-gradient(circle, rgba(30,130,82,.8) 0%, transparent 70%)",
      }}
    />

    {/* Soft Vignette */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(0,0,0,.58)_100%)]" />

    {/* Noise Texture */}
    <div
      className="absolute inset-0 opacity-[0.035]"
      style={{
        backgroundImage: `
          radial-gradient(circle at 25% 25%, rgba(255,255,255,.18) 1px, transparent 1px),
          radial-gradient(circle at 75% 75%, rgba(255,255,255,.12) 1px, transparent 1px)
        `,
        backgroundSize: "30px 30px",
      }}
    />

    {/* Top Fade */}
    <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-background to-transparent" />

    {/* Bottom Fade */}
    <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background to-transparent" />
  </div>

  {/* Floating Ambient Light */}
  <motion.div
    className="pointer-events-none absolute left-1/2 top-1/2
               h-[360px] w-[360px]
               -translate-x-1/2 -translate-y-1/2
               rounded-full blur-[90px]"
    style={{
      background:
        "radial-gradient(circle, rgba(255,220,120,.16), rgba(40,170,100,.12), transparent 70%)",
    }}
    animate={{
      scale: [1, 1.15, 1],
      opacity: [0.5, 0.9, 0.5],
    }}
    transition={{
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />

  {/* ── Content ───────────────────────────────────────────── */}
  <div className="relative mx-auto max-w-4xl text-center">

    {/* Eyebrow */}
    <motion.span
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="inline-flex items-center gap-2 rounded-full
                 border border-white/15
                 bg-white/5
                 px-5 py-2
                 text-[11px]
                 font-semibold
                 uppercase
                 tracking-[0.28em]
                 text-white/70
                 backdrop-blur-md"
    >
      <span className="h-1 w-5 rounded-full bg-[var(--gold)]" />
      Next Steps
    </motion.span>

    {/* Heading */}
    <motion.h2
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.15, duration: 0.8 }}
      className="mt-8 font-display text-5xl font-semibold leading-tight text-white md:text-7xl"
    >
      Ready to step into the{" "}
      <span className="bg-gradient-to-r from-[#F8E38C] via-[#D4AF37] to-[#FFE58A] bg-clip-text text-transparent italic">
        next chapter
      </span>
      ?
    </motion.h2>

    {/* Description */}
    <motion.p
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3 }}
      className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-white/70"
    >
      Discover the people, the philosophy, and the long-term vision
      driving Redwood Biotech forward while building a greener and more
      sustainable future.
    </motion.p>

    {/* CTA Buttons */}
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.45 }}
      className="mt-14 flex flex-wrap items-center justify-center gap-5"
    >

      {/* Primary */}
      <Link
        to="/investment"
        className="group relative inline-flex items-center gap-3
                   rounded-2xl
                   bg-gradient-to-r
                   from-[#D4AF37]
                   via-[#F2D775]
                   to-[#C6952C]
                   px-9 py-4
                   font-semibold
                   text-black
                   shadow-[0_12px_40px_rgba(212,175,55,.35)]
                   transition-all
                   duration-300
                   hover:-translate-y-1
                   hover:shadow-[0_18px_55px_rgba(212,175,55,.45)]"
      >
        Investment Plans

        <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
      </Link>

      {/* Secondary */}
      <Link
        to="/about"
        className="group inline-flex items-center gap-3
                   rounded-2xl
                   border border-white/20
                   bg-white/5
                   px-9 py-4
                   font-semibold
                   text-white
                   backdrop-blur-xl
                   transition-all
                   duration-300
                   hover:bg-white/10
                   hover:border-white/40
                   hover:-translate-y-1"
      >
        Know In Detail

        <ArrowRight className="h-5 w-5 opacity-60 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100" />
      </Link>

    </motion.div>

    {/* Footer Text */}
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.6 }}
      className="mt-12 flex items-center justify-center gap-4 text-xs uppercase tracking-[0.3em] text-white/40"
    >
      <span>Science-backed</span>

      <span className="h-1 w-1 rounded-full bg-[var(--gold)]" />

      <span>Transparent</span>

      <span className="h-1 w-1 rounded-full bg-[var(--gold)]" />

      <span>Long-term</span>
    </motion.div>

  </div>
</section>

      <Footer />
    </div>
  );
}