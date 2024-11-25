import { React } from "react";
import PropTypes from "prop-types";
import { FormControl, FormGroup, FormLabel, InputGroup } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Tooltip from "../tooltip";

/**
 * An input for forms.
 *
 * @param {string} props The props.
 * @param {string} props.name The name of the input
 * @param {string} props.type The type of the input.
 * @param {string | null} props.label The label for the input
 * @param {string} props.helpText The help text for the input, if it is needed.
 * @param {string} props.placeholder The placeholder for the input.
 * @param {string} props.value The value of the input
 * @param {Function} props.onChange The callback for changes in the input.
 * @param {boolean} props.error If the input has errors.
 * @param {string | null} props.invalidText The text if the input is invalid
 * @param {string} props.formGroupClasses Classes for the form group
 * @param {boolean} props.disabled If the input is disabled
 * @param {boolean} props.required If the input is required
 * @param {string | null} props.tooltip Tooltip text. Does not display if null.
 * @param {object | null} props.inputGroupExtra Extra elements for input group.
 * @returns {object} An input.
 */
function FormInput({
  name,
  onChange,
  helpText = "",
  formGroupClasses = "",
  placeholder = "",
  type = "text",
  value = "",
  error = false,
  invalidText = null,
  disabled = false,
  label = null,
  inputGroupExtra = null,
  required = false,
  tooltip = null,
  ...rest
}) {
  const { t } = useTranslation("common");
  const invalidInputText = invalidText || t("form-input.validation-text");
  /* eslint-disable react/jsx-props-no-spreading */
  return (
    <FormGroup className={formGroupClasses}>
      {label && (
        <>
          <FormLabel htmlFor={name}>
            {label}
            {required && " *"}
          </FormLabel>
          {tooltip !== null && (
            <Tooltip id={`tooltip-${name}`} content={tooltip} />
          )}
        </>
      )}
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
          {...rest}
        />
        {error && <div className="invalid-feedback">{invalidInputText}</div>}
        {inputGroupExtra}
      </InputGroup>
      {helpText && <small>{helpText}</small>}
    </FormGroup>
  );
  /* eslint-enable react/jsx-props-no-spreading */
}

FormInput.propTypes = {
  error: PropTypes.bool,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  label: PropTypes.string,
  helpText: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  invalidText: PropTypes.string,
  formGroupClasses: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  inputGroupExtra: PropTypes.node,
  tooltip: PropTypes.string,
};

export default FormInput;
