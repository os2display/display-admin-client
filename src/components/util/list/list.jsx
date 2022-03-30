import { React, useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import Table from "../table/table";
import SearchBox from "../search-box/search-box";
import Pagination from "../paginate/pagination";
import ColumnProptypes from "../../proptypes/column-proptypes";
import SelectedRowsProptypes from "../../proptypes/selected-rows-proptypes";
import ListLoading from "../loading-component/list-loading";
import CalendarList from "../../screen-list/calendar-list";
import localStorageKeys from "../local-storage-keys";
import FormCheckbox from "../forms/form-checkbox";

/**
 * @param {object} props - The props.
 * @param {Array} props.data - The data for the list.
 * @param {Array} props.columns - The columns for the table.
 * @param {Array} props.selectedRows - The selected rows, for styling.
 * @param {Function} props.clearSelectedRows - Callback to clear the selected rows.
 * @param {boolean} props.calendarView - If the list should display a gantt chart
 * @param {Function} props.handlePageChange - For changing the page
 * @param {number} props.totalItems - The total items, for pagination.
 * @param {Function} props.handleDelete - For deleting elements in the list.
 *   element with success.
 * @param {Function} props.handleSearch - Callback for seach.
 * @param {boolean} props.displayPublished - Whether to display the published filter
 * @param {Function} props.handleIsPublished - Callback for published filter.
 * @param {Function} props.handleCreatedByCurrentUser - Callback for created by filter.
 * @param {Array} props.children The children being passed from parent
 * @returns {object} The List.
 */
function List({
  data,
  columns,
  displayPublished,
  selectedRows,
  clearSelectedRows,
  calendarView,
  handlePageChange,
  handleSearch,
  totalItems,
  handleDelete,
  handleIsPublished,
  handleCreatedByCurrentUser,
  children,
}) {
  const { t } = useTranslation("common", { keyPrefix: "list" });
  const navigate = useNavigate();

  // Page params
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search).get("search");
  const pageParams = new URLSearchParams(search).get("page");

  let createdByParams;
  if (handleCreatedByCurrentUser) {
    createdByParams = new URLSearchParams(search).get("createdBy");
  }

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

    // createdBy
    if (handleCreatedByCurrentUser) {
      const createdBy = createdByParams || "all";
      params.delete("createdBy");
      params.append("createdBy", createdBy);
    }

    // search
    const localSearch = searchParams || localStorage.search || "";
    params.delete("search");

    if (localSearch) {
      localStorage.setItem(localStorageKeys.SEARCH, localSearch);
      params.append("search", localSearch);
    } else {
      localStorage.removeItem(localStorageKeys.SEARCH);
    }

    navigate({
      search: params.toString(),
    });
  }, []);

  /**
   * @param {string} dataKey - Which data to delete/update
   * @param {object} value - The update value
   */
  function updateUrlParams(dataKey, value) {
    const params = new URLSearchParams(search);
    params.delete(dataKey);
    params.append(dataKey, value);
    navigate({
      search: params.toString(),
    });
  }

  /** @param {string} newSearchText Updates the search text state and url. */
  function onSearch(newSearchText) {
    localStorage.setItem(localStorageKeys.SEARCH, newSearchText); // Search should persist
    const params = new URLSearchParams(search);
    params.delete("search");
    params.append("search", newSearchText);
    params.delete("page");
    params.append("page", 1);
    navigate({
      search: params.toString(),
    });
  }

  /** @param {string} isPublished Updates the search text state and url. */
  function onIsPublished({ target }) {
    if (target.value) {
      updateUrlParams("published", target.id);
    } else {
      updateUrlParams("published", "all");
    }
  }

  /** @param {string} createdBy Updates the search text state and url. */
  function onIsCreatedByChange({ target }) {
    if (target.value) {
      updateUrlParams("createdBy", target.id);
    } else {
      updateUrlParams("createdBy", "all");
    }
  }

  /** @param {number} nextPage - The next page. */
  function updateUrlAndChangePage(nextPage) {
    updateUrlParams("page", nextPage);
  }

  /** Sets page from url using callback */
  useEffect(() => {
    if (pageParams) {
      handlePageChange(parseInt(pageParams, 10));
    }
  }, [pageParams]);

  /** Sets page from url using callback */
  useEffect(() => {
    if (createdByParams) {
      handleCreatedByCurrentUser(createdByParams);
    }
  }, [createdByParams]);

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
          <SearchBox value={searchParams} onChange={onSearch} />
        </Col>
        <>
          {displayPublished && publishedParams && (
            <Col md="auto">
              <>
                <FormCheckbox
                  label={t("published")}
                  onChange={onIsPublished}
                  name="published"
                  value={publishedParams === "published"}
                />
                <FormCheckbox
                  label={t("not-published")}
                  name="not-published"
                  onChange={onIsPublished}
                  value={publishedParams === "not-published"}
                />
              </>
            </Col>
          )}
          {createdByParams && handleCreatedByCurrentUser && (
            <Col md="auto">
              <>
                <FormCheckbox
                  label={t("my-content")}
                  name="current-user"
                  onChange={onIsCreatedByChange}
                  value={createdByParams === "current-user"}
                />
              </>
            </Col>
          )}
        </>
        <Col md="auto" className="d-flex justify-content-end">
          <>
            {handleDelete && (
              <Button
                variant="danger"
                id="delete-button"
                disabled={disableDeleteButton}
                onClick={() => handleDelete()}
                className="me-3"
              >
                {t("delete-button")}
              </Button>
            )}
            {clearSelectedRows && (
              <Button
                id="clear-rows-button"
                disabled={selectedRows.length === 0}
                onClick={() => clearSelectedRows()}
                variant="dark"
              >
                {t("deselect-all")}
              </Button>
            )}
          </>
        </Col>
      </Row>
      <Row />
      <>
        {!calendarView && (
          <Table data={data} columns={columns} selectedRows={selectedRows} />
        )}
        {calendarView && <CalendarList data={data}>{children}</CalendarList>}
      </>
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
  calendarView: false,
  handleCreatedByCurrentUser: null,
  handleIsPublished: () => {},
  handleDelete: null,
  displayPublished: false,
  children: <></>,
  selectedRows: [],
  clearSelectedRows: null,
};

List.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({ name: PropTypes.string, id: PropTypes.number })
  ).isRequired,
  columns: ColumnProptypes.isRequired,
  selectedRows: SelectedRowsProptypes,
  clearSelectedRows: PropTypes.func,
  handlePageChange: PropTypes.func.isRequired,
  handleDelete: PropTypes.func,
  calendarView: PropTypes.bool,
  totalItems: PropTypes.number.isRequired,
  handleSearch: PropTypes.func.isRequired,
  displayPublished: PropTypes.bool,
  handleIsPublished: PropTypes.func,
  handleCreatedByCurrentUser: PropTypes.func,
  children: PropTypes.node,
};

export default ListLoading(List);
