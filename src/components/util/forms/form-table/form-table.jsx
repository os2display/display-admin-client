import { React, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Tabs, Tab, Button, InputGroup, FormControl } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackspace } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import { ulid } from "ulid";
import ReactTable from "./react-table";
import FormInput from "../form-input";

/**
 * A table for forms.
 *
 * @param {string} props The props.
 * @param {string} props.name The name of the table
 * @param {Array} props.value The value of the rich text field
 * @param {Function} props.onChange The callback for changes in the rich text field
 * @param {string} props.formGroupClasses Classes for the form group
 * @returns {object} A table for forms.
 */
function FormTable({ name, onChange, formGroupClasses = "", value = [] }) {
  const { t } = useTranslation("common");
  // Controls the tabs
  const [key, setKey] = useState("manuel");

  // The columns and data of the table
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);

  // The name of the column to add
  const [columnToAddName, setColumnToAddName] = useState("");

  // The data source of the table, if external data is used
  const [dataSource, setDataSource] = useState("");

  // Sets table/source data from content
  useEffect(() => {
    if (value && value.length > 0) {
      setColumns(value[0].columns);
      const valueCopy = [...value];
      valueCopy.shift();
      setData(valueCopy);
    }
    if (value?.dataSource) {
      setDataSource(value.dataSource);
    }
  }, []);

  // Callback to slide manager on changes.
  useEffect(() => {
    let returnTarget;

    if (key === "manuel") {
      const first = [{ type: "header", columns }];
      returnTarget = {
        value: first.concat(data),
        id: name,
      };
    } else {
      returnTarget = {
        value: { dataSource },
        id: name,
      };
    }

    onChange({ target: returnTarget });
  }, [data, columns, dataSource]);

  /**
   * Sets data source in state.
   *
   * @param {object} props The props.
   * @param {object} props.target Event target
   */
  const changeDataSource = ({ target }) => {
    setDataSource(target.value);
  };

  /**
   * Sets column name in state.
   *
   * @param {object} props The props.
   * @param {object} props.target Event target
   */
  const columnNameChanged = ({ target }) => {
    setColumnToAddName(target.value);
  };

  /** Adds a row, adds data entry for each column. */
  const addRow = () => {
    const newDataObject = {};
    const dataCopy = [...data];
    columns.forEach((column) => {
      newDataObject[column.accessor] = "";
      newDataObject.key = `key-${ulid(new Date().getTime())}`;
    });
    dataCopy.push(newDataObject);
    setData(dataCopy);
  };

  /** Adds a column, adds data entry for each column. */
  const addColumn = () => {
    const columnsCopy = [...columns];
    columnsCopy.push({
      Header: columnToAddName,
      key: columnToAddName,
      accessor: `accessor-${ulid(new Date().getTime())}`,
    });
    setColumns(columnsCopy);
    setColumnToAddName("");
  };

  /**
   * Removes a column, and removes the data in that column.
   *
   * @param {number} removeId Colums to remove
   */
  const removeColumn = (removeId) => {
    // remove column
    const columnsCopy = [...columns].filter(
      (column) => column.accessor !== removeId
    );
    setColumns(columnsCopy);

    // remove data connected to column
    const dataCopy = [...data];
    const removeAccessor = columns
      .map((column) => {
        if (column.accessor === removeId) return column.accessor;
        return undefined;
      })
      .filter((anyValue) => typeof anyValue !== "undefined")
      .shift();
    dataCopy.forEach((element) => {
      /* eslint-disable no-param-reassign */
      delete element[removeAccessor];
    });
    setData(dataCopy);
  };

  /**
   * Updates table data.
   *
   * @param {number} rowIndex The index of the row to update.
   * @param {string} columnId The column id of the row to update.
   * @param {string} updateValue The value to update to.
   */
  const updateTableData = (rowIndex, columnId, updateValue) => {
    setData((oldData) =>
      oldData.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...oldData[rowIndex],
            [columnId]: updateValue,
          };
        }
        return row;
      })
    );
  };

  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className={`${formGroupClasses} mb-3`}
    >
      <Tab eventKey="manuel" title={t("form-table.manuel-table-tab-header")}>
        <>
          <InputGroup className="mb-3">
            <Button
              variant="outline-secondary"
              type="button"
              disabled={columnToAddName.length === 0}
              onClick={addColumn}
              style={{ marginTop: "0" }}
              size="m"
            >
              {t("form-table.button-add-column")}
            </Button>
            <FormControl
              name="column"
              type="text"
              label={t("form-table.input-label-add-column")}
              value={columnToAddName}
              onChange={columnNameChanged}
            />
          </InputGroup>
          <small>{t("form-table.input-helptext-add-column")}</small>
        </>
        <ReactTable
          data={data}
          columns={columns}
          updateTableData={updateTableData}
        />
        {columns.length > 0 && (
          <>
            <h2 className="h4 mt-2">{t("form-table.remove-column-header")}</h2>
            <ul className="list-group mb-2">
              {columns
                .filter(({ Header }) => Header) // Remove select column
                .map(({ Header, accessor }) => (
                  <li key={accessor} className="list-group-item">
                    <div className="d-flex justify-content-between align-items-center">
                      {Header}
                      <FontAwesomeIcon
                        onClick={() => removeColumn(accessor)}
                        icon={faBackspace}
                      />
                    </div>
                  </li>
                ))}
            </ul>
          </>
        )}
        <Button
          disabled={columns.length === 0}
          variant="primary"
          className="mt-2 mr-2"
          onClick={addRow}
          type="button"
          size="lg"
        >
          {t("form-table.add-row-button")}
        </Button>
      </Tab>
      <Tab eventKey="datasource" title={t("form-table.data-source-tab-header")}>
        <FormInput
          name="dataSource"
          type="text"
          label={t("form-table.data-source-label")}
          value={dataSource}
          helpText={t("form-table.data-source-help-text")}
          onChange={changeDataSource}
        />
      </Tab>
    </Tabs>
  );
}

FormTable.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.arrayOf(
    PropTypes.shape({
      columns: PropTypes.arrayOf(
        PropTypes.shape({
          Header: PropTypes.string,
          accessor: PropTypes.string,
          key: PropTypes.string,
        })
      ),
      type: PropTypes.string,
    })
  ),
  formGroupClasses: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default FormTable;
