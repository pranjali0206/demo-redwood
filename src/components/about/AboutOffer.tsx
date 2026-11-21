import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Calculator,
  ChevronRight,
  Crown,
  LandPlot,
  MapPin,
  Quote,
  ShieldCheck,
  Sprout,
  type LucideIcon,
} from "lucide-react";
import plantationVideo from "@/assets/about-plantation.mp4";
import plantationPoster from "@/assets/about-plantation-poster.webp";

/*
 * About page, first section after the hero: what Redwood Biotech offers, in business terms.
 *
 * The offer in one headline, real footage of a young Sagwan plantation carrying the promise as a
 * quote, the three things a buyer gets, why it makes sense now, where the land is, and one call
 * to action: join the Redwood Movement and become an Urban Farmer.
 */

const OFFER: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: LandPlot,
    title: "Your own farmland",
    text: "Own agricultural land at unbelievably reasonable rates.",
  },
  {
    icon: Sprout,
    title: "Premium Sagwan, planted",
    text: "Premium Sagwan trees planted across your farmland.",
  },
  {
    icon: ShieldCheck,
    title: "12 years of care",
    text: "We take care of the plantation and its maintenance throughout the 12-year project tenure, as per the agreed terms.",
  },
];

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as const },
});

/** Plays the plantation loop (muted) only while it is on screen; with reduced motion it stays still. */
function useAmbientVideo(reduce: boolean | null) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    if (reduce) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.2 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [reduce]);
  return ref;
}

export function AboutOffer() {
  const reduce = useReducedMotion();
  const videoRef = useAmbientVideo(reduce);

  return (
    <section className="relative overflow-hidden px-5 py-20 sm:px-6 md:py-20" aria-labelledby="about-offer-title">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-40 top-10 h-[460px] w-[620px] rounded-full bg-[oklch(0.55_0.09_150/0.07)] blur-[120px]" />
      </div>

      <div className="mx-auto max-w-6xl">
        {/* The offer ------------------------------------------------------------------------ */}
        <div className="grid items-center gap-12 lg:grid-cols-[1.12fr_1fr] lg:gap-16">
          <div>
            <motion.p {...rise()} className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">
              About Redwood Biotech
            </motion.p>
            <motion.h2
              {...rise(0.05)}
              id="about-offer-title"
              className="mt-4 font-display text-[clamp(34px,4.6vw,56px)] leading-[1.06] tracking-[-0.01em] text-foreground"
            >
              Own farmland. Grow premium Sagwan.{" "}
              <span className="italic text-[#175f45]">We manage the rest.</span>
            </motion.h2>
            <motion.p {...rise(0.12)} className="mt-6 max-w-[56ch] text-lg leading-relaxed text-muted-foreground">
              Own agricultural land at unbelievably reasonable rates, get premium Sagwan trees planted on
              your farmland, and let Redwood Biotech take care of the plantation and its maintenance
              throughout the <b className="whitespace-nowrap font-semibold text-foreground">12-year</b>{" "}
              <b className="font-semibold text-foreground">project tenure</b>, as per the agreed terms.
            </motion.p>
            <motion.div {...rise(0.2)} className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/urban-farmer"
                className="group inline-flex h-[52px] items-center gap-3 whitespace-nowrap rounded-xl bg-[#103e30] px-6 text-[15px] font-semibold text-white transition-colors duration-300 hover:bg-[#175f45]"
              >
                Become an Urban Farmer
                <ArrowRight size={17} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                to="/timber-calculator"
                className="group inline-flex h-[52px] items-center gap-2.5 whitespace-nowrap rounded-xl border border-[#103e30]/20 bg-card px-5 text-[15px] font-semibold text-[#103e30] transition-colors duration-300 hover:border-[#103e30]"
              >
                <Calculator size={17} className="text-[#a78348]" />
                Calculate your timber
              </Link>
            </motion.div>
          </div>

          {/* Real footage of a young Sagwan plantation, carrying the promise as a quote */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-[520px]"
          >
            <figure className="relative m-0 aspect-[5/6] overflow-hidden rounded-[28px] bg-[#e7e2d4] shadow-[var(--shadow-elegant)] sm:aspect-square lg:aspect-[4/5]">
              <video
                ref={videoRef}
                className="absolute inset-0 h-full w-full object-cover"
                src={plantationVideo}
                poster={plantationPoster}
                muted
                loop
                playsInline
                preload="metadata"
                aria-hidden="true"
                tabIndex={-1}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b2e22]/90 via-[#0b2e22]/25 to-transparent" />
              <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/85 px-3.5 py-1.5 text-[12px] font-semibold text-[#103e30] shadow-sm backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-[#175f45]" />
                12-year managed tenure
              </span>
              <figcaption className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                <Quote className="h-7 w-7 text-[#e6c27a]" aria-hidden="true" />
                <blockquote className="m-0 mt-2 font-display text-[clamp(21px,2.3vw,28px)] leading-[1.25] text-white">
                  Purchase your farmland with Redwood Biotech and get a{" "}
                  <span className="italic text-[#e6c27a]">premium Sagwan plantation</span> along with it.
                </blockquote>
                <p className="mt-3 text-[11.5px] font-semibold uppercase tracking-[0.2em] text-white/70">
                  Redwood Biotech
                </p>
              </figcaption>
            </figure>
          </motion.div>
        </div>

        {/* What you get ---------------------------------------------------------------------- */}
        <ol className="mt-16 grid gap-4 md:mt-20 md:grid-cols-3 md:gap-5">
          {OFFER.map((o, i) => (
            <motion.li
              key={o.title}
              {...rise(i * 0.1)}
              className="group relative rounded-3xl border border-border bg-card p-6 transition-shadow duration-300 hover:shadow-[var(--shadow-elegant)]"
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#175f45]/10 text-[#175f45] transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-105">
                  <o.icon className="h-6 w-6" />
                </span>
                <span className="font-display text-4xl leading-none text-[#175f45]/15">0{i + 1}</span>
              </div>
              <h3 className="mt-5 font-display text-2xl text-foreground">{o.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{o.text}</p>
              {i < OFFER.length - 1 && (
                <span
                  aria-hidden
                  className="absolute -right-[14px] top-1/2 z-10 hidden h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background text-[#175f45] md:flex"
                >
                  <ChevronRight className="h-4 w-4" />
                </span>
              )}
            </motion.li>
          ))}
        </ol>

        {/* Why now, and where ---------------------------------------------------------------- */}
        <div className="mt-5 grid gap-4 md:grid-cols-2 md:gap-5">
          <motion.div {...rise()} className="flex gap-5 rounded-3xl border border-border bg-card p-6 md:p-7">
            <span className="inline-flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[#a78348]/15 text-[#a78348]">
              <Crown className="h-6 w-6" />
            </span>
            <div>
              <h3 className="font-display text-2xl text-foreground">
                When it comes to premium timber, <span className="italic text-[#175f45]">Sagwan is the King.</span>
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
                With timber demand expected to grow in the future, agroforestry presents an
                opportunity to make agricultural land productive.
              </p>
            </div>
          </motion.div>
          <motion.div {...rise(0.08)} className="flex gap-5 rounded-3xl border border-border bg-card p-6 md:p-7">
            <span className="inline-flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <MapPin className="h-6 w-6" />
            </span>
            <div>
              <h3 className="font-display text-2xl text-foreground">Affordable farmland near Indore</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
                This could be your opportunity to own land and be part of a new approach to
                scientific agroforestry.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Join the movement ------------------------------------------------------------------ */}
        <motion.div
          {...rise()}
          className="relative mt-5 overflow-hidden rounded-3xl bg-[linear-gradient(135deg,#175f45_0%,#103e30_55%,#0b2e22_100%)] px-6 py-8 text-white sm:px-10 md:py-10"
        >
          <span
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(217,184,103,0.35),transparent_65%)]"
          />
          <div className="relative flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-white/10 text-[#d9b867]">
                <Sprout className="h-6 w-6" />
              </span>
              <p className="font-display text-[clamp(24px,3vw,34px)] leading-tight">
                Join the Redwood Movement.{" "}
                <span className="italic text-[#d9b867]">Become an Urban Farmer.</span>
              </p>
            </div>
            <Link
              to="/urban-farmer"
              className="group inline-flex h-[52px] flex-shrink-0 items-center gap-3 whitespace-nowrap rounded-xl bg-[#d9b867] px-6 text-[15px] font-semibold text-[#103e30] transition-colors duration-300 hover:bg-white"
            >
              Get started
              <ArrowRight size={17} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
