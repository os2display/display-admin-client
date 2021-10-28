import { React, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "react-bootstrap/Button";
import ContentBody from "../util/content-body/content-body";
import ContentHeader from "../util/content-header/content-header";
import selectedHelper from "../util/helpers/selectedHelper";
import CheckboxForList from "../util/list/checkbox-for-list";
import List from "../util/list/list";
import LinkForList from "../util/list/link-for-list";
import DeleteModal from "../delete-modal/delete-modal";

/**
 * The user list component.
 *
 * @returns {object} The user list
 */
function UserList() {
  const { t } = useTranslation("common");
  const [selectedRows, setSelectedRows] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [users, setUsers] = useState([]);

  /** Load content from fixture. */
  useEffect(() => {
    // @TODO: load real content.
    fetch(`/fixtures/users/users.json`)
      .then((response) => response.json())
      .then((jsonData) => {
        setUsers(jsonData);
      });
  }, []);

  /**
   * Sets the selected row in state.
   *
   * @param {object} data The selected row.
   */
  function handleSelected(data) {
    setSelectedRows(selectedHelper(data, [...selectedRows]));
  }

  /**
   * Opens the delete modal, for deleting row.
   *
   * @param {object} props The props.
   * @param {string} props.name The name of the user.
   * @param {number} props.id The id of the user
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
          <Button
            variant="danger"
            disabled={selectedRows.length > 0}
            onClick={() => openDeleteModal(data)}
          >
            {t("user-list.delete-button")}
          </Button>
        </>
      ),
    },
  ];

  /**
   * Deletes user, and closes modal.
   *
   * @param {object} props The props.
   * @param {string} props.name The name of the user.
   * @param {number} props.id The id of the user
   */
  // eslint-disable-next-line
  function handleDelete({ id, name }) {
    // @TODO: delete element
    setSelectedRows([]);
    setShowDeleteModal(false);
  }

  /** Closes the delete modal. */
  function onCloseModal() {
    setSelectedRows([]);
    setShowDeleteModal(false);
  }

  return (
    <>
      <ContentHeader
        title={t("user-list.header")}
        newBtnTitle={t("user-list.create-new-user")}
        newBtnLink="/user/new"
      />
      <ContentBody>
        {users.users && (
          <List
            showMerge
            columns={columns}
            selectedRows={selectedRows}
            data={users.users}
          />
        )}
      </ContentBody>
      <DeleteModal
        show={showDeleteModal}
        onClose={onCloseModal}
        handleAccept={handleDelete}
        selectedRows={selectedRows}
      />
    </>
  );
}

export default UserList;
