/**
 * Shared pieces for the homepage sections: the line-icon set, buttons, the media slot (with its
 * empty state), analytics and the reveal motion.
 */
import { useEffect, type ReactNode, type RefObject } from "react";
import { gsap, ScrollTrigger, SplitText } from "@/components/triangle/gsapSetup";
import { cubicBezier } from "@/components/city/cityPaint";
import { whatsappHref } from "./content";

/* Analytics ---------------------------------------------------------------------------------- */

/**
 * Pushes an event to `window.dataLayer` (Google Tag Manager picks it up when installed) and
 * dispatches a `rwb:track` DOM event for any other listener.
 */
export function track(event: string, props: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { dataLayer?: unknown[] };
  (w.dataLayer ??= []).push({ event, ...props });
  window.dispatchEvent(new CustomEvent("rwb:track", { detail: { event, ...props } }));
}

/* Icons -------------------------------------------------------------------------------------- */

const PATHS: Record<string, string[]> = {
  drop: [
    "M12 3.5c3.2 4 5.5 7.3 5.5 10.2a5.5 5.5 0 0 1-11 0c0-2.9 2.3-6.2 5.5-10.2Z",
    "M9.4 14.3a2.7 2.7 0 0 0 2.3 2.5",
  ],
  shield: [
    "M12 3 4.8 5.9v5.6c0 4.5 3 8.1 7.2 9.5 4.2-1.4 7.2-5 7.2-9.5V5.9L12 3Z",
    "m9.2 12.2 2 2 3.8-4",
  ],
  leaf: ["M5 19C5 11 10 5.5 19 5c.4 9-5 14-12 14H5Z", "M5 19 13.5 10.5"],
  logs: [
    "M8 12.2a3.4 3.4 0 1 0 0 6.8 3.4 3.4 0 0 0 0-6.8Z",
    "M16 12.2a3.4 3.4 0 1 0 0 6.8 3.4 3.4 0 0 0 0-6.8Z",
    "M12 5.2a3.4 3.4 0 1 0 0 6.8 3.4 3.4 0 0 0 0-6.8Z",
    "M8 14.9v1.4M16 14.9v1.4M12 7.9v1.4",
  ],
  play: ["M8.5 5.8v12.4L18.5 12 8.5 5.8Z"],
  pause: ["M9 6.5v11M15 6.5v11"],
  pin: [
    "M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z",
    "M12 7.8a2.2 2.2 0 1 0 0 4.4 2.2 2.2 0 0 0 0-4.4Z",
  ],
  phone: [
    "M6 4.5h2.8l1.5 3.9-2 1.4a11 11 0 0 0 5.9 5.9l1.4-2 3.9 1.5V18a1.5 1.5 0 0 1-1.6 1.5A15.5 15.5 0 0 1 4.5 6.1 1.5 1.5 0 0 1 6 4.5Z",
  ],
  mail: ["M4 6.5h16v11H4z", "m4.6 7.2 7.4 5.9 7.4-5.9"],
  chat: [
    "M5 18.8V7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H9l-4 2.8Z",
    "M8.5 9.5h7M8.5 12.5h4.5",
  ],
  cap: [
    "M2.5 9.5 12 5l9.5 4.5L12 14 2.5 9.5Z",
    "M6.5 11.6v4c1.5 1.3 3.4 2 5.5 2s4-.7 5.5-2v-4",
    "M21.5 9.5v5",
  ],
  check: ["m5 12.5 4.2 4.2L19 7"],
  arrow: ["M5 12h14", "m13 6 6 6-6 6"],
  plus: ["M12 5v14", "M5 12h14"],
  alert: ["M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17Z", "M12 8v4.8", "M12 16.1v.2"],
  close: ["M6.5 6.5l11 11", "M17.5 6.5l-11 11"],
  left: ["m14.5 6-6 6 6 6"],
  right: ["m9.5 6 6 6-6 6"],
  image: [
    "M4 5.5h16v13H4z",
    "m4 15 4.5-4.5 4 4 2.5-2.5 5 5",
    "M15.5 8.4a1.3 1.3 0 1 0 0 2.6 1.3 1.3 0 0 0 0-2.6Z",
  ],
  video: ["M4 6.5h11v11H4z", "m15 10.5 5-3v9l-5-3"],
  user: [
    "M12 12a3.8 3.8 0 1 0 0-7.6 3.8 3.8 0 0 0 0 7.6Z",
    "M4.5 20c1.3-3.6 4.2-5.5 7.5-5.5s6.2 1.9 7.5 5.5",
  ],
  flask: [
    "M9.5 3.5h5",
    "M10.5 3.5v5.8L5.2 18a1.8 1.8 0 0 0 1.6 2.5h10.4a1.8 1.8 0 0 0 1.6-2.5l-5.3-8.7V3.5",
    "M7.6 14.6h8.8",
  ],
  dot: ["M12 10.6a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8Z"],
};
export type IconName = keyof typeof PATHS;

/** One consistent set: 24 px grid, 1.5 px stroke, round caps. `draw` readies it to draw on. */
export function Icon({
  name,
  size = 20,
  draw = false,
  className = "",
}: {
  name: IconName;
  size?: number;
  draw?: boolean;
  className?: string;
}) {
  return (
    <svg
      className={`rwh-icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={(1.5 * 24) / size}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {PATHS[name].map((d) => (
        <path key={d} d={d} pathLength={draw ? 1 : undefined} data-draw={draw ? "" : undefined} />
      ))}
    </svg>
  );
}

/** The WhatsApp mark, drawn as a simple glyph in WhatsApp green. */
export function WhatsAppGlyph({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d="M12 2.6a9.3 9.3 0 0 0-8 14.1L2.7 21.4l4.8-1.3A9.3 9.3 0 1 0 12 2.6Z"
        fill="none"
        stroke="#25D366"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M9 7.6c.3-.1.6 0 .7.3l.8 1.9c.1.3 0 .5-.2.7l-.6.7c.6 1.3 1.6 2.3 2.9 2.9l.7-.6c.2-.2.5-.3.7-.2l1.9.8c.3.1.4.4.3.7-.3 1.1-1.2 1.7-2.3 1.6-2.9-.4-5.6-3.1-6-6-.1-1.1.5-2 1.6-2.3Z"
        fill="#25D366"
      />
    </svg>
  );
}

/* Buttons and links -------------------------------------------------------------------------- */

/** Scrolls to the booking form and puts the cursor in the first field. */
export function goToBooking(e?: { preventDefault: () => void }) {
  const form = document.getElementById("contact");
  if (!form) return;
  e?.preventDefault();
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  form.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  const focus = () =>
    form.querySelector<HTMLInputElement>("input[name='name']")?.focus({ preventScroll: true });
  if (reduce) focus();
  else window.setTimeout(focus, 900);
}

export function BookLink({
  children = "Book a Site Visit",
  className = "",
}: {
  children?: ReactNode;
  className?: string;
}) {
  return (
    <a href="#contact" className={`rwh-btn rwh-btn--primary ${className}`} onClick={goToBooking}>
      <span>{children}</span>
      <Icon name="arrow" size={18} className="rwh-btn__arrow" />
    </a>
  );
}

export function WhatsAppButton({
  location,
  children = "WhatsApp us",
  className = "",
}: {
  location: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={whatsappHref()}
      target="_blank"
      rel="noopener noreferrer"
      className={`rwh-btn rwh-btn--secondary rwh-btn--wa ${className}`}
      onClick={() => track("whatsapp_click", { location })}
    >
      <WhatsAppGlyph />
      <span>{children}</span>
    </a>
  );
}

/* Media -------------------------------------------------------------------------------------- */

/**
 * A photo slot with reserved space (no layout shift). Without a source it shows the empty state:
 * a paper box, a thin line icon and the caption in brackets.
 */
export function Media({
  src,
  alt = "",
  ratio,
  placeholder,
  icon = "image",
  className = "",
  sizes,
  eager = false,
  children,
}: {
  src?: string;
  alt?: string;
  ratio: string;
  placeholder: string;
  icon?: IconName;
  className?: string;
  sizes?: string;
  eager?: boolean;
  children?: ReactNode;
}) {
  return (
    <div className={`rwh-media ${className}`} style={{ aspectRatio: ratio }}>
      {src ? (
        <img
          src={src}
          alt={alt}
          sizes={sizes}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
        />
      ) : (
        <div className="rwh-empty" role="img" aria-label={placeholder}>
          <Icon name={icon} size={28} />
          <span>{placeholder}</span>
        </div>
      )}
      {children}
    </div>
  );
}

/* Motion ------------------------------------------------------------------------------------- */

export const EASE = cubicBezier(0.22, 1, 0.36, 1);
const START = "top 85%";

/**
 * Reveal-on-scroll for one section, played once:
 *  [data-rv="lines"]   headline, line by line behind a mask (70 ms stagger)
 *  [data-rv="up"]      rises 16 px and fades in (600 ms)
 *  [data-rv="stagger"] its children rise in turn (80 ms stagger)
 *  [data-rv="unmask"]  unmasks upward (clip-path, 900 ms)
 * `extra` adds the section's own choreography. With reduced motion nothing moves: everything
 * is simply there.
 */
export function useReveal(ref: RefObject<HTMLElement | null>, extra?: (root: HTMLElement) => void) {
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let cancelled = false;
    let ctx: gsap.Context | null = null;
    document.fonts.ready.then(() => {
      if (cancelled) return;
      ctx = gsap.context(() => {
        root.querySelectorAll<HTMLElement>("[data-rv='lines']").forEach((el) => {
          const split = SplitText.create(el, { type: "lines", mask: "lines" });
          gsap.from(split.lines, {
            yPercent: 110,
            duration: 0.8,
            stagger: 0.07,
            ease: EASE,
            scrollTrigger: { trigger: el, start: START, once: true },
            onComplete: () => split.revert(),
          });
        });
        root.querySelectorAll<HTMLElement>("[data-rv='up']").forEach((el) => {
          gsap.from(el, {
            y: 16,
            autoAlpha: 0,
            duration: 0.6,
            ease: EASE,
            scrollTrigger: { trigger: el, start: START, once: true },
          });
        });
        root.querySelectorAll<HTMLElement>("[data-rv='stagger']").forEach((el) => {
          gsap.from(el.children, {
            y: 16,
            autoAlpha: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: EASE,
            scrollTrigger: { trigger: el, start: START, once: true },
          });
        });
        root.querySelectorAll<HTMLElement>("[data-rv='unmask']").forEach((el) => {
          gsap.fromTo(
            el,
            { clipPath: "inset(100% 0% 0% 0%)" },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 0.9,
              ease: EASE,
              clearProps: "clipPath",
              scrollTrigger: { trigger: el, start: START, once: true },
            },
          );
        });
        extra?.(root);
      }, root);
      ScrollTrigger.refresh();
    });
    return () => {
      cancelled = true;
      ctx?.revert();
    };
    // The section's choreography is fixed for its lifetime.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

/** Draws an element's `[data-draw]` paths on (stroke-dashoffset), once, when it scrolls in. */
export function drawPaths(
  el: Element,
  opts: { delay?: number; duration?: number; trigger?: Element } = {},
) {
  const paths = el.querySelectorAll<SVGPathElement>("[data-draw]");
  gsap.fromTo(
    paths,
    { strokeDasharray: 1, strokeDashoffset: 1 },
    {
      strokeDashoffset: 0,
      duration: opts.duration ?? 0.5,
      delay: opts.delay ?? 0,
      ease: "power1.inOut",
      scrollTrigger: { trigger: opts.trigger ?? el, start: START, once: true },
    },
  );
}

/** A section headline with its one italic crimson accent phrase. */
export function Headline({
  id,
  children,
  className = "",
}: {
  id: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2 id={id} className={`rwh-h2 ${className}`} data-rv="lines">
      {children}
    </h2>
  );
}
