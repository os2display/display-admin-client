import { React } from "react";
import { useTranslation } from "react-i18next";

/**
 * No access component
 *
 * @returns {object} A no access component.
 */
function NoAccess() {
  const { t } = useTranslation("common");

  return (
    <>
      <div>{t("no-access.you-dont-have-access")}</div>
    </>
  );
}

export default NoAccess;
