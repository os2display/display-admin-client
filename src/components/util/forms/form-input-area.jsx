import React from "react";
import PropTypes from "prop-types";

/**
 * An input for forms.
 *
 * @param {string} props
 * the props.
 * @param {string} props.name
 * The name of the input
 * @param {string} props.label
 * The label for the input
 * @param {string} props.helpText
 * The helptext for the input, if it is needed.
 * @param {boolean} props.required
 * Whether the input is required.
 * @returns {object}
 * An input.
 */
function FormInputArea({ name, label, helpText, required, ...rest }) {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <textarea
        name={name}
        id={name}
        required={required}
        className="form-control"
        {...rest}
      />

      {helpText && <small className="form-text">{helpText}</small>}
    </div>
  );
}

FormInputArea.defaultProps = {
  helpText: "",
  required: false,
  rest: {},
};

FormInputArea.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  helpText: PropTypes.string,
  required: PropTypes.bool,
  rest: PropTypes.arrayOf(),
};

export default FormInputArea;
