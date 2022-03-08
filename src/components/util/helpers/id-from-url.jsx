/**
 * @param {object} string - The url to cut id from.
 * @param {number} index - The index of the id to return
 * @returns {string} The id
 */
function idFromUrl(string, index = 0) {
  if (typeof string === "string") {
    return string.match(/[A-Za-z0-9]{26}/g)[index];
  }
  return "";
}

export default idFromUrl;
