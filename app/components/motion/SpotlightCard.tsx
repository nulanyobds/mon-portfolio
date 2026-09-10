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
  const boundsRef = useRef<DOMRect | null>(null);
  const frameRef = useRef<number | null>(null);
  const pendingRef = useRef<{
    x: number;
    y: number;
    target: HTMLElement;
  } | null>(null);

  function enter(event: PointerEvent<HTMLElement>) {
    if (
      reduced ||
      !powered ||
      !window.matchMedia("(hover: hover) and (min-width: 1024px)").matches
    ) {
      boundsRef.current = null;
      return;
    }
    boundsRef.current = event.currentTarget.getBoundingClientRect();
  }

  function move(event: PointerEvent<HTMLElement>) {
    const bounds = boundsRef.current;
    if (!bounds) return;

    pendingRef.current = {
      x: event.clientX - bounds.left,
      y: event.clientY - bounds.top,
      target: event.currentTarget,
    };

    if (frameRef.current !== null) return;
    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = null;
      const pending = pendingRef.current;
      if (!pending) return;
      pending.target.style.setProperty("--spot-x", `${pending.x}px`);
      pending.target.style.setProperty("--spot-y", `${pending.y}px`);
      if (tilt) {
        rotateXValue.set((pending.y / bounds.height - 0.5) * -4.5);
        rotateYValue.set((pending.x / bounds.width - 0.5) * 4.5);
      }
    });
  }

  function reset() {
    boundsRef.current = null;
    pendingRef.current = null;
    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
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
      onPointerEnter={enter}
      onPointerMove={move}
      onPointerLeave={reset}
    >
      {children}
    </motion.article>
  );
}
