import { React, useState, useEffect } from "react";
import { Button, Spinner } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Toast from "../util/toast/toast";
import selectedHelper from "../util/helpers/selectedHelper";
import ListButton from "../util/list/list-button";
import List from "../util/list/list";
import DeleteModal from "../delete-modal/delete-modal";
import InfoModal from "../info-modal/info-modal";
import LinkForList from "../util/list/link-for-list";
import idFromUrl from "../util/helpers/id-from-url";
import CheckboxForList from "../util/list/checkbox-for-list";
import ContentHeader from "../util/content-header/content-header";
import ContentBody from "../util/content-body/content-body";
import {
  useGetV1PlaylistsQuery,
  useDeleteV1PlaylistsByIdMutation,
  useGetV1SlidesByIdPlaylistsQuery,
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
  const [isDeleting, setIsDeleting] = useState(false);
  const [onSlides, setOnSlides] = useState();
  const [page, setPage] = useState();
  const [playlistsToDelete, setPlaylistsToDelete] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [dataStructureToDisplay, setDataStructureToDisplay] = useState();
  const [DeleteV1Playlists, { isSuccess: isDeleteSuccess }] =
    useDeleteV1PlaylistsByIdMutation();

  /**
   * @param {Array} slideData
   * The array of playlists.
   */
  function openInfoModal(slideData) {
    setOnSlides(slideData);
    setShowInfoModal(true);
  }

  /**
   * Deletes multiple playlists.
   */
  useEffect(() => {
    if (playlistsToDelete.length > 0) {
      setIsDeleting(true);
      const toDelete = playlistsToDelete.splice(0, 1).shift();
      const toDeleteId = idFromUrl(toDelete["@id"]);
      DeleteV1Playlists({ id: toDeleteId });
    } else if (isDeleteSuccess) {
      window.location.reload(false);
    }
  }, [playlistsToDelete, isDeleteSuccess]);

  /**
   * Sets next page.
   *
   * @param {number} pageNumber - the next page.
   */
  function onChangePage(pageNumber) {
    setPage(pageNumber);
  }

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
   * Opens the delete modal
   * @param {object} item
   * The item to delete
   */
  function openDeleteModal(item) {
    if (item) {
      setSelectedRows([{ "@id": item["@id"], title: item.title }]);
    }
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
      sort: true,
      key: "slides",
      label: t("playlists-list.columns.number-of-slides"),
      content: (data) =>
        ListButton(
          openInfoModal,
          data.slides,
          useGetV1SlidesByIdPlaylistsQuery
        ),
    },
    {
      key: "edit",
      content: (data) =>
        LinkForList(
          data["@id"],
          "playlists/edit",
          t("playlists-list.edit-button")
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
   * Deletes playlist(s), and closes modal.
   */
  function handleDelete() {
    setPlaylistsToDelete(selectedRows);
    clearSelectedRows();
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
  } = useGetV1PlaylistsQuery({ page: page });
  console.log(data);
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
        apiCall={useGetV1SlidesByIdPlaylistsQuery}
        onClose={onCloseInfoModal}
        dataStructureToDisplay={onSlides}
        modalTitle={t("info-modal.playlist-slides")}
      />
    </>
  );
}

export default PlaylistList;
