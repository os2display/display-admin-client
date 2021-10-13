import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import MultiSelectComponent from "../multi-dropdown";

/**
 * @param {object} props - the props.
 * @param {Function} props.handleScreenSelection - the callback when an option is selected
 * @param {Array} props.selected - the selected options
 * @param {string} props.name - the id of the form element
 * @param {Array} props.errors - a list of errors, or null.
 * @param {Array} props.data - the data for options.
 * @param {Function} props.filterCallback - the callback on search filter.
 * @returns {object} - the multidropdown of playlists.
 */
function ScreensDropdown({
  handleScreenSelection,
  selected,
  name,
  errors,
  data,
  filterCallback,
}) {
  const { t } = useTranslation("common");

  return (
    <>
      {data && (
        <>
          <MultiSelectComponent
            handleSelection={handleScreenSelection}
            options={data}
            label={t("screens-dropdown.label")}
            noSelectedString={t("screens-dropdown.nothing-selected")}
            selected={selected}
            name={name}
            errors={errors}
            filterCallback={filterCallback}
          />
        </>
      )}
    </>
  );
}

ScreensDropdown.defaultProps = {
  errors: null,
  selected: [],
};

ScreensDropdown.propTypes = {
  handleScreenSelection: PropTypes.func.isRequired,
  selected: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number,
      label: PropTypes.string,
      disabled: PropTypes.bool,
    })
  ),
  filterCallback: PropTypes.func.isRequired,
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  name: PropTypes.string.isRequired,
  errors: PropTypes.arrayOf(PropTypes.string),
};

export default ScreensDropdown;
