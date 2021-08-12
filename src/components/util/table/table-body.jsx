import { React, Fragment } from "react";
import PropTypes from "prop-types";
import get from "lodash.get";
import ColumnProptypes from "../../proptypes/column-proptypes";
import SelectedRowsProptypes from "../../proptypes/selected-rows-proptypes";
import Calendar from "../../screen-list/calendar";

/**
 * @param {object} props
 * The props.
 * @param {Array} props.columns
 * The columns for the table.
 * @param {Array} props.selectedRows
 * The selected rows array.
 * @param {Array} props.data
 * The data to display.
 * @param {boolean} props.withChart
 * If the table should display a gantt chart
 * @returns {object}
 * The table body.
 */
function TableBody({ columns, selectedRows, data, withChart }) {
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
    return get(item, column.path);
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
    let classes = "";
    if (selectedRows.find((x) => x.id === item.id)) classes += "bg-light";
    return classes;
  }

  return (
    <tbody>
      {data.map((item) => (
        <Fragment key={item.id}>
          <tr
            style={withChart ? { borderBottomColor: "transparent" } : {}}
            className={isRowSelected(item)}
          >
            {columns.map((column) => (
              <td key={item.id + (column.path || column.key)}>
                {renderCell(item, column)}
              </td>
            ))}
          </tr>
          {withChart && (
            <tr className={isRowSelected(item)}>
              <td colSpan="100%" key={item.id}>
                <Calendar playlists={item.playlists} id={item.id} />
              </td>
            </tr>
          )}
        </Fragment>
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
  withChart: PropTypes.bool.isRequired,
};

export default TableBody;
