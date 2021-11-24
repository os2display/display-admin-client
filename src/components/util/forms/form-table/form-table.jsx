import { React, useEffect, useState } from "react";
import DataGrid from "react-data-grid";
import { SelectColumn } from "react-data-grid";
import { TextEditor } from "react-data-grid";
import { MultiSelect } from "react-multi-select-component";
import { Button } from "react-bootstrap";

function FormTable() {
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [selectedRows, setSelectedRows] = useState(() => new Set());

  function rowKeyGetter(row) {
    return row.id;
  }

  function addRow({ timeStamp }) {
    let arrayOfObjects = {};
    let rowsCopy = [...rows];
    columns.forEach(({ key }) => {
      arrayOfObjects.title = timeStamp;
      arrayOfObjects.id = timeStamp;
      key = timeStamp;
    });
    rowsCopy.push(arrayOfObjects);
    setRows(rowsCopy);
  }

  function addColumn(column) {
    console.log(column);
    let columnsToAdd = column.map(function (element) {
      return {
        key: element.value || element.key,
        name: element.value || element.name,
        id: element.value || element.id,
        label: element.value || element.label,
        editable: true,
        editor: TextEditor,
      };
    });
    columnsToAdd.unshift(SelectColumn);
    debugger;
    setColumns(columnsToAdd);
    setSelectedColumns(
      columnsToAdd.filter((option) => {
        if (option.id) return option;
      })
    );
  }

  function deleteSelectedRows() {
    let selectedRowsArray = [...selectedRows];
    setRows(rows.filter((option) => !selectedRowsArray.includes(option.id)));
    setSelectedRows(() => new Set());
  }

  return (
    <>
      <DataGrid
        defaultColumnOptions={{
          resizable: true,
        }}
        selectedRows={selectedRows}
        onSelectedRowsChange={setSelectedRows}
        onRowsChange={setRows}
        rowKeyGetter={rowKeyGetter}
        columns={columns}
        rows={rows}
        rowsCount={rows.length}
      />
      <MultiSelect
        isCreatable={true}
        options={columns.filter((option) => {
          if (option.id) return option;
        })}
        disableSearch={false}
        value={selectedColumns}
        onChange={addColumn}
        hasSelectAll={false}
        id="multi"
      />
      <Button
        disabled={columns.length === 0}
        variant="primary"
        onClick={addRow}
        type="button"
        size="lg"
      >
        add row
      </Button>
      <Button
        disabled={selectedRows.size === 0}
        variant="danger"
        onClick={deleteSelectedRows}
        type="button"
        size="lg"
      >
        slet
      </Button>
    </>
  );
}

export default FormTable;
