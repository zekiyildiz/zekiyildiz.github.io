import { useLanguage } from "../i18n/LanguageContext";
import { useReveal } from "../hooks/useReveal";

export default function Projects() {
  const { t } = useLanguage();
  const [ref, visible] = useReveal();

  return (
    <section id="projects" ref={ref} className={`section reveal ${visible ? "reveal-visible" : ""}`}>
      <h3 className="section-title">{t.ui.sectionTitles.projects}</h3>
      <div className="grid">
        {t.projects.map((project) => (
          <a className="card card-link" key={project.name} href={project.link} target="_blank" rel="noreferrer">
            <div className="card-head">
              <div>
                <h4>{project.name}</h4>
                {project.tag && <p className="muted">{project.tag}</p>}
              </div>
              <div className="card-meta">
                <span>{project.period}</span>
              </div>
            </div>
            <p className="muted stack">{project.stack}</p>
            <ul className="bullets">
              {project.bullets.map((bullet, i) => (
                <li key={i}>{bullet}</li>
              ))}
            </ul>
          </a>
        ))}
      </div>
    </section>
  );
}
