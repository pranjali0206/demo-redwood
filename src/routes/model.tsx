import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  Sprout, TrendingUp, Trees, MapPin, Coins, Recycle,
  BarChart3, ShieldCheck, Globe2, Rocket, ArrowRight, ChevronDown,
} from "lucide-react";
import heroImg from "../assets/teak-plantation-hero.jpg";
import saplingImg from "../assets/sapling.jpg";
import forestImg from "../assets/forest-light.jpg";
import { Navbar } from "../components/site/Navbar";
import { Footer } from "../components/site/Footer";
import ModelSectionbg from "../assets/ModelSectionbg.png";

export const Route = createFileRoute("/model")({
  head: () => ({
    meta: [
      { title: "The Model — Redwood Biotech" },
      { name: "description", content: "Dual-asset strategy: strategic land appreciation combined with premium Sagwan (Teak) plantations." },
      { property: "og:title", content: "The Redwood Biotech Model" },
      { property: "og:description", content: "Where land appreciation meets the long-term value of premium teak." },
      { property: "og:image", content: heroImg },
    ],
  }),
  component: ModelPage,
});

const highlights = [
  { icon: Sprout, title: "Dual Asset Strategy", text: "Benefit from both land appreciation and timber growth.", color: "from-emerald-500/20 to-emerald-500/0" },
  { icon: TrendingUp, title: "Long-Term Wealth Creation", text: "Designed to generate value through multiple growth drivers.", color: "from-amber-500/20 to-amber-500/0" },
  { icon: Trees, title: "Premium Sagwan Plantation", text: "Invest in one of the world's most sought-after timber species.", color: "from-lime-500/20 to-lime-500/0" },
  { icon: MapPin, title: "Ownership of Real Assets", text: "Backed by tangible land ownership and natural resources.", color: "from-orange-500/20 to-orange-500/0" },
  { icon: Coins, title: "Multiple Revenue Potential", text: "Land value growth combined with future timber income opportunities.", color: "from-yellow-500/20 to-yellow-500/0" },
  { icon: Recycle, title: "Sustainable & Future-Focused", text: "Supports environmental restoration while creating economic value.", color: "from-teal-500/20 to-teal-500/0" },
  { icon: BarChart3, title: "Growing Demand for Timber", text: "Teak enjoys strong demand across furniture, construction, and export markets.", color: "from-emerald-500/20 to-emerald-500/0" },
  { icon: ShieldCheck, title: "Stability Meets Growth", text: "The security of real estate with the compounding potential of agroforestry.", color: "from-amber-500/20 to-amber-500/0" },
  { icon: Globe2, title: "Impact-Driven Investment", text: "Create wealth while contributing to greener landscapes.", color: "from-green-500/20 to-green-500/0" },
  { icon: Rocket, title: "A New-Age Alternative Asset", text: "A unique investment model beyond traditional real estate and financial products.", color: "from-orange-500/20 to-orange-500/0" },
];

function ModelPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      {/* Ambient page background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <img src={forestImg} alt="" aria-hidden className="h-full w-full object-cover opacity-[0.18]" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/92 to-background/95" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_0%,oklch(0.15_0.02_150/0.6)_70%)]" />
      </div>
      <Navbar />



      {/* HERO */}
      <section ref={heroRef} className="relative h-screen w-full overflow-hidden">
        <motion.div style={{ y, scale }} className="absolute inset-0">
          <img src={heroImg} alt="Aerial view of teak plantation" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-background" />
        </motion.div>

        <motion.div style={{ opacity }} className="relative z-10 mx-auto flex h-full max-w-6xl flex-col items-start justify-center px-6">
          <motion.span
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-white backdrop-blur"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--gold)]" />
            The Redwood Biotech Model
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.9 }}
            className="max-w-4xl font-display text-5xl font-medium leading-[1.05] text-white md:text-7xl lg:text-[5.5rem]"
          >
            Where <span className="italic text-[var(--gold)]">nature</span> grows,<br/>
            wealth follows.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.8 }}
            className="mt-6 max-w-xl text-lg text-white/80"
          >
            A dual-asset investment model combining strategic land ownership with scientifically managed premium Sagwan (Teak) plantations.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/70"
          >
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <ChevronDown className="h-5 w-5 animate-bounce" />
          </motion.div>
        </motion.div>
      </section>

      {/* INTRO */}
      <section className="relative px-6 py-32">
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
            <p className="text-2xl font-display italic text-foreground">How does this translate into wealth creation?</p>
            <p>Redwood Biotech's model is built around a <span className="font-semibold text-foreground">dual-asset strategy</span> that combines the growth potential of strategically selected land with the long-term value creation of premium Sagwan (Teak) plantations.</p>
            <p>Unlike traditional investments that depend on a single source of returns, our model is designed around <span className="font-semibold text-foreground">multiple growth drivers working simultaneously</span>.</p>
          </motion.div>
        </div>
      </section>

      {/* DUAL ASSET SHOWCASE */}
      <section className="relative bg-[oklch(0.18_0.03_150/0.55)] backdrop-blur-sm px-6 py-32">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2">
          {[
            { img: forestImg, tag: "Asset One", title: "Land", text: "Strategically located parcels with strong appreciation fundamentals." },
            { img: saplingImg, tag: "Asset Two", title: "Sagwan Teak", text: "Premium timber with global demand and decades of compounding value." },
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

      {/* HIGHLIGHTS GRID */}
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

      {/* CTA */}
      {/* CTA */}
<section className="relative overflow-hidden px-6 py-32">
  {/* Background */}
  <div className="absolute inset-0 z-0">
    <img
      src={ModelSectionbg}
      alt=""
      loading="lazy"
      className="h-full w-full object-cover"
    />

    {/* Dark Overlay */}
    <div className="absolute inset-0 bg-black/45" />

    {/* Optional Gradient Overlay */}
    <div className="absolute inset-0 bg-gradient-to-br from-[oklch(0.22_0.06_150/0.65)] via-transparent to-[oklch(0.35_0.08_150/0.55)]" />
  </div>

  <div className="relative z-10 mx-auto max-w-4xl text-center text-white">
   
    <motion.h2
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="font-display text-4xl md:text-6xl"
    >
      Ready to step into the{" "}
      <span className="italic text-[var(--gold)]">next chapter</span>?
    </motion.h2>

    <motion.p
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 }}
      className="mt-6 text-lg text-white/80"
    >
      Discover the people, the philosophy, and the long-term vision driving Redwood Biotech.
    </motion.p>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.35 }}
      className="mt-10 flex flex-wrap items-center justify-center gap-4"
    >
      <Link
        to="/about"
        className="group inline-flex items-center gap-2 rounded-full bg-[var(--gold)] px-8 py-4 font-semibold text-white shadow-[var(--shadow-gold)] transition-transform hover:scale-105"
      >
        Know In Detail
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Link>

      <Link
        to="/investment"
        className="group inline-flex items-center gap-2 rounded-full bg-[var(--gold)] px-8 py-4 font-semibold text-white shadow-[var(--shadow-gold)] transition-transform hover:scale-105"
      >
        Investment Section
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Link>

     
    </motion.div>
  </div>
</section>

<Footer />

    </div>
  );
}
