export const EASE = [0.22, 1, 0.36, 1] as const;

// Deterministic pseudo-random so decorative layouts match between server and client renders.
export function seeded(seed: number) {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}
