import { React, useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import selectedHelper from "../util/helpers/selectedHelper";
import ContentHeader from "../util/content-header/content-header";
import ListButton from "../util/list/list-button";
import List from "../util/list/list";
import DeleteModal from "../delete-modal/delete-modal";
import InfoModal from "../info-modal/info-modal";
import LinkForList from "../util/list/link-for-list";
import idFromUrl from "../util/helpers/id-from-url";
import CheckboxForList from "../util/list/checkbox-for-list";
import ContentBody from "../util/content-body/content-body";
import Published from "../util/published";
import {
  displayError,
  displaySuccess,
} from "../util/list/toast-component/display-toast";
import {
  useDeleteV1PlaylistsByIdMutation,
  useGetV1PlaylistsByIdSlidesQuery,
  useGetV1PlaylistsQuery,
} from "../../redux/api/api.generated";

/**
 * The shared list component.
 *
 * @returns {object} The shared list, shared by playlists and campaigns.
 */
function PlaylistCampaignList() {
  const { t } = useTranslation("common");
  const { location } = useParams();

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
<<<<<<< HEAD:src/components/playlist/playlist-campaign-list.jsx
    t(`playlist-campaign-list.${location}.loading-messages.loading`)
=======
    t(`shared-list.${location}.loading-messages.loading`)
>>>>>>> 40ff127 (AR-722: campaign in admin):src/components/playlist/playlist-list.jsx
  );

  // Delete call
  const [
    DeleteV1Playlists,
    { isSuccess: isDeleteSuccess, error: isDeleteError },
  ] = useDeleteV1PlaylistsByIdMutation();

  // Get method
  const {
    data,
    error: playlistsGetError,
    isLoading,
    refetch,
  } = useGetV1PlaylistsQuery({
    page,
    orderBy: sortBy?.path,
    order: sortBy?.order,
    title: searchText,
    published: isPublished,
    isCampaign: location === "campaign",
  });

  useEffect(() => {
    if (data) {
      setListData(data);
    }
  }, [data]);

  /** Deletes multiple playlists. */
  useEffect(() => {
    if (playlistsToDelete.length > 0) {
      if (isDeleteSuccess) {
<<<<<<< HEAD:src/components/playlist/playlist-campaign-list.jsx
        displaySuccess(
          t(`playlist-campaign-list.${location}.success-messages.delete`)
        );
      }
      // As we are deleting multiple playlists, the ui will jump if the "is deleting" value from the hook is used.
      setIsDeleting(true);
      setLoadingMessage(
        t(`playlist-campaign-list.${location}.loading-messages.deleting`)
      );
=======
        displaySuccess(t(`shared-list.${location}.success-messages.delete`));
      }
      // As we are deleting multiple playlists, the ui will jump if the "is deleting" value from the hook is used.
      setIsDeleting(true);
      setLoadingMessage(t(`shared-list.${location}.loading-messages.deleting`));
>>>>>>> 40ff127 (AR-722: campaign in admin):src/components/playlist/playlist-list.jsx
      const toDelete = playlistsToDelete.splice(0, 1).shift();
      const toDeleteId = idFromUrl(toDelete["@id"]);
      DeleteV1Playlists({ id: toDeleteId });
    } else if (isDeleteSuccess && playlistsToDelete.length > 0) {
<<<<<<< HEAD:src/components/playlist/playlist-campaign-list.jsx
      displaySuccess(
        t(`playlist-campaign-list.${location}.success-messages.delete`)
      );
=======
      displaySuccess(t(`shared-list.${location}.success-messages.delete`));
>>>>>>> 40ff127 (AR-722: campaign in admin):src/components/playlist/playlist-list.jsx
    }
  }, [playlistsToDelete, isDeleteSuccess]);

  // Display success messages
  useEffect(() => {
    if (isDeleteSuccess && playlistsToDelete.length === 0) {
<<<<<<< HEAD:src/components/playlist/playlist-campaign-list.jsx
      displaySuccess(
        t(`playlist-campaign-list.${location}.success-messages.delete`)
      );
=======
      displaySuccess(t(`shared-list.${location}.success-messages.delete`));
>>>>>>> 40ff127 (AR-722: campaign in admin):src/components/playlist/playlist-list.jsx
      refetch();
      setIsDeleting(false);
    }
  }, [isDeleteSuccess]);

  // Display error on unsuccessful deletion
  useEffect(() => {
    if (isDeleteError) {
      setIsDeleting(false);
      displayError(
<<<<<<< HEAD:src/components/playlist/playlist-campaign-list.jsx
        t(`playlist-campaign-list.${location}.error-messages.delete-error`, {
=======
        t(`shared-list.${location}.error-messages.delete-error`, {
>>>>>>> 40ff127 (AR-722: campaign in admin):src/components/playlist/playlist-list.jsx
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
<<<<<<< HEAD:src/components/playlist/playlist-campaign-list.jsx
      label: t(`playlist-campaign-list.${location}.columns.pick`),
=======
      label: t(`shared-list.${location}.columns.pick`),
>>>>>>> 40ff127 (AR-722: campaign in admin):src/components/playlist/playlist-list.jsx
      content: (d) => (
        <CheckboxForList
          onSelected={() => handleSelected(d)}
          selected={selectedRows.indexOf(d) > -1}
        />
      ),
    },
    {
      path: "title",
      sort: true,
<<<<<<< HEAD:src/components/playlist/playlist-campaign-list.jsx
      label: t("playlist-campaign-list.columns.name"),
    },
    {
      path: "published",
      label: t("playlist-campaign-list.columns.published"),
=======
      label: t("shared-list.columns.name"),
    },
    {
      path: "published",
      label: t("shared-list.columns.published"),
>>>>>>> 40ff127 (AR-722: campaign in admin):src/components/playlist/playlist-list.jsx
      // eslint-disable-next-line react/prop-types
      content: ({ published }) => <Published published={published} />,
    },
    {
      key: "slides",
<<<<<<< HEAD:src/components/playlist/playlist-campaign-list.jsx
      label: t("playlist-campaign-list.columns.number-of-slides"),
=======
      label: t("shared-list.columns.number-of-slides"),
>>>>>>> 40ff127 (AR-722: campaign in admin):src/components/playlist/playlist-list.jsx
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
      content: (d) =>
<<<<<<< HEAD:src/components/playlist/playlist-campaign-list.jsx
        LinkForList(
          d["@id"],
          `${location}/edit`,
          t("playlist-campaign-list.edit-button")
        ),
=======
        LinkForList(d["@id"], `${location}/edit`, t("shared-list.edit-button")),
>>>>>>> 40ff127 (AR-722: campaign in admin):src/components/playlist/playlist-list.jsx
    },
    {
      key: "delete",
      content: (d) => (
        <Button
          variant="danger"
          disabled={selectedRows.length > 0}
          onClick={() => openDeleteModal(d)}
        >
<<<<<<< HEAD:src/components/playlist/playlist-campaign-list.jsx
          {t("playlist-campaign-list.delete-button")}
=======
          {t("shared-list.delete-button")}
>>>>>>> 40ff127 (AR-722: campaign in admin):src/components/playlist/playlist-list.jsx
        </Button>
      ),
    },
  ];

  // Error with retrieving list of playlists
  useEffect(() => {
    if (playlistsGetError) {
      displayError(
<<<<<<< HEAD:src/components/playlist/playlist-campaign-list.jsx
        t(`playlist-campaign-list.${location}.error-messages.load-error`, {
=======
        t(`shared-list.${location}.error-messages.load-error`, {
>>>>>>> 40ff127 (AR-722: campaign in admin):src/components/playlist/playlist-list.jsx
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
<<<<<<< HEAD:src/components/playlist/playlist-campaign-list.jsx
        title={t(`playlist-campaign-list.${location}.header`)}
        newBtnTitle={t(`playlist-campaign-list.${location}.create-new`)}
=======
        title={t(`shared-list.${location}.header`)}
        newBtnTitle={t(`shared-list.${location}.create-new`)}
>>>>>>> 40ff127 (AR-722: campaign in admin):src/components/playlist/playlist-list.jsx
        newBtnLink={`/${location}/create`}
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
<<<<<<< HEAD:src/components/playlist/playlist-campaign-list.jsx
        modalTitle={t(`playlist-campaign-list.${location}.info-modal.slides`)}
=======
        modalTitle={t(`shared-list.${location}.info-modal.slides`)}
>>>>>>> 40ff127 (AR-722: campaign in admin):src/components/playlist/playlist-list.jsx
      />
    </>
  );
}

export default PlaylistCampaignList;
