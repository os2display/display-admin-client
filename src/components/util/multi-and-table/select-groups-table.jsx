import { React, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import Table from "../table/table";
import { SelectGroupColumns } from "../../groups/groups-columns";
import {
  useGetV1ScreenGroupsQuery,
  useGetV1ScreenGroupsByIdScreensQuery,
} from "../../../redux/api/api.generated";
import GroupsDropdown from "../forms/multiselect-dropdown/groups/groups-dropdown";

/**
 * A multiselect and table for groups.
 *
 * @param {string} props The props.
 * @param {string} props.name The name for the input
 * @param {string} props.id The id used for the get.
 * @param {string} props.getSelectedMethod Method that gets selected for dropdown
 * @returns {object} Select groups table.
 */
function SelectGroupsTable({ handleChange, name, id, getSelectedMethod }) {
  const { t } = useTranslation("common", { keyPrefix: "select-groups-table" });
  const [selectedData, setSelectedData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const { data: groups } = useGetV1ScreenGroupsQuery({
    title: searchText,
    itemsPerPage: 100,
    orderBy: "createdAt",
    order: "asc",
  });
  const { data } = getSelectedMethod({
    id,
  });

  /** Map loaded data. */
  useEffect(() => {
    if (data) {
      setSelectedData(data["hydra:member"]);
    }
  }, [data]);

  /**
   * Adds group to list of groups.
   *
   * @param {object} props - The props.
   * @param {object} props.target - The target.
   */
  function handleAdd({ target }) {
    const { value, id: localId } = target;
    setSelectedData(value);
    handleChange({
      target: { id: localId, value: value.map((item) => item["@id"]) },
    });
  }

  /**
   * Fetches data for the multi component
   *
   * @param {string} filter - The filter.
   */
  function onFilter(filter) {
    setSearchText(filter);
  }

  /**
   * Removes playlist from list of groups.
   *
   * @param {object} removeItem The item to remove.
   */
  function removeFromList(removeItem) {
    const indexOfItemToRemove = selectedData
      .map((item) => {
        return item["@id"];
      })
      .indexOf(removeItem);
    const selectedDataCopy = [...selectedData];
    selectedDataCopy.splice(indexOfItemToRemove, 1);
    setSelectedData(selectedDataCopy);

    const target = {
      value: selectedDataCopy.map((item) => item["@id"]),
      id: name,
    };
    handleChange({ target });
  }
  const columns = SelectGroupColumns({
    handleDelete: removeFromList,
    apiCall: useGetV1ScreenGroupsByIdScreensQuery,
    editTarget: "group",
    infoModalRedirect: "/screen/edit",
    infoModalTitle: t("info-modal.screens"),
  });

  return (
    <>
      {groups && groups["hydra:member"] && (
        <>
          <GroupsDropdown
            name={name}
            data={groups["hydra:member"]}
            handleGroupsSelection={handleAdd}
            selected={selectedData}
            filterCallback={onFilter}
          />
          {selectedData.length > 0 && (
            <>
              <Table columns={columns} data={selectedData} />
              <small>{t("edit-groups-help-text")}</small>
            </>
          )}
        </>
      )}
    </>
  );
}

SelectGroupsTable.defaultProps = {
  id: "",
};

SelectGroupsTable.propTypes = {
  name: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  id: PropTypes.string,
  getSelectedMethod: PropTypes.func.isRequired,
};

export default SelectGroupsTable;
