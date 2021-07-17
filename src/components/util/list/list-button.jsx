import { React } from "react";

/**
 * @param {Function} callback
 * The callback function
 * @param {object} callbackData
 * The data for the callback
 * @param {string} label
 * The label of the button.
 * @returns {object}
 * The list button.
 */
function ListButton(callback, callbackData, label) {
  return (
    <button type="button" onClick={() => callback(callbackData)}>
      {label}
    </button>
  );
}

export default ListButton;
