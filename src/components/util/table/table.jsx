import React from "react";
import PropTypes from "prop-types";
import TableHeader from "./table-header";
import TableBody from "./table-body";
import ColumnProptypes from "../../proptypes/column-proptypes";
import PaginationButton from "../forms/multiselect-dropdown/pagination-button";

/**
 * @param {object} props The props.
 * @param {Array} props.columns The columns for the table.
 * @param {Array} props.data The data to display in the table.
 * @param {Function} props.callback - The callback.
 * @param {string} props.label - The label.
 * @param {number} props.totalItems - Total data items.
 * @param {bool} props.isFetching - Fetching items.
 * @returns {object} The table.
 */
function Table({ columns, data, label, callback, totalItems, isFetching }) {
  const showButton = Number.isInteger(totalItems) && totalItems > data.length;

  return (
    <div className="table-responsive">
      <table className="table table-hover">
        <TableHeader columns={columns} />
        {!isFetching && (
          <TableBody columns={columns} data={data} />
        )}
      </table>
      <PaginationButton
        showButton={showButton}
        label={label}
        callback={callback}
      />
    </div>
  );
}

Table.defaultProps = {
  label: null,
  callback: null,
  totalItems: null,
  isFetching: false,
};

Table.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({ name: PropTypes.string, "@id": PropTypes.string })
  ).isRequired,
  columns: ColumnProptypes.isRequired,
  label: PropTypes.string,
  callback: PropTypes.func,
  totalItems: PropTypes.number,
  isFetching: PropTypes.bool,
};

export default Table;
