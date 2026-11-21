import { RINGS } from "./constants";

/**
 * Tree-ring logo placeholder: three concentric rings, one in each corner colour (brown, green,
 * red, from the centre out). Each ring carries `rw-ring` so it can be stroke-drawn outward.
 * Replace with the real Redwood logo before launch.
 */
export function RedwoodMark({ className = "", title }: { className?: string; title?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 40 40"
      width="40"
      height="40"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      <g fill="none" stroke="currentColor" strokeWidth="1.75">
        {RINGS.map((r, k) => (
          <circle key={r} className={`rw-ring rw-ring--${k + 1}`} cx="20" cy="20" r={r} />
        ))}
      </g>
      <circle cx="20" cy="20" r="1.6" fill="currentColor" />
    </svg>
  );
}
