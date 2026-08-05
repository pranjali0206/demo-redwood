import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Mail, Clock, ArrowUpRight, ChevronDown,
} from "lucide-react";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { SiteLayout } from "@/components/site/Layout";
import { Reveal } from "@/components/site/Reveal";
import heroImg from "@/assets/land-aerial.webp";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact - Redwood Biotech, Indore" },
      { name: "description", content: "Talk to Redwood Biotech about partnering your land for Sagwan teak plantation. Office: Limbodi, Khandwa Road, Indore (MP)." },
      { property: "og:title", content: "Contact Redwood Biotech" },
      { property: "og:description", content: "Reach out about land partnerships, the science, or our investment plans." },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Page,
});

const contactMethods = [
  { icon: Mail, label: "Email", value: "info@redwoodbiotech.in", sub: "Replies within 24 hrs", href: "mailto:info@redwoodbiotech.in" },
];

const faqs = [
  { q: "How soon will someone contact me?", a: "Our investment desk reaches out within 24 hours of your enquiry - usually the same day if submitted during business hours." },
  { q: "Do I need to visit the office in person?", a: "No - everything can be discussed over call or email. A site visit to the plantation is optional and arranged on request." },
  { q: "What details should I have ready?", a: "Just your land size and location if you are a landowner, or your investment range if you are an investor. Our team will guide you through the rest." },
];

function Page() {
  return (
    <SiteLayout>
      <Hero />
      <ContactMethods />
      <MainSection />
      <FaqStrip />
    </SiteLayout>
  );
}

function Hero() {
  return (
    <section className="relative h-[70vh] min-h-[520px] w-full overflow-hidden">
      <motion.div className="absolute inset-0" initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 1.4, ease: "easeOut" }}>
        <img src={heroImg} alt="Aerial view of teak plantation land" className="w-full h-full object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-green-950" />
      <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
        <Reveal>
          <span className="inline-flex items-center gap-2.5 rounded-full border border-amber-400/40 bg-black/30 backdrop-blur px-4 py-1.5 text-xs uppercase tracking-[0.3em] text-amber-300">
            Get In Touch
          </span>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="mt-6 font-serif text-4xl sm:text-6xl lg:text-7xl font-bold leading-tight text-white max-w-4xl">
            Your land has potential. <span className="italic text-amber-300">Let us talk.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-6 text-lg text-white/80 max-w-xl">
            Whether you are a landowner or an investor - one conversation is where every partnership begins.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function ContactMethods() {
  return (
    <section className="relative -mt-20 z-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto grid gap-5">
        {contactMethods.map((m, i) => (
          <Reveal key={m.label} delay={0.05 * i} className="h-full">
            <a
              href={m.href}
              target={m.href.startsWith("http") ? "_blank" : undefined}
              rel={m.href.startsWith("http") ? "noreferrer" : undefined}
              className="group flex h-full flex-col items-start gap-4 rounded-3xl bg-white p-7 shadow-[0_25px_60px_-20px_rgba(0,0,0,0.25)] border border-stone-100 hover:-translate-y-1.5 hover:shadow-[0_35px_70px_-20px_rgba(0,0,0,0.3)] transition-all duration-300"
            >
              <span className="h-14 w-14 rounded-2xl bg-green-900 grid place-items-center group-hover:bg-[var(--brand-red)] transition-colors duration-300">
                <m.icon className="h-6 w-6 text-amber-300" />
              </span>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-stone-400">{m.label}</p>
                <p className="mt-1 font-serif text-xl font-bold text-green-900">{m.value}</p>
                <p className="mt-0.5 text-sm text-stone-500">{m.sub}</p>
              </div>
              <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--brand-red)] opacity-0 group-hover:opacity-100 transition-opacity">
                Connect now <ArrowUpRight size={15} />
              </span>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function MainSection() {
  return (
    <section className="py-24 lg:py-32 bg-stone-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal><p className="text-xs uppercase tracking-[0.3em] text-[var(--brand-red)] mb-5">- Head Office</p></Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-green-900 leading-snug">
            Come see the <span className="italic">science</span> behind the soil.
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-5 text-stone-600 leading-relaxed">
            260, Anurag Villa, 52 Bigha, Opposite Ocean Motors, Limbodi, Khandwa Road, Indore, Madhya Pradesh.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-8 rounded-3xl overflow-hidden border border-stone-200 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.15)]">
            <iframe title="Office Location" src="https://www.openstreetmap.org/export/embed.html?bbox=75.84,22.66,75.92,22.72&layer=mapnik" className="w-full h-80" loading="lazy" />
          </div>
        </Reveal>
        <Reveal delay={0.25}>
          <div className="mt-8 flex items-center gap-3 text-stone-600 text-sm">
            <Clock className="h-4 w-4 text-[var(--brand-red)]" />
            Mon - Sat . 10:00 - 18:00 IST . Sundays closed
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FaqStrip() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-20 lg:py-28 bg-white border-t border-stone-100">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal><p className="text-xs uppercase tracking-[0.3em] text-[var(--brand-red)] mb-5 text-center">- Before You Reach Out</p></Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-green-900 text-center mb-10">Quick answers</h2>
        </Reveal>
        <div className="space-y-3">
          {faqs.map((item, i) => (
            <Reveal key={item.q} delay={0.05 * i}>
              <div className="rounded-2xl border border-stone-200 overflow-hidden">
                <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left">
                  <span className="font-medium text-green-900">{item.q}</span>
                  <ChevronDown size={18} className={`shrink-0 text-stone-400 transition-transform ${open === i ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {open === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                      <p className="px-6 pb-5 text-stone-600 leading-relaxed">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}