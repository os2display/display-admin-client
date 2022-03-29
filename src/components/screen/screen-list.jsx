import { React, useEffect, useState, useContext } from "react";
import { Button, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { faCalendar, faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserContext from "../../context/user-context";
import ScreenCalendarCell from "../screen-list/screen-calendar-cell";
import selectedHelper from "../util/helpers/selectedHelper";
import DeleteModal from "../delete-modal/delete-modal";
import List from "../util/list/list";
import InfoModal from "../info-modal/info-modal";
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
import getScreenColumns from "./screen-columns";

/**
 * The screen list component.
 *
 * @returns {object} The screen list.
 */
function ScreenList() {
  const { t } = useTranslation("common", { keyPrefix: "screen-list" });
  const context = useContext(UserContext);

  // Local state
  const [view, setView] = useState("list");
  const [isDeleting, setIsDeleting] = useState(false);
  const [page, setPage] = useState();
  const [selectedRows, setSelectedRows] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [screensToDelete, setScreensToDelete] = useState([]);
  const [inGroups, setInGroups] = useState();
  const [searchText, setSearchText] = useState();
  const [listData, setListData] = useState();
  const [loadingMessage, setLoadingMessage] = useState(
    t("loading-messages.loading-screens")
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
    order: { title: "asc" },
    title: searchText,
  });

  useEffect(() => {
    if (data) {
      setListData(data);
    }
  }, [data]);

  // If the tenant is changed, data should be refetched
  useEffect(() => {
    if (context.selectedTenant.get) {
      refetch();
    }
  }, [context.selectedTenant.get]);

  /** Deletes multiple screens. */
  useEffect(() => {
    if (screensToDelete.length > 0) {
      // As we are deleting multiple screens, the ui will jump if the "is deleting" value from the hook is used.
      setIsDeleting(true);
      if (isDeleteSuccess) {
        displaySuccess(t("success-messages.screen-delete"));
      }
      setLoadingMessage(t("loading-messages.deleting-screen"));
      const screenToDelete = screensToDelete.splice(0, 1).shift();
      const screenToDeleteId = idFromUrl(screenToDelete["@id"]);
      DeleteV1Screens({ id: screenToDeleteId });
    }
  }, [screensToDelete, isDeleteSuccess]);

  // Display success messages
  useEffect(() => {
    if (isDeleteSuccess && screensToDelete.length === 0) {
      displaySuccess(t("success-messages.screen-delete"));
      refetch();
      setIsDeleting(false);
    }
  }, [isDeleteSuccess]);

  // Display error on unsuccessful deletion
  useEffect(() => {
    if (isDeleteError) {
      setIsDeleting(false);
      displayError(t("error-messages.screen-delete-error"), isDeleteError);
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
   * Handles search.
   *
   * @param {object} localSearchText - The search text.
   */
  function onSearch(localSearchText) {
    setSearchText(localSearchText);
  }

  // The columns for the table.
  const columns = getScreenColumns({
    selectedRows,
    handleSelected,
    editNewTab: false,
    handleDelete: openDeleteModal,
    listButtonCallback: openInfoModal,
    apiCall: useGetV1ScreensByIdScreenGroupsQuery,
  });

  // Error with retrieving list of screen
  useEffect(() => {
    if (screensGetError) {
      displayError(t("error-messages.screens-load-error"), screensGetError);
    }
  }, [screensGetError]);

  return (
    <>
      <ContentHeader
        title={t("header")}
        newBtnTitle={t("create-new-screen")}
        newBtnLink="/screen/create"
      >
        <Col md="auto">
          {view === "list" && (
            <Button
              style={{ width: "110px" }}
              onClick={() => setView("calendar")}
            >
              <FontAwesomeIcon className="me-1" icon={faCalendar} />
              {t("change-view-calendar")}
            </Button>
          )}
          {view === "calendar" && (
            <Button style={{ width: "110px" }} onClick={() => setView("list")}>
              <FontAwesomeIcon className="me-1" icon={faList} />{" "}
              {t("change-view-list")}
            </Button>
          )}
        </Col>
      </ContentHeader>
      <ContentBody>
        <>
          {listData && (
            <List
              columns={columns}
              totalItems={listData["hydra:totalItems"]}
              data={listData["hydra:member"]}
              currentPage={page}
              handlePageChange={onChangePage}
              selectedRows={selectedRows}
              clearSelectedRows={clearSelectedRows}
              calendarView={view === "calendar"}
              handleDelete={openDeleteModal}
              isLoading={isLoading || isDeleting}
              loadingMessage={loadingMessage}
              handleSearch={onSearch}
            >
              <ScreenCalendarCell />
            </List>
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
        redirectTo="/group/edit"
        apiCall={useGetV1ScreensByIdScreenGroupsQuery}
        onClose={onCloseInfoModal}
        dataStructureToDisplay={inGroups}
        modalTitle={t("info-modal.screen-in-groups")}
      />
    </>
  );
}

export default ScreenList;
