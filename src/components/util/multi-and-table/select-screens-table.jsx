import { React, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import LinkForList from "../list/link-for-list";
import ListButton from "../list/list-button";
import InfoModal from "../../info-modal/info-modal";
import Table from "../table/table";
import ScreensDropdown from "../forms/multiselect-dropdown/screens/screens-dropdown";
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
  const [inGroups, setInGroups] = useState();
  const [searchText, setSearchText] = useState("");
  const [showInfoModal, setShowInfoModal] = useState(false);
  const { data: screens } = useGetV1ScreensQuery({
    title: searchText,
    itemsPerPage: 100,
    orderBy: "createdAt",
    order: "desc",
  });
  const { data } = useGetV1CampaignsByIdScreensQuery({ id: campaignId });

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
    const { value, id } = target;
    setSelectedData(value);
    handleChange({
      target: { id, value: value.map((item) => item["@id"]) },
    });
  }

  /** @param {Array} playlistArray The array of playlists. */
  function openInfoModal(playlistArray) {
    setInGroups(playlistArray);
    setShowInfoModal(true);
  }

  /** Closes the info modal. */
  function onCloseInfoModal() {
    setShowInfoModal(false);
    setInGroups();
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
  /* eslint-disable-next-line no-unused-vars */
  const columns = [
    {
      path: "title",
      sort: true,
      label: t("select-screens-table.columns.name"),
    },
    {
      // eslint-disable-next-line react/prop-types
      content: ({ inScreenGroups }) => (
        <ListButton
          callback={openInfoModal}
          inputData={inScreenGroups}
          apiCall={useGetV1ScreensByIdScreenGroupsQuery}
        />
      ),
      key: "groups",
      label: t("select-screens-table.columns.on-groups"),
    },
    {
      path: "location",
      label: t("select-screens-table.columns.location"),
    },
    {
      key: "edit",
      content: (d) =>
        LinkForList(
          d["@id"],
          `screen/edit`,
          t("select-screens-table.edit-button"),
          true
        ),
    },
    {
      key: "delete",
      content: (slideData) => (
        <Button variant="danger" onClick={() => removeFromList(slideData)}>
          {t("select-screens-table.remove-from-list")}
        </Button>
      ),
    },
  ];

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
          <InfoModal
            show={showInfoModal}
            apiCall={useGetV1ScreensByIdScreenGroupsQuery}
            onClose={onCloseInfoModal}
            dataStructureToDisplay={inGroups}
            modalTitle={t("select-screens-table.info-modal.screen-in-groups")}
          />
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
