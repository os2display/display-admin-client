import { React } from "react";
import { useTranslation, Trans } from "react-i18next";
import Logo from "../logo";

const LoginSidebar = () => {
  const { t } = useTranslation("common", { keyPrefix: "login-sidebar" });
  return (
    <>
      <Logo />
      <div className="card text-white bg-dark mb-3">
        <div className="card-body">
          <p className="card-text">
            <Trans>{t("AD-info-text")}</Trans>
          </p>
          <p className="card-text">
            <Trans>{t("MitID-info-text")}</Trans>
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginSidebar;
