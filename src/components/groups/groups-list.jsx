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
  displaySuccess,
  displayError,
} from "../util/list/toast-component/display-toast";
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
  const [listData, setListData] = useState();
  const [localStorageMessages, setLocalStorageMessages] = useState([]);
  const [loadingMessage, setLoadingMessage] = useState(
    t("groups-list.loading-messages.loading-groups")
  );

  // Delete call
  const [
    DeleteV1ScreenGroups,
    { isSuccess: isDeleteSuccess, error: isDeleteError },
  ] = useDeleteV1ScreenGroupsByIdMutation();

  /** Deletes multiple groups. */
  useEffect(() => {
    if (groupsToDelete.length > 0) {
      setIsDeleting(true);
      setLoadingMessage(t("groups-list.loading-messages.deleting-group"));
      const groupToDelete = groupsToDelete.splice(0, 1).shift();
      const groupToDeleteId = idFromUrl(groupToDelete["@id"]);
      DeleteV1ScreenGroups({ id: groupToDeleteId });
    } else if (isDeleteSuccess) {
      // If delete is a success, the list is reloaded, and a success message is saved in local storage for later use.
      localStorage.setItem(
        "messages",
        JSON.stringify([
          ...localStorageMessages,
          t("groups-list.success-messages.group-delete"),
        ])
      );

      window.location.reload(false);
    }
  }, [groupsToDelete, isDeleteSuccess]);

  // Sets success messages in local storage, because the page is reloaded
  useEffect(() => {
    if (isDeleteSuccess && groupsToDelete.length > 0) {
      const localStorageMessagesCopy = [...localStorageMessages];
      localStorageMessagesCopy.push(
        t("groups-list.success-messages.group-delete")
      );
      setLocalStorageMessages(localStorageMessagesCopy);
    }
  }, [isDeleteSuccess]);

  // Displays the success messages from successfully deleted slides, and removes them from local storage.
  useEffect(() => {
    // TODO: Refactor this when Redux Toolkit cache refresh is set up.
    const messages = JSON.parse(localStorage.getItem("messages"));
    if (messages) {
      messages.forEach((element) => {
        displaySuccess(element);
      });
      localStorage.removeItem("messages");
    }
  }, []);

  // Display error on unsuccessful deletion
  useEffect(() => {
    if (isDeleteError) {
      setIsDeleting(false);
      displayError(
        t("groups-list.error-messages.group-delete-error", {
          error: isDeleteError.error
            ? isDeleteError.error
            : isDeleteError.data["hydra:description"],
        })
      );
    }
  }, [isDeleteError]);

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

  useEffect(() => {
    if (data) {
      setListData(data);
    }
  }, [data]);

  // Error with retrieving list of groups
  useEffect(() => {
    if (groupsGetError) {
      displayError(
        t("groups-list.error-messages.groups-load-error", {
          error: groupsGetError.error
            ? groupsGetError.error
            : groupsGetError.data["hydra:description"],
        })
      );
    }
  }, [groupsGetError]);

  return (
    <>
      <ContentHeader
        title={t("groups-list.header")}
        newBtnTitle={t("groups-list.create-new-group")}
        newBtnLink="/group/create"
      />
      <ContentBody>
        {listData && (
          <List
            columns={columns}
            totalItems={listData["hydra:totalItems"]}
            currentPage={page}
            handlePageChange={onChangePage}
            selectedRows={selectedRows}
            data={listData["hydra:member"]}
            clearSelectedRows={clearSelectedRows}
            handleDelete={openDeleteModal}
            deleteSuccess={isDeleteSuccess || false}
            handleSort={onChangeSort}
            handleSearch={onSearch}
            isLoading={isLoading || isDeleting}
            loadingMessage={loadingMessage}
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
