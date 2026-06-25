import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import logoWhite from "../../assets/rw-logo.png";
import logoDark from "../../assets/rw-logo2.png";
const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/agroforestry", label: "Agroforestry" },
  { to: "/investment", label: "Investment" },
  { to: "/gallery", label: "Gallery" },
  { to: "/faq", label: "Faq" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar({ transparentUntilScroll = true }: { transparentUntilScroll?: boolean }) {
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <Link to="/" className="flex items-center">
        <motion.img
          key={solid ? "dark" : "light"}
          src={solid ? logoDark : logoWhite}
          alt="Redwood Biotech"
          className="h-14 sm:h-16 w-auto"
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
                solid ? "text-stone-700 hover:text-[var(--brand-red)]" : "text-white/90 hover:text-white"
              }`}
              activeProps={{ className: `px-3 py-2 text-sm font-semibold ${solid ? "text-[var(--brand-red)]" : "text-white"}` }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            to="/login"
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 rounded-md bg-green-700 text-white text-sm font-semibold hover:bg-green-800 transition-colors"
          >
            Login
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className={`lg:hidden p-2 rounded ${solid ? "text-stone-800" : "text-white"}`}
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
            <Link to="/login" onClick={() => setOpen(false)} className="mt-2 inline-flex justify-center px-4 py-2 rounded-md bg-green-700 text-white font-semibold">
              Login
            </Link>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
