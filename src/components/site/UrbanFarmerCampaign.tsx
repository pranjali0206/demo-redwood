import { useEffect, useState, type ReactNode } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ArrowRight, ArrowUpRight, Sprout, X } from "lucide-react";
import stampImg from "@/assets/urban-farmer-stamp.webp";
import logoImg from "@/assets/urban-farmer-logo.webp";
import { hasSavedLead } from "@/components/urban-farmer/lead";

const POPUP_SEEN_KEY = "rwb:urban-farmer-popup-seen";
const POPUP_DELAY_MS = 6000;

// On the Urban Farmer page itself, campaign CTAs jump to the join form instead of reloading the page.
function CampaignLink({
  className,
  onNavigate,
  children,
  ...aria
}: {
  className: string;
  onNavigate?: () => void;
  children: ReactNode;
  "aria-label"?: string;
}) {
  const onPage = useLocation({ select: (l) => l.pathname === "/urban-farmer" });
  return onPage ? (
    <a href="#join" onClick={onNavigate} className={className} {...aria}>
      {children}
    </a>
  ) : (
    <Link to="/urban-farmer" onClick={onNavigate} className={className} {...aria}>
      {children}
    </Link>
  );
}

export function UrbanFarmerBadge({ menuOpen = false }: { menuOpen?: boolean }) {
  return (
    <CampaignLink
      aria-label="Be The Urban Farmer"
      className="group relative flex shrink-0 items-center rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-uf-sun"
    >
      <span className="stamp-perforated relative z-10 block w-11 -rotate-6 drop-shadow-[0_6px_10px_rgba(23,61,10,0.35)] transition-transform duration-300 group-hover:rotate-0 group-hover:scale-105 sm:w-12">
        <img
          src={stampImg}
          alt=""
          width={200}
          height={200}
          className="block aspect-square w-full object-cover"
        />
      </span>

      <span className="-ml-3 hidden h-10 items-center gap-2 rounded-l-md rounded-r-full border border-uf-green/15 bg-uf-cream/95 pl-5 pr-3.5 shadow-[0_10px_24px_-12px_rgba(23,61,10,0.55)] backdrop-blur transition-colors duration-300 group-hover:bg-uf-paper sm:flex">
        <span className="leading-none">
          <span className="block text-[9px] font-bold uppercase tracking-[0.3em] text-uf-soil">
            Be The
          </span>
          <span className="mt-1 block whitespace-nowrap font-serif text-[15px] font-bold text-uf-forest">
            Urban Farmer
          </span>
        </span>
        <ArrowUpRight
          size={15}
          className="text-uf-green transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      </span>

      {/* Phones have no room beside the stamp, so the label hangs below the bar instead. */}
      <span
        className={`absolute left-1/2 top-[calc(100%+10px)] -translate-x-1/2 whitespace-nowrap rounded-full bg-uf-green px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-uf-cream shadow-[0_8px_18px_-8px_rgba(23,61,10,0.7)] sm:hidden ${menuOpen ? "hidden" : ""}`}
      >
        Be The Urban Farmer
      </span>

      <span aria-hidden className="absolute -right-1 -top-1 z-20 flex h-3 w-3">
        <span className="absolute inline-flex h-full w-full rounded-full bg-uf-sun opacity-75 motion-safe:animate-ping" />
        <span className="relative inline-flex h-3 w-3 rounded-full border-2 border-uf-paper bg-uf-sun" />
      </span>
    </CampaignLink>
  );
}

function readSeen() {
  try {
    return sessionStorage.getItem(POPUP_SEEN_KEY) === "1";
  } catch {
    return false;
  }
}

function markSeen() {
  try {
    sessionStorage.setItem(POPUP_SEEN_KEY, "1");
  } catch {
    // Storage can be blocked; the popup then simply shows once per page load.
  }
}

export function UrbanFarmerPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (readSeen() || hasSavedLead()) return;
    let timer = 0;
    const show = () => {
      // Never interrupt someone who is typing (e.g. in the join form) — try again a little later.
      if (document.activeElement?.matches("input, textarea, select")) {
        timer = window.setTimeout(show, POPUP_DELAY_MS);
        return;
      }
      markSeen();
      setOpen(true);
    };
    timer = window.setTimeout(show, POPUP_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-[70] bg-uf-forest/40 backdrop-blur-sm data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content className="fixed left-1/2 top-1/2 z-[70] max-h-[calc(100svh-2rem)] w-[calc(100%-2rem)] max-w-3xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-[1.75rem] bg-uf-cream text-uf-forest shadow-[0_40px_120px_-30px_rgba(23,61,10,0.6)] ring-1 ring-uf-green/10 outline-none duration-300 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=open]:slide-in-from-bottom-4">
          <div className="grid sm:grid-cols-[1fr_1.15fr]">
            <div className="relative overflow-hidden bg-[#f8f2e6]">
              <img
                src={logoImg}
                alt="The Urban Farmer"
                width={900}
                height={900}
                className="aspect-[16/11] h-full w-full object-cover object-[50%_46%] sm:aspect-auto sm:object-contain sm:[mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)]"
              />
              <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-uf-cream to-transparent sm:inset-y-0 sm:left-auto sm:right-0 sm:h-auto sm:w-12 sm:bg-gradient-to-l"
              />
            </div>

            <div className="flex flex-col justify-center px-6 pb-7 pt-4 sm:py-10 sm:pl-6 sm:pr-10">
              <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-uf-soil">
                <Sprout size={14} className="text-uf-leaf" /> The Urban Farmer Campaign
              </p>
              <DialogPrimitive.Title className="mt-4 font-serif text-[2rem] font-bold leading-[1.08] sm:text-[2.6rem]">
                Farming is shifting towards <span className="italic text-uf-soil">urban.</span>
              </DialogPrimitive.Title>
              <DialogPrimitive.Description className="mt-3 font-serif text-xl font-semibold text-uf-green sm:text-2xl">
                Now, be the part of the revolution.
              </DialogPrimitive.Description>
              <p className="mt-4 text-sm leading-relaxed text-stone-600 sm:text-[15px]">
                Own land registered in your name, grow Genetically Engineered Hi-Tech Sagwan managed by Redwood
                Biotech — and get your Urban Farmer certificate in the moment.
              </p>

              <CampaignLink
                onNavigate={() => setOpen(false)}
                className="group mt-7 inline-flex items-center justify-between gap-4 rounded-2xl bg-uf-green py-2.5 pl-6 pr-2.5 font-semibold text-uf-cream shadow-[0_16px_36px_-16px_rgba(44,94,20,0.9)] transition-colors duration-300 hover:bg-uf-forest"
              >
                Be The Urban Farmer
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-uf-sun text-uf-forest transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight size={18} />
                </span>
              </CampaignLink>
              <DialogPrimitive.Close className="mt-3 self-center text-sm text-stone-500 underline-offset-4 transition-colors hover:text-uf-forest hover:underline sm:self-start">
                Maybe later
              </DialogPrimitive.Close>
            </div>
          </div>

          <DialogPrimitive.Close
            aria-label="Close"
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-uf-paper/90 text-uf-forest shadow-sm ring-1 ring-uf-green/10 transition-colors hover:bg-white"
          >
            <X size={18} />
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
