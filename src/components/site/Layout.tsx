import type { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export function SiteLayout({ children, transparentNav = false }: { children: ReactNode; transparentNav?: boolean }) {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col">
      <Navbar transparentUntilScroll={transparentNav} />
      <main className={transparentNav ? "" : "pt-16"}>{children}</main>
      <Footer />
    </div>
  );
}