import { useIntl } from "react-intl";

/**
 * Creates a string with commas and "and".
 *
 * @param {Array} content - the content to create a string from.
 * @returns {string} a string with commas and "and".
 */
function contentString(content, and) {
  const namesOfRows = content.map((row) => row.name || row.label);
  let returnContentString = "";
  if (namesOfRows.length === 1) {
    returnContentString = `${namesOfRows.join(", ")}`;
  } else {
    returnContentString = `${namesOfRows
      .slice(0, -1)
      .join(", ")} ${and} ${namesOfRows.slice(-1)}`;
  }
  return returnContentString;
}

export default contentString;
