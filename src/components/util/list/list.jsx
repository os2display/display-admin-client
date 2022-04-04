import { React, useEffect, useContext } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import Table from "../table/table";
import UserContext from "../../../context/user-context";
import SearchBox from "../search-box/search-box";
import useModal from "../../../context/modal-context/modal-context-hook";
import Pagination from "../paginate/pagination";
import ColumnProptypes from "../../proptypes/column-proptypes";
import ListLoading from "../loading-component/list-loading";
import CalendarList from "../../screen-list/calendar-list";
import localStorageKeys from "../local-storage-keys";
import FormCheckbox from "../forms/form-checkbox";
import ListContext from "../../../context/list-context";

/**
 * @param {object} props - The props.
 * @param {Array} props.data - The data for the list.
 * @param {Array} props.columns - The columns for the table.
 * @param {number} props.totalItems - The total items, for pagination.
 * @param {Function} props.handleDelete - For deleting elements in the list.
 *   element with success.
 * @param {boolean} props.displayPublished - Whether to display the published filter
 * @param {Function} props.showCreatedByFilter - Callback for created by filter.
 * @param {Array} props.children The children being passed from parent
 * @returns {object} The List.
 */
function List({
  data,
  columns,
  displayPublished,
  totalItems,
  handleDelete,
  showCreatedByFilter,
  children,
}) {
  const { t } = useTranslation("common", { keyPrefix: "list" });
  const navigate = useNavigate();
  const {
    searchText: { set: setSearchText },
    page: { set: setPage },
    createdBy: { set: setCreatedBy },
    listView: { get: view },
    isPublished: { set: setIsPublished },
  } = useContext(ListContext);
  const {
    email: { get: email },
  } = useContext(UserContext);
  const { setModal, setSelected, selected } = useModal();

  // Page params
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search).get("search");
  const pageParams = new URLSearchParams(search).get("page");

  let createdByParams;
  if (showCreatedByFilter) {
    createdByParams = new URLSearchParams(search).get("createdBy");
  }

  let publishedParams;
  if (displayPublished) {
    publishedParams = new URLSearchParams(search).get("published");
  }

  // At least one row must be selected for deletion.
  const disableDeleteButton = !selected.length > 0;
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
    if (showCreatedByFilter) {
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
      setPage(parseInt(pageParams, 10));
    }
  }, [pageParams]);

  /** Sets page from url using callback */
  useEffect(() => {
    if (createdByParams) {
      if (createdByParams === "all") {
        setCreatedBy(createdByParams);
      } else {
        setCreatedBy(email);
      }
    }
  }, [createdByParams]);

  /** Sets search from url using callback */
  useEffect(() => {
    if (searchParams) {
      setSearchText(searchParams);
    } else {
      setSearchText("");
    }
  }, [searchParams]);

  /** Sets published filter from url using callback */
  useEffect(() => {
    if (publishedParams) {
      if (publishedParams === "all") {
        setIsPublished(undefined);
      } else {
        setIsPublished(publishedParams === "published");
      }
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
          {createdByParams && showCreatedByFilter && (
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
                onClick={() =>
                  setModal({
                    delete: true,
                    accept: handleDelete,
                  })
                }
                className="me-3"
              >
                {t("delete-button")}
              </Button>
            )}
            {selected && (
              <Button
                id="clear-rows-button"
                disabled={selected.length === 0}
                onClick={() => setSelected([])}
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
        {view === "list" && <Table data={data} columns={columns} />}
        {view === "calendar" && (
          <CalendarList data={data}>{children}</CalendarList>
        )}
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
  showCreatedByFilter: true,
  handleDelete: null,
  displayPublished: false,
  children: <></>,
};

List.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({ name: PropTypes.string, id: PropTypes.number })
  ).isRequired,
  columns: ColumnProptypes.isRequired,
  handleDelete: PropTypes.func,
  totalItems: PropTypes.number.isRequired,
  displayPublished: PropTypes.bool,
  showCreatedByFilter: PropTypes.func,
  children: PropTypes.node,
};

export default ListLoading(List);
