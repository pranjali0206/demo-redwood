import { motion, type MotionProps } from "framer-motion";
import type { ReactNode } from "react";

export function Reveal({
  children, delay = 0, y = 30, className, as = "div",
}: { children: ReactNode; delay?: number; y?: number; className?: string; as?: "div" | "section" | "li" } & MotionProps) {
  const Comp = motion[as] as typeof motion.div;
  return (
    <Comp
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </Comp>
  );
}

export function CountUp({ to, suffix = "", duration = 1.6 }: { to: number; suffix?: string; duration?: number }) {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <motion.span
        initial={{ "--n": 0 } as React.CSSProperties}
        whileInView={{ "--n": to } as React.CSSProperties}
        viewport={{ once: true }}
        transition={{ duration, ease: "easeOut" }}
        style={{ counterReset: "n var(--n)" } as React.CSSProperties}
      >
        <CounterText to={to} duration={duration} />
      </motion.span>
      {suffix}
    </motion.span>
  );
}

import { useEffect, useRef, useState } from "react";
function CounterText({ to, duration }: { to: number; duration: number }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (t: number) => {
            const p = Math.min(1, (t - start) / (duration * 1000));
            setN(Math.floor(to * (1 - Math.pow(1 - p, 3))));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      });
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [to, duration]);
  return <span ref={ref}>{n.toLocaleString("en-IN")}</span>;
}
