import React from "react";
import PropTypes from "prop-types";

/**
 * A text area for forms.
 *
 * @param {string} props The props.
 * @param {string} props.name The name of the text area
 * @param {string} props.label The label for the text area
 * @param {string} props.placeholder The placeholder for the text area
 * @param {string} props.value The value of the text area
 * @param {Function} props.onChange The callback for changes in the text area
 * @returns {object} An text area.
 */
function FormInputArea({
  name,
  label,
  onChange,
  value = "",
  placeholder = "",
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
      />
    </div>
  );
}

FormInputArea.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default FormInputArea;
