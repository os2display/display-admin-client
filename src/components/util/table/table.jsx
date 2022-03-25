import React from "react";
import PropTypes from "prop-types";
import TableHeader from "./table-header";
import TableBody from "./table-body";
import ColumnProptypes from "../../proptypes/column-proptypes";
import SelectedRowsProptypes from "../../proptypes/selected-rows-proptypes";

/**
 * @param {object} props The props.
 * @param {Array} props.columns The columns for the table.
 * @param {Array} props.selectedRows The selected rows array.
 * @param {Array} props.data The data to display in the table.
 * @returns {object} The table.
 */
function Table({ columns, selectedRows, data }) {
  return (
    <div className="table-responsive">
      <table className="table table-hover">
        <TableHeader columns={columns} />
        <TableBody selectedRows={selectedRows} columns={columns} data={data} />
      </table>
    </div>
  );
}
Table.defaultProps = {
  selectedRows: [],
};

Table.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({ name: PropTypes.string, "@id": PropTypes.string })
  ).isRequired,
  columns: ColumnProptypes.isRequired,
  selectedRows: SelectedRowsProptypes,
};
export default Table;
