import { React, useState } from "react";
import PropTypes from "prop-types";
import { Tabs, Tab, Alert } from "react-bootstrap";
import { createGridArea, createGrid } from "os2display-grid-generator";
import { useTranslation } from "react-i18next";
import uniqWith from "lodash.uniqwith";
import idFromUrl from "../../util/helpers/id-from-url";
import PlaylistDragAndDrop from "../../playlist-drag-and-drop/playlist-drag-and-drop";
import "./grid.scss";
/**
 * The grid generator component.
 *
 * @param {object} props Props.
 * @param {object} props.grid The grid to generate. // * @param {Function}
 * @param {object} props.selectedData The selected data for the multidropdown.
 * @param {object} props.regions The regions in the grid.
 * @param {boolean} props.vertical True if the screen is vertical
 * @param {Function} props.handleInput - A callback on select in multiselect
 * @param {string} props.screenId - A screen id
 * @returns {object} The component.
 */
function GridGenerationAndSelect({
  grid,
  vertical,
  regions,
  handleInput,
  selectedData,
  screenId,
}) {
  const { t } = useTranslation("common");
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
   * @param {object} props The props.
   * @param {object} props.target Event target
   */
  const handleChange = ({ target }) => {
    // Map to add region id to incoming data.
    const localTarget = target.value.map((value) => {
      return {
        region: target.id,
        ...value,
      };
    });

    // A copy, to be able to remove items.
    let selectedPlaylistsCopy = [...selectedPlaylists];

    // The following is used to determine if something has been removed from a list.
    const regionPlaylists = selectedPlaylists
      .filter(({ region }) => region === target.id)
      .map(({ region }) => {
        return region;
      });
    const selectedWithoutRegion = [];

    // Checks if an element has been removed from the list
    if (target.value.length < regionPlaylists.length) {
      selectedPlaylists.forEach((playlist) => {
        if (!regionPlaylists.includes(playlist.region)) {
          selectedWithoutRegion.push(playlist);
        }
      });
      //  If a playlist is removed from a list, all the playlists in that region will be removed.
      selectedPlaylistsCopy = selectedWithoutRegion;
    }

    // Removes duplicates.
    const localSelectedPlaylists = uniqWith(
      [...localTarget, ...selectedPlaylistsCopy],
      (firstPlaylist, secondPlaylist) =>
        firstPlaylist["@id"] === secondPlaylist["@id"] &&
        firstPlaylist.region === secondPlaylist.region
    );
    setSelectedPlaylists(localSelectedPlaylists);
    handleInput({ target: { value: localSelectedPlaylists, id: "playlists" } });
  };

  /** @param {string} id - The id of the selected tab */
  const handleSelect = (id) => {
    setKey(id);
  };

  return (
    <>
      {selectedData && (
        <>
          <div className="col-md-4 my-3 my-md-0">
            <div className="bg-light border rounded p-1">
              <div className={gridClasses} style={gridTemplateAreas}>
                {regions &&
                  regions.map((data) => (
                    <div
                      key={data["@id"]}
                      className={
                        key === data["@id"]
                          ? "grid-item selected"
                          : "grid-item "
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
                <h3 className="h5">
                  {t("screen-form.screen-region-playlists")}
                </h3>
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
                          name={data["@id"]}
                          screenId={screenId}
                          regionId={idFromUrl(data["@id"])}
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
      )}
    </>
  );
}

GridGenerationAndSelect.defaultProps = {
  regions: [],
};

GridGenerationAndSelect.propTypes = {
  grid: PropTypes.shape({ columns: PropTypes.number, rows: PropTypes.number })
    .isRequired,
  selectedData: PropTypes.arrayOf(
    PropTypes.shape({ value: PropTypes.number, label: PropTypes.string })
  ).isRequired,
  screenId: PropTypes.string.isRequired,
  vertical: PropTypes.bool.isRequired,
  handleInput: PropTypes.func.isRequired,
  regions: PropTypes.arrayOf(PropTypes.shape(PropTypes.any)),
};

export default GridGenerationAndSelect;
