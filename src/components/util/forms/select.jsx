import React from "react";
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
 * @param {string} props.dataMessage
 * The message, if the form is submitted invalid.
 * @param {Function} props.onInvalid
 * The callback, if the form is submitted invalid.
 * @param {boolean} props.required
 * Whether the form is required.
 * @returns {object}
 * The select component.
 */
function Select({
  name,
  label,
  value,
  options,
  onChange,
  dataMessage,
  onInvalid,
  required,
}) {
  const intl = useIntl();
  const nothingSelected = intl.formatMessage({
    id: "dropdown_nothing_selected",
  });
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select
        className="form-control"
        id={name}
        name={name}
        value={value}
        required={required}
        data-message={dataMessage}
        onChange={onChange}
        onInvalid={onInvalid}
      >
        <option disabled value="0">
          {nothingSelected}
        </option>
        {options.map((option) => (
          <option value={option.id} key={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
}

Select.defaultProps = {
  required: false,
};

Select.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  required: PropTypes.bool,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  dataMessage: PropTypes.string.isRequired,
  onInvalid: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default Select;
