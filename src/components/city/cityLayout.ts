/**
 * Site-plan layouts for "The City Is Coming to You." — pure data, generated once from a seeded
 * random function so the map is identical on every load.
 *
 * Everything is generated in growth coordinates (u, v): u runs from the old city toward Redwood
 * land, v runs across. Desktop maps (u, v) straight to (x, y): city on the left, land on the
 * right. Phones turn the map upright, (x, y) = (v, U − u): land at the top, city at the bottom,
 * growing up the screen.
 *
 * Zones along u: old core (there in 2026) → growth zone (fills by 2038, thinning out) →
 * a green buffer with a service road and a row of verge trees → Redwood land. The city never
 * enters the buffer. Each growing item carries a threshold `t` on the progress clock
 * (0 = 2026, 1 = 2038); t < 0 means it is already there in 2026.
 */

export type Pt = { x: number; y: number };
export type LandmarkKind = "school" | "hospital" | "colony";

export type Road = {
  a: Pt;
  b: Pt;
  w: number;
  /** Progress at which the road's drawing reaches `a` and `b` (−1: drawn in 2026). */
  t0: number;
  t1: number;
};
export type Building = {
  x: number;
  y: number;
  w: number;
  h: number;
  rot: number;
  shape: "rect" | "L";
  core: boolean;
  /** A plot marked out but not yet built: outline only. */
  ghost: boolean;
  t: number;
};
export type Lamp = { x: number; y: number; t: number };
export type HwyLamp = { x: number; y: number; f: number };
export type Tree = { x: number; y: number; rot: number; s: number; v: number };
export type Landmark = {
  kind: LandmarkKind;
  label: string;
  x: number;
  y: number;
  w: number;
  h: number;
  /** Timeline second at which its pin pops (the footprint appears with it). */
  at: number;
  t: number;
};

export type Layout = {
  mobile: boolean;
  /** The framed area, in layout units; the panel shows it whole and may show more around it. */
  fw: number;
  fh: number;
  ext: { x0: number; y0: number; x1: number; y1: number };
  unit: number;
  land: Pt[];
  buffer: Pt[];
  service: Road;
  verge: Pt[];
  vergeR: number;
  fields: Pt[][];
  highway: { a: Pt; core: Pt; gate: Pt; w: number };
  hwyLamps: HwyLamp[];
  roads: Road[];
  buildings: Building[];
  lamps: Lamp[];
  trees: Tree[];
  treeR: number;
  rows: number[][];
  landmarks: Landmark[];
  chip: Pt;
  pinMode: "above" | "centre";
};

/* Helpers ------------------------------------------------------------------------------------ */

/** Seeded PRNG (mulberry32). */
export function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const clamp = (v: number, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v));

/** The progress clock's ease (sine.inOut) and its inverse, shared with the timeline. */
export const clockEase = (x: number) => (1 - Math.cos(Math.PI * clamp(x))) / 2;
export const clockInverse = (p: number) => Math.acos(1 - 2 * clamp(p)) / Math.PI;
/** The clock runs from 0.6 s to 4.4 s of the master timeline. */
export const CLOCK = { start: 0.6, dur: 3.8 };
export const progressAt = (sec: number) => clockEase((sec - CLOCK.start) / CLOCK.dur);

type UV = { u: number; v: number };
type Seg = {
  a: UV;
  b: UV;
  w: number;
  t0: number;
  t1: number;
  kind: "core" | "ave" | "sec" | "loc";
};
type Box = { x0: number; y0: number; x1: number; y1: number };

const sub = (a: UV, b: UV) => ({ u: a.u - b.u, v: a.v - b.v });
const len = (a: UV) => Math.hypot(a.u, a.v);

function distSeg(p: UV, a: UV, b: UV) {
  const ab = sub(b, a);
  const l2 = ab.u * ab.u + ab.v * ab.v || 1;
  const t = clamp(((p.u - a.u) * ab.u + (p.v - a.v) * ab.v) / l2);
  return Math.hypot(p.u - (a.u + ab.u * t), p.v - (a.v + ab.v * t));
}

/** Corners of a rectangle centred on c, `w` along direction angle `th`, `h` across. */
function corners(c: UV, w: number, h: number, th: number): UV[] {
  const cu = Math.cos(th);
  const cv = Math.sin(th);
  const hw = w / 2;
  const hh = h / 2;
  return [
    [-hw, -hh],
    [hw, -hh],
    [hw, hh],
    [-hw, hh],
  ].map(([a, b]) => ({ u: c.u + a * cu - b * cv, v: c.v + a * cv + b * cu }));
}

/** Separating-axis test for two convex quads. */
function quadsOverlap(p: UV[], q: UV[]) {
  for (const poly of [p, q]) {
    for (let i = 0; i < 4; i++) {
      const a = poly[i];
      const b = poly[(i + 1) % 4];
      const ax = { u: -(b.v - a.v), v: b.u - a.u };
      let pMin = Infinity;
      let pMax = -Infinity;
      let qMin = Infinity;
      let qMax = -Infinity;
      for (const c of p) {
        const d = c.u * ax.u + c.v * ax.v;
        pMin = Math.min(pMin, d);
        pMax = Math.max(pMax, d);
      }
      for (const c of q) {
        const d = c.u * ax.u + c.v * ax.v;
        qMin = Math.min(qMin, d);
        qMax = Math.max(qMax, d);
      }
      if (pMax < qMin || qMax < pMin) return false;
    }
  }
  return true;
}

/* Configs ------------------------------------------------------------------------------------ */

type Cfg = {
  mobile: boolean;
  seed: number;
  U: number;
  V: number;
  coreEnd: number;
  cityEnd: number;
  landStart: number;
  vH: number;
  ext: { u0: number; v0: number; v1: number; u1: number };
  unit: number;
  w: { hwy: number; ave: number; sec: number; loc: number; core: number; svc: number };
  land: UV[];
  avenues: [UV, UV][];
  branches: { at: number; up: UV; down: UV }[];
  coreRow: number;
  coreCol: number;
  locStep: number;
  locLen: [number, number];
  lampStep: number;
  landmarks: {
    kind: LandmarkKind;
    label: string;
    u: number;
    v: number;
    w: number;
    h: number;
    at: number;
  }[];
  /** Screen-space room kept clear for a pin and its label. */
  pin: { w: number; h: number };
  pinMode: "above" | "centre";
  size: { core: [number, number, number, number]; sub: [number, number, number, number] };
  gap: { core: [number, number]; sub: [number, number] };
  setback: { core: number; sub: number };
  treeR: number;
  treeGap: number;
  fields: { cols: number[]; rows: number[][] };
};

/**
 * Desktop frame: 1200 × 560. The design grid gives the map panel an aspect of about 2.0–2.3 on
 * real screens (1366 × 768 to 1920 × 1080), so the zones of the 1000 × 560 brief are scaled
 * along u to fill it: old core 0–264, growth 264–672, buffer 672–720, land 720–1180 (≈ 38%).
 */
const DESK: Cfg = {
  mobile: false,
  seed: 20262038,
  U: 1200,
  V: 560,
  coreEnd: 264,
  cityEnd: 672,
  landStart: 720,
  vH: 280,
  ext: { u0: -420, u1: 1560, v0: -120, v1: 680 },
  unit: 1,
  w: { hwy: 15, ave: 9, sec: 8, loc: 5.5, core: 6.5, svc: 6 },
  land: [
    { u: 727, v: 24 },
    { u: 1174, v: 20 },
    { u: 1178, v: 538 },
    { u: 720, v: 534 },
  ],
  avenues: [
    [
      { u: 250, v: 150 },
      { u: 662, v: 136 },
    ],
    [
      { u: 250, v: 410 },
      { u: 662, v: 426 },
    ],
  ],
  branches: [
    { at: 310, up: { u: 326, v: 10 }, down: { u: 300, v: 550 } },
    { at: 415, up: { u: 401, v: 10 }, down: { u: 427, v: 550 } },
    { at: 516, up: { u: 499, v: 10 }, down: { u: 533, v: 550 } },
    { at: 614, up: { u: 626, v: 10 }, down: { u: 605, v: 550 } },
  ],
  coreRow: 52,
  coreCol: 58,
  locStep: 56,
  locLen: [34, 56],
  lampStep: 36,
  landmarks: [
    { kind: "school", label: "School", u: 360, v: 240, w: 40, h: 30, at: 1.6 },
    { kind: "colony", label: "Colony", u: 466, v: 372, w: 40, h: 28, at: 2.2 },
    { kind: "hospital", label: "Hospital", u: 565, v: 98, w: 38, h: 30, at: 2.8 },
    { kind: "colony", label: "Colony", u: 645, v: 246, w: 34, h: 28, at: 3.5 },
  ],
  pin: { w: 86, h: 62 },
  pinMode: "above",
  size: { core: [14, 24, 11, 19], sub: [12, 19, 10, 15] },
  gap: { core: [2, 4], sub: [4, 9] },
  setback: { core: 3, sub: 5 },
  treeR: 17,
  treeGap: 35,
  fields: {
    cols: [270, 398, 535, 668],
    rows: [
      [12, 214, 548],
      [12, 150, 330, 548],
      [12, 262, 548],
    ],
  },
};

const MOB: Cfg = {
  mobile: true,
  seed: 38202026,
  U: 400,
  V: 360,
  coreEnd: 96,
  cityEnd: 222,
  landStart: 240,
  vH: 180,
  ext: { u0: -280, u1: 430, v0: -60, v1: 420 },
  unit: 0.62,
  w: { hwy: 9, ave: 6, sec: 5.5, loc: 4, core: 4.6, svc: 4 },
  land: [
    { u: 244, v: 16 },
    { u: 386, v: 12 },
    { u: 388, v: 346 },
    { u: 240, v: 350 },
  ],
  avenues: [
    [
      { u: 92, v: 74 },
      { u: 218, v: 68 },
    ],
    [
      { u: 92, v: 286 },
      { u: 218, v: 294 },
    ],
  ],
  branches: [
    { at: 132, up: { u: 138, v: 8 }, down: { u: 128, v: 352 } },
    { at: 180, up: { u: 174, v: 8 }, down: { u: 186, v: 352 } },
  ],
  coreRow: 38,
  coreCol: 42,
  locStep: 40,
  locLen: [20, 32],
  lampStep: 26,
  landmarks: [
    { kind: "school", label: "School", u: 113, v: 128, w: 25, h: 19, at: 1.6 },
    { kind: "colony", label: "Colony", u: 156, v: 240, w: 25, h: 18, at: 2.2 },
    { kind: "hospital", label: "Hospital", u: 202, v: 120, w: 24, h: 19, at: 2.8 },
    { kind: "colony", label: "Colony", u: 204, v: 322, w: 22, h: 18, at: 3.5 },
  ],
  pin: { w: 64, h: 50 },
  pinMode: "centre",
  size: { core: [9.5, 15, 7.5, 12], sub: [7.5, 12, 6.5, 9.5] },
  gap: { core: [1.5, 2.5], sub: [3.5, 7] },
  setback: { core: 2, sub: 3 },
  treeR: 10.5,
  treeGap: 23.5,
  fields: {
    cols: [98, 160, 222],
    rows: [
      [8, 120, 352],
      [8, 230, 352],
    ],
  },
};

/* Generator ---------------------------------------------------------------------------------- */

function generate(c: Cfg): Layout {
  const R = rng(c.seed);
  const rand = (a: number, b: number) => a + R() * (b - a);
  const toXY = (p: UV): Pt => (c.mobile ? { x: p.v, y: c.U - p.u } : { x: p.u, y: p.v });
  const rotXY = (th: number) => {
    const du = Math.cos(th);
    const dv = Math.sin(th);
    return c.mobile ? Math.atan2(-du, dv) : th;
  };
  const fw = c.mobile ? c.V : c.U;
  const fh = c.mobile ? c.U : c.V;

  const dMax = c.cityEnd - c.coreEnd + 0.35 * (c.V / 2);
  const tAt = (p: UV) => {
    const d = Math.max(0, p.u - c.coreEnd) + 0.35 * Math.abs(p.v - c.vH);
    return 0.02 + 0.9 * clamp(d / dMax);
  };
  const roadT = (p: UV) => (p.u < c.coreEnd ? -1 : Math.max(0, tAt(p) - 0.06));

  // Reserved landmark plots, in screen space: the footprint, and room for its pin and label.
  const plots: Box[] = [];
  for (const l of c.landmarks) {
    const ctr = toXY({ u: l.u, v: l.v });
    plots.push({
      x0: ctr.x - l.w / 2 - 5,
      y0: ctr.y - l.h / 2 - 5,
      x1: ctr.x + l.w / 2 + 5,
      y1: ctr.y + l.h / 2 + 5,
    });
    if (c.pinMode === "above") {
      const top = ctr.y - l.h / 2 - 2;
      plots.push({ x0: ctr.x - c.pin.w / 2, y0: top - c.pin.h, x1: ctr.x + c.pin.w / 2, y1: top });
    } else {
      plots.push({
        x0: ctr.x - c.pin.w / 2,
        y0: ctr.y - 16,
        x1: ctr.x + c.pin.w / 2,
        y1: ctr.y + c.pin.h - 16,
      });
    }
  }
  const inPlot = (p: UV, r: number) => {
    const s = toXY(p);
    return plots.some((b) => s.x + r > b.x0 && s.x - r < b.x1 && s.y + r > b.y0 && s.y - r < b.y1);
  };

  /* Roads */
  const segs: Seg[] = [];
  const addSeg = (a: UV, b: UV, w: number, kind: Seg["kind"]) => {
    let A = a;
    let B = b;
    let t0 = kind === "core" ? -1 : roadT(a);
    let t1 = kind === "core" ? -1 : roadT(b);
    if (t1 < t0) {
      [A, B] = [B, A];
      [t0, t1] = [t1, t0];
    }
    segs.push({ a: A, b: B, w, t0, t1, kind });
  };
  const hwyA: UV = { u: c.ext.u0, v: c.vH };
  const gateU = c.landStart + 3;
  const hwyGate: UV = { u: gateU - 1, v: c.vH };

  // Old core: an irregular, organically grown street pattern — uneven spacing, rows that drift,
  // cross streets that kink and stop, and two old diagonal roads cutting across.
  const coreRows: number[] = [];
  for (
    let v = c.vH - c.coreRow * rand(0.8, 1.1);
    v > c.ext.v0 + 6;
    v -= c.coreRow * rand(0.75, 1.3)
  )
    coreRows.push(v);
  for (
    let v = c.vH + c.coreRow * rand(0.8, 1.1);
    v < c.ext.v1 - 6;
    v += c.coreRow * rand(0.75, 1.3)
  )
    coreRows.push(v);
  coreRows.sort((a, b) => a - b);
  const rowAt: ((u: number) => number)[] = coreRows.map((v) => {
    const tilt = rand(-0.05, 0.05);
    const bend = rand(-8, 8);
    return (u: number) => v + tilt * (u - c.coreEnd) + bend * Math.sin((u - c.ext.u0) / 140);
  });
  rowAt.forEach((f) => {
    const steps = 6;
    let prev = { u: c.ext.u0, v: f(c.ext.u0) };
    for (let i = 1; i <= steps; i++) {
      const u = c.ext.u0 + ((c.coreEnd + 4 - c.ext.u0) * i) / steps;
      const next = { u, v: f(u) };
      if (R() > 0.08) addSeg(prev, next, c.w.core, "core");
      prev = next;
    }
  });
  const edges = [() => c.ext.v0, ...rowAt, () => c.ext.v1];
  for (let u = c.coreEnd - c.coreCol * 0.55; u > c.ext.u0 + 10; u -= c.coreCol * rand(0.7, 1.35)) {
    for (let i = 0; i < edges.length - 1; i++) {
      if (R() < 0.24) continue;
      const ua = u + rand(-7, 7);
      const ub = u + rand(-7, 7);
      addSeg({ u: ua, v: edges[i](ua) }, { u: ub, v: edges[i + 1](ub) }, c.w.core, "core");
    }
  }
  addSeg(
    { u: c.ext.u0, v: c.vH - 0.44 * c.V },
    { u: c.coreEnd - 0.03 * c.U, v: c.vH - 0.1 * c.V },
    c.w.core * 1.25,
    "core",
  );
  addSeg(
    { u: c.ext.u0 + 0.06 * c.U, v: c.vH + 0.47 * c.V },
    { u: c.coreEnd - 0.05 * c.U, v: c.vH + 0.13 * c.V },
    c.w.core * 1.25,
    "core",
  );
  // Avenues roughly parallel to the highway, and secondary roads branching off it at 2–8°.
  for (const [a, b] of c.avenues) addSeg(a, b, c.w.ave, "ave");
  for (const br of c.branches) {
    addSeg({ u: br.at, v: c.vH }, br.up, c.w.sec, "sec");
    addSeg({ u: br.at, v: c.vH }, br.down, c.w.sec, "sec");
  }
  // Short local streets off the secondaries and avenues.
  const parents = segs.filter((s) => s.kind === "sec" || s.kind === "ave");
  for (const s of parents) {
    const d = sub(s.b, s.a);
    const L = len(d);
    const dir = { u: d.u / L, v: d.v / L };
    let side = R() < 0.5 ? 1 : -1;
    for (let pos = c.locStep * 0.6; pos < L - 14; pos += c.locStep + rand(-8, 8)) {
      const o = { u: s.a.u + dir.u * pos, v: s.a.v + dir.v * pos };
      // Avenue streets head away from the highway; secondary streets alternate sides.
      if (s.kind === "ave") side = o.v < c.vH ? -1 : 1;
      const n = s.kind === "ave" ? { u: 0, v: side } : { u: -dir.v * side, v: dir.u * side };
      const tilt = rand(-0.05, 0.05);
      const nn = { u: n.u - n.v * tilt, v: n.v + n.u * tilt };
      const l = rand(c.locLen[0], c.locLen[1]);
      const e = { u: o.u + nn.u * l, v: o.v + nn.v * l };
      if (s.kind === "sec") side = -side;
      if (e.u > c.cityEnd - 12 || e.u < c.coreEnd + 8 || e.v < 10 || e.v > c.V - 10) continue;
      const mid = { u: (o.u + e.u) / 2, v: (o.v + e.v) / 2 };
      if (Math.abs(mid.v - c.vH) < c.w.hwy) continue;
      const clash = segs.some(
        (q) => q !== s && (distSeg(e, q.a, q.b) < q.w + 6 || distSeg(mid, q.a, q.b) < q.w + 4),
      );
      if (clash || inPlot(e, 3) || inPlot(mid, 3)) continue;
      addSeg(o, e, c.w.loc, "loc");
    }
  }

  /* Buildings along every street */
  type Placed = { c: UV; q: UV[] };
  const placed: Placed[] = [];
  const CELL = 40;
  const grid = new Map<string, Placed[]>();
  const key = (u: number, v: number) => `${Math.floor(u / CELL)},${Math.floor(v / CELL)}`;
  const near = (p: UV) => {
    const out: Placed[] = [];
    const cu = Math.floor(p.u / CELL);
    const cv = Math.floor(p.v / CELL);
    for (let i = -1; i <= 1; i++)
      for (let j = -1; j <= 1; j++) out.push(...(grid.get(`${cu + i},${cv + j}`) ?? []));
    return out;
  };
  const allRoads = [
    ...segs.map((s) => ({ a: s.a, b: s.b, w: s.w })),
    { a: hwyA, b: hwyGate, w: c.w.hwy },
  ].map((r) => ({
    ...r,
    box: {
      u0: Math.min(r.a.u, r.b.u) - 34,
      u1: Math.max(r.a.u, r.b.u) + 34,
      v0: Math.min(r.a.v, r.b.v) - 34,
      v1: Math.max(r.a.v, r.b.v) + 34,
    },
  }));
  const roadsNear = (p: UV) =>
    allRoads.filter((r) => p.u > r.box.u0 && p.u < r.box.u1 && p.v > r.box.v0 && p.v < r.box.v1);
  const buildings: Building[] = [];
  const tryPlace = (
    ctr: UV,
    bw: number,
    bd: number,
    th: number,
    own: { a: UV; b: UV },
    core: boolean,
  ) => {
    const r = Math.hypot(bw, bd) / 2;
    if (core) {
      if (
        ctr.u + r * 0.6 > c.coreEnd + 6 ||
        ctr.u < c.ext.u0 + 8 ||
        ctr.v < c.ext.v0 + 8 ||
        ctr.v > c.ext.v1 - 8
      )
        return;
    } else if (ctr.u + r > c.cityEnd || ctr.v - r < 6 || ctr.v + r > c.V - 6) return;
    const q = corners(ctr, bw, bd, th);
    for (const road of roadsNear(ctr)) {
      if (road.a === own.a && road.b === own.b) continue;
      const lim = road.w / 2 + 1;
      if (distSeg(ctr, road.a, road.b) < lim + Math.min(bw, bd) / 2) return;
      if (q.some((p) => distSeg(p, road.a, road.b) < lim)) return;
    }
    if (inPlot(ctr, r * 0.7)) return;
    const inflated = corners(ctr, bw + 3, bd + 3, th);
    if (near(ctr).some((o) => quadsOverlap(inflated, o.q))) return;
    const frac = clamp((ctr.u - c.coreEnd) / (c.cityEnd - c.coreEnd));
    if (!core && R() > 0.95 - 0.5 * frac) return;
    const pl = { c: ctr, q };
    placed.push(pl);
    const k = key(ctr.u, ctr.v);
    grid.set(k, [...(grid.get(k) ?? []), pl]);
    const s = toXY(ctr);
    buildings.push({
      x: s.x,
      y: s.y,
      w: bw,
      h: bd,
      rot: rotXY(th),
      shape: R() < 0.24 ? "L" : "rect",
      core,
      ghost: !core && R() < 0.08 + 0.14 * frac,
      t: core ? -1 : clamp(tAt(ctr) + rand(-0.04, 0.04), 0.01, 0.94),
    });
  };
  const frontage = (s: { a: UV; b: UV; w: number }, rowsBack: number) => {
    const d = sub(s.b, s.a);
    const L = len(d);
    const dir = { u: d.u / L, v: d.v / L };
    const th = Math.atan2(dir.v, dir.u);
    for (const side of [1, -1]) {
      const n = { u: -dir.v * side, v: dir.u * side };
      for (let row = 0; row <= rowsBack; row++) {
        let pos = rand(2, 8);
        while (pos < L - 4) {
          const at = { u: s.a.u + dir.u * pos, v: s.a.v + dir.v * pos };
          const core = at.u < c.coreEnd;
          const [w0, w1, d0, d1] = core ? c.size.core : c.size.sub;
          const bw = rand(w0, w1);
          const bd = rand(d0, d1);
          const setback = core ? c.setback.core : c.setback.sub;
          const off = s.w / 2 + setback + bd / 2 + row * (d1 + setback + 2);
          const ctr = {
            u: at.u + dir.u * (bw / 2) + n.u * off,
            v: at.v + dir.v * (bw / 2) + n.v * off,
          };
          tryPlace(ctr, bw, bd, th, s, core);
          const [g0, g1] = core ? c.gap.core : c.gap.sub;
          const frac = clamp((at.u - c.coreEnd) / (c.cityEnd - c.coreEnd));
          pos += bw + rand(g0, g1) * (1 + frac * 0.8);
        }
      }
    }
  };
  for (const s of segs) frontage(s, s.kind === "loc" ? 0 : 1);
  frontage({ a: { u: c.coreEnd, v: c.vH }, b: hwyGate, w: c.w.hwy }, 0);
  frontage({ a: hwyA, b: { u: c.coreEnd, v: c.vH }, w: c.w.hwy }, 1);

  /* Street lights along the new streets, and along the highway as it draws */
  const lamps: Lamp[] = [];
  for (const s of segs) {
    if (s.kind === "core") continue;
    const d = sub(s.b, s.a);
    const L = len(d);
    const dir = { u: d.u / L, v: d.v / L };
    let side = 1;
    for (let pos = c.lampStep * 0.5; pos < L - 4; pos += c.lampStep) {
      const at = { u: s.a.u + dir.u * pos, v: s.a.v + dir.v * pos };
      const p = {
        u: at.u - dir.v * side * (s.w / 2 + 2.2),
        v: at.v + dir.u * side * (s.w / 2 + 2.2),
      };
      side = -side;
      if (
        roadsNear(p).some(
          (q) => !(q.a === s.a && q.b === s.b) && distSeg(p, q.a, q.b) < q.w / 2 + 3,
        )
      )
        continue;
      if (inPlot(p, 2) || p.u > c.cityEnd) continue;
      lamps.push({ ...toXY(p), t: s.t0 + (s.t1 - s.t0) * (pos / L) });
    }
  }
  const hwyCore = c.coreEnd + 14;
  const hwyLamps: HwyLamp[] = [];
  for (let u = hwyCore + c.lampStep * 0.6; u < gateU - 10; u += c.lampStep * 1.25) {
    const f = (u - hwyCore) / (gateU - hwyCore);
    hwyLamps.push({ ...toXY({ u, v: c.vH - c.w.hwy / 2 - 2.5 }), f });
    hwyLamps.push({
      ...toXY({ u: u + c.lampStep * 0.6, v: c.vH + c.w.hwy / 2 + 2.5 }),
      f: f + 0.03,
    });
  }

  /* Fields: a few large, soft outlines over the growth zone and the land around the plan */
  const fields: Pt[][] = [];
  const quad = (u0: number, u1: number, v0: number, v1: number) => {
    const j = () => rand(-9, 9);
    return [
      { u: u0 + 5 + j(), v: v0 + 5 + j() },
      { u: u1 - 5 + j(), v: v0 + 5 + j() },
      { u: u1 - 5 + j(), v: v1 - 5 + j() },
      { u: u0 + 5 + j(), v: v1 - 5 + j() },
    ].map(toXY);
  };
  c.fields.cols.slice(0, -1).forEach((u0, i) => {
    const u1 = c.fields.cols[i + 1];
    const rows = c.fields.rows[i % c.fields.rows.length];
    for (let r = 0; r < rows.length - 1; r++) fields.push(quad(u0, u1, rows[r], rows[r + 1]));
  });
  const beyond = c.land[1].u + 14;
  fields.push(
    quad(beyond, c.ext.u1, c.ext.v0, c.vH - 30),
    quad(beyond, c.ext.u1, c.vH - 30, c.ext.v1),
  );
  fields.push(
    quad(c.coreEnd, c.ext.u1, c.ext.v0, -4),
    quad(c.coreEnd, c.ext.u1, c.V + 4, c.ext.v1),
  );

  /* Green buffer, service road and verge trees */
  const bufU0 = c.cityEnd + 2;
  const bufU1 = c.landStart + 2;
  const buffer = [
    { u: bufU0, v: 4 },
    { u: bufU1, v: 4 },
    { u: bufU1, v: c.V - 4 },
    { u: bufU0, v: c.V - 4 },
  ].map(toXY);
  const svcU = c.cityEnd + (c.landStart - c.cityEnd) * 0.32;
  const service: Road = {
    a: toXY({ u: svcU, v: 6 }),
    b: toXY({ u: svcU, v: c.V - 6 }),
    w: c.w.svc,
    t0: -1,
    t1: -1,
  };
  const vergeU = c.cityEnd + (c.landStart - c.cityEnd) * 0.72;
  const vergeR = c.mobile ? 3.2 : 5.5;
  const verge: Pt[] = [];
  const vStep = c.mobile ? 14 : 21;
  for (let v = 14; v < c.V - 10; v += vStep) {
    if (Math.abs(v - c.vH) < c.w.hwy / 2 + vergeR + 3) continue;
    verge.push(toXY({ u: vergeU + rand(-1.5, 1.5), v: v + rand(-2, 2) }));
  }

  /* Teak plantation, kept 12 units inside the boundary */
  const landXY = c.land.map(toXY);
  const inset = (p: Pt) => {
    let m = Infinity;
    for (let i = 0; i < landXY.length; i++) {
      const a = landXY[i];
      const b = landXY[(i + 1) % landXY.length];
      m = Math.min(m, distSeg({ u: p.x, v: p.y }, { u: a.x, v: a.y }, { u: b.x, v: b.y }));
    }
    return m;
  };
  const trees: Tree[] = [];
  const rows: number[][] = [];
  // The land's inner rectangle (the quad is nearly square-cornered), so every row gets the same
  // columns: a whole, regular plantation.
  const xs = landXY.map((p) => p.x).sort((a, b) => a - b);
  const ys = landXY.map((p) => p.y).sort((a, b) => a - b);
  const [x0, x1, y0, y1] = [xs[1], xs[2], ys[1], ys[2]];
  const pad = 12 + c.treeR * 1.12 + (c.mobile ? 2 : 3);
  const cols = Math.floor((x1 - x0 - 2 * pad) / c.treeGap) + 1;
  const rowsN = Math.floor((y1 - y0 - 2 * pad) / c.treeGap) + 1;
  const gx = x0 + (x1 - x0 - (cols - 1) * c.treeGap) / 2;
  const gy = y0 + (y1 - y0 - (rowsN - 1) * c.treeGap) / 2;
  const jit = c.mobile ? 2 : 3;
  for (let j = 0; j < rowsN; j++) {
    const row: number[] = [];
    for (let i = 0; i < cols; i++) {
      // Whether a grid point is planted depends on the grid alone (largest canopy + jitter), so
      // rows stay whole; the jitter and size only make neighbours differ.
      const g = { x: gx + i * c.treeGap, y: gy + j * c.treeGap };
      if (inset(g) < 12 + c.treeR * 1.12 + jit) continue;
      const p = { x: g.x + rand(-jit, jit), y: g.y + rand(-jit, jit) };
      trees.push({ ...p, rot: rand(0, Math.PI * 2), s: rand(0.88, 1.12), v: Math.floor(R() * 6) });
      row.push(g.x);
    }
    if (row.length) rows.push([gy + j * c.treeGap, Math.min(...row), Math.max(...row)]);
  }

  /* Landmarks */
  const landmarks: Landmark[] = c.landmarks.map((l) => ({
    kind: l.kind,
    label: l.label,
    ...toXY({ u: l.u, v: l.v }),
    w: l.w,
    h: l.h,
    at: l.at,
    t: progressAt(l.at),
  }));

  const chipEdge = c.mobile ? [toXY(c.land[1]), toXY(c.land[2])] : [landXY[0], landXY[1]];

  const ext = c.mobile
    ? { x0: c.ext.v0, x1: c.ext.v1, y0: c.U - c.ext.u1, y1: c.U - c.ext.u0 }
    : { x0: c.ext.u0, x1: c.ext.u1, y0: c.ext.v0, y1: c.ext.v1 };

  return {
    mobile: c.mobile,
    fw,
    fh,
    ext,
    unit: c.unit,
    land: landXY,
    buffer,
    service,
    verge,
    vergeR,
    fields,
    highway: {
      a: toXY(hwyA),
      core: toXY({ u: hwyCore, v: c.vH }),
      gate: toXY(hwyGate),
      w: c.w.hwy,
    },
    hwyLamps,
    roads: segs.map((s) => ({ a: toXY(s.a), b: toXY(s.b), w: s.w, t0: s.t0, t1: s.t1 })),
    buildings,
    lamps,
    trees,
    treeR: c.treeR,
    rows,
    landmarks,
    chip: { x: (chipEdge[0].x + chipEdge[1].x) / 2, y: (chipEdge[0].y + chipEdge[1].y) / 2 },
    pinMode: c.pinMode,
  };
}

export const desktopLayout = () => generate(DESK);
export const mobileLayout = () => generate(MOB);

/** Polygon points as an SVG `points` string. */
export const polyPoints = (pts: Pt[]) =>
  pts.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
