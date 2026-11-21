import type { ReactNode } from "react";

/**
 * The three illustrated scenes, drawn flat in the palette only (fills and strokes come from the
 * rw-f-* / rw-s-* token classes). Every layer that moves has an s1-/s2-/s3- class hook that
 * TriangleSection animates. The scenes are decorative: the copy lives in real HTML next to them.
 */

function Scene({ children }: { children: ReactNode }) {
  return (
    <svg className="rw-scene" viewBox="0 0 172 84" aria-hidden="true" focusable="false">
      {children}
    </svg>
  );
}

/* Scene 01 — Registry ------------------------------------------------------------------------- */

const PLOT = "14,70 88,70 108,44 34,44";
const PEGS: [number, number][] = [
  [14, 70],
  [88, 70],
  [108, 44],
  [34, 44],
];

export function Scene01() {
  return (
    <Scene>
      {/* dotted flight path from the top-right; the document follows it */}
      <path
        className="s1-path rw-s-ink"
        d="M172 -8 C 160 6, 146 12, 124 32"
        fill="none"
        strokeOpacity="0.35"
        strokeWidth="1"
        strokeDasharray="1 4"
        strokeLinecap="round"
      />
      {/* land plot: dashed boundary closes into a solid line, pegs light up */}
      <polygon
        className="s1-plot-dash rw-s-teak6 rw-f-teak"
        points={PLOT}
        fillOpacity="0.1"
        strokeWidth="1.2"
        strokeDasharray="4 4"
        strokeLinejoin="round"
      />
      <polygon
        className="s1-plot-solid rw-s-teak6"
        points={PLOT}
        fill="none"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <g className="rw-f-teak">
        {PEGS.map(([x, y]) => (
          <circle key={`${x}-${y}`} className="s1-peg" cx={x} cy={y} r="2.6" />
        ))}
      </g>
      {/* registry document, centred on its own origin so MotionPath can align it */}
      <g className="s1-doc">
        <rect className="rw-paper" x="-22" y="-29" width="44" height="58" rx="3" />
        <g className="rw-s-ink" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.22">
          <line x1="-15" y1="-17" x2="15" y2="-17" />
          <line x1="-15" y1="-9" x2="11" y2="-9" />
          <line x1="-15" y1="-1" x2="14" y2="-1" />
        </g>
        <path
          className="s1-name rw-s-teak6"
          d="M-15 12 c 3 -6, 5 2, 8 -1 s 5 -5, 8 0 s 4 4, 8 -1 s 3 -2, 5 0"
          fill="none"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <g className="s1-seal" transform="translate(13 19)">
          <circle className="rw-f-teak6" r="6.5" />
          <circle className="rw-s-parch50" r="4" fill="none" strokeWidth="1" strokeOpacity="0.8" />
        </g>
        <circle className="s1-ripple rw-s-teak" cx="13" cy="19" r="7" fill="none" strokeWidth="1" />
      </g>
    </Scene>
  );
}

/* Scene 02 — Growth --------------------------------------------------------------------------- */

const DROPS = [40, 72, 104, 136];
const SAPLINGS = [
  { x: 44, h: 18, pairs: [0.6] },
  { x: 88, h: 28, pairs: [0.5, 0.8] },
  { x: 132, h: 40, pairs: [0.45, 0.72] },
];

export function Scene02() {
  return (
    <Scene>
      <line className="s2-ground rw-s-ink" x1="12" y1="70" x2="160" y2="70" strokeOpacity="0.22" />
      <g className="rw-f-water">
        {DROPS.map((x) => (
          <path
            key={x}
            className="s2-drop"
            transform={`translate(${x} 8)`}
            d="M0 -5 C 2.6 -1.5, 3.6 1, 0 4 C -3.6 1, -2.6 -1.5, 0 -5"
          />
        ))}
      </g>
      {SAPLINGS.map((s, i) => (
        <g key={s.x} className="s2-sapling">
          <line
            className="rw-s-leaf6"
            x1={s.x}
            y1="70"
            x2={s.x}
            y2={70 - s.h}
            strokeWidth="2"
            strokeLinecap="round"
          />
          {s.pairs.map((p) => {
            const y = 70 - s.h * p;
            const third = i === 2 ? " s2-leaf--3" : "";
            return (
              <g key={p} className="rw-f-leaf">
                <ellipse
                  className={`s2-leaf${third}`}
                  data-rot="-35"
                  data-origin={`${s.x} ${y}`}
                  cx={s.x - 5}
                  cy={y}
                  rx="5.2"
                  ry="2.4"
                />
                <ellipse
                  className={`s2-leaf${third}`}
                  data-rot="35"
                  data-origin={`${s.x} ${y}`}
                  cx={s.x + 5}
                  cy={y}
                  rx="5.2"
                  ry="2.4"
                />
              </g>
            );
          })}
        </g>
      ))}
      {/* the third sapling becomes a full tree by year 12 */}
      <line
        className="s2-trunk rw-s-teak6"
        x1="132"
        y1="70"
        x2="132"
        y2="44"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <g className="s2-canopy rw-f-leaf">
        <circle cx="121" cy="36" r="12" />
        <circle cx="134" cy="29" r="14" />
        <circle cx="145" cy="38" r="11" />
      </g>
    </Scene>
  );
}

/* Scene 03 — Harvest -------------------------------------------------------------------------- */

const LOGS: [number, number][] = [
  [28, 62],
  [46, 62],
  [64, 62],
  [37, 48],
  [55, 48],
];

export function Scene03() {
  return (
    <Scene>
      <g className="s3-tree">
        <line
          className="rw-s-teak6"
          x1="40"
          y1="70"
          x2="40"
          y2="42"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <g className="rw-f-leaf">
          <circle cx="31" cy="38" r="10" />
          <circle cx="42" cy="29" r="12" />
          <circle cx="51" cy="39" r="9" />
        </g>
      </g>
      <g className="s3-logs">
        {LOGS.map(([x, y]) => (
          <g key={`${x}-${y}`} className="s3-log" transform={`translate(${x} ${y})`}>
            <circle className="rw-f-bark" r="8" />
            <circle className="s3-ring rw-s-teak6" r="5.2" fill="none" strokeWidth="1" />
            <circle className="s3-ring rw-s-teak6" r="2.6" fill="none" strokeWidth="1" />
          </g>
        ))}
      </g>
      {/* a small axis and a rising line in the returns red: no numbers anywhere */}
      <path
        className="s3-axis rw-s-ink"
        d="M98 14 V 72 H 162"
        fill="none"
        strokeOpacity="0.3"
        strokeWidth="1"
      />
      <path
        className="s3-fill rw-f-red"
        d="M102 66 C 120 62, 134 54, 156 22 L 156 70 L 102 70 Z"
      />
      <path
        className="s3-line rw-s-red"
        d="M102 66 C 120 62, 134 54, 156 22"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <polygon className="s3-arrow rw-f-red" points="157,20 148,24 153,30" />
    </Scene>
  );
}
