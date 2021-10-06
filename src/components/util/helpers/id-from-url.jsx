/**
 * @param {object} string - the url to cut id from.
 * @returns {string} the id
 */
function idFromUrl(string) {
  return string.substring(string.lastIndexOf("/") + 1, string.length);
}

export default idFromUrl;
