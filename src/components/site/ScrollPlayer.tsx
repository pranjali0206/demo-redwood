import { useEffect, useId, useRef, useState } from "react";
import { Volume2, VolumeX, Play, Pause } from "lucide-react";

interface ScrollPlayerProps {
  videoId: string;
  aspect?: "video" | "short";
  title?: string;
  poster?: string;
  className?: string;
}

// ── YouTube IFrame Player API loader ──────────────────────────────────────
// Using the official API (rather than hand-built embed URLs + blind
// postMessage calls) is the sanctioned integration path and is far less
// likely to trip YouTube's "confirm you're not a bot" check, which tends to
// fire on ad-hoc iframe embeds — especially when several autoplay on one page.
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let apiPromise: Promise<void> | null = null;
function loadYouTubeIframeAPI(): Promise<void> {
  if (apiPromise) return apiPromise;
  apiPromise = new Promise((resolve) => {
    if (window.YT && window.YT.Player) {
      resolve();
      return;
    }
    const prevReady = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prevReady?.();
      resolve();
    };
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);
  });
  return apiPromise;
}

// Registry so starting one player pauses every other instance on the page.
const playerRegistry = new Map<string, () => void>();
function pauseOtherPlayers(exceptId: string) {
  playerRegistry.forEach((pause, id) => {
    if (id !== exceptId) pause();
  });
}

/**
 * Autoplays a YouTube video (muted) when scrolled into view, via the
 * official YouTube IFrame Player API, with play/pause + mute controls.
 * Only one ScrollPlayer plays at a time across the page.
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
  const mountRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);

  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [playerReady, setPlayerReady] = useState(false);

  // True once the user has explicitly paused, so scrolling back into view
  // doesn't force playback on again.
  const manualPauseRef = useRef(false);

  const play = () => {
    manualPauseRef.current = false;
    setStarted(true);
    pauseOtherPlayers(instanceId);
    setPlaying(true);
  };

  const pause = () => setPlaying(false);

  // Register so other players can pause this one.
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

  // Create the real YT.Player once we need to start playing.
  useEffect(() => {
    if (!started || playerRef.current || !mountRef.current) return;

    let cancelled = false;

    loadYouTubeIframeAPI().then(() => {
      if (cancelled || !mountRef.current) return;

      playerRef.current = new window.YT.Player(mountRef.current, {
        videoId,
        width: "100%",
        height: "100%",
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0,
          modestbranding: 1,
          rel: 0,
          iv_load_policy: 3,
          disablekb: 1,
          fs: 0,
          playsinline: 1,
          loop: 1,
          playlist: videoId,
          origin: window.location.origin,
        },
        events: {
          onReady: (e: any) => {
            if (cancelled) return;
            // Crop the iframe slightly oversized to push YouTube's own
            // chrome (logo/title) outside the visible frame.
            const iframe: HTMLIFrameElement | null = e.target.getIframe?.();
            if (iframe) {
              Object.assign(iframe.style, {
                position: "absolute",
                top: "50%",
                left: "50%",
                width: "130%",
                height: "130%",
                transform: "translate(-50%, -50%)",
                pointerEvents: "none",
              });
            }
            setPlayerReady(true);
          },
        },
      });
    });

    return () => {
      cancelled = true;
    };
  }, [started, videoId]);

  // Destroy the player when the component unmounts.
  useEffect(() => {
    return () => {
      playerRef.current?.destroy?.();
    };
  }, []);

  // Push play/pause + mute state to the real player.
  useEffect(() => {
    if (!playerReady) return;
    if (playing) {
      playerRef.current?.playVideo?.();
    } else {
      playerRef.current?.pauseVideo?.();
    }
  }, [playing, playerReady]);

  useEffect(() => {
    if (!playerReady) return;
    if (muted) {
      playerRef.current?.mute?.();
    } else {
      playerRef.current?.unMute?.();
    }
  }, [muted, playerReady]);

  const aspectClass = aspect === "short" ? "aspect-[9/16]" : "aspect-video";

  return (
    <div
      ref={containerRef}
      className={`group relative overflow-hidden rounded-2xl bg-black shadow-ember ring-1 ring-white/10 ${aspectClass} ${className ?? ""}`}
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
          {/* YT.Player is mounted into this div */}
          <div className="absolute inset-0 overflow-hidden">
            <div ref={mountRef} className="absolute inset-0" />
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