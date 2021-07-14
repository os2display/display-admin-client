import React from "react";
import PropTypes from "prop-types";

function Pagination({ itemsCount, pageSize, onPageChange, currentPage }) {
  const pageCount = Math.ceil(itemsCount / pageSize);
  if (pageCount < currentPage) {
    onPageChange(1);
  }
  if (pageCount <= 1) return null;
  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {pages.map((page) => (
          <li
            style={{ cursor: "pointer" }}
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
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
  );
}

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
