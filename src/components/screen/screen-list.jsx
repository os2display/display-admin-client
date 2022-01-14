import { React, useEffect, useState } from "react";
import { Button, Col } from "react-bootstrap";
import { useHistory, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import CampaignIcon from "../screen-list/campaign-icon";
import CheckboxForList from "../util/list/checkbox-for-list";
import selectedHelper from "../util/helpers/selectedHelper";
import LinkForList from "../util/list/link-for-list";
import DeleteModal from "../delete-modal/delete-modal";
import List from "../util/list/list";
import InfoModal from "../info-modal/info-modal";
import ListButton from "../util/list/list-button";
import ContentHeader from "../util/content-header/content-header";
import ContentBody from "../util/content-body/content-body";
import idFromUrl from "../util/helpers/id-from-url";
import {
  useGetV1ScreensQuery,
  useDeleteV1ScreensByIdMutation,
  useGetV1ScreensByIdScreenGroupsQuery,
} from "../../redux/api/api.generated";
import {
  displaySuccess,
  displayError,
} from "../util/list/toast-component/display-toast";
import "./screen-list.scss";

/**
 * The screen list component.
 *
 * @returns {object} The screen list.
 */
function ScreenList() {
  const { t } = useTranslation("common");
  const history = useHistory();

  // Params
  const { search } = useLocation();
  const viewParams = new URLSearchParams(search).get("view");
  const [view, setView] = useState(viewParams ?? "list");

  // Local state
  const [isDeleting, setIsDeleting] = useState(false);
  const [sortBy, setSortBy] = useState();
  const [page, setPage] = useState();
  const [selectedRows, setSelectedRows] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [screensToDelete, setScreensToDelete] = useState([]);
  const [inGroups, setInGroups] = useState();
  const [searchText, setSearchText] = useState();
  const [listData, setListData] = useState([]);
  const [loadingMessage, setLoadingMessage] = useState(
    t("screen-list.loading-messages.loading-screens")
  );

  // Delete call
  const [
    DeleteV1Screens,
    { isSuccess: isDeleteSuccess, error: isDeleteError },
  ] = useDeleteV1ScreensByIdMutation();

  // Get method
  const {
    data,
    error: screensGetError,
    isLoading,
    refetch,
  } = useGetV1ScreensQuery({
    page,
    orderBy: sortBy?.path,
    order: sortBy?.order,
    title: searchText,
  });

  useEffect(() => {
    if (data && page) {
      setListData(data["hydra:member"]);
    }
  }, [data]);

  /** Set the view in url. */
  useEffect(() => {
    const params = new URLSearchParams(search);
    params.delete("view");
    params.append("view", view);
    history.replace({ search: params.toString() });
  }, [view]);

  /** Deletes multiple screens. */
  useEffect(() => {
    if (screensToDelete.length > 0) {
      // As we are deleting multiple screens, the ui will jump if the "is deleting" value from the hook is used.
      setIsDeleting(true);
      if (isDeleteSuccess) {
        displaySuccess(t("screen-list.success-messages.screen-delete"));
      }
      setLoadingMessage(t("screen-list.loading-messages.deleting-screen"));
      const screenToDelete = screensToDelete.splice(0, 1).shift();
      const screenToDeleteId = idFromUrl(screenToDelete["@id"]);
      DeleteV1Screens({ id: screenToDeleteId });
    }
  }, [screensToDelete, isDeleteSuccess]);

  // Display success messages
  useEffect(() => {
    if (isDeleteSuccess && screensToDelete.length === 0) {
      displaySuccess(t("screen-list.success-messages.screen-delete"));
      refetch();
      setIsDeleting(false);
    }
  }, [isDeleteSuccess]);

  // Display error on unsuccessful deletion
  useEffect(() => {
    if (isDeleteError) {
      setIsDeleting(false);
      displayError(
        t("screen-list.error-messages.screen-delete-error", {
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

  /** Deletes screen(s), and closes modal. */
  function handleDelete() {
    setScreensToDelete(selectedRows);
    clearSelectedRows();
    setShowDeleteModal(false);
  }

  /** Closes the delete modal. */
  function onCloseModal() {
    clearSelectedRows();
    setShowDeleteModal(false);
  }

  /** @param {Array} groupsData The array of groups. */
  function openInfoModal(groupsData) {
    setInGroups(groupsData);
    setShowInfoModal(true);
  }

  /** Closes the info modal. */
  function onCloseInfoModal() {
    setShowInfoModal(false);
    setInGroups();
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
      label: t("screen-list.columns.pick"),
      content: (d) => (
        <CheckboxForList
          onSelected={() => handleSelected(d)}
          selected={selectedRows.indexOf(d) > -1}
        />
      ),
    },
    {
      path: "title",
      sort: true,
      label: t("screen-list.columns.name"),
    },
    {
      // eslint-disable-next-line react/prop-types
      content: ({ inScreenGroups }) => (
        <ListButton
          callback={openInfoModal}
          inputData={inScreenGroups}
          apiCall={useGetV1ScreensByIdScreenGroupsQuery}
        />
      ),
      key: "groups",
      label: t("screen-list.columns.on-groups"),
    },
    {
      path: "location",
      label: t("screen-list.columns.location"),
    },
    {
      key: "campaign",
      // @TODO: implement overridden by campaing
      label: t("screen-list.columns.campaign"),
      content: (d) => CampaignIcon(d),
    },
    {
      key: "edit",
      content: (d) =>
        LinkForList(d["@id"], "screen/edit", t("screen-list.edit-button")),
    },
    {
      key: "delete",
      content: (d) => (
        <>
          <Button
            variant="danger"
            disabled={selectedRows.length > 0}
            onClick={() => openDeleteModal(d)}
          >
            {t("screen-list.delete-button")}
          </Button>
        </>
      ),
    },
  ];

  // Error with retrieving list of screen
  useEffect(() => {
    if (screensGetError) {
      displayError(
        t("screen-list.error-messages.screens-load-error", {
          error: screensGetError.error
            ? screensGetError.error
            : screensGetError.data["hydra:description"],
        })
      );
    }
  }, [screensGetError]);

  return (
    <>
      <ContentHeader
        title={t("screen-list.header")}
        newBtnTitle={t("screen-list.create-new-screen")}
        newBtnLink="/screen/create"
      />
      <Col md="auto">
        {view === "list" && (
          <Button onClick={() => setView("calendar")}>
            {t("screen-list.change-view-calendar")}
          </Button>
        )}
        {view === "calendar" && (
          <Button onClick={() => setView("list")}>
            {t("screen-list.change-view-list")}
          </Button>
        )}
      </Col>
      <ContentBody>
        <>
          {listData && (
            <List
              columns={columns}
              totalItems={listData["hydra:totalItems"]}
              data={listData}
              currentPage={page}
              handlePageChange={onChangePage}
              selectedRows={selectedRows}
              clearSelectedRows={clearSelectedRows}
              withChart={view === "calendar"}
              handleDelete={openDeleteModal}
              isLoading={isLoading || isDeleting}
              loadingMessage={loadingMessage}
              handleSort={onChangeSort}
              handleSearch={onSearch}
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
      <InfoModal
        show={showInfoModal}
        apiCall={useGetV1ScreensByIdScreenGroupsQuery}
        onClose={onCloseInfoModal}
        dataStructureToDisplay={inGroups}
        modalTitle={t("screen-list.info-modal.screen-in-groups")}
      />
    </>
  );
}

export default ScreenList;
