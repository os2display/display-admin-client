import { React, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Table from "../table/table";
import PlaylistsDropdown from "../forms/multiselect-dropdown/playlists/playlists-dropdown";
import InfoModal from "../../info-modal/info-modal";
import ListButton from "../list/list-button";
import { useGetV1PlaylistsQuery } from "../../../redux/api/api.generated";
/**
 * A multiselect and table for playlists.
 *
 * @param {string} props
 * the props.
 * @param {string} props.name
 * The name for the input
 * @param {string} props.selectedData
 * The data for the multidropdown.
 * @param {Array} props.errors
 * A list of errors, or null.
 * @returns {object}
 * An input.
 */
function SelectPlaylistTable({
  handleChange,
  name,
  selectedDataEndpoint,
  errors,
}) {
  const { t } = useTranslation("common");
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [dataStructureToDisplay, setDataStructureToDisplay] = useState();
  const [selectedData, setSelectedData] = useState([]);
  const { data, isLoading } = useGetV1PlaylistsQuery({});
  const [infoModalTitle, setInfoModalTitle] = useState("");

  useEffect(() => {
    if (selectedDataEndpoint.length > 0 && data) {
      const localMappedSelected = data["hydra:member"].filter((item) =>
        selectedDataEndpoint.includes(item["@id"])
      );
      setSelectedData(localMappedSelected);
    }
  }, [selectedDataEndpoint, data]);

  /**
   * Opens info modal with either categories or slides.
   *
   * @param {object} props
   * The props
   * @param {Array} props.data
   * The data to sum up in the modal
   * @param {string} props.caller
   * Which infomodal is opened, categories or slides.
   */
  function openInfoModal({ data, caller }) {
    const localInfoModalTitle =
      caller === "categories"
        ? t("select-playlists-table.info-modal.playlist-categories")
        : t("select-playlists-table.info-modal.playlist-slides");
    setInfoModalTitle(localInfoModalTitle);
    setDataStructureToDisplay(data);
    setShowInfoModal(true);
  }

  /**
   * Closes the info modal.
   */
  function onCloseInfoModal() {
    setShowInfoModal(false);
    setDataStructureToDisplay();
  }

  /**
   * Removes playlist from list of playlists.
   *
   * @param {object} props
   * The props.
   * @param {string} props.id
   * The id of the playlist
   * @param removeItem
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
   * Removes playlist from list of playlists.
   *
   * @param target.target
   * @param {object} target
   * The target.
   * @param {string} target.id
   * The id of the playlist
   */
  function handleAdd({ target }) {
    setSelectedData(target.value);
    target.value = target.value.map((item) => item["@id"]);
    handleChange({ target });
  }

  // The columns for the table.
  const columns = [
    {
      path: "title",
      label: t("select-playlists-table.columns.name"),
    },
    {
      key: "delete",
      content: (screenData) => (
        <Button variant="danger" onClick={() => removeFromList(screenData)}>
          {t("select-playlists-table.remove-from-list")}
        </Button>
      ),
    },
  ];
  return (
    <>
      {!isLoading && data && data["hydra:member"] && (
        <>
          <PlaylistsDropdown
            errors={errors}
            name={name}
            data={data["hydra:member"]}
            handlePlaylistSelection={handleAdd}
            selected={selectedData}
          />
          {selectedData.length > 0 && (
            <Table columns={columns} data={selectedData} />
          )}
          <InfoModal
            show={showInfoModal}
            onClose={onCloseInfoModal}
            dataStructureToDisplay={dataStructureToDisplay}
            title={infoModalTitle}
          />
        </>
      )}
    </>
  );
}

SelectPlaylistTable.defaultProps = {
  errors: [],
  selectedData: [],
  selectedDataEndpoint: [],
};

SelectPlaylistTable.propTypes = {
  name: PropTypes.string.isRequired,
  selectedData: PropTypes.arrayOf(
    PropTypes.shape({ value: PropTypes.number, label: PropTypes.string })
  ),
  selectedDataEndpoint: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  errors: PropTypes.arrayOf(PropTypes.string),
};

export default SelectPlaylistTable;
