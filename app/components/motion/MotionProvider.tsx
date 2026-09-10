import type { ReactNode } from "react";
import { MotionConfig } from "motion/react";

export const motionEase = [0.22, 1, 0.36, 1] as const;

export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig
      reducedMotion="user"
      transition={{ duration: 0.65, ease: motionEase }}
    >
      {children}
    </MotionConfig>
  );
}
