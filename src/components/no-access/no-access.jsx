import { React } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

/**
 * No access component
 *
 * @returns {object} A no access component.
 */
function NoAccess() {
  const { t } = useTranslation("common");
  const navigate = useNavigate();

  return (
    <>
      <div>{t("no-access.you-dont-have-access")}</div>
      <Button
        variant="secondary"
        id="back_to_list"
        className="m-1"
        onClick={() => navigate(-1)}
      >
        {t("no-access.go-back")}
      </Button>
    </>
  );
}

export default NoAccess;
