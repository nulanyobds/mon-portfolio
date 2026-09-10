import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { Asset, Brand, Button, Eyebrow } from "../components/ui/Primitives";
import { MotionProvider } from "../components/motion/MotionProvider";
import { clubCroissanceBusiness as study } from "../data/caseStudies";
import s from "./CaseStudy.module.css";

export function meta() {
  return [
    {
      title:
        "Club Croissance Business : +100 clients sans publicité | Étude de cas BeDev",
    },
    {
      name: "description",
      content:
        "Découvrez comment une landing page orientée conversion a transformé environ 400 à 500 visiteurs Facebook en plus de 100 clients payants pour Club Croissance Business, sans budget publicitaire.",
    },
    { property: "og:type", content: "article" },
    { property: "og:locale", content: "fr_FR" },
    { property: "og:title", content: study.title },
    { property: "og:description", content: study.hook },
  ];
}

export default function ClubCroissanceBusinessCaseStudy() {
  return (
    <MotionProvider>
      <a className="skip-link" href="#case-content">
        Aller au contenu
      </a>
      <div className={s.page}>
        <header className={s.nav}>
          <Brand href="/" />
          <a className={s.backLink} href="/#projets">
            <ArrowLeft size={18} aria-hidden="true" />
            Retour aux projets
          </a>
          <Button href="/#contact">Démarrer un projet</Button>
        </header>

        <main id="case-content">
          <section className={s.hero}>
            <div className={s.heroCopy}>
              <Eyebrow>Étude de cas — {study.category}</Eyebrow>
              <h1>{study.title}</h1>
              <p className={s.hook}>{study.hook}</p>
              <div className={s.tags} aria-label="Compétences mobilisées">
                {study.services.map((service) => (
                  <span key={service}>{service}</span>
                ))}
              </div>
              <a
                className={s.primaryAction}
                href={study.projectUrl}
                target="_blank"
                rel="noreferrer"
              >
                Voir la landing page
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            </div>
            <div className={s.heroVisual}>
              <span className={s.caseNumber} aria-hidden="true">
                02
              </span>
              <Asset
                index={24}
                alt="Interface de Club Croissance Business"
                eager
              />
            </div>
          </section>

          <section className={s.metrics} aria-label="Résultats du premier mois">
            {study.metrics.map((metric) => (
              <div key={metric.label}>
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </div>
            ))}
          </section>

          <dl className={s.facts} aria-label="Informations sur le projet">
            <div>
              <dt>Client</dt>
              <dd>{study.client}</dd>
            </div>
            <div>
              <dt>Secteur</dt>
              <dd>{study.sector}</dd>
            </div>
            <div>
              <dt>Délai</dt>
              <dd>{study.duration}</dd>
            </div>
          </dl>

          <section className={s.splitSection}>
            <div className={s.sectionIntro}>
              <Eyebrow>Le client</Eyebrow>
              <h2>Une communauté pensée pour progresser ensemble.</h2>
            </div>
            <div className={s.prose}>
              <p>
                Club Croissance Business est une communauté payante destinée aux
                entrepreneurs, freelances, coachs et créateurs de contenu
                d’Afrique francophone.
              </p>
              <p>
                Cofondé par {study.founders}, le club propose un environnement
                structuré : masterclass, sessions collectives, challenges,
                outils d’intelligence artificielle et accompagnement humain.
              </p>
            </div>
          </section>

          <section className={s.context}>
            <div>
              <Eyebrow>Le contexte</Eyebrow>
              <h2>Une demande simple. Un enjeu beaucoup plus large.</h2>
            </div>
            <div className={s.contextGrid}>
              <article>
                <h3>Le point de départ</h3>
                <p>
                  Lancer rapidement une communauté payante, capitaliser sur une
                  audience Facebook existante et permettre aux visiteurs de
                  payer, sans budget publicitaire.
                </p>
              </article>
              <article className={s.challenge}>
                <h3>Le véritable défi</h3>
                <p>
                  Transformer un trafic organique, tiède et distrait en clients
                  payants pour une offre entièrement nouvelle, dès le premier
                  lancement.
                </p>
              </article>
              <article>
                <h3>Mon rôle</h3>
                <p>{study.role}.</p>
              </article>
            </div>
          </section>

          <section className={s.strategy}>
            <div className={s.sectionIntro}>
              <Eyebrow>La stratégie</Eyebrow>
              <h2>Une architecture narrative en six étapes.</h2>
            </div>
            <div className={s.strategyGrid}>
              {study.strategy.map((item) => (
                <article key={item.number}>
                  <span>{item.number}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className={s.execution}>
            <div className={s.sectionIntro}>
              <Eyebrow>L’exécution</Eyebrow>
              <h2>Les choix qui ont fait la différence.</h2>
            </div>
            <div className={s.executionList}>
              {study.execution.map((item) => (
                <article key={item.title}>
                  <Check size={20} aria-hidden="true" />
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className={s.results}>
            <Eyebrow>Les résultats</Eyebrow>
            <div className={s.resultsHead}>
              <h2>Plus d’un visiteur sur cinq est devenu client.</h2>
              <p>
                Sur environ 400 à 500 visiteurs, plus de 100 sont devenus
                clients payants. Le lancement a généré entre 600 000 et 700 000
                FCFA, sans publicité payante.
              </p>
            </div>
            <div className={s.resultRows}>
              {study.metrics.map((metric) => (
                <div key={metric.label}>
                  <span>{metric.label}</span>
                  <strong>{metric.value}</strong>
                </div>
              ))}
            </div>
            <p className={s.dataNote}>
              Les chiffres sont des valeurs approximatives issues du premier
              mois.
            </p>
            <p className={s.comparison}>
              À titre de comparaison mathématique, une conversion comprise entre
              3 et 5 % sur le même volume aurait produit environ 12 à 25 ventes.
              Le lancement a obtenu un résultat quatre à huit fois supérieur à
              ce scénario de référence.
            </p>
          </section>

          <section className={s.testimonial}>
            <span aria-hidden="true">“</span>
            <blockquote>
              Excellent travail qui a donné un avantage à notre club. Merci
              encore pour cet excellent boulot.
            </blockquote>
            <p>
              <strong>Diarra Seydou Parfait</strong>
              Cofondateur du Club Croissance Business
            </p>
          </section>

          <section className={s.learnings}>
            <div className={s.sectionIntro}>
              <Eyebrow>Les enseignements</Eyebrow>
              <h2>Trois principes qui guident mon travail.</h2>
            </div>
            <div className={s.learningGrid}>
              {study.learnings.map((item) => (
                <article key={item.number}>
                  <span>{item.number}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className={s.cta}>
            <div>
              <Eyebrow>Votre projet</Eyebrow>
              <h2>Vous lancez un produit, une communauté ou une offre ?</h2>
              <p>
                Construisons une landing page qui positionne votre projet,
                rassure vos prospects et les conduit vers l’action.
              </p>
            </div>
            <Button href="/#contact">Démarrer un projet</Button>
          </section>
        </main>

        <footer className={s.footer}>
          <Brand href="/" />
          <span>© 2026 BeDev. All rights reserved.</span>
          <a href="/#projets">Voir tous les projets</a>
        </footer>
      </div>
    </MotionProvider>
  );
}
