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
 * @param {string} props - The props.
 * @param {Function} props.handleChange - The callback on change.
 * @param {string} props.name - The name for the input
 * @param {string} props.slideId - The slide id.
 * @returns {object} - A select slides table.
 */
function SelectSlidesTable({ handleChange, name, slideId }) {
  const { t } = useTranslation("common");
  const [selectedData, setSelectedData] = useState();
  const [onPlaylists, setOnPlaylists] = useState();
  const [searchText, setSearchText] = useState("");
  const [showInfoModal, setShowInfoModal] = useState(false);
  const { data: slides } = useGetV1SlidesQuery({
    title: searchText,
    itemsPerPage: searchText ? 10 : 0,
  });
  const { data } = useGetV1PlaylistsByIdSlidesQuery({ id: slideId });

  /** Map loaded data. */
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
    setOnPlaylists(playlistArray);
    setShowInfoModal(true);
  }

  /** Closes the info modal. */
  function onCloseInfoModal() {
    setShowInfoModal(false);
    setOnPlaylists();
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
      label: t("slides-list.columns.name"),
    },
    {
      content: (templateData) => TemplateLabelInList(templateData),
      key: "template",
      label: t("slides-list.columns.template"),
    },
    {
      key: "playlists",
      // eslint-disable-next-line react/prop-types
      content: ({ onPlaylists: localOnPlaylists }) => (
        <ListButton
          callback={openInfoModal}
          inputData={localOnPlaylists[0] || []}
          apiCall={useGetV1PlaylistsByIdSlidesQuery}
        />
      ),
      label: t("slides-list.columns.slide-on-playlists"),
    },
    {
      key: "published",
      content: (publishedData) => Published(publishedData),
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
            modalTitle={t("select-slides-table.info-modal.playlist-slides")}
            dataKey="slide"
          />
        </>
      )}
    </>
  );
}

SelectSlidesTable.defaultProps = {
  slideId: "",
};

SelectSlidesTable.propTypes = {
  name: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  slideId: PropTypes.string,
};

export default SelectSlidesTable;
