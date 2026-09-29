import { useEffect, useState, type MouseEvent, type RefObject } from "react";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { Lock, Sparkles } from "lucide-react";
import {
  CERT_HEIGHT,
  CERT_WIDTH,
  drawCertificate,
  loadCertificateLogo,
  type CertificateData,
} from "./certificate";
import { EASE, seeded } from "./constants";

type StageData = Omit<CertificateData, "siteHost">;

export function CertificateStage({
  data,
  issued,
  canvasRef,
  burstKey,
}: {
  data: StageData;
  issued: boolean;
  canvasRef: RefObject<HTMLCanvasElement | null>;
  burstKey: number;
}) {
  const reduce = useReducedMotion() ?? false;
  const [logo, setLogo] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    let alive = true;
    loadCertificateLogo()
      .then((img) => {
        if (alive) setLogo(img);
      })
      .catch(() => {
        // The certificate falls back to a text monogram.
      });
    return () => {
      alive = false;
    };
  }, []);

  const { name, city, certificateId, issuedAt } = data;
  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    drawCertificate(
      ctx,
      { name, city, certificateId, issuedAt, siteHost: window.location.host },
      { logo, preview: !issued },
    );
  }, [canvasRef, name, city, certificateId, issuedAt, logo, issued]);

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const tilt = { stiffness: 120, damping: 18 };
  const rotateX = useSpring(useTransform(my, [0, 1], [7, -7]), tilt);
  const rotateY = useSpring(useTransform(mx, [0, 1], [-9, 9]), tilt);
  const glareX = useTransform(mx, (v) => `${v * 100}%`);
  const glareY = useTransform(my, (v) => `${v * 100}%`);
  const glare = useMotionTemplate`radial-gradient(520px circle at ${glareX} ${glareY}, rgba(255,255,255,0.4), transparent 45%)`;

  const handleMove = (e: MouseEvent<HTMLElement>) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };
  const handleLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <div className="relative">
      <div
        aria-hidden
        className={`absolute -inset-8 rounded-[3rem] blur-3xl transition-colors duration-1000 ${issued ? "bg-uf-sun/35" : "bg-uf-sun/15"}`}
      />

      <motion.div
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{ rotateX, rotateY, transformPerspective: 1400 }}
        animate={issued && !reduce ? { scale: [0.94, 1.03, 1] } : undefined}
        transition={{ duration: 0.9, ease: EASE }}
        className="group relative rounded-2xl bg-gradient-to-br from-uf-sun/80 via-uf-soil/40 to-uf-green/70 p-[3px] shadow-[0_40px_100px_-40px_rgba(23,61,10,0.6)]"
      >
        <div className="relative overflow-hidden rounded-[14px] bg-uf-paper">
          <canvas
            ref={canvasRef}
            width={CERT_WIDTH}
            height={CERT_HEIGHT}
            role="img"
            aria-label={
              issued
                ? `Urban Farmer certificate issued to ${name}`
                : "Live preview of your Urban Farmer certificate"
            }
            className="block h-auto w-full"
            style={{ aspectRatio: `${CERT_WIDTH} / ${CERT_HEIGHT}` }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{ background: glare }}
          />
          <AnimatePresence>
            {issued && !reduce && (
              <motion.div
                key="shine"
                aria-hidden
                className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                initial={{ x: "-150%" }}
                animate={{ x: "400%" }}
                transition={{ duration: 1.4, ease: "easeInOut", delay: 0.3 }}
              />
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <p className="mt-6 flex items-center justify-center gap-2 text-center text-sm text-stone-500">
        {issued ? (
          <>
            <Sparkles size={16} className="text-uf-soil" /> Your digital asset is ready — share it
            with pride.
          </>
        ) : (
          <>
            <Lock size={14} /> Live preview · type your name to watch it come alive
          </>
        )}
      </p>

      {!reduce && <Confetti burstKey={burstKey} />}
    </div>
  );
}

const CONFETTI_COLORS = ["#f6b93b", "#fdd37f", "#4d8a1c", "#2c5e14", "#7a3612", "#8db85a"];

const PIECES = Array.from({ length: 64 }, (_, i) => ({
  x: (seeded(i + 1) - 0.5) * 1000,
  peak: -(160 + seeded(i + 70) * 380),
  fall: 300 + seeded(i + 140) * 300,
  rotate: (seeded(i + 210) - 0.5) * 900,
  size: 7 + seeded(i + 280) * 8,
  delay: seeded(i + 350) * 0.25,
  color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
  round: i % 3 === 0,
}));

function Confetti({ burstKey }: { burstKey: number }) {
  if (!burstKey) return null;
  return (
    <div
      key={burstKey}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center"
    >
      {PIECES.map((p, i) => (
        <motion.span
          key={i}
          className="absolute"
          style={{
            width: p.size,
            height: p.round ? p.size : p.size * 0.45,
            backgroundColor: p.color,
            borderRadius: p.round ? 9999 : 2,
          }}
          initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 0.4 }}
          animate={{
            x: p.x,
            y: [0, p.peak, p.peak + p.fall],
            opacity: [1, 1, 0],
            rotate: p.rotate,
            scale: 1,
          }}
          transition={{
            duration: 2.6,
            delay: p.delay,
            ease: "easeOut",
            y: { duration: 2.6, delay: p.delay, times: [0, 0.35, 1], ease: ["easeOut", "easeIn"] },
            opacity: { duration: 2.6, delay: p.delay, times: [0, 0.75, 1] },
          }}
        />
      ))}
    </div>
  );
}
