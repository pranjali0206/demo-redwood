import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";
import {
  TreePine, Leaf, TrendingUp, Dna, FlaskConical, Sprout, Trees,
  Check, ArrowRight, MapPin, Sparkles,
} from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { Hero } from "@/components/site/Hero";
import { Reveal, CountUp } from "@/components/site/Reveal";
import heroImg from "@/assets/hero-plantation.webp";
import fieldImg from "@/assets/plantation-field.webp";
import labImg from "@/assets/lab-tissue.webp";
import teamImg from "@/assets/team-field.webp";
import Agroforestry from "../components/site/agroforestry";
import { CombinedSection } from "../components/site/CombinedSection";
import {About} from "../components/site/About";
import {Process} from "../components/site/Process";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Redwood Biotech — Genetically Engineered Sagwan Teak Plantation, Indore" },
      { name: "description", content: "Partner your land with Redwood Biotech. 12-year managed Genitically Engineered Hi-Tech Sagwan teak plantation using tissue culture biotechnology. 75% yield to landowners. Based in Indore, MP." },
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

// Agroforestry section -------------



function GalleryPreview() {
  const imgs = [heroImg, fieldImg, labImg, teamImg, fieldImg, heroImg];
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center">
        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-green-900">
        From the Field Of <span className="text-red-500">RedWood Biotech</span>
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
    <section id="contact" className="scroll-mt-24 py-20 lg:py-28 bg-green-900 text-white">
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
              <Sparkles className="text-amber-400" size={20} />
              <span>New Laboratory Coming to Indore Soon</span>
            </div>
          </div>
        </Reveal>

        {/* Right Side Form */}
        <Reveal delay={0.15}>
          {/* <form
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
             label="Reference Name"
             value={form.referenceName}
             onChange={(v) => setForm({ ...form, referenceName: v })}
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
          </form> */}
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