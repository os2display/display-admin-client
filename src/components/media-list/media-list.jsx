import { React, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import selectedHelper from "../util/helpers/selectedHelper";
import DeleteModal from "../delete-modal/delete-modal";
import TagDropdown from "../util/forms/multiselect-dropdown/tags/tag-dropdown";
import SearchBox from "../util/search-box/search-box";
import ContentBody from "../util/content-body/content-body";
import "./media-list.scss";

/**
 * The media list component.
 *
 * @param {object} props
 * The props.
 * @param {boolean} props.fromModal
 * Whether it is opened from the modal, if it is, the upload and delete function should not be accesible.
 * @param {Function} props.handleSelected
 * Callback when closing modal.
 * @returns {object}
 * The media list.
 */
function MediaList({ fromModal, handleSelected }) {
  // Translations
  const { t } = useTranslation("common");

  // Url search paramters
  /**
   * @param {string} params
   * the tags paramters from the url.
   * @returns {object}
   * Returns the tags from the url for the multiselect component.
   */
  function getTagsParams(params) {
    let returnTags = [];
    if (params) {
      returnTags = params.split(",").map((tag) => {
        const tagFields = tag.split("@");
        return { name: tagFields[0], id: parseInt(tagFields[1], 10) };
      });
    }
    return returnTags;
  }
  const { search } = useLocation();
  const history = useHistory();
  const searchParams = new URLSearchParams(search).get("search");
  const tagsParams = new URLSearchParams(search).get("tags");

  // State
  const [media, setMedia] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState([]);
  const [searchText, setSearchText] = useState(
    searchParams === null ? "" : searchParams
  );
  const [selectedTags, setSelectedTags] = useState(getTagsParams(tagsParams));

  // Disable delete button
  const disableDeleteButton = !selectedMedia.length > 0;

  /**
   * Load content from fixture.
   */
  useEffect(() => {
    // @TODO: load real content.
    fetch("/fixtures/media/media.json")
      .then((response) => response.json())
      .then((jsonData) => {
        // Add selected = false, so the checkbox gets a value.
        const mappedData = jsonData.media.map((mediaItem) => {
          return {
            selected: false,
            ...mediaItem,
          };
        });
        setMedia(mappedData);
      });
  }, []);

  /**
   * Closes delete modal.
   */
  function onCloseDeleteModal() {
    setShowDeleteModal(false);
  }

  /**
   * @param {object} props
   * The props.
   * @param {string} props.description
   * The description should be searchable.
   * @param {string} props.name
   * The name should be searchable.
   * @returns {boolean}
   * Whether the searchtext is in the data entry.
   */
  function filterDataFromSearchInput({ description, name }) {
    const dataValuesString = Object.values({ description, name }).join(" ");
    return dataValuesString
      .toLocaleLowerCase()
      .includes(searchText.toLocaleLowerCase());
  }

  /**
   * @returns {object}
   * returns object of paginated data array and length of data.
   */
  function getListData() {
    let returnValue = [];
    if (selectedTags.length > 0) {
      media.forEach((element) => {
        // Ids of the selected tags
        const ids = selectedTags.map((a) => a.id);
        // Creates an array where the intersection between media.tags and ids.
        const filteredArray = element.tags.filter(({ id }) => ids.includes(id));
        // If there is an overlap, the media has the tag and should be displayed.
        if (filteredArray.length > 0) returnValue.push(element);
      });
    } else {
      // If there are no selected tags, the media should just be displayed
      returnValue = media;
    }

    // Filter by search text.
    if (searchText) {
      returnValue = returnValue.filter(filterDataFromSearchInput);
    }

    return returnValue;
  }

  /**
   * Sets the url.
   */
  useEffect(() => {
    if (!fromModal) {
      const params = new URLSearchParams();
      if (searchText) {
        params.append("search", searchText);
      }
      if (selectedTags.length > 0) {
        const selectedTagsForUrl = selectedTags.map((a) => `${a.name}@${a.id}`);
        params.append("tags", selectedTagsForUrl.join(","));
      }
      history.replace({ search: params.toString() });
    }
  }, [searchText, selectedTags]);

  /**
   * Sets selected tags.
   *
   * @param {object} props
   * The props.
   * @param {object} props.target
   * The target, which is the selected tags.
   */
  function onTagInput({ target }) {
    setSelectedTags(target.value);
  }

  /**
   * Sets search text.
   *
   * @param {string} newSearchText
   * Updates the search text state and url.
   */
  function handleSearch(newSearchText) {
    setSearchText(newSearchText);
  }

  /**
   * Deletes selected data, and closes modal.
   */
  function handleDelete() {
    // @TODO: delete elements
    setShowDeleteModal(false);
    setSelectedMedia([]);
  }

  /**
   * Sets the selected media in state.
   *
   * @param {object} data
   * The selected media.
   */
  function handleChecked(data) {
    const mediaData = data;
    mediaData.selected = !mediaData.selected;
    setSelectedMedia(selectedHelper(mediaData, [...selectedMedia]));
    if (fromModal) {
      handleSelected(selectedHelper(mediaData, [...selectedMedia]));
    }
  }

  return (
    <>
      <Row className="align-items-center justify-content-between mt-2">
        <Col>
          <h1>{t("media-list.header")}</h1>
        </Col>
        {!fromModal && (
          <>
            <Col xs="auto">
              <Link className="btn btn-success" to="/media/new">
                {t("media-list.upload-new-media")}
              </Link>
            </Col>
            <Col xs="auto">
              <div className="ml-4">
                <Button
                  variant="danger"
                  id="delete_media_button"
                  disabled={disableDeleteButton}
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
          <Col sm={12} md={6} className="mt-3 mt-md-0">
            <TagDropdown
              selected={selectedTags}
              name="tags"
              label={t("media-list.tags-select-label")}
              handleTagSelection={onTagInput}
              helpText={t("media-list.tags-select-help-text")}
            />
          </Col>
        </Row>

        <div className="row row-cols-2 row-cols-sm-3 row-cols-xl-4 row-cols-xxl-5  media-list">
          {getListData().map((data) => (
            <div key={data.id} className="col mb-3">
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
                    src={data.url}
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
                    <div className="col-auto ms-auto">
                      <Link
                        className="btn btn-primary btn-sm"
                        to={`/media/${data.id}`}
                      >
                        {t("media-list.edit-button")}
                      </Link>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <span className="small">{data.description}</span>
                    </div>
                  </div>
                  <div className="row mt-1">
                    <div className="col">
                      {data.tags.map((tag) => (
                        <span
                          className="badge bg-light text-dark border me-1"
                          key={tag.id}
                        >
                          {tag.name}{" "}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ContentBody>
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
