import { React, useEffect, useState } from "react";
import { Container, Button, Row, Col, Form } from "react-bootstrap";
import selectedRowsHelper from "../util/helpers/selectedRowsHelper";
import { Link } from "react-router-dom";
import DeleteModal from "../delete-modal/delete-modal";
import TagDropdown from "../util/forms/multiselect-dropdown/tags/tag-dropdown";
import { FormattedMessage, useIntl } from "react-intl";
import { useLocation, useHistory } from "react-router-dom";
import SearchBox from "../util/search-box/search-box";
import "./media-list.scss";

/**
 * The media list component.
 *
 * @returns {object}
 * The media list.
 */
function MediaList() {
  const intl = useIntl();
  const [media, setMedia] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState([]);
  const { search } = useLocation();
  const disableDeleteButton = !selectedMedia.length > 0;
  const history = useHistory();
  const searchParams = new URLSearchParams(search).get("search");
  const tagsParams = new URLSearchParams(search).get("tags");
  const tagsSelectLabel = intl.formatMessage({
    id: "media_tags_select_label",
  });
  const pickImageAriaLabel = intl.formatMessage({
    id: "pick_this_media_for_bulk_action",
  });
  const [searchText, setSearchText] = useState(
    searchParams === null ? "" : searchParams
  );
  function getTagsParams() {
    let returnTags = [];
    if (tagsParams) {
      returnTags = tagsParams.split(",").map((tag) => {
        let tagFields = tag.split("@");
        return { name: tagFields[0], id: parseInt(tagFields[1]) };
      });
    }
    return returnTags;
  }
  const [selectedTags, setSelectedTags] = useState(getTagsParams(tagsParams));
  /**
   * Load content from fixture.
   */

  useEffect(() => {
    // @TODO load real content.
    fetch("/fixtures/media/media.json")
      .then((response) => response.json())
      .then((jsonData) => {
        setMedia(
          jsonData.media.map(
            (media) => ((media.selected = false), { ...media })
          )
        );
      });
  }, []);

  /**
   * Closes delete modal.
   */
  function onCloseDeleteModal() {
    setShowDeleteModal(false);
  }

  /**
   * @param {object} dataToFilter
   * Search filter function.
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
      const selectedTagsName = selectedTags.map((a) => a.name);
      media.forEach((element) => {
        const ids = selectedTags.map((a) => a.id);
        const filteredArray = element.tags.filter(({ id }) => ids.includes(id));
        if (filteredArray.length > 0) {
          returnValue.push(element);
        }
        console.log(returnValue);
      });
    } else {
      returnValue = media;
    }

    if (searchText) {
      returnValue = returnValue.filter(filterDataFromSearchInput);
    }

    return returnValue;
  }

  /**
   * If they search or filter, the pagination is reset.
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

  function onTagInput({ target }) {
    setSelectedTags(target.value);
  }
  /**
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
   * Sets the selected row in state.
   *
   * @param {object} data
   * The selected row.
   */
  function handleChecked(data) {
    data.selected = !data.selected;
    setSelectedMedia(selectedRowsHelper(data, [...selectedMedia]));
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
          <SearchBox
            showLabel={true}
            value={searchText}
            onChange={handleSearch}
          />
        </Col>
        <Col>
          <TagDropdown
            selected={selectedTags}
            name="tags"
            label={tagsSelectLabel}
            handleTagSelection={onTagInput}
          ></TagDropdown>
        </Col>
      </Row>
      <div className="image-list">
        {getListData().map((data) => (
          <div key={data.id} className="image-wrapper">
            <img
              src={data.url}
              alt={data.description}
              onClick={() => handleChecked(data)}
            />
            <Form.Check
              type="checkbox"
              checked={data.selected}
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
