import { React, Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import SortColumnProptypes from "../../proptypes/sort-column-proptypes";
import ColumnProptypes from "../../proptypes/column-proptypes";

function TableHeader({ columns, sortColumn, onSort }) {
  let { path, order } = sortColumn;

  function sort(chosenPath) {
    if (chosenPath === path) {
      order = order === "asc" ? "desc" : "asc";
    } else {
      path = chosenPath;
      order = "asc";
    }
    onSort({ path, order });
  }

  function renderSortIcon(column) {
    if (column.path !== path) {
      return (
        <FontAwesomeIcon
          style={{ opacity: 0 }}
          className="search-icon"
          icon={faSortUp}
        />
      );
    }
    if (order === "asc") {
      return <FontAwesomeIcon className="search-icon" icon={faSortUp} />;
    }
    return <FontAwesomeIcon className="search-icon" icon={faSortDown} />;
  }
  return (
    <thead>
      <tr style={{ cursor: "pointer" }}>
        {columns.map((column) => (
          <Fragment key={column.path || column.key}>
            {column.sort && (
              <th onClick={() => sort(column.path)}>
                {column.label} {renderSortIcon(column)}
              </th>
            )}
            {!column.sort && <th>{column.label}</th>}
          </Fragment>
        ))}
      </tr>
    </thead>
  );
}

TableHeader.propTypes = {
  sortColumn: SortColumnProptypes.isRequired,
  columns: ColumnProptypes.isRequired,
  onSort: PropTypes.func.isRequired,
};

export default TableHeader;
