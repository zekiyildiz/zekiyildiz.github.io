import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../i18n/LanguageContext";

export default function CvDownload() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function onClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("click", onClickOutside);
    return () => document.removeEventListener("click", onClickOutside);
  }, []);

  return (
    <div className="cv-download" ref={ref}>
      <button type="button" className="button button-ghost" onClick={() => setOpen((o) => !o)}>
        {t.ui.cv.button}
      </button>
      {open && (
        <div className="cv-menu">
          <a href="/cv_en.pdf" download="Zeki_Furkan_Yildiz_CV_EN.pdf" onClick={() => setOpen(false)}>
            {t.ui.cv.english}
          </a>
          <a href="/cv_tr.pdf" download="Zeki_Furkan_Yildiz_CV_TR.pdf" onClick={() => setOpen(false)}>
            {t.ui.cv.turkish}
          </a>
        </div>
      )}
    </div>
  );
}
