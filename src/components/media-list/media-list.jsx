import { React, useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useHistory, useLocation } from "react-router-dom";
import { FormattedMessage, useIntl } from "react-intl";
import selectedHelper from "../util/helpers/selectedHelper";
import DeleteModal from "../delete-modal/delete-modal";
import TagDropdown from "../util/forms/multiselect-dropdown/tags/tag-dropdown";

import SearchBox from "../util/search-box/search-box";
import "./media-list.scss";

/**
 * The media list component.
 *
 * @returns {object}
 * The media list.
 */
function MediaList() {
  // Translations
  const intl = useIntl();
  const tagsSelectLabel = intl.formatMessage({
    id: "media_tags_select_label",
  });
  const pickImageAriaLabel = intl.formatMessage({
    id: "pick_this_media_for_bulk_action",
  });

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
    // @TODO load real content.
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
    const params = new URLSearchParams();
    if (searchText) {
      params.append("search", searchText);
    }
    if (selectedTags.length > 0) {
      const selectedTagsForUrl = selectedTags.map((a) => `${a.name}@${a.id}`);
      params.append("tags", selectedTagsForUrl.join(","));
    }
    history.replace({ search: params.toString() });
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
    // @TODO delete elements
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
    mediaData.selected = !data.selected;
    setSelectedMedia(selectedHelper(mediaData, [...selectedMedia]));
  }

  return (
    <Container>
      <Row className="align-items-end mt-2">
        <Col>
          <h1>
            <FormattedMessage id="media_header" defaultMessage="media_header" />
          </h1>
        </Col>
        <Col md="auto">
          <Link className="btn btn-primary btn-success" to="/media/upload">
            <FormattedMessage
              id="upload_new_media"
              defaultMessage="upload_new_media"
            />
          </Link>
        </Col>
        <Col md="auto">
          <div className="ml-4">
            <Button
              variant="danger"
              id="delete-button"
              disabled={disableDeleteButton}
              onClick={() => setShowDeleteModal(true)}
            >
              <FormattedMessage id="delete" defaultMessage="delete" />
            </Button>
          </div>
        </Col>
      </Row>

      <Row className="mt-2 mb-2">
        <Col>
          <SearchBox showLabel value={searchText} onChange={handleSearch} />
        </Col>
        <Col>
          <TagDropdown
            selected={selectedTags}
            name="tags"
            label={tagsSelectLabel}
            handleTagSelection={onTagInput}
          />
        </Col>
      </Row>
      <div className="image-list">
        {getListData().map((data) => (
          <div key={data.id} className="image-wrapper">
            <button type="button" onClick={() => handleChecked(data)}>
              <img
                src={data.url}
                className={data.selected ? "selected" : ""}
                alt={data.description}
              />
            </button>
            <Form.Check
              type="checkbox"
              checked={data.selected}
              tabIndex={-1}
              aria-label={pickImageAriaLabel}
              readOnly
            />
            <span>
              <FormattedMessage id="media_name" defaultMessage="media_name" />:{" "}
              {data.name}
            </span>
            <span>
              <FormattedMessage
                id="media_description"
                defaultMessage="media_description"
              />
              : {data.description}
            </span>
            <div>
              {data.tags.map((tag) => (
                <span key={tag.id}>{tag.name}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <DeleteModal
        show={showDeleteModal}
        handleAccept={handleDelete}
        onClose={onCloseDeleteModal}
        selectedRows={selectedMedia}
      />
    </Container>
  );
}

export default MediaList;
