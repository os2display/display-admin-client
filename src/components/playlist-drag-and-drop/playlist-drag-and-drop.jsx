import { React, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Published from "../slide/published";
import PlaylistsDropdown from "../util/forms/multiselect-dropdown/playlists/playlists-dropdown";
import DragAndDropTable from "../util/drag-and-drop-table/drag-and-drop-table";
import {
  useGetV1ScreensByIdRegionsAndRegionIdPlaylistsQuery,
  useGetV1PlaylistsQuery,
} from "../../redux/api/api.generated";

/**
 * A drag and drop component for playlists.
 *
 * @param {string} props The props.
 * @param {Function} props.handleChange - the callback when something changed
 * @param {string} props.name - the id of the form element
 * @param {string} props.screenId - the screen id for get request
 * @param {string} props.regionId - the region id for get request
 * @returns {object} A drag and drop component
 */
function PlaylistDragAndDrop({ handleChange, name, screenId, regionId }) {
  const { t } = useTranslation("common");
  const [searchText, setSearchText] = useState();
  const [selectedData, setSelectedData] = useState([]);
  const { data: selectedPlaylistsByRegion } =
    useGetV1ScreensByIdRegionsAndRegionIdPlaylistsQuery({
      id: screenId,
      regionId,
      page: 1,
    });
  const { data: playlists } = useGetV1PlaylistsQuery({
    title: searchText,
    itemsPerPage: searchText ? 10 : 0,
  });

  /** Set loaded data into form state. */
  useEffect(() => {
    if (
      selectedPlaylistsByRegion &&
      selectedPlaylistsByRegion["hydra:member"].length > 0
    ) {
      const listOfPlaylists = selectedPlaylistsByRegion["hydra:member"].map(
        ({ playlist }) => {
          return playlist;
        }
      );
      const target = { value: listOfPlaylists, id: name };
      handleChange({ target });
      setSelectedData(listOfPlaylists);
    }
  }, [selectedPlaylistsByRegion]);

  /**
   * Fetches data for the multi component
   *
   * @param {string} filter - The filter.
   */
  function onFilter(filter) {
    setSearchText(filter);
  }

  /**
   * Removes playlist from list of playlists, and closes modal.
   *
   * @param {object} removeItem - Item to remove
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

    const target = { value: selectedDataCopy, id: name };
    handleChange({ target });
  }

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
      target: { id, value },
    });
  }

  // The columns of the list
  const columns = [
    {
      path: "title",
      label: t("playlist-drag-and-drop.columns.name"),
    },
    {
      path: "published",
      label: t("playlists-list.columns.published"),
      // eslint-disable-next-line
      content: ({ published }) => <Published published={published} />,
    },
    {
      key: "delete",
      content: (playlistData) => (
        <Button variant="danger" onClick={() => removeFromList(playlistData)}>
          {t("playlist-drag-and-drop.remove-from-list")}
        </Button>
      ),
    },
  ];

  return (
    <>
      {playlists && playlists["hydra:member"] && selectedData && (
        <>
          <div className="mb-3">
            <PlaylistsDropdown
              filterCallback={onFilter}
              name={name}
              handlePlaylistSelection={handleAdd}
              selected={selectedData}
              data={playlists["hydra:member"]}
            />
          </div>
          {selectedData.length > 0 && (
            <DragAndDropTable
              columns={columns}
              onDropped={handleChange}
              name={name}
              data={selectedData}
            />
          )}
        </>
      )}
    </>
  );
}

PlaylistDragAndDrop.propTypes = {
  name: PropTypes.string.isRequired,
  screenId: PropTypes.string.isRequired,
  regionId: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default PlaylistDragAndDrop;
