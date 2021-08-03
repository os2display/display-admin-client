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
 * @param {string} props.label
 * The label of the dropdown.
 * @param {string} props.helpText
 * The help text.
 * @returns {object}
 * The multidropdown of playlists.
 */
function TagDropdown({
  handleTagSelection,
  selected,
  name,
  errors,
  label,
  helpText,
}) {
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
          helpText={helpText}
        />
      )}
    </>
  );
}

TagDropdown.defaultProps = {
  errors: null,
  helpText: null,
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
  label: PropTypes.string.isRequired,
  helpText: PropTypes.string,
};

export default TagDropdown;
