import { React, useState } from "react";
import PropTypes from "prop-types";
import { Tabs, Tab } from "react-bootstrap";
import PlaylistDragAndDrop from "../playlist-drag-and-drop/playlist-drag-and-drop";
import "./grid.scss";
/**
 * The grid generator component.
 *
 * @param {object} props
 * Props.
 * @param {object} props.grid
 * The grid to generate.
 * @param {Function} props.handleInput
 * A callback on select in multiselect
 * @param {object} props.selectedData
 * The selected data for the multidropdown.
 * @param {object} props.regions
 * The regions in the grid.
 * @returns {object}
 * The component.
 */
function GridGenerationAndSelect({ grid, regions, handleInput, selectedData }) {
  const [key, setKey] = useState("region1");
  // TODO, find a more elegant solution for grid layout.
  const alphabet = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "x",
    "y",
    "z",
    "aa",
    "bb",
    "cc",
    "dd",
    "ee",
    "ff",
    "gg",
    "hh",
    "ii",
    "jj",
    "kk",
    "ll",
    "mm",
    "nn",
    "oo",
    "pp",
    "qq",
    "rr",
    "ss",
    "tt",
    "uu",
    "vv",
    "xx",
    "yy",
    "zz",
  ];

  const configColumns = grid?.columns || 1;
  const configRows = grid?.rows || 1;
  const rootStyle = {};

  /**
   * @param {number} columns
   *   Number of columns.
   * @param {number} rows
   *   Number of rows.
   * @returns {string}
   *   String of grid entries.
   */
  function createGrid(columns, rows) {
    const arrayOfGridTemplateAreas = new Array(columns);
    // Create two dimensional array.
    for (let i = 0; i < arrayOfGridTemplateAreas.length; i += 1) {
      arrayOfGridTemplateAreas[i] = new Array(rows);
    }

    let h = 0;

    // Add alphabetical chartacters to array.
    for (let i = 0; i < columns; i += 1) {
      for (let j = 0; j < rows; j += 1) {
        arrayOfGridTemplateAreas[i][j] = alphabet[h];
        h += 1;
      }
    }

    let gridTemplateAreas = "";
    // Create the grid-template-areas string.
    arrayOfGridTemplateAreas.forEach((element) => {
      gridTemplateAreas += `'${element.join(" ")}'\n `;
    });

    return gridTemplateAreas;
  }
  rootStyle.gridTemplateAreas = createGrid(configColumns, configRows);
  /**
   * @param {Array} gridArray
   *  The grid array.
   * @returns {string}
   *   The grid-area strings.
   */
  function createGridArea(gridArray) {
    if (gridArray) {
      const lastGridCharacter = gridArray[gridArray.length - 1];
      const firstGridCharacter = gridArray[0];
      return `${firstGridCharacter} / ${firstGridCharacter} / ${lastGridCharacter} / ${lastGridCharacter}`;
    }
    return "a / a / i / i";
  }

  /**
   * @param {object} props
   * the props.
   * @param {object} props.target
   * event target
   */
  function handleChange({ target }) {
    const localTarget = target.value.map((value) => {
      return {
        region: target.id,
        ...value,
      };
    });
    handleInput({ target: { value: localTarget, id: "playlists" } });
  }

  return (
    <>
      <div className="grid" style={rootStyle}>
        {regions &&
          regions.map((data) => (
            <div
              className="grid-item"
              style={{ gridArea: createGridArea(data.gridArea) }}
            >
              {data.name}
            </div>
          ))}
      </div>
      <Tabs
        defaultActiveKey="region1"
        id="uncontrolled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
      >
        {regions &&
          regions.map((data) => (
            <Tab
              style={{ backgroundColor: "beige" }}
              key={data.id}
              eventKey={data.id}
              title={data.name}
            >
              <PlaylistDragAndDrop
                id="playlist_drag_and_drop"
                handleChange={handleChange}
                formId={data.id}
                data={selectedData.filter(
                  (playlistData) => playlistData.region === data.id
                )}
              />
            </Tab>
          ))}
      </Tabs>
    </>
  );
}

GridGenerationAndSelect.propTypes = {
  grid: PropTypes.shape({ columns: PropTypes.number, rows: PropTypes.number })
    .isRequired,
  selectedData: PropTypes.arrayOf(
    PropTypes.shape({ value: PropTypes.number, label: PropTypes.string })
  ).isRequired,
  handleInput: PropTypes.func.isRequired,
  regions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      gridArea: PropTypes.arrayOf(PropTypes.string),
    })
  ).isRequired,
};

export default GridGenerationAndSelect;
