import React from "react";
import { FormattedMessage } from "react-intl";
import PropTypes from "prop-types";

/**
 * @param {object} props
 * The props.
 * @param {Array} props.data
 * The data for the list.
 * @param {Array} props.columns
 * The columns for the table.
 * @param {Array} props.selectedCells
 * The selected cells, for styling.
 * @returns {object}
 * The List.
 */

/**
 * @param {object} props
 * The props.
 * @param {number} props.itemsCount
 * The amount of data to be spread out in pages.
 * @param {number} props.pageSize
 * The page size
 * @param {Function} props.onPageChange
 * The callback for page change.
 * @param {number} props.currentPage
 * The current page.
 * @returns {object}
 * The pagination.
 */
function Pagination({ itemsCount, pageSize, onPageChange, currentPage }) {
  const pageCount = Math.ceil(itemsCount / pageSize);

  // No need for pagination
  if (pageCount <= 1) return null;

  // Array of numbers from 1 ... pagecount.
  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);
  return (
    <FormattedMessage
      id="aria_pagination_site_navigation"
      defaultMessage="aria_pagination_site_navigation"
    >
      {(message) => (
        <nav aria-label={message}>
          <ul className="pagination">
            {pages.map((page) => (
              <li
                key={page}
                className={
                  page === currentPage ? "page-item active" : "page-item"
                }
              >
                <button
                  type="button"
                  onClick={() => onPageChange(page)}
                  className="page-link"
                >
                  {page}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </FormattedMessage>
  );
}

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
