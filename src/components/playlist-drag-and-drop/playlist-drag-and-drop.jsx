import { React, useState } from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { useIntl, FormattedMessage } from "react-intl";
import PlaylistsDropdown from "../util/forms/multiselect-dropdown/playlists/playlists-dropdown";
import DragAndDropTable from "../util/drag-and-drop-table/drag-and-drop-table";
import DeleteModal from "../delete-modal/delete-modal";

/**
 * An input for forms.
 *
 * @param {string} props
 * the props.
 * @param {string} props.radioGroupNamenpm install react-dnd react-dnd-html5-backend
 * The name of the input
 * @param {string} props.label
 * The label for the input
 * @returns {object}
 * An input.
 */
function PlaylistDragAndDrop({ handleChange, formId, data }) {
  const intl = useIntl();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState([{}]);
  const confirmationString = intl.formatMessage({ id: "confirm_delete" });

  /**
   * Closes the delete modal.
   */
  function onCloseDeleteModal() {
    setSelectedRow([]);
    setShowDeleteModal(false);
  }

  /**
   * Opens the delete modal, for removing a row.
   *
   * @param {object} props
   * The props.
   * @param {string} props.label
   * The label of the playlist.
   * @param {number} props.value
   * The id of the playlist
   */
  function openDeleteModal({ label, value }) {
    setSelectedRow([{ label, value }]);
    setShowDeleteModal(true);
  }

  /**
   * Removes playlist from list of playlists, and closes modal.
   *
   * @param {object} props
   * The props.
   * @param {string} props.value
   * The id of the playlist
   */
  function handleRemove({ value }) {
    const indexOfItemToRemove = data
      .map((item) => {
        return item.id;
      })
      .indexOf(value);

    data.splice(indexOfItemToRemove, 1);
    const target = { value: data, id: formId };
    handleChange({ target });
    setShowDeleteModal(false);
  }

  // The columns of the list
  const columns = [
    {
      path: "label",
      label: intl.formatMessage({ id: "table_header_name" }),
    },
    {
      key: "edit",
      content: () => (
        <>
          {/* @todo make quick edit modal */}
          <div className="m-2">
            <Button variant="primary">Quick edit</Button>
          </div>
        </>
      ),
    },
    {
      key: "delete",
      content: (playlistData) => (
        <>
          <div className="m-2">
            <Button
              variant="danger"
              onClick={() => openDeleteModal(playlistData)}
            >
              <FormattedMessage id="delete" defaultMessage="delete" />
            </Button>
          </div>
        </>
      ),
    },
  ];

  return (
    <>
      <PlaylistsDropdown
        name="playlists"
        handlePlaylistSelection={handleChange}
        selected={data}
      />
      {data.length > 0 && (
        <DragAndDropTable
          columns={columns}
          onDropped={handleChange}
          formId={formId}
          data={data}
        />
      )}
      <DeleteModal
        show={showDeleteModal}
        onClose={onCloseDeleteModal}
        handleAccept={() => handleRemove(selectedRow)}
        selectedRows={selectedRow}
        deleteConfirmation={confirmationString}
      />
    </>
  );
}

PlaylistDragAndDrop.propTypes = {
  formId: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({ value: PropTypes.number, label: PropTypes.string })
  ).isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default PlaylistDragAndDrop;
