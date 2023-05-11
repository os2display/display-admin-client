import { React, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { SelectPlaylistColumns } from "../playlist/playlists-columns";
import PlaylistsDropdown from "../util/forms/multiselect-dropdown/playlists/playlists-dropdown";
import DragAndDropTable from "../util/drag-and-drop-table/drag-and-drop-table";
import FormCheckbox from "../util/forms/form-checkbox";
import {
  useGetV1PlaylistsByIdSlidesQuery,
  useGetV1PlaylistsQuery,
  useGetV1ScreensByIdRegionsAndRegionIdPlaylistsQuery,
} from "../../redux/api/api.generated";
import ScreenGanttChart from "../screen/util/screen-gantt-chart";

/**
 * A drag and drop component for playlists.
 *
 * @param {string} props The props.
 * @param {Function} props.handleChange - The callback when something changed
 * @param {string} props.name - The id of the form element
 * @param {string} props.screenId - The screen id for get request
 * @param {string} props.regionId - The region id for get request
 * @returns {object} A drag and drop component
 */
function PlaylistDragAndDrop({ handleChange, name, screenId, regionId }) {
  const { t } = useTranslation("common", {
    keyPrefix: "playlist-drag-and-drop",
  });

  const [searchText, setSearchText] = useState();
  const [selectedData, setSelectedData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [page, setPage] = useState(1);
  const [onlySharedPlaylists, setOnlySharedPlaylists] = useState(false);
  const { data: selectedPlaylistsByRegion } =
    useGetV1ScreensByIdRegionsAndRegionIdPlaylistsQuery({
      id: screenId,
      regionId,
      page,
      itemsPerPage: 10,
    });

  // Get method
  const { data } = useGetV1PlaylistsQuery({
    isCampaign: false,
    title: searchText,
    itemsPerPage: 30,
    order: { createdAt: "desc" },
    sharedWithMe: onlySharedPlaylists,
  });

  /** Set loaded data into form state. */
  useEffect(() => {
    if (selectedPlaylistsByRegion) {
      setTotalItems(selectedPlaylistsByRegion["hydra:totalItems"]);
      const newPlaylists = selectedPlaylistsByRegion["hydra:member"].map(
        ({ playlist }) => {
          return playlist;
        }
      );
      setSelectedData([...selectedData, ...newPlaylists]);
    }
  }, [selectedPlaylistsByRegion]);

  /**
   * Fetches data for the multi component
   *
   * @param {string} filter - The filter.
   */
  const onFilter = (filter) => {
    setSearchText(filter);
  };

  /**
   * Removes playlist from list of playlists, and closes modal.
   *
   * @param {object} removeItem - Item to remove
   */
  const removeFromList = (removeItem) => {
    const indexOfItemToRemove = selectedData
      .map((item) => {
        return item["@id"];
      })
      .indexOf(removeItem);
    const selectedDataCopy = [...selectedData];
    selectedDataCopy.splice(indexOfItemToRemove, 1);
    setSelectedData(selectedDataCopy);

    const target = { value: selectedDataCopy, id: name };
    handleChange({ target });
  };

  /**
   * Adds group to list of groups.
   *
   * @param {object} props - The props.
   * @param {object} props.target - The target.
   */
  const handleAdd = ({ target }) => {
    const { value, id } = target;
    setSelectedData(value);
    handleChange({
      target: { id, value },
    });
  };

  const columns = SelectPlaylistColumns({
    handleDelete: removeFromList,
    apiCall: useGetV1PlaylistsByIdSlidesQuery,
    editTarget: "playlist",
    infoModalRedirect: "/slide/edit",
    dataKey: "slide",
    infoModalTitle: t("select-playlists-table.info-modal.slides"),
  });

  return (
    <>
      {data && data["hydra:member"] && (
        <>
          <FormCheckbox
            label={t("show-only-shared")}
            onChange={() => {
              setOnlySharedPlaylists(!onlySharedPlaylists);
            }}
            value={onlySharedPlaylists}
            name="show-only-shared"
          />
          <div className="mb-3">
            <PlaylistsDropdown
              filterCallback={onFilter}
              name={name}
              handlePlaylistSelection={handleAdd}
              selected={selectedData}
              data={data["hydra:member"]}
            />
          </div>
          {selectedData.length > 0 && (
            <DragAndDropTable
              columns={columns}
              onDropped={handleChange}
              name={name}
              data={selectedData}
              callback={() => setPage(page + 1)}
              label={t("more-playlists")}
              totalItems={totalItems}
            />
          )}
          {selectedData?.length > 0 && (
            <ScreenGanttChart playlists={selectedData} id={regionId} />
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
