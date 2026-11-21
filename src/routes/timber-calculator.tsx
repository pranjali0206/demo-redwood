import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { DoubleGrowthCalculator } from "@/components/calculator/DoubleGrowthCalculator";

/** The Double Growth calculator on its own page (the hero's "Timber Calculator" button). */
export const Route = createFileRoute("/timber-calculator")({
  head: () => ({
    meta: [
      { title: "Double Growth Calculator — Redwood Biotech" },
      {
        name: "description",
        content:
          "One Land. Two Growths. See how many Sagwan trees your parcel holds, the timber they could give at year 12, and how land value has grown.",
      },
      { property: "og:title", content: "Double Growth Calculator — Redwood Biotech" },
      {
        property: "og:description",
        content: "Choose your land parcel and see your Sagwan trees, timber at year 12 and land value growth.",
      },
    ],
  }),
  component: TimberCalculatorPage,
});

function TimberCalculatorPage() {
  return (
    <div className="min-h-screen bg-[#faf8f3]">
      <Navbar heroTone="light" />
      {/* Room for the fixed site bar above the section. */}
      <main className="pt-16">
        <DoubleGrowthCalculator />
      </main>
      <Footer />
    </div>
  );
}
