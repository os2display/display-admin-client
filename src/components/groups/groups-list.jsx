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
import idFromUrl from "../util/helpers/id-from-url";
import {
  useGetV1ScreenGroupsQuery,
  useDeleteV1ScreenGroupsByIdMutation,
} from "../../redux/api/api.generated";

/**
 * The groups list component.
 *
 * @returns {object} The groups list.
 */
function GroupsList() {
  const { t } = useTranslation("common");

  // Local state
  const [selectedRows, setSelectedRows] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [page, setPage] = useState();
  const [groupsToDelete, setGroupsToDelete] = useState([]);
  const [sortBy, setSortBy] = useState();
  const [searchText, setSearchText] = useState();

  // Delete call
  const [DeleteV1ScreenGroups, { isSuccess: isDeleteSuccess }] =
    useDeleteV1ScreenGroupsByIdMutation();

  /** Deletes multiple groups. */
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

  /**
   * Sets the selected row in state.
   *
   * @param {object} data The selected row.
   */
  function handleSelected(data) {
    setSelectedRows(selectedHelper(data, [...selectedRows]));
  }

  /** Clears the selected rows. */
  function clearSelectedRows() {
    setSelectedRows([]);
  }

  /**
   * Opens the delete modal
   *
   * @param {object} item The item to delete
   */
  function openDeleteModal(item) {
    if (item) {
      setSelectedRows([{ "@id": item["@id"], title: item.title }]);
    }
    setShowDeleteModal(true);
  }

  /** Deletes group(s), and closes modal. */
  function handleDelete() {
    setGroupsToDelete(selectedRows);
    clearSelectedRows();
    setShowDeleteModal(false);
  }

  /** Closes the delete modal. */
  function onCloseModal() {
    clearSelectedRows();
    setShowDeleteModal(false);
  }

  /**
   * Sets next page.
   *
   * @param {number} pageNumber - The next page.
   */
  function onChangePage(pageNumber) {
    setPage(pageNumber);
  }

  /**
   * Handles sort.
   *
   * @param {object} localSortBy - How the data should be sorted.
   */
  function onChangeSort(localSortBy) {
    setSortBy(localSortBy);
  }

  /**
   * Handles search.
   *
   * @param {object} localSearchText - The search text.
   */
  function onSearch(localSearchText) {
    setSearchText(localSearchText);
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
      path: "title",
      sort: true,
      label: t("groups-list.columns.name"),
    },
    {
      path: "createdBy",
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
   * Sets next page.
   *
   * @param {number} pageNumber - The next page.
   */
  function onChangePage(pageNumber) {
    setPage(pageNumber);
  }

  const {
    data,
    error: groupsGetError,
    isLoading,
  } = useGetV1ScreenGroupsQuery({
    page,
    orderBy: sortBy?.path,
    order: sortBy?.order,
    title: searchText,
  });

  return (
    <>
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
            error={groupsGetError || false}
            isLoading={isLoading || isDeleting || false}
            deleteSuccess={isDeleteSuccess || false}
            handleSort={onChangeSort}
            handleSearch={onSearch}
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
