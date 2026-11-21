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
    const onScroll = () => setScrolled(window.scrollY > 12);
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
        backgroundColor: solid ? "rgba(255,255,255,1)" : "rgba(255,255,255,0)",
        boxShadow: darkInk ? "0 1px 0 rgba(14,59,46,0.12)" : "0 0 0 rgba(14,59,46,0)",
        backdropFilter: solid ? "blur(8px)" : "blur(0px)",
      }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="rwb-site-header fixed top-0 inset-x-0 z-50"
    >
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between gap-3 px-4 font-manrope sm:px-6 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:px-10">
        <Link to="/" className="flex min-w-0 items-center lg:justify-self-start">
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
        <nav className="hidden items-center gap-7 lg:flex xl:gap-9">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`rwb-nav-link relative py-2 text-[15px] font-medium tracking-[-0.01em] transition-colors duration-300 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-right after:scale-x-0 after:transition-transform after:duration-500 after:ease-[cubic-bezier(0.22,1,0.36,1)] hover:after:origin-left hover:after:scale-x-100 ${
                darkInk
                  ? "text-rwb-nav after:bg-rwb-emerald hover:text-rwb-emerald"
                  : "text-white/90 after:bg-white hover:text-white"
              }`}
              activeProps={{
                className: `after:origin-left! after:scale-x-100! ${darkInk ? "text-rwb-ink!" : "text-white!"}`,
              }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2 sm:gap-3 lg:justify-self-end">
          <UrbanFarmerBadge menuOpen={open} />
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className={`lg:hidden p-2 rounded ${darkInk ? "text-rwb-ink" : "text-white"}`}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden bg-white border-t border-[rgba(14,59,46,0.12)] font-manrope"
        >
          <div className="px-4 py-3 flex flex-col">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="py-2.5 font-medium text-rwb-sub transition-colors hover:text-rwb-emerald"
              >
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
