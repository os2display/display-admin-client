import { React, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import calculateIsPublished from "./helpers/calculate-is-published";

/**
 * @param {object} props The props.
 * @param {object} props.published Object with from and to.
 * @returns {object} The published yes/no component.
 */
function Published({ published }) {
  const { t } = useTranslation("common");
  const [isPublished, setIsPublished] = useState(false);

  useEffect(() => {
    setIsPublished(calculateIsPublished(published));
  }, [published]);

  return <div>{isPublished ? t("published.yes") : t("published.no")}</div>;
}

Published.propTypes = {
  published: PropTypes.shape({
    from: PropTypes.number,
    to: PropTypes.number,
  }).isRequired,
};

export default Published;
