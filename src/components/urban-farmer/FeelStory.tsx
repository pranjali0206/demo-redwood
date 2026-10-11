import { useRef } from "react";
import { motion, useScroll, type MotionValue } from "framer-motion";
import { StoryScene } from "./StoryScene";
import { useScrollMap } from "./useScrollMap";

const CHAPTERS = [
  {
    kicker: "Chapter 01",
    title: "You live in the city.",
    body: "Deadlines, traffic and screens. Life moves fast — and green feels far away.",
  },
  {
    kicker: "Chapter 02",
    title: "But your roots can still grow.",
    body: "A piece of land registered in your name, turning green with Genetically Engineered Hi-Tech Sagwan.",
  },
  {
    kicker: "Chapter 03",
    title: "A place your family calls its own.",
    body: "Weekend walks through your plantation, a quiet cottage, a bonfire under open skies.",
  },
  {
    kicker: "The Urban Farmer",
    title: "You don't leave the city. You grow beyond it.",
    body: "That's what it means to be an Urban Farmer with Redwood Biotech.",
  },
];

export function FeelStory() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const railFill = useScrollMap(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="feel" ref={ref} className="relative h-[380vh] bg-uf-cream text-uf-forest">
      <div className="sticky top-0 flex h-svh items-start overflow-hidden pt-28 sm:items-center sm:pt-0">
        <StoryScene progress={scrollYProgress} className="absolute inset-0" />
        {/* Soft paper halo keeps the copy crisp over the moving scene. */}
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_90%_45%_at_50%_30%,rgba(253,250,242,0.9),transparent_75%)] sm:bg-[radial-gradient(ellipse_55%_50%_at_22%_48%,rgba(253,250,242,0.9),transparent_75%)]"
        />

        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative h-[26rem] max-w-2xl sm:h-[24rem]">
            {CHAPTERS.map((chapter, i) => (
              <Chapter
                key={chapter.kicker}
                chapter={chapter}
                index={i}
                total={CHAPTERS.length}
                progress={scrollYProgress}
              />
            ))}
          </div>
        </div>

        <div className="absolute right-6 top-1/2 hidden -translate-y-1/2 items-center gap-4 sm:flex lg:right-10">
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-uf-green/70 [writing-mode:vertical-rl]">
            Your Story
          </span>
          <div className="relative h-56 w-px bg-uf-green/20">
            <motion.div
              className="absolute inset-x-0 top-0 bg-gradient-to-b from-uf-sun to-uf-soil shadow-[0_0_12px_rgba(246,185,59,0.9)]"
              style={{ height: railFill }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Chapter({
  chapter,
  index,
  total,
  progress,
}: {
  chapter: (typeof CHAPTERS)[number];
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const seg = 1 / total;
  const start = index * seg;
  const end = start + seg;
  const fadeIn = start + seg * 0.3;
  const fadeOut = end - seg * 0.25;
  const isFirst = index === 0;
  const isLast = index === total - 1;

  const input = isFirst
    ? [0, fadeOut, end]
    : isLast
      ? [start, fadeIn]
      : [start, fadeIn, fadeOut, end];
  const opacity = useScrollMap(
    progress,
    input,
    isFirst ? [1, 1, 0] : isLast ? [0, 1] : [0, 1, 1, 0],
  );
  const y = useScrollMap(
    progress,
    input,
    isFirst ? [0, 0, -60] : isLast ? [60, 0] : [60, 0, 0, -60],
  );

  return (
    <motion.div style={{ opacity, y }} className="absolute inset-0 flex flex-col justify-center">
      <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-uf-soil">
        <span className="h-px w-10 bg-gradient-to-r from-uf-soil to-transparent" />
        {chapter.kicker}
      </p>
      <h2 className="mt-5 font-serif text-4xl font-bold leading-[1.06] text-uf-forest sm:text-6xl">
        {chapter.title}
      </h2>
      <p className="mt-6 max-w-xl text-lg leading-relaxed text-stone-700 sm:text-xl">
        {chapter.body}
      </p>
    </motion.div>
  );
}
