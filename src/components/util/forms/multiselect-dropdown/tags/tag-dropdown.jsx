import React, { useState, useEffect } from "react";
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
 * @returns {object}
 * The multidropdown of playlists.
 */
function TagDropdown({ handleTagSelection, selected, name, errors }) {
  const [options, setOptions] = useState();

  /**
   * Load content from fixture.
   */
  useEffect(() => {
    // @TODO load real content.
    fetch(`/fixtures/tags/tags.json`)
      .then((response) => response.json())
      .then((jsonData) => {
        const mappedArray = jsonData.tags.map((item) => {
          return {
            label: item.name,
            value: item.id,
            disabled: false,
          };
        });
        setOptions(mappedArray);
      });
  }, []);

  return (
    <>
      {options && (
        <MultiSelectComponent
          handleTagSelection={handleTagSelection}
          options={options}
          selected={selected}
          isCreatable
          name={name}
          errors={errors}
        />
      )}
    </>
  );
}

TagDropdown.propTypes = {
  handleTagSelection: PropTypes.func.isRequired,
  selected: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.number,
      disabled: PropTypes.bool,
    })
  ).isRequired,
};

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
