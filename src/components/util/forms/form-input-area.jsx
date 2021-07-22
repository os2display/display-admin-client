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
function FormInputArea({
  name,
  label,
  placeholder,
  value,
  onChange,
  dataMessage,
  onInvalid,
}) {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <textarea
        name={name}
        id={name}
        className="form-control"
        rows={3}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        data-message={dataMessage}
        onInvalid={onInvalid}
      />
    </div>
  );
}

FormInputArea.defaultProps = {
  value: "",
};

FormInputArea.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  dataMessage: PropTypes.string.isRequired,
  onInvalid: PropTypes.func.isRequired,
};

export default FormInputArea;
