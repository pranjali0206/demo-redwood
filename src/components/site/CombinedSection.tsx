import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Check, Plus, ArrowRight, Sparkles, TreePine, Building2 } from "lucide-react";

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

export function CombinedSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const p = useSpring(scrollYProgress, { stiffness: 80, damping: 20, mass: 0.5 });

  // Heading
  const headingY = useTransform(p, [0.05, 0.2], [60, 0]);
  const headingOpacity = useTransform(p, [0.05, 0.2], [0, 1]);

  // Agroforestry (left card)
  const agroX = useTransform(p, [0.1, 0.3, 0.5, 0.65], [-200, 0, 0, 200]);
  const agroOpacity = useTransform(p, [0.1, 0.25, 0.55, 0.65], [0, 1, 1, 0]);
  const agroScale = useTransform(p, [0.1, 0.3, 0.5, 0.65], [0.5, 0.85, 0.85, 0.4]);
  const agroRotate = useTransform(p, [0.5, 0.65], [0, -8]);

  // Plus sign
  const plusOpacity = useTransform(p, [0.28, 0.38, 0.5, 0.58], [0, 1, 1, 0]);
  const plusScale = useTransform(p, [0.28, 0.38, 0.58], [0, 1.15, 0.3]);
  const plusRotate = useTransform(p, [0.28, 0.6], [0, 270]);

  // Real Estate (right card)
  const realX = useTransform(p, [0.3, 0.45, 0.5, 0.65], [200, 0, 0, -200]);
  const realOpacity = useTransform(p, [0.3, 0.45, 0.55, 0.65], [0, 1, 1, 0]);
  const realScale = useTransform(p, [0.3, 0.45, 0.5, 0.65], [0.5, 0.85, 0.85, 0.4]);
  const realRotate = useTransform(p, [0.5, 0.65], [0, 8]);

  // Redwood combined
  const redwoodScale = useTransform(p, [0.58, 0.78], [0.25, 1]);
  const redwoodOpacity = useTransform(p, [0.58, 0.72], [0, 1]);
  const redwoodGlow = useTransform(p, [0.62, 0.82], [0, 1]);
  const redwoodY = useTransform(p, [0.58, 0.95], [40, -20]);

  // Parallax decor
  const blob1Y = useTransform(p, [0, 1], [0, -180]);
  const blob2Y = useTransform(p, [0, 1], [0, 220]);

  // CTA
  const ctaY = useTransform(p, [0.82, 0.95], [80, 0]);
  const ctaOpacity = useTransform(p, [0.82, 0.95], [0, 1]);

  const progressScaleX = useTransform(p, [0.05, 0.95], [0, 1]);

  return (
    <section ref={sectionRef} className="relative bg-stone-100 " style={{ height: "380vh" }}>
      <motion.div
        style={{ y: blob1Y }}
        className="absolute top-[18%] -left-0 w-96 h-96 rounded-full bg-green-200/50 blur-3xl pointer-events-none"
        aria-hidden
      />
      <motion.div
        style={{ y: blob2Y }}
        className="absolute top-[50%] -right-0 w-[28rem] h-[28rem] rounded-full bg-amber-200/40 blur-3xl pointer-events-none"
        aria-hidden
      />

      <div className="sticky top-0 h-screen flex flex-col overflow-hidden">
        <motion.div
          style={{ scaleX: progressScaleX, transformOrigin: "0% 50%" }}
          className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-700 via-amber-500 to-green-900 z-30"
        />

        <motion.div
          style={{ y: headingY, opacity: headingOpacity }}
          className="pt-12 sm:pt-16 px-6 text-center max-w-3xl mx-auto"
        >
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-green-900 text-balance">
            Two of India's Most Trusted Investments{" "}
            <span className="text-amber-700">Combined.</span>
          </h2>
          <p className="mt-3 text-base sm:text-lg text-stone-600">
            Landowners who wait for real estate appreciation wait alone. Ours work for you from day one.
          </p>
        </motion.div>

        <div className="flex-1 relative flex items-center justify-center px-4">
          {/* Agroforestry */}
          <motion.div
            style={{ x: agroX, opacity: agroOpacity, scale: agroScale, rotate: agroRotate }}
            className="absolute left-1/2 -translate-x-1/2 md:left-[12%] md:translate-x-0 w-[300px] sm:w-[340px] rounded-2xl bg-green-50 border border-green-200 p-6 shadow-2xl shadow-green-900/20"
          >
            <div className="flex items-center gap-2 text-green-800">
              <TreePine size={22} />
              <h3 className="font-serif text-xl font-bold">Agroforestry</h3>
            </div>
            <ul className="mt-4 space-y-2">
              {agroforestryPoints.map((pt) => (
                <li key={pt} className="flex gap-2 text-sm text-stone-700">
                  <Check size={16} className="text-green-700 shrink-0 mt-0.5" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Plus */}
          <motion.div
            style={{ opacity: plusOpacity, scale: plusScale, rotate: plusRotate }}
            className="relative z-10 w-16 h-16 rounded-full bg-amber-500 text-white flex items-center justify-center shadow-2xl shadow-amber-600/50"
          >
            <Plus size={32} strokeWidth={3} />
          </motion.div>

          {/* Real Estate */}
          <motion.div
            style={{ x: realX, opacity: realOpacity, scale: realScale, rotate: realRotate }}
            className="absolute left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-[12%] w-[300px] sm:w-[340px] rounded-2xl bg-stone-200 border border-stone-300 p-6 shadow-2xl shadow-stone-900/20"
          >
            <div className="flex items-center gap-2 text-stone-800">
              <Building2 size={22} />
              <h3 className="font-serif text-xl font-bold">Real Estate</h3>
            </div>
            <ul className="mt-4 space-y-2">
              {realEstatePoints.map((pt) => (
                <li key={pt} className="flex gap-2 text-sm text-stone-700">
                  <Check size={16} className="text-stone-600 shrink-0 mt-0.5" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Redwood */}
          <motion.div
            style={{ scale: redwoodScale, opacity: redwoodOpacity, y: redwoodY }}
            className="relative z-20 w-[92%] sm:w-[480px] rounded-3xl bg-gradient-to-br from-green-900 via-green-800 to-green-950 text-white p-7 sm:p-8 shadow-2xl shadow-green-900/50 border border-amber-500/30"
          >
            <motion.div
              style={{ opacity: redwoodGlow }}
              className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-amber-400/40 via-transparent to-green-400/30 blur-2xl -z-10"
              aria-hidden
            />

            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-green-950 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
              Recommended
            </span>

            <div className="flex items-center gap-2 text-amber-300">
              <Sparkles size={22} />
              <h3 className="font-serif text-2xl sm:text-3xl font-bold">Redwood Biotech Model</h3>
            </div>
            <p className="mt-2 text-sm text-green-100/80">
              Where land meets timber — a synergy compounding wealth from day one.
            </p>

            <ul className="mt-5 grid sm:grid-cols-2 gap-x-4 gap-y-2.5">
              {redwoodPoints.map((pt) => (
                <li key={pt} className="flex gap-2 text-sm">
                  <Check size={16} className="text-amber-300 shrink-0 mt-0.5" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>

            <Link
              to="/model"
              className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-amber-500 text-green-950 font-semibold hover:bg-amber-400 transition-colors text-sm"
            >
              Know More <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>

        <motion.div style={{ y: ctaY, opacity: ctaOpacity }} className="px-4 sm:px-8 pb-10">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 px-6 py-5 rounded-xl bg-amber-50 border border-amber-200">
            <p className="text-base sm:text-lg text-amber-900 font-serif">
              India imports <span className="font-bold">₹75 crore</span> of teak every year. Your land could be supplying it.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-amber-700 text-white font-semibold hover:bg-amber-800 transition-colors whitespace-nowrap"
            >
              Become a Partner <ArrowRight size={18} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
