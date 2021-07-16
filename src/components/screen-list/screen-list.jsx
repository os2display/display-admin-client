import { React, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormattedMessage } from "react-intl";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { Button, Row, Container, Col } from "react-bootstrap";
import CheckboxForList from "../util/list/checkbox-for-list";
import selectedRowsHelper from "../util/helpers/selectedRowsHelper";
import DeleteModal from "../delete-modal/delete-modal";
import List from "../util/list/list";
/**
 * The tag list component.
 *
 * @returns {object}
 *   The TagList
 */
function ScreenList() {
  const [selectedRows, setSelectedRows] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [screens, setScreens] = useState([]);

  /**
   * Load content from fixture.
   * TODO load real content.
   */
  useEffect(() => {
    fetch("./fixtures/screens/screens.json")
      .then((response) => response.json())
      .then((jsonData) => {
        setScreens(jsonData);
      });
  }, []);

  /**
   * @param {object} data
   * The selected row.
   */
  function handleSelected(data) {
    setSelectedRows(selectedRowsHelper(data, [...selectedRows]));
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
    setSelectedRows([{ id, name }]);
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
        <CheckboxForList onSelected={() => handleSelected(data)} />
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
      path: "size",
      sort: true,
      label: (
        <FormattedMessage
          id="table_header_size"
          defaultMessage="table_header_size"
        />
      ),
    },
    {
      path: "dimensions",
      sort: true,
      label: (
        <FormattedMessage
          id="table_header_dimensions"
          defaultMessage="table_header_dimensions"
        />
      ),
    },
    {
      path: "overriddenByCampaign",
      sort: true,
      label: (
        <FormattedMessage
          id="table_header_campaign"
          defaultMessage="table_header_campaign"
        />
      ),
      content: (
        data // eslint-disable-line
      ) => (
        <div className="m-2">
          <FontAwesomeIcon
            className="search-icon"
            icon={faExclamationCircle}
            style={
              data.overriddenByCampaign ? { color: "red" } : { color: "grey" } // eslint-disable-line
            }
          />
        </div>
      ),
    },
    {
      key: "edit",
      content: () => (
        <>
          <div className="m-2">
            <Button disabled={selectedRows.length > 0} variant="success">
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
   * @param {object} props
   * The props.
   * @param {string} props.name
   * The name of the tag.
   * @param {number} props.id
   * The id of the tag
   */
  function handleDelete({ id, name }) {
    console.log(`deleted ${id}:${name}`); // eslint-disable-line
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
              id="screens_list_header"
              defaultMessage="screens_list_header"
            />
          </h1>
        </Col>
        <Col md="auto">
          <Button>
            <FormattedMessage
              id="create_new_screen"
              defaultMessage="create_new_screen"
            />
          </Button>
        </Col>
      </Row>
      {screens.screens && (
        <List
          columns={columns}
          selectedRows={selectedRows}
          data={screens.screens}
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

export default ScreenList;
