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
 * An input for forms.
 *
 * @param {string} props The props.
 * @param {string} props.radioGroupName The name of the input
 * @param {string} props.label The label for the input
 * @returns {object} An input.
 */
function PlaylistDragAndDrop({ handleChange, name, screenId, regionId }) {
  const { t } = useTranslation("common");
  const [searchText, setSearchText] = useState();
  const [selectedData, setSelectedData] = useState([]);
  const { data: selectedPlaylistsByRegion } =
    useGetV1ScreensByIdRegionsAndRegionIdPlaylistsQuery({
      id: screenId,
      regionId: regionId,
    });

  const { data: playlists } = useGetV1PlaylistsQuery({
    title: searchText,
    itemsPerPage: searchText ? 10 : 0,
  });

  /** Set loaded data into form state. */
  useEffect(() => {
    if (selectedPlaylistsByRegion) {
      setSelectedData(selectedPlaylistsByRegion["hydra:member"]);
    }
  }, [selectedPlaylistsByRegion]);

  /**
   * Fetches data for the multi component // @TODO:
   *
   * @param {string} filter - The filter.
   */
  function onFilter(filter) {
    setSearchText(filter);
  }

  /**
   * Removes playlist from list of playlists, and closes modal.
   *
   * @param {object} props The props.
   * @param {string} props.value The id of the playlist
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
    let selectedDataCopy = [...selectedData, ...value];
    setSelectedData(selectedDataCopy);
    handleChange({
      target: { id, value: value },
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
  data: PropTypes.arrayOf(
    PropTypes.shape({ value: PropTypes.number, label: PropTypes.string })
  ).isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default PlaylistDragAndDrop;
