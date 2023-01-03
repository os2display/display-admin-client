import { React, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import Table from "../table/table";
import ScreensDropdown from "../forms/multiselect-dropdown/screens/screens-dropdown";
import { SelectScreenColumns } from "../../screen/util/screen-columns";
import {
  useGetV1ScreensQuery,
  useGetV1ScreensByIdScreenGroupsQuery,
  useGetV1CampaignsByIdScreensQuery,
} from "../../../redux/api/api.generated";

/**
 * A multiselect and table for screens.
 *
 * @param {string} props - The props.
 * @param {Function} props.handleChange - The callback on change.
 * @param {string} props.name - The name for the input
 * @param {string} props.campaignId - The campaign id.
 * @returns {object} - A select screens table.
 */
function SelectScreensTable({ handleChange, name, campaignId }) {
  const { t } = useTranslation("common");
  const [selectedData, setSelectedData] = useState();
  const [searchText, setSearchText] = useState("");
  const { data: screens } = useGetV1ScreensQuery({
    search: searchText,
    itemsPerPage: 100,
    order: { createdAt: "desc" },
  });
  const { data } = useGetV1CampaignsByIdScreensQuery({ id: campaignId });

  /** Map loaded data. */
  useEffect(() => {
    if (data) {
      setSelectedData(data["hydra:member"].map(({ screen }) => screen));
    }
  }, [data]);

  /**
   * Adds group to list of groups.
   *
   * @param {object} props - The props.
   * @param {object} props.target - The target.
   */
  const handleAdd = ({ target }) => {
    const { value, id } = target;
    setSelectedData(value);
    handleChange({
      target: { id, value: value.map((item) => item["@id"]) },
    });
  };

  /**
   * Fetches data for the multi component
   *
   * @param {string} filter - The filter.
   */
  const onFilter = (filter) => {
    setSearchText(filter);
  };

  /**
   * Removes playlist from list of groups.
   *
   * @param {string} removeItem The item to remove.
   */
  const removeFromList = (removeItem) => {
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
  };

  // The columns for the table.
  const columns = SelectScreenColumns({
    handleDelete: removeFromList,
    apiCall: useGetV1ScreensByIdScreenGroupsQuery,
    editTarget: "screen",
    infoModalRedirect: "/group/edit",
    infoModalTitle: t("select-screens-table.info-modal.screen-in-groups"),
  });

  return (
    <>
      {screens && screens["hydra:member"] && (
        <>
          <ScreensDropdown
            name={name}
            handleScreenSelection={handleAdd}
            selected={selectedData}
            data={screens["hydra:member"]}
            filterCallback={onFilter}
          />
          {selectedData?.length > 0 && (
            <>
              <Table columns={columns} data={selectedData} />
              <small>{t("select-screens-table.edit-screens-help-text")}</small>
            </>
          )}
        </>
      )}
    </>
  );
}

SelectScreensTable.defaultProps = {
  campaignId: "",
};

SelectScreensTable.propTypes = {
  name: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  campaignId: PropTypes.string,
};

export default SelectScreensTable;
