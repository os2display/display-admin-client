/**
 * @param {object} strng - the url to cut id from.
 */
function idFromUrl(string) {
  return string.substring(string.lastIndexOf("/") + 1, string.length);
}

export default idFromUrl;
