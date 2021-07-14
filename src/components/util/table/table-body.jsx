import React from "react";
import PropTypes from "prop-types";
import ColumnProptypes from "../../proptypes/column-proptypes";
import SelectedCellsProptypes from "../../proptypes/selected-cells-proptypes";

function TableBody({
  data,
  columns,
  pathProperty,
  valueProperty,
  keyProperty,
  selectedCells,
}) {
  function renderCell(item, column) {
    if (column.content) {
      return column.content(item);
    }
    return item[column.path];
  }

  function isCellSelected(item) {
    if (selectedCells.find((x) => x.id === item.id)) return "bg-light";
    return "";
  }
  return (
    <tbody>
      {data.map((item) => (
        <tr className={isCellSelected(item)} key={item[valueProperty]}>
          {columns.map((column) => (
            <td
              key={
                item[valueProperty] +
                (column[pathProperty] || column[keyProperty])
              }
            >
              {renderCell(item, column)}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

TableBody.defaultProps = {
  pathProperty: "path",
  valueProperty: "id",
  keyProperty: "key",
};

TableBody.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({ name: PropTypes.string, id: PropTypes.number })
  ).isRequired,
  columns: ColumnProptypes.isRequired,
  selectedCells: SelectedCellsProptypes.isRequired,
  pathProperty: PropTypes.string,
  valueProperty: PropTypes.string,
  keyProperty: PropTypes.string,
};

export default TableBody;
