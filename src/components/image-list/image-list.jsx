import { React, useState, useEffect } from "react";
import { Button, Row, Container, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FormattedMessage, useIntl } from "react-intl";
import selectedRowsHelper from "../util/helpers/selectedRowsHelper";
import CheckboxForList from "../util/list/checkbox-for-list";
import List from "../util/list/list";
import LinkForList from "../util/list/link-for-list";
import DeleteModal from "../delete-modal/delete-modal";
/**
 * The images list component.
 *
 * @returns {object}
 * The images list.
 */
function ImageList() {
  const intl = useIntl();
  const [selectedRows, setSelectedRows] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [images, setImages] = useState([]);

  /**
   * Load content from fixture.
   */
  useEffect(() => {
    // @TODO load real content.
    fetch(`/fixtures/images/images.json`)
      .then((response) => response.json())
      .then((jsonData) => {
        setImages(jsonData);
      });
  }, []);

  /**
   * Sets the selected row in state.
   *
   * @param {object} data
   * The selected row.
   */
  function handleSelected(data) {
    setSelectedRows(selectedRowsHelper(data, [...selectedRows]));
  }

  /**
   * Opens the delete modal, for deleting row.
   *
   * @param {object} props
   * The props.
   * @param {string} props.name
   * The name of the image.
   * @param {number} props.id
   * The id of the image
   */
  function openDeleteModal({ id, name }) {
    setSelectedRows([{ id, name }]);
    setShowDeleteModal(true);
  }

  // The columns for the table.
  const columns = [
    {
      key: "pick",
      label: intl.formatMessage({ id: "table_header_pick" }),
      content: (data) => (
        <CheckboxForList onSelected={() => handleSelected(data)} />
      ),
    },
    {
      path: "name",
      sort: true,
      label: intl.formatMessage({ id: "table_header_name" }),
    },
    {
      path: "createdBy",
      sort: true,
      label: intl.formatMessage({ id: "table_header_created_by" }),
    },
    {
      key: "edit",
      content: (data) => <LinkForList data={data} param="image" />,
    },
    {
      key: "delete",
      content: (data) => (
        <>
          <div className="m-2">
            <Button
              variant="danger"
              disabled={selectedRows.length > 0}
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
   * Deletes image, and closes modal.
   *
   * @param {object} props
   * The props.
   * @param {string} props.name
   * The name of the image.
   * @param {number} props.id
   * The id of the image
   */
  // eslint-disable-next-line
  function handleDelete({ id, name }) {
    // @TODO delete element
    setSelectedRows([]);
    setShowDeleteModal(false);
  }

  /**
   * Closes the delete modal.
   */
  function onCloseModal() {
    setSelectedRows([]);
    setShowDeleteModal(false);
  }

  return (
    <Container>
      <Row className="align-items-end mt-2">
        <Col>
          <h1>
            <FormattedMessage
              id="images_list_header"
              defaultMessage="images_list_header"
            />
          </h1>
        </Col>
        <Col md="auto">
          <Link className="btn btn-primary btn-success" to="/image/new">
            <FormattedMessage
              id="create_new_image"
              defaultMessage="create_new_image"
            />
          </Link>
        </Col>
      </Row>
      {images.images && (
        <List
          columns={columns}
          selectedRows={selectedRows}
          data={images.images}
        />
      )}
      <DeleteModal
        show={showDeleteModal}
        onClose={onCloseModal}
        handleAccept={handleDelete}
        selectedRows={selectedRows}
      />
    </Container>
  );
}

export default ImageList;
