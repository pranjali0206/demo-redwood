import { useEffect, useRef, useState } from "react";
import { gsap } from "@/components/triangle/gsapSetup";
import { DRONE_CAPTION, DRONE_VIDEO, FULL_VIDEO_URL, SITE_PHOTOS } from "./content";
import { BookLink, EASE, Headline, Icon, Media, useReveal } from "./ui";

/** 3.4 — See It for Yourself.: real drone footage and site photos. */
export function SeeIt() {
  const ref = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<number | null>(null);
  useReveal(ref, (root) => {
    const row = root.querySelector(".rwh-gallery")!;
    gsap.from(row.children, {
      y: 16,
      autoAlpha: 0,
      duration: 0.6,
      stagger: 0.08,
      ease: EASE,
      scrollTrigger: { trigger: row, start: "top 90%", once: true },
    });
  });
  const photos = SITE_PHOTOS.filter((p) => p.src);

  return (
    <section ref={ref} className="rwh rwh-sec rwh-bg-0" aria-labelledby="see-title">
      <div className="rwh-wrap">
        <header className="rwh-head">
          <p className="rwh-eyebrow" data-rv="up">
            REAL LAND. REAL TREES.
          </p>
          <Headline id="see-title">
            See It <em>for Yourself.</em>
          </Headline>
        </header>

        <div data-rv="unmask">
          <DroneVideo />
        </div>

        <div className="rwh-gallery" role="list" aria-label="Site photos">
          {SITE_PHOTOS.map((p, i) =>
            p.src ? (
              <div key={i} role="listitem" className="rwh-gallery__item">
                <button
                  type="button"
                  className="rwh-gallery__btn"
                  onClick={() => setOpen(photos.indexOf(p))}
                  aria-label={`Open photo: ${p.alt}`}
                >
                  <Media
                    src={p.src}
                    alt={p.alt}
                    ratio="4 / 5"
                    placeholder={p.caption}
                    sizes="(min-width: 1024px) 280px, 70vw"
                  />
                  <span className="rwh-chip">
                    <Icon name="pin" size={13} />
                    {p.caption}
                  </span>
                </button>
              </div>
            ) : (
              <div key={i} role="listitem" className="rwh-gallery__item">
                <Media ratio="4 / 5" placeholder={p.caption} />
              </div>
            ),
          )}
        </div>

        <div className="rwh-actions" data-rv="up">
          <BookLink />
          {FULL_VIDEO_URL ? (
            <a
              href={FULL_VIDEO_URL}
              className="rwh-btn rwh-btn--secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="play" size={16} />
              <span>Watch full video</span>
            </a>
          ) : null}
        </div>
      </div>
      <Lightbox photos={photos} index={open} onIndex={setOpen} />
    </section>
  );
}

/**
 * The drone film. Desktop: muted loop that plays only while on screen, with a pause button.
 * Phones: no autoplay, tap to play. Until the footage is supplied, a bracketed empty state.
 */
function DroneVideo() {
  const vRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [paused, setPaused] = useState(false); // the visitor paused it: don't resume on scroll
  const has = !!(DRONE_VIDEO.mp4 || DRONE_VIDEO.webm);

  useEffect(() => {
    const v = vRef.current;
    if (!v || !has) return;
    const desktop = window.matchMedia("(min-width: 1024px) and (hover: hover)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && v.preload === "none") v.preload = "metadata";
        if (!desktop || reduce || paused) return;
        if (e.intersectionRatio > 0.5) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: [0, 0.5], rootMargin: "50% 0px" },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [has, paused]);

  if (!has) {
    return (
      <div className="rwh-video">
        <Media ratio="16 / 9" placeholder="[Drone video — Redwood site]" icon="video" />
        <span className="rwh-chip rwh-video__chip">{DRONE_CAPTION}</span>
      </div>
    );
  }
  const toggle = () => {
    const v = vRef.current;
    if (!v) return;
    if (v.paused) {
      setPaused(false);
      v.play().catch(() => {});
    } else {
      setPaused(true);
      v.pause();
    }
  };
  return (
    <div className={`rwh-video ${DRONE_VIDEO.ratio === "9 / 16" ? "rwh-video--portrait" : ""}`}>
      <div className="rwh-media" style={{ aspectRatio: DRONE_VIDEO.ratio }}>
        <video
          ref={vRef}
          muted
          loop
          playsInline
          preload="none"
          poster={DRONE_VIDEO.poster || undefined}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          aria-label={DRONE_CAPTION}
        >
          {DRONE_VIDEO.webm ? <source src={DRONE_VIDEO.webm} type="video/webm" /> : null}
          {DRONE_VIDEO.mp4 ? <source src={DRONE_VIDEO.mp4} type="video/mp4" /> : null}
        </video>
      </div>
      <button
        type="button"
        className={`rwh-video__btn ${playing ? "is-playing" : ""}`}
        onClick={toggle}
        aria-label={playing ? "Pause video" : "Play video"}
      >
        <Icon name={playing ? "pause" : "play"} size={playing ? 18 : 26} />
      </button>
      <span className="rwh-chip rwh-video__chip">{DRONE_CAPTION}</span>
    </div>
  );
}

/** Full-screen photo viewer: arrow keys and swipe to move, Esc to close. */
function Lightbox({
  photos,
  index,
  onIndex,
}: {
  photos: { src: string; alt: string; caption: string }[];
  index: number | null;
  onIndex: (i: number | null) => void;
}) {
  const dRef = useRef<HTMLDialogElement>(null);
  const startX = useRef<number | null>(null);
  useEffect(() => {
    const d = dRef.current;
    if (!d) return;
    if (index !== null && !d.open) d.showModal();
    if (index === null && d.open) d.close();
  }, [index]);
  if (!photos.length) return null;
  const i = index ?? 0;
  const go = (step: number) => onIndex((i + step + photos.length) % photos.length);
  const p = photos[i];
  return (
    <dialog
      ref={dRef}
      className="rwh-lightbox"
      aria-label="Site photo"
      onClose={() => onIndex(null)}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(1);
        if (e.key === "ArrowLeft") go(-1);
      }}
      onClick={(e) => {
        if (e.target === dRef.current) onIndex(null);
      }}
      onPointerDown={(e) => (startX.current = e.clientX)}
      onPointerUp={(e) => {
        if (startX.current === null) return;
        const dx = e.clientX - startX.current;
        startX.current = null;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
      }}
    >
      <figure className="rwh-lightbox__fig">
        <img src={p.src} alt={p.alt} />
        <figcaption>
          <span>{p.caption}</span>
          <span className="rwh-lightbox__count">
            {i + 1} / {photos.length}
          </span>
        </figcaption>
      </figure>
      <button
        type="button"
        className="rwh-lightbox__nav is-prev"
        onClick={() => go(-1)}
        aria-label="Previous photo"
      >
        <Icon name="left" size={22} />
      </button>
      <button
        type="button"
        className="rwh-lightbox__nav is-next"
        onClick={() => go(1)}
        aria-label="Next photo"
      >
        <Icon name="right" size={22} />
      </button>
      <button
        type="button"
        className="rwh-lightbox__close"
        onClick={() => onIndex(null)}
        aria-label="Close"
      >
        <Icon name="close" size={22} />
      </button>
    </dialog>
  );
}
