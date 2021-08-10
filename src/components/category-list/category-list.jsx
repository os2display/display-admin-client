import { React, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import CheckboxForList from "../util/list/checkbox-for-list";
import LinkForList from "../util/list/link-for-list";
import List from "../util/list/list";
import selectedHelper from "../util/helpers/selectedHelper";
import DeleteModal from "../delete-modal/delete-modal";
import InfoModal from "../info-modal/info-modal";
import ListButton from "../util/list/list-button";
import ContentHeader from "../util/content-header/content-header";
import ContentBody from "../util/content-body/content-body";

/**
 * The category list component.
 *
 * @returns {object}
 * The CategoryList
 */
function CategoryList() {
  const { t } = useTranslation("common");
  const [selectedRows, setSelectedRows] = useState([]);
  const [onPlaylists, setOnPlaylists] = useState();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [categories, setCategories] = useState([]);

  /**
   * Load content from fixture.
   */
  useEffect(() => {
    // @TODO load real content.
    fetch(`/fixtures/categories/categories.json`)
      .then((response) => response.json())
      .then((jsonData) => {
        setCategories(jsonData.categories);
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
   * The name of the tag.
   * @param {number} props.id
   * The id of the tag
   */
  function openDeleteModal({ id, name }) {
    setSelectedRows([{ id, name }]);
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
      label: t("category-list.columns.pick"),
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
      label: t("category-list.columns.name"),
    },
    {
      path: "createdBy",
      sort: true,
      label: t("category-list.columns.created-by"),
    },
    {
      sort: true,
      path: "onFollowingPlaylists",
      content: (data) =>
        ListButton(
          openInfoModal,
          data.onFollowingPlaylists,
          data.onFollowingPlaylists.length,
          data.onFollowingPlaylists.length === 0
        ),
      key: "playlists",
      label: t("category-list.columns.category-on-playlist"),
    },
    {
      key: "edit",
      content: (data) => (
        <LinkForList
          data={data}
          label={t("category-list.edit-button")}
          param="category"
        />
      ),
    },
    {
      key: "delete",
      content: (data) => (
        <>
          <div>
            <Button
              variant="danger"
              disabled={selectedRows.length > 0}
              onClick={() => openDeleteModal(data)}
            >
              {t("category-list.delete-button")}
            </Button>
          </div>
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
  function handleDelete({ id, name }) {
    // @TODO delete element
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

  return (
    <>
      <ContentHeader
        buttons={[
          {
            link: "/category/new",
            title: t("category-list.create-new-category"),
          },
        ]}
        title={t("category-list.header")}
      />
      <ContentBody>
        {categories && (
          <List
            showMerge
            columns={columns}
            selectedRows={selectedRows}
            data={categories}
            clearSelectedRows={clearSelectedRows}
          />
        )}
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
        title={t("category-list.info-modal.category-playlists")}
      />
    </>
  );
}

export default CategoryList;
