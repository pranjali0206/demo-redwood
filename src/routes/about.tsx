import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { Reveal } from "@/components/site/Reveal";
import { FlaskConical, Award, Target, Heart, ArrowRight } from "lucide-react";
import team from "@/assets/team-field.jpg";
import lab from "@/assets/lab-tissue.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Redwood Biotech, Indore" },
      { name: "description", content: "Redwood Biotech is an Indore-based agro-biotechnology company specialising in genetically engineered Sagwan teak plantation. Read our story, vision, and mission." },
      { property: "og:title", content: "About Redwood Biotech" },
      { property: "og:description", content: "Innovative Science. Wealthier Tomorrow." },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: Page,
});

function Page() {
  return (
    <SiteLayout>
      <section className="bg-green-900 text-white pt-28 pb-16 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-amber-300 font-semibold">About Us</p>
        <h1 className="mt-3 font-serif text-4xl sm:text-6xl font-bold">Innovative Science. Wealthier Tomorrow.</h1>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-green-900">Our Story</h2>
            <p className="mt-5 text-stone-700 leading-relaxed">
              Redwood Biotech was founded in Indore, Madhya Pradesh, with a single conviction: India's farmland is the
              most under-utilised asset class in the country. By combining tissue-culture biotechnology with disciplined
              agroforestry management, we turn dormant land into compounding wealth for the families who own it.
            </p>
            <p className="mt-4 text-stone-700 leading-relaxed">
              From mother-plant selection across eight countries to the 144-month nutrition schedule applied to every
              tree, our work is engineered — not improvised. A new state-of-the-art laboratory is opening in Indore
              soon to expand research, tissue hardening, and quality-control capacity.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <img src={team} alt="Team" loading="lazy" className="w-full h-[460px] object-cover rounded-2xl shadow-xl" />
          </Reveal>
        </div>
      </section>

      <section className="py-20 bg-stone-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-6">
          {[
            { Icon: Target, t: "Vision", d: "To make every Indian landowner a long-term wealth creator through science-led agroforestry." },
            { Icon: Heart, t: "Mission", d: "Engineer, plant and manage genetically superior teak across India — transparently and at scale." },
            { Icon: Award, t: "Values", d: "Science. Integrity. Collaboration. Impact." },
          ].map(({ Icon, t, d }, i) => (
            <Reveal key={t} delay={i * 0.1}>
              <div className="p-8 bg-white rounded-2xl border border-stone-200 h-full">
                <Icon className="text-[var(--brand-red)]" size={32} />
                <h3 className="mt-4 font-serif text-2xl font-bold text-green-900">{t}</h3>
                <p className="mt-3 text-stone-700">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 items-center">
          <Reveal>
            <img src={lab} alt="Upcoming Indore laboratory" loading="lazy" className="w-full h-[420px] object-cover rounded-2xl shadow-xl" />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-semibold uppercase tracking-widest"><FlaskConical size={14} /> Coming Soon</div>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl font-bold text-green-900">New Laboratory · Indore</h2>
            <p className="mt-5 text-stone-700 leading-relaxed">
              Our upcoming Indore facility will house tissue-culture suites, hardening chambers, soil-analysis labs, and
              a partner experience centre. It will allow us to multiply genetic Sagwan output and serve landowners
              across Madhya Pradesh, Maharashtra, Gujarat, and beyond.
            </p>
            <Link to="/contact" className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-md bg-green-700 text-white font-semibold hover:bg-green-800">
              Talk to Our Team <ArrowRight size={18} />
            </Link>
          </Reveal>
        </div>
      </section>
    </SiteLayout>
  );
}
