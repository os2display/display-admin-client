/* eslint-disable react/prop-types */
import { toast } from "react-toastify";
import dayjs from "dayjs";
import "./display-toast.scss";

/** @param {string} text The toast display text */
export function displaySuccess(text) {
  const displayText = `${text} ${dayjs().format("HH:mm:ss")}`;

  toast.success(displayText);
}

/** @param {string} text The toast display text */
export function displayWarning(text) {
  const displayText = `${text} ${dayjs().format("HH:mm:ss")}`;

  toast.warning(displayText);
}

/**
 * @param {string} errorString - The toast display text
 * @param {object} error - The error
 */
export function displayError(errorString, error) {
  let errorText = "";

  if (error && error["hydra:description"]) {
    errorText = error["hydra:description"];
  }
  if (error && error.data) {
    errorText = error.data["hydra:description"] || error.data.message;
  }
  if (error && error.error) {
    errorText = error.error;
  }

  const displayText = `${errorString} ${errorText} ${dayjs().format(
    "HH:mm:ss"
  )}`;

  toast.error(displayText, {
    autoClose: false,
  });
}
