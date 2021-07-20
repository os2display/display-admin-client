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
 * @param {Boolean} props.isCreatable
 * Whether the multi dropdown can create new options.
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
  noSelectedString =
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

  function changeData(data) {
    let target = { value: data, id: formId };
    target.setCustomValidity = function () {
      console.log("validate");
    };
    handleSelection({ target: target });
  }

  const customValueRenderer = (selected, _options) => {
    return selected.length ? contentString(selected) : noSelectedString;
  };

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
};

MultiSelectComponent.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.number,
      disabled: PropTypes.bool,
    })
  ).isRequired,
  handleSelection: PropTypes.func.isRequired,
  selected: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.number,
      disabled: PropTypes.bool,
    })
  ).isRequired,
  isCreatable: PropTypes.bool,
  noSelectedString: PropTypes.string,
};

export default MultiSelectComponent;
