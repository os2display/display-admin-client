import { React, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Table from "../table/table";
import PlaylistsDropdown from "../forms/multiselect-dropdown/playlists/playlists-dropdown";
import InfoModal from "../../info-modal/info-modal";
import ListButton from "../list/list-button";
import { useGetV1SlidesByIdPlaylistsQuery } from "../../../redux/api/api.generated";

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
  const [selectedData, setSelectedData] = useState();
  const [infoModalTitle, setInfoModalTitle] = useState("");
  // id created below.
  const id = selectedDataEndpoint.substring(
    selectedDataEndpoint.lastIndexOf("=") + 1,
    selectedDataEndpoint.length
  );

  const { data, isLoading } = useGetV1SlidesByIdPlaylistsQuery({
    id: id,
  });

  /**
   * Set loaded data into form state.
   */
  useEffect(() => {
    if (data) {
      setSelectedData(data["hydra:member"]);
    }
  }, [data]);

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
   * Removes screen from list of screens.
   *
   * @param {object} props
   * The props.
   * @param {string} props.id
   * The id of the screen
   */
  function removeFromList({ id }) {
    const indexOfItemToRemove = selectedData
      .map((item) => {
        return item.id;
      })
      .indexOf(id);
    let selectedDataCopy = [...selectedData];
    let toRemove = selectedDataCopy.splice(indexOfItemToRemove, 1);
    toRemove = { ...toRemove[0], toRemove: true, toAdd: false };
    selectedDataCopy.push(toRemove);
    setSelectedData(selectedDataCopy);
    const target = { value: selectedDataCopy, id: name };
    handleChange({ target });
  }

  /**
   * Removes screen from list of screens.
   *
   * @param {object} props
   * The props.
   * @param {string} props.id
   * The id of the screen
   */
  function handleAdd({ target }) {
    let toAdd = target.value[0];
    target.value.splice(0, 1);
    toAdd = { ...toAdd, toRemove: false, toAdd: true };
    target.value.push(toAdd);
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
      {!isLoading && selectedData && (
        <>
          <PlaylistsDropdown
            errors={errors}
            name={name}
            handlePlaylistSelection={handleAdd}
            selected={selectedData.filter(({ toRemove }) => !toRemove)}
          />
          <Table
            columns={columns}
            data={selectedData.filter(({ toRemove }) => !toRemove)}
          />
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
  selectedDataEndpoint: "",
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
