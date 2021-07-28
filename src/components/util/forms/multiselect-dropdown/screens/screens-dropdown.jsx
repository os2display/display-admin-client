import React, { useState, useEffect } from "react";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";
import MultiSelectComponent from "../multi-dropdown";

/**
 * @param {object} props
 * the props.
 * @param {Function} props.handleScreenSelection
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
function ScreensDropdown({ handleScreenSelection, selected, name, errors }) {
  const [options, setOptions] = useState();
  const intl = useIntl();
  const [isLoading, setIsLoading] = useState(true);
  const screensLabel = intl.formatMessage({
    id: "screens_dropdown_label",
  });

  /**
   * Load content from fixture.
   */
  useEffect(() => {
    // @TODO load real content.
    fetch(`/fixtures/screens/screens.json`)
      .then((response) => response.json())
      .then((jsonData) => {
        setOptions(jsonData.screens);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      {options && (
        <MultiSelectComponent
          isLoading={isLoading}
          handleSelection={handleScreenSelection}
          options={options}
          label={screensLabel}
          selected={selected}
          isCreatable
          name={name}
          errors={errors}
        />
      )}
    </>
  );
}

ScreensDropdown.defaultProps = {
  errors: null,
  selected: [],
};

ScreensDropdown.propTypes = {
  handleScreenSelection: PropTypes.func.isRequired,
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

export default ScreensDropdown;
