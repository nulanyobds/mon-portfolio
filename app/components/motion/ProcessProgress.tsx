import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import { Asset, Button } from "../ui/Primitives";
import { motionEase } from "./MotionProvider";
import s from "../sections/Portfolio.module.css";

type Step = { number: string; title: string; description: string };

export function ProcessProgress({ steps }: { steps: readonly Step[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 78%", "end 38%"],
  });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (!reduced) setActive(Math.min(2, Math.floor(value * 3)));
  });

  return (
    <div ref={ref} className={s.methodGrid}>
      <motion.div
        className={s.methodVisual}
        initial={reduced ? false : { opacity: 0, x: -24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.2, margin: "-10% 0px -10% 0px" }}
        transition={{ duration: 0.8, ease: motionEase }}
      >
        <Asset index={21} alt="Aperçu d’une interface en cours de conception" />
        <div className={s.brief}>
          <strong>Project Brief</strong>
          <span />
          <span />
          <span />
        </div>
        <Button>Démarrer mon projet</Button>
      </motion.div>
      <ol className={s.steps}>
        <motion.span
          className={s.methodProgress}
          aria-hidden="true"
          style={{ scaleY: reduced ? 1 : scrollYProgress }}
        />
        {steps.map((step, index) => (
          <motion.li
            key={step.number}
            data-step-state={
              reduced || index < active
                ? "complete"
                : index === active
                  ? "active"
                  : "inactive"
            }
            initial={reduced ? false : { opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3, margin: "-10% 0px -10% 0px" }}
            transition={{
              duration: 0.55,
              delay: index * 0.08,
              ease: motionEase,
            }}
          >
            <span>{step.number}</span>
            <div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
