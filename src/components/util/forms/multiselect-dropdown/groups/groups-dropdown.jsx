import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import MultiSelectComponent from "../multi-dropdown";

/**
 * @param {object} props - The props.
 * @param {Function} props.handleGroupsSelection - The callback when an option is selected
 * @param {Function} props.filterCallback - The callback for search in the multicomponent
 * @param {Array} props.selected - The selected options
 * @param {string} props.name - The id of the form element
 * @param {Array} props.errors - A list of errors, or null.
 * @param {Array} props.data - The data for options.
 * @returns {object} - The multidropdown of groups.
 */
function GroupsDropdown({
  handleGroupsSelection,
  selected,
  name,
  errors,
  data,
  filterCallback,
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
            filterCallback={filterCallback}
            noSelectedString={t("groups-dropdown.nothing-selected")}
          />
        </>
      )}
    </>
  );
}

GroupsDropdown.defaultProps = {
  errors: null,
};

GroupsDropdown.propTypes = {
  handleGroupsSelection: PropTypes.func.isRequired,
  filterCallback: PropTypes.func.isRequired,
  selected: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.number,
      disabled: PropTypes.bool,
    })
  ).isRequired,
  name: PropTypes.string.isRequired,
  errors: PropTypes.arrayOf(PropTypes.string),
  data: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default GroupsDropdown;
