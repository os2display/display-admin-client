import { React, useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import selectedHelper from "../util/helpers/selectedHelper";
import ListButton from "../util/list/list-button";
import List from "../util/list/list";
import DeleteModal from "../delete-modal/delete-modal";
import InfoModal from "../info-modal/info-modal";
import LinkForList from "../util/list/link-for-list";
import idFromUrl from "../util/helpers/id-from-url";
import CheckboxForList from "../util/list/checkbox-for-list";
import ContentHeader from "../util/content-header/content-header";
import ContentBody from "../util/content-body/content-body";
import Published from "../util/published";
import {
  displayError,
  displaySuccess,
} from "../util/list/toast-component/display-toast";
import {
  useGetV1PlaylistsQuery,
  useDeleteV1PlaylistsByIdMutation,
  useGetV1PlaylistsByIdSlidesQuery,
} from "../../redux/api/api.generated";

/**
 * The playlists list component.
 *
 * @returns {object} The playlists list.
 */
function PlaylistList() {
  const { t } = useTranslation("common");

  // Local state
  const [selectedRows, setSelectedRows] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [sortBy, setSortBy] = useState();
  const [onSlides, setOnSlides] = useState();
  const [page, setPage] = useState();
  const [playlistsToDelete, setPlaylistsToDelete] = useState([]);
  const [isPublished, setIsPublished] = useState();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchText, setSearchText] = useState();
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [listData, setListData] = useState();
  const [loadingMessage, setLoadingMessage] = useState(
    t("playlists-list.loading-messages.loading-playlists")
  );

  // Delete call
  const [
    DeleteV1Playlists,
    { isSuccess: isDeleteSuccess, error: isDeleteError },
  ] = useDeleteV1PlaylistsByIdMutation();

  /** Deletes multiple playlists. */
  useEffect(() => {
    if (playlistsToDelete.length > 0) {
      // As we are deleting multiple playlists, the ui will jump if the "is deleting" value from the hook is used.
      setIsDeleting(true);
      setLoadingMessage(t("playlists-list.loading-messages.deleting-playlist"));
      const toDelete = playlistsToDelete.splice(0, 1).shift();
      const toDeleteId = idFromUrl(toDelete["@id"]);
      DeleteV1Playlists({ id: toDeleteId });
    } else if (isDeleteSuccess && playlistsToDelete.length > 0) {
      displaySuccess(t("playlists-list.success-messages.playlist-delete"))
    }
  }, [playlistsToDelete, isDeleteSuccess]);

  // Display success messages
  useEffect(() => {
    if (isDeleteSuccess && playlistsToDelete.length === 0) {
      displaySuccess(t("playlists-list.success-messages.playlist-delete"))
      refetch()
      setIsDeleting(false)
    }
  }, [isDeleteSuccess]);

  // Display error on unsuccessful deletion
  useEffect(() => {
    if (isDeleteError) {
      setIsDeleting(false);
      displayError(
        t("playlists-list.error-messages.playlist-delete-error", {
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
   * @param {object} data The selected row.
   */
  function handleSelected(data) {
    setSelectedRows(selectedHelper(data, [...selectedRows]));
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

  /** Deletes playlist(s), and closes modal. */
  function handleDelete() {
    setPlaylistsToDelete(selectedRows);
    clearSelectedRows();
    setShowDeleteModal(false);
  }

  /** Closes the delete modal. */
  function onCloseDeleteModal() {
    setSelectedRows([]);
    setShowDeleteModal(false);
  }

  /** @param {Array} slideData The array of playlists. */
  function openInfoModal(slideData) {
    setOnSlides(slideData);
    setShowInfoModal(true);
  }

  /** Closes the info modal. */
  function onCloseInfoModal() {
    setShowInfoModal(false);
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
   * @param {number} localIsPublished - Whether the playlist is published.
   */
  function onIsPublished(localIsPublished) {
    if (localIsPublished === "all") {
      setIsPublished(undefined);
    } else {
      setIsPublished(localIsPublished === "published");
    }
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
      label: t("playlists-list.columns.pick"),
      content: (data) => (
        <CheckboxForList
          onSelected={() => handleSelected(data)}
          selected={selectedRows.indexOf(data) > -1}
        />
      ),
    },
    {
      path: "title",
      sort: true,
      label: t("playlists-list.columns.name"),
    },
    {
      path: "published",
      label: t("playlists-list.columns.published"),
      // eslint-disable-next-line react/prop-types
      content: ({ published }) => <Published published={published} />,
    },
    {
      key: "slides",
      label: t("playlists-list.columns.number-of-slides"),
      // eslint-disable-next-line react/prop-types
      content: ({ slides }) => (
        <ListButton
          callback={openInfoModal}
          inputData={slides}
          apiCall={useGetV1PlaylistsByIdSlidesQuery}
        />
      ),
    },
    {
      key: "edit",
      content: (data) =>
        LinkForList(
          data["@id"],
          "playlist/edit",
          t("playlists-list.edit-button")
        ),
    },
    {
      key: "delete",
      content: (data) => (
        <Button
          variant="danger"
          disabled={selectedRows.length > 0}
          onClick={() => openDeleteModal(data)}
        >
          {t("playlists-list.delete-button")}
        </Button>
      ),
    },
  ];

  const {
    data,
    error: playlistsGetError,
    isLoading,
    refetch
  } = useGetV1PlaylistsQuery({
    page,
    orderBy: sortBy?.path,
    order: sortBy?.order,
    title: searchText,
    published: isPublished,
  });

  useEffect(() => {
    if (data) {
      setListData(data);
    }
  }, [data]);

  // Error with retrieving list of playlists
  useEffect(() => {
    if (playlistsGetError) {
      displayError(
        t("playlists-list.error-messages.playlists-load-error", {
          error: playlistsGetError.error
            ? playlistsGetError.error
            : playlistsGetError.data["hydra:description"],
        })
      );
    }
  }, [playlistsGetError]);

  return (
    <>
      <ContentHeader
        title={t("playlists-list.header")}
        newBtnTitle={t("playlists-list.create-new-playlist")}
        newBtnLink="/playlist/create"
      />
      {listData && (
        <ContentBody>
          <List
            displayPublished
            columns={columns}
            handleSort={onChangeSort}
            handlePageChange={onChangePage}
            totalItems={listData["hydra:totalItems"]}
            handleSearch={onSearch}
            selectedRows={selectedRows}
            data={listData["hydra:member"]}
            clearSelectedRows={clearSelectedRows}
            handleDelete={openDeleteModal}
            handleIsPublished={onIsPublished}
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
        apiCall={useGetV1PlaylistsByIdSlidesQuery}
        onClose={onCloseInfoModal}
        dataStructureToDisplay={onSlides}
        dataKey="slide"
        modalTitle={t("playlists-list.info-modal.playlist-slides")}
      />
    </>
  );
}

export default PlaylistList;
