import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import MultiSelectComponent from "../multi-dropdown";

const LocationDropdown = ({ handleLocationSelection, selected }) => {
  const [options, setOptions] = useState();

  /**
   * Load content from fixture.
   */
  useEffect(() => {
    // @TODO load real content.
    fetch("http://localhost:3000/fixtures/locations/locations.json")
      .then((response) => response.json())
      .then((jsonData) => {
        const mappedArray = jsonData.locations.map((item) => {
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
            handleLocationSelection={handleLocationSelection}
            options={options}
            selected={selected}
          />
        </>
      )}
    </>
  );
};

LocationDropdown.propTypes = {
  handleLocationSelection: PropTypes.func.isRequired,
  selected: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.number,
      disabled: PropTypes.bool,
    })
  ).isRequired,
};

export default LocationDropdown;
