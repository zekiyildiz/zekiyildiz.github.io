import { useLanguage } from "../i18n/LanguageContext";
import { useReveal } from "../hooks/useReveal";

export default function Contact() {
  const { t } = useLanguage();
  const { profile } = t;
  const [ref, visible] = useReveal();

  return (
    <section id="contact" ref={ref} className={`section reveal ${visible ? "reveal-visible" : ""}`}>
      <h3 className="section-title">{t.ui.sectionTitles.contact}</h3>
      <div className="card contact-card">
        <p>{t.ui.contact.intro}</p>
        <div className="contact-links">
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <a href={`tel:${profile.phone.replace(/\s/g, "")}`}>{profile.phone}</a>
          <a href={profile.github} target="_blank" rel="noreferrer">
            github.com/zekiyildiz
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">
            linkedin.com/in/zekiyildiz
          </a>
        </div>
      </div>
    </section>
  );
}
