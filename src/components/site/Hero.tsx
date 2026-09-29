import type { MouseEvent, ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowRight, ArrowUpRight, FlaskConical, Sprout } from "lucide-react";
import heroBg from "@/assets/teak-plantation-hero.webp";
import urbanFarmImg from "@/assets/land-aerial.webp";
import { CountUp } from "./Reveal";

const EASE = [0.22, 1, 0.36, 1] as const;
const BG = "#06130b";

const NOISE =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

// Figures mirror the Investment page stats row — keep them in sync.
const stats: { value: ReactNode; label: string }[] = [
  { value: <CountUp to={75} suffix="%" />, label: "Investor Share of Proceeds" },
  { value: <CountUp to={12} suffix=" yrs" />, label: "Plantation Cycle" },
  { value: <CountUp to={100} suffix="%" />, label: "Professionally Managed" },
  { value: "Tax-Free", label: "Agricultural Income" },
];

const statCellClass = [
  "pl-0 sm:pl-0",
  "border-l",
  "border-t pl-0 sm:pl-0 lg:border-t-0 lg:border-l lg:pl-6",
  "border-l border-t lg:border-t-0",
];

export function Hero() {
  const reduce = useReducedMotion() ?? false;

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const bgX = useSpring(useTransform(px, [-1, 1], [14, -14]), { stiffness: 50, damping: 20 });
  const bgY = useSpring(useTransform(py, [-1, 1], [14, -14]), { stiffness: 50, damping: 20 });

  const handleMove = (e: MouseEvent<HTMLElement>) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set(((e.clientX - r.left) / r.width - 0.5) * 2);
    py.set(((e.clientY - r.top) / r.height - 0.5) * 2);
  };
  const handleLeave = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <section
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="relative isolate flex min-h-svh flex-col overflow-hidden text-white"
      style={{ backgroundColor: BG }}
    >
      {/* Background */}
      <motion.div aria-hidden className="absolute -inset-6 -z-10" style={{ x: bgX, y: bgY }}>
        <motion.img
          src={heroBg}
          alt=""
          fetchPriority="high"
          className="h-full w-full object-cover object-[50%_35%]"
          initial={reduce ? false : { scale: 1.15, opacity: 0 }}
          animate={{ scale: 1.03, opacity: 1 }}
          transition={{ duration: 2.2, ease: EASE }}
        />
      </motion.div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-[#06130b]/50 lg:bg-transparent" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-r from-[#06130b]/95 via-[#06130b]/60 to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-t from-[#06130b] via-[#06130b]/10 to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-[#06130b]/70 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07] mix-blend-overlay"
        style={{ backgroundImage: NOISE }}
      />

      {/* Content */}
      <div className="relative flex flex-1 items-center">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-14 px-4 pb-16 pt-28 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:px-8 lg:pb-12 lg:pt-28">
          <div className="lg:col-span-7">
            <motion.p
              initial={reduce ? false : { opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
              className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.35em] text-amber-300 sm:text-xs"
            >
              <span className="h-px w-10 bg-gradient-to-r from-amber-300 to-transparent" />
              Innovative Science · Wealthier Tomorrow
            </motion.p>

            <h1 className="mt-6 font-serif font-bold">
              <MaskLine
                reduce={reduce}
                delay={0.3}
                className="text-[2.75rem] leading-[1.04] tracking-tight sm:text-6xl xl:text-[5.25rem]"
              >
                Real Estate
              </MaskLine>
              <MaskLine
                reduce={reduce}
                delay={0.42}
                className="text-[2.75rem] leading-[1.04] tracking-tight sm:text-6xl xl:text-[5.25rem]"
              >
                <span className="text-amber-400">+</span> Agroforestry
              </MaskLine>
              <MaskLine
                reduce={reduce}
                delay={0.56}
                outerClassName="mt-4"
                className="bg-gradient-to-r from-amber-200 via-amber-300 to-amber-500 bg-clip-text text-xl font-semibold italic leading-snug text-transparent sm:text-2xl lg:text-[1.75rem]"
              >
                Genetically Engineered Hi-Tech Sagwan Teak
              </MaskLine>
            </h1>

            <motion.p
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.75 }}
              className="mt-7 max-w-xl text-base leading-relaxed text-stone-200/85 sm:text-lg"
            >
              Grown on your land, managed and sold by us,{" "}
              <span className="font-semibold text-white">profit earned by you.</span>
            </motion.p>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.9 }}
              className="mt-10 flex flex-col gap-3 sm:flex-row"
            >
              <Link
                to="/agroforestry"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-amber-500 px-7 py-3.5 text-sm font-semibold tracking-wide text-green-950 shadow-[0_12px_32px_-12px_rgba(245,158,11,0.8)] transition-colors duration-300 hover:bg-amber-400"
              >
                Learn More
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
              <Link
                to="/model"
                className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/5 px-7 py-3.5 text-sm font-semibold tracking-wide text-white backdrop-blur-sm transition-colors duration-300 hover:border-white/50 hover:bg-white/10"
              >
                Explore the Model
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.7 }}
            className="relative lg:col-span-5"
          >
            <UrbanFarmerCard reduce={reduce} />
          </motion.div>
        </div>
      </div>

      {/* Stats */}
      <motion.div
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.1 }}
        className="relative border-t border-white/10 bg-[#06130b]/60 backdrop-blur-md"
      >
        <dl className="mx-auto grid max-w-7xl grid-cols-2 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`flex flex-col-reverse justify-end border-white/10 px-4 py-5 sm:px-6 sm:py-6 ${statCellClass[i]}`}
            >
              <dt className="mt-1 text-[10px] font-medium uppercase tracking-[0.22em] text-stone-300/70 sm:text-[11px]">
                {s.label}
              </dt>
              <dd className="text-2xl font-semibold tracking-tight text-white tabular-nums sm:text-3xl">
                {s.value}
              </dd>
            </div>
          ))}
        </dl>
      </motion.div>
    </section>
  );
}

function MaskLine({
  children,
  delay,
  reduce,
  className = "",
  outerClassName = "",
}: {
  children: ReactNode;
  delay: number;
  reduce: boolean;
  className?: string;
  outerClassName?: string;
}) {
  return (
    // Bottom padding keeps descenders (g, y) from being clipped by the mask.
    <span className={`block overflow-hidden pb-[0.12em] ${outerClassName}`}>
      <motion.span
        className={`block ${className}`}
        initial={reduce ? false : { y: "110%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, ease: EASE, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

function UrbanFarmerCard({ reduce }: { reduce: boolean }) {
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [6, -6]), { stiffness: 150, damping: 18 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-6, 6]), { stiffness: 150, damping: 18 });
  const glareX = useTransform(mx, (v) => `${v * 100}%`);
  const glareY = useTransform(my, (v) => `${v * 100}%`);
  const glare = useMotionTemplate`radial-gradient(420px circle at ${glareX} ${glareY}, rgba(255,255,255,0.14), transparent 45%)`;

  const handleMove = (e: MouseEvent<HTMLElement>) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };
  const handleLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <div className="relative">
      <motion.div
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{ rotateX, rotateY, transformPerspective: 1200 }}
        className="group relative overflow-hidden rounded-3xl border border-white/15 bg-[#0b1f14]/75 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl transition-colors duration-500 hover:border-amber-400/50"
      >
        <Link
          to="/urban-farmer"
          className="block rounded-3xl outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-amber-300"
        >
          <div className="relative aspect-[16/9] overflow-hidden lg:aspect-[2/1]">
            <img
              src={urbanFarmImg}
              alt="Green farmland rolling toward a city skyline at sunrise"
              className="h-full w-full object-cover object-[50%_40%] transition-transform duration-1000 ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b1f14] via-[#0b1f14]/20 to-transparent" />
            <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/35 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-md">
              <Sprout size={12} className="text-amber-300" /> A Movement Beyond Rural Boundaries
            </span>
          </div>

          <div className="relative px-6 pb-6 pt-1 sm:px-7 sm:pb-7">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-amber-300">
              The Urban Farmer
            </p>
            <h2 className="mt-2 font-serif text-2xl font-bold leading-snug text-white sm:text-[1.7rem]">
              Farming Isn't Just a Rural Legacy Anymore.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-stone-300/90 sm:text-[15px]">
              Your address doesn't decide your roots. Wherever you live, your land can still grow
              your future — with Redwood Biotech.
            </p>
            <span className="mt-6 flex items-center justify-between gap-3 rounded-2xl bg-amber-500 py-2.5 pl-5 pr-2.5 text-sm font-bold tracking-wide text-green-950 transition-colors duration-300 group-hover:bg-amber-400">
              Become The Urban Farmer
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-950/10 transition-transform duration-300 group-hover:translate-x-1">
                <ArrowRight size={16} />
              </span>
            </span>
          </div>
        </Link>

        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: glare }}
        />
      </motion.div>

      <motion.div
        className="absolute -left-8 top-20 hidden items-center gap-3 rounded-2xl border border-white/15 bg-[#0b1f14]/70 py-3 pl-3 pr-5 shadow-2xl backdrop-blur-xl xl:flex"
        animate={reduce ? undefined : { y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-400/15 text-amber-300">
          <FlaskConical size={20} />
        </span>
        <span>
          <span className="block font-serif text-sm font-bold text-white">Hi-Tech Sagwan</span>
          <span className="block text-[11px] text-stone-300/80">Tissue-culture grown</span>
        </span>
      </motion.div>
    </div>
  );
}
