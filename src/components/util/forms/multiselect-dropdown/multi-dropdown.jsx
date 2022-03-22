import { React, useEffect, useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import { useTranslation } from "react-i18next";
import contentString from "../../helpers/content-string";
import "./multi-dropdown.scss";

/**
 * A searchable multiselect component. Using a multiselect from
 * react-multi-select-component, and making some adjustments, replacing default
 * fuzzy search with string match and displaying the values selected using
 * contentstring-method.
 *
 * @param {object} props - The props.
 * @param {Array} props.options - The option for the searchable dropdown.
 * @param {Function} props.handleSelection - The callback when an option is selected
 * @param {Array} props.selected - The selected options
 * @param {string} props.name - The id of the form element
 * @param {boolean} props.isLoading - Whether the component is loading.
 * @param {string} props.noSelectedString - The label for when there is nothing selected.
 * @param {string} props.errorText - The string to display on error.
 * @param {string} props.label - The input label
 * @param {string} props.helpText - Help text for the dropdown.
 * @param {Function} props.filterCallback - The callback on search filter.
 * @param {boolean} props.singleSelect - If the dropdown is single select.
 * @param {boolean} props.disableSearch - Disable search option.
 * @returns {object} - The multidropdown
 */
function MultiSelectComponent({
  options,
  handleSelection,
  selected,
  name,
  isLoading,
  noSelectedString,
  errorText,
  label,
  helpText,
  filterCallback,
  singleSelect,
  disableSearch,
}) {
  const { t } = useTranslation("common");
  const [error] = useState();
  const [mappedOptions, setMappedOptions] = useState();
  const [mappedSelected, setMappedSelected] = useState();
  const textOnError = errorText || t("multi-dropdown.validation-text");
  const nothingSelectedLabel =
    noSelectedString || t("multi-dropdown.nothing-selected");

  /** Map data to fit component. */
  useEffect(() => {
    const localMappedOptions =
      options?.map((item) => {
        return {
          label: item.title || item.tenantKey,
          value: item["@id"] || item.id,
          disabled: false,
        };
      }) ?? [];
    let localMappedSelected = [];

    if (selected.length > 0) {
      localMappedSelected = selected.map((item) => {
        return {
          label: item.title || item.tenantKey,
          value: item["@id"] || item.id,
          disabled: false,
        };
      });
    }

    const optionsWithSelected = Object.values(
      [...localMappedOptions, ...localMappedSelected].reduce((a, c) => {
        const aCopy = { ...a };
        aCopy[c.value] = c;
        return aCopy;
      }, {})
    );
    setMappedOptions(optionsWithSelected);

    setMappedSelected(localMappedSelected);
  }, [selected, selected.length, options]);

  /**
   * Filter to replace the default filter in multi-select. It matches the label name.
   *
   * @param {Array} optionsToFilter The options to filter in
   * @param {string} filter The string to filter by
   * @returns {Array} Array of matching values
   */
  function filterOptions(optionsToFilter, filter) {
    if (!filter) {
      return optionsToFilter;
    }

    filterCallback(filter);

    return optionsToFilter.filter(
      ({ label: shadowLabel }) =>
        shadowLabel && shadowLabel.match(new RegExp(filter, "i"))
    );
  }

  /**
   * A callback on changed data.
   *
   * @param {Array} data The data to call back with
   */
  function changeData(data) {
    let selectedOptions = [];

    if (data.length > 0) {
      const ids = data.map(({ value }) => value);

      selectedOptions = Object.values(
        [...selected, ...options]
          .filter((option) => ids.includes(option["@id"]))
          .reduce((a, c) => {
            const aCopy = { ...a };
            aCopy[c["@id"]] = c;
            return aCopy;
          }, {})
      );

      if (singleSelect) {
        selectedOptions = [selectedOptions[selectedOptions.length - 1]];
      }
    }

    const target = { value: selectedOptions, id: name };
    handleSelection({ target });
  }

  /**
   * Renders the label in the multiselect.
   *
   * @param {Array} valueSelected The value(s) selected to render label from.
   * @returns {string} The string to use as a label
   */
  function customValueRenderer(valueSelected) {
    return valueSelected.length
      ? contentString(valueSelected, t("multi-dropdown.and-string"))
      : nothingSelectedLabel;
  }

  return (
    <>
      {mappedOptions && mappedSelected && (
        <div className={`mb-3 ${error ? "invalid" : ""}`}>
          <Form.Label htmlFor={name}>{label}</Form.Label>
          <MultiSelect
            isCreatable={false}
            options={mappedOptions}
            value={mappedSelected}
            hasSelectAll={false}
            disableSearch={disableSearch}
            filterOptions={filterOptions}
            onChange={changeData}
            id={name}
            className={`${error ? "invalid" : ""} ${
              singleSelect ? "single-select" : ""
            }`}
            isLoading={isLoading}
            valueRenderer={customValueRenderer}
            labelledBy={name}
          />
          {error && <div className="invalid-feedback-multi">{textOnError}</div>}
          {helpText && <small>{helpText}</small>}
        </div>
      )}
    </>
  );
}

MultiSelectComponent.defaultProps = {
  noSelectedString: null,
  isLoading: false,
  errorText: "",
  helpText: null,
  selected: [],
  options: [],
  singleSelect: false,
  disableSearch: false,
  filterCallback: () => {},
};

MultiSelectComponent.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      label: PropTypes.string,
      disabled: PropTypes.bool,
    })
  ),
  handleSelection: PropTypes.func.isRequired,
  selected: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      label: PropTypes.string,
      disabled: PropTypes.bool,
    })
  ),
  filterCallback: PropTypes.func,
  noSelectedString: PropTypes.string,
  name: PropTypes.string.isRequired,
  isLoading: PropTypes.bool,
  errorText: PropTypes.string,
  label: PropTypes.string.isRequired,
  helpText: PropTypes.string,
  singleSelect: PropTypes.bool,
  disableSearch: PropTypes.bool,
};

export default MultiSelectComponent;
