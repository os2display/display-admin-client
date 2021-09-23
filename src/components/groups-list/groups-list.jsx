import { React, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import selectedHelper from "../util/helpers/selectedHelper";
import CheckboxForList from "../util/list/checkbox-for-list";
import List from "../util/list/list";
import LinkForList from "../util/list/link-for-list";
import DeleteModal from "../delete-modal/delete-modal";
import ContentHeader from "../util/content-header/content-header";
import ContentBody from "../util/content-body/content-body";

/**
 * The groups list component.
 *
 * @returns {object}
 * The groups list.
 */
function GroupsList() {
  const { t } = useTranslation("common");
  const [selectedRows, setSelectedRows] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [groups, setGroups] = useState([]);

  /**
   * Load content from fixture.
   */
  useEffect(() => {
    // @TODO: load real content.
    fetch(`/fixtures/groups/groups.json`)
      .then((response) => response.json())
      .then((jsonData) => {
        setGroups(jsonData);
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
   * The name of the group.
   * @param {number} props.id
   * The id of the group
   */
  function openDeleteModal({ id, name }) {
    setSelectedRows([{ id, name }]);
    setShowDeleteModal(true);
  }

  // The columns for the table.
  const columns = [
    {
      key: "pick",
      label: t("groups-list.columns.pick"),
      content: (data) => (
        <CheckboxForList
          onSelected={() => handleSelected(data)}
          selected={selectedRows.indexOf(data) > -1}
        />
      ),
    },
    {
      path: "name",
      sort: true,
      label: t("groups-list.columns.name"),
    },
    {
      path: "createdBy",
      sort: true,
      label: t("groups-list.columns.created-by"),
    },
    {
      key: "edit",
      content: (data) => (
        <LinkForList
          data={data}
          label={t("groups-list.edit-button")}
          param="group"
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
            {t("groups-list.delete-button")}
          </Button>
        </>
      ),
    },
  ];

  /**
   * Deletes group, and closes modal.
   *
   * @param {object} props
   * The props.
   * @param {string} props.name
   * The name of the group.
   * @param {number} props.id
   * The id of the group
   */
  // eslint-disable-next-line
  function handleDelete({ id, name }) {
    // @TODO: delete element
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

  /**
   * Clears the selected rows.
   */
  function clearSelectedRows() {
    setSelectedRows([]);
  }

  return (
    <>
      <ContentHeader
        title={t("groups-list.header")}
        newBtnTitle={t("groups-list.create-new-group")}
        newBtnLink="/group/new"
      />
      <ContentBody>
        {groups.groups && (
          <List
            showMerge
            columns={columns}
            selectedRows={selectedRows}
            data={groups.groups}
            clearSelectedRows={clearSelectedRows}
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

export default GroupsList;
