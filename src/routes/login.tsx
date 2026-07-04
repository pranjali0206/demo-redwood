import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { ArrowRight, Shield } from "lucide-react";
import field from "@/assets/plantation-field.jpg";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Partner Login — Redwood Biotech" },
      { name: "description", content: "Landowner partner login. Track your plantation progress, view documents, and raise queries." },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/login" }],
  }),
  component: Page,
});

function Page() {
  const navigate = useNavigate();
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const sendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (mobile.length < 10) return toast.error("Enter a valid mobile number");
    // NOTE: OTP requires backend integration. Mock OTP for demo: 123456
    toast.success("OTP sent. (Demo OTP: 123456)");
    setStep("otp");
  };
  const verify = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.join("") !== "123456") return toast.error("Invalid OTP. Use 123456 for the demo.");
    toast.success("Welcome back!");
    navigate({ to: "/" });
  };
  const setDigit = (i: number, v: string) => {
    const next = [...otp]; next[i] = v.replace(/\D/g, "").slice(0, 1); setOtp(next);
    if (v && i < 5) (document.getElementById(`otp-${i + 1}`) as HTMLInputElement | null)?.focus();
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-stone-50">
      <div className="relative hidden lg:block">
        <img src={field} alt="Plantation" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-green-950/80 via-green-900/60 to-black/80" />
        <div className="relative h-full flex flex-col justify-between p-12 text-white">
          <a href="/" className="font-serif text-2xl font-bold"><span className="text-amber-300">REDWOOD</span> BIOTECH</a>
          <div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
              className="font-serif text-5xl font-bold leading-tight">"Your land is working.<br />Track it here."</motion.h2>
            <p className="mt-4 text-green-100/80">Real-time progress, lab reports, and documents — all in one place.</p>
          </div>
          <p className="text-xs text-white/50">© Redwood Biotech · Indore</p>
        </div>
      </div>

      <div className="flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          <div className="flex items-center gap-2 mb-8">
            <span className="inline-block w-1 h-7 bg-[var(--brand-red)]" />
            <span className="font-serif text-xl font-bold text-[var(--brand-red)]">REDWOOD BIOTECH</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-green-900">Partner Login</h1>
          <p className="mt-1.5 text-stone-600">{step === "phone" ? "Enter your registered mobile number" : `Enter the 6-digit OTP sent to +91 ${mobile}`}</p>

          {step === "phone" ? (
            <form onSubmit={sendOtp} className="mt-8 space-y-4">
              <div>
                <label className="block text-sm font-medium text-stone-700">Mobile Number</label>
                <div className="mt-1 flex">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-stone-300 bg-stone-50 text-stone-600 text-sm">+91</span>
                  <input type="tel" maxLength={10} value={mobile} onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                    className="block w-full rounded-r-md border border-stone-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-700" placeholder="9752258759" />
                </div>
              </div>
              <button type="submit" className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-md bg-green-700 text-white font-semibold hover:bg-green-800">
                Send OTP <ArrowRight size={18} />
              </button>
            </form>
          ) : (
            <form onSubmit={verify} className="mt-8 space-y-5">
              <div className="flex gap-2 justify-between">
                {otp.map((d, i) => (
                  <input key={i} id={`otp-${i}`} value={d} onChange={(e) => setDigit(i, e.target.value)} inputMode="numeric"
                    className="w-12 h-14 text-center text-2xl font-bold rounded-md border border-stone-300 focus:border-green-700 focus:ring-2 focus:ring-green-700 outline-none" />
                ))}
              </div>
              <button type="submit" className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-md bg-amber-700 text-white font-semibold hover:bg-amber-800">
                Verify & Continue
              </button>
              <button type="button" onClick={() => setStep("phone")} className="w-full text-sm text-stone-500 hover:text-stone-700">Change mobile number</button>
            </form>
          )}
          <div className="mt-8 pt-6 border-t border-stone-200 text-center">
            <button className="inline-flex items-center gap-1.5 text-sm text-stone-500 hover:text-[var(--brand-red)]"><Shield size={14} /> Admin Login</button>
          </div>
          <p className="mt-4 text-xs text-stone-400 text-center">Demo OTP: 123456 — backend integration required for production.</p>
        </div>
      </div>
    </div>
  );
}
