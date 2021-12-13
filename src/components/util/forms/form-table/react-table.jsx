import { React } from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import TableComponent from "./table-component";
import "./react-table.scss";

/**
 * This file is built on
 * https://github.com/tannerlinsley/react-table/tree/master/examples/editable-data
 *
 * @param {object} props The props.
 * @param {object} props.data The table data
 * @param {object} props.columns The table columns
 * @param {Function} props.updateTableData Callback on data change
 * @returns {object} The react table
 */
function ReactTable({ data, columns, updateTableData }) {
  const { t } = useTranslation("common");

  return (
    <TableComponent
      columns={[
        ...columns,
        {
          id: "delete",
          accessor: () => "delete",
          // eslint-disable-next-line react/prop-types
          Cell: ({ row }) => (
            <Button
              variant="danger"
              // eslint-disable-next-line react/prop-types
              onClick={() => updateTableData(data.splice(row.index, 1))}
            >
              {t("react-table.remove-row")}
            </Button>
          ),
        },
      ]}
      data={data}
      updateTableData={updateTableData}
    />
  );
}

ReactTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
  columns: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
  updateTableData: PropTypes.func.isRequired,
};

export default ReactTable;
