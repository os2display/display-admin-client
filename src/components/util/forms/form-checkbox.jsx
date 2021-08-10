import { React } from "react";
import PropTypes from "prop-types";
import { FormCheck, FormGroup } from "react-bootstrap";

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
function FormCheckbox({
  name,
  label,
  helpText,
  onChange,
  value,
  formGroupClasses,
}) {
  /**
   * Transforms the target to something the edit-components understand.
   *
   * @param {object}  props
   * The props
   * @param {object} props.target
   * The object containing the values return via callback.
   */
  function onChecked({ target }) {
    const returnTarget = { value: target.checked, id: target.name };
    onChange({ target: returnTarget });
  }

  return (
    <FormGroup
      className={formGroupClasses}
      controlId={`formBasicCheckbox${name}`}
    >
      <FormCheck
        onChange={onChecked}
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
  formGroupClasses: "",
  value: false,
};

FormCheckbox.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.bool,
  label: PropTypes.string.isRequired,
  helpText: PropTypes.string,
  formGroupClasses: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default FormCheckbox;
