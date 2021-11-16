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
import LiveIcon from "../screen-list/live-icon";
import ContentHeader from "../util/content-header/content-header";
import ContentBody from "../util/content-body/content-body";
import Dimensions from "./dimension";
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
  const [listData, setListData] = useState();
  const [localStorageMessages, setLocalStorageMessages] = useState([]);
  const [loadingMessage, setLoadingMessage] = useState(
    t("screens-list.loading-messages.loading-screens")
  );

  // Delete call
  const [
    DeleteV1Screens,
    { isSuccess: isDeleteSuccess, error: isDeleteError },
  ] = useDeleteV1ScreensByIdMutation();

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
      setIsDeleting(true);
      setLoadingMessage(t("screens-list.loading-messages.deleting-screen"));
      const screenToDelete = screensToDelete.splice(0, 1).shift();
      const screenToDeleteId = idFromUrl(screenToDelete["@id"]);
      DeleteV1Screens({ id: screenToDeleteId });
    } else if (isDeleteSuccess) {
      localStorage.setItem(
        "messages",
        JSON.stringify([
          ...localStorageMessages,
          t("screens-list.success-messages.screen-delete"),
        ])
      );
      window.location.reload(false);
    }
  }, [screensToDelete, isDeleteSuccess]);

  // Sets success-messages for local storage
  useEffect(() => {
    if (isDeleteSuccess && slidesToDelete.length > 0) {
      const localStorageMessagesCopy = [...localStorageMessages];
      localStorageMessagesCopy.push(
        t("screens-list.success-messages.screen-delete")
      );
      setLocalStorageMessages(localStorageMessagesCopy);
    }
  }, [isDeleteSuccess]);

  // Display success messages from successfully deleted slides.
  useEffect(() => {
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
        t("screens-list.error-messages.screen-delete-error", {
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
      label: t("screens-list.columns.pick"),
      content: (data) => (
        <CheckboxForList
          onSelected={() => handleSelected(data)}
          selected={selectedRows.indexOf(data) > -1}
        />
      ),
    },
    {
      path: "live",
      label: t("screens-list.columns.live"),
      content: (data) => LiveIcon(data),
    },
    {
      path: "title",
      sort: true,
      label: t("screens-list.columns.name"),
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
      label: t("screens-list.columns.on-groups"),
    },
    {
      path: "size",
      label: t("screens-list.columns.size"),
    },
    {
      key: "dimensions",
      content: ({ dimensions }) => Dimensions(dimensions),
      label: t("screens-list.columns.dimensions"),
    },
    {
      key: "campaign",
      // @TODO: implement overridden by campaing
      label: t("screens-list.columns.campaign"),
      content: (data) => CampaignIcon(data),
    },
    {
      key: "edit",
      content: (data) =>
        LinkForList(data["@id"], "screen/edit", t("screens-list.edit-button")),
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
            {t("screens-list.delete-button")}
          </Button>
        </>
      ),
    },
  ];

  const {
    data,
    error: screensGetError,
    isLoading,
  } = useGetV1ScreensQuery({
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

  useEffect(() => {
    if (screensGetError) {
      displayError(
        t("screens-list.error-messages.screens-load-error", {
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
        title={t("screens-list.header")}
        newBtnTitle={t("screens-list.create-new-screen")}
        newBtnLink="/screen/create"
      />
      <Col md="auto">
        {view === "list" && (
          <Button onClick={() => setView("calendar")}>
            {t("screens-list.change-view-calendar")}
          </Button>
        )}
        {view === "calendar" && (
          <Button onClick={() => setView("list")}>
            {t("screens-list.change-view-list")}
          </Button>
        )}
      </Col>
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
              data={listData["hydra:member"]}
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
        modalTitle={t("screens-list.info-modal.screen-in-groups")}
      />
    </>
  );
}

export default ScreenList;
