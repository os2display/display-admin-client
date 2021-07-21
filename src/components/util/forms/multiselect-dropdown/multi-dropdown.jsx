import React from "react";
import { useIntl } from "react-intl";
import MultiSelect from "react-multi-select-component";
import PropTypes from "prop-types";
import contentString from "../../helpers/contentString";

/**
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
 * @param {string} props.formId
 * The id of the form element
 * @param {boolean} props.isLoading
 * Whether the component is loading.
 * @param {string} props.noSelectedString
 * The label for when there is nothing selected.
 * @returns {object}
 * The multidropdown
 */
function MultiSelectComponent({
  options,
  handleSelection,
  selected,
  isCreatable,
  formId,
  isLoading,
  noSelectedString,
}) {
  const intl = useIntl();
  const nothingSelectedLabel =
    noSelectedString ||
    intl.formatMessage({ id: "multi_dropdown_no_selected" });
  /**
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
    return optionsToFilter.filter(({ label }) => label && label.match(re));
  }

  /**
   * @param {Array} data
   * The data to callback with
   */
  function changeData(data) {
    const target = { value: data, id: formId };
    handleSelection({ target });
  }

  /**
   * @param {Array} valueSelected
   * The value(s) selected to render label from.
   * @returns {string}
   * The string to use as a label
   */
  function customValueRenderer(valueSelected) {
    return valueSelected.length
      ? contentString(valueSelected)
      : nothingSelectedLabel;
  }
  return (
    <MultiSelect
      isCreatable={isCreatable}
      options={options}
      value={selected}
      filterOptions={filterOptions}
      onChange={changeData}
      id={formId}
      isLoading={isLoading}
      valueRenderer={customValueRenderer}
    />
  );
}

MultiSelectComponent.defaultProps = {
  isCreatable: false,
  noSelectedString: null,
  isLoading: false,
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
  formId: PropTypes.string.isRequired,
  isLoading: PropTypes.bool,
};

export default MultiSelectComponent;
