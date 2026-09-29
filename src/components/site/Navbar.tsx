import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import logoWhite from "../../assets/rw-logo.webp";
import logoDark from "../../assets/rw-logo2.webp";
import { UrbanFarmerBadge, UrbanFarmerPopup } from "./UrbanFarmerCampaign";
const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/agroforestry", label: "Agroforestry" },
  { to: "/investment", label: "Investment" },
  { to: "/gallery", label: "Gallery" },
  { to: "/faq", label: "Faq" },
  // { to: "/contact", label: "Contact" },
] as const;

export function Navbar({
  transparentUntilScroll = true,
  heroTone = "dark",
}: {
  transparentUntilScroll?: boolean;
  /** Brightness of the hero behind the transparent bar — a light hero needs dark links. */
  heroTone?: "dark" | "light";
}) {
  const [scrolled, setScrolled] = useState(!transparentUntilScroll);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!transparentUntilScroll) return;
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [transparentUntilScroll]);

  const solid = scrolled || open;
  const darkInk = solid || heroTone === "light";

  return (
    <motion.header
      initial={false}
      animate={{
        backgroundColor: solid ? "rgba(255,255,255,0.96)" : "rgba(255,255,255,0)",
        boxShadow: solid ? "0 1px 0 rgba(0,0,0,0.06)" : "0 0 0 rgba(0,0,0,0)",
        backdropFilter: solid ? "blur(8px)" : "blur(0px)",
      }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="fixed top-0 inset-x-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
            <Link to="/" className="flex min-w-0 items-center">
        <motion.img
          key={darkInk ? "dark" : "light"}
          src={darkInk ? logoDark : logoWhite}
          alt="Redwood Biotech"
          className="h-14 sm:h-16 w-auto min-w-0 max-w-full object-contain object-left"
          initial={{ opacity: 0.8 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      </Link>
        <nav className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`px-3 py-2 text-sm font-medium tracking-wide transition-colors ${
                darkInk ? "text-stone-700 hover:text-[var(--brand-red)]" : "text-white/90 hover:text-white"
              }`}
              activeProps={{ className: `px-3 py-2 text-sm font-semibold ${darkInk ? "text-[var(--brand-red)]" : "text-white"}` }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          <UrbanFarmerBadge menuOpen={open} />
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className={`lg:hidden p-2 rounded ${darkInk ? "text-stone-800" : "text-white"}`}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      {open && (
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="lg:hidden bg-white border-t border-stone-200">
          <div className="px-4 py-3 flex flex-col">
            {links.map((l) => (
              <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="py-2 text-stone-800 font-medium">
                {l.label}
              </Link>
            ))}

          </div>
        </motion.div>
      )}
      <UrbanFarmerPopup />
    </motion.header>
  );
}
