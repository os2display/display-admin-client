import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import MultiSelectComponent from "../multi-dropdown";

/**
 * @param {object} props
 * the props.
 * @param {Function} props.handleGroupsSelection
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
 * The multidropdown of groups.
 */
function GroupsDropdown({
  handleGroupsSelection,
  selected,
  name,
  errors,
  data,
}) {
  const { t } = useTranslation("common");

  return (
    <>
      {data && (
        <>
          <MultiSelectComponent
            errors={errors}
            handleSelection={handleGroupsSelection}
            options={data}
            label={t("groups-dropdown.label")}
            selected={selected}
            name={name}
            noSelectedString={t("groups-dropdown.nothing-selected")}
          />
        </>
      )}
    </>
  );
}

GroupsDropdown.defaultProps = {
  errors: null,
  isCreatable: false,
};

GroupsDropdown.propTypes = {
  handleGroupsSelection: PropTypes.func.isRequired,
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

export default GroupsDropdown;
