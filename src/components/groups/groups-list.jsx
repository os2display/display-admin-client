import { React, useEffect, useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import List from "../util/list/list";
import UserContext from "../../context/user-context";
import useModal from "../../context/modal-context/modal-context-hook";
import { GroupColumns } from "./groups-columns";
import ContentHeader from "../util/content-header/content-header";
import ContentBody from "../util/content-body/content-body";
import idFromUrl from "../util/helpers/id-from-url";
import {
  displaySuccess,
  displayError,
} from "../util/list/toast-component/display-toast";
import {
  useGetV1ScreenGroupsQuery,
  useGetV1ScreenGroupsByIdScreensQuery,
  useDeleteV1ScreenGroupsByIdMutation,
} from "../../redux/api/api.generated";

/**
 * The groups list component.
 *
 * @returns {object} The groups list.
 */
function GroupsList() {
  const { t } = useTranslation("common", { keyPrefix: "groups-list" });
  const { selected, setSelected } = useModal();
  const context = useContext(UserContext);

  // Local state
  const [createdBy, setCreatedBy] = useState("all");
  const [isDeleting, setIsDeleting] = useState(false);
  const [page, setPage] = useState();
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
    order: { createdAt: "desc" },
    title: searchText,
    createdBy,
  });

  useEffect(() => {
    if (data) {
      setListData(data);
    }
  }, [data]);

  /** Deletes multiple groups. */
  useEffect(() => {
    if (isDeleting && selected.length > 0) {
      const groupToDelete = selected[0];
      setSelected(selected.slice(1));
      const groupToDeleteId = idFromUrl(groupToDelete.id);
      DeleteV1ScreenGroups({ id: groupToDeleteId });
    }
  }, [isDeleting, isDeleteSuccess]);

  // Sets success messages in local storage, because the page is reloaded
  useEffect(() => {
    if (isDeleteSuccess && selected.length === 0) {
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

  /** Starts the deletion process. */
  function handleDelete() {
    setIsDeleting(true);
    setLoadingMessage(t("loading-messages.deleting-group"));
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
   * Sets created by filter.
   *
   * @param {number} createdByInput - The created by filter.
   */
  function onCreatedByFilter(createdByInput) {
    if (createdByInput === "all") {
      setCreatedBy(createdByInput);
    } else {
      setCreatedBy(context.email.get);
    }
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
  const columns = GroupColumns({
    handleDelete,
    apiCall: useGetV1ScreenGroupsByIdScreensQuery,
    infoModalRedirect: "/screen/edit",
    infoModalTitle: t("info-modal.screens"),
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
              data={listData["hydra:member"]}
              handleCreatedByCurrentUser={onCreatedByFilter}
              handleDelete={handleDelete}
              deleteSuccess={isDeleteSuccess || false}
              handleSearch={onSearch}
              isLoading={isLoading || isDeleting}
              loadingMessage={loadingMessage}
            />
          )}
        </>
      </ContentBody>
    </>
  );
}

export default GroupsList;
