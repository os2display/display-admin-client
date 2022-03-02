import { React, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import LinkForList from "../list/link-for-list";
import Table from "../table/table";
import {
  useGetV1PlaylistsQuery,
  useGetV1SlidesByIdPlaylistsQuery,
  useGetV1PlaylistsByIdSlidesQuery,
} from "../../../redux/api/api.generated";
import PlaylistsDropdown from "../forms/multiselect-dropdown/playlists/playlists-dropdown";
import ListButton from "../list/list-button";
import InfoModal from "../../info-modal/info-modal";
import Published from "../published";

/**
 * A multiselect and table for groups.
 *
 * @param {string} props The props.
 * @param {string} props.name The name for the input
 * @param {string} props.id The id used for the get.
 * @param {string} props.helpText Helptext for dropdown.
 * @returns {object} Select groups table.
 */
function SelectPlaylistsTable({ handleChange, name, id, helpText }) {
  const { t } = useTranslation("common");
  const [selectedData, setSelectedData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [onSlides, setOnSlides] = useState(false);
  const { data: playlists } = useGetV1PlaylistsQuery({
    title: searchText,
    itemsPerPage: 100,
    isCampaign: false,
    orderBy: "createdAt",
    order: "desc",
  });
  const { data } = useGetV1SlidesByIdPlaylistsQuery({ id });

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
    const { value, id: localId } = target;
    setSelectedData(value);
    handleChange({
      target: { id: localId, value: value.map((item) => item["@id"]) },
    });
  }

  /** @param {Array} slidesArray The array of playlists. */
  function openInfoModal(slidesArray) {
    setOnSlides(slidesArray);
    setShowInfoModal(true);
  }

  /** Closes the info modal. */
  function onCloseInfoModal() {
    setShowInfoModal(false);
    setOnSlides();
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

  // The columns for the table.
  const columns = [
    {
      path: "title",
      label: t("select-playlists-table.columns.name"),
    },
    {
      path: "published",
      label: t("select-playlists-table.columns.published"),
      // eslint-disable-next-line react/prop-types
      content: ({ publishedFrom, publishedTo }) => (
        <Published published={{ from: publishedFrom, to: publishedTo }} />
      ),
    },
    {
      key: "slides",
      label: t("select-playlists-table.columns.number-of-slides"),
      content: (playlist) => (
        <ListButton
          callback={openInfoModal}
          // eslint-disable-next-line react/destructuring-assignment
          inputData={playlist["@id"]}
          apiCall={useGetV1PlaylistsByIdSlidesQuery}
        />
      ),
    },
    {
      key: "edit",
      content: (d) =>
        LinkForList(
          d["@id"],
          `playlist/edit`,
          t("select-playlists-table.edit-button"),
          true
        ),
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
      {playlists && (
        <>
          <PlaylistsDropdown
            name={name}
            data={playlists["hydra:member"]}
            handlePlaylistSelection={handleAdd}
            selected={selectedData}
            filterCallback={onFilter}
            helpText={helpText}
          />
          {selectedData.length > 0 && (
            <>
              <Table columns={columns} data={selectedData} />
              <small>
                {t("playlist-drag-and-drop.edit-playlists-help-text")}
              </small>
            </>
          )}
          <InfoModal
            show={showInfoModal}
            apiCall={useGetV1PlaylistsByIdSlidesQuery}
            onClose={onCloseInfoModal}
            dataKey="slide"
            dataStructureToDisplay={onSlides}
            modalTitle={t("select-playlists-table.info-modal.slides")}
          />
        </>
      )}
    </>
  );
}

SelectPlaylistsTable.defaultProps = {
  id: "",
};

SelectPlaylistsTable.propTypes = {
  name: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  id: PropTypes.string,
  helpText: PropTypes.string.isRequired,
};

export default SelectPlaylistsTable;
