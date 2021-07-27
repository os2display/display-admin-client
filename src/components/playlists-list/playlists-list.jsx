import { React, useState, useEffect } from "react";
import { Button, Row, Container, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FormattedMessage, useIntl } from "react-intl";
import selectedRowsHelper from "../util/helpers/selectedRowsHelper";
import List from "../util/list/list";
import DeleteModal from "../delete-modal/delete-modal";
import ListButton from "../util/list/list-button";
import InfoModal from "../info-modal/info-modal";
import LinkForList from "../util/list/link-for-list";
/**
/**
 * The playlists list component.
 *
 * @returns {object}
 * The playlists list.
 */
function PlaylistsList() {
  const intl = useIntl();
  const [selectedRows, setSelectedRows] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [dataStructureToDisplay, setDataStructureToDisplay] = useState();
  const [infoModalText, setInfoModalText] = useState("");
  const playlistHasCategoriesText = intl.formatMessage({
    id: "playlist_has_categories",
  });
  const playlistHasSlidesText = intl.formatMessage({
    id: "playlist_has_slides",
  });

  /**
   * Opens info modal with either categories or slides.
   *
   * @param {object} props
   * The props
   * @param {Array} props.data
   * The data to sum up in the modal
   * @param {string} props.caller
   * Which infomodal is opened, categories or slides.
   */
  function openInfoModal({ data, caller }) {
    const localInfoModalText =
      caller === "categories"
        ? playlistHasCategoriesText
        : playlistHasSlidesText;
    setInfoModalText(localInfoModalText);
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
    setSelectedRows(selectedRowsHelper(data, [...selectedRows]));
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
      path: "name",
      sort: true,
      label: intl.formatMessage({ id: "table_header_name" }),
    },
    {
      content: (data) =>
        ListButton(
          openInfoModal,
          { data: data.slides, caller: "slides" },
          data.slides?.length,
          data.slides?.length === 0
        ),
      sort: true,
      path: "slides",
      key: "slides",
      label: intl.formatMessage({ id: "table_header_number_of_slides" }),
    },
    {
      content: (data) =>
        ListButton(
          openInfoModal,
          { data: data.categories, caller: "categories" },
          data.categories?.length,
          data.categories?.length === 0
        ),
      sort: true,
      path: "categories",
      key: "categories",
      label: intl.formatMessage({ id: "table_header_number_of_categories" }),
    },
    {
      key: "edit",
      content: (data) => <LinkForList data={data} param="playlist" />,
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
              <FormattedMessage id="delete" defaultMessage="delete" />
            </Button>
          </div>
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

  return (
    <Container>
      <Row className="align-items-end mt-2">
        <Col>
          <h1>
            <FormattedMessage
              id="playlists_list_header"
              defaultMessage="playlists_list_header"
            />
          </h1>
        </Col>
        <Col md="auto">
          <Link className="btn btn-primary btn-success" to="/playlist/new">
            <FormattedMessage
              id="create_new_playlist"
              defaultMessage="create_new_playlist"
            />
          </Link>
        </Col>
      </Row>
      {playlists.playlists && (
        <List
          columns={columns}
          selectedRows={selectedRows}
          data={playlists.playlists}
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
        dataStructureToDisplay={dataStructureToDisplay}
        infoModalString={infoModalText}
      />
    </Container>
  );
}

export default PlaylistsList;
