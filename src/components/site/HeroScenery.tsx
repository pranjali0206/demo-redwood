/**
 * Artwork for the home hero: teak-leaf icons, the row of trees above the stats strip
 * and the sunrise scene in the Urban Farmer card. Animation classes live in styles/hero.css.
 */

import { useId, type CSSProperties } from "react";
import treeRow from "@/assets/hero-tree-row.webp";

// Seeded rather than Math.random, so the server and the browser draw identical paths.
function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const r1 = (n: number) => Math.round(n * 10) / 10;

/** A run of quadratic bumps from fromX to toX along y; a negative amp bulges upward. */
function lumpyEdge(
  fromX: number,
  toX: number,
  y: number,
  bump: number,
  amp: number,
  rand: () => number,
) {
  const dir = Math.sign(toX - fromX);
  let x = fromX;
  let d = "";
  while ((toX - x) * dir > 0) {
    const w = bump * (0.45 + rand() * 1.1);
    const crest = y + amp * (0.25 + rand() * 1.1);
    const endY = y + Math.abs(amp) * (rand() - 0.5) * 0.5;
    d += `Q${r1(x + (dir * w) / 2)} ${r1(crest)} ${r1(x + dir * w)} ${r1(endY)}`;
    x += dir * w;
  }
  return { d, end: x };
}

/** A row of tree crowns seen side-on: lumpy on top, a softer ragged underside. */
function canopyBand(o: {
  width: number;
  top: number;
  bottom: number;
  bump: number;
  amp: number;
  seed: number;
}) {
  const rand = seeded(o.seed);
  const start = -o.bump;
  const top = lumpyEdge(start, o.width + o.bump, o.top, o.bump, -o.amp, rand);
  const under = lumpyEdge(top.end, start, o.bottom, o.bump * 0.7, o.amp * 0.35, rand);
  return `M${start} ${o.top}${top.d}L${r1(top.end)} ${o.bottom}${under.d}Z`;
}

/** Straight, slightly irregularly spaced trunks. */
function trunkRow(o: { width: number; spacing: number; y1: number; y2: number; seed: number }) {
  const rand = seeded(o.seed);
  let d = "";
  for (let x = rand() * o.spacing; x < o.width; x += o.spacing * (0.75 + rand() * 0.5)) {
    d += `M${r1(x)} ${o.y1}V${o.y2}`;
  }
  return d;
}

/* Teak leaf --------------------------------------------------------------------------------- */

const LEAF =
  "M100 6C150 30 190 90 186 160C183 215 145 262 100 290C55 262 17 215 14 160C10 90 50 30 100 6Z";
const LEAF_VEINS =
  "M100 34V286M100 92C122 80 146 72 168 74M100 92C78 80 54 72 32 74M100 140C126 126 156 116 182 122M100 140C74 126 44 116 18 122M100 188C124 176 152 166 180 172M100 188C76 176 48 166 20 172M100 232C118 222 138 214 160 216M100 232C82 222 62 214 40 216";

/** Solid leaf icon in the current text colour. */
export function TeakLeaf({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 200 320" fill="none" className={className}>
      <path d={LEAF} fill="currentColor" />
      <path d="M100 288V314" stroke="currentColor" strokeWidth="14" strokeLinecap="round" />
      <path
        d={LEAF_VEINS}
        stroke="#fff"
        strokeOpacity="0.45"
        strokeWidth="9"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* Plantation tree row ------------------------------------------------------------------------- */

/**
 * A row of real trees along the bottom of the hero. The tile repeats sideways at its natural
 * proportions, so the trees keep their size at any viewport width; styles/hero.css adds the haze.
 */
export function PlantationTreeRow({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={className}
      style={{ "--tree-row": `url(${treeRow})` } as CSSProperties}
    />
  );
}

/* Card sunrise scene -------------------------------------------------------------------------- */

const SCENE_W = 470;
const SCENE_H = 250;
const SUN = { x: 330, y: 104 };
const scene = {
  backTrunks: trunkRow({ width: SCENE_W, spacing: 6, y1: 152, y2: 190, seed: 8 }),
  backCanopy: canopyBand({ width: SCENE_W, top: 140, bottom: 160, bump: 10, amp: 10, seed: 3 }),
  frontTrunks: trunkRow({ width: SCENE_W, spacing: 13, y1: 198, y2: 240, seed: 13 }),
  frontCanopy: canopyBand({ width: SCENE_W, top: 186, bottom: 206, bump: 18, amp: 14, seed: 41 }),
};

/** Teak plantation at sunrise. The sun rises once; everything else is a still layer. */
export function SunriseScene({ className }: { className?: string }) {
  // Per-instance gradient ids: the card can be in the page twice (hero, and after the triangle on
  // phones), and a url(#id) that resolves into a display:none copy paints nothing.
  const uid = useId().replace(/[^\w-]/g, "");
  const id = (name: string) => `rwb-${name}-${uid}`;
  const ref = (name: string) => `url(#${id(name)})`;
  return (
    <svg
      role="img"
      aria-label="A teak plantation at sunrise: rows of tall, straight trees under a warm morning sky"
      viewBox={`0 0 ${SCENE_W} ${SCENE_H}`}
      preserveAspectRatio="xMidYMid slice"
      className={className}
    >
      <defs>
        <linearGradient id={id("sky")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#EFCFAB" />
          <stop offset="1" stopColor="#FAE8CF" />
        </linearGradient>
        <radialGradient id={id("halo")}>
          <stop offset="0" stopColor="#FFF1D2" />
          <stop offset="1" stopColor="#FFF1D2" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={id("core")}>
          <stop offset="0" stopColor="#FFF8E8" />
          <stop offset="0.65" stopColor="#FFD48F" />
          <stop offset="1" stopColor="#FFD48F" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={id("mist")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFF6E6" stopOpacity="0" />
          <stop offset="0.55" stopColor="#FFF6E6" stopOpacity="0.5" />
          <stop offset="1" stopColor="#FFF6E6" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={id("haze")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={id("under-back")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#E9D9B4" />
          <stop offset="1" stopColor="#A9B395" />
        </linearGradient>
        <linearGradient id={id("under-front")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#D8C79A" />
          <stop offset="1" stopColor="#5D7A62" />
        </linearGradient>
        <radialGradient id={id("warm")} cx={SUN.x} cy={SUN.y} r="300" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FFC56B" />
          <stop offset="1" stopColor="#FFC56B" stopOpacity="0" />
        </radialGradient>
      </defs>

      <g className="rwb-scene">
        <rect width={SCENE_W} height={SCENE_H} fill={ref("sky")} />
        <g className="rwb-scene__sun">
          <circle className="rwb-scene__halo" cx={SUN.x} cy={SUN.y} r="120" fill={ref("halo")} />
          <circle cx={SUN.x} cy={SUN.y} r="19" fill={ref("core")} />
        </g>
        <path d="M0 132C70 118 150 110 232 122S392 140 470 116V250H0Z" fill="#D9CDB0" />
        <rect y="96" width={SCENE_W} height="70" fill={ref("haze")} />

        <rect y="150" width={SCENE_W} height="42" fill={ref("under-back")} />
        <path d={scene.backTrunks} stroke="#7E9180" strokeOpacity="0.8" strokeWidth="0.9" />
        <path d={scene.backCanopy} fill="#8FA58E" />
        {/* Morning mist settling between the rows */}
        <rect y="164" width={SCENE_W} height="30" fill={ref("mist")} />

        <path d="M0 184C110 178 260 188 470 180V250H0Z" fill="#6F8A72" />

        <rect y="196" width={SCENE_W} height="46" fill={ref("under-front")} />
        <path d={scene.frontTrunks} stroke="#1D4335" strokeWidth="2.2" />
        <path d={scene.frontCanopy} fill="#22513F" />

        <path d="M0 235C120 230 300 239 470 232V250H0Z" fill="#163A2D" />

        <rect className="rwb-scene__warm" width={SCENE_W} height={SCENE_H} fill={ref("warm")} />
        <rect className="rwb-scene__dusk" width={SCENE_W} height={SCENE_H} fill="#2B3447" />
      </g>
    </svg>
  );
}
