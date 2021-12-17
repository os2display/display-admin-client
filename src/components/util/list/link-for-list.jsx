import { React } from "react";
import { Link } from "react-router-dom";
import idFromUrl from "../helpers/id-from-url";

/**
 * A link for the list
 *
 * @param {object} id The id of what is being edited.
 * @param {string} param The data type param.
 * @param {string} label The label.
 * @returns {object} A link for the list.
 */
function LinkForList(id, param, label) {
  const newId = idFromUrl(id);
  return (
    <Link
      className="btn btn-primary edit-button
    "
      to={`/${param}/${newId}`}
    >
      {label}
    </Link>
  );
}

export default LinkForList;
