import { React } from "react";
import { Link } from "react-router-dom";
import idFromUrl from "../helpers/id-from-url";

/**
 * A link for the list
 *
 * @param {object} id The id of what is being edited.
 * @param {string} param The data type param.
 * @param {string} label The label.
 * @param {boolean} targetBlank Whether to open in a new tab.
 * @returns {object} A link for the list.
 */
function LinkForList(id, param, label, targetBlank) {
  const newId = idFromUrl(id);
  return (
    <Link
      className="btn btn-primary"
<<<<<<< HEAD
      target={targetBlank ? "_blank" : ""}
=======
      id="edit_button"
>>>>>>> bedd484 (coding standards apply)
      to={`/${param}/${newId}`}
    >
      {label}
    </Link>
  );
}

export default LinkForList;
