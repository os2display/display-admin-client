import { React } from "react";

/**
 * @param {Function} callback
 * The callback function
 * @param {object} callbackData
 * The data for the callback
 * @param {string} label
 * The label of the button.
 * @param {bool} disabled
 * Whether the button should be disabled.
 * @returns {object}
 * The list button.
 */
function ListButton(callback, callbackData, label, disabled) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => callback(callbackData)}
    >
      {label}
    </button>
  );
}

export default ListButton;
