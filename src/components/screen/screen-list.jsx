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
import Toast from "../util/toast/toast";
import LiveIcon from "../screen-list/live-icon";
import ContentHeader from "../util/content-header/content-header";
import ContentBody from "../util/content-body/content-body";
import "./screen-list.scss";
import Dimensions from "./dimension";
import idFromUrl from "../util/helpers/id-from-url";
import {
  useGetV1ScreensQuery,
  useDeleteV1ScreensByIdMutation,
  useGetV1ScreenGroupsByIdQuery,
} from "../../redux/api/api.generated";

/**
 * The screen list component.
 *
 * @returns {object}
 *   The screen list.
 */
function ScreenList() {
  const { t } = useTranslation("common");
  const { search } = useLocation();
  const history = useHistory();
  const viewParams = new URLSearchParams(search).get("view");
  const [view, setView] = useState(viewParams ?? "list");
  const [selectedRows, setSelectedRows] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [inGroups, setInGroups] = useState();
  const [DeleteV1Screens, { isSuccess: isDeleteSuccess }] =
    useDeleteV1ScreensByIdMutation();

  /**
   * @param {Array} groupsData
   * The array of groups.
   */
  function openInfoModal(groupsData) {
    setInGroups(groupsData);
    setShowInfoModal(true);
  }

  /**
   * Closes the info modal.
   */
  function onCloseInfoModal() {
    setShowInfoModal(false);
    setInGroups();
  }

  /**
   * Set the view in url.
   */
  useEffect(() => {
    const params = new URLSearchParams(search);
    params.delete("view");
    params.append("view", view);
    history.replace({ search: params.toString() });
  }, [view]);

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
   * @param {string} props.title
   * The title of the screen.
   * @param {number} props.id
   * The id of the screen
   */
  function openDeleteModal(item) {
    setSelectedRows([{ id: item["@id"], title: item.title }]);
    setShowDeleteModal(true);
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
      sort: true,
      label: t("screens-list.columns.live"),
      content: (data) => LiveIcon(data),
    },
    {
      path: "title",
      sort: true,
      label: t("screens-list.columns.name"),
    },
    {
      sort: true,
      path: "inScreenGroups",
      content: (data) => ListButton(openInfoModal, [data.inScreenGroups]),
      key: "groups",
      label: t("screens-list.columns.on-groups"),
    },
    {
      path: "size",
      sort: true,
      label: t("screens-list.columns.size"),
    },
    {
      sort: true,
      content: ({ dimensions }) => Dimensions(dimensions),
      label: t("screens-list.columns.dimensions"),
    },
    {
      sort: true,
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

  /**
   * Deletes screen, and closes modal.
   */
  function handleDelete() {
    const [first] = selectedRows;
    DeleteV1Screens({ id: idFromUrl(first.id) });
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

  /**
   * Clears the selected rows.
   */
  function clearSelectedRows() {
    setSelectedRows([]);
  }

  const {
    data,
    error: screensGetError,
    isLoading,
  } = useGetV1ScreensQuery({ page: 1 });

  return (
    <>
      <Toast
        show={screensGetError}
        text={t("screens-list.screens-get-error")}
      />
      <Toast show={isDeleteSuccess} text={t("screens-list.deleted")} />
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
        {!isLoading && data && data["hydra:member"] && (
          <List
            columns={columns}
            selectedRows={selectedRows}
            data={data["hydra:member"]}
            clearSelectedRows={clearSelectedRows}
            withChart={view === "calendar"}
          />
        )}
      </ContentBody>
      <DeleteModal
        show={showDeleteModal}
        onClose={onCloseModal}
        handleAccept={handleDelete}
        selectedRows={selectedRows}
      />
      <InfoModal
        show={showInfoModal}
        apiCall={useGetV1ScreenGroupsByIdQuery}
        onClose={onCloseInfoModal}
        dataStructureToDisplay={inGroups}
        modalTitle={t("screens-list.info-modal.screen-in-groups")}
      />
    </>
  );
}

export default ScreenList;
