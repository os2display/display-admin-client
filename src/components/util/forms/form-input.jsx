import { React, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FormGroup, FormLabel, FormControl, InputGroup } from "react-bootstrap";

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
  placeholder,
  value,
  onChange,
  dataMessage,
  onInvalid,
  errors,
  invalidText,
}) {
  const [error, setError] = useState();
  const required = !!errors;

  /**
   * Handle errors.
   */
  useEffect(() => {
    setError(errors && errors.includes(name));
  }, [errors]);

  return (
    <FormGroup className="mb-3">
      <FormLabel htmlFor={name}>
        {label}
        {required && " *"}
      </FormLabel>
      <InputGroup hasValidation>
        <FormControl
          name={name}
          id={name}
          className={error ? "form-control is-invalid" : "form-control"}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          data-message={dataMessage}
          onInvalid={onInvalid}
          type={type}
        />
        {error && <div className="invalid-feedback">{invalidText}</div>}
      </InputGroup>
      {helpText && <small className="form-text">{helpText}</small>}
    </FormGroup>
  );
}

FormInput.defaultProps = {
  helpText: "",
  placeholder: "",
  type: "text",
  value: "",
  dataMessage: "",
  onInvalid: () => {},
  errors: null,
  invalidText: "",
};

FormInput.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.string),
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string,
  label: PropTypes.string.isRequired,
  helpText: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  dataMessage: PropTypes.string,
  onInvalid: PropTypes.func,
  invalidText: PropTypes.string,
};

export default FormInput;
