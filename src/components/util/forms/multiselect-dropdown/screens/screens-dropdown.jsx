import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import MultiSelectComponent from "../multi-dropdown";

/**
 * @param {object} props - The props.
 * @param {Function} props.handleScreenSelection - The callback when an option is selected
 * @param {Array} props.selected - The selected options
 * @param {string} props.name - The id of the form element
 * @param {Array} props.errors - A list of errors, or null.
 * @param {Array} props.data - The data for options.
 * @param {Function} props.filterCallback - The callback on search filter.
 * @returns {object} - The multidropdown of playlists.
 */
function ScreensDropdown({
  handleScreenSelection,
  errors = null,
  selected = [],
  name,
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
            helpText={t("screens-dropdown.search-to-se-possible-selections")}
            errors={errors}
            filterCallback={filterCallback}
          />
        </>
      )}
    </>
  );
}

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
  data: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
    })
  ).isRequired,
  name: PropTypes.string.isRequired,
  errors: PropTypes.arrayOf(PropTypes.string),
};

export default ScreensDropdown;
