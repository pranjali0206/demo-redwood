import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  ArrowRight,
  Clock,
  IndianRupee,
  Minus,
  Plus,
  Sprout,
  TreePine,
  TrendingUp,
} from "lucide-react";
import { BOOK_HREF } from "@/components/triangle/constants";
import { CALC } from "./redwoodCalculator.config";
import {
  calculate,
  checkParcel,
  formatCount,
  formatPct,
  formatRupees,
  formatRupeesShort,
  priceAt,
  spokenRupees,
  yearLabel,
  type YearPoint,
} from "./redwoodCalculator.logic";

/*
 * "One Land. Two Growths.": the Double Growth calculator (/timber-calculator page).
 *
 * The visitor picks a land size. The maths is shown openly:
 *   land ÷ 100 sq ft (one tree per 10 × 10 ft) = trees;  trees × 80 cu ft = timber at year 12;
 *   timber × the year-12 timber price = timber value.
 * Below: a year-by-year bar chart of the timber (value or volume), land growth as a percentage
 * (never in rupees: no land ₹/sq ft rate is used), and Sagwan vs traditional teak.
 * Constants: redwoodCalculator.config. Formulas: redwoodCalculator.logic. Styles: double-growth.css.
 */

const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Counts a number towards its target: from 0 over 1.2 s on reveal, then 400 ms per change. */
function useCountUp(target: number, revealed: boolean) {
  const [value, setValue] = useState(target);
  const shown = useRef(target);
  const first = useRef(true);
  useEffect(() => {
    if (reducedMotion()) {
      shown.current = target;
      setValue(target);
      return;
    }
    if (!revealed) {
      shown.current = 0;
      setValue(0);
      return;
    }
    const from = shown.current;
    const ms = first.current ? 1200 : 400;
    first.current = false;
    let raf = 0;
    const t0 = performance.now();
    const step = (now: number) => {
      // rAF timestamps can be slightly earlier than t0, so clamp at 0 (never a negative figure).
      const k = Math.min(1, Math.max(0, (now - t0) / ms));
      const v = from + (target - from) * (1 - (1 - k) ** 3);
      shown.current = v;
      setValue(v);
      if (k < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, revealed]);
  return value;
}

const presetLabel = (sqft: number) =>
  sqft === CALC.acreSqft ? "1 acre" : `${formatCount(sqft)} sq ft`;

/** How the numbers work, in plain words. */
const STEPS = [
  {
    icon: Sprout,
    title: "One tree for every 10 × 10 ft",
    text: "Every 100 sq ft of your land gets one premium Sagwan tree.",
  },
  {
    icon: TreePine,
    title: `${CALC.timberCuftPerTree} cu ft per tree by year ${CALC.harvestYear}`,
    text: `Each tree is expected to give about ${CALC.timberCuftPerTree} cu ft of timber at harvest (Redwood Biotech estimate). Traditional Sagwan takes ${CALC.traditionalYears}+ years.`,
  },
  {
    icon: IndianRupee,
    title: "Timber is valued at harvest",
    text: `Premium Sagwan timber is valued at about ₹${formatCount(
      CALC.timberPriceAtHarvest,
    )} per cu ft at harvest in year ${CALC.harvestYear}.`,
  },
  {
    icon: TrendingUp,
    title: "Your land grows too",
    text: `Land near Indore has grown about ${Math.round(CALC.landGrowth * 100)}% a year: roughly ${formatPct(
      calculate(CALC.minParcelSqft).landGrowth,
    )} over ${CALC.harvestYear} years.`,
  },
];

type Metric = "value" | "volume";

/* Charts ------------------------------------------------------------------------------------- */

function TimberTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: { payload: YearPoint }[];
}) {
  const p = payload?.[0]?.payload;
  if (!active || !p) return null;
  return (
    <div className="dg-tip">
      <p className="dg-tip__k">{yearLabel(p.year, true)}</p>
      <p className="dg-tip__v">{formatRupees(p.timber)}</p>
      <p className="dg-tip__s">
        {formatCount(p.cuft)} cu ft · ₹{formatCount(priceAt(p.year))}/cu ft
      </p>
    </div>
  );
}

function LandTooltip({ active, payload }: { active?: boolean; payload?: { payload: YearPoint }[] }) {
  const p = payload?.[0]?.payload;
  if (!active || !p) return null;
  return (
    <div className="dg-tip">
      <p className="dg-tip__k">{yearLabel(p.year, true)}</p>
      <p className="dg-tip__v dg-tip__v--land">{formatPct(p.land)}</p>
      <p className="dg-tip__s">land value growth</p>
    </div>
  );
}

function TimberChart({ series, metric, animate }: { series: YearPoint[]; metric: Metric; animate: boolean }) {
  const key = metric === "value" ? "timber" : "cuft";
  const tick = (v: number) => (metric === "value" ? formatRupeesShort(v) : formatCount(v));
  const last = series.length - 1;
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={series} margin={{ top: 34, right: 8, bottom: 0, left: 4 }} barCategoryGap="22%">
        <defs>
          <linearGradient id="dg-bar" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1f7a59" />
            <stop offset="100%" stopColor="#175f45" />
          </linearGradient>
          <linearGradient id="dg-bar-gold" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e6b65a" />
            <stop offset="100%" stopColor="#b08a3e" />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} stroke="rgba(16,62,48,0.08)" />
        <XAxis
          dataKey="year"
          tickFormatter={(t: number) => (t === 0 ? "Today" : `Y${t}`)}
          tickLine={false}
          axisLine={{ stroke: "rgba(16,62,48,0.18)" }}
          tick={{ fill: "#5c5a55", fontSize: 12 }}
          interval="preserveStartEnd"
          minTickGap={6}
        />
        <YAxis
          tickFormatter={tick}
          tickLine={false}
          axisLine={false}
          tick={{ fill: "#5c5a55", fontSize: 12 }}
          width={64}
        />
        <Tooltip content={<TimberTooltip />} cursor={{ fill: "rgba(23,95,69,0.06)", radius: 8 }} />
        <Bar dataKey={key} radius={[6, 6, 0, 0]} isAnimationActive={animate} animationDuration={900}>
          {series.map((p) => (
            <Cell key={p.year} fill={p.year === last ? "url(#dg-bar-gold)" : "url(#dg-bar)"} />
          ))}
          <LabelList
            dataKey={key}
            content={(props) => {
              const { x, y, width, index, value } = props as {
                x: number;
                y: number;
                width: number;
                index: number;
                value: number;
              };
              if (index !== last) return null;
              return (
                <text
                  x={x + width / 2}
                  y={y - 10}
                  textAnchor="middle"
                  className="dg-barlabel"
                >
                  {metric === "value" ? formatRupees(value) : `${formatCount(value)} cu ft`}
                </text>
              );
            }}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

function LandChart({ series, animate }: { series: YearPoint[]; animate: boolean }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={series} margin={{ top: 12, right: 12, bottom: 0, left: 0 }}>
        <defs>
          <linearGradient id="dg-land" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c91f35" stopOpacity={0.22} />
            <stop offset="100%" stopColor="#c91f35" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} stroke="rgba(16,62,48,0.08)" />
        <XAxis
          dataKey="year"
          tickFormatter={(t: number) => (t === 0 ? "Today" : `Y${t}`)}
          tickLine={false}
          axisLine={{ stroke: "rgba(16,62,48,0.18)" }}
          tick={{ fill: "#5c5a55", fontSize: 11 }}
          ticks={[0, 3, 6, 9, 12]}
        />
        <YAxis
          tickFormatter={(v: number) => `${v}%`}
          tickLine={false}
          axisLine={false}
          tick={{ fill: "#5c5a55", fontSize: 11 }}
          width={44}
        />
        <Tooltip content={<LandTooltip />} cursor={{ stroke: "rgba(201,31,53,0.35)", strokeDasharray: "3 3" }} />
        <Area
          type="monotone"
          dataKey="land"
          stroke="#c91f35"
          strokeWidth={2}
          fill="url(#dg-land)"
          dot={false}
          activeDot={{ r: 5, stroke: "#fff", strokeWidth: 2, fill: "#c91f35" }}
          isAnimationActive={animate}
          animationDuration={1100}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

/** The land as a grid of tree dots: one dot per tree, or per N trees on big parcels. */
function TreePlot({ trees }: { trees: number }) {
  const MAX_DOTS = 120;
  const per = Math.max(1, Math.ceil(trees / MAX_DOTS));
  const dots = Math.ceil(trees / per);
  return (
    <div className="dg-plot">
      <div className="dg-plot__grid" aria-hidden="true">
        {Array.from({ length: dots }, (_, i) => (
          <span key={i} className="dg-plot__dot" style={{ "--i": i } as CSSProperties} />
        ))}
      </div>
      <p className="dg-plot__key">
        <span className="dg-plot__swatch" aria-hidden="true" />
        {per === 1
          ? "Each dot is one Sagwan tree on its own 10 × 10 ft square"
          : `Each dot is about ${formatCount(per)} Sagwan trees (one per 10 × 10 ft)`}
      </p>
    </div>
  );
}

/* The calculator ----------------------------------------------------------------------------- */

export function DoubleGrowthCalculator() {
  const rootRef = useRef<HTMLElement>(null);
  const [sqft, setSqft] = useState<number>(CALC.defaultParcelSqft);
  const [text, setText] = useState(String(CALC.defaultParcelSqft));
  const [error, setError] = useState<string | null>(null);
  const [focused, setFocused] = useState(false);
  const [armed, setArmed] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [metric, setMetric] = useState<Metric>("value");
  const [animate, setAnimate] = useState(true);

  const r = calculate(sqft);
  const harvestPrice = priceAt(CALC.harvestYear);

  // Typing settles after 250 ms; under the minimum, the last valid results stay on screen.
  useEffect(() => {
    const id = window.setTimeout(() => {
      const raw = text.replace(/[^\d]/g, "");
      const c = checkParcel(raw === "" ? null : Number(raw));
      if (!c.ok) {
        setError(c.error);
        return;
      }
      setError(null);
      setSqft(c.sqft);
    }, 250);
    return () => window.clearTimeout(id);
  }, [text]);

  const choose = (v: number) => {
    const c = checkParcel(v);
    if (!c.ok) return;
    setError(null);
    setSqft(c.sqft);
    setText(String(c.sqft));
  };

  // The figures count up once, when the section first comes into view.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (reducedMotion()) {
      setAnimate(false);
      setRevealed(true);
      return;
    }
    setArmed(true);
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e?.isIntersecting) return;
        io.disconnect();
        setRevealed(true);
      },
      { threshold: 0.15 },
    );
    io.observe(root);
    return () => io.disconnect();
  }, []);

  const value = useCountUp(r.timberValue, revealed);
  const trees = useCountUp(r.trees, revealed);
  const cuft = useCountUp(r.timberCuft, revealed);
  const land = useCountUp(r.landGrowth, revealed);

  const summary = `${formatCount(sqft)} sq ft: ${formatCount(r.trees)} Sagwan trees, ${formatCount(
    r.timberCuft,
  )} cubic feet of timber, valued ${spokenRupees(r.timberValue)} at year ${CALC.harvestYear}; land growth about ${Math.round(
    r.landGrowth,
  )} percent.`;

  const inputId = useId();
  const helpId = useId();
  const rise = (d: number) => ({ "--d": d }) as CSSProperties;

  return (
    <section
      ref={rootRef}
      className={`dg ${armed ? "is-armed" : ""} ${revealed ? "is-revealed" : ""}`}
      aria-labelledby="dg-title"
    >
      <div className="dg-wrap">
        {/* Heading */}
        <header className="dg-head">
          <p className="dg-eyebrow dg-rise" style={rise(0)}>
            Double Growth Calculator
          </p>
          <h2 id="dg-title" className="dg-title dg-rise" style={rise(1)}>
            One Land. <em>Two Growths.</em>
          </h2>
          <p className="dg-sub dg-rise" style={rise(2)}>
            Choose your land size and see the Sagwan trees it holds, the timber they give in{" "}
            {CALC.harvestYear} years, and how your land grows alongside.
          </p>
        </header>

        <div className="dg-main">
          {/* Land size + the land, drawn as trees */}
          <div className="dg-panel dg-rise" style={rise(3)}>
            <label htmlFor={inputId} className="dg-label">
              Your land
            </label>
            <div className={`dg-field ${error ? "is-error" : ""}`}>
              <button
                type="button"
                className="dg-step"
                onClick={() => choose(Math.max(CALC.minParcelSqft, sqft - CALC.stepSqft))}
                aria-label={`Decrease by ${formatCount(CALC.stepSqft)} sq ft`}
                disabled={sqft <= CALC.minParcelSqft && !error}
              >
                <Minus size={18} />
              </button>
              <input
                id={inputId}
                type="text"
                inputMode="numeric"
                autoComplete="off"
                value={focused || text === "" ? text : formatCount(Number(text.replace(/[^\d]/g, "")) || 0)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                onChange={(e) => setText(e.target.value.replace(/[^\d]/g, "").slice(0, 9))}
                aria-invalid={Boolean(error)}
                aria-describedby={helpId}
                className="dg-field__input"
              />
              <span className="dg-field__unit" aria-hidden="true">
                sq ft
              </span>
              <button
                type="button"
                className="dg-step"
                onClick={() => choose(Math.min(CALC.maxParcelSqft, sqft + CALC.stepSqft))}
                aria-label={`Increase by ${formatCount(CALC.stepSqft)} sq ft`}
              >
                <Plus size={18} />
              </button>
            </div>
            <p id={helpId} className={`dg-help ${error ? "is-error" : ""}`} role={error ? "alert" : undefined}>
              {error ?? `Minimum ${formatCount(CALC.minParcelSqft)} sq ft`}
            </p>
            <div className="dg-presets" role="group" aria-label="Quick land sizes">
              {CALC.presets.map((p) => (
                <button
                  key={p}
                  type="button"
                  aria-pressed={sqft === p && !error}
                  onClick={() => choose(p)}
                  className="dg-pill"
                >
                  {presetLabel(p)}
                </button>
              ))}
            </div>

            <div className="dg-panel__divider" />
            <p className="dg-label">Your land, planted</p>
            <TreePlot trees={r.trees} />
          </div>

          {/* The answer */}
          <div className="dg-hero dg-rise" style={rise(4)}>
            <p className="dg-sr" aria-live="polite" aria-atomic="true">
              {summary}
            </p>
            <div aria-hidden="true">
              <p className="dg-hero__k">Timber value at year {CALC.harvestYear}</p>
              <p className="dg-hero__v">{formatRupees(value)}</p>
              <p className="dg-hero__sub">
                at about ₹{formatCount(harvestPrice)} per cu ft in year {CALC.harvestYear}
              </p>

              <div className="dg-kpis">
                <div className="dg-kpi">
                  <TreePine size={18} className="dg-kpi__icon" />
                  <p className="dg-kpi__n">{formatCount(trees)}</p>
                  <p className="dg-kpi__l">Sagwan trees</p>
                </div>
                <div className="dg-kpi">
                  <Sprout size={18} className="dg-kpi__icon" />
                  <p className="dg-kpi__n">{formatCount(cuft)}</p>
                  <p className="dg-kpi__l">cu ft timber</p>
                </div>
                <div className="dg-kpi">
                  <TrendingUp size={18} className="dg-kpi__icon dg-kpi__icon--land" />
                  <p className="dg-kpi__n">{formatPct(land)}</p>
                  <p className="dg-kpi__l">land growth</p>
                </div>
              </div>

              {/* The maths, in the open */}
              <div className="dg-formula">
                <p className="dg-formula__title">How we get there</p>
                <div className="dg-formula__row">
                  <span className="dg-chip">{formatCount(sqft)} sq ft</span>
                  <span className="dg-op">÷</span>
                  <span className="dg-chip dg-chip--dim">10 × 10 ft</span>
                  <span className="dg-op">=</span>
                  <span className="dg-chip dg-chip--hi">{formatCount(r.trees)} trees</span>
                </div>
                <div className="dg-formula__row">
                  <span className="dg-chip">{formatCount(r.trees)} trees</span>
                  <span className="dg-op">×</span>
                  <span className="dg-chip dg-chip--dim">{CALC.timberCuftPerTree} cu ft</span>
                  <span className="dg-op">=</span>
                  <span className="dg-chip dg-chip--hi">{formatCount(r.timberCuft)} cu ft</span>
                </div>
                <div className="dg-formula__row">
                  <span className="dg-chip">{formatCount(r.timberCuft)} cu ft</span>
                  <span className="dg-op">×</span>
                  <span className="dg-chip dg-chip--dim">₹{formatCount(harvestPrice)}</span>
                  <span className="dg-op">=</span>
                  <span className="dg-chip dg-chip--gold">{formatRupees(r.timberValue)}</span>
                </div>
              </div>
            </div>

            <a href={BOOK_HREF} className="dg-btn">
              Book a site visit
              <ArrowRight size={18} />
            </a>
            <p className="dg-hero__fine">
              Estimates, not guarantees. Prices and land values vary by location; harvest, transport and
              management costs are not included.
            </p>
          </div>
        </div>

        {/* Timber, year by year */}
        <div className="dg-card dg-card--chart dg-rise" style={rise(5)}>
          <div className="dg-card__head">
            <div>
              <p className="dg-card__eyebrow">Growth 1 · Timber</p>
              <h3 className="dg-card__title">
                {metric === "value" ? "Timber value, year by year" : "Timber volume, year by year"}
              </h3>
              <p className="dg-card__sub">
                Sagwan grows slowly at first, then fast in the middle years, reaching{" "}
                {formatCount(r.timberCuft)} cu ft by year {CALC.harvestYear}.
              </p>
            </div>
            <div className="dg-toggle" role="group" aria-label="Show timber as">
              <button type="button" aria-pressed={metric === "value"} onClick={() => setMetric("value")}>
                Value (₹)
              </button>
              <button type="button" aria-pressed={metric === "volume"} onClick={() => setMetric("volume")}>
                Volume (cu ft)
              </button>
            </div>
          </div>
          <div className="dg-chart">
            {revealed && <TimberChart series={r.series} metric={metric} animate={animate} />}
          </div>
        </div>

        <div className="dg-duo">
          {/* Land growth */}
          <div className="dg-card dg-rise" style={rise(6)}>
            <p className="dg-card__eyebrow dg-card__eyebrow--land">Growth 2 · Land</p>
            <div className="dg-card__statrow">
              <h3 className="dg-card__title">Land value growth</h3>
              <p className="dg-card__stat">{formatPct(r.landGrowth)}</p>
            </div>
            <p className="dg-card__sub">
              About {Math.round(CALC.landGrowth * 100)}% a year near Indore, compounding over{" "}
              {CALC.harvestYear} years.
            </p>
            <div className="dg-chart dg-chart--sm">
              {revealed && <LandChart series={r.series} animate={animate} />}
            </div>
          </div>

          {/* Sagwan vs traditional */}
          <div className="dg-card dg-rise" style={rise(7)}>
            <p className="dg-card__eyebrow">Time to harvest</p>
            <h3 className="dg-card__title">Redwood Sagwan vs traditional teak</h3>
            <p className="dg-card__sub">Same timber, in well under half the time.</p>
            <div className="dg-race">
              <div className="dg-race__row">
                <div className="dg-race__meta">
                  <span>Redwood Biotech Sagwan</span>
                  <strong>{CALC.harvestYear} years</strong>
                </div>
                <div className="dg-race__track">
                  <span
                    className="dg-race__bar dg-race__bar--rw"
                    style={{ "--w": `${(CALC.harvestYear / CALC.traditionalYears) * 100}%` } as CSSProperties}
                  />
                </div>
              </div>
              <div className="dg-race__row">
                <div className="dg-race__meta">
                  <span>Traditional teak</span>
                  <strong>{CALC.traditionalYears}+ years</strong>
                </div>
                <div className="dg-race__track">
                  <span className="dg-race__bar dg-race__bar--tr" style={{ "--w": "100%" } as CSSProperties} />
                </div>
              </div>
            </div>
            <p className="dg-race__note">
              <Clock size={16} aria-hidden="true" />
              {CALC.traditionalYears - CALC.harvestYear}+ years sooner to your first harvest
            </p>
          </div>
        </div>

        {/* Where the numbers come from, in plain words */}
        <div className="dg-how">
          <p className="dg-how__title dg-rise" style={rise(8)}>
            How it works, in simple words
          </p>
          <ol className="dg-steps">
            {STEPS.map((s, i) => (
              <li key={s.title} className="dg-stepcard dg-rise" style={rise(9 + i)}>
                <span className="dg-stepcard__icon" aria-hidden="true">
                  <s.icon size={20} />
                </span>
                <span className="dg-stepcard__n" aria-hidden="true">
                  {i + 1}
                </span>
                <h3 className="dg-stepcard__title">{s.title}</h3>
                <p className="dg-stepcard__text">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
