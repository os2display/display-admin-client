import React from "react";
import PropTypes from "prop-types";

/**
 * Radio buttons for forms.
 *
 * @param {string} props The props.
 * @param {string} props.radioGroupName The name of the radio buttons
 * @param {string} props.label The label for the radio buttons
 * @returns {object} Radio buttons.
 */
function RadioButtons({
  radioGroupName,
  label,
  selected,
  options,
  handleChange,
  disabled = false,
  labelScreenReaderOnly = false,
}) {
  /**
   * Transforms the target to something the form-components understand.
   *
   * @param {object} props The props
   * @param {object} props.target The object containing the values return via callback.
   */
  function onCheckedRadio({ target }) {
    const returnTarget = { value: target.id, id: target.name };
    handleChange({ target: returnTarget });
  }

  return (
    <div className="d-flex flex-column">
      <label
        className={labelScreenReaderOnly ? "mr-2 sr-only" : "mr-2"}
        htmlFor={`radios-${label}`}
      >
        {label}
      </label>
      <div id={`radios-${label}`} className="d-flex">
        {options.map(({ id, label: radioLabel }) => (
          <div className="form-check m-2" key={id}>
            <input
              className="form-check-input"
              type="radio"
              name={radioGroupName}
              id={id}
              disabled={disabled}
              checked={selected === id}
              onChange={onCheckedRadio}
            />
            <label className="form-check-label" htmlFor={id}>
              {radioLabel}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

RadioButtons.propTypes = {
  radioGroupName: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  selected: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  disabled: PropTypes.bool,
  handleChange: PropTypes.func.isRequired,
  labelScreenReaderOnly: PropTypes.bool,
};

export default RadioButtons;
