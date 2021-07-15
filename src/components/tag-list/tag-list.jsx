import { React, useState, useEffect } from "react";
import { Button, Row, Container, Col, Form } from "react-bootstrap";
import { FormattedMessage } from "react-intl";
import List from "../util/list/list";
import DeleteModal from "../delete-modal/delete-modal";
/**
 * The tag list component.
 *
 * @returns {object}
 * The TagList
 */
function TagList() {
  const [selectedCells, setSelectedCells] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [tags, setTags] = useState([]);

  /**
   * Load content from fixture.
   */
  useEffect(() => {
    // @TODO load real content.
    fetch("./fixtures/tags/tags.json")
      .then((response) => response.json())
      .then((jsonData) => {
        setTags(jsonData);
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
      path: "slides",
      sort: true,
      label: (
        <FormattedMessage
          id="table_header_number_of_slides"
          defaultMessage="table_header_number_of_slides"
        />
      ),
    },
    {
      key: "edit",
      content: () => (
        <>
          <div className="m-2">
            <Button disabled={selectedCells.length > 0} variant="success">
              Rediger
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
  function onCloseModal() {
    setSelectedCells([]);
    setShowDeleteModal(false);
  }

  return (
    <Container>
      <Row className="align-items-end mt-2">
        <Col>
          <h1>
            {" "}
            <FormattedMessage
              id="tags_list_header"
              defaultMessage="tags_list_header"
            />
          </h1>
        </Col>
        <Col md="auto">
          <Button>
            {" "}
            <FormattedMessage
              id="create_new_tag"
              defaultMessage="create_new_tag"
            />
          </Button>
        </Col>
      </Row>
      {tags.tags && (
        <List
          columns={columns}
          selectedCells={selectedCells}
          data={tags.tags}
        />
      )}
      <DeleteModal
        show={showDeleteModal}
        onClose={onCloseModal}
        handleAccept={handleDelete}
        selectedCells={selectedCells}
      />
    </Container>
  );
}

export default TagList;
