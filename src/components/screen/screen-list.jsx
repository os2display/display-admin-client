import { React, useEffect, useState, useContext } from "react";
import { Button, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { faCalendar, faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserContext from "../../context/user-context";
import ScreenCalendarCell from "../screen-list/screen-calendar-cell";
import List from "../util/list/list";
import { ScreenColumns } from "./screen-columns";
import ContentHeader from "../util/content-header/content-header";
import ContentBody from "../util/content-body/content-body";
import idFromUrl from "../util/helpers/id-from-url";
import ListContext from "../../context/list-context";
import useModal from "../../context/modal-context/modal-context-hook";
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
  const { t } = useTranslation("common", { keyPrefix: "screen-list" });
  const context = useContext(UserContext);
  const {
    searchText: { get: searchText },
    page: { get: page },
    listView: { get: view, set: setView },
    createdBy: { get: createdBy },
  } = useContext(ListContext);
  const { selected, setSelected } = useModal();

  // Local state
  const [isDeleting, setIsDeleting] = useState(false);
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
    search: searchText,
    createdBy,
  });

  useEffect(() => {
    if (data) {
      setListData(data);
    }
  }, [data]);

  useEffect(() => {
    refetch();
  }, [searchText, page, createdBy]);

  // If the tenant is changed, data should be refetched
  useEffect(() => {
    if (context.selectedTenant.get) {
      refetch();
    }
  }, [context.selectedTenant.get]);

  /** Deletes multiple screens. */
  useEffect(() => {
    if (isDeleting && selected.length > 0) {
      const screenToDelete = selected[0];
      setSelected(selected.slice(1));
      const screenToDeleteId = idFromUrl(screenToDelete.id);
      DeleteV1Screens({ id: screenToDeleteId });
    }
  }, [isDeleting, isDeleteSuccess]);

  // Display success messages
  useEffect(() => {
    if (isDeleteSuccess && selected.length === 0) {
      displaySuccess(t("success-messages.screen-delete"));
      setIsDeleting(false);
      refetch();
    }
  }, [isDeleteSuccess]);

  // Display error on unsuccessful deletion
  useEffect(() => {
    if (isDeleteError) {
      setIsDeleting(false);
      displayError(t("error-messages.screen-delete-error"), isDeleteError);
    }
  }, [isDeleteError]);

  /** Starts the deletion process. */
  function handleDelete() {
    setIsDeleting(true);
    setLoadingMessage(t("loading-messages.deleting-screen"));
  }

  // The columns for the table.
  const columns = ScreenColumns({
    handleDelete,
    apiCall: useGetV1ScreensByIdScreenGroupsQuery,
    infoModalRedirect: "/group/edit",
    infoModalTitle: t("info-modal.screen-in-groups"),
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
              calendarViewPossible
              handleDelete={handleDelete}
              isLoading={isLoading || isDeleting}
              loadingMessage={loadingMessage}
            >
              <ScreenCalendarCell />
            </List>
          )}
        </>
      </ContentBody>
    </>
  );
}

export default ScreenList;
