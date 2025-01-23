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
 * @param {boolean} props.displaySearch - Should search be displayed.
 * @returns {object} The List.
 */
function List({
  data,
  columns,
  totalItems,
  showCreatedByFilter = true,
  handleDelete = null,
  displayPublished = false,
  displaySearch = true,
}) {
  const { t } = useTranslation("common", { keyPrefix: "list" });
  const navigate = useNavigate();
  const {
    searchText: { set: setSearchText },
    page: { set: setPage },
    createdBy: { set: setCreatedBy },
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
    const localSearch =
      searchParams || localStorage.getItem(localStorageKeys.SEARCH) || "";
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
  const updateUrlParams = (dataKey, value) => {
    const params = new URLSearchParams(search);
    params.delete(dataKey);
    params.append(dataKey, value);
    navigate({
      search: params.toString(),
    });
  };

  /** @param {string} newSearchText Updates the search text state and url. */
  const onSearch = (newSearchText) => {
    localStorage.setItem(localStorageKeys.SEARCH, newSearchText); // Search should persist
    const params = new URLSearchParams(search);
    params.delete("search");
    params.append("search", newSearchText);
    params.delete("page");
    params.append("page", 1);
    navigate({
      search: params.toString(),
    });
  };

  /** @param {string} isPublished Updates the search text state and url. */
  const onIsPublished = ({ target }) => {
    if (target.value) {
      updateUrlParams("published", target.id);
    } else {
      updateUrlParams("published", "all");
    }
  };

  /** @param {string} createdBy Updates the search text state and url. */
  const onIsCreatedByChange = ({ target }) => {
    if (target.value) {
      updateUrlParams("createdBy", target.id);
    } else {
      updateUrlParams("createdBy", "all");
    }
  };

  /** @param {number} nextPage - The next page. */
  const updateUrlAndChangePage = (nextPage) => {
    updateUrlParams("page", nextPage);
  };

  const deleteHandler = () => {
    updateUrlAndChangePage(1);
    handleDelete();
  };

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
          {displaySearch && (
            <SearchBox value={searchParams} onChange={onSearch} />
          )}
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
                    accept: deleteHandler,
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
      <Table data={data} columns={columns} />
      <Pagination
        itemsCount={totalItems}
        pageSize={pageSize}
        currentPage={parseInt(pageParams, 10)}
        onPageChange={updateUrlAndChangePage}
      />
    </>
  );
}

List.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({ name: PropTypes.string, id: PropTypes.string })
  ).isRequired,
  columns: ColumnProptypes.isRequired,
  handleDelete: PropTypes.func,
  totalItems: PropTypes.number.isRequired,
  displayPublished: PropTypes.bool,
  showCreatedByFilter: PropTypes.bool,
  displaySearch: PropTypes.bool,
};

export default ListLoading(List);
