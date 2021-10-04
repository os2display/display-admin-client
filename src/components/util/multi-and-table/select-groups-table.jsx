import { React, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Table from "../table/table";
import { useGetV1ScreenGroupsQuery } from "../../../redux/api/api.generated";
import GroupsDropdown from "../forms/multiselect-dropdown/groups/groups-dropdown";
/**
 * A multiselect and table for groups.
 *
 * @param {string} props
 * the props.
 * @param {string} props.name
 * The name for the input
 * @param {Array} props.errors
 * A list of errors, or null.
 * @returns {object}
 * An input.
 */
function SelectGroupsTable({
  handleChange,
  name,
  selectedDataEndpoint,
  errors,
}) {
  const { t } = useTranslation("common");
  const [selectedData, setSelectedData] = useState([]);
  const { data, isLoading } = useGetV1ScreenGroupsQuery({});

  useEffect(() => {
    if (selectedDataEndpoint.length > 0 && data) {
      const localMappedSelected = data["hydra:member"].filter((item) =>
        selectedDataEndpoint.includes(item["@id"])
      );
      setSelectedData(localMappedSelected);
    }
  }, [selectedDataEndpoint, data]);

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
      target: { name: id, value: value.map((item) => item["@id"]) },
    });
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
      {!isLoading && data && data["hydra:member"] && (
        <>
          <GroupsDropdown
            errors={errors}
            name={name}
            data={data["hydra:member"]}
            handleGroupsSelection={handleAdd}
            selected={selectedData}
          />
          {selectedData.length > 0 && (
            <Table columns={columns} data={selectedData} />
          )}
        </>
      )}
    </>
  );
}

SelectGroupsTable.defaultProps = {
  errors: [],
  selectedDataEndpoint: [],
};

SelectGroupsTable.propTypes = {
  name: PropTypes.string.isRequired,
  selectedDataEndpoint: PropTypes.arrayOf(PropTypes.string),
  handleChange: PropTypes.func.isRequired,
  errors: PropTypes.arrayOf(PropTypes.string),
};

export default SelectGroupsTable;
