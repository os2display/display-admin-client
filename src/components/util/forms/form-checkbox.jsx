import { React, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FormGroup, FormCheck } from "react-bootstrap";
import { useIntl } from "react-intl";
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
function FormCheckbox({ name, label, helpText, onChange, value }) {
  return (
    <FormGroup className="mb-3" controlId={`formBasicCheckbox${name}`}>
      <FormCheck
        onChange={onChange}
        type="checkbox"
        name={name}
        checked={value}
        label={label}
      />
      {helpText && <small className="form-text">{helpText}</small>}
    </FormGroup>
  );
}

FormCheckbox.defaultProps = {
  helpText: "",
  placeholder: "",
  type: "text",
  value: "",
  dataMessage: "",
  onInvalid: () => {},
  errors: null,
  invalidText: null,
};

FormCheckbox.propTypes = {
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

export default FormCheckbox;
