/* eslint-disable react/prop-types */
import { toast } from "react-toastify";
import "./display-toast.scss";
import dayjs from "dayjs";

/** @param {string} text The toast display text */
export function displaySuccess(text) {
  const displayText = `${text} ${dayjs().format("HH:mm:ss")}`;

  toast.success(displayText);
}

/** @param {string} text The toast display text */
export function displayError(text) {
  const displayText = `${text} ${dayjs().format("HH:mm:ss")}`;

  toast.error(displayText, {
    autoClose: false,
  });
}
