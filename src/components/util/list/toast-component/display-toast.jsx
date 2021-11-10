/* eslint-disable react/prop-types */
import { toast } from "react-toastify";
import dayjs from "dayjs";
/**
 * The toast
 *
 * @param {string} text The text for the toast
 * @param {boolean} error If the toast is an error-toast
 */
function displayToast(text, error) {
  const displayText = `${text} ${dayjs().format("HH:mm:ss")}`;

  if (error) {
    toast.error(displayText, {
      position: "bottom-right",
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } else {
    toast(displayText, {
      position: "bottom-right",
      autoClose: 10000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
}

export default displayToast;
