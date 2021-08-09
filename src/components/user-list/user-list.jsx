import { React, useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import selectedHelper from "../util/helpers/selectedHelper";
import CheckboxForList from "../util/list/checkbox-for-list";
import List from "../util/list/list";
import LinkForList from "../util/list/link-for-list";
import DeleteModal from "../delete-modal/delete-modal";

/**
 * The user list component.
 *
 * @returns {object}
 * The user list
 */
function UserList() {
  const { t } = useTranslation("common");
  const [selectedRows, setSelectedRows] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [users, setUsers] = useState([]);

  /**
   * Load content from fixture.
   */
  useEffect(() => {
    // @TODO load real content.
    fetch(`/fixtures/users/users.json`)
      .then((response) => response.json())
      .then((jsonData) => {
        setUsers(jsonData);
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
   * The name of the user.
   * @param {number} props.id
   * The id of the user
   */
  function openDeleteModal({ id, name }) {
    setSelectedRows([{ id, name }]);
    setShowDeleteModal(true);
  }

  // The columns for the table.
  const columns = [
    {
      key: "pick",
      label: t("user-list.columns.pick"),
      content: (data) => (
        <CheckboxForList onSelected={() => handleSelected(data)} />
      ),
    },
    {
      path: "name",
      sort: true,
      label: t("user-list.columns.name"),
    },
    {
      path: "createdBy",
      sort: true,
      label: t("user-list.columns.created-by"),
    },
    {
      key: "edit",
      content: (data) => (
        <LinkForList
          data={data}
          label={t("user-list.edit-button")}
          param="user"
        />
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
              {t("user-list.delete-button")}
            </Button>
          </div>
        </>
      ),
    },
  ];

  /**
   * Deletes user, and closes modal.
   *
   * @param {object} props
   * The props.
   * @param {string} props.name
   * The name of the user.
   * @param {number} props.id
   * The id of the user
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
          <h1>{t("user-list.header")}</h1>
        </Col>
        <Col md="auto">
          <Link className="btn btn-primary btn-success" to="/user/new">
            {t("user-list.create-new-user")}
          </Link>
        </Col>
      </Row>
      {users.users && (
        <List
          showMerge
          columns={columns}
          selectedRows={selectedRows}
          data={users.users}
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

export default UserList;
