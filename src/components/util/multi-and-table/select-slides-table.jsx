import { React, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import SlidesDropdown from "../forms/multiselect-dropdown/slides/slides-dropdown";
import InfoModal from "../../info-modal/info-modal";
import Published from "../../slide/published";
import DragAndDropTable from "../drag-and-drop-table/drag-and-drop-table";
import TemplateLabelInList from "../../slide/template-label-in-list";
import ListButton from "../list/list-button";
import {
  useGetV1SlidesQuery,
  useGetV1PlaylistsByIdSlidesQuery,
} from "../../../redux/api/api.generated";
import idFromUrl from "../helpers/id-from-url";

/**
 * A multiselect and table for slides.
 *
 * @param {string} props
 * the props.
 * @param {string} props.name
 * The name for the input
 * @param {string} props.selectedData
 * The data for the multidropdown.
 * @returns {object}
 * An input.
 */
function SelectSlidesTable({ handleChange, name, selectedSlides }) {
  debugger;
  const { t } = useTranslation("common");
  const [selectedData, setSelectedData] = useState(selectedSlides);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const {
    data: slides,
    error: loadSlidesError,
    isLoading: isLoadingSlides,
  } = useGetV1SlidesQuery({});

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
  /* eslint-disable-next-line no-unused-vars */
  const columns = [
    {
      path: "name",
      label: t("select-slides-table.columns.name"),
    },
    {
      content: (data) => TemplateLabelInList(data),
      sort: true,
      key: "template",
      label: t("slides-list.columns.template"),
    },
    {
      key: "playlists",
      sort: true,
      content: (data) => ListButton(openInfoModal, data.onPlaylists),
      label: t("slides-list.columns.slide-on-playlists"),
    },
    {
      key: "published",
      sort: true,
      content: (data) => Published(data),
      label: t("slides-list.columns.published"),
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
      {slides && slides["hydra:member"] && selectedSlides && (
        <>
          <SlidesDropdown
            name={name}
            handleSlideSelection={handleAdd}
            selected={selectedData}
            data={slides["hydra:member"]}
          />
          {selectedData.length > 0 && (
            <DragAndDropTable
              columns={columns}
              onDropped={handleChange}
              name={name}
              data={selectedData}
            />
          )}
          {/* <InfoModal
              show={showInfoModal}
              onClose={onCloseInfoModal}
              dataStructureToDisplay={onPlaylists}
              modalTitle={t(
                "select-slides-table.info-modal.slide-on-playlists"
              )}
            /> */}
        </>
      )}
    </>
  );
}

SelectSlidesTable.defaultProps = {
  selectedDataEndpoint: [],
};

SelectSlidesTable.propTypes = {
  name: PropTypes.string.isRequired,
  selectedDataEndpoint: PropTypes.arrayOf(PropTypes.string),
  handleChange: PropTypes.func.isRequired,
};

export default SelectSlidesTable;
