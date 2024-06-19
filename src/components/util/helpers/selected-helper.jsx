/**
 * @param {object} row - The selected row.
 * @param {Array} selectedData - The selected rows.
 * @returns {Array} Updated array with currently selected rows.
 */
function selectedHelper(row, selectedData) {
  const id = row["@id"];
  const alreadySelected = selectedData.find((x) => x.id === id);
  if (alreadySelected) {
    selectedData.splice(selectedData.indexOf(alreadySelected), 1);
  } else {
    selectedData.push({ id: row["@id"], title: row.title, assets: row.assets });
  }
  return selectedData;
}

export default selectedHelper;
