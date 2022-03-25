import { React, useState, useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";
import List from "../util/list/list";
import idFromUrl from "../util/helpers/id-from-url";
import selectedHelper from "../util/helpers/selectedHelper";
import DeleteModal from "../delete-modal/delete-modal";
import InfoModal from "../info-modal/info-modal";
import UserContext from "../../context/user-context";
import ContentHeader from "../util/content-header/content-header";
import ContentBody from "../util/content-body/content-body";
import {
  displayError,
  displaySuccess,
} from "../util/list/toast-component/display-toast";
import getSlidesColumns from "./slides-columns";
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

  // Local state
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [onPlaylists, setOnPlaylists] = useState();
  const [page, setPage] = useState();
  const [isPublished, setIsPublished] = useState();
  const [slidesToDelete, setSlidesToDelete] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
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
    if (slidesToDelete.length > 0) {
      // As we are deleting multiple slides, the ui will jump if the "is deleting" value from the hook is used.
      setIsDeleting(true);
      if (isDeleteSuccess) {
        displaySuccess(t("success-messages.slide-delete"));
      }
      setLoadingMessage(t("loading-messages.deleting-slide"));
      const localSlidesToDelete = [...slidesToDelete];
      const slideToDelete = localSlidesToDelete.splice(0, 1).shift();
      const slideToDeleteId = idFromUrl(slideToDelete["@id"]);
      DeleteV1Slides({ id: slideToDeleteId });
      setSlidesToDelete(localSlidesToDelete);
    }
  }, [slidesToDelete, isDeleteSuccess]);

  // Display success messages
  useEffect(() => {
    if (isDeleteSuccess && slidesToDelete.length === 0) {
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

  /** Deletes slide(s), and closes modal. */
  function handleDelete() {
    setSlidesToDelete(selectedRows);
    clearSelectedRows();
    setShowDeleteModal(false);
  }

  /** Closes the delete modal. */
  function onCloseDeleteModal() {
    clearSelectedRows();
    setShowDeleteModal(false);
  }

  /** @param {Array} playlistData The array of playlists. */
  function openInfoModal(playlistData) {
    setOnPlaylists(playlistData);
    setShowInfoModal(true);
  }

  /** Closes the info modal. */
  function onCloseInfoModal() {
    setShowInfoModal(false);
    setOnPlaylists();
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
  const columns = getSlidesColumns({
    selectedRows,
    handleSelected,
    editNewTab: false,
    handleDelete: openDeleteModal,
    listButtonCallback: openInfoModal,
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
            selectedRows={selectedRows}
            clearSelectedRows={clearSelectedRows}
            handleDelete={openDeleteModal}
            handleSearch={onSearch}
            handleIsPublished={onIsPublished}
            displayPublished
            isLoading={isLoading || isDeleting}
            loadingMessage={loadingMessage}
          />
        </ContentBody>
      )}
      <DeleteModal
        show={showDeleteModal}
        onClose={onCloseDeleteModal}
        handleAccept={handleDelete}
        selectedRows={selectedRows}
      />
      <InfoModal
        show={showInfoModal}
        redirectTo="/playlist/edit"
        apiCall={useGetV1PlaylistsByIdQuery}
        onClose={onCloseInfoModal}
        dataStructureToDisplay={onPlaylists}
        modalTitle={t("info-modal.slide-on-playlists")}
      />
    </>
  );
}

export default SlidesList;
