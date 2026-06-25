import {
    motion,
    useScroll,
    useTransform,
    useReducedMotion,
  } from "framer-motion";
  import { useRef } from "react";
import { TreePine, Leaf, TrendingUp, Sprout } from "lucide-react";
import fieldImg from "@/assets/agroforestry-field.jpg";
import bgImg from "@/assets/agroforestry-bg.jpg";

const benefits = [
  { Icon: TreePine, t: "Long Term Asset Value", d: "Land that appreciates, generation after generation." },
  { Icon: Leaf, t: "Tax-Free Income", d: "Agricultural yields exempt under Indian tax law." },
  { Icon: TrendingUp, t: "Passive Returns Over 12 Years", d: "Compounding timber growth, hands-off." },
];

export default function Agroforestry() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax on the hero image
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "12%"]);
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1, 1.05]);
  // Subtle drift for the decorative leaf in the background
  const leafY = useTransform(scrollYProgress, [0, 1], ["20%", "-30%"]);
  const leafRotate = useTransform(scrollYProgress, [0, 1], [-12, 18]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[oklch(0.985_0.01_95)] py-24 lg:py-32"
    >
      {/* Background image layer */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-60"
        style={{ backgroundImage: `url(${bgImg})` }}
      />
      {/* Warm tonal wash on top of bg image to keep text readable */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[oklch(0.985_0.015_95/0.7)] via-[oklch(0.97_0.02_95/0.55)] to-[oklch(0.95_0.04_140/0.6)]"
      />

      {/* Ambient background ornaments */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[oklch(0.85_0.12_140/0.25)] blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[oklch(0.82_0.14_70/0.22)] blur-3xl" />
        <motion.div
          style={prefersReducedMotion ? undefined : { y: leafY, rotate: leafRotate }}
          className="absolute right-[8%] top-[12%] hidden text-[oklch(0.55_0.14_145)] opacity-25 lg:block"
        >
          <Sprout size={140} strokeWidth={1} />
        </motion.div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 rounded-full border border-[oklch(0.6_0.12_145/0.3)] bg-[oklch(0.95_0.04_140)] px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-[oklch(0.35_0.1_145)]"
          >
            <Leaf size={14} /> The Smart Indian Portfolio
          </motion.span>

          <h2 className="mt-6 font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] text-[oklch(0.28_0.07_145)]">
  Why Smart Indians Are Investing In
  <br />
  <span className="relative inline-block">
    <span className="relative z-10 text-[1.7rem] sm:text-5xl lg:text-6xl whitespace-nowrap bg-gradient-to-r from-[oklch(0.55_0.2_30)] to-[oklch(0.5_0.22_20)] bg-clip-text text-transparent">
      Real Estate + Agroforestry
    </span>
  </span>
</h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-5 text-lg text-[oklch(0.45_0.02_80)]"
          >
            The ancient practice, reimagined with 21st century science.
          </motion.p>
        </motion.div>

        {/* Content grid */}
        <div className="mt-20 grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Image column with parallax */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative lg:col-span-6"
          >
            <div className="relative h-[480px] overflow-hidden rounded-[2rem] shadow-[0_30px_80px_-20px_oklch(0.3_0.1_145/0.35)] ring-1 ring-black/5">
              <motion.img
                src={fieldImg}
                alt="Plantation field at golden hour"
                loading="lazy"
                width={1280}
                height={960}
                style={prefersReducedMotion ? undefined : { y: imgY, scale: imgScale }}
                className="absolute inset-0 h-[120%] w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[oklch(0.2_0.06_145/0.6)] to-transparent" />

              {/* Floating stat badge */}
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.6 }}
                className="absolute left-6 bottom-6 max-w-[16rem] rounded-2xl bg-white/95 p-5 shadow-xl backdrop-blur"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[oklch(0.35_0.1_145)] text-white">
                    <TreePine size={20} />
                  </div>
                  <div>
                    <p className="font-serif text-2xl font-bold text-[oklch(0.28_0.07_145)]">12 yrs</p>
                    <p className="text-xs uppercase tracking-wider text-[oklch(0.5_0.03_80)]">to mature timber</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Decorative frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7, rotate: -8 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="absolute -bottom-6 -right-6 hidden h-36 w-36 rounded-[1.75rem] border-[3px] border-[oklch(0.55_0.15_60)] sm:block"
            />
          </motion.div>

          {/* Copy + benefits column */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
            }}
            className="lg:col-span-6"
          >
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 24 },
                show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
              }}
              className="text-lg leading-relaxed text-[oklch(0.38_0.02_80)]"
            >
              The stability of real estate, combined with the growth potential of agroforestry.{" "}
              <span className="font-semibold text-[oklch(0.28_0.07_145)]">Redwood</span> brings together
              two powerful asset classes—<em className="not-italic font-medium">land</em> and{" "}
              <em className="not-italic font-medium">timber</em>—to create a unique long-term investment
              opportunity. While land provides security and enduring value, agroforestry generates
              additional wealth through high-demand timber cultivation.
            </motion.p>

            <div className="mt-10 space-y-4">
              {benefits.map(({ Icon, t, d }, i) => (
                <motion.div
                  key={t}
                  variants={{
                    hidden: { opacity: 0, x: 40 },
                    show: {
                      opacity: 1,
                      x: 0,
                      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                    },
                  }}
                  whileHover={{ x: 6 }}
                  className="group relative flex items-start gap-5 overflow-hidden rounded-2xl border border-[oklch(0.9_0.02_90)] bg-white/70 p-5 backdrop-blur-sm transition-all hover:border-[oklch(0.55_0.14_145/0.4)] hover:shadow-lg hover:shadow-[oklch(0.55_0.14_145/0.1)]"
                >
                  <div className="absolute inset-y-0 left-0 w-1 origin-bottom scale-y-0 bg-gradient-to-t from-[oklch(0.55_0.14_145)] to-[oklch(0.7_0.15_120)] transition-transform duration-500 group-hover:scale-y-100" />
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[oklch(0.35_0.1_145)] to-[oklch(0.28_0.07_145)] text-white shadow-md transition-transform duration-500 group-hover:rotate-[-6deg] group-hover:scale-110">
                    <Icon size={22} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-2">
                      <span className="font-mono text-xs text-[oklch(0.55_0.14_145)]">
                        0{i + 1}
                      </span>
                      <p className="font-serif text-lg font-semibold text-[oklch(0.28_0.07_145)]">
                        {t}
                      </p>
                    </div>
                    <p className="mt-1 text-sm text-[oklch(0.5_0.02_80)]">{d}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
