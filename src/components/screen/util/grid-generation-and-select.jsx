import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Tabs, Tab, Alert } from "react-bootstrap";
import { createGridArea, createGrid } from "os2display-grid-generator";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import idFromUrl from "../../util/helpers/id-from-url";
import PlaylistDragAndDrop from "../../playlist-drag-and-drop/playlist-drag-and-drop";
import { api } from "../../../redux/api/api.generated.ts";
import "./grid.scss";

/**
 * The grid generator component.
 *
 * @param {object} props Props.
 * @param {object} props.grid The grid to generate.
 * @param {object} props.regions The regions in the grid.
 * @param {boolean} props.vertical True if the screen is vertical
 * @param {Function} props.handleInput - A callback on select in multiselect
 * @param {string} props.screenId - A screen id
 * @returns {object} The component.
 */
function GridGenerationAndSelect({
  grid,
  vertical,
  handleInput,
  screenId,
  regions = [],
}) {
  const { t } = useTranslation("common");
  const dispatch = useDispatch();
  const [key, setKey] = useState(regions.length > 0 ? regions[0]["@id"] : "");
  const [selectedPlaylists, setSelectedPlaylists] = useState([]);
  const gridClasses = `grid ${vertical ? "vertical" : "horizontal"}`;
  // Rows and columns in grid defaults to 1.
  const configColumns = grid?.columns || 1;
  const configRows = grid?.rows || 1;
  const gridTemplateAreas = {
    gridTemplateAreas: createGrid(configColumns, configRows),
  };

  /**
   * @param {object} props The props
   * @param {Array} props.value The value
   * @param {string} props.id The id
   * @returns {Array} Mapped data
   */
  function mapData({ value: inputPlaylists, id }) {
    // Map to add region id to incoming data.
    const localTarget = inputPlaylists.map((playlist) => {
      return {
        region: idFromUrl(id),
        ...playlist,
      };
    });
    // A copy, to be able to remove items.
    let selectedPlaylistsCopy = [...selectedPlaylists];

    // The following is used to determine if something has been removed from a list.
    const regionPlaylists = selectedPlaylists
      .filter(({ region }) => region === id)
      .map(({ region }) => region);

    const selectedWithoutRegion = [];

    // Checks if an element has been removed from the list
    if (inputPlaylists.length < regionPlaylists.length) {
      selectedPlaylists.forEach((playlist) => {
        if (!regionPlaylists.includes(playlist.region)) {
          selectedWithoutRegion.push(playlist);
        }
      });
      //  If a playlist is removed from a list, all the playlists in that region will be removed.
      selectedPlaylistsCopy = selectedWithoutRegion;
    }

    // Removes duplicates.
    const localSelectedPlaylists = [
      ...localTarget,
      ...selectedPlaylistsCopy,
    ].filter(
      (playlist, index, self) =>
        index ===
        self.findIndex(
          (secondPlaylist) =>
            secondPlaylist["@id"] === playlist["@id"] &&
            secondPlaylist.region === playlist.region
        )
    );

    return localSelectedPlaylists;
  }

  useEffect(() => {
    if (regions.length > 0) {
      const promises = [];
      regions.forEach(({ "@id": id }) => {
        promises.push(
          dispatch(
            api.endpoints.getV2ScreensByIdRegionsAndRegionIdPlaylists.initiate({
              id: screenId,
              regionId: idFromUrl(id),
              page: 1,
              itemsPerPage: 50,
            })
          )
        );
      });

      Promise.allSettled(promises).then((results) => {
        let playlists = [];
        results.forEach(
          ({
            value: {
              originalArgs: { regionId },
              data: { "hydra:member": promisedPlaylists = null } = {},
            },
          }) => {
            playlists = [
              ...playlists,
              ...promisedPlaylists.map(({ playlist, weight }) => ({
                ...playlist,
                weight,
                region: regionId,
              })),
            ];
          }
        );
        playlists = playlists.sort((a, b) => a.weight - b.weight);
        setSelectedPlaylists(playlists);
      });
    }
  }, [regions]);

  useEffect(() => {
    handleInput({ target: { value: selectedPlaylists, id: "playlists" } });
  }, [selectedPlaylists]);

  /**
   * @param {object} props The props.
   * @param {object} props.target Event target
   */
  const handleChange = ({ target }) => {
    const playlists = mapData(target);
    setSelectedPlaylists(playlists);
  };

  /** @param {string} id - The id of the selected tab */
  const handleSelect = (id) => {
    setKey(id);
  };

  /**
   * Removes playlist from list of playlists, and closes modal.
   *
   * @param {object} inputPlaylist - InputPlaylist to remove
   * @param {object} inputRegion - InputRegion to remove from
   */
  const removeFromList = (inputPlaylist, inputRegion) => {
    const indexOfItemToRemove = selectedPlaylists.findIndex(
      ({ "@id": id, region }) => {
        return region === inputRegion && id === inputPlaylist;
      }
    );
    const selectedPlaylistsCopy = [...selectedPlaylists];
    selectedPlaylistsCopy.splice(indexOfItemToRemove, 1);
    setSelectedPlaylists(selectedPlaylistsCopy);
  };

  return (
    <>
      <div className="col-md-4 my-3 my-md-0">
        <div className="bg-light border rounded p-1">
          <div className={gridClasses} style={gridTemplateAreas}>
            {regions &&
              regions.map((data) => (
                <div
                  key={data["@id"]}
                  className={
                    key === data["@id"] ? "grid-item selected" : "grid-item "
                  }
                  style={{ gridArea: createGridArea(data.gridArea) }}
                >
                  {data.title}
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="col-md-12">
        {regions.length > 0 && (
          <>
            <h3 className="h5">{t("screen-form.screen-region-playlists")}</h3>
            <Tabs
              defaultActiveKey={regions[0]["@id"]}
              id="tabs"
              onSelect={handleSelect}
              className="mb-3"
            >
              {regions &&
                regions.map((data) => (
                  <Tab
                    eventKey={data["@id"]}
                    key={data["@id"]}
                    title={data.title}
                  >
                    <PlaylistDragAndDrop
                      id="playlist_drag_and_drop"
                      handleChange={handleChange}
                      removeFromList={removeFromList}
                      name={data["@id"]}
                      regionIdForInitializeCallback={data["@id"]}
                      screenId={screenId}
                      regionId={idFromUrl(data["@id"])}
                      selectedPlaylists={selectedPlaylists.filter(
                        ({ region }) => region === idFromUrl(data["@id"])
                      )}
                    />
                    {data?.type === "touch-buttons" && (
                      <Alert key="screen-form-touch-buttons" variant="info">
                        {t("screen-form.touch-region-helptext")}
                      </Alert>
                    )}
                  </Tab>
                ))}
            </Tabs>
          </>
        )}
      </div>
    </>
  );
}

GridGenerationAndSelect.propTypes = {
  grid: PropTypes.shape({ columns: PropTypes.number, rows: PropTypes.number })
    .isRequired,
  screenId: PropTypes.string.isRequired,
  vertical: PropTypes.bool.isRequired,
  handleInput: PropTypes.func.isRequired,
  regions: PropTypes.arrayOf(PropTypes.shape(PropTypes.any)),
};

export default GridGenerationAndSelect;
