import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";
import {
  TreePine, Leaf, TrendingUp, Dna, FlaskConical, Sprout, Trees,
  Check, ArrowRight, MapPin, Phone, MessageCircle, Sparkles,
} from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { Reveal, CountUp } from "@/components/site/Reveal";
import heroImg from "@/assets/hero-plantation.jpg";
import fieldImg from "@/assets/plantation-field.jpg";
import labImg from "@/assets/lab-tissue.jpg";
import teamImg from "@/assets/team-field.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Redwood Biotech — Genetically Engineered Sagwan Teak Plantation, Indore" },
      { name: "description", content: "Partner your land with Redwood Biotech. 12-year managed Sagwan teak plantation using tissue culture biotechnology. 75% yield to landowners. Based in Indore, MP." },
      { property: "og:title", content: "Redwood Biotech — Innovative Science. Wealthier Tomorrow." },
      { property: "og:description", content: "Genetically engineered teak plantation, grown on your land, managed by science." },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  return (
    <SiteLayout transparentNav>
      <Hero />
      <Agroforestry />
      <Combined />
      <Biotech />
      <About />
      <Plans />
      <GalleryPreview />
      <ContactSection />
    </SiteLayout>
  );
}

function Hero() {
  return (
    <section className="relative h-screen min-h-[640px] w-full overflow-hidden">
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1 }}
        animate={{ scale: 1.08 }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
      >
        <img src={heroImg} alt="Sagwan teak plantation" className="w-full h-full object-cover" fetchPriority="high" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/45 to-black/70" />
      <div className="relative h-full flex items-center justify-center px-4">
        <div className="max-w-4xl text-center text-white">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }}
            className="text-xs sm:text-sm tracking-[0.3em] uppercase text-amber-300 font-semibold">
            Redwood Biotech — Indore, Madhya Pradesh
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.7 }}
            className="mt-5 font-serif text-4xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] text-balance">
            Real Estate and Agroforestry<br />
            <span className="text-amber-300">Is the Future</span> of Indian Economy
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.7 }}
            className="mt-6 text-lg sm:text-xl text-stone-100/90 max-w-2xl mx-auto">
            Genetically engineered Sagwan teak — grown on your land, managed by us, owned by you.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.7 }}
            className="mt-9 flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-md bg-amber-700 hover:bg-amber-800 text-white font-semibold tracking-wide transition-all shadow-lg shadow-amber-900/30 hover:scale-[1.02]">
              Become a Partner <ArrowRight size={18} />
            </Link>
            <Link to="/agroforestry" className="inline-flex items-center justify-center px-7 py-3.5 rounded-md border border-white/70 hover:bg-white/10 text-white font-semibold tracking-wide transition-all">
              Learn More
            </Link>
          </motion.div>
        </div>
      </div>
      <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}>
        <span className="text-[10px] uppercase tracking-[0.3em] text-white/70">Scroll</span>
        <div className="relative w-px h-12 bg-white/30 overflow-hidden">
          <motion.span className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-amber-300"
            animate={{ y: [-4, 48] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }} />
        </div>
      </motion.div>
    </section>
  );
}

function Agroforestry() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-green-900 text-balance">
            Why Smart Indians Are Turning to <span className="text-[var(--brand-red)]">Agroforestry</span>
          </h2>
          <p className="mt-4 text-lg text-stone-600">The ancient practice, reimagined with 21st century science.</p>
        </Reveal>
        <div className="mt-16 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="relative">
            <img src={fieldImg} alt="Plantation field" loading="lazy" className="w-full h-[420px] object-cover rounded-lg shadow-xl" />
            <div className="absolute -bottom-5 -right-5 hidden sm:block w-32 h-32 border-4 border-amber-700 rounded-lg -z-0" />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <p className="text-lg text-stone-700 leading-relaxed">
              Agroforestry is the practice of growing trees and crops together on the same land — combining the income potential
              of agriculture with the long-term asset value of forestry. It is one of the most resilient, scientifically backed
              ways for an Indian landowner to build generational wealth.
            </p>
            <div className="mt-8 grid sm:grid-cols-3 gap-4">
              {[
                { Icon: TreePine, t: "Long Term Asset Value" },
                { Icon: Leaf, t: "Tax-Free Agriculture Income" },
                { Icon: TrendingUp, t: "Passive Returns Over 12 Years" },
              ].map(({ Icon, t }) => (
                <div key={t} className="p-5 rounded-lg bg-stone-50 border border-stone-200 hover:border-green-700/40 hover:shadow-md transition-all">
                  <div className="w-10 h-10 rounded-md bg-green-900 text-white flex items-center justify-center"><Icon size={20} /></div>
                  <p className="mt-3 font-serif font-semibold text-green-900">{t}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Combined() {
  const cards: { title: string; tone: "neutral" | "soft" | "brand"; points: string[]; featured?: boolean }[] = [
    {
      title: "Real Estate Alone", tone: "neutral",
      points: ["High entry cost", "Slow appreciation", "No regular income", "Dependent on market"],
    },
    {
      title: "Agroforestry Alone", tone: "soft",
      points: ["Lower entry cost", "Steady long-term growth", "Regular land income", "Science-backed returns"],
    },
    {
      title: "Redwood Biotech Model", tone: "brand", featured: true,
      points: ["Your land as the asset", "75% of all yield to you", "12-year managed partnership", "Genetic technology for maximum returns", "100% tax-free agriculture income"],
    },
  ];
  return (
    <section className="py-20 lg:py-28 bg-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-green-900 text-balance">
            Two of India's Most Trusted Investments. <span className="text-[var(--brand-red)]">Combined.</span>
          </h2>
          <p className="mt-4 text-lg text-stone-600">Landowners who wait for real estate appreciation wait alone. Ours work for you from day one.</p>
        </Reveal>
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={{ show: { transition: { staggerChildren: 0.15 } } }}
          className="mt-14 grid md:grid-cols-3 gap-6 items-stretch">
          {cards.map((c) => (
            <motion.div key={c.title} variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
              className={`rounded-xl p-7 flex flex-col ${
                c.tone === "neutral" ? "bg-stone-200 text-stone-700" :
                c.tone === "soft" ? "bg-green-50 border border-green-200 text-stone-800" :
                "bg-green-900 text-white md:scale-[1.04] shadow-2xl shadow-green-900/30 relative"
              }`}>
              {c.featured && <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">Recommended</span>}
              <h3 className={`font-serif text-2xl font-bold ${c.tone === "brand" ? "text-amber-300" : c.tone === "soft" ? "text-green-900" : "text-stone-900"}`}>{c.title}</h3>
              <ul className="mt-6 space-y-3 flex-1">
                {c.points.map((p) => (
                  <li key={p} className="flex gap-3 text-sm">
                    <Check size={18} className={c.tone === "brand" ? "text-amber-300 shrink-0" : c.tone === "soft" ? "text-green-700 shrink-0" : "text-stone-500 shrink-0"} />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
        <Reveal delay={0.2} className="mt-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-6 py-5 rounded-xl bg-amber-50 border border-amber-200">
            <p className="text-lg sm:text-xl text-amber-900 font-serif">
              India imports <span className="font-bold">₹75 crore</span> of teak every year. Your land could be supplying it.
            </p>
            <Link to="/contact" className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-amber-700 text-white font-semibold hover:bg-amber-800 transition-colors whitespace-nowrap">
              Become a Partner <ArrowRight size={18} />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Biotech() {
  const steps = [
    { Icon: Dna, t: "Gene Selection", d: "Mother plants selected from 8 countries — India, Sri Lanka, Indonesia, Myanmar, Thailand, Burma, Philippines and Laos." },
    { Icon: FlaskConical, t: "Tissue Culture", d: "Genes extracted and cultivated under sterile laboratory conditions for 13 months and 20 days." },
    { Icon: Sprout, t: "Hardening", d: "Plants undergo primary and secondary hardening before being field-ready." },
    { Icon: Trees, t: "Field Plantation", d: "Scientifically prepared soil, drip irrigation, and expert agroforestry supervision from day one." },
  ];
  return (
    <section className="py-20 lg:py-28 bg-[color:#0a2818] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl sm:text-5xl font-bold">The Science Behind the Returns.</h2>
          <p className="mt-4 text-lg text-green-100/80">We don't plant trees. We engineer them.</p>
        </Reveal>
        <div className="relative mt-16">
          <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.4, ease: "easeOut" }}
            className="hidden md:block absolute top-10 left-0 right-0 h-px bg-amber-500 origin-left" />
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={{ show: { transition: { staggerChildren: 0.25 } } }}
            className="grid md:grid-cols-4 gap-6">
            {steps.map(({ Icon, t, d }, i) => (
              <motion.div key={t} variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
                className="relative">
                <div className="w-20 h-20 mx-auto rounded-full bg-green-900 border-2 border-amber-500 flex items-center justify-center relative z-10">
                  <Icon size={32} className="text-amber-400" />
                </div>
                <div className="mt-5 text-center">
                  <p className="text-xs uppercase tracking-widest text-amber-400">Step {i + 1}</p>
                  <h3 className="mt-1 font-serif text-xl font-semibold">{t}</h3>
                  <p className="mt-2 text-sm text-green-100/75">{d}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
        <Reveal delay={0.2} className="mt-20 grid grid-cols-3 gap-4 sm:gap-8 max-w-3xl mx-auto text-center">
          {[
            { n: 25, l: "At 8 Years" }, { n: 75, l: "At 12 Years" }, { n: 150, l: "At 18 Years" },
          ].map((s) => (
            <div key={s.l} className="p-6 rounded-xl bg-white/5 border border-white/10">
              <div className="font-serif text-4xl sm:text-5xl font-bold text-amber-400">
                <CountUp to={s.n} />
              </div>
              <p className="text-xs sm:text-sm mt-1 text-green-300 uppercase tracking-widest">Cubic Feet · {s.l}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <Reveal>
            <div className="p-8 sm:p-10 bg-stone-100 rounded-2xl border-l-4 border-[var(--brand-red)]">
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--brand-red)] font-semibold">About</p>
              <h2 className="mt-3 font-serif text-3xl sm:text-4xl font-bold text-green-900">Know Redwood Biotech</h2>
              <p className="mt-5 text-stone-700 leading-relaxed">
                Headquartered in Indore, Madhya Pradesh, Redwood Biotech is an agro-biotechnology company pioneering
                genetically engineered Sagwan (teak) plantation through tissue culture science. We unite landowners
                with cutting-edge biotechnology to build sustainable, generational wealth from the land.
              </p>
              <p className="mt-4 text-stone-700 leading-relaxed">
                A new state-of-the-art laboratory is opening in Indore soon — expanding our research, hardening, and
                quality-control capacity across India.
              </p>
              <Link to="/about" className="mt-6 inline-flex items-center gap-2 text-green-800 font-semibold hover:text-green-900">
                Read our full story <ArrowRight size={16} />
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <img src={teamImg} alt="Redwood team in field" loading="lazy" className="w-full h-[440px] object-cover rounded-2xl shadow-xl" />
          </Reveal>
        </div>
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { n: 1200, s: "+", l: "Acres Under Management" },
            { n: 180, s: "+", l: "Landowner Partners" },
            { n: 8, s: " yrs", l: "In Operation" },
            { n: 12, s: "+", l: "Crop & Plant Varieties" },
          ].map((s) => (
            <Reveal key={s.l} delay={0.05}>
              <div className="p-6 rounded-xl bg-stone-50 border border-stone-200 text-center">
                <div className="font-serif text-3xl sm:text-4xl font-bold text-[var(--brand-red)]">
                  <CountUp to={s.n} suffix={s.s} />
                </div>
                <p className="mt-1 text-xs uppercase tracking-wider text-stone-600">{s.l}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-4 text-center text-xs text-stone-500">{/* REPLACE WITH CLIENT IMAGE / real figures */}Placeholder figures — to be replaced with verified client data.</p>
      </div>
    </section>
  );
}

function Plans() {
  const plans: { name: string; bar: string; desc: string; features: string[]; featured?: boolean }[] = [
    {
      name: "Basic", bar: "bg-green-200", desc: "Your land, our management, your returns. The foundational partnership model.",
      features: ["Tissue culture sagwan teak plantation", "Drip irrigation system", "Quarterly soil analysis", "Pesticide & fertilizer management", "75% yield at harvest", "Registered agreement"],
    },
    {
      name: "Immersive", featured: true, bar: "bg-green-700", desc: "Everything in Basic, plus full digital access to your plantation's progress.",
      features: ["All Basic features", "Landowner login portal", "Plantation progress tracker", "Document download section", "Direct query system"],
    },
    {
      name: "Operational", bar: "bg-stone-800", desc: "The complete partnership — technology, transparency, and marketing working together.",
      features: ["All Immersive features", "Marketing automation", "Lead pipeline management", "Monthly analytics report", "Priority support"],
    },
  ];
  return (
    <section className="py-20 lg:py-28 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-green-900">Choose Your Investment Level</h2>
          <p className="mt-4 text-lg text-stone-600">Every plan includes a registered 12-year lease agreement and 75% yield to the landowner.</p>
        </Reveal>
        <div className="mt-14 grid md:grid-cols-3 gap-6 items-stretch">
          {plans.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.1}>
              <motion.div whileHover={{ y: -6, rotateX: 2 }} transition={{ duration: 0.3 }}
                className={`bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow flex flex-col h-full relative ${p.featured ? "ring-2 ring-green-700" : ""}`}>
                <div className={`h-2 ${p.bar}`} />
                {p.featured && <span className="absolute top-4 right-4 bg-amber-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">Most Popular</span>}
                <div className="p-7 flex-1 flex flex-col">
                  <h3 className="font-serif text-2xl font-bold text-green-900">{p.name}</h3>
                  <p className="mt-2 text-sm text-stone-600">{p.desc}</p>
                  <p className="mt-5 font-serif text-2xl text-[var(--brand-red)]">On Request</p>
                  <ul className="mt-5 space-y-2.5 flex-1">
                    {p.features.map((f) => (
                      <li key={f} className="flex gap-2.5 text-sm text-stone-700">
                        <Check size={16} className="mt-0.5 text-green-700 shrink-0" />{f}
                      </li>
                    ))}
                  </ul>
                  <Link to="/investment" className="mt-6 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-md bg-green-700 text-white font-semibold hover:bg-green-800 transition-colors">
                    Know More <ArrowRight size={16} />
                  </Link>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 text-center italic text-stone-600">Prices available on request. Contact us or visit the Investment Plans page for full details.</p>
      </div>
    </section>
  );
}

function GalleryPreview() {
  const imgs = [heroImg, fieldImg, labImg, teamImg, fieldImg, heroImg];
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-green-900">From the Field and the Lab</h2>
          <p className="mt-4 text-lg text-stone-600">Real plantations, real science, real growth.</p>
        </Reveal>
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }}
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          {imgs.map((src, i) => (
            <motion.div key={i} variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
              className="overflow-hidden rounded-lg aspect-[4/3] group">
              <img src={src} alt="Gallery preview" loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </motion.div>
          ))}
        </motion.div>
        <div className="mt-10 text-center">
          <Link to="/gallery" className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-green-900 text-white font-semibold hover:bg-green-800 transition-colors">
            View Full Gallery <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [form, setForm] = useState({ name: "", mobile: "", city: "", size: "", message: "" });
  const handle = (e: React.FormEvent) => {
    e.preventDefault();
    // NOTE: Replace this with a real backend or form service like Formspree.
    toast.success("Thanks — we'll be in touch within 24 hours.");
    setForm({ name: "", mobile: "", city: "", size: "", message: "" });
  };
  return (
    <section className="py-20 lg:py-28 bg-green-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12">
        <Reveal>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold">Start Your Partnership Today</h2>
          <p className="mt-4 text-lg text-green-100/80">Talk to us about your land. We handle everything else.</p>
          <div className="mt-8 space-y-4 text-green-100/90">
            <div className="flex items-start gap-3"><MapPin className="text-amber-400 mt-1 shrink-0" size={20} />
              <p>260, Anurag Villa, 52 Bigha, Opposite Ocean Motors, Limbodi, Khandwa Road, Indore, Madhya Pradesh</p></div>
            <div className="flex items-center gap-3"><Phone className="text-amber-400" size={20} /><a href="tel:+919999999999" className="hover:text-white">+91 99999 99999</a></div>
            <div className="flex items-center gap-3"><Sparkles className="text-amber-400" size={20} /><span>New Laboratory Coming to Indore Soon</span></div>
          </div>
          <a href="https://wa.me/919999999999" target="_blank" rel="noreferrer"
            className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-md bg-green-600 hover:bg-green-500 text-white font-semibold transition-colors">
            <MessageCircle size={20} /> Chat on WhatsApp
          </a>
        </Reveal>
        <Reveal delay={0.15}>
          <form onSubmit={handle} className="bg-white text-stone-900 rounded-2xl p-7 sm:p-8 shadow-2xl space-y-4">
            <Field label="Full Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
            <Field label="Mobile Number" type="tel" value={form.mobile} onChange={(v) => setForm({ ...form, mobile: v })} required />
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="City" value={form.city} onChange={(v) => setForm({ ...form, city: v })} required />
              <Field label="Land Size (acres / bigha)" value={form.size} onChange={(v) => setForm({ ...form, size: v })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700">Message</label>
              <textarea rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="mt-1 w-full rounded-md border border-stone-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-700" />
            </div>
            <button type="submit" className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-md bg-amber-600 hover:bg-amber-700 text-white font-semibold transition-colors">
              Send Enquiry <ArrowRight size={18} />
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Field({ label, value, onChange, type = "text", required }: { label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="block text-sm font-medium text-stone-700">{label}{required && <span className="text-red-600"> *</span>}</label>
      <input type={type} required={required} value={value} onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-md border border-stone-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-700" />
    </div>
  );
}
