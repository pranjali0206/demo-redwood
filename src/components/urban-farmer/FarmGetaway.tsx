import { useState } from "react";
import { House, Sprout, Tent, TreePine, Trees, type LucideIcon } from "lucide-react";
import greeneryImg from "@/assets/agroforestry-field.webp";
import cottageImg from "@/assets/RealEstateandAgrobg.webp";
import campImg from "@/assets/sunrise.webp";
import picnicImg from "@/assets/canopy.webp";
import { Reveal } from "@/components/site/Reveal";
import { Eyebrow } from "./Eyebrow";

type Space = { Icon: LucideIcon; title: string; tag: string; body: string; img: string };

const SPACES: Space[] = [
  {
    Icon: TreePine,
    title: "Plantation Greenery",
    tag: "Walk your own forest",
    body: "Rows of Genetically Engineered Hi-Tech Sagwan turn your land into a living green canopy you can walk through.",
    img: greeneryImg,
  },
  {
    Icon: House,
    title: "Farm Cottage",
    tag: "Your weekend home",
    body: "A cozy cottage beside your plantation — a quiet retreat, far from city noise.",
    img: cottageImg,
  },
  {
    Icon: Tent,
    title: "Camping Nights",
    tag: "Bonfires & starlit skies",
    body: "Pitch a tent, light a bonfire and watch the stars from land that's truly yours.",
    img: campImg,
  },
  {
    Icon: Trees,
    title: "Picnic Spots",
    tag: "Family days out",
    body: "Shaded trails and open lawns for family picnics, just a drive away from the city.",
    img: picnicImg,
  },
];

const TICKER = [
  "Land Registered in Your Name",
  "Genetically Engineered Hi-Tech Sagwan",
  "12-Year Managed Cycle",
  "75% of Net Proceeds",
  "Farm Cottage",
  "Camping & Picnic Spots",
  "Tax-Free Agricultural Income",
  "Farm Visits by Appointment",
];

export function FarmGetaway() {
  const [active, setActive] = useState(0);

  return (
    <section className="relative overflow-hidden bg-uf-sage py-14 text-uf-forest sm:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[30rem] w-[60rem] -translate-x-1/2 rounded-full bg-uf-sun/20 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <Eyebrow centered>Your Land · Your Getaway</Eyebrow>
          <h2 className="mt-5 font-serif text-4xl font-bold leading-[1.06] sm:text-5xl lg:text-6xl">
            Feel the Greenery. <span className="italic text-uf-soil">Own the Getaway.</span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-stone-600">
            Being an Urban Farmer isn't an investment on paper. It's plantation greenery on your own
            land — with room for a farm cottage, camping nights and picnic spots your family will
            love.
          </p>
        </Reveal>

        <Reveal delay={0.15} className="mt-14 flex flex-col gap-3 lg:h-[34rem] lg:flex-row">
          {SPACES.map((space, i) => (
            <SpacePanel
              key={space.title}
              space={space}
              active={active === i}
              onActivate={() => setActive(i)}
            />
          ))}
        </Reveal>
      </div>

      <div className="relative mt-20 overflow-hidden border-y border-uf-green/15 py-6 [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
        <div className="flex w-max animate-[marquee_45s_linear_infinite] hover:[animation-play-state:paused] motion-reduce:animate-none">
          {[...TICKER, ...TICKER].map((item, i) => (
            <span
              key={i}
              aria-hidden={i >= TICKER.length}
              className="flex items-center gap-10 whitespace-nowrap pr-10 font-serif text-2xl text-uf-forest/80 sm:text-3xl"
            >
              {item}
              <Sprout size={22} className="text-uf-leaf" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function SpacePanel({
  space,
  active,
  onActivate,
}: {
  space: Space;
  active: boolean;
  onActivate: () => void;
}) {
  const { Icon } = space;
  return (
    <button
      type="button"
      aria-pressed={active}
      onMouseEnter={onActivate}
      onFocus={onActivate}
      onClick={onActivate}
      className={`group relative overflow-hidden rounded-3xl text-left text-white shadow-[0_24px_50px_-30px_rgba(23,61,10,0.7)] outline-none ring-uf-sun/70 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:ring-2 lg:h-auto lg:min-w-0 lg:basis-0 ${
        active ? "h-[24rem] lg:grow-[4]" : "h-28 lg:grow"
      }`}
    >
      <img
        src={space.img}
        alt={space.title}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-uf-forest via-uf-forest/40 to-transparent" />
      <div
        className={`absolute inset-0 bg-uf-forest/45 transition-opacity duration-500 ${active ? "opacity-0" : "opacity-100"}`}
      />

      <div
        className={`absolute inset-x-0 bottom-0 p-5 transition-opacity duration-500 sm:p-7 ${
          active ? "opacity-100 lg:delay-300" : "opacity-100 lg:opacity-0"
        }`}
      >
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-uf-sun backdrop-blur-md">
            <Icon size={20} />
          </span>
          <div className="min-w-0">
            <p className="truncate text-[10px] font-semibold uppercase tracking-[0.3em] text-uf-sun">
              {space.tag}
            </p>
            <h3 className="truncate font-serif text-xl font-bold sm:text-2xl">{space.title}</h3>
          </div>
        </div>
        <div
          className={`grid transition-all duration-700 ${active ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
        >
          <p className="max-w-md overflow-hidden text-sm leading-relaxed text-stone-200/90 sm:text-base">
            {space.body}
          </p>
        </div>
      </div>

      <div
        className={`absolute inset-x-0 bottom-7 hidden flex-col items-center gap-4 transition-opacity duration-500 lg:flex ${
          active ? "opacity-0" : "opacity-100"
        }`}
      >
        <span className="rotate-180 whitespace-nowrap font-serif text-xl font-bold [writing-mode:vertical-rl]">
          {space.title}
        </span>
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-uf-sun backdrop-blur-md">
          <Icon size={20} />
        </span>
      </div>
    </button>
  );
}
