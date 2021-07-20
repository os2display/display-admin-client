import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import MultiSelectComponent from "../multi-dropdown";

const TagDropdown = ({ handleTagSelection, selected }) => {
  const [options, setOptions] = useState();

  /**
   * Load content from fixture.
   */
  useEffect(() => {
    // @TODO load real content.
    fetch(`${process.env.REACT_APP_API_PROXY}/fixtures/tags/tags.json`)
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
        <>
          <MultiSelectComponent
            handleTagSelection={handleTagSelection}
            options={options}
            selected={selected}
          />
        </>
      )}
    </>
  );
};

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

export default TagDropdown;
