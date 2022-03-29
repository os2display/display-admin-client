import { React, useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import UserContext from "../../context/user-context";
import getPlaylistColumns from "../playlist/playlists-columns";
import InfoModal from "../info-modal/info-modal";
import PlaylistsDropdown from "../util/forms/multiselect-dropdown/playlists/playlists-dropdown";
import DragAndDropTable from "../util/drag-and-drop-table/drag-and-drop-table";
import FormCheckbox from "../util/forms/form-checkbox";
import {
  useGetV1PlaylistsByIdSlidesQuery,
  useGetV1ScreensByIdRegionsAndRegionIdPlaylistsQuery,
  api,
} from "../../redux/api/api.generated";

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
  const { t } = useTranslation("common");
  const dispatch = useDispatch();

  const [onSlides, setOnSlides] = useState();
  const [searchText, setSearchText] = useState();
  const [selectedData, setSelectedData] = useState([]);
  const [onlySharedPlaylists, setOnlySharedPlaylists] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const [showInfoModal, setShowInfoModal] = useState(false);

  // Context
  const context = useContext(UserContext);

  const { data: selectedPlaylistsByRegion } =
    useGetV1ScreensByIdRegionsAndRegionIdPlaylistsQuery({
      id: screenId,
      regionId,
      page: 1,
      itemsPerPage: 100,
    });

  // Fetch playlist data
  // Either its all the playlists withing the tenants, or the shared with me playlists
  useEffect(() => {
    const callParamters = {
      isCampaign: false,
      title: searchText,
      itemsPerPage: 100,
      orderBy: "createdAt",
      order: "asc",
    };
    if (onlySharedPlaylists) {
      callParamters["tenants.tenantKey"] =
        context.selectedTenant?.get.tenantKey;
    }
    dispatch(api.endpoints.getV1Playlists.initiate(callParamters)).then(
      (result) => {
        if (result.data) {
          setPlaylists(result.data);
        }
      }
    );
  }, [onlySharedPlaylists]);

  /** Set loaded data into form state. */
  useEffect(() => {
    if (selectedPlaylistsByRegion) {
      setSelectedData(
        selectedPlaylistsByRegion["hydra:member"].map(({ playlist }) => {
          return playlist;
        })
      );
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

  const columns = getPlaylistColumns({
    editNewTab: true,
    handleDelete: (playlistData) => removeFromList(playlistData),
    listButtonCallback: openInfoModal,
  });

  return (
    <>
      {playlists && playlists["hydra:member"] && (
        <>
          <FormCheckbox
            label={t("playlist-drag-and-drop.show-only-shared")}
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
              data={playlists["hydra:member"]}
            />
          </div>
          {selectedData.length > 0 && (
            <>
              <DragAndDropTable
                columns={columns}
                onDropped={handleChange}
                name={name}
                data={selectedData}
              />
            </>
          )}
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
  );
}

PlaylistDragAndDrop.propTypes = {
  name: PropTypes.string.isRequired,
  screenId: PropTypes.string.isRequired,
  regionId: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default PlaylistDragAndDrop;
