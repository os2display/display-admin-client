/**
 * @param {object} row - the selected row.
 * @param {Array} selectedData - the selected rows.
 * @returns {Array} updated array with currently selected rows.
 */
function selectedHelper(row, selectedData) {
  const { name, id } = row;
  const alreadySelected = selectedData.find((x) => x.id === id);
  if (alreadySelected) {
    selectedData.splice(selectedData.indexOf(alreadySelected), 1);
  } else {
    selectedData.push({ name, id });
  }
  return selectedData;
}

export default selectedHelper;
