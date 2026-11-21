/*
 * Redwood Biotech "Double Growth" calculator: the formulas, as pure functions (no UI), so they can
 * be unit-tested on their own. Numbers are rounded only for display, never mid-calculation.
 */

import { CALC } from "./redwoodCalculator.config";

export type ParcelCheck = { ok: true; sqft: number } | { ok: false; error: string };

/** Validates a parcel size: at least the minimum, capped silently at the maximum. */
export function checkParcel(input: number | null | undefined): ParcelCheck {
  if (input == null || !Number.isFinite(input) || input < CALC.minParcelSqft) {
    return { ok: false, error: `Minimum parcel is ${formatCount(CALC.minParcelSqft)} sq ft` };
  }
  return { ok: true, sqft: Math.min(input, CALC.maxParcelSqft) };
}

/** One tree per 100 sq ft (10 × 10 ft). No mortality deduction: failed saplings are replanted. */
export const treesFor = (sqft: number) => Math.floor(sqft / CALC.sqftPerTree);

export const timberCuftFor = (sqft: number) => treesFor(sqft) * CALC.timberCuftPerTree;

/**
 * Timber price in ₹ per cu ft in year t: today's price at t = 0, exactly the harvest price at
 * t = 12, growing by the same percentage every year in between.
 */
export const priceAt = (t: number) =>
  CALC.timberPricePerCuft *
  (CALC.timberPriceAtHarvest / CALC.timberPricePerCuft) ** (t / CALC.harvestYear);

/** Timber value at harvest (year 12), in ₹. */
export const timberValueFor = (sqft: number) => timberCuftFor(sqft) * priceAt(CALC.harvestYear);

/** Land value growth after t years, in percent (unrounded). */
export const landGrowthPct = (t: number = CALC.harvestYear) => ((1 + CALC.landGrowth) ** t - 1) * 100;

/** The natural S-curve of tree growth. */
const sigma = (t: number) => 1 / (1 + Math.exp(-CALC.growthCurveK * (t - CALC.growthCurveMidYear)));

/** Share of the year-12 timber volume grown by year t: 0 at t = 0, 1 at t = 12. */
export const growthShare = (t: number) =>
  (sigma(t) - sigma(0)) / (sigma(CALC.harvestYear) - sigma(0));

/** Timber value in year t (₹), following the S-curve and the timber price of that year. */
export const timberValueAt = (sqft: number, t: number) =>
  timberCuftFor(sqft) * growthShare(t) * priceAt(t);

export type YearPoint = { year: number; timber: number; cuft: number; land: number };

/** Year-by-year series for the charts, t = 0 … 12. Land is a whole percent. */
export function seriesFor(sqft: number): YearPoint[] {
  return Array.from({ length: CALC.harvestYear + 1 }, (_, year) => ({
    year,
    timber: timberValueAt(sqft, year),
    cuft: timberCuftFor(sqft) * growthShare(year),
    land: Math.round(landGrowthPct(year)),
  }));
}

/** Short axis labels: ₹50 L, ₹1.2 Cr. */
export function formatRupeesShort(v: number) {
  if (v >= 1e7) return `₹${+(v / 1e7).toFixed(1)} Cr`;
  if (v >= 1e5) return `₹${Math.round(v / 1e5)} L`;
  if (v >= 1e3) return `₹${Math.round(v / 1e3)}K`;
  return `₹${Math.round(v)}`;
}

/** Every figure the calculator shows, for one parcel. */
export function calculate(sqft: number) {
  return {
    sqft,
    trees: treesFor(sqft),
    timberCuft: timberCuftFor(sqft),
    timberValue: timberValueFor(sqft),
    landGrowth: landGrowthPct(),
    series: seriesFor(sqft),
  };
}
export type CalcResult = ReturnType<typeof calculate>;

/* Formatting (Indian system) ------------------------------------------------------------------ */

const enIN = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 });

/** Counts, e.g. 4,800 and 34,800. */
export const formatCount = (n: number) => enIN.format(Math.round(n));

/** ₹ in crore (2 decimals) or lakh (1 decimal), else whole rupees. */
export function formatRupees(v: number) {
  if (v >= 1e7) return `₹${(v / 1e7).toFixed(2)} Cr`;
  if (v >= 1e5) return `₹${(v / 1e5).toFixed(1)} L`;
  return `₹${enIN.format(Math.round(v))}`;
}

/** Spoken form of the rupee figure, for screen readers. */
export function spokenRupees(v: number) {
  if (v >= 1e7) return `about ₹${(v / 1e7).toFixed(2)} crore`;
  if (v >= 1e5) return `about ₹${(v / 1e5).toFixed(1)} lakh`;
  return `about ₹${enIN.format(Math.round(v))}`;
}

/** Land growth, e.g. +181%. */
export const formatPct = (p: number) => `+${Math.round(p)}%`;

/** "Today" for year 0, otherwise "Yr 7" / "Year 7". */
export const yearLabel = (t: number, long = false) => (t === 0 ? "Today" : long ? `Year ${t}` : `Yr ${t}`);
