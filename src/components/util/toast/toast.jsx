import { React, useEffect, useState } from "react";
import { Toast as BootstrapToast } from "react-bootstrap";
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
function Toast({ text, show }) {
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
      timer = setTimeout(() => {
        setDisplayToast(false);
      }, displayToastMilliseconds);
    }

    return function cleanup() {
      if (timer !== null) {
        clearInterval(timer);
      }
    };
  }, [show]);

  return (
    <div className="toast-wrapper">
      <BootstrapToast animation={false} bg="success" show={displayToast}>
        <BootstrapToast.Body>
          {text} <small>{dayjs().format("HH:mm")}</small>
        </BootstrapToast.Body>
      </BootstrapToast>
    </div>
  );
}

Toast.defaultProps = {
  show: false,
};

Toast.propTypes = {
  text: PropTypes.string.isRequired,
  show: PropTypes.bool,
};

export default Toast;
