import { useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Brand, Button } from "../ui/Primitives";
import { motionEase } from "../motion/MotionProvider";
import s from "../sections/Portfolio.module.css";
export function Header({ active = true }: { active?: boolean }) {
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();
  const trigger = useRef<HTMLButtonElement>(null);
  function close() {
    setOpen(false);
    trigger.current?.focus();
  }
  return (
    <motion.header
      className={s.nav}
      initial={reduced ? false : { opacity: 0, y: -10 }}
      animate={
        reduced || active ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }
      }
      transition={{ duration: 0.58, ease: motionEase }}
    >
      <Brand />
      <nav className={s.desktopNav} aria-label="Navigation principale">
        <a href="#accueil">Home</a>
        <a href="#about">About</a>
        <a href="#projets">Projects</a>
      </nav>
      <Button />
      <button
        ref={trigger}
        className={s.menuButton}
        aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        aria-expanded={open}
        aria-controls="mobile-navigation"
        onClick={() => setOpen(!open)}
      >
        {open ? <X /> : <Menu />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-navigation"
            className={s.mobileNav}
            aria-label="Navigation mobile"
            initial={reduced ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.24, ease: motionEase }}
            onKeyDown={(e) => {
              if (e.key === "Escape") close();
            }}
          >
            {[
              ["Accueil", "accueil"],
              ["Services", "services"],
              ["À propos", "about"],
              ["Projets", "projets"],
              ["Tarifs", "tarifs"],
              ["Contact", "contact"],
            ].map(([label, id]) => (
              <a key={id} href={"#" + id} onClick={() => setOpen(false)}>
                {label}
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
