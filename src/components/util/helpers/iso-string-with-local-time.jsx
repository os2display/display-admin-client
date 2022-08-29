/**
 * @param {number} date - The date to convert
 * @returns {string} The converted date
 */
function isoStringWithLocalTime(date) {
  if (date) {
    const timeZoneOffset = new Date().getTimezoneOffset() * 60000; // Offset in milliseconds
    return new Date(new Date(date) - timeZoneOffset).toISOString();
  }
  return null;
}

export default isoStringWithLocalTime;
