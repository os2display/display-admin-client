import { React, useState, useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";
import List from "../util/list/list";
import idFromUrl from "../util/helpers/id-from-url";
import UserContext from "../../context/user-context";
import ContentHeader from "../util/content-header/content-header";
import ContentBody from "../util/content-body/content-body";
import useModal from "../../context/modal-context/modal-context-hook";
import { SlideColumns } from "./slides-columns";
import {
  displayError,
  displaySuccess,
} from "../util/list/toast-component/display-toast";
import {
  useGetV1SlidesQuery,
  useDeleteV1SlidesByIdMutation,
  useGetV1PlaylistsByIdQuery,
} from "../../redux/api/api.generated";

/**
 * The slides list component.
 *
 * @returns {object} The slides list
 */
function SlidesList() {
  const { t } = useTranslation("common", { keyPrefix: "slides-list" });
  const context = useContext(UserContext);
  const { selected, setSelected } = useModal();

  // Local state
  const [isDeleting, setIsDeleting] = useState(false);
  const [page, setPage] = useState();
  const [createdBy, setCreatedBy] = useState("all");
  const [isPublished, setIsPublished] = useState();
  const [searchText, setSearchText] = useState();
  const [listData, setListData] = useState();
  const [loadingMessage, setLoadingMessage] = useState(
    t("loading-messages.loading-slides")
  );

  // Delete call
  const [DeleteV1Slides, { isSuccess: isDeleteSuccess, error: isDeleteError }] =
    useDeleteV1SlidesByIdMutation();

  // Get method
  const {
    data,
    error: slidesGetError,
    isLoading,
    refetch,
  } = useGetV1SlidesQuery({
    page,
    order: { createdAt: "desc" },
    title: searchText,
    published: isPublished,
    createdBy,
  });

  useEffect(() => {
    if (data) {
      setListData(data);
    }
  }, [data]);

  // If the tenant is changed, data should be refetched
  useEffect(() => {
    if (context.selectedTenant.get) {
      refetch();
    }
  }, [context.selectedTenant.get]);

  /** Deletes multiple slides. */
  useEffect(() => {
    if (isDeleting && selected.length > 0) {
      const slideToDelete = selected[0];
      setSelected(selected.slice(1));
      const slideToDeleteId = idFromUrl(slideToDelete.id);
      DeleteV1Slides({ id: slideToDeleteId });
    }
  }, [isDeleting, isDeleteSuccess]);

  // Display success messages
  useEffect(() => {
    if (isDeleteSuccess && selected.length === 0) {
      displaySuccess(t("success-messages.slide-delete"));
      refetch();
      setIsDeleting(false);
    }
  }, [isDeleteSuccess]);

  // Display error on unsuccessful deletion
  useEffect(() => {
    if (isDeleteError) {
      setIsDeleting(false);
      displayError(t("error-messages.slide-delete-error"), isDeleteError);
    }
  }, [isDeleteError]);

  /** Starts the deletion process. */
  function handleDelete() {
    setIsDeleting(true);
    setLoadingMessage(t("loading-messages.deleting-slide"));
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
   * Sets is published
   *
   * @param {number} localIsPublished - Whether the slide is published.
   */
  function onIsPublished(localIsPublished) {
    if (localIsPublished === "all") {
      setIsPublished(undefined);
    } else {
      setIsPublished(localIsPublished === "published");
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
  const columns = SlideColumns({
    handleDelete,
    apiCall: useGetV1PlaylistsByIdQuery,
    infoModalRedirect: "/playlist/edit",
    infoModalTitle: t("info-modal.slide-on-playlists"),
  });

  // Error with retrieving list of slides
  useEffect(() => {
    if (slidesGetError) {
      displayError(t("error-messages.slides-load-error"), slidesGetError);
    }
  }, [slidesGetError]);

  return (
    <>
      <ContentHeader
        title={t("header")}
        newBtnTitle={t("create-new-slide")}
        newBtnLink="/slide/create"
      />
      {listData && (
        <ContentBody>
          <List
            columns={columns}
            totalItems={listData["hydra:totalItems"]}
            data={listData["hydra:member"]}
            currentPage={page}
            handlePageChange={onChangePage}
            handleCreatedByCurrentUser={onCreatedByFilter}
            handleDelete={handleDelete}
            handleSearch={onSearch}
            handleIsPublished={onIsPublished}
            displayPublished
            isLoading={isLoading || isDeleting}
            loadingMessage={loadingMessage}
          />
        </ContentBody>
      )}
    </>
  );
}

export default SlidesList;
