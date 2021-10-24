import { Fragment, React } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSort,
  faSortDown,
  faSortUp,
} from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import ColumnProptypes from "../../proptypes/column-proptypes";
import "./table-header.scss";

/**
 * @param {object} props The props.
 * @param {Array} props.columns The columns for the table.
 * @param {Function} props.onSort Callback for on sort.
 * @param {boolean} props.draggable If table has draggable rows.
 * @param {string} props.sortPath The path to sort by
 * @param {string} props.sortOrder the order asc/desc
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
    let newSortOrder;
    let newSortPath;
    if (chosenPath === sortPath) {
      newSortOrder = sortOrder === "asc" ? "desc" : "asc";
      newSortPath = sortPath;
    } else {
      newSortPath = chosenPath;
      newSortOrder = "asc";
    }
    onSort({ path: newSortPath, order: newSortOrder });
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
  onSort: () => {},
  draggable: false,
};

TableHeader.propTypes = {
  columns: ColumnProptypes.isRequired,
  onSort: PropTypes.func,
  draggable: PropTypes.bool,
  sortPath: PropTypes.string.isRequired,
  sortOrder: PropTypes.string.isRequired,
};

export default TableHeader;
