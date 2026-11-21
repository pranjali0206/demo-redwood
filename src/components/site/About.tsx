import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Landmark, Microscope, TrendingUp, Leaf } from "lucide-react";
import teamImg from "@/assets/team-field.webp";
import labImg from "@/assets/biotech-lab.webp";
import woodTex from "@/assets/wood-texture.webp";
import { Reveal } from "./Reveal-2";
import { CountUp } from "./CountUp";
import { Link } from "@tanstack/react-router"; 

const pillars = [
  {
    Icon: Landmark,
    title: "Premium Land Assets",
    body: "Strategically positioned parcels primed for long-term appreciation as cities grow outward.",
  },
  {
    Icon: Microscope,
    title: "Biotechnology-Driven Teak",
    body: "Tissue-cultured Genitically Engineered Hi-Tech Sagwan engineered for straighter trunks, faster growth, and higher timber yield.",
  },
  {
    Icon: TrendingUp,
    title: "Long-Term Wealth Creation",
    body: "Real estate stability fused with high-value agroforestry returns over the plantation cycle.",
  },
];

const stats = [
  { n: 1200, s: "+", l: "Acres Under Management" },
  { n: 180, s: "+", l: "Landowner Partners" },
  { n: 8, s: " yrs", l: "In Operation" },
  { n: 12, s: "+", l: "Crop & Plant Varieties" },
];

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-[color:var(--cream)]">
      {/* Wood top strip */}
      <div
        aria-hidden
        className="absolute top-0 inset-x-0 h-32"
        style={{
          backgroundImage: `linear-gradient(180deg, color-mix(in oklab, var(--forest-950) 88%, transparent), transparent), url(${woodTex})`,
          backgroundSize: "cover",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 lg:pt-40 lg:pb-32">
        {/* Intro */}
        <Reveal className="max-w-3xl">
          <span className="inline-block text-xs uppercase tracking-[0.4em] text-[color:var(--brand-red)] font-semibold">
            About — Redwood Biotech
          </span>
          <h2 className="mt-4 font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-[color:var(--forest-950)] leading-[1.05]">
            Know Redwood Biotech
          </h2>
          <p className="mt-6 text-lg text-stone-700 leading-relaxed">
            At Redwood, returns are driven by a carefully designed combination of premium Genitically Engineered Hi-Tech Sagwan
            (Teak) cultivation and advanced biotechnology. Instead of relying on conventional
            plantation methods, we focus on scientifically selected planting material and modern
            cultivation practices aimed at maximizing growth, quality, and long-term value.
          </p>
        </Reveal>

        {/* Image collage */}
        <div className="relative mt-16 grid lg:grid-cols-12 gap-6 items-stretch">
          <motion.div style={{ y: y1 }} className="lg:col-span-7 relative">
            <div className="relative overflow-hidden rounded-3xl shadow-2xl aspect-[4/3]">
              <img
                src={teamImg}
                alt="Redwood team in the field"
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 50%, color-mix(in oklab, var(--forest-950) 75%, transparent))",
                }}
              />
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--brand-amber)]">
                    Indore · Madhya Pradesh
                  </p>
                  <p className="mt-1 font-serif text-2xl">Where Land Meets Growth.</p>
                </div>
                <Leaf className="text-[color:var(--brand-amber)]" />
              </div>
            </div>
          </motion.div>

          <motion.div style={{ y: y2 }} className="lg:col-span-5 flex flex-col gap-6">
            <div className="relative overflow-hidden rounded-3xl shadow-xl aspect-[4/3]">
              <img
                src={labImg}
                alt="Tissue culture in lab"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
            <div
              className="rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, var(--forest-950), color-mix(in oklab, var(--forest-950) 70%, black))",
              }}
            >
              <div
                aria-hidden
                className="absolute inset-0 opacity-30"
                style={{ backgroundImage: `url(${woodTex})`, backgroundSize: "cover" }}
              />
              <div className="relative">
                <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--brand-amber)]">
                  New facility — coming soon
                </p>
                <p className="mt-3 font-serif text-xl leading-snug">
                  A state-of-the-art laboratory opening in Indore, expanding our research,
                  hardening, and quality-control capacity across India.
                </p>
                <Link
                  to="/about"
                  className="mt-5 inline-flex items-center gap-2 text-[color:var(--brand-amber)] font-semibold hover:gap-3 transition-all"
                >
                  Read our full story <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Why choose */}
        <div className="mt-14 md:mt-16">
        <Reveal className="max-w-2xl">
        <span className="text-xs uppercase tracking-[0.4em] text-[color:var(--brand-red)] font-semibold">
          Why Choose Redwood
        </span>
        <h3 className="mt-3 font-serif text-3xl sm:text-4xl font-bold text-[color:var(--forest-950)]">
          The security of real assets. The power of science.
        </h3>
        <div className="mt-4 space-y-4 text-stone-700 leading-relaxed">
          <p>
            Redwood Biotech was founded on a simple belief: the most rewarding
            investments are those that grow in more than one way.
          </p>
          <p>
            We identify land in carefully chosen growth corridors surrounding
            expanding cities, where future urban development has the potential to
            accelerate property appreciation over time. Every plot is then
            registered in the investor's name and developed into a professionally
            managed teak plantation using advanced, genetically engineered hi tech
            Sagwan.
          </p>
          <p>
            As cities expand, your land has the potential to increase in value. At
            the same time, your teak plantation matures into a premium timber
            asset. One investment, one registered property, and two powerful
            engines of long-term wealth creation.
          </p>
          <p>
            Our model is built around three pillars — a structured investment
            designed to harness the strengths of both real estate and high-value
            agroforestry.
          </p>
        </div>
      </Reveal>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={{ show: { transition: { staggerChildren: 0.15 } } }}
            className="mt-12 grid md:grid-cols-3 gap-6"
          >
            {pillars.map(({ Icon, title, body }, i) => (
              <motion.div
                key={title}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
                }}
                className="group relative p-8 rounded-2xl bg-white border border-stone-200 hover:border-[color:var(--brand-amber)]/60 transition-all hover:-translate-y-1 hover:shadow-2xl"
              >
                <div
                  aria-hidden
                  className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl opacity-0 group-hover:opacity-100 transition"
                  style={{
                    background:
                      "linear-gradient(90deg, var(--brand-amber), var(--brand-red))",
                  }}
                />
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-5"
                  style={{
                    background:
                      "linear-gradient(135deg, color-mix(in oklab, var(--brand-amber) 15%, transparent), color-mix(in oklab, var(--brand-red) 12%, transparent))",
                    color: "var(--forest-950)",
                  }}
                >
                  <Icon size={26} />
                </div>
                <p className="text-xs font-semibold tracking-widest text-[color:var(--brand-red)]">
                  PILLAR {String(i + 1).padStart(2, "0")}
                </p>
                <h4 className="mt-2 font-serif text-xl font-bold text-[color:var(--forest-950)]">
                  {title}
                </h4>
                <p className="mt-3 text-stone-600 leading-relaxed">{body}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
        {/* Closing manifesto */}
        <Reveal delay={0.2} className="mt-12 text-center md:mt-16">
          <p
            className="font-serif text-2xl sm:text-4xl leading-snug max-w-4xl mx-auto"
            style={{ color: "var(--forest-950)" }}
          >
            Where <span className="text-[color:var(--brand-red)]">science</span> meets{" "}
            <span className="text-[color:var(--leaf-700)]">nature</span>. Where{" "}
            <span className="text-[color:var(--leaf-700)]">land</span> meets{" "}
            <span className="text-[color:var(--brand-amber)]">growth</span>. Where{" "}
            <span className="text-[color:var(--brand-amber)]">vision</span> meets{" "}
            <span className="text-[color:var(--brand-red)]">value</span>.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

