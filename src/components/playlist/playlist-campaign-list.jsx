import { React, useState, useEffect, useContext } from "react";
import { Button, Col } from "react-bootstrap";
import { faCalendar, faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import useModal from "../../context/modal-context/modal-context-hook";
import UserContext from "../../context/user-context";
import ContentHeader from "../util/content-header/content-header";
import List from "../util/list/list";
import idFromUrl from "../util/helpers/id-from-url";
import ContentBody from "../util/content-body/content-body";
import PlaylistCalendarCell from "../screen-list/playlist-calendar-cell";
import { PlaylistColumns } from "./playlists-columns";
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
 * @param {object} props Props.
 * @param {string} props.location Either playlist or campaign.
 * @returns {object} The shared list, shared by playlists and campaigns.
 */
function PlaylistCampaignList({ location }) {
  const { t } = useTranslation("common", {
    keyPrefix: "playlist-campaign-list",
  });
  const { selected, setSelected } = useModal();
  const context = useContext(UserContext);

  // Local state
  const [view, setView] = useState("list");
  const [isDeleting, setIsDeleting] = useState(false);
  const [page, setPage] = useState();
  const [createdBy, setCreatedBy] = useState("all");
  const [isPublished, setIsPublished] = useState();
  const [searchText, setSearchText] = useState();
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
    createdBy,
    sharedWithMe: false,
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
    if (isDeleting && selected.length > 0) {
      if (isDeleteSuccess) {
        displaySuccess(t(`${location}.success-messages.delete`));
      }
      const playlistToDelete = selected[0];
      setSelected(selected.slice(1));
      const playlistToDeleteId = idFromUrl(playlistToDelete.id);
      DeleteV1Playlists({ id: playlistToDeleteId });
    }
  }, [isDeleting, isDeleteSuccess]);

  // Display success messages
  useEffect(() => {
    if (isDeleteSuccess && selected.length === 0) {
      displaySuccess(t(`${location}.success-messages.delete`));
      setIsDeleting(false);
      refetch();
    }
  }, [isDeleteSuccess]);

  // Display error on unsuccessful deletion
  useEffect(() => {
    if (isDeleteError) {
      setIsDeleting(false);
      displayError(t(`${location}.error-messages.delete-error`), isDeleteError);
    }
  }, [isDeleteError]);

  /** Starts the deletion process. */
  function handleDelete() {
    setIsDeleting(true);
    setLoadingMessage(t(`${location}.loading-messages.deleting`));
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
  const columns = PlaylistColumns({
    handleDelete,
    apiCall: useGetV1PlaylistsByIdSlidesQuery,
    infoModalRedirect: "/slide/edit",
    infoModalTitle: t(`${location}.info-modal.slides`),
    dataKey: "slide",
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
            handleCreatedByCurrentUser={onCreatedByFilter}
            totalItems={listData["hydra:totalItems"]}
            handleSearch={onSearch}
            data={listData["hydra:member"]}
            handleDelete={handleDelete}
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
    </>
  );
}

PlaylistCampaignList.propTypes = {
  location: PropTypes.string.isRequired,
};

export default PlaylistCampaignList;
