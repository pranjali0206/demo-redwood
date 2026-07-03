import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { ScrollPlayer } from "@/components/site/ScrollPlayer";
import { Film, Leaf, Camera, Trees } from "lucide-react";

import plantationAerial from "@/assets/plantation-aerial.jpg";
import sapling from "@/assets/sapling.jpg";
import canopy from "@/assets/canopy.jpg";
import inspection from "@/assets/inspection.jpg";
import nursery from "@/assets/nursery.jpg";
import sunrise from "@/assets/sunrise.jpg";
import galleryBg from "@/assets/gallerybg.png";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Redwood Biotech | Plantations, Films & Sites" },
      {
        name: "description",
        content:
          "A visual journey through Redwood Biotech's Hi-Tech Sagwan Teak plantations, sites, and the science of genetically engineered agroforestry.",
      },
      { property: "og:title", content: "Gallery — Redwood Biotech" },
      {
        property: "og:description",
        content:
          "Documentary films, plantation footage and site photography from Redwood Biotech.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: GalleryPage,
});

// Shorts 02, 04, 06 removed — playback wasn't working for those clips.
const SHORTS = [
  { id: "Ju7WXknxGUQ", label: "From the field · 01" },
  { id: "3Gf3wOLFj0U", label: "From the field · 03" },
  { id: "eMuN0Mf30e4", label: "From the field · 05" },
  { id: "iN4HbisWBzk", label: "From the field · 07" },
];

const PHOTOS = [
  { src: plantationAerial, alt: "Aerial view of a mature teak plantation", span: "md:col-span-2 md:row-span-2" },
  { src: sapling, alt: "A teak sapling being planted", span: "" },
  { src: nursery, alt: "Rows of saplings in the nursery", span: "" },
  { src: canopy, alt: "A path through the teak canopy", span: "md:row-span-2" },
  { src: inspection, alt: "Field team inspecting a mature trunk", span: "" },
  { src: sunrise, alt: "Sunrise over the plantation silhouette", span: "md:col-span-2" },
];

const SITES = [
  { name: "Karnataka Estate", area: "180 acres", trees: "42,000+", img: plantationAerial },
  { name: "Maharashtra Site", area: "120 acres", trees: "28,500+", img: canopy },
  { name: "Madhya Pradesh Belt", area: "260 acres", trees: "61,000+", img: sunrise },
];

function GalleryPage() {
  return (
    // Explicit, always-opaque colors from here down — no reliance on
    // theme tokens for background opacity, so contrast can't silently break.
    <div className="min-h-screen bg-stone-950 text-stone-100">
      <Navbar />

      {/* ── Hero ─────────────────────────────────────── */}
      <section className="relative pt-32 pb-28 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img src={galleryBg} alt="" className="h-full w-full object-cover" />
          {/* Light wash so the photo stays visible — just enough to protect the navbar
              at the top and blend into the next section at the bottom. */}
          <div className="absolute inset-0 bg-gradient-to-b from-stone-950/55 via-stone-950/10 to-stone-950" />
        </div>

        <div className="mx-auto max-w-6xl px-6 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/40 bg-black/30 backdrop-blur-sm px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-amber-200">
            <Leaf size={12} /> Gallery
          </span>

          {/* Glass panel behind the headline so it reads clearly over any part
              of the photo, regardless of how bright that area is. */}
          <div className="mt-6 inline-block rounded-3xl border border-white/10 bg-black/35 backdrop-blur-md px-6 py-8 sm:px-12 sm:py-10">
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl leading-[1.05] text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.45)]">
              A visual journey through
              <br />
              <span className="bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 bg-clip-text text-transparent italic">
                our forests
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-stone-200 leading-relaxed">
              Documentary films, on-ground footage, and photography from every stage of the
              Redwood Biotech Hi-Tech Sagwan Teak journey — from nursery to canopy.
            </p>
          </div>
        </div>
      </section>

      {/* ── Featured Documentary ─────────────────────── */}
      <section className="relative mx-auto max-w-6xl px-6 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-amber-300">
              <Film size={12} /> Featured film
            </span>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl text-white">
              The{" "}
              <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-emerald-400 bg-clip-text text-transparent">
                Redwood Documentary
              </span>
            </h2>
            <p className="mt-2 text-sm text-stone-400 max-w-xl">
              A short film about the science, the land, and the people behind our
              genetically engineered teak.
            </p>
          </div>
        </div>

        <ScrollPlayer
          videoId="b40C775NSbg"
          aspect="video"
          title="Redwood Biotech · Short Film"
          poster={plantationAerial}
        />
      </section>

      {/* ── Field Shorts ─────────────────────────────── */}
      <section className="relative py-20 border-y border-white/10 bg-gradient-to-br from-emerald-950 via-emerald-900 to-stone-950">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-amber-300">
              <Camera size={12} /> From the field
            </span>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl text-white">
              Moments from our plantations
            </h2>
            <p className="mt-3 text-sm text-emerald-100/70">
              Short vertical clips captured across our sites. Use each video's controls
              to play, pause, or unmute — only one clip plays at a time.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {SHORTS.map((s) => (
              <ScrollPlayer
                key={s.id}
                videoId={s.id}
                aspect="short"
                title={s.label}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Photography Grid ─────────────────────────── */}
      <section className="relative mx-auto max-w-7xl px-6 py-24">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-amber-300">
            <Camera size={12} /> Photography
          </span>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl text-white">
            The land,{" "}
            <span className="bg-gradient-to-r from-amber-400 to-emerald-400 bg-clip-text text-transparent">
              up close
            </span>
          </h2>
          <p className="mt-3 text-sm text-stone-400">
            From sapling to canopy — every frame tells the story of engineered growth.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[220px] gap-4">
          {PHOTOS.map((p, i) => (
            <figure
              key={i}
              className={`relative overflow-hidden rounded-2xl ring-1 ring-white/10 group ${p.span}`}
            >
              <img
                src={p.src}
                alt={p.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <figcaption className="absolute bottom-3 left-4 right-4 text-xs text-white/95 opacity-0 group-hover:opacity-100 transition-opacity">
                {p.alt}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ── Sites & Plantations ──────────────────────── */}
      <section className="relative py-24 border-t border-white/10 bg-gradient-to-br from-emerald-950 via-stone-950 to-amber-950/60">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-amber-300">
              <Trees size={12} /> Sites &amp; plantations
            </span>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl text-white">
              Where our forests grow
            </h2>
            <p className="mt-3 text-sm text-emerald-100/70">
              Estates spread across India, each managed end-to-end by the Redwood team.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {SITES.map((s) => (
              <article
                key={s.name}
                className="group relative overflow-hidden rounded-2xl ring-1 ring-white/10 bg-stone-900"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={s.img}
                    alt={s.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-display text-2xl text-white">{s.name}</h3>
                  <div className="mt-3 flex gap-4 text-xs uppercase tracking-widest text-stone-300">
                    <span>
                      <span className="block text-amber-300 text-sm normal-case tracking-normal font-semibold">
                        {s.area}
                      </span>
                      Area
                    </span>
                    <span className="border-l border-white/20 pl-4">
                      <span className="block text-amber-300 text-sm normal-case tracking-normal font-semibold">
                        {s.trees}
                      </span>
                      Trees
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────── */}
      <section className="relative bg-gradient-to-b from-stone-950 via-emerald-950 to-stone-950">
        <div className="mx-auto max-w-4xl px-6 py-24 text-center">
          <h2 className="font-display text-4xl sm:text-5xl leading-tight text-white">
            Ready to grow a forest{" "}
            <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-emerald-400 bg-clip-text text-transparent italic">
              on your land?
            </span>
          </h2>
          <p className="mt-4 text-stone-300 max-w-xl mx-auto">
            Partner with Redwood Biotech. We plant, manage, and sell — you earn.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="https://redwoodbiotech.in/#contact"
              className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-ember hover:brightness-110 transition"
            >
              Become a Partner →
            </a>
            <a
              href="https://redwoodbiotech.in"
              className="inline-flex items-center justify-center rounded-md border border-white/20 px-6 py-3 text-sm font-semibold text-white hover:border-amber-300 hover:text-amber-300 transition"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}