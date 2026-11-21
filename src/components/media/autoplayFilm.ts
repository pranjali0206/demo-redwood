/*
 * Autoplaying "films": short, silent clips that play on their own while they are on screen.
 *
 * The clip is loaded once its section is near (the lighter cut on phones and tablets), plays while
 * at least `threshold` of the frame is visible and pauses when it is not. At the end it holds on the
 * last frame for `holdMs`, then plays again with a soft fade (the frame gets `.is-rewind`).
 * `onProgress` receives 0 → 1 on every frame, so captions and figures can run with the picture.
 * The visitor can pause it (`root[data-paused]` mirrors that), or jump to any point.
 * With reduced motion nothing plays: the film rests on its last frame, and jumps still work.
 */

export type FilmOptions = {
  /** Gets `data-paused`, and is watched to know when the clip should load. */
  root: HTMLElement;
  /** The visible frame: watched for visibility, and gets `.is-rewind` when a take restarts. */
  frame: HTMLElement;
  video: HTMLVideoElement;
  src: { large: string; small: string };
  reduce: boolean;
  onProgress: (p: number) => void;
  /** Called the first time the frame comes into view. */
  onEnter?: () => void;
  holdMs?: number;
  threshold?: number;
  toggleButton?: HTMLElement | null;
  labels?: { pause: string; play: string };
};

export type FilmControls = {
  toggle: () => void;
  /** Jumps to progress p (0 → 1) and keeps playing. */
  seek: (p: number) => void;
  destroy: () => void;
};

const SMALL_SCREEN = "(max-width: 899px)";

export function autoplayFilm(o: FilmOptions): FilmControls {
  const { root, frame, video, reduce, onProgress } = o;
  const holdMs = o.holdMs ?? 2400;
  const labels = o.labels ?? { pause: "Pause the film", play: "Play the film" };

  let loaded = false;
  let visible = false;
  let entered = false;
  let userPaused = reduce;
  let hold = 0;
  let raf = 0;

  const duration = () => (Number.isFinite(video.duration) && video.duration > 0 ? video.duration : 1);
  const progressNow = () => Math.min(1, Math.max(0, video.currentTime / duration()));

  const tick = () => {
    onProgress(progressNow());
    if (!video.paused && !video.ended) raf = requestAnimationFrame(tick);
  };
  const onPlay = () => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(tick);
  };
  const onSeeked = () => onProgress(progressNow());

  const play = () => {
    if (!loaded || !visible || userPaused) return;
    video.play().catch(() => {});
  };

  const replay = () => {
    window.clearTimeout(hold);
    frame.classList.remove("is-rewind");
    void frame.offsetWidth; // restart the fade
    frame.classList.add("is-rewind");
    video.currentTime = 0;
    onProgress(0);
    play();
  };
  const onEnded = () => {
    onProgress(1);
    window.clearTimeout(hold);
    hold = window.setTimeout(() => {
      if (visible && !userPaused) replay();
    }, holdMs);
  };
  const onLoaded = () => {
    loaded = true;
    if (reduce) {
      video.currentTime = Math.max(0, duration() - 0.05);
      onProgress(1);
    } else play();
  };

  video.addEventListener("play", onPlay);
  video.addEventListener("seeked", onSeeked);
  video.addEventListener("ended", onEnded);
  video.addEventListener("loadeddata", onLoaded);

  const near = new IntersectionObserver(
    ([e]) => {
      if (!e?.isIntersecting) return;
      near.disconnect();
      video.muted = true;
      video.preload = "auto";
      video.src = window.matchMedia(SMALL_SCREEN).matches ? o.src.small : o.src.large;
      video.load();
    },
    { rootMargin: "100% 0px" },
  );
  near.observe(root);

  const threshold = o.threshold ?? 0.3;
  const seen = new IntersectionObserver(
    ([e]) => {
      if (!e) return;
      if (e.isIntersecting && !entered) {
        entered = true;
        o.onEnter?.();
      }
      visible = e.intersectionRatio >= threshold;
      if (!visible) video.pause();
      else if (video.ended) replay();
      else play();
    },
    { threshold: [0, threshold] },
  );
  seen.observe(frame);

  const setPaused = (on: boolean) => {
    userPaused = on;
    root.dataset.paused = String(on);
    o.toggleButton?.setAttribute("aria-label", on ? labels.play : labels.pause);
  };
  setPaused(userPaused);
  onProgress(reduce ? 1 : 0);

  return {
    toggle() {
      if (reduce) return;
      if (userPaused) {
        setPaused(false);
        if (video.ended) replay();
        else play();
      } else {
        setPaused(true);
        window.clearTimeout(hold);
        video.pause();
      }
    },
    seek(p) {
      window.clearTimeout(hold);
      if (loaded) video.currentTime = Math.min(p * duration(), duration() - 0.05);
      onProgress(p);
      if (!reduce) {
        setPaused(false);
        play();
      }
    },
    destroy() {
      near.disconnect();
      seen.disconnect();
      cancelAnimationFrame(raf);
      window.clearTimeout(hold);
      video.removeEventListener("play", onPlay);
      video.removeEventListener("seeked", onSeeked);
      video.removeEventListener("ended", onEnded);
      video.removeEventListener("loadeddata", onLoaded);
      video.pause();
    },
  };
}
