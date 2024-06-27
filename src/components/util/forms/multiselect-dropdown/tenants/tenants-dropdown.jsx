import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import MultiSelectComponent from "../multi-dropdown";
/**
 * @param {object} props - The props.
 * @param {Function} props.handleTenantSelection - The callback when an option is selected
 * @param {Array} props.selected - The selected options
 * @param {string} props.name - The id of the form element
 * @param {Array} props.errors - A list of errors, or null.
 * @param {object} props.data - The data for the slides dropdown.
 * @returns {object} - The multidropdown of playlists.
 */
function TenantsDropdown({
  handleTenantSelection,
  selected = [],
  name,
  errors = null,
  data,
}) {
  const { t } = useTranslation("common");

  return (
    <MultiSelectComponent
      handleSelection={handleTenantSelection}
      options={data}
      disableSearch
      label={t("tenants-dropdown.label")}
      noSelectedString={t("tenants-dropdown.nothing-selected")}
      selected={selected}
      name={name}
      errors={errors}
    />
  );
}

TenantsDropdown.propTypes = {
  handleTenantSelection: PropTypes.func.isRequired,
  selected: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number,
      label: PropTypes.string,
      disabled: PropTypes.bool,
    })
  ),
  name: PropTypes.string.isRequired,
  errors: PropTypes.arrayOf(PropTypes.string),
  data: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
    })
  ).isRequired,
};

export default TenantsDropdown;
