import React from "react";
import PropTypes from "prop-types";
import TableHeader from "./table-header";
import TableBody from "./table-body";
import SortColumnProptypes from "../../proptypes/sort-column-proptypes";
import ColumnProptypes from "../../proptypes/column-proptypes";
import SelectedRowsProptypes from "../../proptypes/selected-rows-proptypes";

/**
 * @param {object} props The props.
 * @param {Array} props.columns The columns for the table.
 * @param {Array} props.selectedRows The selected rows array.
 * @param {object} props.onSort The callback for sort.
 * @param {object} props.sortColumn The column to sortby.
 * @param {Array} props.data The data to display in the table.
 * @param {boolean} props.withChart If the table should display a gantt chart
 * @returns {object} The table.
 */
function Table({
  columns,
  selectedRows,
  onSort,
  sortPath,
  sortOrder,
  data,
  withChart,
}) {
  return (
    <div className="table-responsive">
      <table className="table table-hover">
        <TableHeader
          columns={columns}
          onSort={onSort}
          sortPath={sortPath}
          sortOrder={sortOrder}
        />
        <TableBody
          withChart={withChart}
          selectedRows={selectedRows}
          columns={columns}
          data={data}
        />
      </table>
    </div>
  );
}
Table.defaultProps = {
  selectedRows: [],
  onSort: () => {},
  sortColumn: {},
  withChart: false,
};

Table.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({ name: PropTypes.string, id: PropTypes.number })
  ).isRequired,
  sortColumn: SortColumnProptypes,
  onSort: PropTypes.func,
  columns: ColumnProptypes.isRequired,
  selectedRows: SelectedRowsProptypes,
  withChart: PropTypes.bool,
};
export default Table;
