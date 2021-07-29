import { React, useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import CampaignIcon from "./campaign-icon";
import CheckboxForList from "../util/list/checkbox-for-list";
import selectedHelper from "../util/helpers/selectedHelper";
import LinkForList from "../util/list/link-for-list";
import DeleteModal from "../delete-modal/delete-modal";
import List from "../util/list/list";
/**
 * The screen list component.
 *
 * @returns {object}
 *   The screen list.
 */
function ScreenList() {
  const intl = useIntl();
  const [selectedRows, setSelectedRows] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [screens, setScreens] = useState([]);

  /**
   * Load content from fixture.
   * TODO load real content.
   */
  useEffect(() => {
    fetch(`/fixtures/screens/screens.json`)
      .then((response) => response.json())
      .then((jsonData) => {
        setScreens(jsonData);
      });
  }, []);

  /**
   * Sets the selected row in state.
   *
   * @param {object} data
   * The selected row.
   */
  function handleSelected(data) {
    setSelectedRows(selectedHelper(data, [...selectedRows]));
  }

  /**
   * Opens the delete modal, for deleting row.
   *
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
      path: "size",
      sort: true,
      label: intl.formatMessage({ id: "table_header_size" }),
    },
    {
      path: "dimensions",
      sort: true,
      label: intl.formatMessage({ id: "table_header_dimensions" }),
    },
    {
      path: "overriddenByCampaign",
      sort: true,
      label: intl.formatMessage({ id: "table_header_campaign" }),
      content: (data) => CampaignIcon(data),
    },
    {
      key: "edit",
      content: (data) => <LinkForList data={data} param="screen" />,
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
   * Deletes screen, and closes modal.
   *
   * @param {object} props
   * The props.
   * @param {string} props.name
   * The name of the tag.
   * @param {number} props.id
   * The id of the tag
   */
  // eslint-disable-next-line
  function handleDelete({ id, name }) {
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
              id="screens_list_header"
              defaultMessage="screens_list_header"
            />
          </h1>
        </Col>
        <Col md="auto">
          <Link className="btn btn-primary btn-success" to="/screen/new">
            <FormattedMessage
              id="create_new_screen"
              defaultMessage="create_new_screen"
            />
          </Link>
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
