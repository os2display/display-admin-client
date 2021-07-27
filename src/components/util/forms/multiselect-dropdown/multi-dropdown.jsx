import { React, useState, useEffect } from "react";
import { useIntl } from "react-intl";
import MultiSelect from "react-multi-select-component";
import PropTypes from "prop-types";
import contentString from "../../helpers/content-string";

/**
 * A searchablemultiselect component.
 * Using a multiselect from react-multi-select-component, and making
 * some adjustments, replacing default fuzzy search with string match
 * and displaying the values selected using contentstring-method.
 *
 * @param {object} props
 * the props.
 * @param {Array} props.options
 * The option for the searchable dropdown.
 * @param {Function} props.handleSelection
 * The callback when an option is selected
 * @param {Array} props.selected
 * The selected options
 * @param {boolean} props.isCreatable
 * Whether the multi dropdown can create new options.
 * @param {string} props.name
 * The id of the form element
 * @param {boolean} props.isLoading
 * Whether the component is loading.
 * @param {string} props.noSelectedString
 * The label for when there is nothing selected.
 * @param {Array} props.errors
 * A list of errors, or null.
 * @param {string} props.errorText
 * The string to display on error.
 * @param {string} props.label
 * The input label
 * @returns {object}
 * The multidropdown
 */
function MultiSelectComponent({
  options,
  handleSelection,
  selected,
  isCreatable,
  name,
  isLoading,
  noSelectedString,
  errors,
  errorText,
  label,
}) {
  const intl = useIntl();
  const [error, setError] = useState();
  const [mappedOptions, setMappedOptions] = useState([]);
  const [mappedSelected, setMappedSelected] = useState([]);
  const textOnError =
    errorText || intl.formatMessage({ id: "input_error_text" });
  const and = intl.formatMessage({ id: "and_string" });
  const nothingSelectedLabel =
    noSelectedString ||
    intl.formatMessage({ id: "multi_dropdown_no_selected" });
  /**
   * Handle errors.
   */
  useEffect(() => {
    setError(errors && errors.includes(name));
  }, [errors]);

  /**
   * Map data to fit component.
   */
  useEffect(() => {
    const localMappedOptions = options.map((item) => {
      return {
        label: item.name,
        value: item.id,
        disabled: false,
      };
    });
    setMappedOptions(localMappedOptions);

    const localMappedSelected = selected.map((item) => {
      return {
        label: item.name,
        value: item.id,
        disabled: false,
      };
    });
    setMappedSelected(localMappedSelected);
  }, [selected]);

  /**
   * Filter to replace the default filter in multi-select.
   * It matches the label name.
   *
   * @param {Array} optionsToFilter
   * The options to filter in
   * @param {string} filter
   * The string to filter by
   * @returns {Array}
   * Array of matching values
   */
  function filterOptions(optionsToFilter, filter) {
    if (!filter) {
      return optionsToFilter;
    }
    const re = new RegExp(filter, "i");
    return optionsToFilter.filter(
      ({ label: shadowLabel }) => shadowLabel && shadowLabel.match(re)
    );
  }
  /**
   * A callback on changed data.
   *
   * @param {Array} data
   * The data to call back with
   */
  function changeData(data) {
    const ids = data.map((a) => a.value);
    const dataToReturn = options.filter((option) => ids.includes(option.id));
    const target = { value: dataToReturn, id: name };
    handleSelection({ target });
  }

  /**
   * Renders the label in the multiselect.
   *
   * @param {Array} valueSelected
   * The value(s) selected to render label from.
   * @returns {string}
   * The string to use as a label
   */
  function customValueRenderer(valueSelected) {
    return valueSelected.length
      ? contentString(valueSelected, and)
      : nothingSelectedLabel;
  }

  return (
    <>
      {mappedOptions.length > 0 && (
        <div className={error ? "invalid" : ""}>
          <label htmlFor={name}>{label}</label>
          <MultiSelect
            isCreatable={isCreatable}
            options={mappedOptions}
            value={mappedSelected}
            filterOptions={filterOptions}
            onChange={changeData}
            id={name}
            className={error ? "invalid" : ""}
            isLoading={isLoading}
            valueRenderer={customValueRenderer}
          />
          {error && <div className="invalid-feedback-multi">{textOnError}</div>}
        </div>
      )}
    </>
  );
}

MultiSelectComponent.defaultProps = {
  isCreatable: false,
  noSelectedString: null,
  isLoading: false,
  errors: [],
  errorText: "",
};

MultiSelectComponent.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number,
      label: PropTypes.string,
      disabled: PropTypes.bool,
    })
  ).isRequired,
  handleSelection: PropTypes.func.isRequired,
  selected: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number,
      label: PropTypes.string,
      disabled: PropTypes.bool,
    })
  ).isRequired,
  isCreatable: PropTypes.bool,
  noSelectedString: PropTypes.string,
  name: PropTypes.string.isRequired,
  isLoading: PropTypes.bool,
  errors: PropTypes.arrayOf(PropTypes.string),
  errorText: PropTypes.string,
  label: PropTypes.string.isRequired,
};

export default MultiSelectComponent;
