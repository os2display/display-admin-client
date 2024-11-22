import { Fragment, React } from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import ColumnProptypes from "../../proptypes/column-proptypes";
import "./table-header.scss";

/**
 * @param {object} props The props.
 * @param {Array} props.columns The columns for the table.
 * @param {boolean} props.draggable If table has draggable rows.
 * @returns {object} The table body.
 */
function TableHeader({ columns, draggable = false }) {
  const { t } = useTranslation("common");

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
            <th>
              {column.label}
              {column.actions}
            </th>
          </Fragment>
        ))}
      </tr>
    </thead>
  );
}

TableHeader.propTypes = {
  columns: ColumnProptypes.isRequired,
  draggable: PropTypes.bool,
};

export default TableHeader;
