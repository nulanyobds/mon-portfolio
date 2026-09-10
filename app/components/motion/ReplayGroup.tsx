import type { ReactNode } from "react";
import { useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { useReplayableInView } from "../../hooks/useReplayableInView";

export function ReplayGroup({
  className,
  children,
  amount = 0.2,
}: {
  className: string;
  children: (active: boolean) => ReactNode;
  amount?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const active = useReplayableInView(ref, { amount, resetDelay: 160 });

  return (
    <motion.div ref={ref} className={className} data-replay-active={active}>
      {children(active || Boolean(reduced))}
    </motion.div>
  );
}
