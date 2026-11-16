import { useEffect, useRef, type AnchorHTMLAttributes, type ReactNode } from "react";
import { gsap } from "./gsapSetup";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: "primary" | "secondary";
  block?: boolean;
  /** Desktop only: the pill drifts up to 6px towards the cursor within 80px. */
  magnetic?: boolean;
  /** Adds the glow ring the finale expands once. */
  ring?: boolean;
  arrow?: boolean;
  children: ReactNode;
};

export function RwButton({
  variant = "primary",
  block,
  magnetic,
  ring,
  arrow = variant === "primary",
  className = "",
  children,
  ...rest
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!magnetic || !el) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      // distance from the pill's edge, not its centre
      const gap = Math.hypot(
        Math.max(0, Math.abs(dx) - r.width / 2),
        Math.max(0, Math.abs(dy) - r.height / 2),
      );
      if (gap > 80) {
        xTo(0);
        yTo(0);
        return;
      }
      const pull = 6 * (1 - gap / 80);
      const len = Math.hypot(dx, dy) || 1;
      xTo((dx / len) * pull);
      yTo((dy / len) * pull);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      gsap.set(el, { x: 0, y: 0 });
    };
  }, [magnetic]);

  const cls = ["rw-btn", `rw-btn--${variant}`, block ? "rw-btn--block" : "", className]
    .filter(Boolean)
    .join(" ");

  return (
    <a ref={ref} className={cls} {...rest}>
      <span>{children}</span>
      {arrow ? (
        <svg
          className="rw-btn__arrow"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      ) : null}
      {ring ? <span className="rw-btn-ring" aria-hidden="true" /> : null}
    </a>
  );
}
