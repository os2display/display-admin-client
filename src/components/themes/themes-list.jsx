import { React, useState, useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";
import List from "../util/list/list";
import idFromUrl from "../util/helpers/id-from-url";
import selectedHelper from "../util/helpers/selectedHelper";
import DeleteModal from "../delete-modal/delete-modal";
import UserContext from "../../context/user-context";
import ContentHeader from "../util/content-header/content-header";
import ContentBody from "../util/content-body/content-body";
import getThemesColumns from "./themes-columns";
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
  const { t } = useTranslation("common", { keyPrefix: "themes-list" });
  const context = useContext(UserContext);

  // Local state
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [page, setPage] = useState();
  const [themesToDelete, setThemesToDelete] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchText, setSearchText] = useState();
  const [listData, setListData] = useState();
  const [loadingMessage, setLoadingMessage] = useState(
    t("loading-messages.loading-themes")
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
    orderBy: "desc",
    order: "desc",
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
        displaySuccess(t("success-messages.theme-delete"));
      }
      setLoadingMessage(t("loading-messages.deleting-theme"));
      const themeToDelete = themesToDelete.splice(0, 1).shift();
      const themeToDeleteId = idFromUrl(themeToDelete["@id"]);
      DeleteV1Themes({ id: themeToDeleteId });
    }
  }, [themesToDelete, isDeleteSuccess]);

  // Display success messages
  useEffect(() => {
    if (isDeleteSuccess && themesToDelete.length === 0) {
      displaySuccess(t("success-messages.theme-delete"));
      refetch();
      setIsDeleting(false);
    }
  }, [isDeleteSuccess]);

  // If the tenant is changed, data should be refetched
  useEffect(() => {
    if (context.selectedTenant.get) {
      refetch();
    }
  }, [context.selectedTenant.get]);

  // Display error on unsuccessful deletion
  useEffect(() => {
    if (isDeleteError) {
      setIsDeleting(false);
      displayError(t("error-messages.theme-delete-error"), isDeleteError);
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
   * Handles search.
   *
   * @param {object} localSearchText - The search text.
   */
  function onSearch(localSearchText) {
    setSearchText(localSearchText);
  }

  // The columns for the table.
  const columns = getThemesColumns({
    selectedRows,
    handleSelected,
    editNewTab: false,
    handleDelete: openDeleteModal,
    disableCheckbox: true,
    disableDelete: true,
  });

  // Error with retrieving list of themes
  useEffect(() => {
    if (themesGetError) {
      displayError(t("error-messages.themes-load-error"), themesGetError);
    }
  }, [themesGetError]);

  return (
    <>
      <ContentHeader
        title={t("header")}
        newBtnTitle={t("create-new-theme")}
        newBtnLink="/themes/create"
      />
      {data && data["hydra:member"] && (
        <ContentBody>
          <>
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
                handleSearch={onSearch}
                isLoading={isLoading || isDeleting}
                loadingMessage={loadingMessage}
              />
            )}
          </>
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

export default ThemesList;
