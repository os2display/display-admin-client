/* eslint-disable react/jsx-props-no-spreading */
import { React } from "react";
import PropTypes from "prop-types";
import { useTable } from "react-table";
import EditableCell from "./editable-cell";

// Set our editable cell renderer as the default Cell renderer
const defaultColumn = {
  Cell: EditableCell,
};

/**
 * The table, react-table
 *
 * @param {object} props The props.
 * @param {object} props.data The table data
 * @param {object} props.columns The table columns
 * @param {Function} props.updateTableData Callback on data change
 * @returns {object} The table component
 */
function TableComponent({ columns, data, updateTableData }) {
  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, rows } =
    useTable({
      columns,
      data,
      defaultColumn,
      updateTableData,
    });

  return (
    <table className="table" {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

TableComponent.propTypes = {
  data: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
  columns: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
  updateTableData: PropTypes.func.isRequired,
};

export default TableComponent;
