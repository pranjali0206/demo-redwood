import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Eye, Target, Heart, ArrowRight, Sparkles } from "lucide-react";
import heroImg from "../assets/about-hero.jpg";
import forestImg from "../assets/forest-light.jpg";
import saplingImg from "../assets/sapling.jpg";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import agroforestryField from "../assets/agroforestry-field.jpg";
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

const story = [
  "At Redwood Biotech, we believe that the future of wealth creation lies at the intersection of Science, Nature, and Smart Investments.",
  "Our journey began with a simple vision—to create an investment model that not only generates long-term value for investors but also contributes positively to the environment. After extensive research into land development, biotechnology, and forestry economics, we identified a unique opportunity: combining strategically located real estate with scientifically managed Sagwan (Teak) plantations.",
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
  "Develop premium Sagwan plantations on strategic land.",
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



      {/* HERO */}
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
            Where <span className="italic text-gradient-gold">nature</span> grows,<br/>
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

      {/* STORY SECTION with sticky image */}
      <section className="relative px-6 py-32">
        <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-[1fr_1.2fr]">
          <div className="lg:sticky lg:top-32 lg:h-fit">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="overflow-hidden rounded-3xl shadow-[var(--shadow-elegant)]"
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

      {/* VISION & MISSION */}
      <section className="relative bg-[oklch(0.18_0.03_150/0.55)] backdrop-blur-sm px-6 py-32">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2">
          {[
            { icon: Eye, label: "Vision", color: "text-primary", items: vision },
            { icon: Target, label: "Mission", color: "text-[oklch(0.55_0.16_60)]", items: mission },
          ].map((card, idx) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.15 }}
              className="relative overflow-hidden rounded-3xl border border-border bg-card p-10"
            >
              <div className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 ${card.color}`}>
                <card.icon className="h-7 w-7" />
              </div>
              <h3 className="font-display text-4xl">{card.label}</h3>
              <ul className="mt-8 space-y-4">
                {card.items.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                    transition={{ delay: idx * 0.15 + i * 0.08 }}
                    className="flex gap-4 text-lg text-muted-foreground"
                  >
                    <span className={`mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full ${card.color.replace("text-", "bg-")}`} />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="relative px-6 py-32">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <div className="mx-auto mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Heart className="h-7 w-7" />
            </div>
            <h2 className="font-display text-4xl md:text-6xl">Core <span className="italic text-gradient-gold">Values</span></h2>
            <p className="mt-4 text-lg text-muted-foreground">The principles behind every decision we make.</p>
          </motion.div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {values.map((v, i) => (
              <motion.div
                key={v.name}
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -8 }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 transition-shadow hover:shadow-[var(--shadow-elegant)]"
              >
                <span className="absolute right-5 top-4 font-display text-7xl font-medium text-muted opacity-50 transition-colors group-hover:text-primary/20">
                  0{i + 1}
                </span>
                <h3 className="relative font-display text-2xl font-medium">{v.name}</h3>
                <p className="relative mt-3 text-muted-foreground">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden px-6 py-32">
      
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={agroforestryField}
            alt="Agroforestry Field"
            loading="lazy"
            className="h-full w-full object-cover object-center"
          />
      
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/55" />
      
          {/* Premium green gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[oklch(0.22_0.06_150/0.55)] via-transparent to-[oklch(0.42_0.11_152/0.45)]" />
        </div>
      
        {/* Content */}
        <div className="relative  mx-auto max-w-3xl text-center text-white">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl md:text-6xl"
          >
            Build wealth that{" "}
            <span className="italic text-[var(--gold)]">grows with time</span>.
          </motion.h2>
      
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-10 flex flex-wrap justify-center gap-4"
          >
            <Link
              to="/model"
              className="group inline-flex items-center gap-2 rounded-full bg-[var(--gold)] px-8 py-4 font-semibold text-white shadow-[var(--shadow-gold)] transition-transform hover:scale-105"
            >
              Explore the Model
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
      
            <Link
              to="/investment"
              className="inline-flex items-center gap-2 rounded-full border border-white/40 px-8 py-4 font-semibold text-white backdrop-blur hover:bg-white/10"
            >
              Know Investment Plan
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
