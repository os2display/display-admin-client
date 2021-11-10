import { React, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import dayjs from "dayjs";

/**
 * @param {object} props - The props.
 * @param {string} props.text - The text to display
 * @param {boolean} props.show - Show toast
 * @param {string} props.title - The title of the toast.
 * @param {boolean} props.error - If the toast should be displayed as an error.
 * @returns {object} - The toast component.
 */
function Toast({ text, show, title, error }) {
  const { t } = useTranslation("common");
  let displayTitle = title;
  if (!title) {
    displayTitle = t("toast.title");
  }
  const [displayToast, setDisplayToast] = useState(false);
  const displayToastMilliseconds = 5000;

  /** Display the toast. */
  useEffect(() => {
    let timer = null;

    if (show) {
      if (displayToast) setDisplayToast(false);
      setDisplayToast(true);
      if (!error) {
        timer = setTimeout(() => {
          setDisplayToast(false);
        }, displayToastMilliseconds);
      }
    }

    return function cleanup() {
      if (timer !== null) {
        clearInterval(timer);
      }
    };
  }, [show]);

  return (
    <>
      {displayToast && (
        <div className="toast-wrapper">
          <div
            className={error ? "toast show bg-danger" : "toast show"}
            role="alert"
            aria-live="polite"
            aria-atomic="true"
          >
            <div className="toast-header d-flex justify-content-between">
              <strong className="p-1">{displayTitle}</strong>
              <div>
                <small className="text-muted">{dayjs().format("HH:mm")}</small>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="toast.button-label"
                  onClick={() => setDisplayToast(false)}
                />
              </div>
            </div>
            <div className="toast-body">{text}</div>
          </div>
        </div>
      )}
    </>
  );
}

Toast.defaultProps = {
  show: false,
  title: "",
  error: false,
};

Toast.propTypes = {
  text: PropTypes.string.isRequired,
  show: PropTypes.bool,
  title: PropTypes.string,
  error: PropTypes.bool,
};

export default Toast;
