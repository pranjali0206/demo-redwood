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
import Agroforestry from "../components/site/agroforestry";
import { CombinedSection } from "../components/site/CombinedSection";
import {About} from "../components/site/About";
import {Process} from "../components/site/Process";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Redwood Biotech — Genetically Engineered Sagwan Teak Plantation, Indore" },
      { name: "description", content: "Partner your land with Redwood Biotech. 12-year managed Genitically Hi-Tech Sagwan teak plantation using tissue culture biotechnology. 75% yield to landowners. Based in Indore, MP." },
      { property: "og:title", content: "Redwood Biotech — Innovative Science. Wealthier Tomorrow." },
      { property: "og:description", content: "Genetically Engineered teak plantation, grown on your land, managed by science." },
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
      <CombinedSection />
      <Process />
      <About />
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
          
        <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="mt-5 font-serif text-[1.7rem] sm:text-5xl lg:text-7xl font-bold leading-tight text-center"
          >
            <span className="block whitespace-nowrap">
              Real Estate + Agroforestry
            </span>

            <span className="block mt-3 text-amber-300">
            Genetically Engineered Hi-Tech Sagwan Teak 
            </span>
          </motion.h1>
      
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.7 }}
            className="mt-6 text-lg sm:text-xl text-stone-100/90 max-w-2xl mx-auto">
              Grown on your land, managed and  sold by us , profit earned by you .
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
     
    </section>
  );
}
// Agroforestry section -------------



function GalleryPreview() {
  const imgs = [heroImg, fieldImg, labImg, teamImg, fieldImg, heroImg];
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center">
        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-green-900">
        From the Field Of <span className="text-red-500">RedWood</span>
      </h2>          <p className="mt-4 text-lg text-stone-600">Real plantations, real science, real growth.</p>
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
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    city: "",
    age: "",
    gender: "",
    interest: "",
    size: "",
    message: "",
  });

  const handle = (e: React.FormEvent) => {
    e.preventDefault();

    // Replace this with your backend or Formspree API
    toast.success("Thanks — we'll be in touch within 24 hours.");

    setForm({
      name: "",
      mobile: "",
      city: "",
      age: "",
      gender: "",
      interest: "",
      size: "",
      message: "",
    });
  };

  return (
    <section className="py-20 lg:py-28 bg-green-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12">
        {/* Left Side */}
        <Reveal>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold">
            Start Your Partnership Today
          </h2>

          <p className="mt-4 text-lg text-green-100/80">
            Talk to us about your land. We handle everything else.
          </p>

          <div className="mt-8 space-y-4 text-green-100/90">
            <div className="flex items-start gap-3">
              <MapPin
                className="text-amber-400 mt-1 shrink-0"
                size={20}
              />
              <p>
                260, Anurag Villa, 52 Bigha, Opposite Ocean Motors,
                Limbodi, Khandwa Road, Indore, Madhya Pradesh
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="text-amber-400" size={20} />
              <a
                href="tel:+919999999999"
                className="hover:text-white"
              >
                +91 99999 99999
              </a>
            </div>

            <div className="flex items-center gap-3">
              <Sparkles className="text-amber-400" size={20} />
              <span>New Laboratory Coming to Indore Soon</span>
            </div>
          </div>

          <a
            href="https://wa.me/919999999999"
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-md bg-green-600 hover:bg-green-500 text-white font-semibold transition-colors"
          >
            <MessageCircle size={20} />
            Chat on WhatsApp
          </a>
        </Reveal>

        {/* Right Side Form */}
        <Reveal delay={0.15}>
          <form
            onSubmit={handle}
            className="bg-white text-stone-900 rounded-2xl p-7 sm:p-8 shadow-2xl space-y-4"
          >
            <Field
              label="Full Name"
              value={form.name}
              onChange={(v) =>
                setForm({ ...form, name: v })
              }
              required
            />

            <Field
              label="Mobile Number"
              type="tel"
              value={form.mobile}
              onChange={(v) =>
                setForm({ ...form, mobile: v })
              }
              required
            />

            <div className="grid sm:grid-cols-2 gap-4">
              <Field
                label="City"
                value={form.city}
                onChange={(v) =>
                  setForm({ ...form, city: v })
                }
                required
              />

              <Field
                label="Age"
                type="number"
                value={form.age}
                onChange={(v) =>
                  setForm({ ...form, age: v })
                }
                required
              />

              <div>
                <label className="block text-sm font-medium text-stone-700">
                  Gender
                </label>

                <select
                  value={form.gender}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      gender: e.target.value,
                    })
                  }
                  required
                  className="mt-1 w-full rounded-md border border-stone-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-700"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700">
                  Interested As
                </label>

                <select
                  value={form.interest}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      interest: e.target.value,
                    })
                  }
                  required
                  className="mt-1 w-full rounded-md border border-stone-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-700"
                >
                  <option value="">Select Option</option>
                  <option value="Sales Associate">
                    Sales Associate
                  </option>
                  <option value="Investor">
                    Investor
                  </option>
                  <option value="Both">
                    Both
                  </option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <Field
                  label="Land Size (Acres / Bigha)"
                  value={form.size}
                  onChange={(v) =>
                    setForm({ ...form, size: v })
                  }
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700">
                Message
              </label>

              <textarea
                rows={4}
                value={form.message}
                onChange={(e) =>
                  setForm({
                    ...form,
                    message: e.target.value,
                  })
                }
                className="mt-1 w-full rounded-md border border-stone-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-700"
                placeholder="Write your message..."
              />
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-md bg-amber-600 hover:bg-amber-700 text-white font-semibold transition-colors"
            >
              Send Enquiry
              <ArrowRight size={18} />
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
