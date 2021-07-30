import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import MultiSelectComponent from "../multi-dropdown";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation("common");
  const [options, setOptions] = useState();
  const [isLoading, setIsLoading] = useState(true);

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
          label={t("screens-dropdown.label")}
          noSelectedString={t("screens-dropdown.nothing-selected")}
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
