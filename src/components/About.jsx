import { useLanguage } from "../i18n/LanguageContext";
import { useReveal } from "../hooks/useReveal";

export default function About() {
  const { t } = useLanguage();
  const { education } = t;
  const [ref, visible] = useReveal();

  return (
    <section id="about" ref={ref} className={`section reveal ${visible ? "reveal-visible" : ""}`}>
      <h3 className="section-title">{t.ui.sectionTitles.about}</h3>
      <div className="card">
        <div className="card-head">
          <div>
            <h4>{education.school}</h4>
            <p className="muted">{education.degree}</p>
          </div>
          <div className="card-meta">
            <span>{education.period}</span>
            <span>{education.location}</span>
          </div>
        </div>
        <p className="muted">
          {t.ui.misc.gpa}: {education.gpa}
        </p>
      </div>
    </section>
  );
}
