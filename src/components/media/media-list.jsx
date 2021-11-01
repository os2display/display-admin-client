import { React, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Toast from "../util/toast/toast";
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
  } = useGetV1MediaQuery({ page });

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
      if (searchText) {
        params.delete("search");
        params.append("search", searchText);
      }
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
      <Toast show={isDeleteSuccess} text={t("playlists-list.deleted")} />
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
        {isDeleting && (
          <>
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
              className="m-1"
            />
            {t("media-list.deleting")}
          </>
        )}
        {isLoading && !isDeleting && (
          <>
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
              className="m-1"
            />
            {t("media-list.loading")}
          </>
        )}
        {!isDeleting && !isLoading && (
          <div className="row row-cols-2 row-cols-sm-3 row-cols-xl-4 row-cols-xxl-5 media-list">
            {media.map((data) => (
              <div key={data["@id"]} className="col mb-3">
                <div
                  className={`card bg-light h-100 media-item +
                  ${data.selected ? " selected" : ""}`}
                >
                  <button
                    type="button"
                    className="media-item-button"
                    onClick={() => handleChecked(data)}
                  >
                    <img
                      src={data.assets.uri}
                      className="card-img-top"
                      alt={data.description}
                    />
                  </button>
                  <Form.Check
                    type="checkbox"
                    checked={data.selected}
                    tabIndex={-1}
                    aria-label={t("media-list.checkbox-form-aria-label")}
                    readOnly
                  />

                  <div className="card-body">
                    <div className="row align-items-center">
                      <div className="col-auto">
                        <h2 className="h6">{data.name}</h2>
                      </div>
                      {/* @TODO: readd if the api supports putting media */}
                      {/* <div className="col-auto ms-auto">
                        <Link
                          className="btn btn-primary btn-sm"
                          to={`/media/edit/${idFromUrl(data["@id"])}`}
                        >
                          {t("media-list.edit-button")}
                        </Link>
                      </div> */}
                    </div>
                    <div className="row">
                      <div className="col">
                        <span className="small">{data.description}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
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
