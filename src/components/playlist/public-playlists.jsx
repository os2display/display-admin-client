import { React, useState, useEffect } from "react";
import { Button, Col } from "react-bootstrap";
import { faCalendar, faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import ContentHeader from "../util/content-header/content-header";
import ListButton from "../util/list/list-button";
import List from "../util/list/list";
import InfoModal from "../info-modal/info-modal";
import ContentBody from "../util/content-body/content-body";
import Published from "../util/published";
import PlaylistCalendarCell from "../screen-list/playlist-calendar-cell";
import { displayError } from "../util/list/toast-component/display-toast";
import {
  useGetV1PlaylistsByIdSlidesQuery,
  useGetV1PlaylistsQuery,
} from "../../redux/api/api.generated";

/**
 * The list component for public playlists.
 *
 * @param {object} props Props.
 * @param {string} props.location Either playlist or campaign.
 * @returns {object} The shared list, shared by playlists and campaigns.
 */
function PublicPlaylists() {
  const { t } = useTranslation("common");

  // Local state
  const [view, setView] = useState("list");
  const [sortBy, setSortBy] = useState();
  const [onSlides, setOnSlides] = useState();
  const [page, setPage] = useState();
  const [isPublished, setIsPublished] = useState();
  const [searchText, setSearchText] = useState();
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [listData, setListData] = useState();

  // Get method
  const {
    data,
    error: playlistsGetError,
    isLoading,
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
      path: "title",
      sort: true,
      label: t("public-playlists.columns.name"),
    },
    {
      path: "published",
      label: t("public-playlists.columns.published"),
      // eslint-disable-next-line react/prop-types
      content: ({ published }) => <Published published={published} />,
    },
    {
      key: "slides",
      label: t("public-playlists.columns.number-of-slides"),
      // eslint-disable-next-line react/prop-types
      content: ({ slides }) => (
        <ListButton
          callback={openInfoModal}
          inputData={slides}
          apiCall={useGetV1PlaylistsByIdSlidesQuery}
        />
      ),
    },
  ];

  // Error with retrieving list of playlists
  useEffect(() => {
    if (playlistsGetError) {
      displayError(
        t("public-playlists.error-messages.load-error", {
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
        title={t("public-playlists.header")}
        newBtnTitle={t("public-playlists.create-new")}
        newBtnLink="/playlist/create?public=true"
      >
        <Col md="auto">
          {view === "list" && (
            <Button
              style={{ width: "110px" }}
              onClick={() => setView("calendar")}
            >
              <FontAwesomeIcon className="me-1" icon={faCalendar} />
              {t("public-playlists.change-view-calendar")}
            </Button>
          )}
          {view === "calendar" && (
            <Button style={{ width: "110px" }} onClick={() => setView("list")}>
              <FontAwesomeIcon className="me-1" icon={faList} />
              {t("public-playlists.change-view-list")}
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
            data={listData["hydra:member"]}
            calendarView={view === "calendar"}
            handleIsPublished={onIsPublished}
            isLoading={isLoading}
            loadingMessage={t("public-playlists.loading")}
          >
            {view === "calendar" && <PlaylistCalendarCell />}
          </List>
        </ContentBody>
      )}
      <InfoModal
        show={showInfoModal}
        apiCall={useGetV1PlaylistsByIdSlidesQuery}
        onClose={onCloseInfoModal}
        dataStructureToDisplay={onSlides}
        dataKey="slide"
        modalTitle={t("public-playlists.info-modal.slides")}
      />
    </>
  );
}

PublicPlaylists.propTypes = {
  location: PropTypes.string.isRequired,
};

export default PublicPlaylists;
