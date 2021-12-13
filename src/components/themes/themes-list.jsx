import { React, useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import CheckboxForList from "../util/list/checkbox-for-list";
import List from "../util/list/list";
import idFromUrl from "../util/helpers/id-from-url";
import selectedHelper from "../util/helpers/selectedHelper";
import DeleteModal from "../delete-modal/delete-modal";
import LinkForList from "../util/list/link-for-list";
import SideAndTopbarHOC from "../side-and-topbar-hoc/side-and-topbar-hoc";
import ContentHeader from "../util/content-header/content-header";
import ContentBody from "../util/content-body/content-body";
import {
  displayError,
  displaySuccess,
} from "../util/list/toast-component/display-toast";
import {
  useGetV1ThemesQuery,
  useDeleteV1ThemesByIdMutation,
} from "../../redux/api/api.generated";

/**
 * The themes list component.
 *
 * @returns {object} The themes list
 */
function ThemesList() {
  const { t } = useTranslation("common");

  // Local state
  const [isDeleting, setIsDeleting] = useState(false);
  const [sortBy, setSortBy] = useState();
  const [selectedRows, setSelectedRows] = useState([]);
  const [page, setPage] = useState();
  const [themesToDelete, setThemesToDelete] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchText, setSearchText] = useState();
  const [listData, setListData] = useState();
  const [loadingMessage, setLoadingMessage] = useState(
    t("themes-list.loading-messages.loading-themes")
  );

  // Delete call
  const [DeleteV1Themes, { isSuccess: isDeleteSuccess, error: isDeleteError }] =
    useDeleteV1ThemesByIdMutation();

  const {
    data,
    error: themesGetError,
    isLoading,
    refetch,
  } = useGetV1ThemesQuery({
    page,
    orderBy: sortBy?.path,
    order: sortBy?.order,
    title: searchText,
  });

  useEffect(() => {
    if (data) {
      setListData(data);
    }
  }, [data]);

  /** Deletes multiple themes. */
  useEffect(() => {
    if (themesToDelete.length > 0) {
      // As we are deleting multiple themes, the ui will jump if the "is deleting" value from the hook is used.

      setIsDeleting(true);
      if (isDeleteSuccess) {
        displaySuccess(t("themes-list.success-messages.theme-delete"));
      }
      setLoadingMessage(t("themes-list.loading-messages.deleting-themes"));
      const themeToDelete = themesToDelete.splice(0, 1).shift();
      const themeToDeleteId = idFromUrl(themeToDelete["@id"]);
      DeleteV1Themes({ id: themeToDeleteId });
    }
  }, [themesToDelete, isDeleteSuccess]);

  // Display success messages
  useEffect(() => {
    if (isDeleteSuccess && themesToDelete.length === 0) {
      displaySuccess(t("themes-list.success-messages.theme-delete"));
      refetch();
      setIsDeleting(false);
    }
  }, [isDeleteSuccess]);

  // Display error on unsuccessful deletion
  useEffect(() => {
    if (isDeleteError) {
      setIsDeleting(false);
      displayError(
        t("themes-list.error-messages.theme-delete-error", {
          error: isDeleteError.error
            ? isDeleteError.error
            : isDeleteError.data["hydra:description"],
        })
      );
    }
  }, [isDeleteError]);

  /**
   * Sets the selected row in state.
   *
   * @param {object} row The selected row.
   */
  function handleSelected(row) {
    setSelectedRows(selectedHelper(row, [...selectedRows]));
  }

  /** Clears the selected rows. */
  function clearSelectedRows() {
    setSelectedRows([]);
  }

  /**
   * Opens the delete modal
   *
   * @param {object} item The item to delete
   */
  function openDeleteModal(item) {
    if (item) {
      setSelectedRows([{ "@id": item["@id"], title: item.title }]);
    }
    setShowDeleteModal(true);
  }

  /** Deletes theme(s), and closes modal. */
  function handleDelete() {
    setThemesToDelete(selectedRows);
    clearSelectedRows();
    setShowDeleteModal(false);
  }

  /** Closes the delete modal. */
  function onCloseDeleteModal() {
    clearSelectedRows();
    setShowDeleteModal(false);
  }

  /**
   * Sets next page.
   *
   * @param {number} pageNumber - The next page.
   */
  function onChangePage(pageNumber) {
    setPage(pageNumber);
  }

  /**
   * Handles sort.
   *
   * @param {object} localSortBy - How the data should be sorted.
   */
  function onChangeSort(localSortBy) {
    setSortBy(localSortBy);
  }

  /**
   * Handles search.
   *
   * @param {object} localSearchText - The search text.
   */
  function onSearch(localSearchText) {
    setSearchText(localSearchText);
  }

  // The columns for the table.
  const columns = [
    {
      key: "pick",
      label: t("themes-list.columns.pick"),
      content: (d) => (
        <CheckboxForList
          onSelected={() => handleSelected(d)}
          selected={selectedRows.indexOf(d) > -1}
          // eslint-disable-next-line react/destructuring-assignment
          disabled={d.onSlides.length > 0}
        />
      ),
    },
    {
      path: "title",
      sort: true,
      label: t("themes-list.columns.name"),
    },
    {
      path: "createdBy",
      label: t("themes-list.columns.created-by"),
    },
    {
      key: "slides",
      // eslint-disable-next-line react/prop-types
      content: ({ onSlides }) => <>{onSlides.length}</>,
      label: t("themes-list.columns.number-of-slides"),
    },
    {
      key: "edit",
      content: (d) =>
        LinkForList(d["@id"], "themes/edit", t("themes-list.edit-button")),
    },
    {
      key: "delete",
      content: (d) => (
        <>
          <Button
            variant="danger"
            // eslint-disable-next-line react/destructuring-assignment
            disabled={selectedRows.length > 0 || d.onSlides.length > 0}
            onClick={() => openDeleteModal(d)}
          >
            {t("themes-list.delete-button")}
          </Button>
        </>
      ),
    },
  ];

  // Error with retrieving list of themes
  useEffect(() => {
    if (themesGetError) {
      displayError(
        t("themes-list.error-messages.themes-load-error", {
          error: themesGetError.error
            ? themesGetError.error
            : themesGetError.data["hydra:description"],
        })
      );
    }
  }, [themesGetError]);

  return (
    <>
      <ContentHeader
        title={t("themes-list.header")}
        newBtnTitle={t("themes-list.create-new-theme")}
        newBtnLink="/themes/create"
      />
      {data && data["hydra:member"] && (
        <ContentBody>
          {listData && (
            <List
              columns={columns}
              totalItems={listData["hydra:totalItems"]}
              data={listData["hydra:member"]}
              currentPage={page}
              handlePageChange={onChangePage}
              selectedRows={selectedRows}
              clearSelectedRows={clearSelectedRows}
              handleDelete={openDeleteModal}
              handleSort={onChangeSort}
              handleSearch={onSearch}
              isLoading={isLoading || isDeleting}
              loadingMessage={loadingMessage}
            />
          )}
        </ContentBody>
      )}
      <DeleteModal
        show={showDeleteModal}
        onClose={onCloseDeleteModal}
        handleAccept={handleDelete}
        selectedRows={selectedRows}
      />
    </>
  );
}

export default SideAndTopbarHOC(ThemesList);
