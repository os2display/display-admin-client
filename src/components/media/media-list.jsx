import { React, useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import { Button, Col, Row } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import UserContext from "../../context/user-context";
import SearchBox from "../util/search-box/search-box";
import ContentBody from "../util/content-body/content-body";
import idFromUrl from "../util/helpers/id-from-url";
import Pagination from "../util/paginate/pagination";
import ImageList from "./image-list";
import useModal from "../../context/delete-modal-context/delete-modal-context";
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
 * @returns {object} The media list.
 */
function MediaList({ fromModal }) {
  // Translations
  const { t } = useTranslation("common", { keyPrefix: "media-list" });

  // Selected data
  const { selected, setSelected, setModal } = useModal();

  // Context
  const context = useContext(UserContext);

  // Url params
  const { search } = useLocation();
  const pageParams = new URLSearchParams(search).get("page");
  const searchParams = new URLSearchParams(search).get("search");

  // Misc
  const navigate = useNavigate();
  const pageSize = 10;

  // State
  const [isDeleting, setIsDeleting] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [media, setMedia] = useState([]);
  const [page, setPage] = useState(parseInt(pageParams || 1, 10));
  const [searchText, setSearchText] = useState(
    searchParams === null ? "" : searchParams
  );
  const [loadingMessage, setLoadingMessage] = useState(
    t("loading-messages.loading-media")
  );

  // Delete method
  const [DeleteV1Media, { isSuccess: isDeleteSuccess, error: isDeleteError }] =
    useDeleteV1MediaByIdMutation();

  // Get method
  const {
    data: mediaData,
    error: mediaLoadError,
    isLoading,
    refetch,
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

  // If the tenant is changed, data should be refetched
  useEffect(() => {
    if (context.selectedTenant.get) {
      refetch();
    }
  }, [context.selectedTenant.get]);

  /** @param {number} nextPage - The next page. */
  function updateUrlAndChangePage(nextPage) {
    const params = new URLSearchParams(search);
    params.delete("page");
    params.append("page", nextPage);
    navigate({ search: params.toString() });
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
      navigate({ search: params.toString() });
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
    if (isDeleting && selected.length > 0) {
      const toDelete = selected[0];
      setSelected(selected.slice(1));
      const toDeleteId = idFromUrl(toDelete.id);
      DeleteV1Media({ id: toDeleteId });
    }
  }, [isDeleting, isDeleteSuccess]);

  // Display success messages
  useEffect(() => {
    if (isDeleteSuccess && selected.length === 0) {
      displaySuccess(t("success-messages.media-delete"));
      setIsDeleting(false);
      refetch();
    }
  }, [isDeleteSuccess]);

  // Display error on unsuccessful deletion
  useEffect(() => {
    if (isDeleteError) {
      setIsDeleting(false);
      displayError(t("error-messages.media-delete-error"), isDeleteError);
    }
  }, [isDeleteError]);

  /** Deletes selected data, and closes modal. */
  function handleDelete() {
    setLoadingMessage(t("loading-messages.deleting-media"));
    setIsDeleting(true);
  }

  useEffect(() => {
    if (mediaLoadError) {
      displayError(t("error-messages.media-load-error"), mediaLoadError);
    }
  }, [mediaLoadError]);

  return (
    <>
      <Row className="align-items-center justify-content-between mt-2">
        <Col>
          <h1 id="media-list-title">{t("header")}</h1>
        </Col>
        {!fromModal && (
          <>
            <Col xs="auto">
              <Link className="btn btn-success" to="/media/create">
                {t("upload-new-media")}
              </Link>
            </Col>
            <Col xs="auto">
              <div className="ml-4">
                <Button
                  variant="danger"
                  id="delete_media_button"
                  disabled={!selected.length > 0}
                  onClick={() =>
                    setModal({
                      accept: handleDelete,
                    })
                  }
                >
                  {t("delete-button")}
                </Button>
              </div>
            </Col>
          </>
        )}
      </Row>
      <ContentBody>
        <Row className="mt-2 mb-2">
          <Col sm={12} md={6}>
            <SearchBox value={searchText} onChange={handleSearch} />
          </Col>
        </Row>
        <ImageList
          media={media}
          isLoading={isLoading || isDeleting}
          loadingMessage={loadingMessage}
        />
      </ContentBody>
      <Pagination
        itemsCount={totalItems}
        pageSize={pageSize}
        currentPage={page}
        onPageChange={updateUrlAndChangePage}
      />
    </>
  );
}

MediaList.defaultProps = {
  fromModal: false,
};

MediaList.propTypes = {
  fromModal: PropTypes.bool,
};

export default MediaList;
