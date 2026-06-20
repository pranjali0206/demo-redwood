import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { Reveal, CountUp } from "@/components/site/Reveal";
import { Check, ArrowRight, Leaf, ShieldCheck, Wind, Sparkles, GraduationCap, Heart, Sun, BarChart3, Coins, CircleDollarSign } from "lucide-react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/investment")({
  head: () => ({
    meta: [
      { title: "Investment Plans — Redwood Biotech Sagwan Partnership" },
      { name: "description", content: "75% yield to landowners, 12-year managed partnership. Basic, Immersive, and Operational plans for Sagwan teak plantation." },
      { property: "og:title", content: "Invest in the Ground Beneath India's Future" },
      { property: "og:description", content: "Three plans. One partnership. 12 years of professional plantation management." },
    ],
    links: [{ rel: "canonical", href: "/investment" }],
  }),
  component: Page,
});

function Page() {
  return (
    <SiteLayout>
      <section className="bg-stone-900 text-white pt-28 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-amber-300 font-semibold">Investment Plans</p>
          <h1 className="mt-4 font-serif text-4xl sm:text-6xl font-bold text-balance">
            Invest in the Ground Beneath India's Future.
          </h1>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-green-900">The 75 / 25 Partnership</h2>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-16">
              <div>
                <div className="font-serif text-7xl sm:text-9xl font-bold text-green-700"><CountUp to={75} suffix="%" /></div>
                <p className="mt-2 text-stone-700 font-semibold">To the Landowner</p>
              </div>
              <div className="text-stone-300 text-5xl font-serif">|</div>
              <div>
                <div className="font-serif text-7xl sm:text-9xl font-bold text-stone-400"><CountUp to={25} suffix="%" /></div>
                <p className="mt-2 text-stone-600 font-semibold">To Redwood Biotech</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="mt-10 max-w-3xl mx-auto text-lg text-stone-700">
              75% of all harvest yield goes directly to you, the landowner. We take 25% to cover 12 years of
              professional management — biotechnology, agronomy, supervision, and harvest logistics.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-20 bg-stone-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center">
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-green-900">Why Teak?</h2>
            <p className="mt-3 text-stone-600">Six structural reasons the market keeps buying.</p>
          </Reveal>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { Icon: BarChart3, t: "Huge Import Demand", d: "India imports thousands of crores of teak annually." },
              { Icon: Sun, t: "Drought Resilient", d: "Survives 7–8 months without water." },
              { Icon: Leaf, t: "Animals Don't Eat It", d: "Naturally repels grazing livestock." },
              { Icon: ShieldCheck, t: "Insect & Termite Proof", d: "Among the most durable hardwoods on Earth." },
              { Icon: CircleDollarSign, t: "Appreciating Asset", d: "Teak prices increase materially over time." },
              { Icon: Sparkles, t: "Export Grade", d: "Genetic teak meets international quality standards." },
            ].map(({ Icon, t, d }, i) => (
              <Reveal key={t} delay={i * 0.05}>
                <div className="p-6 rounded-xl bg-white border border-stone-200 h-full">
                  <Icon className="text-[var(--brand-red)]" size={28} />
                  <h3 className="mt-3 font-serif text-lg font-bold text-green-900">{t}</h3>
                  <p className="mt-1.5 text-sm text-stone-700">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center">
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-green-900">Registered Agreement</h2>
            <p className="mt-3 text-stone-600">Eight legal commitments — in writing, signed, registered.</p>
          </Reveal>
          <ul className="mt-10 grid sm:grid-cols-2 gap-4">
            {[
              "12-year registered lease agreement",
              "Forest Department permissions handled",
              "4,380 days of watering management",
              "Monthly nutrition & fertilizer management",
              "75% yield share to the landowner",
              "Quarterly soil analysis & reporting",
              "All manpower & technology covered",
              "Auction & harvest management at maturity",
            ].map((p) => (
              <Reveal key={p}>
                <li className="flex gap-3 p-5 rounded-lg bg-stone-50 border-l-4 border-green-700">
                  <Check className="text-green-700 shrink-0" /> <span className="text-stone-800">{p}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-20 bg-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center">
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-green-900">Three Plans</h2>
            <p className="mt-3 text-stone-600">Choose the level of partnership that fits.</p>
          </Reveal>
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {[
              { n: "Basic", bar: "bg-green-200", f: ["Tissue culture sagwan teak plantation", "Drip irrigation system", "Quarterly soil analysis", "Pesticide & fertilizer management", "75% yield at harvest", "Registered 12-yr agreement"] },
              { n: "Immersive", featured: true, bar: "bg-green-700", f: ["All Basic features", "Landowner login portal", "Plantation progress tracker", "Document download section", "Direct query system", "Quarterly digital reports"] },
              { n: "Operational", bar: "bg-stone-800", f: ["All Immersive features", "Marketing automation", "Lead pipeline management", "Monthly analytics report", "Priority support", "Dedicated relationship manager"] },
            ].map((p, i) => (
              <Reveal key={p.n} delay={i * 0.1}>
                <motion.div whileHover={{ y: -6 }} className={`bg-white rounded-xl overflow-hidden shadow-md flex flex-col h-full ${p.featured ? "ring-2 ring-green-700" : ""}`}>
                  <div className={`h-2 ${p.bar}`} />
                  <div className="p-7 flex flex-col flex-1">
                    <h3 className="font-serif text-2xl font-bold text-green-900">{p.n}</h3>
                    <ul className="mt-5 space-y-2.5 flex-1">
                      {p.f.map((x) => <li key={x} className="flex gap-2 text-sm text-stone-700"><Check size={16} className="mt-0.5 text-green-700 shrink-0" />{x}</li>)}
                    </ul>
                    <Link to="/contact" className="mt-6 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-md bg-green-700 text-white font-semibold hover:bg-green-800">
                      Contact Us <ArrowRight size={16} />
                    </Link>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-amber-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-amber-800 font-semibold">India Timber Imports</p>
            <h2 className="mt-3 font-serif text-3xl sm:text-5xl font-bold text-stone-900">The Market Your Land Can Supply</h2>
          </Reveal>
          <div className="mt-10 grid sm:grid-cols-2 gap-6">
            <Reveal>
              <div className="p-8 rounded-2xl bg-white shadow-md">
                <p className="text-xs uppercase tracking-widest text-stone-500">Total Timber Imports</p>
                <div className="mt-2 font-serif text-3xl sm:text-4xl font-bold text-[var(--brand-red)]">₹ 2,53,56,21,30,000</div>
                <p className="mt-2 text-stone-600 text-sm">per year, into India</p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="p-8 rounded-2xl bg-white shadow-md">
                <p className="text-xs uppercase tracking-widest text-stone-500">Teak Alone</p>
                <div className="mt-2 font-serif text-3xl sm:text-4xl font-bold text-amber-700">₹ 75,12,95,20,000</div>
                <p className="mt-2 text-stone-600 text-sm">covering 353,147 cubic feet</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-20 bg-green-900 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center">
            <h2 className="font-serif text-3xl sm:text-5xl font-bold">Your Deed Towards Mother Nature</h2>
            <p className="mt-3 text-green-100/80">Income for you. Oxygen for everyone.</p>
          </Reveal>
          <div className="mt-12 grid sm:grid-cols-2 gap-6">
            {[
              { Icon: Wind, t: "4 tons", d: "Carbon discharge per person per year" },
              { Icon: Leaf, t: "2 – 2.5 tons", d: "Absorbed by 100 plants annually" },
              { Icon: Sun, t: "200 kg", d: "Oxygen one person needs per year" },
              { Icon: Sparkles, t: "1,200 kg", d: "Oxygen produced by 100 plants" },
            ].map(({ Icon, t, d }) => (
              <Reveal key={t}>
                <div className="p-6 rounded-xl bg-white/5 border border-white/10 flex items-start gap-4">
                  <Icon className="text-amber-400 shrink-0" size={32} />
                  <div><div className="font-serif text-2xl font-bold text-amber-300">{t}</div><p className="text-green-100/80 text-sm mt-1">{d}</p></div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center">
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-green-900">Future Income Possibilities</h2>
            <p className="mt-3 text-stone-600">What the yield from your land can fund.</p>
          </Reveal>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { Icon: GraduationCap, t: "Children's Education" },
              { Icon: Heart, t: "Grand Marriage" },
              { Icon: Sun, t: "Retirement Corpus" },
              { Icon: BarChart3, t: "Outperforms Equity Markets" },
              { Icon: Coins, t: "Outperforms Gold" },
              { Icon: CircleDollarSign, t: "Outperforms Crypto" },
            ].map(({ Icon, t }, i) => (
              <Reveal key={t} delay={i * 0.05}>
                <div className="p-6 rounded-xl bg-white border border-stone-200 hover:border-amber-700/40 transition-colors">
                  <Icon className="text-amber-700" size={28} />
                  <h3 className="mt-3 font-serif text-lg font-bold text-stone-900">{t}</h3>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link to="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-md bg-amber-700 hover:bg-amber-800 text-white font-semibold">
              Become a Partner <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
