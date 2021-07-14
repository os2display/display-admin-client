import React from "react";
import PropTypes from "prop-types";
import TableHeader from "./table-header";
import TableBody from "./table-body";
import SortColumnProptypes from "../../proptypes/sort-column-proptypes";
import ColumnProptypes from "../../proptypes/column-proptypes";
import SelectedCellsProptypes from "../../proptypes/selected-cells-proptypes";

function Table({ columns, selectedCells, onSort, sortColumn, data }) {
  return (
    <table className="table">
      <TableHeader columns={columns} onSort={onSort} sortColumn={sortColumn} />
      <TableBody selectedCells={selectedCells} columns={columns} data={data} />
    </table>
  );
}

Table.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({ name: PropTypes.string, id: PropTypes.number })
  ).isRequired,
  sortColumn: SortColumnProptypes.isRequired,
  onSort: PropTypes.func.isRequired,
  columns: ColumnProptypes.isRequired,
  selectedCells: SelectedCellsProptypes.isRequired,
};
export default Table;
