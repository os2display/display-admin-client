/**
 * @param {object} string - The url to cut id from.
 * @returns {string} The id
 */
function idFromUrl(string) {
  if (typeof string === "string") {
    return string.match(/[A-Za-z0-9]{26}/).shift();
  }
  return "";
}

export default idFromUrl;
