import { React, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Toast from "../util/toast/toast";
import { Spinner } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import selectedHelper from "../util/helpers/selectedHelper";
import CheckboxForList from "../util/list/checkbox-for-list";
import List from "../util/list/list";
import LinkForList from "../util/list/link-for-list";
import DeleteModal from "../delete-modal/delete-modal";
import ContentHeader from "../util/content-header/content-header";
import ContentBody from "../util/content-body/content-body";
import idFromUrl from "../util/helpers/id-from-url";
import {
  useGetV1ScreenGroupsQuery,
  useDeleteV1ScreenGroupsByIdMutation,
} from "../../redux/api/api.generated";

/**
 * The groups list component.
 *
 * @returns {object}
 * The groups list.
 */
function GroupsList() {
  const { t } = useTranslation("common");
  const [selectedRows, setSelectedRows] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [page, setPage] = useState();
  const [groupsToDelete, setGroupsToDelete] = useState([]);
  const [DeleteV1ScreenGroups, { isSuccess: isDeleteSuccess }] =
    useDeleteV1ScreenGroupsByIdMutation();
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
   * Opens the delete modal

   * @param {object} item
   * The item to delete
   */
  function openDeleteModal(item) {
    if (item) {
      setSelectedRows([{ "@id": item["@id"], title: item.title }]);
    }
    setShowDeleteModal(true);
  }

  /**
   * Deletes multiple groups.
   */
  useEffect(() => {
    if (groupsToDelete.length > 0) {
      setIsDeleting(true);
      const groupToDelete = groupsToDelete.splice(0, 1).shift();
      const groupToDeleteId = idFromUrl(groupToDelete["@id"]);
      DeleteV1ScreenGroups({ id: groupToDeleteId });
    } else if (isDeleteSuccess) {
      window.location.reload(false);
    }
  }, [groupsToDelete, isDeleteSuccess]);

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
      path: "title",
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
      content: (data) =>
        LinkForList(data["@id"], "group/edit", t("groups-list.edit-button")),
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
   * Clears the selected rows.
   */
  function clearSelectedRows() {
    setSelectedRows([]);
  }

  /**
   * Sets next page.
   *
   * @param {number} pageNumber - the next page.
   */
  function onChangePage(pageNumber) {
    setPage(pageNumber);
  }

  /**
   * Deletes group(s), and closes modal.
   */
  function handleDelete() {
    setGroupsToDelete(selectedRows);
    clearSelectedRows();
    setShowDeleteModal(false);
  }

  /**
   * Closes the delete modal.
   */
  function onCloseModal() {
    clearSelectedRows();
    setShowDeleteModal(false);
  }

  const {
    data,
    error: groupsGetError,
    isLoading,
  } = useGetV1ScreenGroupsQuery({ page });

  return (
    <>
      <Toast show={groupsGetError} text={t("groups-list.groups-get-error")} />
      <Toast show={isDeleteSuccess} text={t("groups-list.deleted")} />
      <ContentHeader
        title={t("groups-list.header")}
        newBtnTitle={t("groups-list.create-new-group")}
        newBtnLink="/group/create"
      />
      <ContentBody>
        {!(isLoading || isDeleting) && data && data["hydra:member"] && (
          <List
            columns={columns}
            totalItems={data["hydra:totalItems"]}
            currentPage={page}
            handlePageChange={onChangePage}
            selectedRows={selectedRows}
            data={data["hydra:member"]}
            clearSelectedRows={clearSelectedRows}
            handleDelete={openDeleteModal}
          />
        )}
        {(isLoading || isDeleting) && <Spinner animation="grow" />}
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
