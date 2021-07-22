import React, { useState, useEffect } from "react";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";
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
 * @returns {object}
 * The multidropdown of groups.
 */
function GroupsDropdown({ handleGroupsSelection, selected, name, errors }) {
  const intl = useIntl();
  const [options, setOptions] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const noSelectedGroups = intl.formatMessage({
    id: "groups_dropdown_no_selected",
  });
  const groupsLabel = intl.formatMessage({
    id: "groups_dropdown_label",
  });
  /**
   * Load content from fixture.
   */
  useEffect(() => {
    // @TODO load real content.
    fetch("/fixtures/groups/groups.json")
      .then((response) => response.json())
      .then((jsonData) => {
        const mappedArray = jsonData.groups.map((item) => {
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
          <MultiSelectComponent
            errors={errors}
            handleSelection={handleGroupsSelection}
            options={options}
            label={groupsLabel}
            selected={selected}
            name={name}
            isLoading={isLoading}
            noSelectedString={noSelectedGroups}
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

export default GroupsDropdown;
