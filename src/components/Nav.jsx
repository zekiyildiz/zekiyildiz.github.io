import { useLanguage } from "../i18n/LanguageContext";

export default function Nav() {
  const { lang, setLang, t } = useLanguage();
  const links = [
    { href: "#about", label: t.ui.nav.about },
    { href: "#experience", label: t.ui.nav.experience },
    { href: "#projects", label: t.ui.nav.projects },
    { href: "#skills", label: t.ui.nav.skills },
    { href: "#contact", label: t.ui.nav.contact },
  ];

  return (
    <header className="nav">
      <span className="nav-spacer" aria-hidden="true" />
      <nav>
        <ul className="nav-links">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="lang-toggle" role="group" aria-label="Language">
        <button type="button" className={lang === "en" ? "active" : ""} onClick={() => setLang("en")}>
          EN
        </button>
        <button type="button" className={lang === "tr" ? "active" : ""} onClick={() => setLang("tr")}>
          TR
        </button>
      </div>
    </header>
  );
}
