import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import MultiSelectComponent from "../multi-dropdown";
import { useGetV1ScreensQuery } from "../../../../../redux/api/api.generated";

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
  const [selectedOptions, setSelectedOptions] = useState([
    { title: t("screens-dropdown.no-screens-configured"), id: 1 },
  ]);
  const { data, isLoading } = useGetV1ScreensQuery({ page: 1 });
  /**
   * Load content from fixture.
   */
  useEffect(() => {
    if (data) {
      setOptions(data["hydra:member"]);
      setSelectedOptions(selected);
    }
  }, [data]);

  return (
    <MultiSelectComponent
      isLoading={isLoading}
      handleSelection={handleScreenSelection}
      options={options}
      label={t("screens-dropdown.label")}
      noSelectedString={t("screens-dropdown.nothing-selected")}
      selected={selectedOptions}
      name={name}
      isCreatable
      errors={errors}
    />
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
