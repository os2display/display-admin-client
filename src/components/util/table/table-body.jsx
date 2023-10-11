import { React, Fragment } from "react";
import PropTypes from "prop-types";
import get from "lodash.get";
import useModal from "../../../context/modal-context/modal-context-hook";
import ColumnProptypes from "../../proptypes/column-proptypes";

/**
 * @param {object} props The props.
 * @param {Array} props.columns The columns for the table.
 * @param {Array} props.data The data to display.
 * @returns {object} The table body.
 */
function TableBody({ columns, data }) {
  const { selected } = useModal();

  /**
   * Renders a cell with the content received.
   *
   * @param {object} item The item to render.
   * @param {object} column The column to render.
   * @returns {object | string} Returns a rendered jsx object, or the path.
   */
  function renderCell(item, column) {
    if (column.content) {
      return column.content(item);
    }

    let cellData = get(item, column.path);

    if (column.dataFunction) {
      cellData = column.dataFunction(cellData);
    }

    return cellData;
  }

  /**
   * Styles a row if it is selected.
   *
   * @param {object} item The data item.
   * @returns {string} Class for styling.
   */
  function isRowSelected(item) {
    let classes = "";
    if (selected.find((x) => x.id === item["@id"])) classes += "bg-light";
    return classes;
  }

  return (
    <tbody>
      {data.map((item) => (
        <Fragment key={item["@id"]}>
          <tr className={isRowSelected(item)}>
            {columns.map((column) => (
              <td key={`${item["@id"]}${column.path || column.key}`}>
                {renderCell(item, column)}
              </td>
            ))}
          </tr>
        </Fragment>
      ))}
    </tbody>
  );
}

TableBody.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({ name: PropTypes.string, "@id": PropTypes.string })
  ).isRequired,
  columns: ColumnProptypes.isRequired,
};

export default TableBody;
