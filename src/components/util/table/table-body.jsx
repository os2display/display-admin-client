import React from "react";
import PropTypes from "prop-types";
import ColumnProptypes from "../../proptypes/column-proptypes";
import SelectedCellsProptypes from "../../proptypes/selected-cells-proptypes";

/**
 * @param {object} props
 * The props.
 * @param {Array} props.columns
 * The columns for the table.
 * @param {Array} props.selectedCells
 * The selected cells array.
 * @param {Array} props.data
 * The data to display.
 * @returns {object}
 * The table body.
 */
function TableBody({ columns, selectedCells, data }) {
  /**
   * @param {object} item
   * The item to render.
   * @param {object} column
   * the column to render.
   * @returns {object|string}
   * returns a rendered jsx object, or the path.
   */
  function renderCell(item, column) {
    if (column.content) {
      return column.content(item);
    }
    return item[column.path];
  }

  /**
   * @param {object} item
   * The data item.
   * @returns {string}
   * Class for styling.
   */
  function isCellSelected(item) {
    if (selectedCells.find((x) => x.id === item.id)) return "bg-light";
    return "";
  }
  return (
    <tbody>
      {data.map((item) => (
        <tr className={isCellSelected(item)} key={item.id}>
          {columns.map((column) => (
            <td key={item.id + (column.path || column.key)}>
              {renderCell(item, column)}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

TableBody.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({ name: PropTypes.string, id: PropTypes.number })
  ).isRequired,
  columns: ColumnProptypes.isRequired,
  selectedCells: SelectedCellsProptypes.isRequired,
};

export default TableBody;
