import { React, useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useHistory, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import Table from "../table/table";
import SearchBox from "../search-box/search-box";
import Pagination from "../paginate/pagination";
import ColumnProptypes from "../../proptypes/column-proptypes";
import SelectedRowsProptypes from "../../proptypes/selected-rows-proptypes";
import RadioButtons from "../forms/radio-buttons";
import ListLoading from "../loading-component/list-loading";

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
 *   element with success.
 * @param {Function} props.handleSort - Callback for sort.
 * @param {Function} props.handleSearch - Callback for seach.
 * @param {boolean} props.displayPublished - Whether to display the published filter
 * @param {Function} props.handleIsPublished - Callback for published filter.
 * @returns {object} The List.
 */
function List({
  data,
  columns,
  displayPublished,
  selectedRows,
  clearSelectedRows,
  withChart,
  handlePageChange,
  handleSort,
  handleSearch,
  totalItems,
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

  /** Set url search params using pageParams and localstorage */
  useEffect(() => {
    const params = new URLSearchParams();

    // published
    if (displayPublished) {
      const published = publishedParams || "all";
      params.delete("published");
      params.append("published", published);
    }

    // page
    const page = pageParams || 1;
    params.delete("page");
    params.append("page", page);

    // order
    const order = orderParams || localStorage.order || "asc";
    params.delete("order");
    params.append("order", order);
    localStorage.setItem("order", order);

    // sort
    const sort = sortParams || localStorage.sort || "title";
    params.delete("sort");
    params.append("sort", sort);
    localStorage.setItem("sort", sort);

    // search
    const localSearch = searchParams || localStorage.search || "";
    params.delete("search");

    if (localSearch) {
      localStorage.setItem("search", localSearch);
      params.append("search", localSearch);
    } else {
      localStorage.removeItem("search");
    }

    history.push({ search: params.toString() });
  }, []);

  /**
   * @param {string} dataKey - Which data to delete/update
   * @param {object} value - The update value
   */
  function updateUrlParams(dataKey, value) {
    const params = new URLSearchParams(search);
    params.delete(dataKey);
    params.append(dataKey, value);
    history.push({ search: params.toString() });
  }

  /** @param {string} newSearchText Updates the search text state and url. */
  function onSearch(newSearchText) {
    localStorage.setItem("search", newSearchText); // Search should persist
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

  /** @param {number} sortByInput - The next page. */
  function updateUrlAndSort(sortByInput) {
    const params = new URLSearchParams(search);
    params.delete("sort");
    params.delete("order");
    params.append("sort", sortByInput.path);
    params.append("order", sortByInput.order);
    localStorage.setItem("order", sortByInput.order);
    localStorage.setItem("sort", sortByInput.path);
    history.replace({ search: params.toString() });
  }

  /** Sets page from url using callback */
  useEffect(() => {
    if (pageParams) {
      handlePageChange(parseInt(pageParams, 10));
    }
  }, [pageParams]);

  /** Sets sort from url using callback */
  useEffect(() => {
    if (orderParams && sortParams) {
      handleSort({
        path: sortParams,
        order: orderParams,
      });
    }
  }, [orderParams, sortParams]);

  /** Sets search from url using callback */
  useEffect(() => {
    if (searchParams) {
      handleSearch(searchParams);
    } else {
      handleSearch("");
    }
  }, [searchParams]);

  /** Sets published filter from url using callback */
  useEffect(() => {
    if (publishedParams) {
      handleIsPublished(publishedParams);
    }
  }, [publishedParams]);

  return (
    <>
      <Row className="my-2">
        <Col>
          <SearchBox value={searchParams || ""} onChange={onSearch} />
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
        {displayPublished && publishedParams && (
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
      <Table
        onSort={updateUrlAndSort}
        data={data}
        sortOrder={orderParams}
        sortPath={sortParams}
        columns={columns}
        selectedRows={selectedRows}
        withChart={withChart}
      />
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
  displayPublished: false,
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
  handleSort: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
  displayPublished: PropTypes.bool,
  handleIsPublished: PropTypes.func,
};

export default ListLoading(List);
