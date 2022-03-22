/* eslint-disable react/prop-types */
import { toast } from "react-toastify";
import dayjs from "dayjs";
import "./display-toast.scss";

/** @param {string} text The toast display text */
export function displaySuccess(text) {
  const displayText = `${text} ${dayjs().format("HH:mm:ss")}`;

  toast.success(displayText);
}

/**
 * @param {string} errorString The toast display text
 * @param {object} error The error
 */
export function displayError(errorString, error) {
  let errorText = "";

  if (error) {
    errorText = error.data
      ? error.data["hydra:description"] || error.data.message
      : error.error;
  }
  const displayText = `${errorString} ${errorText} ${dayjs().format(
    "HH:mm:ss"
  )}`;

  toast.error(displayText, {
    autoClose: false,
  });
}
