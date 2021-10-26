import { React, useEffect } from "react";
import { Button, Col, Row, Spinner, Toast } from "react-bootstrap";
import { useHistory, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import Table from "../table/table";
import SearchBox from "../search-box/search-box";
import Pagination from "../paginate/pagination";
import ColumnProptypes from "../../proptypes/column-proptypes";
import SelectedRowsProptypes from "../../proptypes/selected-rows-proptypes";
import RadioButtons from "../forms/radio-buttons";

/**
 * @param {object} props - The props.
 * @param {Array} props.data - The data for the list.
 * @param {Array} props.columns - The columns for the table.
 * @param {Array} props.selectedRows - The selected rows, for styling.
 * @param {Function} props.clearSelectedRows - Callback to clear the selected rows.
 * @param {boolean} props.withChart - If the list should display a gantt chart
 * @param {Function} props.handlePageChange - For changing the page
 * @param {number} props.totalItems - The total items, for pagination.
 * @param {Function} props.handleDelete - For deleting elements in the list.
 * @param {boolean} props.deleteSuccess - If the calling component has deleted element with success.
 * @param {boolean} props.error - If the calling component has an error.
 * @param {Function} props.handleSort -  callback for sort.
 * @param {Function} props.handleSearch - callback for seach.
 * @param {boolean} props.isLoading - If the calling component is loading data.
 * @param {boolean} props.displayPublished - Whether to display the published filter
 * @param {Function} props.handleIsPublished - callback for published filter.
 * @returns {object} The List.
 */
function List({
  data,
  columns,
  displayPublished,
  selectedRows,
  clearSelectedRows,
  deleteSuccess,
  error,
  withChart,
  handlePageChange,
  handleSort,
  handleSearch,
  totalItems,
  isLoading,
  handleDelete,
  handleIsPublished,
}) {
  const { t } = useTranslation("common");
  const history = useHistory();
  // Page params
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search).get("search");
  const sortParams = new URLSearchParams(search).get("sort");
  const orderParams = new URLSearchParams(search).get("order");
  const pageParams = new URLSearchParams(search).get("page");
  let publishedParams;
  if (displayPublished) {
    publishedParams = new URLSearchParams(search).get("published");
  }
  // At least one row must be selected for deletion.
  const disableDeleteButton = !selectedRows.length > 0;
  const pageSize = 10;

  /**
   * @param {string} dataKey - which data to delete/update
   * @param {object} value - the update value
   */
  function updateUrlParams(dataKey, value) {
    const params = new URLSearchParams(search);
    params.delete(dataKey);
    if (value) {
      params.append(dataKey, value);
    }
    history.replace({ search: params.toString() });
  }

  /** @param {string} newSearchText Updates the search text state and url. */
  function onSearch(newSearchText) {
    updateUrlParams("search", newSearchText);
  }

  /** @param {string} isPublished Updates the search text state and url. */
  function onIsPublished({ target }) {
    updateUrlParams("published", target.value);
  }

  /** @param {number} nextPage - The next page. */
  function updateUrlAndChangePage(nextPage) {
    updateUrlParams("page", nextPage);
  }

  /** @param {number} isPublished - Is published. */
  function updateUrlPublished(isPublished) {
    updateUrlParams("published", isPublished);
  }

  /** @param {number} sortByInput - The next page. */
  function updateUrlAndSort(sortByInput) {
    const params = new URLSearchParams(search);
    params.delete("sort");
    params.delete("order");
    params.append("sort", sortByInput.path);
    params.append("order", sortByInput.order);
    history.replace({ search: params.toString() });
  }

  /** Sets page from url using callback */
  useEffect(() => {
    if (pageParams) {
      handlePageChange(parseInt(pageParams, 10));
    } else {
      updateUrlAndChangePage(1);
    }
  }, [pageParams]);

  useEffect(() => {
    if (orderParams && sortParams) {
      handleSort({
        path: sortParams,
        order: orderParams,
      });
    } else {
      updateUrlAndSort({
        path: "title",
        order: "asc",
      });
    }
  }, [orderParams, sortParams]);

  useEffect(() => {
    if (searchParams) {
      handleSearch(searchParams);
    } else {
      handleSearch("");
    }
  }, [searchParams]);

  useEffect(() => {
    if (publishedParams) {
      handleIsPublished(publishedParams);
    } else {
      updateUrlPublished("all");
      handleIsPublished("all");
    }
  }, [publishedParams]);

  return (
    <>
      <Toast show={deleteSuccess} text={t("list.get-error")} />
      <Toast show={error} text={t("list.deleted")} />
      <Row className="my-2">
        <Col>
          <SearchBox value={searchParams} onChange={onSearch} />
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
      <Row>
        <Col className="d-flex justify-content-center">
          {isLoading && <Spinner animation="border" className="m-5" />}
        </Col>
      </Row>
      <Row>
        {displayPublished && (
          <RadioButtons
            label={t("list.published-label")}
            labelScreenReaderOnly
            selected={publishedParams}
            radioGroupName="published"
            options={[
              { id: "all", label: t("list.radio-labels.all") },
              { id: "published", label: t("list.radio-labels.published") },
              {
                id: "not-published",
                label: t("list.radio-labels.not-published"),
              },
            ]}
            handleChange={onIsPublished}
          />
        )}
      </Row>
      {!isLoading && (
        <Table
          onSort={updateUrlAndSort}
          data={data}
          sortOrder={orderParams}
          sortPath={sortParams}
          columns={columns}
          selectedRows={selectedRows}
          withChart={withChart}
        />
      )}
      <Pagination
        itemsCount={totalItems}
        pageSize={pageSize}
        currentPage={parseInt(pageParams, 10)}
        onPageChange={updateUrlAndChangePage}
      />
    </>
  );
}

List.defaultProps = {
  withChart: false,
  handleIsPublished: () => {},
};

List.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({ name: PropTypes.string, id: PropTypes.number })
  ).isRequired,
  columns: ColumnProptypes.isRequired,
  selectedRows: SelectedRowsProptypes.isRequired,
  clearSelectedRows: PropTypes.func.isRequired,
  handlePageChange: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  withChart: PropTypes.bool,
  totalItems: PropTypes.number.isRequired,
  deleteSuccess: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  handleSort: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
  displayPublished: PropTypes.bool.isRequired,
  handleIsPublished: PropTypes.func,
};

export default List;
