import { Hero } from "../components/sections/Hero";
import {
  References,
  Introduction,
  Profiles,
  Services,
  Solutions,
  About,
  Projects,
  Method,
  Pricing,
  Contact,
  FAQ,
  FinalCTA,
  Footer,
} from "../components/sections/Sections";
import s from "../components/sections/Portfolio.module.css";
import { MotionProvider } from "../components/motion/MotionProvider";
export function meta() {
  return [
    { title: "BeDev — Développeur web & produits numériques" },
    { property: "og:type", content: "website" },
    { property: "og:locale", content: "fr_FR" },
    {
      property: "og:title",
      content: "BeDev — Développeur web & produits numériques",
    },
    {
      name: "description",
      content:
        "Landing pages, tunnels et applications sur mesure. Découvrez les services, les projets et la méthode de Nulanyo Constant.",
    },
  ];
}
export default function Home() {
  return (
    <MotionProvider>
      <a className="skip-link" href="#contenu">
        Aller au contenu
      </a>
      <div className={s.page}>
        <main id="contenu">
          <Hero />
          <References />
          <Introduction />
          <Profiles />
          <Services />
          <Solutions />
          <About />
          <Projects />
          <Method />
          <Pricing />
          <Contact />
          <FAQ />
          <FinalCTA />
        </main>
        <Footer />
      </div>
    </MotionProvider>
  );
}
