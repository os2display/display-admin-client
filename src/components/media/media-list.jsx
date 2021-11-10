import { React, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Col, Row } from "react-bootstrap";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Toast from "../util/list/toast-component/toast";
import selectedHelper from "../util/helpers/selectedHelper";
import DeleteModal from "../delete-modal/delete-modal";
import SearchBox from "../util/search-box/search-box";
import ContentBody from "../util/content-body/content-body";
import {
  useGetV1MediaQuery,
  useDeleteV1MediaByIdMutation,
} from "../../redux/api/api.generated";
import idFromUrl from "../util/helpers/id-from-url";
import "./media-list.scss";
import Pagination from "../util/paginate/pagination";
import ImageList from "./image-list";

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

  // Delete method
  const [DeleteV1Media, { isSuccess: isDeleteSuccess }] =
    useDeleteV1MediaByIdMutation();

  // Get method
  const {
    data: mediaData,
    error: loadError,
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
      const toDeleteId = idFromUrl(toDelete["@id"]);
      DeleteV1Media({ id: toDeleteId });
    } else if (isDeleteSuccess) {
      window.location.reload(false);
    }
  }, [mediaToDelete, isDeleteSuccess]);

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

  return (
    <>
      <Toast show={loadError} text={t("media-list.media-get-error")} />
      <Toast show={isDeleteSuccess} text={t("media-list.deleted")} />
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
          loadingMessage={
            isLoading ? t("media-list.loading") : t("media-list.deleting")
          }
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
