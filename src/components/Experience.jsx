import { useLanguage } from "../i18n/LanguageContext";
import { useReveal } from "../hooks/useReveal";

export default function Experience() {
  const { t } = useLanguage();
  const [ref, visible] = useReveal();

  return (
    <section id="experience" ref={ref} className={`section reveal ${visible ? "reveal-visible" : ""}`}>
      <h3 className="section-title">{t.ui.sectionTitles.experience}</h3>
      <div className="timeline">
        {t.experience.map((job) => (
          <div className="card" key={`${job.org}-${job.period}`}>
            <div className="card-head">
              <div>
                <h4>{job.role}</h4>
                <p className="muted">{job.org}</p>
              </div>
              <div className="card-meta">
                <span>{job.period}</span>
                <span>{job.location}</span>
              </div>
            </div>
            <ul className="bullets">
              {job.bullets.map((bullet, i) => (
                <li key={i}>{bullet}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
