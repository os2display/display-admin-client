import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactPaginate from "react-paginate";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

/**
 * @param {object} props The props.
 * @param {number} props.itemsCount The amount of data to be spread out in pages.
 * @param {number} props.pageSize The page size
 * @param {Function} props.onPageChange The callback for page change.
 * @param {number} props.currentPage The current page.
 * @returns {object} The pagination.
 */
function Pagination({ itemsCount, pageSize, onPageChange, currentPage }) {
  const { t } = useTranslation("common", { keyPrefix: "pagination" });
  const pageCount = Math.ceil(itemsCount / pageSize);
  // No need for pagination
  if (pageCount <= 1) return null;

  /**
   * A function to align pagination data with the data we need, our pages are
   * not 0-indexed.
   *
   * @param {object} props - The props.
   * @param {Array} props.selected The selected page
   */
  const changePage = ({ selected }) => {
    onPageChange(selected + 1);
  };

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel={
        <FontAwesomeIcon
          aria-label={t("pagination-next")}
          icon={faAngleRight}
        />
      }
      pageCount={Math.ceil(itemsCount / pageSize)}
      previousLabel={
        <FontAwesomeIcon
          aria-label={t("pagination-previous")}
          icon={faAngleLeft}
        />
      }
      renderOnZeroPageCount={null}
      onPageChange={changePage}
      pageClassName="page-item"
      pageLinkClassName="page-link"
      previousClassName="page-item"
      previousLinkClassName="page-link"
      nextClassName="page-item"
      nextLinkClassName="page-link"
      breakClassName="page-item"
      breakLinkClassName="page-link"
      containerClassName="pagination"
      pageRangeDisplayed={3}
      marginPagesDisplayed={2}
      activeClassName="active"
      forcePage={currentPage - 1}
    />
  );
}

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
