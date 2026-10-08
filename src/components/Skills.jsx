import { useLanguage } from "../i18n/LanguageContext";
import { useReveal } from "../hooks/useReveal";

export default function Skills() {
  const { t } = useLanguage();
  const [ref, visible] = useReveal();

  return (
    <section id="skills" ref={ref} className={`section reveal ${visible ? "reveal-visible" : ""}`}>
      <h3 className="section-title">{t.ui.sectionTitles.skills}</h3>
      <div className="skills-grid">
        {t.skills.map((group) => (
          <div className="skill-group" key={group.group}>
            <h4>{group.group}</h4>
            <div className="chips">
              {group.items.map((item) => (
                <span className="chip" key={item}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <h3 className="section-title section-title-spaced">{t.ui.sectionTitles.programs}</h3>
      <div className="timeline">
        {t.programs.map((program) => (
          <div className="card" key={program.name}>
            <div className="card-head">
              <div>
                <h4>{program.role}</h4>
                <p className="muted">{program.name}</p>
              </div>
              <div className="card-meta">
                <span>{program.period}</span>
                <span>{program.location}</span>
              </div>
            </div>
            <ul className="bullets">
              {program.bullets.map((bullet, i) => (
                <li key={i}>{bullet}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
