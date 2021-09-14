import { React, useState } from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import ListButton from "../list/list-button";
import SlidesDropdown from "../forms/multiselect-dropdown/slides/slides-dropdown";
import DragAndDropTable from "../drag-and-drop-table/drag-and-drop-table";
import InfoModal from "../../info-modal/info-modal";
import Published from "../../slides-list/published";

/**
 * A multiselect and table for slides.
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
function SelectSlidesTable({ handleChange, name, selectedData, errors }) {
  const { t } = useTranslation("common");
  const [onPlaylists, setOnPlaylists] = useState();
  const [showInfoModal, setShowInfoModal] = useState(false);

  /**
   * @param {Array} playlistArray
   * The array of playlists.
   */
  function openInfoModal(playlistArray) {
    setOnPlaylists(playlistArray);
    setShowInfoModal(true);
  }

  /**
   * Closes the info modal.
   */
  function onCloseInfoModal() {
    setShowInfoModal(false);
    setOnPlaylists();
  }

  /**
   * Removes slide from list of slides.
   *
   * @param {object} props
   * The props.
   * @param {string} props.id
   * The id of the slide
   */
  function removeFromList({ id }) {
    const indexOfItemToRemove = selectedData
      .map((item) => {
        return item.id;
      })
      .indexOf(id);
    selectedData.splice(indexOfItemToRemove, 1);
    const target = { value: selectedData, id: name };
    handleChange({ target });
  }

  const columns = [
    {
      path: "name",
      label: t("select-slides-table.columns.name"),
    },
    {
      path: "template",
      label: t("select-slides-table.columns.template"),
    },
    {
      path: "playlists",
      content: (data) =>
        ListButton(
          openInfoModal,
          data.playlists,
          data.playlists?.length,
          data.playlists?.length === 0
        ),
      key: "playlists",
      label: t("select-slides-table.columns.number-of-playlists"),
    },
    {
      path: "tags",
      label: t("select-slides-table.columns.tags"),
    },
    {
      path: "published",
      content: (data) => Published(data),
      label: t("select-slides-table.columns.published"),
    },
    {
      key: "delete",
      content: (slideData) => (
        <Button variant="danger" onClick={() => removeFromList(slideData)}>
          {t("select-slides-table.remove-from-list")}
        </Button>
      ),
    },
  ];

  return (
    <>
      <SlidesDropdown
        errors={errors}
        name={name}
        handleSlideSelection={handleChange}
        selected={selectedData}
      />
      {/* todo this should work when real data is fetched */}
      {/* {selectedData.length > 0 && (
        <DragAndDropTable
          columns={columns}
          onDropped={handleChange}
          name={name}
          data={selectedData}
        />
      )} */}
      <InfoModal
        show={showInfoModal}
        onClose={onCloseInfoModal}
        dataStructureToDisplay={onPlaylists}
        title={t("select-slides-table.info-modal.slide-on-playlists")}
      />
    </>
  );
}

SelectSlidesTable.defaultProps = {
  errors: [],
  selectedData: [],
};

SelectSlidesTable.propTypes = {
  name: PropTypes.string.isRequired,
  selectedData: PropTypes.arrayOf(
    PropTypes.shape({ value: PropTypes.number, label: PropTypes.string })
  ),
  handleChange: PropTypes.func.isRequired,
  errors: PropTypes.arrayOf(PropTypes.string),
};

export default SelectSlidesTable;
