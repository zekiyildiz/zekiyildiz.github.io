import { useLanguage } from "../i18n/LanguageContext";
import CvDownload from "./CvDownload";

export default function Hero() {
  const { t } = useLanguage();
  const { profile } = t;

  return (
    <section id="top" className="hero">
      <p className="hero-eyebrow">{profile.location}</p>
      <h1>{profile.name}</h1>
      <h2>{profile.title}</h2>
      <p className="hero-summary">{profile.summary}</p>
      <div className="hero-links">
        <a className="button" href={`mailto:${profile.email}`}>
          {t.ui.hero.getInTouch}
        </a>
        <a className="button button-ghost" href={profile.github} target="_blank" rel="noreferrer">
          {t.ui.hero.github}
        </a>
        <a className="button button-ghost" href={profile.linkedin} target="_blank" rel="noreferrer">
          {t.ui.hero.linkedin}
        </a>
        <CvDownload />
      </div>
    </section>
  );
}
