import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import MultiSelectComponent from "../multi-dropdown";
/**
 * @param {object} props - The props.
 * @param {Function} props.handleSlideSelection - The callback when an option is selected
 * @param {Array} props.selected - The selected options
 * @param {string} props.name - The id of the form element
 * @param {Array} props.errors - A list of errors, or null.
 * @param {object} props.data - The data for the slides dropdown.
 * @param {Function} props.filterCallback - The callback on search filter.
 * @returns {object} - The multidropdown of playlists.
 */
function SlidesDropdown({
  handleSlideSelection,
  name,
  data,
  filterCallback,
  errors = null,
  selected = [],
}) {
  const { t } = useTranslation("common");

  return (
    <MultiSelectComponent
      handleSelection={handleSlideSelection}
      options={data}
      helpText={t("slides-dropdown.search-to-se-possible-selections")}
      label={t("slides-dropdown.label")}
      noSelectedString={t("slides-dropdown.nothing-selected")}
      selected={selected}
      name={name}
      errors={errors}
      filterCallback={filterCallback}
    />
  );
}

SlidesDropdown.propTypes = {
  handleSlideSelection: PropTypes.func.isRequired,
  filterCallback: PropTypes.func.isRequired,
  selected: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number,
      label: PropTypes.string,
      disabled: PropTypes.bool,
    })
  ),
  name: PropTypes.string.isRequired,
  errors: PropTypes.arrayOf(PropTypes.string),
  data: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
    })
  ).isRequired,
};

export default SlidesDropdown;
