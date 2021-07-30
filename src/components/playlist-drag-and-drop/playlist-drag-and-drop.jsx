import { React, useState } from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import ListButton from "../util/list/list-button";
import InfoModal from "../info-modal/info-modal";
import PlaylistsDropdown from "../util/forms/multiselect-dropdown/playlists/playlists-dropdown";
import DragAndDropTable from "../util/drag-and-drop-table/drag-and-drop-table";
import { useTranslation } from "react-i18next";

/**
 * An input for forms.
 *
 * @param {string} props
 * the props.
 * @param {string} props.radioGroupName
 * The name of the input
 * @param {string} props.label
 * The label for the input
 * @returns {object}
 * An input.
 */
function PlaylistDragAndDrop({ handleChange, formId, data }) {
  const { t } = useTranslation("common");
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [dataStructureToDisplay, setDataStructureToDisplay] = useState();
  const [infoModalText, setInfoModalText] = useState("");

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
    const localInfoModalText =
      caller === "categories"
        ? t("playlist-drag-and-drop.info-modal.playlist-categories")
        : t("playlist-drag-and-drop.info-modal.playlist-slides");
    setInfoModalText(localInfoModalText);
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
   * Removes playlist from list of playlists, and closes modal.
   *
   * @param {object} props
   * The props.
   * @param {string} props.value
   * The id of the playlist
   */
  function handleRemove({ value }) {
    const indexOfItemToRemove = data
      .map((item) => {
        return item.id;
      })
      .indexOf(value);

    data.splice(indexOfItemToRemove, 1);
    const target = { value: data, id: formId };
    handleChange({ target });
  }

  // The columns of the list
  const columns = [
    {
      path: "name",
      label: t("playlist-drag-and-drop.columns.name"),
    },
    {
      content: (data) =>
        ListButton(
          openInfoModal,
          { data: data.slides, caller: "slides" },
          data.slides?.length,
          data.slides?.length === 0
        ),
      path: "slides",
      key: "slides",
      label: t("playlist-drag-and-drop.columns.number-of-slides"),
    },
    {
      content: (data) =>
        ListButton(
          openInfoModal,
          { data: data.categories, caller: "categories" },
          data.categories?.length,
          data.categories?.length === 0
        ),
      path: "categories",
      key: "categories",
      label: t("playlist-drag-and-drop.columns.number-of-categories"),
    },
    {
      key: "edit",
      content: () => (
        <>
          {/* @todo make quick edit modal */}
          <div className="m-2">
            <Button variant="primary">Quick edit</Button>
          </div>
        </>
      ),
    },
    {
      key: "delete",
      content: (playlistData) => (
        <Button variant="danger" onClick={() => handleRemove(playlistData)}>
          {t("playlist-drag-and-drop.remove-from-list")}
        </Button>
      ),
    },
  ];

  return (
    <>
      <PlaylistsDropdown
        name="playlists"
        handlePlaylistSelection={handleChange}
        selected={data}
      />
      {data.length > 0 && (
        <DragAndDropTable
          columns={columns}
          onDropped={handleChange}
          formId={formId}
          data={data}
        />
      )}
      <InfoModal
        show={showInfoModal}
        onClose={onCloseInfoModal}
        dataStructureToDisplay={dataStructureToDisplay}
        infoModalString={infoModalText}
      />
    </>
  );
}

PlaylistDragAndDrop.propTypes = {
  formId: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({ value: PropTypes.number, label: PropTypes.string })
  ).isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default PlaylistDragAndDrop;
