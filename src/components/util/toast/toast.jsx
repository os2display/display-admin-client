import { React, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import dayjs from "dayjs";

/**
 * @param {object} props
 * The props.
 * @param {string} props.text
 * The text to display
 * @param {boolean} props.show
 * Show toast
 * @returns {object}
 * The toast component.
 */
function Toast({ text, show, title, error }) {
  const { t } = useTranslation("common");
  if (!title) {
    title = t("toast.title");
  }
  const [displayToast, setDisplayToast] = useState(false);
  const displayToastMilliseconds = 5000;

  /**
   * Display the toast.
   */
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
            class={error ? "toast show bg-danger" : "toast show"}
            role="alert"
            aria-live="polite"
            aria-atomic="true"
          >
            <div class="toast-header d-flex justify-content-between">
              <strong class="p-1">{title}</strong>
              <div>
                <small class="text-muted">{dayjs().format("HH:mm")}</small>
                <button
                  type="button"
                  class="btn-close"
                  onClick={() => setDisplayToast(false)}
                ></button>
              </div>
            </div>
            <div class="toast-body">{text}</div>
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
