import { useEffect, useId, useRef, useState } from "react";
import { Volume2, VolumeX, Play, Pause } from "lucide-react";

interface ScrollPlayerProps {
  videoId: string;
  aspect?: "video" | "short";
  title?: string;
  poster?: string;
  className?: string;
}

/**
 * Registry so that starting playback on one ScrollPlayer pauses every other
 * instance currently mounted on the page. Each player registers a `pause`
 * callback keyed by its own instance id and calls `pauseOthers` whenever it
 * starts playing (via scroll-into-view autoplay or the play button).
 */
const playerRegistry = new Map<string, () => void>();

function pauseOtherPlayers(exceptId: string) {
  playerRegistry.forEach((pause, id) => {
    if (id !== exceptId) pause();
  });
}

/**
 * Autoplays a YouTube video (muted) when scrolled into view, and exposes
 * play/pause + mute/unmute controls. Only one ScrollPlayer plays at a time
 * across the page — starting one pauses whichever was previously playing.
 * Chrome-less: hides the YouTube UI and covers the branding with an overlay so
 * it reads as a native video player, not a YouTube embed.
 */
export function ScrollPlayer({
  videoId,
  aspect = "video",
  title,
  poster,
  className,
}: ScrollPlayerProps) {
  const instanceId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [iframeReady, setIframeReady] = useState(false);

  // Tracks whether the user explicitly paused, so re-entering the viewport
  // doesn't force playback back on.
  const manualPauseRef = useRef(false);

  const postCommand = (func: string, args: unknown[] = []) => {
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func, args }),
      "*",
    );
  };

  const play = () => {
    manualPauseRef.current = false;
    setStarted(true);
    pauseOtherPlayers(instanceId);
    setPlaying(true);
  };

  const pause = () => {
    setPlaying(false);
  };

  // Register/unregister this player so other instances can pause it.
  useEffect(() => {
    playerRegistry.set(instanceId, pause);
    return () => {
      playerRegistry.delete(instanceId);
    };
  }, [instanceId]);

  // Autoplay when scrolled into view; pause when scrolled mostly out.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && e.intersectionRatio > 0.35) {
            if (!manualPauseRef.current) {
              setStarted(true);
              pauseOtherPlayers(instanceId);
              setPlaying(true);
            }
          } else if (e.intersectionRatio < 0.15) {
            setPlaying(false);
          }
        }
      },
      { threshold: [0, 0.15, 0.35, 0.6, 1] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [instanceId]);

  // Push play/pause + mute state to the YouTube iframe once it's ready.
  useEffect(() => {
    if (!iframeReady) return;
    postCommand(playing ? "playVideo" : "pauseVideo");
  }, [playing, iframeReady]);

  useEffect(() => {
    if (!iframeReady) return;
    postCommand(muted ? "mute" : "unMute");
  }, [muted, iframeReady]);

  // Reset readiness whenever the iframe remounts (i.e. on first start).
  useEffect(() => {
    if (!started) setIframeReady(false);
  }, [started]);

  const src = started
    ? `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&controls=0&modestbranding=1&showinfo=0&rel=0&iv_load_policy=3&disablekb=1&fs=0&playsinline=1&loop=1&playlist=${videoId}&enablejsapi=1&origin=${encodeURIComponent(
        typeof window !== "undefined" ? window.location.origin : "",
      )}`
    : "";

  const aspectClass = aspect === "short" ? "aspect-[9/16]" : "aspect-video";

  return (
    <div
      ref={containerRef}
      className={`group relative overflow-hidden rounded-2xl bg-black shadow-ember ring-1 ring-border/60 ${aspectClass} ${className ?? ""}`}
    >
      {/* Poster while idle */}
      {!started && (
        <button
          type="button"
          onClick={play}
          aria-label={`Play ${title ?? "video"}`}
          className="absolute inset-0 w-full h-full text-left"
        >
          <img
            src={poster ?? `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`}
            alt={title ?? "Video"}
            className="h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/40" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-16 w-16 rounded-full bg-primary/90 flex items-center justify-center shadow-ember transition-transform group-hover:scale-105">
              <Play className="h-6 w-6 text-primary-foreground fill-primary-foreground ml-1" />
            </div>
          </div>
        </button>
      )}

      {started && (
        <>
          {/* Oversized iframe hides the YT logo & title bar via overflow crop */}
          <div className="absolute inset-0 overflow-hidden">
            <iframe
              ref={iframeRef}
              src={src}
              title={title ?? "video"}
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen={false}
              onLoad={() => {
                // Small delay so the YouTube player's postMessage listener
                // is ready before we start sending it commands.
                setTimeout(() => setIframeReady(true), 300);
              }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[130%] pointer-events-none"
              frameBorder={0}
            />
          </div>

          {/* Corner cloaks to obscure any residual YouTube branding */}
          <div className="pointer-events-none absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-black/70 to-transparent" />
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-black/70 to-transparent" />

          {/* Click anywhere on the video to toggle play/pause */}
          <button
            type="button"
            onClick={() => (playing ? pause() : play())}
            aria-label={playing ? "Pause video" : "Play video"}
            className="absolute inset-0 w-full h-full cursor-pointer"
          />

          {/* Centered play icon shown when paused */}
          {!playing && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="h-14 w-14 rounded-full bg-black/60 backdrop-blur border border-white/20 flex items-center justify-center">
                <Play className="h-6 w-6 text-white fill-white ml-1" />
              </div>
            </div>
          )}
        </>
      )}

      {/* Title + play/pause + mute controls */}
      <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-2 p-4 pointer-events-none">
        {title && (
          <span className="pointer-events-none text-sm font-medium text-white/95 tracking-wide truncate">
            {title}
          </span>
        )}
        <div className="pointer-events-auto ml-auto flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              playing ? pause() : play();
            }}
            aria-label={playing ? "Pause" : "Play"}
            className="h-9 w-9 rounded-full bg-black/60 backdrop-blur border border-white/20 flex items-center justify-center text-white/90 hover:bg-primary hover:border-primary transition-colors"
          >
            {playing ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setMuted((m) => !m);
            }}
            aria-label={muted ? "Unmute" : "Mute"}
            className="h-9 w-9 rounded-full bg-black/60 backdrop-blur border border-white/20 flex items-center justify-center text-white/90 hover:bg-primary hover:border-primary transition-colors"
          >
            {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
        </div>
      </div>
    </div>
  );
}
