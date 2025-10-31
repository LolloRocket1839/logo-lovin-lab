import { useTranslation } from "react-i18next";

export const SkipToContent = () => {
  const { t } = useTranslation();

  const skipToMain = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const mainContent = document.getElementById("main-content");
    if (mainContent) {
      mainContent.focus();
      mainContent.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <a
      href="#main-content"
      onClick={skipToMain}
      className="skip-to-content"
    >
      {t("accessibility.skipToContent")}
    </a>
  );
};
