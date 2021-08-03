import { React, useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import CheckboxForList from "../util/list/checkbox-for-list";
import LinkForList from "../util/list/link-for-list";
import List from "../util/list/list";
import selectedHelper from "../util/helpers/selectedHelper";
import DeleteModal from "../delete-modal/delete-modal";
import ColorPreviewer from "./color-previewer";

/**
 * The themes list component.
 *
 * @returns {object}
 * The themes list
 */
function ThemesList() {
  const { t } = useTranslation("common");
  const [selectedRows, setSelectedRows] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [themes, setThemes] = useState([]);

  /**
   * Load content from fixture.
   */
  useEffect(() => {
    // @TODO load real content.
    fetch(`/fixtures/themes/themes.json`)
      .then((response) => response.json())
      .then((jsonData) => {
        setThemes(jsonData.themes);
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
      label: t("themes-list.columns.pick"),
      content: (data) => (
        <CheckboxForList onSelected={() => handleSelected(data)} />
      ),
    },
    {
      path: "name",
      sort: true,
      label: t("themes-list.columns.name"),
    },
    {
      path: "createdBy",
      sort: true,
      label: t("themes-list.columns.created-by"),
    },
    {
      key: "colors",
      content: (data) => <ColorPreviewer data={data} />,
    },
    {
      key: "edit",
      content: (data) => (
        <LinkForList
          data={data}
          label={t("themes-list.edit-button")}
          param="theme"
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
              {t("themes-list.delete-button")}
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

  return (
    <Container>
      <Row className="align-items-end mt-2">
        <Col>
          <h1>{t("themes-list.header")}</h1>
        </Col>
        <Col md="auto">
          <Link className="btn btn-primary btn-success" to="/theme/new">
            {t("themes-list.create-new-theme")}
          </Link>
        </Col>
      </Row>
      {themes && (
        <List columns={columns} selectedRows={selectedRows} data={themes} />
      )}
      <DeleteModal
        show={showDeleteModal}
        onClose={onCloseDeleteModal}
        handleAccept={handleDelete}
        selectedRows={selectedRows}
      />
    </Container>
  );
}

export default ThemesList;
