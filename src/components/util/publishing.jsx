import { React, useEffect } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import localeDa from "dayjs/locale/da";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { useTranslation } from "react-i18next";

/**
 * @param {object} props The props.
 * @param {object} props.published Object with from and to.
 * @returns {object} The published yes/no component.
 */
function Publishing({ published }) {
  const { t } = useTranslation("common", { keyPrefix: "published" });

  useEffect(() => {
    dayjs.extend(localizedFormat);
  }, []);

  let publishedFrom = null;
  let publishedTo = null;

  if (published.from) {
    publishedFrom = dayjs(published.from).locale(localeDa).format("lll");
  }

  if (published.to) {
    publishedTo = dayjs(published.to).locale(localeDa).format("lll");
  }

  return (
    <>
      {publishedFrom && (
        <div>
          {t("from")}: {publishedFrom}
        </div>
      )}
      {publishedTo && (
        <div>
          {t("to")}: {publishedTo}
        </div>
      )}
      {publishedFrom === null && publishedTo === null && (
        <div>{t("always")}</div>
      )}
    </>
  );
}

Publishing.propTypes = {
  published: PropTypes.shape({
    from: PropTypes.string,
    to: PropTypes.string,
  }).isRequired,
};

export default Publishing;
