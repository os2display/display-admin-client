import { React, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import { Button, Col } from "react-bootstrap";
import { faCalendar, faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
import PlaylistCalendarCell from "../screen-list/playlist-calendar-cell";
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
  const [view, setView] = useState("list");
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
    t(`playlist-campaign-list.${location}.loading-messages.loading`)
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
        displaySuccess(
          t(`playlist-campaign-list.${location}.success-messages.delete`)
        );
      }
      // As we are deleting multiple playlists, the ui will jump if the "is deleting" value from the hook is used.
      setIsDeleting(true);
      setLoadingMessage(
        t(`playlist-campaign-list.${location}.loading-messages.deleting`)
      );
      const toDelete = playlistsToDelete.splice(0, 1).shift();
      const toDeleteId = idFromUrl(toDelete["@id"]);
      DeleteV1Playlists({ id: toDeleteId });
    } else if (isDeleteSuccess && playlistsToDelete.length > 0) {
      displaySuccess(
        t(`playlist-campaign-list.${location}.success-messages.delete`)
      );
    }
  }, [playlistsToDelete, isDeleteSuccess]);

  // Display success messages
  useEffect(() => {
    if (isDeleteSuccess && playlistsToDelete.length === 0) {
      displaySuccess(
        t(`playlist-campaign-list.${location}.success-messages.delete`)
      );
      refetch();
      setIsDeleting(false);
    }
  }, [isDeleteSuccess]);

  // Display error on unsuccessful deletion
  useEffect(() => {
    if (isDeleteError) {
      setIsDeleting(false);
      displayError(
        t(`playlist-campaign-list.${location}.error-messages.delete-error`, {
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
      label: t(`playlist-campaign-list.${location}.columns.pick`),
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
      label: t("playlist-campaign-list.columns.name"),
    },
    {
      path: "published",
      label: t("playlist-campaign-list.columns.published"),
      // eslint-disable-next-line react/prop-types
      content: ({ published }) => <Published published={published} />,
    },
    {
      key: "slides",
      label: t("playlist-campaign-list.columns.number-of-slides"),
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
        LinkForList(
          d["@id"],
          `${location}/edit`,
          t("playlist-campaign-list.edit-button")
        ),
    },
    {
      key: "delete",
      content: (d) => (
        <Button
          variant="danger"
          disabled={selectedRows.length > 0}
          onClick={() => openDeleteModal(d)}
        >
          {t("playlist-campaign-list.delete-button")}
        </Button>
      ),
    },
  ];

  // Error with retrieving list of playlists
  useEffect(() => {
    if (playlistsGetError) {
      displayError(
        t(`playlist-campaign-list.${location}.error-messages.load-error`, {
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
        title={t(`playlist-campaign-list.${location}.header`)}
        newBtnTitle={t(`playlist-campaign-list.${location}.create-new`)}
        newBtnLink={`/${location}/create`}
      >
        <Col md="auto">
          {location === "playlist" && view === "list" && (
            <Button
              style={{ width: "110px" }}
              onClick={() => setView("calendar")}
            >
              <FontAwesomeIcon className="me-1" icon={faCalendar} />
              {t("playlist-campaign-list.change-view-calendar")}
            </Button>
          )}
          {location === "playlist" && view === "calendar" && (
            <Button style={{ width: "110px" }} onClick={() => setView("list")}>
              <FontAwesomeIcon className="me-1" icon={faList} />
              {t("playlist-campaign-list.change-view-list")}
            </Button>
          )}
        </Col>
      </ContentHeader>
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
            calendarView={view === "calendar"}
            handleIsPublished={onIsPublished}
            isLoading={isLoading || isDeleting}
            loadingMessage={loadingMessage}
          >
            {location === "playlist" && view === "calendar" && (
              <PlaylistCalendarCell />
            )}
          </List>
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
        modalTitle={t(`playlist-campaign-list.${location}.info-modal.slides`)}
      />
    </>
  );
}

export default PlaylistCampaignList;
