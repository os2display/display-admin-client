import { Fragment, React } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSort,
  faSortDown,
  faSortUp,
} from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import SortColumnProptypes from "../../proptypes/sort-column-proptypes";
import ColumnProptypes from "../../proptypes/column-proptypes";
import "./table-header.scss";

/**
 * @param {object} props The props.
 * @param {Array} props.columns The columns for the table.
 * @param {object} props.sortColumn The column to sortby.
 * @param {Function} props.onSort Callback for on sort.
 * @param {boolean} props.draggable If table has draggable rows.
 * @returns {object} The table body.
 */
function TableHeader({ columns, sortPath, sortOrder, onSort, draggable }) {
  const { t } = useTranslation("common");

  /**
   * Sorts the rows, according to chosenpath.
   *
   * @param {object} chosenPath The sorting column
   */
  function sort(chosenPath) {
    if (chosenPath === sortPath) {
      sortOrder = sortOrder === "asc" ? "desc" : "asc";
    } else {
      path = chosenPath;
      sortOrder = "asc";
    }
    onSort({ sortPath, sortOrder });
  }

  /**
   * Renders a search icon.
   *
   * @param {object} column The sorting column.
   * @returns {object} The sorting icon.
   */
  function renderSortIcon(column) {
    if (column.path !== sortPath) {
      return <FontAwesomeIcon style={{ color: "grey" }} icon={faSort} />;
    }
    if (sortOrder === "asc") {
      return <FontAwesomeIcon icon={faSortUp} />;
    }
    return <FontAwesomeIcon icon={faSortDown} />;
  }
  return (
    <thead>
      <tr>
        {draggable && (
          <th>
            <span className="visually-hidden">
              {t("drag-and-drop-table.table-header-for-indicator")}
            </span>
          </th>
        )}
        {columns.map((column) => (
          <Fragment key={column.path || column.key}>
            {column.sort && (
              <th
                className="clickable"
                id={`table-header-${column.path}`}
                onClick={() => sort(column.path)}
              >
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

TableHeader.defaultProps = {
  sortColumn: {},
  onSort: () => {},
  draggable: false,
};

TableHeader.propTypes = {
  sortColumn: SortColumnProptypes,
  columns: ColumnProptypes.isRequired,
  onSort: PropTypes.func,
  draggable: PropTypes.bool,
};

export default TableHeader;
