import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SiteLayout } from "@/components/site/Layout";
import { Reveal, CountUp } from "@/components/site/Reveal";
import { Check, Dna, FlaskConical, Sprout, Trees, ArrowRight } from "lucide-react";
import labImg from "@/assets/lab-tissue.jpg";
import fieldImg from "@/assets/plantation-field.jpg";

export const Route = createFileRoute("/agroforestry")({
  head: () => ({
    meta: [
      { title: "The Science of Growing Wealth — Redwood Biotech" },
      { name: "description", content: "How tissue culture biotechnology engineers Sagwan teak that outperforms every natural timber on the planet." },
      { property: "og:title", content: "Agroforestry & Biotechnology — Redwood Biotech" },
      { property: "og:description", content: "Deep dive into the science: tissue culture, cultivation, soil reports, and yield." },
    ],
    links: [{ rel: "canonical", href: "/agroforestry" }],
  }),
  component: Page,
});

function Page() {
  return (
    <SiteLayout>
      <section className="bg-green-900 text-white pt-28 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-amber-300 font-semibold">Agroforestry & Biotechnology</p>
          <h1 className="mt-4 font-serif text-4xl sm:text-6xl font-bold text-balance">The Science of Growing Wealth</h1>
          <p className="mt-5 text-lg text-green-100/85 max-w-3xl mx-auto">
            How genetically engineered Sagwan teak outperforms every natural timber on the planet.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-green-900">What is Biotechnology?</h2>
            <p className="mt-5 text-stone-700 leading-relaxed">
              Biotechnology is the use of living systems and organisms — and the tools of modern science — to develop or
              make products. In agriculture, it allows us to engineer plants that are stronger, disease-resistant, and
              dramatically more productive than their natural counterparts.
            </p>
            <div className="mt-6 grid sm:grid-cols-2 gap-3">
              {["DNA Editing", "Cloning", "Recombinant DNA", "Tissue Culture"].map((t) => (
                <div key={t} className="p-4 rounded-lg bg-stone-50 border-l-4 border-[var(--brand-red)] font-semibold text-stone-800">{t}</div>
              ))}
            </div>
            <div className="mt-6 p-5 rounded-lg bg-green-50 border border-green-200">
              <p className="font-serif text-green-900"><strong>Gene</strong> is the blueprint. <strong>Cell</strong> is the brick. <strong>Tissue</strong> is the wall. <strong>Plant</strong> is the building.</p>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <img src={labImg} alt="Tissue culture laboratory" loading="lazy" className="w-full h-[480px] object-cover rounded-2xl shadow-xl" />
          </Reveal>
        </div>
      </section>

      <section className="py-20 bg-stone-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center">
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-green-900">The 8-Step Cloning Process</h2>
            <p className="mt-3 text-stone-600">From mother plant to field-ready sapling — 13 months and 20 days under sterile science.</p>
          </Reveal>
          <div className="mt-14 relative">
            <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-green-700/30" />
            {[
              { Icon: Dna, t: "Mother Plant Selection", d: "Elite mother plants are selected from 8 countries for superior genetic traits." },
              { Icon: FlaskConical, t: "Gene Gathering", d: "Tissue samples are extracted under sterile conditions for cloning." },
              { Icon: Dna, t: "Transgenesis", d: "Desired traits are introduced through controlled genetic transfer." },
              { Icon: Sprout, t: "Explant Process", d: "Plant tissue is isolated and prepared for culture initiation." },
              { Icon: FlaskConical, t: "Media Preparation", d: "Custom nutrient media is formulated for optimum cellular growth." },
              { Icon: Sprout, t: "Inoculation", d: "Explants are placed into the culture media in a sterile chamber." },
              { Icon: FlaskConical, t: "Incubation", d: "Growth is monitored over 13 months 20 days in temperature-controlled rooms." },
              { Icon: Trees, t: "Hardening", d: "Primary & secondary hardening prepare the plant for the open field." },
            ].map((s, i) => (
              <Reveal key={s.t} delay={i * 0.05}>
                <div className={`md:grid md:grid-cols-2 md:gap-10 items-center mb-8 ${i % 2 ? "md:[direction:rtl]" : ""}`}>
                  <div className="md:[direction:ltr] p-6 rounded-xl bg-white shadow-md border border-stone-200">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-green-900 text-amber-400 flex items-center justify-center"><s.Icon size={20} /></div>
                      <span className="text-xs uppercase tracking-widest text-stone-500">Step {i + 1}</span>
                    </div>
                    <h3 className="mt-3 font-serif text-xl font-bold text-green-900">{s.t}</h3>
                    <p className="mt-2 text-stone-700 text-sm">{s.d}</p>
                  </div>
                  <div className="hidden md:block" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center max-w-3xl mx-auto">
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-green-900">Scientific Cultivation</h2>
            <p className="mt-3 text-stone-600">Every plant on every acre follows the same disciplined protocol.</p>
          </Reveal>
          <div className="mt-12 grid md:grid-cols-2 gap-6">
            {[
              { t: "Soil & Water Testing", d: "Before any pit is dug, soil chemistry and water salinity are analysed." },
              { t: "Pit Digging Formula", d: "Pits are dug to 5ft depth × 18 inches square — engineered for root expansion." },
              { t: "Carbendazim Spray", d: "Anti-fungal treatment applied to every pit before planting." },
              { t: "Soil Composition", d: "Red soil 20% · Alluvial 20% · Local 20% · River sand 20% · Organic compost 20%." },
              { t: "Per-Pit Additives", d: "Neem cake 1kg · Single super phosphate 300gm · Humic acid 50gm." },
              { t: "24×7 Water Management", d: "Drip irrigation calibrated and monitored continuously for 4,380 days." },
              { t: "144-Month Fertilizer Schedule", d: "A defined nutrition plan for every month of the 12-year cycle." },
              { t: "Pesticide & Insecticide", d: "Targeted treatments applied seasonally to protect yield." },
              { t: "Quarterly Soil Analysis", d: "Lab reports every quarter inform the next cycle of nutrition." },
              { t: "Weed Control & Expert Supervision", d: "Agroforestry experts conduct on-ground inspections every month." },
            ].map((s, i) => (
              <Reveal key={s.t} delay={i * 0.04}>
                <div className="p-6 rounded-xl bg-stone-50 border border-stone-200 hover:border-green-700/40 transition-colors">
                  <h3 className="font-serif text-lg font-bold text-green-900">{s.t}</h3>
                  <p className="mt-1.5 text-sm text-stone-700">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-stone-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center">
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-green-900">Soil & Lab Reports</h2>
            <p className="mt-3 text-stone-600 italic">"We test before we plant." — SAIFUNIQUE Certified Analysis</p>
          </Reveal>
          <Reveal delay={0.1} className="mt-10">
            <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-md">
              <table className="w-full text-sm">
                <thead className="bg-green-900 text-white">
                  <tr><th className="text-left px-6 py-4 font-serif">Parameter</th><th className="text-left px-6 py-4 font-serif">Result</th></tr>
                </thead>
                <tbody>
                  {[
                    ["pH", "7.88"],
                    ["Electrical Conductivity", "105.3 µS/cm"],
                    ["Nitrogen", "0.042%"],
                    ["Organic Carbon", "2.1%"],
                    ["Potassium", "0.32%"],
                    ["Phosphorus", "22.6 ppm"],
                  ].map(([p, v], i) => (
                    <tr key={p} className={i % 2 ? "bg-stone-50" : ""}>
                      <td className="px-6 py-3.5 text-stone-800">{p}</td>
                      <td className="px-6 py-3.5 font-semibold text-[var(--brand-red)]">{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-20 bg-[color:#0a2818] text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center">
            <h2 className="font-serif text-3xl sm:text-5xl font-bold">Yield Results</h2>
            <p className="mt-3 text-green-100/80">Engineered output, measured in cubic feet per tree.</p>
          </Reveal>
          <div className="mt-14 grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[{ n: 25, y: 8 }, { n: 75, y: 12 }, { n: 150, y: 18 }].map((s) => (
              <Reveal key={s.y}>
                <div className="rounded-xl p-8 bg-white/5 border border-amber-500/30 text-center">
                  <div className="text-amber-400 font-serif text-5xl font-bold"><CountUp to={s.n} /></div>
                  <p className="mt-1 text-amber-100/70 text-sm uppercase tracking-widest">cubic ft</p>
                  <div className="mt-4 h-2 bg-green-800 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: `${(s.n / 150) * 100}%` }} viewport={{ once: true }} transition={{ duration: 1.4, ease: "easeOut" }} className="h-full bg-amber-500" />
                  </div>
                  <p className="mt-3 text-green-200">at {s.y} years</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center">
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-green-900">Genetic vs Normal Teak</h2>
            <p className="mt-3 text-stone-600">The same tree, fundamentally rewritten.</p>
          </Reveal>
          <Reveal delay={0.1} className="mt-10 overflow-x-auto">
            <table className="w-full text-sm bg-stone-50 rounded-2xl overflow-hidden border border-stone-200">
              <thead className="bg-green-900 text-white">
                <tr>
                  <th className="text-left px-5 py-4 font-serif">Parameter</th>
                  <th className="text-left px-5 py-4 font-serif">Normal Teak</th>
                  <th className="text-left px-5 py-4 font-serif text-amber-300">Genetic Teak</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Price", "1×", "3×"],
                  ["Yield at 8 years", "8 cft", "25 cft"],
                  ["Yield at 12 years", "25 cft", "75 cft"],
                  ["Yield at 18 years", "60 cft", "150 cft"],
                  ["Termite resistance", "Low", "High"],
                  ["Plant making time", "60–90 days", "13 months 20 days"],
                  ["Growth speed", "Slow", "Fast"],
                  ["Height consistency", "Variable", "Uniform"],
                  ["Ready for cutting", "25–30 years", "12–18 years"],
                  ["Branches", "Many", "Minimal"],
                ].map(([p, n, g], i) => (
                  <tr key={p} className={i % 2 ? "bg-white" : ""}>
                    <td className="px-5 py-3.5 font-semibold text-stone-800">{p}</td>
                    <td className="px-5 py-3.5 text-stone-600">{n}</td>
                    <td className="px-5 py-3.5 font-semibold text-green-800">{g}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
          <div className="mt-12 text-center">
            <Link to="/investment" className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-amber-700 text-white font-semibold hover:bg-amber-800">
              See Investment Plans <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
