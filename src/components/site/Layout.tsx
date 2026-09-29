import type { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export function SiteLayout({
  children,
  transparentNav = false,
  heroTone = "dark",
}: {
  children: ReactNode;
  transparentNav?: boolean;
  heroTone?: "dark" | "light";
}) {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col">
      <Navbar transparentUntilScroll={transparentNav} heroTone={heroTone} />
      <main className={transparentNav ? "" : "pt-16"}>{children}</main>
      <Footer />
    </div>
  );
}
