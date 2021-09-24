import { React, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Toast from "../util/toast/toast";
import selectedHelper from "../util/helpers/selectedHelper";
import List from "../util/list/list";
import DeleteModal from "../delete-modal/delete-modal";
import InfoModal from "../info-modal/info-modal";
import LinkForList from "../util/list/link-for-list";
import CheckboxForList from "../util/list/checkbox-for-list";
import ContentHeader from "../util/content-header/content-header";
import ContentBody from "../util/content-body/content-body";
import {
  useGetV1PlaylistsQuery,
  useDeleteV1PlaylistsByIdMutation,
} from "../../redux/api/api.generated";

/**
 * The playlists list component.
 *
 * @returns {object}
 * The playlists list.
 */
function PlaylistList() {
  const { t } = useTranslation("common");
  const [selectedRows, setSelectedRows] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [dataStructureToDisplay, setDataStructureToDisplay] = useState();
  /* eslint-disable-next-line no-unused-vars */
  const [infoModalTitle, setInfoModalTitle] = useState("");
  const [DeleteV1Playlists, { isSuccess: isDeleteSuccess }] =
    useDeleteV1PlaylistsByIdMutation();

  /**
   * Opens info modal with either categories or slides.
   *
   * @param {object} props
   * The props
   * @param {Array} props.data
   * The data to sum up in the modal
   * @param {string} props.modalTitle
   * The title for the infomodal.
   */
  /* @TODO: Re-add this.
  function openInfoModal({ data, modalTitle }) {
    setInfoModalTitle(modalTitle);
    setDataStructureToDisplay(data);
    setShowInfoModal(true);
  }
  */

  /**
   * Closes the info modal.
   */
  function onCloseInfoModal() {
    setShowInfoModal(false);
    setDataStructureToDisplay();
  }

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
   * The title of the playlist.
   * @param {number} props.id
   * The id of the playlist
   */
  function openDeleteModal({ id, title }) {
    setSelectedRows([{ id, title }]);
    setShowDeleteModal(true);
  }

  // The columns for the table.
  const columns = [
    {
      key: "pick",
      label: t("playlists-list.columns.pick"),
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
      label: t("playlists-list.columns.name"),
    },
    {
      content: () => <div>@TODO</div>,
      sort: true,
      path: "slides",
      key: "slides",
      label: t("playlists-list.columns.number-of-slides"),
    },
    {
      content: () => <div>@TODO</div>,
      sort: true,
      path: "categories",
      key: "categories",
      label: t("playlists-list.columns.number-of-categories"),
    },
    {
      sort: true,
      path: "onFollowingScreens",
      content: () => <div>@TODO:</div>,
      key: "screens",
      label: t("playlists-list.columns.on-screens"),
    },
    {
      key: "edit",
      content: (data) => (
        <LinkForList
          data={data}
          label={t("playlists-list.edit-button")}
          param="playlists/edit"
        />
      ),
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
            {t("playlists-list.delete-button")}
          </Button>
        </>
      ),
    },
  ];

  /**
   * Deletes slide, and closes modal.
   */
  function handleDelete() {
    const [first] = selectedRows;
    DeleteV1Playlists({ id: first.id });
    setSelectedRows([]);
    setShowDeleteModal(false);
  }

  /**
   * Closes the delete modal.
   */
  function onCloseModal() {
    setSelectedRows([]);
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
    error: playlistsGetError,
    isLoading,
  } = useGetV1PlaylistsQuery({ page: 1 });

  return (
    <>
      <Toast
        show={playlistsGetError}
        text={t("playlists-list.playlists-get-error")}
      />
      <Toast show={isDeleteSuccess} text={t("playlists-list.deleted")} />
      <ContentHeader
        title={t("playlists-list.header")}
        newBtnTitle={t("playlists-list.create-new-playlist")}
        newBtnLink="/playlist/create"
      />
      <ContentBody>
        {!isLoading && data && data["hydra:member"] && (
          <List
            columns={columns}
            selectedRows={selectedRows}
            data={data["hydra:member"]}
            clearSelectedRows={clearSelectedRows}
          />
        )}
        {isLoading && <Spinner animation="grow" />}
      </ContentBody>
      <DeleteModal
        show={showDeleteModal}
        onClose={onCloseModal}
        handleAccept={handleDelete}
        selectedRows={selectedRows}
      />
      <InfoModal
        show={showInfoModal}
        onClose={onCloseInfoModal}
        dataStructureToDisplay={dataStructureToDisplay}
        title={infoModalTitle}
      />
    </>
  );
}

export default PlaylistList;
