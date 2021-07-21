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
function FormInput({
  name,
  type,
  label,
  helpText,
  required,
  placeholder,
  value,
  onChange,
  dataMessage,
  onInvalid,
}) {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        name={name}
        id={name}
        required={required}
        className="form-control"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        data-message={dataMessage}
        onInvalid={onInvalid}
        type={type}
      />

      {helpText && <small className="form-text">{helpText}</small>}
    </div>
  );
}

FormInput.defaultProps = {
  helpText: "",
  required: false,
  placeholder: "",
  type: "text",
  value: "",
  dataMessage: "",
  onInvalid: () => {},
};

FormInput.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string,
  label: PropTypes.string.isRequired,
  helpText: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  dataMessage: PropTypes.string,
  onInvalid: PropTypes.func,
};

export default FormInput;
