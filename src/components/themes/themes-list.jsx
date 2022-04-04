import { React, useState, useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";
import List from "../util/list/list";
import idFromUrl from "../util/helpers/id-from-url";
import useModal from "../../context/modal-context/modal-context-hook";
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
  const { selected, setSelected } = useModal();

  // Local state
  const [isDeleting, setIsDeleting] = useState(false);
  const [createdBy, setCreatedBy] = useState("all");
  const [page, setPage] = useState();
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
    order: { createdAt: "desc" },
    title: searchText,
    createdBy,
  });

  useEffect(() => {
    if (data) {
      setListData(data);
    }
  }, [data]);

  /** Deletes multiple themes. */
  useEffect(() => {
    if (isDeleting && selected.length > 0) {
      if (isDeleteSuccess) {
        displaySuccess(t("success-messages.theme-delete"));
      }
      const themeToDelete = selected[0];
      setSelected(selected.slice(1));
      const themeToDeleteId = idFromUrl(themeToDelete.id);
      DeleteV1Themes({ id: themeToDeleteId });
    }
  }, [isDeleting, isDeleteSuccess]);

  // Display success messages
  useEffect(() => {
    if (isDeleteSuccess && selected.length === 0) {
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

  /** Starts the deletion process. */
  function handleDelete() {
    setIsDeleting(true);
    setLoadingMessage(t("loading-messages.deleting-theme"));
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
   * Sets created by filter.
   *
   * @param {number} createdByInput - The created by filter.
   */
  function onCreatedByFilter(createdByInput) {
    if (createdByInput === "all") {
      setCreatedBy(createdByInput);
    } else {
      setCreatedBy(context.email.get);
    }
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
    handleDelete,
    disableCheckbox: ({ onSlides }) => onSlides.length > 0,
    disableDelete: ({ onSlides }) => onSlides.length > 0,
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
                handleCreatedByCurrentUser={onCreatedByFilter}
                handlePageChange={onChangePage}
                handleDelete={handleDelete}
                handleSearch={onSearch}
                isLoading={isLoading || isDeleting}
                loadingMessage={loadingMessage}
              />
            )}
          </>
        </ContentBody>
      )}
    </>
  );
}

export default ThemesList;
