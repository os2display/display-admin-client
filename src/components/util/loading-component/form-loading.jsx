import React from "react";
import { Spinner } from "react-bootstrap";
import PropTypes from "prop-types";

/**
 * The loading component for forms.
 *
 * @param {object} props The props.
 * @param {boolean} props.isLoading Indicator of whether the form is loading
 * @param {string} props.loadingMessage The loading message for the spinner
 * @returns {object} The loading component for forms.
 */
function FormLoading({ isLoading, loadingMessage }) {
  return (
    <>
      {isLoading && (
        <div className="spinner-overlay">
          <div className="spinner-container">
            <Spinner animation="border" className="loading-spinner" />
            {loadingMessage && <h2>{loadingMessage}</h2>}
          </div>
        </div>
      )}
    </>
  );
}

FormLoading.defaultProps = {
  isLoading: false,
  loadingMessage: "",
};

FormLoading.propTypes = {
  isLoading: PropTypes.bool,
  loadingMessage: PropTypes.string,
};

export default FormLoading;
