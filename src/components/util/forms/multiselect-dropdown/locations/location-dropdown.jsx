import React, { useState, useEffect } from "react";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";
import MultiSelectComponent from "../multi-dropdown";

/**
 * @param {object} props
 * the props.
 * @param {Function} props.handleLocationSelection
 * The callback when an option is selected
 * @param {Array} props.selected
 * The selected options
 * @param {string} props.name
 * The id of the form element
 * @param {Array} props.errors
 * A list of errors, or null.
 * @returns {object}
 * The multidropdown of locations.
 */
function LocationDropdown({ handleLocationSelection, selected, name, errors }) {
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
    fetch("/fixtures/locations/locations.json")
      .then((response) => response.json())
      .then((jsonData) => {
        setOptions(jsonData.locations);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      {options && (
        <>
          <MultiSelectComponent
            handleSelection={handleLocationSelection}
            options={options}
            selected={selected}
            label={locationsLabel}
            name={name}
            errors={errors}
            isLoading={isLoading}
            noSelectedString={noSelectedLocations}
          />
        </>
      )}
    </>
  );
}

LocationDropdown.defaultProps = {
  errors: null,
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
  name: PropTypes.string.isRequired,
  errors: PropTypes.arrayOf(PropTypes.string),
};

export default LocationDropdown;
