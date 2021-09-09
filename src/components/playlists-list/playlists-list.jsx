import { React, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import selectedHelper from "../util/helpers/selectedHelper";
import List from "../util/list/list";
import DeleteModal from "../delete-modal/delete-modal";
import ListButton from "../util/list/list-button";
import InfoModal from "../info-modal/info-modal";
import LinkForList from "../util/list/link-for-list";
import CheckboxForList from "../util/list/checkbox-for-list";
import ContentHeader from "../util/content-header/content-header";
import ContentBody from "../util/content-body/content-body";
import { useGetV1PlaylistsQuery } from "../../redux/api/api.generated";

/**
/**
 * The playlists list component.
 *
 * @returns {object}
 * The playlists list.
 */
function PlaylistsList() {
  const { t } = useTranslation("common");
  const [selectedRows, setSelectedRows] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [dataStructureToDisplay, setDataStructureToDisplay] = useState();
  const [infoModalTitle, setInfoModalTitle] = useState("");

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
  function openInfoModal({ data, modalTitle }) {
    setInfoModalTitle(modalTitle);
    setDataStructureToDisplay(data);
    setShowInfoModal(true);
  }

  /**
   * Closes the info modal.
   */
  function onCloseInfoModal() {
    setShowInfoModal(false);
    setDataStructureToDisplay();
  }

  const res = useGetV1PlaylistsQuery();

  console.log(res)

  /**
   * Load content from fixture.
   */
  useEffect(() => {

    // @TODO load real content.
    fetch(`/fixtures/playlists/playlists.json`)
      .then((response) => response.json())
      .then((jsonData) => {
        setPlaylists(jsonData);
      });
  }, []);

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
   * @param {string} props.name
   * The name of the playlist.
   * @param {number} props.id
   * The id of the playlist
   */
  function openDeleteModal({ id, name }) {
    setSelectedRows([{ id, name }]);
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
      path: "name",
      sort: true,
      label: t("playlists-list.columns.name"),
    },
    {
      content: (data) =>
        ListButton(
          openInfoModal,
          {
            data: data.slides,
            modalTitle: t("playlists-list.info-modal.playlist-slides"),
          },
          data.slides?.length,
          data.slides?.length === 0
        ),
      sort: true,
      path: "slides",
      key: "slides",
      label: t("playlists-list.columns.number-of-slides"),
    },
    {
      content: (data) =>
        ListButton(
          openInfoModal,
          {
            data: data.categories,
            modalTitle: t("playlists-list.info-modal.playlist-categories"),
          },
          data.categories?.length,
          data.categories?.length === 0
        ),
      sort: true,
      path: "categories",
      key: "categories",
      label: t("playlists-list.columns.number-of-categories"),
    },
    {
      sort: true,
      path: "onFollowingScreens",
      content: (data) =>
        ListButton(
          openInfoModal,
          {
            data: data.onFollowingScreens,
            modalTitle: t("playlists-list.info-modal.playlist-screens"),
          },
          data.onFollowingScreens.length,
          data.onFollowingScreens.length === 0
        ),
      key: "screens",
      label: t("playlists-list.columns.on-screens"),
    },
    {
      key: "quick-edit",
      content: () => (
        <>
          {/* @todo make quick edit modal */}
          <Button variant="primary">Quick edit</Button>
        </>
      ),
    },
    {
      key: "edit",
      content: (data) => (
        <LinkForList
          data={data}
          label={t("playlists-list.edit-button")}
          param="playlist"
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
   * Deletes playlist, and closes modal.
   *
   * @param {object} props
   * The props.
   * @param {string} props.name
   * The name of the playlist.
   * @param {number} props.id
   * The id of the playlist
   */
  // eslint-disable-next-line
  function handleDelete({ id, name }) {
    // @TODO delete element
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

  return (
    <>
      <ContentHeader
        title={t("playlists-list.header")}
        newBtnTitle={t("playlists-list.create-new-playlist")}
        newBtnLink="/playlist/new"
      />
      <ContentBody>
        {playlists.playlists && (
          <List
            columns={columns}
            selectedRows={selectedRows}
            data={playlists.playlists}
            clearSelectedRows={clearSelectedRows}
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
        onClose={onCloseInfoModal}
        dataStructureToDisplay={dataStructureToDisplay}
        title={infoModalTitle}
      />
    </>
  );
}

export default PlaylistsList;
