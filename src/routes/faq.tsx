import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { SiteLayout } from "@/components/site/Layout";
import { Reveal } from "@/components/site/Reveal";
import { ChevronDown, Leaf, FileText, Sprout, TrendingUp, ShieldCheck, Star } from "lucide-react";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Redwood Biotech" },
      { name: "description", content: "Answers to the most common questions about Redwood's agroforestry investment model, land ownership, biotechnology, and returns." },
      { property: "og:title", content: "Frequently Asked Questions — Redwood Biotech" },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
  }),
  component: Page,
});

const categories = [
  {
    id: "about",
    label: "About Redwood Biotech",
    Icon: Leaf,
    color: "bg-green-50 text-green-800 border-green-200",
    accent: "bg-green-900",
    questions: [
      {
        q: "What is Redwood Biotech?",
        a: "Redwood Biotechis a unique investment model that combines strategically selected real estate with premium Sagwan (Teak) plantations using advanced biotechnology to create long-term wealth through land appreciation and timber value.",
      },
      {
        q: "How is Redwood Biotech different from traditional real estate?",
        a: "Unlike conventional land investments that rely solely on appreciation, Redwood combines land ownership with high-value timber cultivation — creating two potential sources of long-term value instead of one.",
      },
      {
        q: "Who can invest in Redwood Biotech?",
        a: "Any individual looking for a long-term, asset-backed investment can become a Redwood investor. No specialised background is required.",
      },
    ],
  },
  {
    id: "legal",
    label: "Land & Legal",
    Icon: FileText,
    color: "bg-amber-50 text-amber-800 border-amber-200",
    accent: "bg-amber-700",
    questions: [
      {
        q: "Will the land be registered in my name?",
        a: "Yes. The ownership structure and registration process will be clearly explained as per the selected investment plan and applicable legal framework.",
      },
      {
        q: "Are all legal documents available?",
        a: "Yes. All relevant legal documents, approvals, and ownership records are maintained with complete transparency.",
      },
      {
        q: "Is the project legally compliant?",
        a: "Yes. Every project is developed only after completing the necessary legal due diligence and approvals required under applicable laws.",
      },
      {
        q: "Will I receive ownership documents?",
        a: "Yes. Investors receive the documents applicable to their investment plan after completion of the legal process.",
      },
      {
        q: "Where are Redwood Biotech projects located?",
        a: "Projects are strategically located on the outskirts of developing cities where future infrastructure, urban expansion, and tourism have the potential to enhance land value.",
      },
    ],
  },
  {
    id: "biotech",
    label: "Plantation & Biotechnology",
    Icon: Sprout,
    color: "bg-emerald-50 text-emerald-800 border-emerald-200",
    accent: "bg-emerald-800",
    questions: [
      {
        q: "Why has Redwood Biotechchosen Sagwan (Teak)?",
        a: "Sagwan is known as the King of Timber because of its exceptional durability, premium quality, and consistently high demand in furniture, construction, luxury interiors, and export markets.",
      },
      {
        q: "Why not plant multiple tree species?",
        a: "Redwood Biotechspecialises in Sagwan because of its established commercial value, strong market demand, and long-term investment potential. Focused specialisation allows for a higher standard of care and expertise.",
      },
      {
        q: "What is biotechnology?",
        a: "Biotechnology is the use of scientific plant selection and advanced cultivation techniques to develop healthier, faster-growing, and higher-quality plantations. It's the same science behind hybrid tomatoes, tissue-culture cauliflower, and disease-resistant crops.",
      },
      {
        q: "Why use biotechnology instead of traditional planting?",
        a: "Scientifically selected planting material produces straighter trunks, better girth, fewer branches, improved timber recovery, and more consistent plantation performance across the entire crop.",
      },
      {
        q: "Will the trees really grow faster?",
        a: "Growth depends on climate, soil, maintenance, and natural conditions. Biotechnology is designed to improve plantation quality and growth characteristics compared to conventional planting — the same principle proven across food crops and commercial forestry worldwide.",
      },
      {
        q: "Who manages the plantation?",
        a: "Redwood Biotech's professional plantation management team handles cultivation, irrigation, nutrition, monitoring, and overall maintenance throughout the investment tenure.",
      },
    ],
  },
  {
    id: "returns",
    label: "Returns & Investment",
    Icon: TrendingUp,
    color: "bg-blue-50 text-blue-800 border-blue-200",
    accent: "bg-blue-900",
    questions: [
      {
        q: "How are returns generated?",
        a: "The investment is designed around two long-term value drivers: land appreciation (as surrounding areas develop) and the growth in value of premium teak timber as the trees mature.",
      },
      {
        q: "How long is the investment tenure?",
        a: "The investment follows a long-term horizon. The exact tenure depends on the selected plan. Redwood Biotechis designed for patient, wealth-building investors — not short-term speculation.",
      },
      {
        q: "Will I receive periodic updates?",
        a: "Yes. Investors receive regular updates regarding project progress and plantation development, so you always know how your land and trees are performing.",
      },
      {
        q: "What happens when the timber is harvested?",
        a: "After harvesting and sale, profits are distributed according to the terms of the selected investment plan. The entire process is managed by Redwood Biotech's team.",
      },
      {
        q: "How is timber sold?",
        a: "Redwood Biotechcoordinates the harvesting and sale process through appropriate commercial channels at prevailing market rates, ensuring investors get fair value for their timber.",
      },
      {
        q: "What determines the value of the timber?",
        a: "The value depends on the tree's age, girth, height, wood quality, market demand, and prevailing timber prices at the time of sale — all factors that improve over a well-managed plantation cycle.",
      },
      {
        q: "Is there an exit policy?",
        a: "Yes. Exit options are governed by the terms and conditions of the investment plan, which are explained clearly before you commit.",
      },
    ],
  },
  {
    id: "market",
    label: "Market & Demand",
    Icon: TrendingUp,
    color: "bg-orange-50 text-orange-800 border-orange-200",
    accent: "bg-orange-800",
    questions: [
      {
        q: "Why is there strong demand for Sagwan?",
        a: "Teak is widely used in premium furniture, doors, flooring, shipbuilding, luxury interiors, and construction due to its exceptional strength, durability, and natural resistance to termites and moisture.",
      },
      {
        q: "Does India import teak?",
        a: "Yes. India imports a significant quantity of teak to meet domestic demand — a clear indicator of how strong and consistent the market appetite for quality timber is.",
      },
      {
        q: "Can timber demand increase in the future?",
        a: "Demand for quality timber is expected to remain strong due to continued urbanisation, infrastructure development, and the limited availability of mature natural forests — all trends that support the long-term case for plantation timber.",
      },
    ],
  },
  {
    id: "safety",
    label: "Safety & Transparency",
    Icon: ShieldCheck,
    color: "bg-stone-50 text-stone-800 border-stone-200",
    accent: "bg-stone-700",
    questions: [
      {
        q: "Is my investment backed by a real asset?",
        a: "Yes. Redwood Biotech investments are backed by tangible land and professionally managed plantations — physical assets you can visit and verify.",
      },
      {
        q: "Is my plantation insured?",
        a: "Insurance availability depends on the project and investment plan. Details are shared wherever applicable during the onboarding process.",
      },
      {
        q: "Can I visit the project?",
        a: "Yes. Investors can visit the project site by scheduling a visit with the Redwood Biotech team. Transparency is a core principle — you are always welcome to see your investment in person.",
      },
      {
        q: "Will I receive plantation reports?",
        a: "Yes. Periodic updates are shared to keep investors informed about plantation progress, tree growth, and overall project health.",
      },
      {
        q: "Who takes care of maintenance expenses?",
        a: "Maintenance responsibilities are governed by the terms of the investment plan and are explained clearly before investment. There are no surprise costs.",
      },
      {
        q: "Are there any hidden charges?",
        a: "No. All applicable costs are disclosed transparently before investment. What you see is what you agree to.",
      },
    ],
  },
];

function AccordionItem({
  q,
  a,
  isOpen,
  onToggle,
  accent,
}: {
  q: string;
  a: string;
  isOpen: boolean;
  onToggle: () => void;
  accent: string;
}) {
  return (
    <div
      className={`border-b border-stone-100 last:border-0 transition-colors ${isOpen ? "bg-white" : "bg-transparent"}`}
    >
      <button
        className="w-full text-left flex items-center justify-between gap-4 py-5 px-6 group"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className={`font-serif text-base sm:text-lg font-semibold transition-colors ${isOpen ? "text-green-900" : "text-stone-800 group-hover:text-green-900"}`}>
          {q}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="shrink-0"
        >
          <ChevronDown
            size={20}
            className={`transition-colors ${isOpen ? "text-green-900" : "text-stone-400 group-hover:text-green-700"}`}
          />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6">
              <div className={`w-8 h-0.5 ${accent} mb-3 rounded-full`} />
              <p className="text-stone-600 leading-relaxed text-sm sm:text-base">{a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function CategorySection({
  category,
  defaultOpen,
}: {
  category: (typeof categories)[number];
  defaultOpen?: boolean;
}) {
  const [openIdx, setOpenIdx] = useState<number | null>(defaultOpen ? 0 : null);

  return (
    <Reveal>
      <div className="mb-10">
        {/* Category header */}
        <div className="flex items-center gap-3 mb-4">
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold border ${category.color}`}>
            <category.Icon size={15} />
            {category.label}
          </div>
        </div>

        {/* Accordion card */}
        <div className="rounded-2xl border border-stone-200 overflow-hidden shadow-sm bg-stone-50">
          {category.questions.map((item, i) => (
            <AccordionItem
              key={i}
              q={item.q}
              a={item.a}
              isOpen={openIdx === i}
              onToggle={() => setOpenIdx(openIdx === i ? null : i)}
              accent={category.accent}
            />
          ))}
        </div>
      </div>
    </Reveal>
  );
}

function Page() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="bg-green-900 text-white pt-28 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-amber-300 font-semibold">Investor Support</p>
          <h1 className="mt-4 font-serif text-4xl sm:text-6xl font-bold text-balance leading-tight">
            Every Question,<br className="hidden sm:block" /> Answered Honestly.
          </h1>
          <p className="mt-5 text-lg text-green-100/80 max-w-2xl mx-auto">
            We believe great investments start with clear answers. Browse every question about Redwood Biotech — from land ownership to timber returns.
          </p>
          {/* Quick stat strip */}
          <div className="mt-10 flex flex-wrap justify-center gap-8">
            {[
              { n: "33", label: "Questions answered" },
              { n: "6", label: "Topic categories" },
              { n: "100%", label: "Transparent process" },
            ].map(({ n, label }) => (
              <div key={label} className="text-center">
                <p className="font-serif text-3xl font-bold text-amber-400">{n}</p>
                <p className="text-xs text-green-100/60 uppercase tracking-widest mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main FAQ */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {categories.map((cat, i) => (
            <CategorySection key={cat.id} category={cat} defaultOpen={i === 0} />
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-stone-100">
        <Reveal>
          <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
            <div className="inline-flex items-center gap-2 text-amber-700 mb-4">
              <Star size={18} fill="currentColor" />
              <Star size={18} fill="currentColor" />
              <Star size={18} fill="currentColor" />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-green-900">
              Still have questions?
            </h2>
            <p className="mt-3 text-stone-600">
              Our advisors are happy to walk you through any aspect of the Redwood Biotech model — from legal structure to plantation science.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-green-900 text-white font-semibold hover:bg-green-800 transition-colors"
              >
                Talk to an Advisor
              </a>
              <a
                href="/investment"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md border border-green-900 text-green-900 font-semibold hover:bg-green-50 transition-colors"
              >
                View Investment Plans
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </SiteLayout>
  );
}