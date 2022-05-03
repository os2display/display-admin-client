import { React, useEffect, useState } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import localeDa from "dayjs/locale/da";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { useTranslation } from "react-i18next";
import calculateIsPublished from "./helpers/calculate-is-published";

/**
 * @param {object} props The props.
 * @param {object} props.published Object with from and to.
 * @returns {object} The published yes/no component.
 */
function Published({ published }) {
  const { t } = useTranslation("common", { keyPrefix: "published" });
  const [isPublished, setIsPublished] = useState(false);

  useEffect(() => {
    dayjs.extend(localizedFormat);
  }, []);

  useEffect(() => {
    setIsPublished(calculateIsPublished(published));
  }, [published]);

  if (!published.from && !published.to) {
    return <div>{isPublished ? t("yes") : t("no")}</div>;
  }

  let publishedFrom = "-";
  let publishedTo = "-";

  if (published.from) {
    publishedFrom = dayjs(published.from).locale(localeDa).format("LLLL");
  }
  if (published.to) {
    publishedTo = dayjs(published.to).locale(localeDa).format("LLLL");
  }
  return (
    <>
      <div>
        {t("from")}: {publishedFrom}
      </div>
      <div>
        {t("to")}: {publishedTo}
      </div>
    </>
  );
}

Published.propTypes = {
  published: PropTypes.shape({
    from: PropTypes.string,
    to: PropTypes.string,
  }).isRequired,
};

export default Published;
