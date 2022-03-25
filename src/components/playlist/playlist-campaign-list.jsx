import { React, useState, useEffect, useContext } from "react";
import { Button, Col } from "react-bootstrap";
import { faCalendar, faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import UserContext from "../../context/user-context";
import selectedHelper from "../util/helpers/selectedHelper";
import ContentHeader from "../util/content-header/content-header";
import List from "../util/list/list";
import DeleteModal from "../delete-modal/delete-modal";
import InfoModal from "../info-modal/info-modal";
import idFromUrl from "../util/helpers/id-from-url";
import ContentBody from "../util/content-body/content-body";
import PlaylistCalendarCell from "../screen-list/playlist-calendar-cell";
import {
  displayError,
  displaySuccess,
} from "../util/list/toast-component/display-toast";
import getPlaylistColumns from "./playlists-columns";
import {
  useDeleteV1PlaylistsByIdMutation,
  useGetV1PlaylistsByIdSlidesQuery,
  useGetV1PlaylistsQuery,
} from "../../redux/api/api.generated";

/**
 * The shared list component.
 *
 * @param {object} props Props.
 * @param {string} props.location Either playlist or campaign.
 * @returns {object} The shared list, shared by playlists and campaigns.
 */
function PlaylistCampaignList({ location }) {
  const { t } = useTranslation("common", {
    keyPrefix: "playlist-campaign-list",
  });
  const context = useContext(UserContext);

  // Local state
  const [selectedRows, setSelectedRows] = useState([]);
  const [view, setView] = useState("list");
  const [isDeleting, setIsDeleting] = useState(false);
  const [onSlides, setOnSlides] = useState();
  const [page, setPage] = useState();
  const [playlistsToDelete, setPlaylistsToDelete] = useState([]);
  const [isPublished, setIsPublished] = useState();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchText, setSearchText] = useState();
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [listData, setListData] = useState();
  const [loadingMessage, setLoadingMessage] = useState(
    t(`${location}.loading-messages.loading`)
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
    order: { createdAt: "desc" },
    title: searchText,
    published: isPublished,
    isCampaign: location === "campaign",
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

  /** Deletes multiple playlists. */
  useEffect(() => {
    if (playlistsToDelete.length > 0) {
      if (isDeleteSuccess) {
        displaySuccess(t(`${location}.success-messages.delete`));
      }
      // As we are deleting multiple playlists, the ui will jump if the "is deleting" value from the hook is used.
      setIsDeleting(true);
      setLoadingMessage(t(`${location}.loading-messages.deleting`));
      const toDelete = playlistsToDelete.splice(0, 1).shift();
      const toDeleteId = idFromUrl(toDelete["@id"]);
      DeleteV1Playlists({ id: toDeleteId });
    } else if (isDeleteSuccess && playlistsToDelete.length > 0) {
      displaySuccess(t(`${location}.success-messages.delete`));
    }
  }, [playlistsToDelete, isDeleteSuccess]);

  // Display success messages
  useEffect(() => {
    if (isDeleteSuccess && playlistsToDelete.length === 0) {
      displaySuccess(t(`${location}.success-messages.delete`));
      refetch();
      setIsDeleting(false);
    }
  }, [isDeleteSuccess]);

  // Display error on unsuccessful deletion
  useEffect(() => {
    if (isDeleteError) {
      setIsDeleting(false);
      displayError(t(`${location}.error-messages.delete-error`), isDeleteError);
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
   * Handles search.
   *
   * @param {object} localSearchText - The search text.
   */
  function onSearch(localSearchText) {
    setSearchText(localSearchText);
  }

  // The columns for the table.
  const columns = getPlaylistColumns({
    selectedRows,
    handleSelected,
    editNewTab: false,
    handleDelete: openDeleteModal,
    listButtonCallback: openInfoModal,
    apiCall: useGetV1PlaylistsByIdSlidesQuery,
  });

  // Error with retrieving list of playlists
  useEffect(() => {
    if (playlistsGetError) {
      displayError(
        t(`${location}.error-messages.load-error`),
        playlistsGetError
      );
    }
  }, [playlistsGetError]);

  return (
    <>
      <ContentHeader
        title={t(`${location}.header`)}
        newBtnTitle={t(`${location}.create-new`)}
        newBtnLink={`/${location}/create`}
      >
        <Col md="auto">
          {location === "playlist" && view === "list" && (
            <Button
              style={{ width: "110px" }}
              onClick={() => setView("calendar")}
            >
              <FontAwesomeIcon className="me-1" icon={faCalendar} />
              {t("change-view-calendar")}
            </Button>
          )}
          {location === "playlist" && view === "calendar" && (
            <Button style={{ width: "110px" }} onClick={() => setView("list")}>
              <FontAwesomeIcon className="me-1" icon={faList} />
              {t("change-view-list")}
            </Button>
          )}
        </Col>
      </ContentHeader>
      {listData && (
        <ContentBody>
          <List
            displayPublished
            columns={columns}
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
        redirectTo="/slide/edit"
        apiCall={useGetV1PlaylistsByIdSlidesQuery}
        onClose={onCloseInfoModal}
        dataStructureToDisplay={onSlides}
        dataKey="slide"
        modalTitle={t(`${location}.info-modal.slides`)}
      />
    </>
  );
}

PlaylistCampaignList.propTypes = {
  location: PropTypes.string.isRequired,
};

export default PlaylistCampaignList;
