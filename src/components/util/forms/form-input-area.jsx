import React from "react";
import PropTypes from "prop-types";
import { FormLabel } from "react-bootstrap";

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
  formGroupClasses = "",
  placeholder = "",
  required = false,
}) {
  return (
    <div className={`form-group ${formGroupClasses}`}>
      <FormLabel htmlFor={name}>
        {label}
        {required && " *"}
      </FormLabel>
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
  formGroupClasses: PropTypes.string,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  required: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

export default FormInputArea;
