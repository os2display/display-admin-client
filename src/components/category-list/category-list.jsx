import { React, useState, useEffect } from "react";
import { Button, Row, Container, Col, Form } from "react-bootstrap";
import { FormattedMessage } from "react-intl";
import List from "../util/list/list";
import DeleteModal from "../delete-modal/delete-modal";
import InfoModal from "../info-modal/info-modal";
/**
 * The category list component.
 *
 * @returns {object}
 * The CategoryList
 */
function CategoryList() {
  const [selectedCells, setSelectedCells] = useState([]);
  const [onPlaylists, setOnPlaylists] = useState();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [categories, setCategories] = useState([]);

  /**
   * Load content from fixture.
   */
  useEffect(() => {
    // @TODO load real content.
    fetch("./fixtures/categories/categories.json")
      .then((response) => response.json())
      .then((jsonData) => {
        setCategories(jsonData.categories);
      });
  }, []);

  /**
   * @param {object} props
   * The props.
   * @param {string} props.name
   * The name of the tag.
   * @param {number} props.id
   * The id of the tag
   */
  function handleSelected({ name, id }) {
    const localSelectedCells = [...selectedCells];
    const alreadySelected = selectedCells.find((x) => x.id === id);
    if (alreadySelected) {
      localSelectedCells.splice(localSelectedCells.indexOf({ name, id }), 1);
    } else {
      localSelectedCells.push({ name, id });
    }

    setSelectedCells(localSelectedCells);
  }

  /**
   * @param {object} props
   * The props.
   * @param {string} props.name
   * The name of the tag.
   * @param {number} props.id
   * The id of the tag
   */
  function openDeleteModal({ id, name }) {
    setSelectedCells([{ id, name }]);
    setShowDeleteModal(true);
  }

  /**
   * @param {Array} playlistArray
   * The array of playlists.
   */
  function openInfoModal(playlistArray) {
    setOnPlaylists(playlistArray);
    setShowInfoModal(true);
  }

  const columns = [
    {
      key: "pick",
      label: (
        <FormattedMessage
          id="table_header_pick"
          defaultMessage="table_header_pick"
        />
      ),
      content: (data) => (
        <FormattedMessage
          id="aria_choose_element_for_action"
          defaultMessage="aria_choose_element_for_action"
        >
          {(message) => (
            <Form>
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check
                  onChange={() => handleSelected(data)}
                  type="checkbox"
                  aria-label={message}
                />
              </Form.Group>
            </Form>
          )}
        </FormattedMessage>
      ),
    },
    {
      path: "name",
      sort: true,
      label: (
        <FormattedMessage
          id="table_header_name"
          defaultMessage="table_header_name"
        />
      ),
    },
    {
      path: "createdBy",
      sort: true,
      label: (
        <FormattedMessage
          id="table_header_created_by"
          defaultMessage="table_header_created_by"
        />
      ),
    },
    {
      sort: true,
      path: "onFollowingPlaylists",
      content: (
        data // eslint-disable-line
      ) => (
        <button
          type="button"
          onClick={() => openInfoModal(data.onFollowingPlaylists)}
        >
          {data.onFollowingPlaylists.length} {/*eslint-disable-line */}
        </button>
      ),
      key: "playlists",
      label: (
        <FormattedMessage
          id="table_header_number_of_playlists"
          defaultMessage="table_header_number_of_playlists"
        />
      ),
    },
    {
      key: "edit",
      content: () => (
        <>
          <div className="m-2">
            <Button disabled={selectedCells.length > 0} variant="success">
              <FormattedMessage id="edit" defaultMessage="edit" />
            </Button>
          </div>
        </>
      ),
    },
    {
      key: "delete",
      content: (data) => (
        <>
          <div className="m-2">
            <Button
              variant="danger"
              disabled={selectedCells.length > 0}
              onClick={() => openDeleteModal(data)}
            >
              <FormattedMessage id="delete" defaultMessage="delete" />
            </Button>
          </div>
        </>
      ),
    },
  ];

  /**
   * @param {object} props
   * The props.
   * @param {string} props.name
   * The name of the tag.
   * @param {number} props.id
   * The id of the tag
   */
  // eslint-disable-next-line
  function handleDelete({ id, name }) {
    // @TODO delete element
    setShowDeleteModal(false);
  }

  /**
   * Closes the delete modal.
   */
  function onCloseDeleteModal() {
    setSelectedCells([]);
    setShowDeleteModal(false);
  }

  /**
   * Closes the info modal.
   */
  function onCloseInfoModal() {
    setOnPlaylists();
    setShowInfoModal(false);
  }

  return (
    <Container>
      <Row className="align-items-end mt-2">
        <Col>
          <h1>
            <FormattedMessage
              id="categories_list_header"
              defaultMessage="categories_list_header"
            />
          </h1>
        </Col>
        <Col md="auto">
          <Button>
            <FormattedMessage
              id="create_new_category"
              defaultMessage="create_new_category"
            />
          </Button>
        </Col>
      </Row>
      {categories && (
        <List
          columns={columns}
          selectedCells={selectedCells}
          data={categories}
        />
      )}
      <DeleteModal
        show={showDeleteModal}
        onClose={onCloseDeleteModal}
        handleAccept={handleDelete}
        selectedCells={selectedCells}
      />
      <InfoModal
        show={showInfoModal}
        onClose={onCloseInfoModal}
        onPlaylists={onPlaylists}
      />
    </Container>
  );
}

export default CategoryList;
