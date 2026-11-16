/**
 * Canvas 2D renderer for the site plan, in one style only: architectural line-art. The city is
 * pale, monochrome footprints with hairline outlines and one soft shadow (2 px right, 2 px
 * down, 8% ink, 2 px blur); roads are double hairlines with a paper fill. Redwood land is the
 * only colour: a light meadow with teak canopies in two fresh greens, lit from the top-left.
 *
 * Three stacked canvases: ground (static), city (roads, buildings, lights) and trees. Nothing is
 * rebuilt during the animation; frames only composite and redraw what the clock reveals.
 */
import {
  clamp,
  rng,
  type Building,
  type Landmark,
  type Layout,
  type Pt,
  type Road,
} from "./cityLayout";

/* Palette ------------------------------------------------------------------------------------ */

const PAPER_0 = "#FFFFFF";
const PAPER_100 = "#F5F2EC";
const PAPER_200 = "#EDE8DF";
const PAPER_300 = "#E3DCCF";
const INK_300 = "rgba(23,32,27,0.20)";
/** ink-300 flattened onto paper-100, so overlapping road edges never darken at junctions. */
const ROAD_EDGE = "#CBC9C2";
const INK_100 = "rgba(23,32,27,0.06)";
const MEADOW = "#EEF5E8";
const SHADOW = "rgba(23,32,27,0.08)";
/** Teak canopy greens per growth stage: [shadow side, lit side]. Mature = teak-green-500 / -300. */
const CANOPY: [string, string][] = [
  ["#8FBE7C", "#C2DEB2"],
  ["#8DBC7A", "#BBDAA8"],
  ["#7EAF6C", "#AFD39C"],
  ["#6FA35F", "#A6CC92"],
];

/* Easing ------------------------------------------------------------------------------------- */

/** CSS-style cubic-bezier easing (monotonic x, solved by bisection). */
export function cubicBezier(x1: number, y1: number, x2: number, y2: number) {
  const bx = (t: number) => 3 * x1 * t * (1 - t) ** 2 + 3 * x2 * t ** 2 * (1 - t) + t ** 3;
  const by = (t: number) => 3 * y1 * t * (1 - t) ** 2 + 3 * y2 * t ** 2 * (1 - t) + t ** 3;
  return (x: number) => {
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    let lo = 0;
    let hi = 1;
    let t = x;
    for (let i = 0; i < 22; i++) {
      const v = bx(t);
      if (Math.abs(v - x) < 1e-5) break;
      if (v < x) lo = t;
      else hi = t;
      t = (lo + hi) / 2;
    }
    return by(t);
  };
}
const easeOut = (q: number) => 1 - (1 - q) ** 3;

/* Geometry helpers --------------------------------------------------------------------------- */

type Ctx = CanvasRenderingContext2D;
type Sprite = { c: HTMLCanvasElement; w: number; h: number };

function polyPath(ctx: Ctx, pts: Pt[]) {
  ctx.beginPath();
  pts.forEach((p, i) => (i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)));
  ctx.closePath();
}

/** A polygon with softly rounded corners. */
function roundPoly(ctx: Ctx, pts: Pt[], r: number) {
  ctx.beginPath();
  const n = pts.length;
  const mid = (a: Pt, b: Pt) => ({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 });
  const start = mid(pts[n - 1], pts[0]);
  ctx.moveTo(start.x, start.y);
  for (let i = 0; i < n; i++) {
    const p = pts[i];
    const q = pts[(i + 1) % n];
    ctx.arcTo(p.x, p.y, mid(p, q).x, mid(p, q).y, r);
  }
  ctx.closePath();
}

/**
 * A canvas `w × h` layout units big with the origin at its centre; `px` device pixels per unit.
 */
function makeSprite(w: number, h: number, px: number, paint: (ctx: Ctx) => void): Sprite {
  const c = document.createElement("canvas");
  c.width = Math.max(1, Math.ceil(w * px));
  c.height = Math.max(1, Math.ceil(h * px));
  const ctx = c.getContext("2d")!;
  ctx.setTransform(px, 0, 0, px, c.width / 2, c.height / 2);
  paint(ctx);
  return { c, w, h };
}

/** The one shadow recipe: 2 px right, 2 px down, 8% ink, 2 px blur (device pixels). */
function withShadow(ctx: Ctx, dpr: number, fn: () => void) {
  ctx.save();
  ctx.shadowColor = SHADOW;
  ctx.shadowBlur = 2 * dpr;
  ctx.shadowOffsetX = 2 * dpr;
  ctx.shadowOffsetY = 2 * dpr;
  fn();
  ctx.restore();
}

/* Buildings ---------------------------------------------------------------------------------- */

function footprint(b: { w: number; h: number; shape: Building["shape"] }) {
  const p = new Path2D();
  const hw = b.w / 2;
  const hh = b.h / 2;
  if (b.shape === "L") {
    const nw = b.w * 0.42;
    const nh = b.h * 0.45;
    p.moveTo(-hw, -hh);
    p.lineTo(hw, -hh);
    p.lineTo(hw, hh - nh);
    p.lineTo(hw - nw, hh - nh);
    p.lineTo(hw - nw, hh);
    p.lineTo(-hw, hh);
    p.closePath();
  } else p.rect(-hw, -hh, b.w, b.h);
  return p;
}

/** One footprint in place: flat fill, hairline outline, a faint parapet line on larger roofs. */
function paintBuilding(ctx: Ctx, b: Building, hair: number, dpr: number) {
  ctx.save();
  ctx.translate(b.x, b.y);
  ctx.rotate(b.rot);
  const path = footprint(b);
  if (b.ghost) {
    ctx.setLineDash([2.4 * hair, 2 * hair]);
    ctx.strokeStyle = "rgba(23,32,27,0.24)";
    ctx.lineWidth = hair;
    ctx.stroke(path);
    ctx.restore();
    return;
  }
  const fill = b.core ? PAPER_300 : PAPER_200;
  withShadow(ctx, dpr, () => {
    ctx.fillStyle = fill;
    ctx.fill(path);
  });
  ctx.fillStyle = fill;
  ctx.fill(path);
  ctx.strokeStyle = INK_300;
  ctx.lineWidth = hair;
  ctx.stroke(path);
  if (Math.min(b.w, b.h) > 11) {
    ctx.strokeStyle = "rgba(23,32,27,0.07)";
    ctx.strokeRect(
      -b.w / 2 + 1.6,
      -b.h / 2 + 1.6,
      b.w - 3.2,
      b.shape === "L" ? b.h * 0.55 - 3.2 : b.h - 3.2,
    );
  }
  ctx.restore();
}

function buildingSprite(b: Building, px: number, hair: number, dpr: number) {
  const r = Math.hypot(b.w, b.h) / 2 + 5;
  return makeSprite(r * 2, r * 2, px, (ctx) => paintBuilding(ctx, { ...b, x: 0, y: 0 }, hair, dpr));
}

/* Landmarks ---------------------------------------------------------------------------------- */

function landmarkSprite(l: Landmark, px: number, hair: number, dpr: number) {
  const pad = 8;
  const { w, h } = l;
  return makeSprite(w + pad * 2, h + pad * 2, px, (ctx) => {
    const line = (a = 0.2) => {
      ctx.strokeStyle = `rgba(23,32,27,${a})`;
      ctx.lineWidth = hair;
    };
    const block = (path: Path2D) => {
      withShadow(ctx, dpr, () => {
        ctx.fillStyle = PAPER_300;
        ctx.fill(path);
      });
      ctx.fillStyle = PAPER_300;
      ctx.fill(path);
      line();
      ctx.stroke(path);
    };
    // The plot boundary.
    line(0.12);
    ctx.setLineDash([2 * hair, 2 * hair]);
    ctx.strokeRect(-w / 2, -h / 2, w, h);
    ctx.setLineDash([]);
    if (l.kind === "school") {
      // A U-shaped block, and a playground with a running oval.
      const p = new Path2D();
      const bh = h * 0.36;
      p.rect(-w * 0.44, -h * 0.44, w * 0.88, bh * 0.55);
      p.rect(-w * 0.44, -h * 0.44, w * 0.22, bh);
      p.rect(w * 0.22, -h * 0.44, w * 0.22, bh);
      block(p);
      ctx.fillStyle = PAPER_0;
      ctx.beginPath();
      ctx.ellipse(0, h * 0.2, w * 0.34, h * 0.17, 0, 0, Math.PI * 2);
      ctx.fill();
      line(0.22);
      ctx.stroke();
      line(0.12);
      ctx.beginPath();
      ctx.ellipse(0, h * 0.2, w * 0.24, h * 0.09, 0, 0, Math.PI * 2);
      ctx.stroke();
    } else if (l.kind === "hospital") {
      // Main block with a cross marked on the roof, a low wing and a car park.
      const p = new Path2D();
      p.rect(-w * 0.32, -h * 0.44, w * 0.64, h * 0.56);
      p.rect(-w * 0.46, -h * 0.26, w * 0.16, h * 0.3);
      block(p);
      const s = Math.min(w, h) * 0.12;
      const cross = new Path2D();
      cross.rect(-s * 1.5, -h * 0.16 - s / 2, s * 3, s);
      cross.rect(-s / 2, -h * 0.16 - s * 1.5, s, s * 3);
      line(0.32);
      ctx.stroke(cross);
      line(0.18);
      ctx.strokeRect(-w * 0.32, h * 0.2, w * 0.64, h * 0.2);
      ctx.beginPath();
      for (let x = -w * 0.26; x < w * 0.3; x += w * 0.08) {
        ctx.moveTo(x, h * 0.2);
        ctx.lineTo(x, h * 0.3);
      }
      ctx.stroke();
    } else {
      // A colony: two rows of identical small houses either side of a lane.
      const n = 5;
      const gap = w * 0.03;
      const hw = (w * 0.9 - gap * (n - 1)) / n;
      const hh = h * 0.34;
      const p = new Path2D();
      for (let i = 0; i < n; i++) {
        const x = -w * 0.45 + i * (hw + gap);
        p.rect(x, -h * 0.44, hw, hh);
        p.rect(x, h * 0.44 - hh, hw, hh);
      }
      block(p);
      line(0.12);
      ctx.beginPath();
      for (let i = 0; i < n; i++) {
        const x = -w * 0.45 + i * (hw + gap) + hw / 2;
        ctx.moveTo(x, -h * 0.44);
        ctx.lineTo(x, -h * 0.44 + hh);
        ctx.moveTo(x, h * 0.44 - hh);
        ctx.lineTo(x, h * 0.44);
      }
      ctx.stroke();
    }
  });
}

/* Teak ---------------------------------------------------------------------------------------- */

type Canopy = { stages: Path2D[]; veins: Path2D; holes: [number, number, number][] };

/**
 * Six broad-leaf teak canopies, lobed and slightly open. Paths are built at unit radius;
 * young, mid and mature stages add lobes as the tree fills out.
 */
function buildCanopies(): Canopy[] {
  return Array.from({ length: 6 }, (_, v) => {
    const R = rng(900 + v * 37);
    const n = 6 + Math.floor(R() * 3);
    const lobes = Array.from({ length: n }, (_, i) => ({
      a: (i / n) * Math.PI * 2 + (R() - 0.5) * 0.5,
      d: 0.44 + R() * 0.12,
      r: 0.38 + R() * 0.14,
    }));
    const fit = 1 / Math.max(...lobes.map((l) => l.d + l.r));
    const path = (count: number, shrink: number) => {
      const p = new Path2D();
      const centre = 0.5 * fit * shrink;
      p.moveTo(centre, 0);
      p.arc(0, 0, centre, 0, Math.PI * 2);
      for (const l of lobes.slice(0, count)) {
        const x = Math.cos(l.a) * l.d * fit * shrink;
        const y = Math.sin(l.a) * l.d * fit * shrink;
        const r = l.r * fit * shrink;
        p.moveTo(x + r, y);
        p.arc(x, y, r, 0, Math.PI * 2);
      }
      return p;
    };
    const veins = new Path2D();
    for (const l of lobes) {
      const x = Math.cos(l.a) * l.d * fit;
      const y = Math.sin(l.a) * l.d * fit;
      veins.moveTo(Math.cos(l.a) * 0.12, Math.sin(l.a) * 0.12);
      veins.lineTo(x, y);
      const r = l.r * fit * 0.7;
      veins.moveTo(x + Math.cos(l.a - 0.9) * r, y + Math.sin(l.a - 0.9) * r);
      veins.arc(x, y, r, l.a - 0.9, l.a + 0.9);
    }
    const holes: [number, number, number][] = [0, 1].map(() => {
      const a = R() * Math.PI * 2;
      const d = 0.35 + R() * 0.3;
      return [Math.cos(a) * d, Math.sin(a) * d, 0.045 + R() * 0.03];
    });
    return { stages: [path(3, 0.82), path(5, 0.92), path(n, 1)], veins, holes };
  });
}

/**
 * One teak at growth stage `st` (0 sapling, 1 young, 2 mid, 3 mature). The silhouette rotates
 * with the tree; the light does not: the lit side is always toward the top-left.
 */
function paintTree(
  ctx: Ctx,
  canopies: Canopy[],
  t: { x: number; y: number; rot: number; v: number },
  R: number,
  st: number,
  hair: number,
) {
  if (st === 0) {
    ctx.fillStyle = SHADOW;
    ctx.beginPath();
    ctx.arc(t.x + hair * 1.4, t.y + hair * 1.4, R * 0.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = CANOPY[0][1];
    ctx.strokeStyle = CANOPY[0][0];
    ctx.lineWidth = hair;
    ctx.beginPath();
    ctx.arc(t.x, t.y, R * 0.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    return;
  }
  const cp = canopies[t.v];
  const path = cp.stages[st - 1];
  const [dark, lit] = CANOPY[st];
  const cos = Math.cos(-t.rot);
  const sin = Math.sin(-t.rot);
  const local = (x: number, y: number) => [x * cos - y * sin, x * sin + y * cos];
  // ground shadow
  ctx.save();
  ctx.translate(t.x + 2 * hair, t.y + 2 * hair);
  ctx.rotate(t.rot);
  ctx.scale(R, R);
  ctx.fillStyle = SHADOW;
  ctx.fill(path);
  ctx.restore();
  ctx.save();
  ctx.translate(t.x, t.y);
  ctx.rotate(t.rot);
  ctx.scale(R, R);
  ctx.fillStyle = dark;
  ctx.fill(path);
  ctx.save();
  ctx.clip(path);
  const [lx, ly] = local(-0.2, -0.2);
  ctx.translate(lx, ly);
  ctx.fillStyle = lit;
  ctx.fill(path);
  ctx.restore();
  if (st === 3) {
    ctx.strokeStyle = "rgba(58,102,50,0.16)";
    ctx.lineWidth = (hair * 0.8) / R;
    ctx.stroke(cp.veins);
    ctx.fillStyle = MEADOW;
    for (const [x, y, r] of cp.holes) {
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.restore();
}

/* Renderer ----------------------------------------------------------------------------------- */

type Anim = { on: boolean; from: number; val: number; start: number };
const anim = (on: boolean): Anim => ({ on, from: on ? 1 : 0, val: on ? 1 : 0, start: 0 });

/** Moves `a` toward its target; returns true while it is still moving. */
function step(a: Anim, target: boolean, now: number, dur: number, delay = 0) {
  if (a.on !== target) {
    a.on = target;
    a.from = a.val;
    a.start = now + (target ? delay : 0);
  }
  const goal = target ? 1 : 0;
  if (a.val === goal) return false;
  const q = clamp((now - a.start) / (target ? dur : 160));
  a.val = q >= 1 ? goal : a.from + (goal - a.from) * q;
  return a.val !== goal;
}

/** Where the 1000-unit frame sits in the panel: origin and CSS px per layout unit. */
export type Stage = { x: number; y: number; s: number };
/** The clock (0 = 2026, 1 = 2038) and how far the highway has drawn (0 = old core, 1 = gate). */
export type Frame = { p: number; hwy: number };

export type CityRenderer = {
  resize: (w: number, h: number, stage: Stage) => void;
  /** Paints the static layers and sprites; called ahead of time, or on first draw. */
  prepare: () => void;
  set: (f: Frame) => void;
  /** The next frame jumps to its state without pops (reduced motion, fast-forward). */
  snap: () => void;
  destroy: () => void;
};

export function createRenderer(
  cv: { ground: HTMLCanvasElement; city: HTMLCanvasElement; trees: HTMLCanvasElement },
  L: Layout,
  opts: { halos: boolean; grain: boolean },
): CityRenderer {
  const gctx = cv.ground.getContext("2d")!;
  const cctx = cv.city.getContext("2d")!;
  const tctx = cv.trees.getContext("2d")!;
  const canopies = buildCanopies();
  let W = 0;
  let H = 0;
  let stage: Stage = { x: 0, y: 0, s: 0 };
  let dpr = 1;
  let armed = false;
  let ready = false;
  let first = true;
  let destroyed = false;
  let raf = 0;
  let frame: Frame = { p: 0, hwy: 0 };
  let core: HTMLCanvasElement | null = null;
  let bSprites: Sprite[] = [];
  let lmSprites: Sprite[] = [];
  let lamp: Sprite | null = null;

  const growth = L.buildings.filter((b) => !b.core);
  const coreBuildings = L.buildings.filter((b) => b.core);
  const bAnim = growth.map((b) => anim(b.t < 0));
  const lmAnim = L.landmarks.map(() => anim(false));
  const lampAnim = L.lamps.map((l) => anim(l.t < 0));
  const hwyLampAnim = L.hwyLamps.map(() => anim(false));
  const k = () => dpr * stage.s;
  const hair = () => 1 / stage.s;
  const toStage = (ctx: Ctx) => ctx.setTransform(k(), 0, 0, k(), dpr * stage.x, dpr * stage.y);

  const strokeRoads = (
    ctx: Ctx,
    list: { a: Pt; b: Pt; w: number }[],
    dashed?: { a: Pt; b: Pt },
  ) => {
    const hr = hair();
    ctx.lineCap = "round";
    ctx.strokeStyle = ROAD_EDGE;
    for (const r of list) {
      ctx.lineWidth = r.w + 2 * hr;
      ctx.beginPath();
      ctx.moveTo(r.a.x, r.a.y);
      ctx.lineTo(r.b.x, r.b.y);
      ctx.stroke();
    }
    ctx.strokeStyle = PAPER_0;
    for (const r of list) {
      ctx.lineWidth = r.w;
      ctx.beginPath();
      ctx.moveTo(r.a.x, r.a.y);
      ctx.lineTo(r.b.x, r.b.y);
      ctx.stroke();
    }
    if (dashed) {
      ctx.setLineDash([6 * hr * 1.4, 5 * hr * 1.4]);
      ctx.strokeStyle = "rgba(23,32,27,0.16)";
      ctx.lineWidth = hr;
      ctx.lineCap = "butt";
      ctx.beginPath();
      ctx.moveTo(dashed.a.x, dashed.a.y);
      ctx.lineTo(dashed.b.x, dashed.b.y);
      ctx.stroke();
      ctx.setLineDash([]);
    }
  };

  function paintGround() {
    const ctx = gctx;
    const hr = hair();
    const R = rng(4);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = PAPER_100;
    ctx.fillRect(0, 0, cv.ground.width, cv.ground.height);
    toStage(ctx);
    // Faint field outlines.
    ctx.strokeStyle = INK_100;
    ctx.lineWidth = hr;
    for (const f of L.fields) {
      roundPoly(ctx, f, 16);
      ctx.stroke();
    }
    // Green buffer, service road and verge trees.
    ctx.fillStyle = "rgba(238,245,232,0.8)";
    polyPath(ctx, L.buffer);
    ctx.fill();
    strokeRoads(ctx, [L.service]);
    // Redwood land: meadow, a whisper of grain, planting rows.
    ctx.fillStyle = MEADOW;
    polyPath(ctx, L.land);
    ctx.fill();
    ctx.save();
    polyPath(ctx, L.land);
    ctx.clip();
    if (opts.grain) {
      const xs = L.land.map((p) => p.x);
      const ys = L.land.map((p) => p.y);
      const x0 = Math.min(...xs);
      const y0 = Math.min(...ys);
      const w = Math.max(...xs) - x0;
      const h = Math.max(...ys) - y0;
      for (const tone of [
        "rgba(23,32,27,0.025)",
        "rgba(255,255,255,0.05)",
        "rgba(90,140,70,0.03)",
      ]) {
        ctx.fillStyle = tone;
        ctx.beginPath();
        for (let i = 0; i < (w * h) / 30; i++)
          ctx.rect(x0 + R() * w, y0 + R() * h, hr * 1.2, hr * 1.2);
        ctx.fill();
      }
    }
    ctx.strokeStyle = "rgba(23,32,27,0.05)";
    ctx.lineWidth = hr;
    ctx.setLineDash([3 * hr, 4 * hr]);
    ctx.beginPath();
    for (const [y, a, b] of L.rows) {
      ctx.moveTo(a - L.treeR * 0.6, y);
      ctx.lineTo(b + L.treeR * 0.6, y);
    }
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();
    for (const p of L.verge) {
      paintTree(
        ctx,
        canopies,
        { ...p, rot: R() * Math.PI * 2, v: Math.floor(R() * 6) },
        L.vergeR,
        2,
        hr,
      );
    }
  }

  function prepare() {
    armed = true;
    if (ready || !stage.s || destroyed) return;
    dpr = Math.min(2, window.devicePixelRatio || 1);
    const hr = hair();
    paintGround();
    // The old core never changes: paint it once.
    core = document.createElement("canvas");
    core.width = cv.city.width;
    core.height = cv.city.height;
    const c = core.getContext("2d")!;
    toStage(c);
    for (const b of coreBuildings) paintBuilding(c, b, hr, dpr);
    bSprites = growth.map((b) => buildingSprite(b, k(), hr, dpr));
    lmSprites = L.landmarks.map((l) => landmarkSprite(l, k(), hr, dpr));
    const lr = opts.halos ? 4 * hr : 1.8;
    lamp = makeSprite(lr * 2 + 1, lr * 2 + 1, k(), (x) => {
      if (opts.halos) {
        const g = x.createRadialGradient(0, 0, 0, 0, 0, lr);
        g.addColorStop(0, "rgba(255,214,150,0.5)");
        g.addColorStop(1, "rgba(255,214,150,0)");
        x.fillStyle = g;
        x.beginPath();
        x.arc(0, 0, lr, 0, Math.PI * 2);
        x.fill();
      }
      x.fillStyle = "#FFF6E3";
      x.strokeStyle = "rgba(170,128,64,0.5)";
      x.lineWidth = hr;
      x.beginPath();
      x.arc(0, 0, 1.6 * L.unit + 0.4, 0, Math.PI * 2);
      x.fill();
      x.stroke();
    });
    ready = true;
    first = true;
    request();
  }

  function draw(now: number) {
    if (!ready && armed) prepare();
    if (!ready || !core || !lamp) return false;
    const hr = hair();
    const { p, hwy } = frame;
    const instant = first;
    first = false;
    let moving = false;

    /* City */
    const ctx = cctx;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.globalAlpha = 1;
    ctx.clearRect(0, 0, cv.city.width, cv.city.height);
    toStage(ctx);
    const hw = L.highway;
    const tip = {
      x: hw.core.x + (hw.gate.x - hw.core.x) * hwy,
      y: hw.core.y + (hw.gate.y - hw.core.y) * hwy,
    };
    const list: { a: Pt; b: Pt; w: number }[] = [];
    for (const r of L.roads as Road[]) {
      if (r.t0 < 0 && r.t1 < 0) {
        list.push(r);
        continue;
      }
      if (p < r.t0) continue;
      const f = r.t1 > r.t0 ? clamp((p - r.t0) / (r.t1 - r.t0)) : 1;
      if (f <= 0) continue;
      list.push({
        a: r.a,
        b: { x: r.a.x + (r.b.x - r.a.x) * f, y: r.a.y + (r.b.y - r.a.y) * f },
        w: r.w,
      });
    }
    list.push({ a: hw.a, b: tip, w: hw.w });
    strokeRoads(ctx, list, { a: hw.a, b: tip });
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.drawImage(core, 0, 0);
    toStage(ctx);

    const pop = (a: Anim, sp: Sprite, x: number, y: number) => {
      if (a.val <= 0.001) return;
      const e = a.on ? easeOut(a.val) : a.val;
      const s = 0.8 + 0.2 * e;
      ctx.globalAlpha = e;
      ctx.drawImage(sp.c, x - (sp.w * s) / 2, y - (sp.h * s) / 2, sp.w * s, sp.h * s);
    };
    growth.forEach((b, i) => {
      const a = bAnim[i];
      if (instant) Object.assign(a, anim(p >= b.t));
      else if (step(a, p >= b.t, now, 350)) moving = true;
      pop(a, bSprites[i], b.x, b.y);
    });
    L.landmarks.forEach((l, i) => {
      const a = lmAnim[i];
      if (instant) Object.assign(a, anim(p >= l.t));
      else if (step(a, p >= l.t, now, 400)) moving = true;
      pop(a, lmSprites[i], l.x, l.y);
    });
    const lit = (a: Anim, x: number, y: number) => {
      if (a.val <= 0.001) return;
      ctx.globalAlpha = 0.6 * a.val;
      ctx.drawImage(lamp!.c, x - lamp!.w / 2, y - lamp!.h / 2, lamp!.w, lamp!.h);
    };
    L.lamps.forEach((l, i) => {
      const a = lampAnim[i];
      if (instant) Object.assign(a, anim(p >= l.t));
      else if (step(a, p >= l.t, now, 200, 150)) moving = true;
      lit(a, l.x, l.y);
    });
    L.hwyLamps.forEach((l, i) => {
      const a = hwyLampAnim[i];
      if (instant) Object.assign(a, anim(hwy >= l.f));
      else if (step(a, hwy >= l.f, now, 200, 150)) moving = true;
      lit(a, l.x, l.y);
    });
    ctx.globalAlpha = 1;

    /* Teak: four growth stages, crossfading at 25 / 50 / 75%, scaling up with the year. */
    const tx = tctx;
    tx.setTransform(1, 0, 0, 1, 0, 0);
    tx.clearRect(0, 0, cv.trees.width, cv.trees.height);
    toStage(tx);
    tx.save();
    polyPath(tx, L.land);
    tx.clip();
    const X = 0.04;
    const bounds = [0.25, 0.5, 0.75];
    const base = p < 0.25 ? 0 : p < 0.5 ? 1 : p < 0.75 ? 2 : 3;
    const cross = bounds.findIndex((b) => Math.abs(p - b) < X);
    const grow = 0.28 + 0.72 * p;
    for (const t of L.trees) {
      const R = L.treeR * t.s * grow;
      if (cross >= 0) {
        tx.globalAlpha = 1;
        paintTree(tx, canopies, t, R, cross, hr);
        tx.globalAlpha = clamp((p - bounds[cross] + X) / (2 * X));
        paintTree(tx, canopies, t, R, cross + 1, hr);
      } else {
        tx.globalAlpha = 1;
        paintTree(tx, canopies, t, R, base, hr);
      }
    }
    tx.restore();
    tx.globalAlpha = 1;
    return moving;
  }

  const loop = (now: number) => {
    raf = 0;
    if (destroyed) return;
    if (draw(now)) raf = requestAnimationFrame(loop);
  };
  function request() {
    if (!raf && !destroyed) raf = requestAnimationFrame(loop);
  }

  return {
    resize(w, h, st) {
      const nd = Math.min(2, window.devicePixelRatio || 1);
      if (
        Math.abs(w - W) < 0.5 &&
        Math.abs(h - H) < 0.5 &&
        Math.abs(st.s - stage.s) < 1e-4 &&
        nd === dpr
      )
        return;
      W = w;
      H = h;
      stage = st;
      dpr = nd;
      for (const c of [cv.ground, cv.city, cv.trees]) {
        c.width = Math.max(1, Math.round(w * dpr));
        c.height = Math.max(1, Math.round(h * dpr));
      }
      ready = false;
      first = true;
      request();
    },
    prepare,
    set(f) {
      frame = { ...f };
      request();
    },
    snap() {
      first = true;
      request();
    },
    destroy() {
      destroyed = true;
      if (raf) cancelAnimationFrame(raf);
    },
  };
}
