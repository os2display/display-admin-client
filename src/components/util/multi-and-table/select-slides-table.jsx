import { React, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import SlidesDropdown from "../forms/multiselect-dropdown/slides/slides-dropdown";
import Published from "../../slide/published";
import DragAndDropTable from "../drag-and-drop-table/drag-and-drop-table";
import TemplateLabelInList from "../../slide/template-label-in-list";
import ListButton from "../list/list-button";
import InfoModal from "../../info-modal/info-modal";
import {
  useGetV1SlidesQuery,
  useGetV1PlaylistsByIdSlidesQuery,
} from "../../../redux/api/api.generated";

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
function SelectSlidesTable({ handleChange, name, selectedSlides, slideId }) {
  const { t } = useTranslation("common");
  const [selectedData, setSelectedData] = useState();
  const [onPlaylists, setOnPlaylists] = useState();
  const [showInfoModal, setShowInfoModal] = useState(false);
  const { data: slides } = useGetV1SlidesQuery({});
  const {
    data,
    error: loadSelectedSlidesError,
    isLoading: isLoadingSelectedSlides,
  } = useGetV1PlaylistsByIdSlidesQuery({ id: slideId });

  /**
   * Map loaded data.
   */
  useEffect(() => {
    if (data) {
      setSelectedData(
        data["hydra:member"].map(({ slide }) => {
          return slide;
        })
      );
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
   * Fetches data for the multi component // todo
   *
   * @param {string} filter - the filter.
   */
  function onFilter(filter) {
    console.log(filter);
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
      path: "title",
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
      content: (data) =>
        ListButton(
          openInfoModal,
          data.onPlaylists[0][0] || [],
          useGetV1PlaylistsByIdSlidesQuery
        ),
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
      {slides && slides["hydra:member"] && (
        <>
          <SlidesDropdown
            name={name}
            handleSlideSelection={handleAdd}
            selected={selectedData}
            data={slides["hydra:member"]}
            filterCallback={onFilter}
          />
          {selectedData?.length > 0 && (
            <DragAndDropTable
              columns={columns}
              onDropped={handleAdd}
              name={name}
              data={selectedData}
            />
          )}
          <InfoModal
            show={showInfoModal}
            apiCall={useGetV1PlaylistsByIdSlidesQuery}
            onClose={onCloseInfoModal}
            dataStructureToDisplay={onPlaylists}
            modalTitle={t("info-modal.playlist-slides")}
            dataKey="slide"
          />
        </>
      )}
    </>
  );
}

SelectSlidesTable.propTypes = {
  name: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  selectedSlides: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default SelectSlidesTable;
