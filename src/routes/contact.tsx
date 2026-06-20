import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { MapPin, Phone, MessageCircle, Mail, Clock, ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { Reveal } from "@/components/site/Reveal";

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

const initial = { name: "", mobile: "", city: "", district: "", state: "", size: "", landType: "agricultural", time: "morning", message: "" };

function Page() {
  const [f, setF] = useState(initial);
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    // NOTE: Replace this endpoint with a real backend or Formspree integration.
    toast.success("Enquiry received. Our team will call you within 24 hours.");
    setF(initial);
  };
  return (
    <SiteLayout>
      <section className="bg-green-900 text-white pt-28 pb-14 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-amber-300 font-semibold">Contact</p>
        <h1 className="mt-3 font-serif text-4xl sm:text-6xl font-bold">Let's Build Something Long-Term</h1>
      </section>

      <section className="py-16 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-5 gap-10">
          <Reveal className="lg:col-span-2 space-y-5">
            <h2 className="font-serif text-2xl font-bold text-green-900">Head Office</h2>
            <div className="space-y-4 text-stone-700">
              <div className="flex items-start gap-3"><MapPin className="text-[var(--brand-red)] shrink-0 mt-0.5" size={20} />
                <p>260, Anurag Villa, 52 Bigha,<br />Opposite Ocean Motors, Limbodi,<br />Khandwa Road, Indore (MP)</p></div>
              <div className="flex items-center gap-3"><Phone className="text-[var(--brand-red)]" size={20} /><a href="tel:+919999999999" className="hover:text-green-900">+91 99999 99999</a></div>
              <div className="flex items-center gap-3"><Mail className="text-[var(--brand-red)]" size={20} /><a href="mailto:hello@redwoodbiotech.in" className="hover:text-green-900">hello@redwoodbiotech.in</a></div>
              <div className="flex items-center gap-3"><Clock className="text-[var(--brand-red)]" size={20} /><span>Mon – Sat · 10:00 – 18:00 IST</span></div>
            </div>
            <a href="https://wa.me/919999999999" target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-green-600 text-white font-semibold hover:bg-green-700">
              <MessageCircle size={18} /> WhatsApp Us
            </a>
            <div className="mt-6 rounded-xl overflow-hidden border border-stone-200 shadow-md">
              <iframe
                title="Office Location"
                src="https://www.openstreetmap.org/export/embed.html?bbox=75.84,22.66,75.92,22.72&layer=mapnik"
                className="w-full h-72" loading="lazy"
              />
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-3">
            <form onSubmit={submit} className="bg-white rounded-2xl shadow-md border border-stone-200 p-7 sm:p-8 space-y-4">
              <h2 className="font-serif text-2xl font-bold text-green-900">Enquiry Form</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <I label="Full Name" v={f.name} on={(v) => setF({ ...f, name: v })} required />
                <I label="Mobile Number" type="tel" v={f.mobile} on={(v) => setF({ ...f, mobile: v })} required />
                <I label="City" v={f.city} on={(v) => setF({ ...f, city: v })} required />
                <I label="District" v={f.district} on={(v) => setF({ ...f, district: v })} />
                <I label="State" v={f.state} on={(v) => setF({ ...f, state: v })} />
                <I label="Land Size (acres / bigha)" v={f.size} on={(v) => setF({ ...f, size: v })} />
                <div>
                  <label className="block text-sm font-medium text-stone-700">Type of Land</label>
                  <select value={f.landType} onChange={(e) => setF({ ...f, landType: e.target.value })}
                    className="mt-1 w-full rounded-md border border-stone-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-700">
                    <option value="agricultural">Agricultural</option>
                    <option value="farmland">Farmland</option>
                    <option value="plot">Plot</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700">Preferred Contact Time</label>
                  <select value={f.time} onChange={(e) => setF({ ...f, time: e.target.value })}
                    className="mt-1 w-full rounded-md border border-stone-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-700">
                    <option value="morning">Morning (9–12)</option>
                    <option value="afternoon">Afternoon (12–4)</option>
                    <option value="evening">Evening (4–8)</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700">Message</label>
                <textarea rows={4} value={f.message} onChange={(e) => setF({ ...f, message: e.target.value })}
                  className="mt-1 w-full rounded-md border border-stone-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-700" />
              </div>
              <button type="submit" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-md bg-amber-700 text-white font-semibold hover:bg-amber-800">
                Send Enquiry <ArrowRight size={18} />
              </button>
            </form>
          </Reveal>
        </div>
      </section>
    </SiteLayout>
  );
}

function I({ label, v, on, type = "text", required }: { label: string; v: string; on: (s: string) => void; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="block text-sm font-medium text-stone-700">{label}{required && <span className="text-red-600"> *</span>}</label>
      <input type={type} required={required} value={v} onChange={(e) => on(e.target.value)}
        className="mt-1 w-full rounded-md border border-stone-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-700" />
    </div>
  );
}
