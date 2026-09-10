import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { Asset } from "../ui/Primitives";
import s from "../sections/Portfolio.module.css";

export function ParallaxAsset({
  index,
  className,
  alt = "",
  distance = 24,
  rotation = 0,
  eager = false,
}: {
  index: number;
  className: string;
  alt?: string;
  distance?: number;
  rotation?: number;
  eager?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [distance / 2, -distance / 2],
  );
  const rotate = useTransform(
    scrollYProgress,
    [0, 1],
    [-rotation / 2, rotation / 2],
  );

  return (
    <motion.div
      ref={ref}
      className={className}
      style={reduced ? undefined : { y, rotate }}
      aria-hidden={alt ? undefined : "true"}
    >
      <Asset
        index={index}
        className={s.motionAssetImage}
        alt={alt}
        eager={eager}
      />
    </motion.div>
  );
}
