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

/**
 * The locations list component.
 *
 * @returns {object}
 * The LocationsList
 */
function LocationsList() {
  const { t } = useTranslation("common");
  const [infoModalTitle, setInfoModalTitle] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [dataStructureToDisplay, setDataStructureToDisplay] = useState();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [locations, setLocations] = useState([]);

  /**
   * Load content from fixture.
   */
  useEffect(() => {
    // @TODO load real content.
    fetch(`/fixtures/locations/locations.json`)
      .then((response) => response.json())
      .then((jsonData) => {
        setLocations(jsonData.locations);
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
   * The name of the location.
   * @param {number} props.id
   * The id of the location
   */
  function openDeleteModal({ id, name }) {
    setSelectedRows([{ id, name }]);
    setShowDeleteModal(true);
  }

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

  // The columns for the table.
  const columns = [
    {
      key: "pick",
      label: t("locations-list.columns.pick"),
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
      label: t("locations-list.columns.name"),
    },
    {
      path: "createdBy",
      sort: true,
      label: t("locations-list.columns.created-by"),
    },
    {
      sort: true,
      path: "onFollowingScreens",
      content: (data) =>
        ListButton(
          openInfoModal,
          {
            data: data.onFollowingScreens,
            modalTitle: t("locations-list.info-modal.location-on-screen"),
          },
          data.onFollowingScreens.length,
          data.onFollowingScreens.length === 0
        ),
      key: "screens",
      label: t("locations-list.columns.on-screens"),
    },
    {
      sort: true,
      path: "onFollowingGroups",
      content: (data) =>
        ListButton(
          openInfoModal,
          {
            data: data.onFollowingGroups,
            modalTitle: t("locations-list.info-modal.location-on-group"),
          },
          data.onFollowingGroups.length,
          data.onFollowingGroups.length === 0
        ),
      key: "groups",
      label: t("locations-list.columns.on-groups"),
    },
    {
      key: "edit",
      content: (data) => (
        <LinkForList
          data={data}
          label={t("locations-list.edit-button")}
          param="location"
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
            {t("locations-list.delete-button")}
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
   * The name of the location.
   * @param {number} props.id
   * The id of the location
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
    setDataStructureToDisplay();
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
        title={t("locations-list.header")}
        newBtnTitle={t("locations-list.create-new-location")}
        newBtnLink="/location/new"
      />
      {locations && (
        <List
          columns={columns}
          selectedRows={selectedRows}
          data={locations}
          clearSelectedRows={clearSelectedRows}
        />
      )}
      <DeleteModal
        show={showDeleteModal}
        onClose={onCloseDeleteModal}
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

export default LocationsList;
