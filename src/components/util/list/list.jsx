import { React, useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useHistory, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import Table from "../table/table";
import SearchBox from "../search-box/search-box";
import Pagination from "../paginate/pagination";
import ColumnProptypes from "../../proptypes/column-proptypes";
import SelectedRowsProptypes from "../../proptypes/selected-rows-proptypes";
import MergeModal from "../../merge-modal/merge-modal";

/**
 * @param {object} props
 * The props.
 * @param {Array} props.data
 * The data for the list.
 * @param {Array} props.columns
 * The columns for the table.
 * @param {Array} props.selectedRows
 * The selected rows, for styling.
 * @param {object} props.showMerge
 * Whether to show the merge button.
 * @param {Function} props.clearSelectedRows
 * Callback to clear the selected rows.
 * @param {boolean} props.withChart
 * If the list should display a gantt chart
 * @returns {object}
 * The List.
 */
function List({
  data,
  columns,
  selectedRows,
  showMerge,
  clearSelectedRows,
  withChart,
  handlePageChange,
  totalItems,
  currentPage,
  handleDelete,
}) {
  const { t } = useTranslation("common");
  const { search } = useLocation();
  const history = useHistory();
  const searchParams = new URLSearchParams(search).get("search");
  const sortParams = new URLSearchParams(search).get("sort");
  const orderParams = new URLSearchParams(search).get("order");
  const pageParams = new URLSearchParams(search).get("page");
  // At least two rows must be selected for merge.
  const disableMergeButton = selectedRows.length < 2;
  // At least one row must be selected for deletion.
  const disableDeleteButton = !selectedRows.length > 0;
  const [searchText, setSearchText] = useState(
    searchParams !== null ? searchParams : ""
  );
  const [sortBy, setSortBy] = useState({
    path: sortParams || "name",
    order: orderParams || "asc",
  });
  const pageSize = 10;
  const [showMergeModal, setViewMergeModal] = useState(false);

  /**
   * @param {string} newSearchText
   * Updates the search text state and url.
   */
  function handleSearch(newSearchText) {
    setSearchText(newSearchText);
  }

  /**
   * If they search or filter, the pagination is reset.
   */
  useEffect(() => {
    const params = new URLSearchParams(search);
    // if (searchText) {
    //   params.delete("search");
    //   params.append("search", searchText);
    // }
    // params.delete("sort");
    // params.append("sort", sortBy.path);
    // params.delete("order");
    // params.append("order", sortBy.order);
    history.replace({ search: params.toString() });
  }, [searchText, sortBy, currentPage]);

  /**
   * If they search or filter, the pagination is reset.
   */
  useEffect(() => {
    if (pageParams) {
      handlePageChange(parseInt(pageParams));
    } else {
      updateUrlAndChangePage(1);
    }
  }, [pageParams]);

  function updateUrlAndChangePage(currentPage) {
    const params = new URLSearchParams(search);
    params.delete("page");
    params.append("page", currentPage);
    history.replace({ search: params.toString() });
    handlePageChange(currentPage);
  }

  /**
   *Todo
   */
  function handleSort() {}

  /**
   * Closes merge modal.
   */
  function onCloseMergeModal() {
    setViewMergeModal(false);
  }

  /**
   * Should handle merge.
   */
  function handleMerge() {
    // @TODO merge elements
    setViewMergeModal(false);
  }

  return (
    <>
      <Row className="my-2">
        <Col>
          <SearchBox value={searchText} onChange={handleSearch} />
        </Col>
        <Col className="d-flex justify-content-end">
          <Button
            variant="danger"
            id="delete-button"
            disabled={disableDeleteButton}
            onClick={() => handleDelete()}
            className="me-3"
          >
            {t("list.delete-button")}
          </Button>

          {showMerge && (
            <Button
              className="me-3"
              id="merge-button"
              disabled={disableMergeButton}
              onClick={() => setViewMergeModal(true)}
              variant="success"
            >
              {t("list.merge-button")}
            </Button>
          )}
          <Button
            id="clear-rows-button"
            disabled={selectedRows.length === 0}
            onClick={() => clearSelectedRows()}
            variant="dark"
          >
            {t("list.deselect-all")}
          </Button>
        </Col>
      </Row>
      <Table
        onSort={handleSort}
        data={data}
        sortColumn={sortBy}
        columns={columns}
        selectedRows={selectedRows}
        withChart={withChart}
      />
      <Pagination
        itemsCount={totalItems}
        pageSize={pageSize}
        currentPage={parseInt(pageParams)}
        onPageChange={updateUrlAndChangePage}
      />
      <MergeModal
        show={showMergeModal}
        handleAccept={handleMerge}
        onClose={onCloseMergeModal}
        dataStructureToDisplay={selectedRows}
      />
    </>
  );
}

List.defaultProps = {
  showMerge: false,
  withChart: false,
  currentPage: 1,
};

List.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({ name: PropTypes.string, id: PropTypes.number })
  ).isRequired,
  columns: ColumnProptypes.isRequired,
  selectedRows: SelectedRowsProptypes.isRequired,
  showMerge: PropTypes.bool,
  clearSelectedRows: PropTypes.func.isRequired,
  handlePageChange: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  withChart: PropTypes.bool,
  totalItems: PropTypes.number.isRequired,
  currentPage: PropTypes.number,
};
export default List;
