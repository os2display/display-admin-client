import { React, useEffect, useState } from "react";
import { Button, Spinner, Toast } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import CheckboxForList from "../util/list/checkbox-for-list";
import List from "../util/list/list";
import selectedHelper from "../util/helpers/selectedHelper";
import DeleteModal from "../delete-modal/delete-modal";
import InfoModal from "../info-modal/info-modal";
import Published from "./published";
import LinkForList from "../util/list/link-for-list";
import ListButton from "../util/list/list-button";
import ContentHeader from "../util/content-header/content-header";
import ContentBody from "../util/content-body/content-body";
import {
  useGetV1SlidesQuery,
  useDeleteV1SlidesByIdMutation,
} from "../../redux/api/api.generated";
/**
 * The category list component.
 *
 * @returns {object}
 * The SlidesList
 */
function SlidesList() {
  const { t } = useTranslation("common");
  const [selectedRows, setSelectedRows] = useState([]);
  const [onPlaylists, setOnPlaylists] = useState();
  const displayDeleteSuccessMilliseconds = 5000;
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [displayDeleteSuccess, setDisplayDeleteSuccess] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);

  const { GetV1Slides } = useGetV1SlidesQuery({
    page: 1,
  });
  const [
    DeleteV1Slides,
    { isLoading: isUpdating, isSuccess: isDeleteSuccess },
  ] = useDeleteV1SlidesByIdMutation();
  /**
   * Display a banner if save is successful.
   */
  useEffect(() => {
    // @TODO: Handle multiple saves.

    let timer = null;

    if (isDeleteSuccess) {
      setDisplayDeleteSuccess(true);
      timer = setTimeout(() => {
        setDisplayDeleteSuccess(false);
      }, displayDeleteSuccessMilliseconds);
    }

    return function cleanup() {
      if (timer !== null) {
        clearInterval(timer);
      }
    };
  }, [isDeleteSuccess]);

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
   * The name of the tag.
   * @param {number} props.id
   * The id of the tag
   */
  function openDeleteModal({ id, title }) {
    setSelectedRows([{ id, title }]);
    setShowDeleteModal(true);
  }

  /**
   * @param {Array} playlistArray
   * The array of playlists.
   */
  function openInfoModal(playlistArray) {
    setOnPlaylists(playlistArray);
    setShowInfoModal(true);
  }

  // The columns for the table.
  const columns = [
    {
      key: "pick",
      label: t("slides-list.columns.pick"),
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
      label: t("slides-list.columns.name"),
    },
    {
      path: "template.@id",
      sort: true,
      label: t("slides-list.columns.template"),
    },
    {
      sort: true,
      path: "onFollowingPlaylists",
      // content: (data) =>
      //   ListButton(
      //     openInfoModal,
      //     data.onFollowingPlaylists,
      //     data.onFollowingPlaylists.length,
      //     data.onFollowingPlaylists.length === 0
      //   ),
      content: (data) => <div>todo</div>,
      key: "playlists",
      label: t("slides-list.columns.number-of-playlists"),
    },
    {
      content: (data) => <div>todo</div>,
      sort: true,
      label: t("slides-list.columns.tags"),
    },
    {
      path: "published",
      sort: true,
      content: (data) => Published(data),
      label: t("slides-list.columns.published"),
    },
    {
      key: "edit",
      content: () => (
        <>
          {/* @TODO: make quick edit modal */}
          <Button variant="primary">Quick edit</Button>
        </>
      ),
    },
    {
      key: "preview",
      content: () => (
        <Button variant="secondary">{t("slides-list.columns.preview")}</Button>
      ),
    },
    {
      key: "edit",
      content: (data) => (
        <LinkForList
          data={data}
          param="slide/edit"
          label={t("slides-list.edit-button")}
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
            {t("slides-list.delete-button")}
          </Button>
        </>
      ),
    },
  ];

  /**
   * Deletes screen, and closes modal.
   *
   * @param {object} props
   * The props.
   * @param {string} props.name
   * The name of the tag.
   * @param {number} props.id
   * The id of the tag
   */
  // eslint-disable-next-line
  function handleDelete() {
    // @TODO delete element
    const [first] = selectedRows;
    // todo fetch data
    DeleteV1Slides({ id: first.id }).then(({ data }) => {});
    setSelectedRows([]);
    setShowDeleteModal(false);
  }

  /**
   * Closes the delete modal.
   */
  function onCloseDeleteModal() {
    setSelectedRows([]);
    setShowDeleteModal(false);
  }

  /**
   * Closes the info modal.
   */
  function onCloseInfoModal() {
    setShowInfoModal(false);
    setOnPlaylists();
  }

  /**
   * Clears the selected rows.
   */
  function clearSelectedRows() {
    setSelectedRows([]);
  }

  const { data, error, isLoading } = useGetV1SlidesQuery({
    page: 1,
  });
  return (
    <>
      <div className="toast-wrapper">
        <Toast animation={false} bg="success" show={displayDeleteSuccess}>
          <Toast.Body>{t("slides-list.deleted")}</Toast.Body>
        </Toast>
      </div>
      <ContentHeader
        title={t("slides-list.header")}
        newBtnTitle={t("slides-list.create-new-slide")}
        newBtnLink="/slide/create"
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
        {isLoading && <Spinner animation={"grow"} />}
        {!isLoading && error && <div>@TODO: Error</div>}
      </ContentBody>

      <DeleteModal
        show={showDeleteModal}
        onClose={onCloseDeleteModal}
        handleAccept={handleDelete}
        selectedRows={selectedRows}
      />
      <InfoModal
        show={showInfoModal}
        onClose={onCloseInfoModal}
        dataStructureToDisplay={onPlaylists}
        title={t("slides-list.info-modal.slide-on-playlists")}
      />
    </>
  );
}

export default SlidesList;
