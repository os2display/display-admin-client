import { React, useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import CampaignIcon from "./campaign-icon";
import CheckboxForList from "../util/list/checkbox-for-list";
import selectedHelper from "../util/helpers/selectedHelper";
import LinkForList from "../util/list/link-for-list";
import DeleteModal from "../delete-modal/delete-modal";
import List from "../util/list/list";
import InfoModal from "../info-modal/info-modal";
import ListButton from "../util/list/list-button";

/**
 * The screen list component.
 *
 * @returns {object}
 *   The screen list.
 */
function ScreenList() {
  const { t } = useTranslation("common");
  const [selectedRows, setSelectedRows] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [inGroups, setInGroups] = useState();
  const [screens, setScreens] = useState([]);

  /**
   * @param {Array} playlistArray
   * The array of groups.
   */
  function openInfoModal(groupsArray) {
    setInGroups(groupsArray);
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
   * Load content from fixture.
   * TODO load real content.
   */
  useEffect(() => {
    fetch(`/fixtures/screens/screens.json`)
      .then((response) => response.json())
      .then((jsonData) => {
        setScreens(jsonData);
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
      path: "name",
      sort: true,
      label: t("screens-list.columns.name"),
    },
    {
      sort: true,
      path: "onFollowingGroups",
      content: (data) =>
        ListButton(
          openInfoModal,
          data.onFollowingGroups,
          data.onFollowingGroups.length,
          data.onFollowingGroups.length === 0
        ),
      key: "groups",
      label: t("locations-list.columns.on-groups"),
    },
    {
      path: "size",
      sort: true,
      label: t("screens-list.columns.size"),
    },
    {
      path: "dimensions",
      sort: true,
      label: t("screens-list.columns.dimensions"),
    },
    {
      path: "overriddenByCampaign",
      sort: true,
      label: t("screens-list.columns.campaign"),
      content: (data) => CampaignIcon(data),
    },
    {
      key: "edit",
      content: (data) => (
        <LinkForList
          data={data}
          label={t("screens-list.edit-button")}
          param="screen"
        />
      ),
    },
    {
      key: "delete",
      content: (data) => (
        <>
          <div className="m-2">
            <Button
              variant="danger"
              disabled={selectedRows.length > 0}
              onClick={() => openDeleteModal(data)}
            >
              {t("screens-list.delete-button")}
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
    <Container>
      <Row className="align-items-end mt-2">
        <Col>
          <h1>{t("screens-list.header")}</h1>
        </Col>
        <Col md="auto">
          <Link className="btn btn-primary btn-success" to="/screen/new">
            {t("screens-list.create-new-screen")}
          </Link>
        </Col>
      </Row>
      {screens.screens && (
        <List
          columns={columns}
          selectedRows={selectedRows}
          data={screens.screens}
          clearSelectedRows={clearSelectedRows}
        />
      )}
      <DeleteModal
        show={showDeleteModal}
        onClose={onCloseModal}
        handleAccept={handleDelete}
        selectedRows={selectedRows}
      />
      <InfoModal
        show={showInfoModal}
        onClose={onCloseInfoModal}
        dataStructureToDisplay={inGroups}
        title={t("screens-list.info-modal.in-groups")}
      />
    </Container>
  );
}

export default ScreenList;
