import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import MultiSelectComponent from "../multi-dropdown";
import { useGetV1SlidesQuery } from "../../../../../redux/api/api.generated";
/**
 * @param {object} props
 * the props.
 * @param {Function} props.handleSlideSelection
 * The callback when an option is selected
 * @param {Array} props.selected
 * The selected options
 * @param {string} props.name
 * The id of the form element
 * @param {Array} props.errors
 * A list of errors, or null.
 * @param props.data
 * @returns {object}
 * The multidropdown of playlists.
 */
function SlidesDropdown({
  handleSlideSelection,
  selected,
  name,
  errors,
  data,
}) {
  const { t } = useTranslation("common");

  return (
    <MultiSelectComponent
      handleSelection={handleSlideSelection}
      options={data}
      label={t("slides-dropdown.label")}
      noSelectedString={t("slides-dropdown.nothing-selected")}
      selected={selected}
      name={name}
      errors={errors}
    />
  );
}

SlidesDropdown.defaultProps = {
  errors: null,
  selected: [],
};

SlidesDropdown.propTypes = {
  handleSlideSelection: PropTypes.func.isRequired,
  selected: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number,
      label: PropTypes.string,
      disabled: PropTypes.bool,
    })
  ),
  name: PropTypes.string.isRequired,
  errors: PropTypes.arrayOf(PropTypes.string),
};

export default SlidesDropdown;
