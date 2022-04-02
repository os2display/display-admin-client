import React from "react";
import PropTypes from "prop-types";
import TableHeader from "./table-header";
import TableBody from "./table-body";
import ColumnProptypes from "../../proptypes/column-proptypes";

/**
 * @param {object} props The props.
 * @param {Array} props.columns The columns for the table.
 * @param {Array} props.data The data to display in the table.
 * @returns {object} The table.
 */
function Table({ columns, data }) {
  return (
    <div className="table-responsive">
      <table className="table table-hover">
        <TableHeader columns={columns} />
        <TableBody columns={columns} data={data} />
      </table>
    </div>
  );
}

Table.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({ name: PropTypes.string, "@id": PropTypes.string })
  ).isRequired,
  columns: ColumnProptypes.isRequired,
};
export default Table;
