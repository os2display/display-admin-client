import { React, useState } from "react";
import PropTypes from "prop-types";
import { Tabs, Tab } from "react-bootstrap";
import PlaylistDragAndDrop from "../playlist-drag-and-drop/playlist-drag-and-drop";
import "./grid.scss";
/**
 * Screen component.
 *
 * @param {object} props
 *   Props.
 * @param {object} props.screen
 *   The screen data.
 * @returns {JSX.Element}
 *   The component.
 */
function Grid({ grid, handleInput, selectedData }) {
  console.log(selectedData);
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

  const configColumns = grid?.grid?.columns || 1;
  const configRows = grid?.grid?.rows || 1;
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
   * @param {Array} grid
   *  The grid array.
   * @returns {string}
   *   The grid-area strings.
   */
  function createGridArea(grid) {
    if (grid) {
      const lastGridCharacter = grid[grid.length - 1];
      const firstGridCharacter = grid[0];
      return `${firstGridCharacter} / ${firstGridCharacter} / ${lastGridCharacter} / ${lastGridCharacter}`;
    }
    return "a / a / i / i";
  }

  function handleChange({ target }) {
    let localTarget = target.value.map((value) => {
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
        {grid?.regions &&
          grid.regions.map((data) => (
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
        {grid?.regions &&
          grid.regions.map((data) => (
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

export default Grid;
