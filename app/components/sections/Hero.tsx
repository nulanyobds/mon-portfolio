import { useRef, type PointerEvent } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { Header } from "../layout/Header";
import { Asset, Brand, Button } from "../ui/Primitives";
import { motionEase } from "../motion/MotionProvider";
import { useReplayableInView } from "../../hooks/useReplayableInView";
import s from "./Portfolio.module.css";

const copyVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.08 } },
};
const copyItem = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.62, ease: motionEase },
  },
};

export function Hero() {
  const reduced = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const heroActive = useReplayableInView(heroRef, {
    amount: 0.2,
    resetDelay: 180,
    rootMargin: "-5% 0px -5% 0px",
  });
  const cardXValue = useMotionValue(0);
  const cardYValue = useMotionValue(0);
  const cardX = useSpring(cardXValue, { stiffness: 120, damping: 20 });
  const cardY = useSpring(cardYValue, { stiffness: 120, damping: 20 });

  function moveCard(event: PointerEvent<HTMLElement>) {
    if (
      reduced ||
      !window.matchMedia("(hover: hover) and (min-width: 1024px)").matches
    ) {
      return;
    }
    const bounds = event.currentTarget.getBoundingClientRect();
    cardXValue.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 8);
    cardYValue.set(((event.clientY - bounds.top) / bounds.height - 0.5) * 8);
  }

  function resetCard() {
    cardXValue.set(0);
    cardYValue.set(0);
  }

  return (
    <section
      ref={heroRef}
      id="accueil"
      className={s.hero}
      onPointerMove={moveCard}
      onPointerLeave={resetCard}
    >
      <Header active={heroActive || Boolean(reduced)} />
      <motion.div
        className={s.heroCopy}
        variants={copyVariants}
        initial={reduced ? false : "hidden"}
        animate={heroActive || reduced ? "visible" : "hidden"}
      >
        <motion.div className={s.available} variants={copyItem}>
          <span />
          Disponible pour vos projets
        </motion.div>
        <motion.p className={s.kicker} variants={copyItem}>
          Hey, je conçois
        </motion.p>
        <h1>
          <motion.span variants={copyItem}>App &amp; landing</motion.span>
          <motion.span variants={copyItem}>page pro qui convertit</motion.span>
        </h1>
        <motion.p className={s.heroDescription} variants={copyItem}>
          Je Transforme votre trafic en chiffre d'affaires grâce à des sites,
          tunnels et applications sur-mesure conçus pour convertir.
        </motion.p>
        <motion.div className={s.heroButtonMotion} variants={copyItem}>
          <Button />
        </motion.div>
      </motion.div>
      <div className={s.heroVisual}>
        <motion.span
          className={s.build}
          aria-hidden="true"
          initial={reduced ? false : { opacity: 0, x: 18 }}
          animate={
            heroActive || reduced
              ? { opacity: 0.3, x: 0 }
              : { opacity: 0, x: 18 }
          }
          transition={{ duration: 0.9, delay: 0.28, ease: motionEase }}
        >
          BUILD
        </motion.span>
        <motion.div
          className={s.heroPortrait}
          initial={reduced ? false : { opacity: 0, y: 30, scale: 0.97 }}
          animate={
            heroActive || reduced
              ? { opacity: 1, y: 0, scale: 1 }
              : { opacity: 0, y: 30, scale: 0.97 }
          }
          transition={{ duration: 0.92, delay: 0.2, ease: motionEase }}
        >
          <Asset
            index={1}
            className={s.motionAssetImage}
            alt="Nulanyo Constant, développeur web"
            eager
          />
        </motion.div>
        <motion.div
          className={s.mobileCard}
          style={reduced ? undefined : { x: cardX, y: cardY }}
          initial={reduced ? false : { opacity: 0, scale: 0.94 }}
          animate={
            heroActive || reduced
              ? { opacity: 1, scale: 1 }
              : { opacity: 0, scale: 0.94 }
          }
          transition={{ duration: 0.72, delay: 0.52, ease: motionEase }}
        >
          <Brand />
          <Asset index={2} alt="" eager />
          <p>
            Développeur &amp; Content
            <br />
            Sprint Co-fondateur
          </p>
          <strong>+10 projets livrés</strong>
          <Button dark />
        </motion.div>
      </div>
      <motion.div
        className={s.values}
        initial={reduced ? false : "hidden"}
        animate={heroActive || reduced ? "visible" : "hidden"}
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.08, delayChildren: 0.62 },
          },
        }}
      >
        {[
          "Performance",
          "UX & Conversion",
          "Outils sur-mesure",
          "Créativité",
        ].map((t, i) => (
          <motion.div key={t} variants={copyItem}>
            <span>#0{i + 1}</span>
            {t}
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
