import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { Reveal } from "@/components/site/Reveal";
import hero from "@/assets/hero-plantation.jpg";
import field from "@/assets/plantation-field.jpg";
import lab from "@/assets/lab-tissue.jpg";
import team from "@/assets/team-field.jpg";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Redwood Biotech Plantations & Lab" },
      { name: "description", content: "Photographs and videos from Redwood Biotech's Sagwan plantations, biotech laboratory, team, and partner sites." },
      { property: "og:title", content: "Gallery — Redwood Biotech" },
      { property: "og:description", content: "Plantation, laboratory, crops, team — see the work behind the science." },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
  component: Page,
});

const ALL = [
  { src: hero, cat: "Plantation" }, { src: field, cat: "Plantation" }, { src: field, cat: "Crops" },
  { src: lab, cat: "Laboratory" }, { src: team, cat: "Team" }, { src: hero, cat: "Plantation" },
  { src: lab, cat: "Laboratory" }, { src: team, cat: "Team" }, { src: field, cat: "Crops" },
];
const CATS = ["All", "Plantation", "Laboratory", "Crops", "Team"];

function Page() {
  const [cat, setCat] = useState("All");
  const [open, setOpen] = useState<string | null>(null);
  const items = cat === "All" ? ALL : ALL.filter((i) => i.cat === cat);

  return (
    <SiteLayout>
      <section className="bg-green-900 text-white pt-28 pb-16 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-amber-300 font-semibold">Gallery</p>
        <h1 className="mt-3 font-serif text-4xl sm:text-6xl font-bold">From the Field and the Lab</h1>
        <p className="mt-4 text-green-100/80 max-w-2xl mx-auto px-4">A living record of plantations, science, and the people growing both.</p>
      </section>

      <section className="py-12 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {CATS.map((c) => (
              <button key={c} onClick={() => setCat(c)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                  cat === c ? "bg-green-900 text-white" : "bg-white text-stone-700 hover:bg-stone-100 border border-stone-200"
                }`}>{c}</button>
            ))}
          </div>
          <motion.div layout className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
            <AnimatePresence>
              {items.map((it, i) => (
                <motion.button
                  key={`${it.src}-${i}`} layout
                  initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                  onClick={() => setOpen(it.src)}
                  className="overflow-hidden rounded-lg aspect-[4/3] group bg-stone-200">
                  <img src={it.src} alt={it.cat} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </motion.button>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-[60] bg-black/85 flex items-center justify-center p-4">
            <button onClick={() => setOpen(null)} className="absolute top-4 right-4 text-white p-2"><X size={28} /></button>
            <motion.img initial={{ scale: 0.95 }} animate={{ scale: 1 }} src={open} alt="Lightbox" className="max-h-[90vh] max-w-[95vw] rounded-lg shadow-2xl" />
          </motion.div>
        )}
      </AnimatePresence>
    </SiteLayout>
  );
}
