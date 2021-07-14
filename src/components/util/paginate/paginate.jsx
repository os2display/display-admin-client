/**
 * @param {Array} items
 * The items to paginate.
 * @param {number} pageNumber
 * The chosen page.
 * @param {number} pageSize
 * The page size
 *  @returns {Array}
 *   The paginated items.
 */
function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  return items.slice(startIndex, startIndex + pageSize);
}
export default paginate;
