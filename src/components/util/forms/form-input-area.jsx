import React from "react";
import PropTypes from "prop-types";

/**
 * An text area for forms.
 *
 * @param {string} props The props.
 * @param {string} props.name The name of the text area
 * @param {string} props.label The label for the text area
 * @param {string} props.helpText The helptext for the text area, if it is needed.
 * @param {boolean} props.required Whether the text area is required.
 * @returns {object} An text area.
 */
function FormInputArea({ name, label, placeholder, value, onChange }) {
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

FormInputArea.defaultProps = {
  value: "",
  placeholder: "",
};

FormInputArea.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default FormInputArea;
