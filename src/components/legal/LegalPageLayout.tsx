import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";
import logo from "@/assets/rw-logo.png";

interface LegalPageLayoutProps {
  title: string;
  lastUpdated: string;
  intro?: ReactNode;
  children: ReactNode;
}

export function LegalPageLayout({ title, lastUpdated, intro, children }: LegalPageLayoutProps) {
  return (
    <div className="min-h-screen bg-stone-950 text-stone-300">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-stone-400 hover:text-white transition-colors mb-10"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>

        <img src={logo} alt="Redwood Biotech" className="h-12 w-auto mb-8" />

        <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">{title}</h1>
        <p className="mt-2 text-sm text-stone-500">{lastUpdated}</p>

        {intro && (
          <p className="mt-6 text-[15px] leading-relaxed text-stone-300">{intro}</p>
        )}

        <div className="mt-10 h-px w-full bg-stone-800" />

        <div className="mt-10 space-y-8">{children}</div>

        <div className="mt-16 pt-8 border-t border-stone-800 text-xs text-stone-500">
          © {new Date().getFullYear()} Redwood Biotech. All rights reserved.
        </div>
      </div>
    </div>
  );
}

interface LegalSectionProps {
  heading?: string;
  children: ReactNode;
}

export function LegalSection({ heading, children }: LegalSectionProps) {
  return (
    <section>
      {heading && (
        <h2 className="text-lg font-semibold text-white mb-2.5">{heading}</h2>
      )}
      <div className="text-[15px] leading-relaxed text-stone-300 space-y-3">{children}</div>
    </section>
  );
}