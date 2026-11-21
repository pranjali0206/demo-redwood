import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { Reveal } from "@/components/site/Reveal";
import { CountUp } from "@/components/site/CountUp";

export const Route = createFileRoute("/agroforestry")({
  head: () => ({
    meta: [
      { title: "What is Biotechnology? — Redwood Biotech" },
      {
        name: "description",
        content:
          "From ancient bread-making to engineered teak — how biotechnology is reshaping forestry and the Genetically Engineered Hi-Tech Sagwan investment.",
      },
      { property: "og:title", content: "What is Biotechnology? — Redwood Biotech" },
      {
        property: "og:description",
        content:
          "From ancient bread-making to engineered teak — how biotechnology is reshaping forestry.",
      },
    ],
  }),
  component: AgroforestryPage,
});

const pills = [
  { icon: "🌿", label: "Plant Breeding", desc: "Selecting best traits across generations" },
  { icon: "🧬", label: "Tissue Culture", desc: "Growing plants from single cells in labs" },
  { icon: "🔬", label: "Genetic Engineering", desc: "Editing DNA for specific outcomes" },
  { icon: "⚗️", label: "Fermentation Science", desc: "Using microbes to create products" },
];

const eras = [
  { n: "I", title: "Ancient", year: "8000 BC", desc: "Fermentation & selective breeding" },
  { n: "II", title: "Industrial", year: "1800s", desc: "Pasteurization, germ theory" },
  { n: "III", title: "Molecular", year: "1950s–90s", desc: "DNA discovery, PCR, cloning" },
  { n: "IV", title: "Precision", year: "2000s+", desc: "CRISPR, tissue culture, transgenesis" },
];

const examples = [
  {
    emoji: "🍅",
    bg: "bg-red-100",
    tag: "Vegetable · Hybrid",
    title: "The Hybrid Tomato",
    body: "A standard tomato takes 70–80 days to fruit, is susceptible to blight, and has a shelf life of less than a week. Biotechnology created hybrid varieties that fruit in 55 days, resist disease, weigh 30% more, and last 3× longer in storage. Today, over 90% of commercially grown tomatoes are hybrid or biotech-enhanced.",
    stats: [
      { v: "55 days", l: "Fruit time" },
      { v: "3× longer", l: "Shelf life" },
      { v: "90%", l: "Market share" },
    ],
  },
  {
    emoji: "🥦",
    bg: "bg-purple-50",
    tag: "Vegetable · Tissue Culture",
    title: "The Tissue-Culture Cauliflower",
    body: "Wild cauliflower is an irregular, slow-maturing crop. Tissue culture allowed scientists to produce disease-free, uniform plants with consistent head size and a 40% higher yield per acre. Every plant in a tissue-cultured cauliflower batch is genetically identical to the superior mother plant — no surprises, no weak specimens.",
    stats: [
      { v: "40% more", l: "Yield per acre" },
      { v: "100%", l: "Uniform heads" },
      { v: "Disease-free", l: "Every plant" },
    ],
  },
  {
    emoji: "🌲",
    bg: "bg-green-50",
    tag: "Forestry · Genetic Engineering",
    title: "Faster-Growing Forest Trees",
    body: "Eucalyptus naturally takes 12–15 years to reach harvestable size. Genetically engineered eucalyptus and poplar trees used in paper pulp and biomass industries now reach maturity in 5–7 years — with greater cellulose content, straighter trunks, and uniform density. This is the same principle applied to Sagwan teak by Redwood Biotech.",
    stats: [
      { v: "5–7 yrs", l: "Vs 12–15 natural" },
      { v: "Higher", l: "Cellulose yield" },
      { v: "Uniform", l: "Trunk density" },
    ],
  },
];

const compareRows = [
  ["Harvest time", "25–30 years", "12–18 years"],
  ["Yield at 8 years", "8 cft/tree", "25 cft/tree"],
  ["Yield at 18 years", "60 cft/tree", "150 cft/tree"],
  ["Termite resistance", "Low", "High (engineered)"],
  ["Price per cft", "1×", "3×"],
  ["Branch structure", "Many branches", "Minimal (Grade A timber)"],
];

function AgroforestryPage() {
  return (
    <SiteLayout>
      {/* SECTION 1 — HERO */}
      <section className="bg-green-900 px-6 py-16 md:py-24">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-widest text-amber-300">
              The Science of Life Itself
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-6 font-serif text-5xl text-balance text-white md:text-7xl">
              What is Biotechnology?
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-2xl text-lg text-green-100/80">
              From ancient bread-making to engineered teak that matures in half the time —
              biotechnology is the oldest science made precise by modern tools.
            </p>
          </Reveal>
        </div>
      </section>

      {/* SECTION 2 — WHAT IS BIOTECHNOLOGY */}
      <section className="bg-white px-6 py-14 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-16 md:grid-cols-2 md:gap-20">
          <Reveal>
            <div>
              <h2 className="font-serif text-4xl text-green-900">Life, directed by science.</h2>
              <p className="mt-6 text-stone-700 leading-relaxed">
                Biotechnology is the use of living organisms, cells, or biological systems to
                develop products that improve our lives. It is not a modern invention — humans have
                been using biology for thousands of years. Yogurt. Bread. Wine. Beer. These are all
                the result of controlled biological processes. What modern science added is
                precision: we can now choose exactly which traits a plant carries, which
                characteristics it expresses, and how fast it grows.
              </p>
              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {pills.map((p) => (
                  <div
                    key={p.label}
                    className="rounded-lg border-l-4 bg-stone-50 p-4"
                    style={{ borderLeftColor: "var(--brand-red)" }}
                  >
                    <div className="font-medium text-green-900">
                      <span className="mr-2">{p.icon}</span>
                      {p.label}
                    </div>
                    <div className="mt-1 text-sm text-stone-600">{p.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {eras.map((e) => (
                <div
                  key={e.n}
                  className="rounded-xl border-l-4 border-green-700 bg-green-50 p-6"
                >
                  <div className="font-serif text-3xl text-amber-700">{e.n}</div>
                  <div className="mt-3 text-xs uppercase tracking-widest text-green-700">
                    Era {e.n} · {e.year}
                  </div>
                  <div className="mt-1 font-serif text-xl text-green-900">{e.title}</div>
                  <p className="mt-2 text-sm text-stone-600">{e.desc}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* SECTION 3 — REAL-WORLD EXAMPLES */}
      <section className="bg-stone-100 px-6 py-14 md:py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h2 className="text-center font-serif text-5xl text-green-900">
              Biotechnology Already Feeds the World
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-stone-600">
              Before we talk about trees, look at what the same science has done for food.
            </p>
          </Reveal>

          <div className="mt-16 space-y-8">
            {examples.map((card, i) => (
              <Reveal key={card.title} delay={i * 0.1}>
                <div className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-md md:flex-row">
                  <div
                    className={`flex items-center justify-center ${card.bg} p-8 md:w-48 md:flex-shrink-0`}
                  >
                    <span className="text-8xl">{card.emoji}</span>
                  </div>
                  <div className="flex-1 p-8 md:p-10">
                    <span className="inline-block rounded bg-amber-100 px-2 py-1 text-xs font-medium uppercase tracking-wide text-amber-800">
                      {card.tag}
                    </span>
                    <h3 className="mt-3 font-serif text-2xl text-green-900">{card.title}</h3>
                    <p className="mt-3 text-sm text-stone-700 leading-relaxed">{card.body}</p>
                    <div className="mt-6 grid grid-cols-3 gap-4 border-t border-stone-200 pt-5">
                      {card.stats.map((s) => (
                        <div key={s.l}>
                          <div className="font-serif text-2xl font-bold text-green-900">{s.v}</div>
                          <div className="mt-1 text-xs text-stone-500">{s.l}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 — THE BRIDGE */}
      <section className="px-6 py-16 md:py-24" style={{ backgroundColor: "#0a2818" }}>
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-widest text-amber-400">
              Now imagine the same science applied to the world's most valuable timber.
            </p>
          </Reveal>
          <motion.h2
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-6 max-w-3xl font-serif text-5xl text-white md:text-6xl"
          >
            If biotechnology can double a tomato's shelf life — what can it do to a teak tree?
          </motion.h2>
          <Reveal delay={0.15}>
            <p className="mx-auto mt-8 max-w-2xl text-green-100/80">
              Sagwan (teak) has always been India's most prized timber. Its natural growth cycle
              takes 25–30 years. Its market price has risen 12% year-on-year for the last decade.
              What if you could cut that wait in half — and double the yield?
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <div className="mt-10">
              <Link
                to="/model"
                className="inline-flex items-center gap-2 rounded-md bg-amber-600 px-8 py-4 text-lg font-semibold text-white transition hover:bg-amber-700"
              >
                Discover the Redwood Biotech Model <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SECTION 5 — HI-TECH SAGWAN TEASER */}
      <section className="bg-white px-6 py-14 md:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-widest text-green-700">
              Genetically Engineered Hi-Tech Sagwan · Cloned & Engineered
            </p>
            <h2 className="mt-4 font-serif text-5xl text-green-900">
              The Tree That Changed the Numbers
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-stone-600">
              Normal teak grows slowly, branches heavily, and needs 25–30 years before it yields
              meaningful timber. Genetically Engineered Hi-Tech Sagwan — produced through 13 months and 20 days of sterile
              tissue culture — grows at 3× the speed, produces minimal branches (meaning
              higher-grade timber), and is ready in 12–18 years.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-12 overflow-hidden rounded-xl border border-stone-200">
              <table className="w-full text-left">
                <thead className="bg-green-900 text-white">
                  <tr>
                    <th className="px-6 py-4 text-sm font-semibold text-amber-300">Parameter</th>
                    <th className="px-6 py-4 text-sm font-semibold text-amber-300">Normal Teak</th>
                    <th className="px-6 py-4 text-sm font-semibold text-amber-300">
                      Genetically Engineered Hi-Tech Sagwan
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((row) => (
                    <tr key={row[0]} className="border-t border-stone-200">
                      <td className="px-6 py-4 text-sm font-medium text-green-900">{row[0]}</td>
                      <td className="px-6 py-4 text-sm text-stone-600">{row[1]}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-green-900">{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-12 grid grid-cols-1 gap-6 rounded-2xl bg-green-50 p-8 sm:grid-cols-3">
              <div>
                <div className="font-serif text-4xl font-bold text-green-900">
                  <CountUp to={150} suffix=" cft" />
                </div>
                <div className="mt-2 text-sm text-stone-600">Yield at 18 years</div>
              </div>
              <div>
                <div className="font-serif text-4xl font-bold text-green-900">
                  <CountUp to={3} suffix="×" />
                </div>
                <div className="mt-2 text-sm text-stone-600">Price premium over normal teak</div>
              </div>
              <div>
                <div className="font-serif text-4xl font-bold text-green-900">
                  <CountUp to={12} suffix=" yrs" />
                </div>
                <div className="mt-2 text-sm text-stone-600">Minimum harvest window</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SECTION 6 — FINAL CTA */}
      <section className="bg-stone-100 px-6 py-14 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <h2 className="font-serif text-4xl text-green-900">
              Ready to understand the full investment model?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-stone-600">
              See how Redwood Biotech structures plantation investment — from land acquisition to
              harvest returns.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/model"
                className="inline-flex items-center gap-2 rounded-md bg-green-900 px-6 py-3 font-medium text-white transition hover:bg-green-800"
              >
                Explore the Model <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/investment"
                className="inline-flex items-center rounded-md border border-green-900 px-6 py-3 font-medium text-green-900 transition hover:bg-green-50"
              >
                View Investment Plans
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </SiteLayout>
  );
}
