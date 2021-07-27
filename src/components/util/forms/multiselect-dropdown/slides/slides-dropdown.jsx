import React, { useState, useEffect } from "react";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";
import MultiSelectComponent from "../multi-dropdown";
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
 * @returns {object}
 * The multidropdown of playlists.
 */
function SlidesDropdown({ handleSlideSelection, selected, name, errors }) {
  const [options, setOptions] = useState();
  const intl = useIntl();
  const [isLoading, setIsLoading] = useState(true);
  const slidesLabel = intl.formatMessage({
    id: "slides_dropdown_label",
  });

  /**
   * Load content from fixture.
   */
  useEffect(() => {
    // @TODO load real content.
    fetch(`/fixtures/slides/slides.json`)
      .then((response) => response.json())
      .then((jsonData) => {
        setOptions(jsonData.slides);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      {options && (
        <MultiSelectComponent
          isLoading={isLoading}
          handleSelection={handleSlideSelection}
          options={options}
          label={slidesLabel}
          selected={selected}
          name={name}
          errors={errors}
        />
      )}
    </>
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
