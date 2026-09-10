import type { CSSProperties, PointerEvent, ReactNode } from "react";
import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { motionEase } from "./MotionProvider";
import s from "../sections/Portfolio.module.css";

type SpotlightCardProps = {
  children: ReactNode;
  className: string;
  id?: string;
  tone?: string;
  powered?: boolean;
  visible?: boolean;
  delay?: number;
  tilt?: boolean;
};

export function SpotlightCard({
  children,
  className,
  id,
  tone,
  powered = true,
  visible = true,
  delay = 0,
  tilt = false,
}: SpotlightCardProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const rotateXValue = useMotionValue(0);
  const rotateYValue = useMotionValue(0);
  const rotateX = useSpring(rotateXValue, { stiffness: 180, damping: 24 });
  const rotateY = useSpring(rotateYValue, { stiffness: 180, damping: 24 });

  function move(event: PointerEvent<HTMLElement>) {
    if (
      reduced ||
      !powered ||
      !window.matchMedia("(hover: hover) and (min-width: 1024px)").matches
    ) {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    event.currentTarget.style.setProperty("--spot-x", `${x}px`);
    event.currentTarget.style.setProperty("--spot-y", `${y}px`);

    if (tilt) {
      rotateXValue.set((y / bounds.height - 0.5) * -4.5);
      rotateYValue.set((x / bounds.width - 0.5) * 4.5);
    }
  }

  function reset() {
    rotateXValue.set(0);
    rotateYValue.set(0);
  }

  const style = {
    rotateX,
    rotateY,
  } as CSSProperties;

  return (
    <motion.article
      ref={ref}
      id={id}
      className={`${className} ${s.motionCard}`}
      data-motion-glow={tone}
      data-card-visible={visible || reduced ? "true" : "false"}
      data-spotlight-active={powered ? "true" : "false"}
      initial={reduced ? false : { opacity: 0, y: 30 }}
      animate={
        reduced || visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
      }
      whileHover={reduced ? undefined : { y: -5 }}
      transition={{ duration: 0.65, delay, ease: motionEase }}
      style={style}
      onPointerMove={move}
      onPointerLeave={reset}
    >
      {children}
    </motion.article>
  );
}
