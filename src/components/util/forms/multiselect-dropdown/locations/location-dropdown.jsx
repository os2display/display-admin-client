import React, { useState, useEffect } from "react";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";
import MultiSelectComponent from "../multi-dropdown";

const LocationDropdown = ({ handleLocationSelection, selected, formId }) => {
  const intl = useIntl();
  const [options, setOptions] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const noSelectedLocations = intl.formatMessage({
    id: "locations_dropdown_no_selected",
  });
  const locationsLabel = intl.formatMessage({
    id: "locations_dropdown_label",
  });
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
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      {options && (
        <>
          <label htmlFor={formId}>{locationsLabel}</label>
          <MultiSelectComponent
            handleSelection={handleLocationSelection}
            options={options}
            selected={selected}
            formId={formId}
            isLoading={isLoading}
            noSelectedString={noSelectedLocations}
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
  formId: PropTypes.string.isRequired,
};

export default LocationDropdown;
