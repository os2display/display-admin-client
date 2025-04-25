import { useState } from "react";
import { useTranslation } from "react-i18next";
import { SelectPlaylistColumns } from "../playlist/playlists-columns";
import PlaylistsDropdown from "../util/forms/multiselect-dropdown/playlists/playlists-dropdown";
import DragAndDropTable from "../util/drag-and-drop-table/drag-and-drop-table";
import FormCheckbox from "../util/forms/form-checkbox";
import {
  useGetV2PlaylistsByIdSlidesQuery,
  useGetV2PlaylistsQuery,
} from "../../redux/api/api.generated.ts";
import ScreenGanttChart from "../screen/util/screen-gantt-chart";

/**
 * A drag and drop component for playlists.
 *
 * @param {string} props The props.
 * @param {Array} props.selectedPlaylists - The selected playlists
 * @param {string} props.name - The name
 * @param {Function} props.handleChange - The callback when something is added
 * @param {string} props.regionId - The region id for get request
 * @param {string} props.regionIdForInitializeCallback - The region id to add
 *   regions to formstateobject.
 * @returns {object} A drag and drop component
 */
function PlaylistDragAndDrop({
  selectedPlaylists,
  name,
  handleChange,
  removeFromList,
  regionId,
}) {
  const { t } = useTranslation("common", {
    keyPrefix: "playlist-drag-and-drop",
  });
  const [searchText, setSearchText] = useState();
  const [page, setPage] = useState(1);
  const [onlySharedPlaylists, setOnlySharedPlaylists] = useState(false);

  const {
    data: {
      "hydra:member": playlists = null,
      "hydra:totalItems": totalItems = 0,
    } = {},
  } = useGetV2PlaylistsQuery({
    isCampaign: false,
    title: searchText,
    itemsPerPage: 30,
    order: { createdAt: "desc" },
    sharedWithMe: onlySharedPlaylists,
  });

  /**
   * Fetches data for the multi component
   *
   * @param {string} filter - The filter.
   */
  const onFilter = (filter) => {
    setSearchText(filter);
  };

  const columns = SelectPlaylistColumns({
    handleDelete: removeFromList,
    apiCall: useGetV2PlaylistsByIdSlidesQuery,
    editTarget: "playlist",
    infoModalRedirect: "/slide/edit",
    dataKey: "slide",
    infoModalTitle: t("select-playlists-table.info-modal.slides"),
  });

  if (!playlists) return null;

  return (
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
          handlePlaylistSelection={handleChange}
          selected={selectedPlaylists}
          data={playlists}
        />
      </div>
      {selectedPlaylists.length > 0 && (
        <DragAndDropTable
          columns={columns}
          onDropped={handleChange}
          name={name}
          data={selectedPlaylists}
          callback={() => setPage(page + 1)}
          label={t("more-playlists")}
          totalItems={totalItems}
        />
      )}
      {selectedPlaylists?.length > 0 && (
        <ScreenGanttChart playlists={selectedPlaylists} id={regionId} />
      )}
    </>
  );
}

export default PlaylistDragAndDrop;
