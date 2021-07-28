import { React, useEffect, useState } from "react";
import { Container, Button, Row, Col, Form } from "react-bootstrap";
import selectedRowsHelper from "../util/helpers/selectedRowsHelper";
import DeleteModal from "../delete-modal/delete-modal";
import TagDropdown from "../util/forms/multiselect-dropdown/tags/tag-dropdown";
import "./media-list.scss";
import { FormattedMessage } from "react-intl";
import { useLocation, useHistory } from "react-router-dom";
import SearchBox from "../util/search-box/search-box";

/**
 * The media list component.
 *
 * @returns {object}
 * The media list.
 */
function MediaList() {
  const [media, setMedia] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState([]);
  const { search } = useLocation();
  const disableDeleteButton = !selectedMedia.length > 0;
  const history = useHistory();
  const searchParams = new URLSearchParams(search).get("search");
  const tagsParams = new URLSearchParams(search).get("tags");
  let tags;
  if (tagsParams) {
    tags = tagsParams.split(",").map((tag) => {
      let tagFields = tag.split("@");
      var name = tagFields[0];
      var id = parseInt(tagFields[1]);
      return { name: name, id: id };
    });
  }
  const [searchText, setSearchText] = useState(
    searchParams !== "null" ? searchParams : ""
  );
  const [filteredMedia, setFilteredMedia] = useState([]);
  const [selectedTags, setSelectedTags] = useState(tags ? tags : []);
  /**
   * Load content from fixture.
   */
  useEffect(() => {
    // @TODO load real content.
    fetch(`/fixtures/media/media.json`)
      .then((response) => response.json())
      .then((jsonData) => {
        setMedia(jsonData.media);
        setFilteredMedia(jsonData.media);
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
        element.tags.forEach((tag) => {
          if (selectedTagsName.includes(tag.name)) {
            returnValue.push(element);
            return;
          }
        });
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
    const selectedTagsForUrl = selectedTags.map((a) => `${a.name}@${a.id}`);
    params.append("tags", selectedTagsForUrl.join(","));
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
    setSelectedMedia(selectedRowsHelper(data, [...selectedMedia]));
  }

  return (
    <Container>
      <h1>Medier</h1>
      <TagDropdown
        selected={selectedTags}
        name="tags"
        label={"Søg pr tags"}
        handleTagSelection={onTagInput}
      ></TagDropdown>
      <Row className="mt-2 mb-2">
        <Col>
          <SearchBox value={searchText} onChange={handleSearch} />
        </Col>
        <Col className="d-flex justify-content-end">
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
      <div className="image-list">
        {getListData().map((data) => (
          <>
            <div key={data.id} className="image-wrapper">
              <img src={data.url} alt={data.description} />
              <Form.Check
                type="checkbox"
                onChange={() => handleChecked(data)}
                aria-label={"Vælg dette billede"}
              />
              <span>Navn: {data.name}</span>
              <span>Beskrivelse: {data.description}</span>
              <div>
                {data.tags.map((tag) => (
                  <span key={tag.id}>{tag.name} </span>
                ))}
              </div>
            </div>
          </>
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
