import { React, useState, useEffect } from "react";
import { Button, Row, Container, Col, Form } from "react-bootstrap";
import List from "./util/list/list";
import DeleteModal from "./delete-modal/delete-modal";

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
      label: "Valg",
      content: (data) => (
        <Form>
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check
              onChange={() => handleSelected(data)}
              type="checkbox"
              aria-label="Vælg element til massehandling"
            />
          </Form.Group>
        </Form>
      ),
    },
    {
      path: "name",
      sort: true,
      label: "Navn",
    },
    { path: "createdBy", sort: true, label: "Oprettet af" },
    { path: "slides", sort: true, label: "Antal slides" },
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
              Slet
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
          <h1>Tags</h1>
        </Col>
        <Col md="auto">
          <Button>Opret nyt tag</Button>
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
