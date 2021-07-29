import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import MultiSelectComponent from "../multi-dropdown";
/**
 * @param {object} props
 * the props.
 * @param {Function} props.handleTagSelection
 * The callback when an option is selected
 * @param {Array} props.selected
 * The selected options
 * @param {string} props.name
 * The id of the form element
 * @param {Array} props.errors
 * A list of errors, or null.
 * @param props.label
 * @returns {object}
 * The multidropdown of playlists.
 */
function TagDropdown({ handleTagSelection, selected, name, errors, label }) {
  const [options, setOptions] = useState();
  /**
   * Load content from fixture.
   */
  useEffect(() => {
    // @TODO load real content.
    fetch(`/fixtures/tags/tags.json`)
      .then((response) => response.json())
      .then((jsonData) => {
        setOptions(jsonData.tags);
      });
  }, []);

  return (
    <>
      {options && (
        <MultiSelectComponent
          handleSelection={handleTagSelection}
          options={options}
          selected={selected}
          isCreatable
          name={name}
          label={label}
          errors={errors}
        />
      )}
    </>
  );
}

TagDropdown.defaultProps = {
  errors: null,
};

TagDropdown.propTypes = {
  handleTagSelection: PropTypes.func.isRequired,
  selected: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number,
      label: PropTypes.string,
      disabled: PropTypes.bool,
    })
  ).isRequired,
  name: PropTypes.string.isRequired,
  errors: PropTypes.arrayOf(PropTypes.string),
};

export default TagDropdown;
