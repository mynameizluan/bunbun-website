"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

export function KeptVideo({
  src,
  poster,
  className,
  style,
  ariaLabel,
}: {
  src: string;
  poster: string;
  className?: string;
  style?: React.CSSProperties;
  ariaLabel: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const v = ref.current;
    if (!v) return;

    v.muted = true;
    v.defaultMuted = true;
    v.volume = 0;
    v.loop = true;
    v.playsInline = true;

    if (reduce) {
      v.pause();
      return;
    }

    const keepPlaying = () => {
      setTimeout(() => {
        v.play()?.catch(() => {});
      }, 40);
    };
    v.addEventListener("pause", keepPlaying);
    v.play()?.catch(() => {});

    const onVisibility = () => {
      if (!document.hidden) v.play()?.catch(() => {});
    };
    document.addEventListener("visibilitychange", onVisibility);
    const watch = setInterval(() => {
      if (v.paused) v.play()?.catch(() => {});
    }, 2000);

    return () => {
      v.removeEventListener("pause", keepPlaying);
      document.removeEventListener("visibilitychange", onVisibility);
      clearInterval(watch);
    };
  }, [reduce]);

  return (
    <video
      ref={ref}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster={poster}
      aria-label={ariaLabel}
      className={className}
      style={style}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
