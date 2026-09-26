import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Check, ArrowRight, Sparkles, TreePine, Building2 } from "lucide-react";
import combinedBg from "../../assets/combined-bg.webp";

// ─── Data ────────────────────────────────────────────────────────────────────

const realEstatePoints = [
  "Stability & Security",
  "Long-Term Capital Appreciation",
  "Generational Wealth Creation",
  "Limited Supply, Increasing Value",
];

const agroforestryPoints = [
  "Natural Biological Growth",
  "High-Value Timber Potential",
  "Environmental & Ecological Impact",
  "Rising Demand, Limited Supply",
];

const redwoodPoints = [
  "Land + Timber Synergy",
  "Multiple Drivers of Wealth Creation",
  "Sustainable Long-Term Growth",
  "Security Backed by Real Assets",
  "100% Tax-Free Agriculture Income",
];

// ─── Animation variants ───────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

const arcVariant = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 1.2, ease: "easeInOut", delay: 0.1 },
  },
};

const dotVariant = (delay: number) => ({
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.4, ease: "backOut", delay },
  },
});

const labelVariant = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, delay: 1.1 } },
};

// ─── Component ────────────────────────────────────────────────────────────────

export function CombinedSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  // Trigger animation once when section enters the viewport
  const inView = useInView(sectionRef, { once: true, margin: "-80px 0px" });

  return (
    <section
      ref={sectionRef}
      className="relative bg-stone-100 overflow-hidden py-16 sm:py-24 px-4"
    >

          {/* Background Image */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
      >
        <img
          src={combinedBg}
          alt=""
          className="w-full h-full object-cover opacity-[0.8] select-none"
        />

        {/* Soft overlay to blend with section */}
        <div className="absolute inset-0 bg-stone-100/70" />
      </div>

      {/* ── Decorative blobs ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-1/4 w-96 h-96 rounded-full bg-green-200/40 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-1/2 w-[28rem] h-[28rem] rounded-full bg-amber-200/30 blur-3xl"
      />

      <div className="relative max-w-6xl mx-auto">
        {/* ── Heading ── */}
        <motion.div
          className="text-center mb-10 sm:mb-14 max-w-2xl mx-auto"
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-green-900 text-balance leading-tight">
            Two of India's Most Trusted Investments{" "}
            <span className="text-amber-700">Combined.</span>
          </h2>
          <p className="mt-3 text-base sm:text-lg text-stone-600">
            Landowners who wait for real estate appreciation wait alone.
            Ours work for you from day one.
          </p>
        </motion.div>

        {/* ── Arc SVG ── */}
        <div className="w-full mb-[-6px] overflow-visible" aria-hidden>
          <svg
            viewBox="0 0 660 72"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full overflow-visible"
          >
            <defs>
              <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%"   stopColor="#2a7a4e" />
                <stop offset="50%"  stopColor="#1d9e75" />
                <stop offset="100%" stopColor="#0f6e56" />
              </linearGradient>
            </defs>

            {/* Main arc */}
            <motion.path
              d="M 110 65 C 110 20, 220 8, 330 8 C 440 8, 550 20, 550 65"
              fill="none"
              stroke="url(#arcGrad)"
              strokeWidth="2.2"
              strokeLinecap="round"
              variants={arcVariant}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            />

            {/* Left dot */}
            <motion.circle
              cx="110" cy="65" r="5" fill="#2a7a4e"
              variants={dotVariant(0.55)}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            />

            {/* Centre peak dot (slightly larger) */}
            <motion.circle
              cx="330" cy="8" r="6"
              fill="#1d9e75" stroke="white" strokeWidth="1.5"
              variants={dotVariant(0.9)}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            />

            {/* Right dot */}
            <motion.circle
              cx="550" cy="65" r="5" fill="#0f6e56"
              variants={dotVariant(1.25)}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            />

            {/* Label above arc peak */}
            <motion.text
              x="330" y="3"
              textAnchor="middle"
              fontSize="8"
              fill="#1d9e75"
              fontFamily="sans-serif"
              letterSpacing="0.08em"
              variants={labelVariant}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              REDWOOD SYNERGY
            </motion.text>
          </svg>
        </div>

        {/* ── Three Cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 items-stretch">
          {/* 1. Agroforestry — smallest */}
          <motion.div
            custom={0.2}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="sm:self-end"
          >
           <div className="h-full min-h-[340px] rounded-2xl bg-green-50 border border-green-200 p-8 shadow-xl shadow-green-900/10 flex flex-col">
              <div className="flex items-center gap-2 text-green-800 mb-4">
                <TreePine size={20} />
                <h3 className="font-serif text-lg font-bold">Agroforestry</h3>
              </div>
              <ul className="space-y-2">
                {agroforestryPoints.map((pt) => (
                  <li key={pt} className="flex gap-2 text-sm text-stone-700">
                    <Check size={15} className="text-green-700 shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* 2. Real Estate — medium */}
          <motion.div
            custom={0.55}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="sm:self-end"
          >
            <div className="h-full min-h-[340px] rounded-2xl bg-stone-200 border border-stone-300 p-8 shadow-xl shadow-stone-900/10 flex flex-col">
              <div className="flex items-center gap-2 text-stone-800 mb-4">
                <Building2 size={22} />
                <h3 className="font-serif text-xl font-bold">Real Estate</h3>
              </div>
              <ul className="space-y-2.5">
                {realEstatePoints.map((pt) => (
                  <li key={pt} className="flex gap-2 text-sm text-stone-700">
                    <Check size={15} className="text-stone-600 shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* 3. Redwood — largest */}
          <motion.div
            custom={0.9}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {/* "Recommended" badge sits above the card */}
            <div className="relative">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 bg-amber-500 text-green-950 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md whitespace-nowrap">
                ✦ Recommended
              </span>

              <div className="relative rounded-3xl bg-gradient-to-br from-green-900 via-green-800 to-green-950 text-white p-7 shadow-2xl shadow-green-900/40 border border-amber-500/30 overflow-hidden">
                {/* Subtle inner glow */}
                <div
                  aria-hidden
                  className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-amber-400/20 via-transparent to-green-400/10 blur-2xl pointer-events-none"
                />

                <div className="relative">
                  <div className="flex items-center gap-2 text-amber-300 mb-1">
                    <Sparkles size={20} />
                    <h3 className="font-serif text-2xl font-bold">
                      Redwood Biotech Model
                    </h3>
                  </div>
                  <p className="text-sm text-green-100/70 mb-5">
                    Where land meets timber — a synergy compounding wealth from day one.
                  </p>

                  <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5 mb-6">
                    {redwoodPoints.map((pt, i) => (
                      <li
                        key={pt}
                        className={`flex gap-2 text-sm ${
                          // Last item (odd one out) spans both columns
                          i === redwoodPoints.length - 1 && redwoodPoints.length % 2 !== 0
                            ? "col-span-2"
                            : ""
                        }`}
                      >
                        <Check size={15} className="text-amber-300 shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    to="/model"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-amber-500 text-green-950 font-semibold hover:bg-amber-400 transition-colors text-sm"
                  >
                    Know More <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── CTA Bar ── */}
        <motion.div
          custom={1.2}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mt-10"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-5 rounded-xl bg-amber-50 border border-amber-200">
            <p className="text-base sm:text-lg text-amber-900 font-serif text-center sm:text-left">
              India imports{" "}
              <span className="font-bold">₹8,848.12 crore</span> of teak every year.
              Your land could be supplying it.
            </p>
            
          </div>
        </motion.div>
      </div>
    </section>
  );
}