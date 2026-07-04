import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone, MessageCircle, Mail, Clock, Check, ArrowUpRight,
  ArrowRight, ArrowLeft, User, Sprout, ChevronDown,
} from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { Reveal } from "@/components/site/Reveal";
import heroImg from "@/assets/land-aerial.jpg";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Redwood Biotech, Indore" },
      { name: "description", content: "Talk to Redwood Biotech about partnering your land for Sagwan teak plantation. Office: Limbodi, Khandwa Road, Indore (MP)." },
      { property: "og:title", content: "Contact Redwood Biotech" },
      { property: "og:description", content: "Reach out about land partnerships, the science, or our investment plans." },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Page,
});

const initial = {
  name: "", mobile: "", city: "", district: "", state: "", age: "",
  gender: "", interest: "", size: "", landType: "agricultural",
  time: "morning", message: "",
};

const contactMethods = [
  { icon: Phone, label: "Call Us", value: "+91 97522 58759", sub: "Mon – Sat · 10am – 6pm", href: "tel:+917952258759" },
  { icon: MessageCircle, label: "WhatsApp", value: "Chat instantly", sub: "Fastest response", href: "https://wa.me/917952258759" },
  { icon: Mail, label: "Email", value: "info@redwoodbiotech.in", sub: "Replies within 24 hrs", href: "mailto:hello@redwoodbiotech.in" },
];

const faqs = [
  { q: "How soon will someone contact me?", a: "Our investment desk reaches out within 24 hours of your enquiry — usually the same day if submitted during business hours." },
  { q: "Do I need to visit the office in person?", a: "No — everything can be discussed over call or WhatsApp. A site visit to the plantation is optional and arranged on request." },
  { q: "What details should I have ready?", a: "Just your land size and location if you're a landowner, or your investment range if you're an investor. Our team will guide you through the rest." },
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
            Your land has potential. <span className="italic text-amber-300">Let's talk.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-6 text-lg text-white/80 max-w-xl">
            Whether you're a landowner or an investor — one conversation is where every partnership begins.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function ContactMethods() {
  return (
    <section className="relative -mt-20 z-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto grid sm:grid-cols-3 gap-5">
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <Reveal><p className="text-xs uppercase tracking-[0.3em] text-[var(--brand-red)] mb-5">— Head Office</p></Reveal>
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
              Mon – Sat · 10:00 – 18:00 IST · Sundays closed
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal delay={0.15}>
            <MultiStepForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const steps = ["About You", "Your Land", "Message"];

function MultiStepForm() {
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<"form" | "sent">("form");
  const [f, setF] = useState(initial);

  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sent");
  };

  return (
    <div className="relative rounded-3xl bg-white border border-stone-200 shadow-[0_30px_80px_-30px_rgba(20,60,40,0.15)] overflow-hidden">
      <AnimatePresence mode="wait">
        {status === "sent" ? (
          <motion.div key="ok" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="py-20 px-8 text-center">
            <div className="mx-auto h-16 w-16 rounded-full bg-green-600/10 grid place-items-center mb-6">
              <Check className="h-8 w-8 text-green-700" strokeWidth={3} />
            </div>
            <h3 className="font-serif text-2xl font-bold text-green-900">Thank you, {f.name || "there"}.</h3>
            <p className="mt-3 text-stone-600 max-w-sm mx-auto">Our team will call you within 24 hours to talk through your land and next steps.</p>
          </motion.div>
        ) : (
          <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="px-8 sm:px-10 pt-8">
              <div className="flex items-center justify-between mb-3">
                {steps.map((s, i) => (
                  <div key={s} className="flex items-center flex-1 last:flex-none">
                    <div className="flex items-center gap-2">
                      <span className={`h-7 w-7 rounded-full grid place-items-center text-xs font-bold transition-colors ${i <= step ? "bg-[var(--brand-red)] text-white" : "bg-stone-100 text-stone-400"}`}>
                        {i < step ? <Check size={13} /> : i + 1}
                      </span>
                      <span className={`hidden sm:inline text-sm font-medium ${i <= step ? "text-green-900" : "text-stone-400"}`}>{s}</span>
                    </div>
                    {i < steps.length - 1 && (
                      <div className="flex-1 h-[2px] mx-3 bg-stone-100 relative overflow-hidden">
                        <motion.div className="absolute inset-y-0 left-0 bg-[var(--brand-red)]" initial={false} animate={{ width: i < step ? "100%" : "0%" }} transition={{ duration: 0.3 }} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <form onSubmit={submit} className="px-8 sm:px-10 pb-10 pt-4">
              <AnimatePresence mode="wait">
                {step === 0 && (
                  <motion.div key="s0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                    <div className="flex items-center gap-2 text-[var(--brand-red)] mb-1">
                      <User size={18} />
                      <p className="text-xs uppercase tracking-[0.25em] font-semibold">Tell us who you are</p>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-6">
                      <F label="Full Name" required v={f.name} on={(v) => setF({ ...f, name: v })} />
                      <F label="email" required v={f.email} on={(v) => setF({ ...f, email: v })} />
                      <F label="Reference Name" required v={f.referenceName} on={(v) => setF({ ...f, referenceName: v })} />
                      <F label="Mobile Number" type="tel" required v={f.mobile} on={(v) => setF({ ...f, mobile: v })} />
                      <F label="City" required v={f.city} on={(v) => setF({ ...f, city: v })} />
                      <F label="Age" type="number" required v={f.age} on={(v) => setF({ ...f, age: v })} />
                      <Sel label="Gender" required v={f.gender} on={(v) => setF({ ...f, gender: v })} options={["Male", "Female", "Other"]} />
                      <Sel label="Interested As" required v={f.interest} on={(v) => setF({ ...f, interest: v })} options={["Sales Associate", "Investor", "Both"]} />
                    </div>
                  </motion.div>
                )}

                {step === 1 && (
                  <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                    <div className="flex items-center gap-2 text-[var(--brand-red)] mb-1">
                      <Sprout size={18} />
                      <p className="text-xs uppercase tracking-[0.25em] font-semibold">A little about your land</p>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-6">
                      <F label="District" v={f.district} on={(v) => setF({ ...f, district: v })} />
                      <F label="State" v={f.state} on={(v) => setF({ ...f, state: v })} />
                      <F label="Land Size (Acres / Bigha)" v={f.size} on={(v) => setF({ ...f, size: v })} />
                      <Sel label="Type of Land" v={f.landType} on={(v) => setF({ ...f, landType: v })} options={["agricultural", "farmland", "plot", "other"]} />
                      <label className="block sm:col-span-2">
                        <span className="text-xs uppercase tracking-widest text-stone-500">Preferred Contact Time</span>
                        <div className="relative mt-2">
                          <select value={f.time} onChange={(e) => setF({ ...f, time: e.target.value })}
                            className="w-full appearance-none bg-transparent border-b border-stone-300 focus:border-green-700 outline-none py-2 pr-6 text-stone-800">
                            <option value="morning">Morning (9:00 AM – 12:00 PM)</option>
                            <option value="afternoon">Afternoon (12:00 PM – 4:00 PM)</option>
                            <option value="evening">Evening (4:00 PM – 8:00 PM)</option>
                          </select>
                          <ChevronDown size={16} className="absolute right-0 top-2.5 text-stone-400 pointer-events-none" />
                        </div>
                      </label>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                    <div className="flex items-center gap-2 text-[var(--brand-red)] mb-1">
                      <MessageCircle size={18} />
                      <p className="text-xs uppercase tracking-[0.25em] font-semibold">Anything else we should know?</p>
                    </div>
                    <label className="block">
                      <span className="text-xs uppercase tracking-widest text-stone-500">Message</span>
                      <textarea rows={5} value={f.message} onChange={(e) => setF({ ...f, message: e.target.value })}
                        placeholder="Tell us about your enquiry..."
                        className="mt-2 w-full bg-transparent border-b border-stone-300 focus:border-green-700 outline-none py-2 text-stone-800 resize-none" />
                    </label>
                    <div className="rounded-2xl bg-stone-50 border border-stone-100 p-5 text-sm text-stone-600">
                      <p className="font-semibold text-green-900 mb-1">Quick summary</p>
                      {f.name || "—"} · {f.mobile || "—"} · {f.city || "—"} · {f.size ? `${f.size} land` : "no land size given"}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-8 flex items-center justify-between">
                {step > 0 ? (
                  <button type="button" onClick={back} className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-stone-300 text-stone-600 font-medium hover:bg-stone-100 transition-colors">
                    <ArrowLeft size={16} /> Back
                  </button>
                ) : <span />}

                {step < steps.length - 1 ? (
                  <button type="button" onClick={next} className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-green-900 text-white font-semibold hover:bg-green-800 transition-colors">
                    Continue
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                  </button>
                ) : (
                  <button type="submit" className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[var(--brand-red)] text-white font-semibold hover:opacity-90 transition-all">
                    Send Enquiry
                    <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                )}
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FaqStrip() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-20 lg:py-28 bg-white border-t border-stone-100">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal><p className="text-xs uppercase tracking-[0.3em] text-[var(--brand-red)] mb-5 text-center">— Before You Reach Out</p></Reveal>
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

function F({ label, v, on, type = "text", required }: { label: string; v: string; on: (s: string) => void; type?: string; required?: boolean }) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-widest text-stone-500">{label} {required && <span className="text-[var(--brand-red)]">*</span>}</span>
      <input type={type} required={required} value={v} onChange={(e) => on(e.target.value)}
        className="mt-2 w-full bg-transparent border-b border-stone-300 focus:border-green-700 outline-none py-2 text-stone-800" />
    </label>
  );
}

function Sel({ label, v, on, options, required }: { label: string; v: string; on: (s: string) => void; options: string[]; required?: boolean }) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-widest text-stone-500">{label} {required && <span className="text-[var(--brand-red)]">*</span>}</span>
      <div className="relative mt-2">
        <select required={required} value={v} onChange={(e) => on(e.target.value)}
          className="w-full appearance-none bg-transparent border-b border-stone-300 focus:border-green-700 outline-none py-2 pr-6 text-stone-800">
          <option value="">Select</option>
          {options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
        <ChevronDown size={16} className="absolute right-0 top-2.5 text-stone-400 pointer-events-none" />
      </div>
    </label>
  );
}
