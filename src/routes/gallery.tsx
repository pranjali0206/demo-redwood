import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { X, Play, Sprout } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import galleryBg from "@/assets/gallerybg.png";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Clips & Views from Nidhivan | Redwood Biotech" },
      {
        name: "description",
        content:
          "Watch the short film and field reels from Redwood Biotech's Nidhivan agroforestry project — dug, rooted, and shot on site as the forest came out of the ground.",
      },
      { property: "og:title", content: "Gallery — Clips & Views from Nidhivan" },
      {
        property: "og:description",
        content:
          "A feature film and seven field clips from the Nidhivan agroforestry project by Redwood Biotech.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,340;9..144,480;9..144,600&family=IBM+Plex+Mono:wght@400;500&family=Inter:wght@400;500;600&display=swap",
      },
    ],
  }),
  component: GalleryPage,
});

// ---- design tokens (soil-core / specimen-tag palette) --------------------
const PAPER = "#EDE6D6"; // topsoil paper
const PAPER_DEEP = "#E1D5BC"; // card / kraft
const INK = "#241F17"; // near-black warm ink
const MOSS = "#3E4F32"; // deep moss green
const CLAY = "#A6512E"; // fired-clay accent
const GOLD = "#B4863B"; // aged brass
const MUTED = "#6E6350"; // muted brown-grey

const DISPLAY = { fontFamily: "'Fraunces', serif" };
const MONO = { fontFamily: "'IBM Plex Mono', monospace" };
const BODY = { fontFamily: "'Inter', sans-serif" };

type Video = {
  id: string;
  title: string;
  kind: "film" | "short";
  runtime: string; // mm:ss, used as a timecode stamp
};

const SHORT_FILM: Video = {
  id: "b40C775NSbg",
  title: "Power of Real Estate + Agroforestry — A Short Film",
  kind: "film",
  runtime: "06:42",
};

function thumb(id: string) {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}

/** Horizontal soil-strata divider — the recurring signature device, standing in for the filmstrip. */
function Strata({ label }: { label?: string }) {
  return (
    <div className="relative flex items-center gap-3 px-4 py-2" aria-hidden="true">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#B4863B]/40 to-[#B4863B]/40" />
      {label ? (
        <span
          className="shrink-0 text-[10px] uppercase tracking-[0.25em]"
          style={{ ...MONO, color: GOLD }}
        >
          {label}
        </span>
      ) : (
        <span className="h-1 w-1 shrink-0 rounded-full" style={{ backgroundColor: GOLD }} />
      )}
      <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#B4863B]/40 to-[#B4863B]/40" />
    </div>
  );
}

/** Small runtime badge, styled like a specimen tag rather than a film timecode. */
function DepthTag({ value }: { value: string }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] tracking-[0.1em]"
      style={{ ...MONO, color: MOSS, borderColor: `${MOSS}40`, backgroundColor: `${PAPER}CC` }}
    >
      <Sprout className="h-2.5 w-2.5" strokeWidth={2.5} />
      {value}
    </span>
  );
}

function GalleryPage() {
  const [active, setActive] = useState<Video | null>(null);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  return (
    <>
      <Navbar />

      <div style={{ backgroundColor: PAPER, color: INK, ...BODY }} className="min-h-screen">
        {/* Hero — full-bleed image, simple tagline */}
        <section className="relative flex h-[62vh] min-h-[420px] w-full items-end overflow-hidden md:h-[70vh]">
          <img
            src={galleryBg}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0"
            style={{ background: `linear-gradient(to top, ${INK}E6, ${INK}66 55%, ${INK}26)` }}
          />
          <div className="relative mx-auto w-full max-w-6xl px-6 pb-14 md:pb-20">
            <div
              className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em]"
              style={{ ...MONO, color: GOLD }}
            >
              <Sprout className="h-3.5 w-3.5" />
              Redwood Biotech · Nidhivan
            </div>
            <h1
              className="mt-4 text-4xl leading-[1.05] tracking-tight md:text-6xl"
              style={{ ...DISPLAY, color: PAPER }}
            >
              Clips & views from Nidhivan
            </h1>
          </div>
        </section>
        <Strata />

        {/* Featured short film — the feature specimen */}
        <section
          className="relative overflow-hidden px-6 py-20 md:py-28"
          style={{ background: `linear-gradient(180deg, ${PAPER} 0%, ${PAPER_DEEP} 55%, ${PAPER} 100%)` }}
        >
          <div
            className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[36rem] -translate-x-1/2 rounded-full blur-3xl"
            style={{ backgroundColor: `${CLAY}22` }}
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 rounded-full blur-3xl"
            style={{ backgroundColor: `${MOSS}1f` }}
            aria-hidden="true"
          />

          <div className="relative mx-auto max-w-6xl">
            <div className="mb-10 text-center md:mb-12">
              <span className="text-[11px] uppercase tracking-[0.3em]" style={{ ...MONO, color: CLAY }}>
                Feature film
              </span>
              <h2
                className="mx-auto mt-4 max-w-2xl text-3xl leading-tight tracking-tight md:text-5xl"
                style={DISPLAY}
              >
                Know everything about the{" "}
                <span style={{ color: MOSS }}>Nidhivan project</span> — in one short film
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed md:text-base" style={{ color: MUTED }}>
              From bare land to a thriving teak plantation — the complete journey.
              </p>
            </div>

            <div className="mb-6 flex items-center justify-end">
              <DepthTag value={`Runtime ${SHORT_FILM.runtime}`} />
            </div>

            <button
              onClick={() => setActive(SHORT_FILM)}
              className="group relative block w-full overflow-hidden rounded-sm border text-left shadow-sm transition hover:shadow-md"
              style={{ borderColor: `${GOLD}55`, backgroundColor: PAPER_DEEP }}
            >
              {/* kraft tag corner */}
              <div
                className="absolute left-5 top-5 z-10 flex h-9 w-9 -rotate-6 items-center justify-center rounded-full border text-[10px]"
                style={{ ...MONO, borderColor: `${INK}30`, backgroundColor: PAPER, color: INK }}
              >
                No.00
              </div>

              <div className="relative aspect-video w-full overflow-hidden">
                <img
                  src={`https://i.ytimg.com/vi/${SHORT_FILM.id}/maxresdefault.jpg`}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = thumb(SHORT_FILM.id);
                  }}
                  alt={SHORT_FILM.title}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                  loading="lazy"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: `linear-gradient(to top, ${PAPER_DEEP}, ${PAPER_DEEP}10, transparent)` }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span
                    className="flex h-16 w-16 items-center justify-center rounded-full shadow-lg transition group-hover:scale-110 md:h-20 md:w-20"
                    style={{ backgroundColor: CLAY, color: PAPER }}
                  >
                    <Play className="h-7 w-7 translate-x-0.5 fill-current md:h-8 md:w-8" />
                  </span>
                </div>
              </div>

              <Strata />

              <div className="flex flex-col gap-2 p-6 md:flex-row md:items-end md:justify-between md:p-8">
                <h3 className="text-2xl leading-tight md:text-3xl" style={DISPLAY}>
                  {SHORT_FILM.title}
                </h3>
                <span className="text-xs uppercase tracking-[0.2em]" style={{ ...MONO, color: MUTED }}>
                  Press play →
                </span>
              </div>
            </button>
          </div>
        </section>

        {/* Modal */}
        {active && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md animate-fade-in"
            style={{ backgroundColor: `${INK}D9` }}
            onClick={() => setActive(null)}
          >
            <div
              className="relative w-full max-w-5xl overflow-hidden rounded-sm border shadow-2xl animate-scale-in"
              style={{ borderColor: `${GOLD}55`, backgroundColor: PAPER_DEEP }}
              onClick={(e) => e.stopPropagation()}
            >
              <Strata />

              <div
                className="flex items-center justify-between gap-4 border-y px-5 py-4"
                style={{ borderColor: `${GOLD}30` }}
              >
                <div className="min-w-0">
                  <div className="text-[10px] uppercase tracking-[0.25em]" style={{ ...MONO, color: CLAY }}>
                    No.00 · Feature specimen · {active.runtime}
                  </div>
                  <h3 className="mt-1 truncate text-lg md:text-xl" style={DISPLAY}>
                    {active.title}
                  </h3>
                </div>
                <button
                  onClick={() => setActive(null)}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition hover:opacity-85"
                  style={{ backgroundColor: CLAY, color: PAPER }}
                  aria-label="Close video"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div
                className={
                  active.kind === "film"
                    ? "relative aspect-video w-full bg-black"
                    : "relative mx-auto aspect-[9/16] w-full max-w-[420px] bg-black"
                }
              >
                <iframe
                  key={active.id}
                  src={`https://www.youtube.com/embed/${active.id}?autoplay=1&rel=0&modestbranding=1`}
                  title={active.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full"
                />
              </div>

              <div
                className="flex items-center justify-between border-t px-5 py-3 text-[10px] uppercase tracking-[0.2em]"
                style={{ ...MONO, borderColor: `${GOLD}25`, color: MUTED }}
              >
                <span>Use player controls to pause</span>
                <span>Esc or ✕ to close</span>
              </div>
              <Strata />
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

//modificaion