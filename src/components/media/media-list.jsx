import { React, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Col, Row } from "react-bootstrap";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import selectedHelper from "../util/helpers/selectedHelper";
import DeleteModal from "../delete-modal/delete-modal";
import SearchBox from "../util/search-box/search-box";
import ContentBody from "../util/content-body/content-body";
import idFromUrl from "../util/helpers/id-from-url";
import Pagination from "../util/paginate/pagination";
import ImageList from "./image-list";
import {
  displayError,
  displaySuccess,
} from "../util/list/toast-component/display-toast";
import {
  useGetV1MediaQuery,
  useDeleteV1MediaByIdMutation,
} from "../../redux/api/api.generated";
import "./media-list.scss";

/**
 * The media list component.
 *
 * @param {object} props The props.
 * @param {boolean} props.fromModal Whether it is opened from the modal, if it
 *   is, the upload and delete function should not be accesible.
 * @param {Function} props.handleSelected Callback when closing modal.
 * @returns {object} The media list.
 */
function MediaList({ fromModal, handleSelected }) {
  // Translations
  const { t } = useTranslation("common");

  // Url params
  const { search } = useLocation();
  const pageParams = new URLSearchParams(search).get("page");
  const searchParams = new URLSearchParams(search).get("search");

  // Misc
  const history = useHistory();
  const pageSize = 10;

  // State
  const [mediaToDelete, setMediaToDelete] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [media, setMedia] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState([]);
  const [page, setPage] = useState(parseInt(pageParams || 1, 10));
  const [searchText, setSearchText] = useState(
    searchParams === null ? "" : searchParams
  );
  const [localStorageMessages, setLocalStorageMessages] = useState([]);
  const [loadingMessage, setLoadingMessage] = useState(
    t("media-list.loading-messages.loading-media")
  );

  // Delete method
  const [DeleteV1Media, { isSuccess: isDeleteSuccess, error: isDeleteError }] =
    useDeleteV1MediaByIdMutation();

  // Get method
  const {
    data: mediaData,
    error: mediaLoadError,
    isLoading,
  } = useGetV1MediaQuery({ page, title: searchText });

  /** Set loaded data into form state. */
  useEffect(() => {
    if (mediaData) {
      const mappedData = mediaData["hydra:member"].map((mediaItem) => {
        return {
          selected: false,
          ...mediaItem,
        };
      });
      setMedia(mappedData);
      setTotalItems(mediaData["hydra:totalItems"]);
    }
  }, [mediaData]);

  /** Closes delete modal. */
  function onCloseDeleteModal() {
    setShowDeleteModal(false);
  }

  /** @param {number} nextPage - The next page. */
  function updateUrlAndChangePage(nextPage) {
    const params = new URLSearchParams(search);
    params.delete("page");
    params.append("page", nextPage);
    history.replace({ search: params.toString() });
    setPage(nextPage);
  }

  /** Sets the url. */
  useEffect(() => {
    if (!fromModal) {
      const params = new URLSearchParams(search);
      params.delete("search");
      params.append("search", searchText);
      params.delete("page");
      params.append("page", page);
      history.replace({ search: params.toString() });
    }
  }, [searchText]);

  /**
   * Sets search text.
   *
   * @param {string} newSearchText Updates the search text state and url.
   */
  function handleSearch(newSearchText) {
    setPage(1);
    setSearchText(newSearchText);
  }

  /** Deletes multiple pieces of media. */
  useEffect(() => {
    if (mediaToDelete.length > 0) {
      setIsDeleting(true);
      const toDelete = mediaToDelete.splice(0, 1).shift();
      setLoadingMessage(t("media-list.loading-messages.deleting-media"));
      const toDeleteId = idFromUrl(toDelete["@id"]);
      DeleteV1Media({ id: toDeleteId });
    } else if (isDeleteSuccess) {
      // If delete is a success, the list is reloaded, and a success message is saved in local storage for later use.
      localStorage.setItem(
        "messages",
        JSON.stringify([
          ...localStorageMessages,
          t("media-list.success-messages.media-delete"),
        ])
      );
      // @TODO: refetch
      window.location.reload(false);
    }
  }, [mediaToDelete, isDeleteSuccess]);

  // Display success messages from successfully deleted slides.
  useEffect(() => {
    const messages = JSON.parse(localStorage.getItem("messages"));
    if (messages) {
      messages.forEach((element) => {
        displaySuccess(element);
      });
      localStorage.removeItem("messages");
    }
  }, []);

  // Sets success-messages for local storage
  useEffect(() => {
    if (isDeleteSuccess && mediaToDelete.length > 0) {
      const localStorageMessagesCopy = [...localStorageMessages];
      localStorageMessagesCopy.push(
        t("media-list.success-messages.media-delete")
      );
      setLocalStorageMessages(localStorageMessagesCopy);
    }
  }, [isDeleteSuccess]);

  // Display error on unsuccessful deletion
  useEffect(() => {
    if (isDeleteError) {
      setIsDeleting(false);
      displayError(
        t("media-list.error-messages.media-delete-error", {
          error: isDeleteError.error
            ? isDeleteError.error
            : isDeleteError.data["hydra:description"],
        })
      );
    }
  }, [isDeleteError]);

  /** Deletes selected data, and closes modal. */
  function handleDelete() {
    setMediaToDelete(selectedMedia);
    setShowDeleteModal(false);
    setSelectedMedia([]);
  }

  /**
   * Sets the selected media in state.
   *
   * @param {object} inputData The selected media.
   */
  function handleChecked(inputData) {
    const localMedia = inputData;
    localMedia.selected = !localMedia.selected;
    const selectedData = selectedHelper(localMedia, [...selectedMedia]).filter(
      ({ selected }) => selected
    );
    setSelectedMedia(selectedData);
    if (fromModal) {
      handleSelected(selectedData);
    }
  }

  useEffect(() => {
    if (mediaLoadError) {
      displayError(
        t("media-list.error-messages.media-load-error", {
          error: mediaLoadError.error
            ? mediaLoadError.error
            : mediaLoadError.data["hydra:description"],
        })
      );
    }
  }, [mediaLoadError]);

  return (
    <>
      <Row className="align-items-center justify-content-between mt-2">
        <Col>
          <h1>{t("media-list.header")}</h1>
        </Col>
        {!fromModal && (
          <>
            <Col xs="auto">
              <Link className="btn btn-success" to="/media/create">
                {t("media-list.upload-new-media")}
              </Link>
            </Col>
            <Col xs="auto">
              <div className="ml-4">
                <Button
                  variant="danger"
                  id="delete_media_button"
                  disabled={!selectedMedia.length > 0}
                  onClick={() => setShowDeleteModal(true)}
                >
                  {t("media-list.delete-button")}
                </Button>
              </div>
            </Col>
          </>
        )}
      </Row>
      <ContentBody>
        <Row className="mt-2 mb-2">
          <Col sm={12} md={6}>
            <SearchBox
              showLabel
              value={searchText}
              onChange={handleSearch}
              helpText={t("media-list.search-help-text")}
            />
          </Col>
        </Row>
        <ImageList
          media={media}
          isLoading={isLoading || isDeleting}
          loadingMessage={loadingMessage}
          handleChecked={handleChecked}
        />
      </ContentBody>
      <Pagination
        itemsCount={totalItems}
        pageSize={pageSize}
        currentPage={page}
        onPageChange={updateUrlAndChangePage}
      />
      <DeleteModal
        show={showDeleteModal}
        handleAccept={handleDelete}
        onClose={onCloseDeleteModal}
        selectedRows={selectedMedia}
      />
    </>
  );
}

MediaList.defaultProps = {
  fromModal: false,
  handleSelected: null,
};

MediaList.propTypes = {
  fromModal: PropTypes.bool,
  handleSelected: PropTypes.func,
};

export default MediaList;
