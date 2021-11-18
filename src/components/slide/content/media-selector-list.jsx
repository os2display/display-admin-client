import { React, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Toast from "../../util/toast/toast";
import selectedHelper from "../../util/helpers/selectedHelper";
import SearchBox from "../../util/search-box/search-box";
import ContentBody from "../../util/content-body/content-body";
import {
  useGetV1MediaQuery
} from "../../../redux/api/api.generated";
import "../../media/media-list.scss";
import Pagination from "../../util/paginate/pagination";

/**
 * The media list component.
 *
 * @param {object} props - The props.
 * @param {boolean} props.multiple - Is the list in multiple mode? This will enable checkbox for each element.
 * @param {function} props.onItemClick - Handler when item is clicked.
 * @param {Array} props.selectedMedia - List of selected media.
 * @returns {JSXElement} - The media list.
 */
function MediaList({ multiple, selectedMedia, onItemClick }) {
  // Translations
  const { t } = useTranslation("common");

  const pageSize = 10;

  // State
  const [media, setMedia] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");

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
          // @TODO: Is it in selectedMedia list?
          selected: false,
          ...mediaItem,
        };
      });
      setMedia(mappedData);
      setTotalItems(mediaData["hydra:totalItems"]);
    }
  }, [mediaData]);

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
    // @TODO
  }

  /** @param {number} selectedPage - The selected page. */
  function updateUrlAndChangePage(selectedPage) {
    setPage(selectedPage);
  }

  /**
   * Sets search text.
   *
   * @param {string} newSearchText Updates the search text state and url.
   */
  function handleSearch(newSearchText) {
    setSearchText(newSearchText);
  }

  return (
    <>
      <Toast show={loadError} text={t("media-list.media-get-error")} />
      <Row className="align-items-center justify-content-between mt-2">
        <Col>
          <h1>{t("media-list.header")}</h1>
        </Col>
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
        {isLoading && (
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
        {!isLoading && (
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

                  {multiple &&
                    <Form.Check
                      type="checkbox"
                      checked={data.selected}
                      tabIndex={-1}
                      aria-label={t("media-list.checkbox-form-aria-label")}
                      readOnly
                    />
                  }

                  <div className="card-body">
                    <div className="row align-items-center">
                      <div className="col-auto">
                        <h2 className="h6">{data.name}</h2>
                      </div>
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
    </>
  );
}

MediaList.defaultProps = {
  onItemClick: () => {},
  multiple: false,
  selectedMedia: [],
};

MediaList.propTypes = {
  onItemClick: PropTypes.func,
  multiple: PropTypes.bool,
  selectedMedia: PropTypes.arrayOf(PropTypes.shape({
    '@id': PropTypes.string.isRequired
  })),
};

export default MediaList;
