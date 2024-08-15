import { React } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import idFromUrl from "../helpers/id-from-url";

/**
 * A link for the list
 *
 * @param {object} props - The props.
 * @param {object} props.id The id of what is being edited.
 * @param {string} props.param The data type param.
 * @param {boolean} props.targetBlank Whether to open in a new tab.
 * @returns {object} A link for the list.
 */
function LinkForList({ id, param, targetBlank = false }) {
  const { t } = useTranslation("common", { keyPrefix: "link-for-list" });
  const newId = idFromUrl(id);

  return (
    <Link
      className="btn btn-primary me-2"
      id="edit_button"
      target={targetBlank ? "_blank" : ""}
      to={`/${param}/${newId}`}
    >
      {t("label")}
    </Link>
  );
}

LinkForList.propTypes = {
  id: PropTypes.string.isRequired,
  param: PropTypes.string.isRequired,
  targetBlank: PropTypes.bool,
};

export default LinkForList;
