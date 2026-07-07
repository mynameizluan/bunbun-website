"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export function RevealBand({
  children,
  delay = 0,
  className,
  style,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      style={style}
      initial={{
        opacity: 0,
        y: 26,
        clipPath: "inset(6% 5% 6% 5% round 4px)",
      }}
      whileInView={{ opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0% round 4px)" }}
      viewport={{ once: true, amount: 0.08, margin: "0px 0px -5% 0px" }}
      transition={{
        opacity: { duration: 0.9, delay: delay / 1000, ease: [0.16, 1, 0.3, 1] },
        y: { duration: 0.9, delay: delay / 1000, ease: [0.16, 1, 0.3, 1] },
        clipPath: { duration: 1.15, delay: delay / 1000, ease: [0.16, 1, 0.3, 1] },
      }}
    >
      {children}
    </motion.div>
  );
}
