import { React } from "react";
import { useTranslation, Trans } from "react-i18next";
import Logo from "../logo";

const LoginSidebar = () => {
  const { t } = useTranslation("common", { keyPrefix: "login-sidebar" });

  return (
    <div className="background-image-screens p-4 col-md-4">
      <Logo />
      <div className="card text-white bg-dark mb-3 border border-color-white">
        <div className="card-body">
          <p className="card-text" id="ad-explanation">
            <Trans>{t("internal-info-text")}</Trans>
          </p>
          <p className="card-text" id="mitid-explanation">
            <Trans>{t("external-info-text")}</Trans>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginSidebar;
