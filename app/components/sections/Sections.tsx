import { useState, useRef, useEffect, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowUpRight,
  Check,
  Plus,
  Minus,
  Search,
  X,
} from "lucide-react";
import { portfolio as d } from "../../data/portfolio";
import { Asset, Brand, Button, ArrowLink, Eyebrow } from "../ui/Primitives";
import { MotionTitle } from "../motion/MotionTitle";
import { SpotlightCard } from "../motion/SpotlightCard";
import { ReplayGroup } from "../motion/ReplayGroup";
import { ScrollToggleScene } from "../motion/ScrollToggleScene";
import { ProcessProgress } from "../motion/ProcessProgress";
import { ParallaxAsset } from "../motion/ParallaxAsset";
import { motionEase } from "../motion/MotionProvider";
import { useReplayableInView } from "../../hooks/useReplayableInView";
import s from "./Portfolio.module.css";

export function References() {
  const reduced = useReducedMotion();
  return (
    <motion.section
      className={s.references}
      aria-label="Références"
      initial={reduced ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: 0.6, ease: motionEase }}
    >
      <p>
        Un partenaire de confiance pour des entrepreneurs et des entreprises
      </p>
      <div>
        {[
          { name: "Content Sprint", image: 18 },
          { name: "ONG La Colombe", image: 19 },
          { name: "CGTK Group", image: 20 },
          { name: "Groupe Rosa", image: 23, hideName: true },
        ].map(({ name, image, hideName }) => (
          <span key={name}>
            <Asset
              index={image}
              className={s.referenceLogo}
              alt={hideName ? name : ""}
            />
            {!hideName && name}
          </span>
        ))}
      </div>
    </motion.section>
  );
}
export function Introduction() {
  const reduced = useReducedMotion();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");
  function search(e: FormEvent) {
    e.preventDefault();
    const p = d.projects.find((p) =>
      p.title.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase()),
    );
    if (p && query.trim()) {
      document.getElementById("project-" + p.number)?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
      });
      setStatus("");
    } else
      setStatus(
        "Aucun projet correspondant. Découvrez les projets sélectionnés ci-dessous.",
      );
  }
  return (
    <section className={s.intro}>
      <motion.div
        initial={reduced ? false : { opacity: 0, x: -24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.25, margin: "-10% 0px -10% 0px" }}
        transition={{ duration: 0.7, ease: motionEase }}
      >
        <span className={s.editorial}>01</span>
        <h2>
          Concevoir.
          <br />
          <strong>Convertir.</strong>
          <br />
          <em>Scaler.</em>
        </h2>
        <form className={s.search} onSubmit={search}>
          <label className="sr-only" htmlFor="project-search">
            Rechercher un projet
          </label>
          <Search size={18} />
          <input
            id="project-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher un projet, un secteur..."
          />
          <button>Go</button>
        </form>
        <p role="status" className={s.status}>
          {status}
        </p>
      </motion.div>
      <motion.div
        className={s.carousel}
        tabIndex={0}
        aria-label="Aperçu des catégories de projets, défilement horizontal"
        initial={reduced ? false : { opacity: 0, x: 28 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.2, margin: "-10% 0px -10% 0px" }}
        transition={{ duration: 0.8, delay: 0.08, ease: motionEase }}
      >
        <a href="#solutions" className={s.carouselMain}>
          <Asset index={3} alt="Interface SaaS et application" />
          <span>Sélectionné</span>
          <h3>SaaS &amp; App</h3>
          <b>
            04 <small>Projets</small>
          </b>
        </a>
        <a href="#services">
          <Asset index={4} alt="Interface de landing page" />
          <h3>Landing page</h3>
        </a>
        <a href="#solutions">
          <Asset index={5} alt="Interface de site web" />
          <h3>Sites Web</h3>
        </a>
      </motion.div>
    </section>
  );
}
export function Profiles() {
  const reduced = useReducedMotion();
  return (
    <section id="profils" className={s.section}>
      <Eyebrow>Pour qui je travaille</Eyebrow>
      <h2 className={s.sectionTitle}>
        Trois profils.
        <br />
        Un seul objectif : convertir.
      </h2>
      <div className={s.profileGrid}>
        {d.profiles.map((p, i) => (
          <motion.article
            key={p.number}
            className={s.profile}
            data-tone={i}
            initial={reduced ? false : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{
              once: false,
              amount: 0.22,
              margin: "-10% 0px -10% 0px",
            }}
            transition={{ duration: 0.62, delay: i * 0.09, ease: motionEase }}
          >
            <div className={s.profileTop}>
              <span>{p.number}</span>
              <ArrowLink label={"Discuter de votre projet — " + p.title} />
            </div>
            <h3>{p.title}</h3>
            <div>
              <h4>LE PROBLÈME</h4>
              <p>{p.problem}</p>
            </div>
            <div className={s.answer}>
              <h4>MA RÉPONSE</h4>
              <p>{p.answer}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
export function Services() {
  const [power, setPower] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  return (
    <section
      ref={sectionRef}
      id="services"
      className={s.section}
      data-powered={power}
    >
      <div className={s.sectionHead}>
        <div>
          <Eyebrow>Services</Eyebrow>
          <MotionTitle
            variable="services"
            lead={"Chaque service,\nun seul objectif :"}
            accent="convertir."
          />
        </div>
        <div className={s.headAside}>
          <p>
            Cinq compétences, un seul système, pensé pour transformer votre
            trafic en clients.
          </p>
          <ScrollToggleScene
            target={sectionRef}
            powered={power}
            onPowerChange={setPower}
          />
        </div>
      </div>
      <ReplayGroup className={s.bento} amount={0.14}>
        {(visible) =>
          d.services.map((p, i) => (
            <SpotlightCard
              key={p.title}
              className={s.serviceCard + " " + s["service" + i]}
              tone={i === 0 ? "orange" : i === 1 ? "purple" : "blue"}
              powered={power}
              visible={visible}
              delay={i * 0.07}
            >
              <div className={s.glow} aria-hidden="true" />
              <div className={s.serviceCopy}>
                <h3>{p.title}</h3>
                <p>{p.description}</p>
              </div>
              {i < 3 && (
                <Asset
                  index={i === 0 ? 6 : p.image}
                  alt={"Aperçu — " + p.title}
                  className={s.serviceImage}
                />
              )}
              <div className={s.cardBottom}>
                <div className={s.techIcons}>
                  {(i === 0
                    ? [7, 8]
                    : i === 1
                      ? [9, 8, 10]
                      : i === 2
                        ? [7, 8]
                        : i === 3
                          ? [13]
                          : []
                  ).map((x) => (
                    <Asset key={x} index={x} />
                  ))}
                </div>
                {i === 0 ? (
                  <Button />
                ) : (
                  <ArrowLink label={"En savoir plus — " + p.title} />
                )}
              </div>
            </SpotlightCard>
          ))
        }
      </ReplayGroup>
    </section>
  );
}
type CardData = {
  number: string;
  title: string;
  description: string;
  category: string;
  image: number;
  slug?: string;
};
function WorkCard({
  p,
  project = false,
  onOpen,
  visible = true,
}: {
  p: CardData;
  project?: boolean;
  onOpen?: () => void;
  visible?: boolean;
}) {
  return (
    <SpotlightCard
      id={project ? "project-" + p.number : undefined}
      className={s.workCard}
      tone={p.number === "03" ? "blue" : "purple"}
      delay={(Number(p.number) - 1) * 0.08}
      tilt={project}
      visible={visible}
    >
      <div className={s.glow} aria-hidden="true" />
      <Asset
        index={p.image}
        alt={"Capture de " + p.title}
        className={s.workImage}
      />
      <div className={s.workCopy}>
        {project && <span className={s.category}>{p.category}</span>}
        <h3>{p.title}</h3>
        <p>{p.description}</p>
        {!project && <span className={s.category}>{p.category}</span>}
      </div>
      <span className={s.workNumber} aria-hidden="true">
        {p.number}
      </span>
      {project && p.slug ? (
        <a
          className={s.arrow}
          aria-label={"Voir l’étude de cas " + p.title}
          href={"/etudes-de-cas/" + p.slug}
        >
          <ArrowUpRight aria-hidden="true" />
        </a>
      ) : project ? (
        <button
          className={s.arrow}
          aria-label={"Voir " + p.title}
          onClick={onOpen}
        >
          <ArrowUpRight aria-hidden="true" />
        </button>
      ) : (
        <ArrowLink label={"Discuter de " + p.title} />
      )}
    </SpotlightCard>
  );
}
export function Solutions() {
  return (
    <section id="solutions" className={s.section}>
      <div className={s.sectionHead}>
        <div>
          <Eyebrow>Impact</Eyebrow>
          <MotionTitle
            variable="impact"
            lead="Ce qui change quand votre parcours"
            accent="est bien construit."
          />
        </div>
        <p>
          Une meilleure interface ne sert pas seulement à embellir votre
          produit. Elle permet à vos prospects de comprendre plus vite,
          d’avancer sans friction et de passer plus facilement à l’action.
        </p>
      </div>
      <ReplayGroup className={s.workGrid} amount={0.16}>
        {(visible) =>
          d.impact.map((p) => (
            <WorkCard key={p.number} p={p} visible={visible} />
          ))
        }
      </ReplayGroup>
      <div className={s.center}>
        <Button>Construire mon parcours</Button>
      </div>
    </section>
  );
}
export function About() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const active = useReplayableInView(sectionRef, { amount: 0.1 });
  return (
    <section id="about" className={s.section} ref={sectionRef}>
      <Eyebrow>À propos de moi</Eyebrow>
      <div className={s.aboutCard}>
        <motion.div
          className={s.aboutCopy}
          initial={reduced ? false : { opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2, margin: "-10% 0px -10% 0px" }}
          transition={{ duration: 0.7, ease: motionEase }}
        >
          <h2>Love Building</h2>
          {d.about.split("\n\n").map((p) => (
            <p key={p.slice(0, 30)}>{p}</p>
          ))}
          <div className={s.tags}>
            {[
              [9, "React"],
              [8, "Next.js"],
              [7, "Figma"],
              [10, ""],
              [13, "Automation"],
              [-1, "Node js"],
            ].map(([i, t]) => (
              <span key={i}>
                {Number(i) >= 0 && <Asset index={Number(i)} />}
                <span>{t}</span>
              </span>
            ))}
          </div>
          <Button>Me contacter</Button>
        </motion.div>
        <motion.div
          className={s.aboutVisual}
          initial={reduced ? false : { opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2, margin: "-10% 0px -10% 0px" }}
          transition={{ duration: 0.85, delay: 0.08, ease: motionEase }}
        >
          <motion.div
            className={s.purpleCircle}
            animate={
              reduced || !active
                ? undefined
                : { scale: [1, 1.025, 1], opacity: [0.9, 1, 0.9] }
            }
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.span
            aria-hidden="true"
            animate={reduced || !active ? undefined : { y: [-3, 3, -3] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          >
            BUILD
          </motion.span>
          <div className={s.aboutPortraitFrame}>
            <Asset
              index={16}
              className={s.aboutPortrait}
              alt="Portrait de Nulanyo Constant en noir et blanc"
            />
          </div>
          <ParallaxAsset
            index={17}
            className={s.chrome}
            distance={8}
            rotation={6}
          />
        </motion.div>
      </div>
    </section>
  );
}
export function Projects() {
  const [selected, setSelected] = useState<CardData | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  function open(p: CardData) {
    setSelected(p);
    dialog.current?.showModal();
  }
  return (
    <section id="projets" className={s.section}>
      <Eyebrow>Études de cas</Eyebrow>
      <MotionTitle
        variable="projets"
        lead="Projets sélectionnés,"
        accent="résultats réels."
      />
      <ReplayGroup className={s.workGrid + " " + s.projectGrid} amount={0.16}>
        {(visible) =>
          d.projects.map((p) => (
            <WorkCard
              key={p.number}
              p={p}
              project
              visible={visible}
              onOpen={() => open(p)}
            />
          ))
        }
      </ReplayGroup>
      <dialog
        ref={dialog}
        className={s.projectDialog}
        onClick={(e) => {
          if (e.target === e.currentTarget) dialog.current?.close();
        }}
      >
        <button
          className={s.dialogClose}
          onClick={() => dialog.current?.close()}
          aria-label="Fermer le projet"
        >
          <X />
        </button>
        {selected && (
          <>
            <Asset
              index={selected.image}
              alt={"Capture de " + selected.title}
            />
            <span className={s.category}>{selected.category}</span>
            <h2>{selected.title}</h2>
            <p>{selected.description}</p>
            <a
              className={s.button}
              href="#contact"
              onClick={() => dialog.current?.close()}
            >
              Me contacter
              <ArrowUpRight size={18} />
            </a>
          </>
        )}
      </dialog>
    </section>
  );
}
export function Method() {
  return (
    <section id="methode" className={s.section}>
      <div className={s.sectionHead}>
        <div>
          <Eyebrow>MON APPROCHE</Eyebrow>
          <MotionTitle
            variable="methode"
            lead="Une méthode claire,"
            accent="du besoin aux résultats"
          />
        </div>
        <p>
          Chaque projet avance autour d’un objectif précis, avec des décisions
          fondées sur vos utilisateurs, vos priorités et les résultats attendus.
        </p>
      </div>
      <ProcessProgress steps={d.steps} />
    </section>
  );
}
export function Pricing() {
  const reduced = useReducedMotion();
  return (
    <section id="tarifs" className={s.section}>
      <div className={s.sectionHead}>
        <h2 className={s.sectionTitle}>
          Des offres claires,
          <br />
          selon votre objectif
        </h2>
        <p>
          Chaque formule correspond à un besoin précis et vous permet de savoir
          exactement ce qui est inclus dès le départ.
        </p>
      </div>
      <div className={s.pricingGrid}>
        {d.pricing.map((p, i) => (
          <motion.article
            key={p.title}
            className={s.priceCard}
            data-featured={i === 1}
            initial={reduced ? false : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={reduced ? undefined : { y: i === 1 ? -7 : -4 }}
            viewport={{ once: false, amount: 0.2, margin: "-10% 0px -10% 0px" }}
            transition={{ duration: 0.62, delay: i * 0.08, ease: motionEase }}
          >
            <h3>{p.title}</h3>
            <p>{p.description}</p>
            <strong className={s.price}>{p.price}</strong>
            <h4>Vous recevez :</h4>
            <ul>
              {p.features.map((f) => (
                <li key={f}>
                  <Check size={16} aria-hidden="true" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <Button dark={i === 1}>{p.cta}</Button>
          </motion.article>
        ))}
      </div>
      <p className={s.pricingNote}>
        Le tarif final dépend du périmètre, des fonctionnalités et des
        intégrations nécessaires. Un échange initial permet de définir la
        solution et le budget adaptés à votre projet.
      </p>
    </section>
  );
}
export function Contact() {
  const reduced = useReducedMotion();
  useEffect(() => {
    type CalApi = {
      (...args: unknown[]): void;
      q: unknown[];
      ns: Record<string, CalApi>;
      loaded: boolean;
      config: Record<string, unknown>;
    };
    const w = window as typeof window & { Cal?: CalApi };
    (function (A: string, L: string) {
      const p = (a: CalApi, ar: unknown) => {
        a.q.push(ar);
      };
      if (w.Cal) return;
      const cal = function (...ar: unknown[]) {
        if (!cal.loaded) {
          cal.ns = {};
          cal.q = cal.q || [];
          document.head.appendChild(document.createElement("script")).src =
            A;
          cal.loaded = true;
        }
        if (ar[0] === L) {
          const inst = function (...ar2: unknown[]) {
            p(inst, ar2);
          } as CalApi;
          const namespace = ar[1];
          inst.q = inst.q || [];
          if (typeof namespace === "string") {
            cal.ns[namespace] = cal.ns[namespace] || inst;
            p(cal.ns[namespace], ar);
            p(cal, ["initNamespace", namespace]);
          } else p(cal, ar);
          return;
        }
        p(cal, ar);
      } as CalApi;
      w.Cal = cal;
    })("https://app.cal.com/embed/embed.js", "init");
    const Cal = w.Cal as CalApi;
    Cal("init", "appel-strategique", { origin: "https://app.cal.com" });
    Cal.config = Cal.config || {};
    Cal.config.forwardQueryParams = true;
    Cal.ns["appel-strategique"]("inline", {
      elementOrSelector: "#my-cal-inline-appel-strategique",
      config: { layout: "month_view", useSlotsViewOnSmallScreen: "true" },
      calLink: "nulanyo-constant/appel-strategique",
    });
    Cal.ns["appel-strategique"]("ui", {
      hideEventTypeDetails: true,
      layout: "month_view",
    });
  }, []);
  return (
    <section id="contact" className={s.contact}>
      <motion.div
        className={s.contactCopy}
        initial={reduced ? false : { opacity: 0, x: -24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.22, margin: "-10% 0px -10% 0px" }}
        transition={{ duration: 0.68, ease: motionEase }}
      >
        <Eyebrow>Contact</Eyebrow>
        <h2>
          Parlez-moi de
          <br />
          votre projet
        </h2>
        <p>
          Présentez-moi votre besoin, vos objectifs et les difficultés que vous
          rencontrez. Je vous répondrai avec une première orientation adaptée à
          votre projet.
        </p>
        <Button href="#my-cal-inline-appel-strategique" dark>
          Me contacter
        </Button>
        <div className={s.available}>
          <span />
          Disponible pour vos projets
        </div>
      </motion.div>
      <motion.div
        className={s.contactForm}
        initial={reduced ? false : { opacity: 0, x: 24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.2, margin: "-10% 0px -10% 0px" }}
        transition={{ duration: 0.72, delay: 0.08, ease: motionEase }}
      >
        <div
          id="my-cal-inline-appel-strategique"
          style={{ width: "100%", minHeight: 600, overflow: "scroll" }}
        />
      </motion.div>
    </section>
  );
}
export function FAQ() {
  const [active, setActive] = useState<number | null>(0);
  const reduced = useReducedMotion();
  return (
    <section id="faq" className={s.faq}>
      <div>
        <Eyebrow>FAQs</Eyebrow>
        <h2>
          Vos questions,
          <br />
          mes réponses
        </h2>
        <div className={s.booking}>
          <Asset index={2} alt="" />
          <h3>Book un appel de 15 min</h3>
          <p>
            Echangeons à propos votre projet pour partir sur de bonne base et
            atteindre les meilleur résultat à la fin.
          </p>
          <Button>Réserver un appel avec moi</Button>
        </div>
      </div>
      <div className={s.questions}>
        {d.faq.map((q, i) => (
          <div key={q.question}>
            <h3>
              <button
                aria-expanded={active === i}
                aria-controls={"faq-panel-" + i}
                id={"faq-question-" + i}
                onClick={() => setActive(active === i ? null : i)}
              >
                {q.question}
                <motion.span
                  className={s.faqIcon}
                  animate={{ rotate: active === i ? 180 : 0 }}
                  transition={{
                    duration: reduced ? 0 : 0.24,
                    ease: motionEase,
                  }}
                >
                  {active === i ? <Minus size={20} /> : <Plus size={20} />}
                </motion.span>
              </button>
            </h3>
            <div
              id={"faq-panel-" + i}
              role="region"
              aria-labelledby={"faq-question-" + i}
              aria-hidden={active !== i}
              className={s.faqPanel}
            >
              <AnimatePresence initial={false}>
                {active === i && (
                  <motion.div
                    key="answer"
                    initial={reduced ? false : { height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={reduced ? undefined : { height: 0, opacity: 0 }}
                    transition={{
                      duration: reduced ? 0 : 0.3,
                      ease: motionEase,
                    }}
                  >
                    {q.answer ? (
                      <p>
                        {q.answer.split("**").map((part, j) =>
                          j % 2 === 1 ? <strong key={j}>{part}</strong> : part,
                        )}
                      </p>
                    ) : (
                      <a className={s.faqContact} href="#contact">
                        Me contacter <ArrowUpRight size={16} />
                      </a>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
export function FinalCTA() {
  const [message, setMessage] = useState("");
  const reduced = useReducedMotion();
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage(
      "Aucun email n’a été envoyé. Utilisez le formulaire Contact pour préparer votre demande.",
    );
  }
  return (
    <section className={s.finalCTA}>
      <ParallaxAsset index={22} className={s.ctaObject} distance={24} />
      <motion.span
        className={s.next}
        aria-hidden="true"
        initial={reduced ? false : { opacity: 0, x: 28 }}
        whileInView={{ opacity: 0.16, x: 0 }}
        viewport={{ once: false, amount: 0.3, margin: "-10% 0px -10% 0px" }}
        transition={{ duration: 0.9, ease: motionEase }}
      >
        NEXT
      </motion.span>
      <motion.div
        className={s.ctaCopy}
        initial={reduced ? false : { opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.25, margin: "-10% 0px -10% 0px" }}
        transition={{ duration: 0.72, ease: motionEase }}
      >
        <h2>
          Prêt à transformer votre projet en{" "}
          <strong>
            résultats
            <br className={s.ctaDesktopBreak} /> concrets ?
          </strong>
        </h2>
        <p>
          Construisons une landing page, un tunnel ou une application pensée
          pour vos utilisateurs et vos objectifs.
        </p>
        <form onSubmit={submit}>
          <label htmlFor="cta-email">Commencer un projet</label>
          <div>
            <input
              id="cta-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="Votre adresse email"
              aria-label="Votre adresse email"
              required
            />
            <button className={s.button}>
              Envoyer
              <ArrowUpRight size={18} />
            </button>
          </div>
          <p role="status" className={s.status}>
            {message}
          </p>
        </form>
      </motion.div>
    </section>
  );
}
export function Footer() {
  const [notice, setNotice] = useState("");
  const reduced = useReducedMotion();
  const groups = [
    [
      "Work",
      ["Accueil", "Services", "Mon process", "Tarifs", "FAQ", "Contact"],
    ],
    ["COMPANY", ["À propos", "Réalisation", "Me contacter"]],
    ["COLLAB", ["Pour les agences", "Pour les startups"]],
    ["RESOURCES", ["Blog", "Guides", "Content Sprint"]],
    ["EXPLORE", ["Portfolio", "Etude de cas"]],
    ["FOLLOW US", ["Facebook", "LinkedIn", "YouTube", "Tiktok"]],
  ] as const;
  const links: Record<string, string> = {
    Accueil: "accueil",
    Services: "services",
    "Mon process": "methode",
    Tarifs: "tarifs",
    FAQ: "faq",
    Contact: "contact",
    "À propos": "about",
    Réalisation: "projets",
    "Me contacter": "contact",
    "Pour les agences": "contact",
    "Pour les startups": "contact",
    "Content Sprint": "project-01",
    Portfolio: "projets",
    "Etude de cas": "projets",
  };
  return (
    <motion.footer
      className={s.footer}
      initial={reduced ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: 0.6, ease: motionEase }}
    >
      <div className={s.footerTop}>
        <div className={s.footerBrand}>
          <Brand />
          <p>
            Conçoit et développe des landing pages, tunnels et applications sur
            mesure, pensés pour clarifier votre offre, convertir votre trafic et
            accompagner votre croissance.
          </p>
        </div>
        <div className={s.footerGroups}>
          {groups.map(([name, items]) => (
            <div key={name}>
              <h3>{name}</h3>
              {items.map((t) =>
                links[t] ? (
                  <a key={t} href={"#" + links[t]}>
                    {t}
                  </a>
                ) : (
                  <button
                    key={t}
                    onClick={() =>
                      setNotice(
                        "Le lien " + t + " sera disponible prochainement.",
                      )
                    }
                  >
                    {t}
                  </button>
                ),
              )}
            </div>
          ))}
        </div>
      </div>
      <p role="status" className={s.status}>
        {notice}
      </p>
      <div className={s.footerBottom}>
        <span>© 2026 BeDev. All rights reserved.</span>
        <a href="#about">Build By Nulanyo Constant</a>
        <button
          onClick={() =>
            setNotice(
              "Ce portfolio ne dépose actuellement aucun cookie de suivi.",
            )
          }
        >
          Cookie
        </button>
      </div>
    </motion.footer>
  );
}
