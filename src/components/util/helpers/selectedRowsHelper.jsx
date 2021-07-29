/**
 * @param {object} row - the selected row.
 * @param {Array} selectedRows - the selected rows.
 * @returns {Array} updated array with currently selected rows.
 */
function selectedRowsHelper(row, selectedRows) {
  const { name, id } = row;
  const alreadySelected = selectedRows.find((x) => x.id === id);
  if (alreadySelected) {
    selectedRows.splice(selectedRows.indexOf(alreadySelected), 1);
  } else {
    selectedRows.push({ name, id });
  }
  return selectedRows;
}

export default selectedRowsHelper;
