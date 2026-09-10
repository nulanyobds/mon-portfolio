import type { RefObject } from "react";
import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

export function useReplayableInView<T extends Element>(
  ref: RefObject<T | null>,
  {
    amount = 0.25,
    resetDelay = 160,
    rootMargin = "-8% 0px -8% 0px",
  }: {
    amount?: number;
    resetDelay?: number;
    rootMargin?: string;
  } = {},
) {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(Boolean(reduced));

  useEffect(() => {
    if (reduced) {
      setActive(true);
      return;
    }

    const node = ref.current;
    if (!node) return;
    let resetTimer: number | undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && resetTimer) {
          window.clearTimeout(resetTimer);
          resetTimer = undefined;
        }

        if (entry.intersectionRatio >= amount) {
          setActive(true);
          return;
        }

        if (!entry.isIntersecting) {
          resetTimer = window.setTimeout(() => setActive(false), resetDelay);
        }
      },
      { threshold: [0, amount], rootMargin },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      if (resetTimer) window.clearTimeout(resetTimer);
    };
  }, [amount, reduced, ref, resetDelay, rootMargin]);

  return active;
}
