import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import {
  CalendarDays,
  Check,
  FlaskConical,
  HandCoins,
  Landmark,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import plotImg from "@/assets/nidhivan.webp";
import nurseryImg from "@/assets/nursery.webp";
import plantationImg from "@/assets/gallery-photo-4.webp";
import harvestImg from "@/assets/About-commercebg.webp";
import { Reveal } from "@/components/site/Reveal";
import { EASE } from "./constants";
import { Eyebrow } from "./Eyebrow";
import { useScrollMap } from "./useScrollMap";

type Step = {
  n: string;
  Icon: LucideIcon;
  title: string;
  body: string;
  img: string;
  imgClass?: string;
};

const STEPS: Step[] = [
  {
    n: "01",
    Icon: Landmark,
    title: "Own the Land",
    body: "A handpicked plot in the growth corridors around the city — legally registered in your name.",
    img: plotImg,
    imgClass: "object-contain bg-white p-3",
  },
  {
    n: "02",
    Icon: FlaskConical,
    title: "We Plant Genetically Engineered Hi-Tech Sagwan",
    body: "Tissue-culture, Genetically Engineered Hi-Tech Sagwan saplings, planted and nurtured by our experts.",
    img: nurseryImg,
  },
  {
    n: "03",
    Icon: ShieldCheck,
    title: "We Manage Everything",
    body: "Irrigation, nutrition, monitoring and maintenance through the 12-year cycle. No farming experience needed.",
    img: plantationImg,
  },
  {
    n: "04",
    Icon: HandCoins,
    title: "You Reap the Rewards",
    body: "At maturity we harvest and sell the timber — 75% of the net proceeds are shared with you.",
    img: harvestImg,
    imgClass: "object-[88%_85%]",
  },
];

const HIGHLIGHTS = [
  "Land registered in your name",
  "12-year managed cycle",
  "75% of net proceeds to you",
];

export function ModelSteps() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 85%", "end 55%"],
  });
  const lineScale = useScrollMap(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      id="model"
      className="relative scroll-mt-16 overflow-hidden bg-uf-paper py-14 text-stone-900 sm:py-20"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-20 h-96 w-96 rounded-full bg-uf-leaf/15 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 bottom-10 h-[28rem] w-[28rem] rounded-full bg-uf-sun/25 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <Eyebrow>Our Model — In Short</Eyebrow>
            <h2 className="mt-5 font-serif text-4xl font-bold leading-[1.06] text-uf-forest sm:text-5xl lg:text-6xl">
              Four simple steps from <span className="italic text-uf-soil">city life</span> to your
              own farm.
            </h2>
          </Reveal>
          <Reveal delay={0.15} className="lg:col-span-5">
            <p className="text-lg leading-relaxed text-stone-600">
              You own the land. We handle the science, the soil and the sale. You enjoy the greenery
              — and the growth.
            </p>
          </Reveal>
        </div>

        <div ref={timelineRef} className="relative mt-16">
          <div aria-hidden className="absolute inset-x-7 top-7 hidden h-px bg-stone-300 lg:block" />
          <motion.div
            aria-hidden
            className="absolute inset-x-7 top-7 hidden h-0.5 origin-left bg-gradient-to-r from-uf-sun via-uf-soil to-uf-green lg:block"
            style={{ scaleX: lineScale }}
          />

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {STEPS.map((step, i) => (
              <StepCard key={step.n} step={step} index={i} />
            ))}
          </div>
        </div>

        <Reveal
          delay={0.1}
          className="mt-16 flex flex-col items-start justify-between gap-6 rounded-3xl border border-uf-green/15 bg-uf-sage px-6 py-7 text-uf-forest sm:px-10 lg:flex-row lg:items-center"
        >
          <ul className="flex flex-wrap gap-x-8 gap-y-3">
            {HIGHLIGHTS.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm font-medium sm:text-base">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-uf-green text-uf-cream">
                  <Check size={14} />
                </span>
                {item}
              </li>
            ))}
          </ul>
          <span className="inline-flex items-center gap-2 text-sm text-stone-600">
            <CalendarDays size={16} className="text-uf-soil" /> Visit your farm by appointment
          </span>
        </Reveal>
      </div>
    </section>
  );
}

function StepCard({ step, index }: { step: Step; index: number }) {
  const { Icon } = step;
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: EASE, delay: index * 0.12 }}
      className="group relative"
    >
      <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-uf-sun/60 bg-uf-paper font-serif text-lg font-bold text-uf-soil shadow-sm transition-colors duration-300 group-hover:border-uf-green group-hover:bg-uf-green group-hover:text-uf-cream">
        {step.n}
      </div>
      <div className="mt-6 overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-[0_20px_50px_-30px_rgba(23,61,10,0.45)] transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_30px_60px_-30px_rgba(23,61,10,0.6)]">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={step.img}
            alt={step.title}
            loading="lazy"
            className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 ${step.imgClass ?? ""}`}
          />
          <span className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl bg-uf-green/90 text-uf-cream backdrop-blur">
            <Icon size={18} />
          </span>
        </div>
        <div className="p-6">
          <h3 className="font-serif text-xl font-bold text-uf-forest">{step.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-stone-600">{step.body}</p>
        </div>
      </div>
    </motion.article>
  );
}
