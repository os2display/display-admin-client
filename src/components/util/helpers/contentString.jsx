import { useIntl } from "react-intl";

/**
 * @param {Array} content - the content to create a string from.
 * @returns {string} a string with commas and "and".
 */
function contentString(content) {
  const intl = useIntl();
  const and = intl.formatMessage({ id: "and" });

  const namesOfCells = content.map((cell) => cell.name);
  let returnContentString = "";
  if (namesOfCells.length === 1) {
    returnContentString = `${namesOfCells.join(", ")}`;
  } else {
    returnContentString = `${namesOfCells
      .slice(0, -1)
      .join(", ")} ${and} ${namesOfCells.slice(-1)}`;
  }
  return returnContentString;
}

export default contentString;
