import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { MapPinned, TreePine, FlaskConical, ChevronDown, Sparkles } from "lucide-react";
import forestImg from "@/assets/teak-forest.jpg";
import landImg from "@/assets/land-aerial.jpg";
import labImg from "@/assets/biotech-lab.jpg";
import { Reveal } from "./Reveal-2";

const steps = [
  {
    n: "01",
    Icon: MapPinned,
    title: "Strategic Land Selection",
    body: "Every Redwood project begins with carefully chosen land parcels on the outskirts of growing cities and within naturally scenic landscapes. Positioned to benefit from future urban expansion, rising connectivity, and tourism — a strong foundation for long-term land appreciation.",
    image: landImg,
    tag: "Land",
  },
  {
    n: "02",
    Icon: TreePine,
    title: "Premium Genitically Hi-Tech Sagwan Plantation",
    body: "Sagwan (Teak) is globally recognized as the King of Timber — renowned for exceptional strength, durability, and timeless beauty. The preferred choice for luxury furniture, premium interiors, and high-value wood applications, with consistent demand and limited quality supply.",
    image: forestImg,
    tag: "Sagwan",
  },
  {
    n: "03",
    Icon: FlaskConical,
    title: "Biotechnology-Driven Cultivation",
    body: "Traditional teak develops multiple branches and inconsistent growth. Redwood uses advanced biotechnology and scientifically selected planting material to cultivate superior Genitically Hi-Tech Sagwan — greater height, girth, straighter trunks, minimal branching. Higher-quality timber, improved yield, greater market value.",
    image: labImg,
    tag: "Biotech",
  },
];

export function Process() {

    const vars = {
        "--forest-950": "#0a1a0f",
        "--brand-amber": "#d97706",
        "--brand-red": "#dc2626",
        "--leaf-400": "#86efac",
      } as React.CSSProperties;

      
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const lineHeight = useTransform(scrollYProgress, [0.05, 0.7], ["0%", "100%"]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section
  ref={sectionRef}
  className="relative overflow-hidden py-24 lg:py-32 text-foreground"
  style={{ backgroundColor: "var(--forest-950)", ...vars }}  // ← add ...vars
>


      {/* Layered backgrounds */}
      <motion.div
        aria-hidden
        style={{ y: bgY, backgroundImage: `url(${forestImg})` }}
        className="absolute inset-0 bg-cover bg-center opacity-20"
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 20% 0%, color-mix(in oklab, var(--brand-amber) 18%, transparent), transparent 55%), radial-gradient(ellipse at 80% 100%, color-mix(in oklab, var(--brand-red) 14%, transparent), transparent 60%), linear-gradient(180deg, var(--forest-950) 0%, color-mix(in oklab, var(--forest-950) 92%, black) 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 mix-blend-overlay opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading — preserved exactly */}
        <Reveal className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[color:var(--brand-amber)]/40 bg-[color:var(--brand-amber)]/10 text-[color:var(--brand-amber)] text-xs uppercase tracking-[0.3em]">
            <Sparkles size={14} /> The Redwood Formula
          </span>
          <h2 className="mt-6 font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.05]">
            The Science Behind the Returns.
          </h2>
          <p className="mt-5 text-lg text-green-100/80">
            Premium <span className="text-[color:var(--brand-red)] font-semibold">Genitically Hi-Tech Sagwan</span>{" "}
            cultivation with the help of advanced{" "}
            <span className="text-[color:var(--brand-red)] font-semibold">biotechnology</span> on
            the most valuable{" "}
            <span className="text-[color:var(--brand-red)] font-semibold">land</span> of the future.
          </p>
        </Reveal>

        {/* Vertical timeline */}
        <div className="relative mt-20">
          {/* Spine */}
          <div
            aria-hidden
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px -translate-x-px bg-white/10"
          />
          <motion.div
            aria-hidden
            style={{ height: lineHeight }}
            className="absolute left-6 md:left-1/2 top-0 w-px -translate-x-px"
          >
            <div
              className="h-full w-full"
              style={{
                background:
                  "linear-gradient(180deg, var(--brand-amber), color-mix(in oklab, var(--brand-amber) 60%, var(--brand-red)))",
                boxShadow: "0 0 24px color-mix(in oklab, var(--brand-amber) 60%, transparent)",
              }}
            />
          </motion.div>

          <div className="space-y-20 md:space-y-32">
            {steps.map((s, i) => (
              <StepRow key={s.n} step={s} index={i} />
            ))}
          </div>
        </div>

        {/* Formula */}
        <div className="mt-28 relative">
          <Reveal>
            <p className="text-center text-xs uppercase tracking-[0.4em] text-[color:var(--brand-amber)]">
              The Redwood Formula
            </p>
          </Reveal>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={{ show: { transition: { staggerChildren: 0.25, delayChildren: 0.2 } } }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-center"
          >
            {[
              { label: "Strategic Land", color: "var(--brand-amber)" },
              { op: "+" },
              { label: "Premium Genitically Hi-Tech Sagwan", color: "var(--leaf-400)" },
              { op: "+" },
              { label: "Biotechnology", color: "var(--brand-red)" },
              { op: "=" },
              { label: "Science-Driven Wealth", color: "var(--brand-amber)", final: true },
            ].map((item, i) =>
              item.op ? (
                <motion.span
                  key={i}
                  variants={{
                    hidden: { opacity: 0, scale: 0.5 },
                    show: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
                  }}
                  className="font-serif text-3xl sm:text-5xl text-white/60"
                >
                  {item.op}
                </motion.span>
              ) : (
                <motion.div
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
                  }}
                  className={`px-5 sm:px-7 py-3 sm:py-4 rounded-xl border backdrop-blur-sm ${
                    item.final
                      ? "border-[color:var(--brand-amber)]/60 bg-[color:var(--brand-amber)]/10"
                      : "border-white/10 bg-white/5"
                  }`}
                >
                  <span
                    className="font-serif text-base sm:text-xl font-semibold"
                    style={{ color: item.color }}
                  >
                    {item.label}
                  </span>
                </motion.div>
              )
            )}
          </motion.div>

          {/* Pointing down indicator */}
          <Reveal delay={0.4} className="mt-16 text-center">
            <p className="text-sm text-green-100/70">
              Let's know more about{" "}
              <span className="text-[color:var(--brand-amber)] font-semibold">Redwood Biotech</span>
            </p>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="mt-4 inline-flex items-center justify-center w-12 h-12 rounded-full border border-[color:var(--brand-amber)]/40 text-[color:var(--brand-amber)]"
            >
              <ChevronDown size={22} />
            </motion.div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function StepRow({
  step,
  index,
}: {
  step: (typeof steps)[number];
  index: number;
}) {
  const isRight = index % 2 === 1;
  const { Icon } = step;

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      variants={{ show: { transition: { staggerChildren: 0.15 } } }}
      className="relative grid md:grid-cols-2 gap-8 md:gap-16 items-center"
    >
      {/* Node on spine */}
      <motion.div
        variants={{
          hidden: { scale: 0, opacity: 0 },
          show: { scale: 1, opacity: 1, transition: { duration: 0.5, ease: "backOut" } },
        }}
        className="absolute left-6 md:left-1/2 top-8 -translate-x-1/2 z-10"
      >
        <div
          className="w-5 h-5 rounded-full ring-4 ring-[color:var(--forest-950)]"
          style={{
            background:
              "radial-gradient(circle, var(--brand-amber) 0%, color-mix(in oklab, var(--brand-amber) 50%, var(--brand-red)) 100%)",
            boxShadow: "0 0 20px var(--brand-amber)",
          }}
        />
      </motion.div>

      {/* Content side */}
      <motion.div
        variants={{
          hidden: { opacity: 0, x: isRight ? 40 : -40 },
          show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
        }}
        className={`pl-16 md:pl-0 ${isRight ? "md:order-2 md:pl-16" : "md:pr-16 md:text-right"}`}
      >
        <div className={`flex items-center gap-3 ${isRight ? "" : "md:justify-end"}`}>
          <span className="font-serif text-5xl sm:text-6xl font-bold text-[color:var(--brand-amber)]/80 leading-none">
            {step.n}
          </span>
          <span className="text-[10px] uppercase tracking-[0.3em] text-[color:var(--brand-amber)] px-2 py-1 rounded-full border border-[color:var(--brand-amber)]/30">
            {step.tag}
          </span>
        </div>
        <h3 className="mt-4 font-serif text-2xl sm:text-3xl font-bold text-white">
          {step.title}
        </h3>
        <p className="mt-4 text-green-100/75 leading-relaxed">{step.body}</p>
      </motion.div>

      {/* Image side */}
      <motion.div
        variants={{
          hidden: { opacity: 0, x: isRight ? -40 : 40, scale: 0.95 },
          show: {
            opacity: 1,
            x: 0,
            scale: 1,
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
          },
        }}
        className={`pl-16 md:pl-0 ${isRight ? "md:order-1" : ""}`}
      >
        <div className="relative group">
          <div
            aria-hidden
            className="absolute -inset-1 rounded-2xl opacity-60 blur-xl transition group-hover:opacity-90"
            style={{
              background:
                "linear-gradient(135deg, color-mix(in oklab, var(--brand-amber) 50%, transparent), color-mix(in oklab, var(--brand-red) 40%, transparent))",
            }}
          />
          <div className="relative overflow-hidden rounded-2xl border border-white/10 aspect-[4/3]">
            <img
              src={step.image}
              alt={step.title}
              loading="lazy"
              className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, transparent 40%, color-mix(in oklab, var(--forest-950) 70%, transparent))",
              }}
            />
            <div className="absolute bottom-4 left-4 w-12 h-12 rounded-full bg-[color:var(--forest-950)]/80 backdrop-blur border border-[color:var(--brand-amber)]/40 flex items-center justify-center">
              <Icon size={22} className="text-[color:var(--brand-amber)]" />
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
