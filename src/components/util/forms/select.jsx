import { React, useState, useEffect } from "react";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";

/**
 * @param {object} props
 * The props.
 * @param {string} props.name
 * The name of the select component.
 * @param {string} props.label
 * The label of the select component.
 * @param {string} props.value
 * The selected value.
 * @param {Array} props.options
 * The options for the select component.
 * @param {Function} props.onChange
 * The callback for when something is selected.
 * @param {Array} props.errors
 * A list of errors, or null.
 * @param {string} props.errorText
 * The string to display on error.
 * @param {string} props.helpText
 * The helptext.
 * @returns {object}
 * The select component.
 */
function Select({
  name,
  label,
  value,
  options,
  onChange,
  errors,
  errorText,
  helpText,
}) {
  const intl = useIntl();
  const nothingSelected = intl.formatMessage({
    id: "dropdown_nothing_selected",
  });
  const textOnError =
    errorText || intl.formatMessage({ id: "input_error_text" });
  const [error, setError] = useState();
  const [classes, setClasses] = useState("form-control");
  const required = !!errors;

  /**
   * Handle errors.
   */
  useEffect(() => {
    if (errors && errors.includes(name)) {
      setError(true);
      setClasses("form-control is-invalid");
    }
  }, [errors]);

  return (
    <div className="form-group">
      <label htmlFor={name}>
        {label}
        {required && " *"}
      </label>
      <select
        className={classes}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
      >
        <option disabled value="">
          {nothingSelected}
        </option>
        {options.map((option) => (
          <option value={option.id} key={option.id}>
            {option.name}
          </option>
        ))}
      </select>
      {helpText && <small className="form-text">{helpText}</small>}
      {error && <div className="invalid-feedback">{textOnError}</div>}
    </div>
  );
}

Select.defaultProps = {
  errors: [],
  errorText: "",
  helpText: "",
  value: "",
};

Select.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  errors: PropTypes.arrayOf(PropTypes.string),
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  errorText: PropTypes.string,
  helpText: PropTypes.string,
};

export default Select;
