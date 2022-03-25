import { React, useEffect, useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import selectedHelper from "../util/helpers/selectedHelper";
import List from "../util/list/list";
import UserContext from "../../context/user-context";
import getGroupColumns from "./groups-columns";
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
  const { t } = useTranslation("common", { keyPrefix: "groups-list" });
  const context = useContext(UserContext);

  // Local state
  const [selectedRows, setSelectedRows] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [page, setPage] = useState();
  const [groupsToDelete, setGroupsToDelete] = useState([]);
  const [searchText, setSearchText] = useState();
  const [listData, setListData] = useState();
  const [loadingMessage, setLoadingMessage] = useState(
    t("loading-messages.loading-groups")
  );

  // Delete call
  const [
    DeleteV1ScreenGroups,
    { isSuccess: isDeleteSuccess, error: isDeleteError },
  ] = useDeleteV1ScreenGroupsByIdMutation();

  // Get method
  const {
    data,
    error: groupsGetError,
    isLoading,
    refetch,
  } = useGetV1ScreenGroupsQuery({
    page,
    orderBy: "createdAt",
    order: "desc",
    title: searchText,
  });

  useEffect(() => {
    if (data) {
      setListData(data);
    }
  }, [data]);

  /** Deletes multiple groups. */
  useEffect(() => {
    if (groupsToDelete.length > 0) {
      // As we are deleting multiple groups, the ui will jump if the "is deleting" value from the hook is used.
      setIsDeleting(true);
      if (isDeleteSuccess) {
        displaySuccess(t("success-messages.group-delete"));
      }
      setLoadingMessage(t("loading-messages.deleting-group"));
      const groupToDelete = groupsToDelete.splice(0, 1).shift();
      const groupToDeleteId = idFromUrl(groupToDelete["@id"]);
      DeleteV1ScreenGroups({ id: groupToDeleteId });
    }
  }, [groupsToDelete, isDeleteSuccess]);

  // Sets success messages in local storage, because the page is reloaded
  useEffect(() => {
    if (isDeleteSuccess && groupsToDelete.length === 0) {
      displaySuccess(t("success-messages.group-delete"));
      refetch();
      setIsDeleting(false);
    }
  }, [isDeleteSuccess]);

  // If the tenant is changed, data should be refetched
  useEffect(() => {
    if (context.selectedTenant.get) {
      refetch();
    }
  }, [context.selectedTenant.get]);

  // Display error on unsuccessful deletion
  useEffect(() => {
    if (isDeleteError) {
      setIsDeleting(false);
      displayError(t("error-messages.group-delete-error"), isDeleteError);
    }
  }, [isDeleteError]);

  /**
   * Sets the selected row in state.
   *
   * @param {object} row The selected row.
   */
  function handleSelected(row) {
    setSelectedRows(selectedHelper(row, [...selectedRows]));
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
   * Handles search.
   *
   * @param {object} localSearchText - The search text.
   */
  function onSearch(localSearchText) {
    setSearchText(localSearchText);
  }

  // The columns for the table.
  const columns = getGroupColumns({
    selectedRows,
    handleSelected,
    editNewTab: false,
    handleDelete: openDeleteModal,
  });

  // Error with retrieving list of groups
  useEffect(() => {
    if (groupsGetError) {
      displayError(t("error-messages.groups-load-error"), groupsGetError);
    }
  }, [groupsGetError]);

  return (
    <>
      <ContentHeader
        title={t("header")}
        newBtnTitle={t("create-new-group")}
        newBtnLink="/group/create"
      />
      <ContentBody>
        <>
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
              handleSearch={onSearch}
              isLoading={isLoading || isDeleting}
              loadingMessage={loadingMessage}
            />
          )}
        </>
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
