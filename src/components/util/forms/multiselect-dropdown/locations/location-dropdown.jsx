import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
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
 * @param {boolean} props.isCreatable
 * Whether it is possible to create in the multi dropdown.
 * @returns {object}
 * The multidropdown of locations.
 */
function LocationDropdown({
  handleLocationSelection,
  selected,
  name,
  errors,
  isCreatable,
}) {
  const { t } = useTranslation("common");
  const [options, setOptions] = useState();
  const [isLoading, setIsLoading] = useState(true);

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
            label={t("locations-dropdown.label")}
            noSelectedString={t("locations-dropdown.nothing-selected")}
            name={name}
            errors={errors}
            isLoading={isLoading}
            isCreatable={isCreatable}
          />
        </>
      )}
    </>
  );
}

LocationDropdown.defaultProps = {
  errors: null,
  isCreatable: false,
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
  isCreatable: PropTypes.bool,
};

export default LocationDropdown;
