/*
 * Redwood Biotech "Double Growth" calculator: every business constant lives here, and only here.
 * Visitors cannot change any of these; the calculator only lets them choose a parcel size.
 */

export const CALC = {
  /** Smallest parcel Redwood sells, in sq ft. */
  minParcelSqft: 6000,
  /** Largest parcel the calculator accepts; larger entries are capped silently. */
  maxParcelSqft: 1_000_000,
  /** Step for the − / + buttons, in sq ft. */
  stepSqft: 1000,
  /** 10 × 10 ft spacing: one tree per 100 sq ft. */
  sqftPerTree: 100,
  /** Redwood Biotech estimate of timber per tree at harvest (year 12), in cu ft. */
  timberCuftPerTree: 80,
  harvestYear: 12,
  /** Traditional Sagwan, shown as "30+ yrs". */
  traditionalYears: 30,
  /** Timber price today, ₹ per cu ft. */
  timberPricePerCuft: 1200,
  /** Timber price at harvest (year 12), ₹ per cu ft. Years in between rise steadily towards it. */
  timberPriceAtHarvest: 5000,
  /** Yearly land value growth, based on past Indore trends. */
  landGrowth: 0.09,
  /** Timber growth S-curve: steepness and midpoint year. */
  growthCurveK: 0.6,
  growthCurveMidYear: 7,
  /** Default parcel, and the preset pills (the last one is labelled "1 acre"). */
  defaultParcelSqft: 6000,
  presets: [6000, 12000, 24000, 43560],
  acreSqft: 43560,
} as const;
