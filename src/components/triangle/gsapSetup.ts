import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { SplitText } from "gsap/SplitText";

// GSAP 3.13+ ships every plugin free; registering is safe on the server (no window access).
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, SplitText);

if (typeof window !== "undefined") {
  // Phone address bars resize the viewport constantly; a refresh there would jump the pin.
  ScrollTrigger.config({ ignoreMobileResize: true });
}

export { gsap, ScrollTrigger, MotionPathPlugin, SplitText };

/** Reads a design token off an element (never hard-code hex in components). */
export function token(el: Element, name: string) {
  return getComputedStyle(el).getPropertyValue(name).trim();
}

/**
 * Prepares SVG strokes for a draw-on: offset = length hides the stroke (0 when `covered`).
 * The gap is a little longer than the path so the next dash never starts exactly at its end,
 * where a round line cap would otherwise show a stray dot.
 */
export function prepDraw(els: Element[], covered = false) {
  els.forEach((el) => {
    const len = (el as SVGGeometryElement).getTotalLength();
    (el as SVGElement).dataset.len = String(len);
    gsap.set(el, { strokeDasharray: `${len} ${len + 4}`, strokeDashoffset: covered ? 0 : len });
  });
}
