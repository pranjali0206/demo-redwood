import { transform, useTransform, type MotionValue } from "framer-motion";

// Function-form useTransform keeps the mapping on the JS thread. The array form gets
// hardware-accelerated onto a native scroll timeline, which produced wrong opacities
// for multi-stop ranges inside the sticky story section.
export function useScrollMap<T extends number | string>(
  progress: MotionValue<number>,
  input: number[],
  output: T[],
) {
  return useTransform(progress, transform(input, output));
}
