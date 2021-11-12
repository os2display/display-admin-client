import { React, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FormControl, FormGroup, FormLabel, InputGroup } from "react-bootstrap";
import { useTranslation } from "react-i18next";

/**
 * An input for forms.
 *
 * @param {string} props The props.
 * @param {string} props.name The name of the input
 * @param {string} props.type The type of the input.
 * @param {string} props.label The label for the input
 * @param {string} props.helpText The helptext for the input, if it is needed.
 * @param {string} props.placeholder The placeholder for the input.
 * @param {string} props.value The value of the input
 * @param {Function} props.onChange The callback for changes in the input.
 * @param {string} props.errors The errors for the input.
 * @param {string} props.invalidText The text if the input is invalid
 * @param {string} props.formGroupClasses Classes for the formgroup
 * @param {string} props.disabled If the input is disabled
 * @returns {object} An input.
 */
function FormInput({
  name,
  type,
  label,
  helpText,
  placeholder,
  value,
  onChange,
  errors,
  invalidText,
  formGroupClasses,
  disabled,
}) {
  const { t } = useTranslation("common");
  const [error, setError] = useState();
  const required = !!errors;
  const invalidInputText = invalidText || t("form-input.validation-text");

  /** Handle errors. */
  useEffect(() => {
    setError(errors && errors.includes(name));
  }, [errors]);

  return (
    <FormGroup className={formGroupClasses}>
      <FormLabel htmlFor={name}>
        {label}
        {required && " *"}
      </FormLabel>
      <InputGroup hasValidation>
        <FormControl
          name={name}
          id={name}
          disabled={disabled}
          className={error ? "form-control is-invalid" : "form-control"}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          type={type}
        />
        {error && <div className="invalid-feedback">{invalidInputText}</div>}
      </InputGroup>
      {helpText && <small className="form-text">{helpText}</small>}
    </FormGroup>
  );
}

FormInput.defaultProps = {
  helpText: "",
  formGroupClasses: "",
  placeholder: "",
  type: "text",
  value: "",
  errors: null,
  invalidText: null,
  disabled: false,
};

FormInput.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.string),
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  label: PropTypes.string.isRequired,
  helpText: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  invalidText: PropTypes.string,
  formGroupClasses: PropTypes.string,
  disabled: PropTypes.bool,
};

export default FormInput;
