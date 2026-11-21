import { describe, expect, it } from "vitest";
import {
  calculate,
  checkParcel,
  formatCount,
  formatPct,
  formatRupees,
  growthShare,
  landGrowthPct,
  priceAt,
  timberValueAt,
} from "./redwoodCalculator.logic";

describe("Double Growth calculator", () => {
  it.each([
    { sqft: 6000, trees: 60, cuft: 4800, value: "₹2.40 Cr" },
    { sqft: 12000, trees: 120, cuft: 9600, value: "₹4.80 Cr" },
    { sqft: 43560, trees: 435, cuft: 34800, value: "₹17.40 Cr" },
  ])("$sqft sq ft gives $trees trees, $cuft cu ft and $value", ({ sqft, trees, cuft, value }) => {
    const r = calculate(sqft);
    expect(r.trees).toBe(trees);
    expect(r.timberCuft).toBe(cuft);
    expect(formatRupees(r.timberValue)).toBe(value);
    expect(formatPct(r.landGrowth)).toBe("+181%");
  });

  it("values 6,000 sq ft at ₹2,40,00,000 (4,800 cu ft × ₹5,000)", () => {
    expect(Math.round(calculate(6000).timberValue)).toBe(24000000);
  });

  it("rejects parcels under 6,000 sq ft", () => {
    expect(checkParcel(5999)).toEqual({ ok: false, error: "Minimum parcel is 6,000 sq ft" });
    expect(checkParcel(null).ok).toBe(false);
    expect(checkParcel(Number.NaN).ok).toBe(false);
    expect(checkParcel(6000)).toEqual({ ok: true, sqft: 6000 });
  });

  it("caps parcels at 10,00,000 sq ft", () => {
    expect(checkParcel(5_000_000)).toEqual({ ok: true, sqft: 1_000_000 });
  });

  it("follows the S-curve from 0 to 1", () => {
    expect(growthShare(0)).toBe(0);
    expect(growthShare(12)).toBeCloseTo(1, 12);
    expect(growthShare(7)).toBeGreaterThan(0.5);
  });

  it("prices timber at ₹1,200 today and ₹5,000 at year 12", () => {
    expect(priceAt(0)).toBeCloseTo(1200, 6);
    expect(priceAt(12)).toBeCloseTo(5000, 6);
  });

  it("matches the year-7 tooltip for 6,000 sq ft", () => {
    expect(formatPct(landGrowthPct(7))).toBe("+83%");
    expect(formatRupees(timberValueAt(6000, 7))).toBe("₹68.5 L");
  });

  it("formats in the Indian system", () => {
    expect(formatCount(34800)).toBe("34,800");
    expect(formatRupees(8_440_000)).toBe("₹84.4 L");
    expect(formatRupees(12500)).toBe("₹12,500");
  });
});
