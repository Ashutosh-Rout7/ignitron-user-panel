import { useEffect, useRef, useState } from "react";

export function PageHero({
  eyebrow,
  title,
  description,
  children,
  videoSrc,
  mobileVideoSrc,
  posterSrc,
}) {
  const videoRef = useRef(null);
  const [showVideo, setShowVideo] = useState(true);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const conn = navigator.connection;
    const isSlowConnection =
      conn?.saveData ||
      conn?.effectiveType === "2g" ||
      conn?.effectiveType === "slow-2g";

    if (prefersReducedMotion || isSlowConnection) {
      setShowVideo(false);
    }
  }, []);

  return (
    // FULL-WIDTH outer wrapper — no max-w here anymore
    <section className="relative overflow-hidden py-16 text-center md:py-20 min-h-[420px] md:min-h-[560px] flex flex-col justify-center">
      {/* ── VIDEO BACKGROUND — spans entire viewport width ─── */}
      {videoSrc && showVideo && (
        <video
          ref={videoRef}
          poster={posterSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover -z-10"
        >
          {mobileVideoSrc && (
            <source src={mobileVideoSrc} media="(max-width: 768px)" />
          )}
          <source src={videoSrc} />
        </video>
      )}

      {videoSrc && !showVideo && posterSrc && (
        <img
          src={posterSrc}
          alt=""
          className="absolute inset-0 h-full w-full object-cover -z-10"
        />
      )}

      {videoSrc && <div className="absolute inset-0 bg-black/60 -z-10" />}

      {/* ── CONTENT — constrained + centered inside full-width hero ── */}
      <div className="mx-auto max-w-5xl px-4">
        {eyebrow && (
          <span className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            {eyebrow}
          </span>
        )}

        <h1 className="mt-5 text-balance text-4xl font-semibold tracking-tight md:text-6xl">
          {title}
        </h1>

        {description && (
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-base text-muted-foreground md:text-lg">
            {description}
          </p>
        )}

        {children && (
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {children}
          </div>
        )}
      </div>
    </section>
  );
}