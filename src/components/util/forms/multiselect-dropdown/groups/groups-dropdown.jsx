import React, { useState, useEffect } from "react";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";
import MultiSelectComponent from "../multi-dropdown";

const GroupsDropdown = ({ handleGroupsSelection, selected, formId }) => {
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
    fetch("http://localhost:3000/fixtures/groups/groups.json")
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
          <label>{groupsLabel}</label>
          <MultiSelectComponent
            handleSelection={handleGroupsSelection}
            options={options}
            selected={selected}
            formId={formId}
            isLoading={isLoading}
            noSelectedString={noSelectedGroups}
          />
        </>
      )}
    </>
  );
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
};

export default GroupsDropdown;
