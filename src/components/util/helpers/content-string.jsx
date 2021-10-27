/**
 * Creates a string with commas and "and".
 *
 * @param {Array} content - The content to create a string from.
 * @param {string} andString - The string between the two last options.
 * @returns {string} A string with commas and "and".
 */
function contentString(content, andString) {
  const namesOfRows = content.map((row) => row.name || row.label);
  let returnContentString = "";
  if (namesOfRows.length === 1) {
    returnContentString = `${namesOfRows.join(", ")}`;
  } else {
    returnContentString = `${namesOfRows
      .slice(0, -1)
      .join(", ")} ${andString} ${namesOfRows.slice(-1)}`;
  }
  return returnContentString;
}

export default contentString;
