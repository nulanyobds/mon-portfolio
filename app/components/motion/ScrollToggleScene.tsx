import type { RefObject } from "react";
import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import type { MotionStyle, MotionValue } from "motion/react";
import s from "../sections/Portfolio.module.css";

export function ScrollToggleScene({
  target,
  powered,
  onPowerChange,
}: {
  target: RefObject<HTMLElement | null>;
  powered: boolean;
  onPowerChange: (value: boolean) => void;
}) {
  const reduced = useReducedMotion();
  const manualOverride = useRef<boolean | null>(null);
  const { scrollYProgress } = useScroll({
    target,
    offset: ["start 88%", "end 25%"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.2, 1], [0.45, 1, 1]);
  const x = useTransform(scrollYProgress, [0.2, 0.4], [0, 28]);
  const light = useTransform(scrollYProgress, [0.2, 0.85], [0, 1]);

  function writeSceneProgress(value: number) {
    const node = target.current;
    if (!node) return;
    const clamp = (number: number) => Math.max(0, Math.min(1, number));
    const starts = [0.4, 0.49, 0.58, 0.67, 0.76];
    node.style.setProperty("--motion-power", String(value));
    node.style.setProperty(
      "--scene-light",
      String(clamp((value - 0.28) / 0.52)),
    );
    node.style.setProperty(
      "--scene-scale",
      String(0.9 + clamp((value - 0.28) / 0.52) * 0.1),
    );
    starts.forEach((start, index) => {
      node.style.setProperty(
        `--card-glow-${index + 1}`,
        String(clamp((value - start) / 0.18)),
      );
    });
  }

  useEffect(() => {
    if (reduced && manualOverride.current === null) {
      writeSceneProgress(1);
      onPowerChange(true);
    }
  }, [onPowerChange, reduced]);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (!reduced && manualOverride.current === null) {
      writeSceneProgress(value);
      onPowerChange(value >= 0.4);
    }
  });

  function toggleManually() {
    const next = !powered;
    manualOverride.current = next;
    writeSceneProgress(next ? 1 : 0);
    onPowerChange(next);
  }

  const automatic = manualOverride.current === null && !reduced;
  const toggleStyle: MotionStyle & {
    "--toggle-progress": number | MotionValue<number>;
  } = {
    opacity: reduced ? 1 : opacity,
    "--toggle-progress": automatic ? light : powered ? 1 : 0,
  };

  return (
    <motion.button
      className={s.toggle}
      role="switch"
      aria-checked={powered}
      aria-label="Éclairage des cartes"
      style={toggleStyle}
      onClick={toggleManually}
    >
      <motion.span
        style={automatic ? { x } : undefined}
        animate={automatic ? undefined : { x: powered ? 28 : 0 }}
        transition={{ duration: reduced ? 0 : 0.42, ease: [0.22, 1, 0.36, 1] }}
      />
    </motion.button>
  );
}
