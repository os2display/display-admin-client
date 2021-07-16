import React from "react";
import PropTypes from "prop-types";
import TableHeader from "./table-header";
import TableBody from "./table-body";
import SortColumnProptypes from "../../proptypes/sort-column-proptypes";
import ColumnProptypes from "../../proptypes/column-proptypes";
import SelectedRowsProptypes from "../../proptypes/selected-rows-proptypes";

/**
 * @param {object} props
 * The props.
 * @param {Array} props.columns
 * The columns for the table.
 * @param {Array} props.selectedRows
 * The selected rows array.
 * @param {object} props.onSort
 * The callback for sort.
 * @param {object} props.sortColumn
 * The column to sortby.
 * @param {Array} props.data
 * The data to display in the table.
 * @returns {object}
 * The table.
 */
function Table({ columns, selectedRows, onSort, sortColumn, data }) {
  return (
    <table className="table">
      <TableHeader columns={columns} onSort={onSort} sortColumn={sortColumn} />
      <TableBody selectedRows={selectedRows} columns={columns} data={data} />
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
  selectedRows: SelectedRowsProptypes.isRequired,
};
export default Table;
