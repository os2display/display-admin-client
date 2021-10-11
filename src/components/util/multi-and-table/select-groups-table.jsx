import { React, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Table from "../table/table";
import {
  useGetV1ScreenGroupsQuery,
  useGetV1ScreensByIdScreenGroupsQuery,
} from "../../../redux/api/api.generated";
import GroupsDropdown from "../forms/multiselect-dropdown/groups/groups-dropdown";
/**
 * A multiselect and table for groups.
 *
 * @param {string} props
 * the props.
 * @param {string} props.name
 * The name for the input
 * @returns {object}
 * An input.
 */
function SelectGroupsTable({ handleChange, name, groupId }) {
  const { t } = useTranslation("common");
  const [selectedData, setSelectedData] = useState();
  const { data: groups } = useGetV1ScreenGroupsQuery({});

  const {
    data,
    error: loadSelectedGroupsError,
    isLoading: isLoadingSelectedGroups,
  } = useGetV1ScreensByIdScreenGroupsQuery({
    id: groupId,
  });

  /**
   * Map loaded data.
   */
  useEffect(() => {
    if (data) {
      setSelectedData(data["hydra:member"]);
    }
  }, [data]);

  /**
   * Adds group to list of groups.
   *
   * @param {object} props - the props.
   * @param {object} props.target - the target.
   */
  function handleAdd({ target }) {
    const { value, id } = target;
    setSelectedData(value);
    handleChange({
      target: { id, value: value.map((item) => item["@id"]) },
    });
  }

  /**
   * Removes playlist from list of groups.
   *
   * @param {object} removeItem
   * The item to remove.
   */
  function removeFromList(removeItem) {
    const indexOfItemToRemove = selectedData
      .map((item) => {
        return item["@id"];
      })
      .indexOf(removeItem["@id"]);
    const selectedDataCopy = [...selectedData];
    selectedDataCopy.splice(indexOfItemToRemove, 1);
    setSelectedData(selectedDataCopy);

    const target = {
      value: selectedDataCopy.map((item) => item["@id"]),
      id: name,
    };
    handleChange({ target });
  }

  // The columns for the table.
  const columns = [
    {
      path: "title",
      label: t("select-groups-table.columns.name"),
    },
    {
      key: "delete",
      content: (screenData) => (
        <Button variant="danger" onClick={() => removeFromList(screenData)}>
          {t("select-groups-table.remove-from-list")}
        </Button>
      ),
    },
  ];
  return (
    <>
      {groups && groups["hydra:member"] && (
        <>
          <GroupsDropdown
            name={name}
            data={groups["hydra:member"]}
            handleGroupsSelection={handleAdd}
            selected={selectedData}
          />
          {selectedData?.length > 0 && (
            <Table columns={columns} data={selectedData} />
          )}
        </>
      )}
    </>
  );
}

SelectGroupsTable.propTypes = {
  name: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  selectedGroups: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default SelectGroupsTable;
