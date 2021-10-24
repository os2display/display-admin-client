import { React, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import isBetween from "dayjs/plugin/isBetween";
import dayjs from "dayjs";
/**
 * @param {object} props The props.
 * @param {object} props.published Object with from and to.
 * @returns {object} The published yes/no component.
 */
function Published({ published }) {
  const { t } = useTranslation("common");
  const [isPublished, setIsPublished] = useState(false);

  const { from, to } = published;
  // extend isbetween
  useEffect(() => {
    dayjs.extend(isBetween);
    setIsPublished(dayjs(new Date()).isBetween(dayjs(from), dayjs(to), "day"));
  }, []);

  return <div>{isPublished ? t("published.yes") : t("published.no")}</div>;
}

Published.propTypes = {
  published: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Published;
