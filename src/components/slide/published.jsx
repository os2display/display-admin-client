import { React } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

/**
 * @param {object} props
 * The props.
 * @param {boolean} props.published
 * Whether it is published or not.
 * @returns {object}
 * The published yes/no component.
 */
function Published({ published }) {
  const { t } = useTranslation("common");

  return (
    <div className="m-2">
      {published ? t("published.yes") : t("published.no")}
    </div>
  );
}

Published.propTypes = {
  published: PropTypes.bool.isRequired,
};

export default Published;
