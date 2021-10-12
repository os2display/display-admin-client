import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import MultiSelectComponent from "../multi-dropdown";

/**
 * @param {object} props - the props.
 * @param {Function} props.handleGroupsSelection - the callback when an option is selected
 * @param {Function} props.filterCallback - the callback for search in the multicomponent
 * @param {Array} props.selected - the selected options
 * @param {string} props.name - the id of the form element
 * @param {Array} props.errors - a list of errors, or null.
 * @param {Array} props.data - the data for options.
 * @returns {object} - the multidropdown of groups.
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
