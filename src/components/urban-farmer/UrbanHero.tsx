import { Fragment, useRef, type MouseEvent } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowRight, Sprout } from "lucide-react";
import logoImg from "@/assets/urban-farmer-logo.webp";
import textLogoImg from "@/assets/urban-farmer-text.webp";
import { EASE, seeded } from "./constants";
import { useScrollMap } from "./useScrollMap";

const HEADLINE = ["Own", "Farmland.", "Grow", "Premium"];

const NOISE =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

const LEAF_TONES = ["text-uf-leaf/70", "text-uf-green/60", "text-uf-sun/80"];

// Rounded because server-rendered inline styles must match the browser's re-serialized values.
const LEAVES = Array.from({ length: 14 }, (_, i) => ({
  left: Math.round(seeded(i + 1) * 1000) / 10,
  top: Math.round(300 + seeded(i + 40) * 650) / 10,
  size: Math.round(10 + seeded(i + 80) * 14),
  duration: 9 + seeded(i + 120) * 8,
  delay: seeded(i + 160) * 6,
  drift: (seeded(i + 200) - 0.5) * 90,
  spin: (seeded(i + 240) - 0.5) * 240,
  tone: LEAF_TONES[i % LEAF_TONES.length],
}));

// A small skyline for the horizon, echoing the city in the logo.
const TOWERS = Array.from({ length: 11 }, (_, i) => {
  const w = Math.round(30 + seeded(i + 300) * 26);
  const h = Math.round(50 + seeded(i + 340) * 110 * Math.sin(((i + 0.5) / 11) * Math.PI));
  return { w, h };
}).reduce<{ x: number; w: number; h: number }[]>((acc, t) => {
  const prev = acc[acc.length - 1];
  acc.push({ ...t, x: prev ? prev.x + prev.w + 6 : 860 });
  return acc;
}, []);

export function UrbanHero() {
  const reduce = useReducedMotion() ?? false;
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const contentY = useScrollMap(scrollYProgress, [0, 1], ["0%", "22%"]);
  const contentOpacity = useScrollMap(scrollYProgress, [0, 0.7], [1, 0]);
  const horizonY = useScrollMap(scrollYProgress, [0, 1], ["0%", "35%"]);

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spring = { stiffness: 50, damping: 20 };
  const glowX = useSpring(useTransform(px, [-1, 1], [-30, 30]), spring);
  const glowY = useSpring(useTransform(py, [-1, 1], [-20, 20]), spring);
  const leavesX = useSpring(useTransform(px, [-1, 1], [-40, 40]), spring);
  const leavesY = useSpring(useTransform(py, [-1, 1], [-24, 24]), spring);

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

  const reveal = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, ease: EASE, delay },
  });

  const wordsDone = 0.35 + HEADLINE.length * 0.08;

  return (
    <section
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="relative isolate flex min-h-svh flex-col overflow-hidden bg-uf-cream text-uf-forest"
    >
      {/* Sun and leaf glows */}
      <motion.div aria-hidden className="absolute inset-0 -z-10" style={{ x: glowX, y: glowY }}>
        <motion.div
          className="absolute -right-24 top-[8%] h-[36rem] w-[36rem] rounded-full bg-uf-sun/30 blur-3xl lg:right-[4%]"
          animate={reduce ? undefined : { scale: [1, 1.12, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute -left-40 bottom-0 h-[30rem] w-[30rem] rounded-full bg-uf-leaf/15 blur-3xl" />
      </motion.div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.06] mix-blend-multiply"
        style={{ backgroundImage: NOISE }}
      />

      {/* Horizon: hills and a green skyline, as in the logo */}
      <motion.svg
        aria-hidden
        viewBox="0 0 1440 240"
        preserveAspectRatio="xMidYMax slice"
        className="absolute inset-x-0 bottom-0 -z-10 h-40 w-full sm:h-56"
        style={{ y: horizonY }}
      >
        <g className="fill-uf-green/[0.13]">
          {TOWERS.map((t) => (
            <rect key={t.x} x={t.x} y={200 - t.h} width={t.w} height={t.h + 40} rx={2} />
          ))}
        </g>
        <path
          className="fill-uf-leaf/20"
          d="M0 170 C 180 120, 360 150, 540 165 S 900 120, 1080 150 S 1320 135, 1440 125 V 240 H 0 Z"
        />
        <path
          className="fill-uf-green/[0.14]"
          d="M0 205 C 220 175, 420 200, 640 195 S 1040 170, 1240 190 S 1400 185, 1440 180 V 240 H 0 Z"
        />
      </motion.svg>

      {/* Drifting leaves */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ x: leavesX, y: leavesY }}
      >
        {!reduce &&
          LEAVES.map((leaf, i) => (
            <motion.svg
              key={i}
              viewBox="0 0 24 24"
              className={`absolute ${leaf.tone}`}
              style={{
                left: `${leaf.left}%`,
                top: `${leaf.top}%`,
                width: leaf.size,
                height: leaf.size,
              }}
              animate={{
                y: [0, -160],
                x: [0, leaf.drift],
                rotate: [0, leaf.spin],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: leaf.duration,
                delay: leaf.delay,
                repeat: Infinity,
                ease: "easeOut",
              }}
            >
              <path fill="currentColor" d="M12 2C5.5 7 4.5 14.5 12 22c7.5-7.5 6.5-15 0-20z" />
              <path d="M12 6v14" stroke="rgba(23,61,10,0.35)" strokeWidth="1" />
            </motion.svg>
          ))}
      </motion.div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative flex flex-1 items-center"
      >
        <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-4 pb-20 pt-28 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:px-8 lg:pb-24">
          <div className="order-2 text-center lg:order-1 lg:col-span-7 lg:text-left">
            <motion.span
              {...reveal(0.15)}
              className="inline-flex items-center gap-2 rounded-full border border-uf-green/20 bg-uf-paper/70 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.3em] text-uf-green backdrop-blur-md sm:text-[11px]"
            >
              <Sprout size={14} className="text-uf-leaf" /> The Urban Farmer · Redwood Biotech
            </motion.span>

            <h1 className="mt-7 font-serif text-[2.4rem] font-bold leading-[1.08] tracking-tight text-uf-forest sm:text-6xl lg:text-[3.6rem] xl:text-[4.4rem]">
              {HEADLINE.map((word, i) => (
                <Fragment key={word}>
                  <motion.span
                    className="inline-block"
                    initial={reduce ? false : { opacity: 0, y: 40, filter: "blur(12px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.9, ease: EASE, delay: 0.35 + i * 0.08 }}
                  >
                    {word}
                  </motion.span>{" "}
                </Fragment>
              ))}
              <motion.span
                className="relative inline-block italic text-uf-soil"
                initial={reduce ? false : { opacity: 0, y: 40, filter: "blur(12px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.9, ease: EASE, delay: wordsDone }}
              >
                Sagwan.
                <svg
                  aria-hidden
                  viewBox="0 0 300 24"
                  preserveAspectRatio="none"
                  className="absolute -bottom-2 left-0 h-3 w-full text-uf-sun sm:-bottom-3 sm:h-5"
                >
                  <motion.path
                    d="M4 16 C 70 4, 150 4, 296 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="6"
                    strokeLinecap="round"
                    initial={reduce ? false : { pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, ease: EASE, delay: wordsDone + 0.5 }}
                  />
                </svg>
              </motion.span>
            </h1>

            <motion.p
              {...reveal(wordsDone + 0.3)}
              className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-stone-600 sm:text-xl lg:mx-0"
            >
              Invest in managed Sagwan agroforestry with{" "}
              <span className="font-semibold text-uf-forest">Redwood Biotech</span>. Own registered
              farmland, get premium Sagwan planted on it, and let our team manage it for 12 years until
              harvest. That's what it means to be an{" "}
              <span className="font-semibold text-uf-soil">Urban Farmer</span>.
            </motion.p>

            <motion.div
              {...reveal(wordsDone + 0.45)}
              className="mt-10 flex w-full flex-col justify-center gap-3 sm:flex-row lg:justify-start"
            >
              <a
                href="#join"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-uf-green px-8 py-4 text-sm font-bold tracking-wide text-uf-cream shadow-[0_14px_36px_-14px_rgba(44,94,20,0.8)] transition-colors duration-300 hover:bg-uf-forest"
              >
                Become an Urban Farmer
                <ArrowRight
                  size={16}
                  className="text-uf-sun transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
              <a
                href="#model"
                className="inline-flex items-center justify-center rounded-full border border-uf-green/25 bg-uf-paper/60 px-8 py-4 text-sm font-semibold tracking-wide text-uf-forest backdrop-blur-sm transition-colors duration-300 hover:border-uf-green/50 hover:bg-uf-paper"
              >
                How It Works
              </a>
            </motion.div>

            <motion.a
              href="#feel"
              {...reveal(wordsDone + 0.7)}
              className="mt-12 inline-flex items-center gap-3 text-stone-500 transition-colors hover:text-uf-forest"
            >
              <span className="flex h-11 w-7 justify-center rounded-full border border-uf-green/30 p-1.5">
                <motion.span
                  className="h-2 w-1 rounded-full bg-uf-soil"
                  animate={reduce ? undefined : { y: [0, 14, 0], opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                />
              </span>
              <span className="text-left text-[10px] font-medium uppercase tracking-[0.3em] sm:text-[11px]">
                Scroll down to know how
                <br />
                you can be the one
              </span>
            </motion.a>
          </div>

          <div className="order-1 lg:order-2 lg:col-span-5">
            <LogoShowcase reduce={reduce} />
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function LogoShowcase({ reduce }: { reduce: boolean }) {
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const tilt = { stiffness: 120, damping: 18 };
  const rotateX = useSpring(useTransform(my, [0, 1], [7, -7]), tilt);
  const rotateY = useSpring(useTransform(mx, [0, 1], [-7, 7]), tilt);
  const glareX = useTransform(mx, (v) => `${v * 100}%`);
  const glareY = useTransform(my, (v) => `${v * 100}%`);
  const glare = useMotionTemplate`radial-gradient(420px circle at ${glareX} ${glareY}, rgba(255,255,255,0.5), transparent 45%)`;

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
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 40, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1.1, ease: EASE, delay: 0.2 }}
      className="relative mx-auto w-full max-w-[17rem] sm:max-w-sm lg:max-w-md"
    >
      <div aria-hidden className="absolute -inset-10 -z-10 rounded-full bg-uf-sun/30 blur-3xl" />

      <motion.div
        animate={reduce ? undefined : { y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.div
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
          style={{ rotateX, rotateY, transformPerspective: 1200 }}
          className="group relative rounded-[2rem] bg-uf-paper p-2.5 shadow-[0_40px_90px_-40px_rgba(23,61,10,0.6)] ring-1 ring-uf-green/10"
        >
          <img
            src={logoImg}
            alt="The Urban Farmer by Redwood Biotech"
            width={900}
            height={900}
            fetchPriority="high"
            className="block aspect-square w-full rounded-[1.55rem] object-cover"
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[2rem] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{ background: glare }}
          />
        </motion.div>
      </motion.div>

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.9 }}
        className="relative z-10 mx-auto -mt-9 w-[86%] -rotate-2 rounded-2xl bg-gradient-to-br from-uf-green via-uf-forest to-uf-forest px-5 pb-3 pt-4 shadow-[0_24px_50px_-20px_rgba(23,61,10,0.85)] ring-1 ring-uf-sun/30"
      >
        <img
          src={textLogoImg}
          alt="Genetically Engineered Hi-Tech Premium Sagwan"
          width={900}
          height={439}
          className="block h-auto w-full"
        />
      </motion.div>
    </motion.div>
  );
}
