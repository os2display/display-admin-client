import React from "react";
import PropTypes from "prop-types";
import ColumnProptypes from "../../proptypes/column-proptypes";
import SelectedRowsProptypes from "../../proptypes/selected-rows-proptypes";

/**
 * @param {object} props
 * The props.
 * @param {Array} props.columns
 * The columns for the table.
 * @param {Array} props.selectedRows
 * The selected rows array.
 * @param {Array} props.data
 * The data to display.
 * @returns {object}
 * The table body.
 */
function TableBody({ columns, selectedRows, data }) {
  /**
   * Renders a cell with the content received.
   *
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
   * Styles a row if it is selected.
   *
   * @param {object} item
   * The data item.
   * @returns {string}
   * Class for styling.
   */
  function isRowSelected(item) {
    if (selectedRows.find((x) => x.id === item.id)) return "bg-light";
    return "";
  }
  return (
    <tbody>
      {data.map((item) => (
        <tr className={isRowSelected(item)} key={item.id}>
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
  selectedRows: SelectedRowsProptypes.isRequired,
};

export default TableBody;
