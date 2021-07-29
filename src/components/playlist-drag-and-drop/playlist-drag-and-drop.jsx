import { React } from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { FormattedMessage, useIntl } from "react-intl";
import PlaylistsDropdown from "../util/forms/multiselect-dropdown/playlists/playlists-dropdown";
import DragAndDropTable from "../util/drag-and-drop-table/drag-and-drop-table";

/**
 * An input for forms.
 *
 * @param {string} props
 * the props.
 * @param {string} props.radioGroupName
 * The name of the input
 * @param {string} props.label
 * The label for the input
 * @returns {object}
 * An input.
 */
function PlaylistDragAndDrop({ handleChange, formId, data }) {
  const intl = useIntl();

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
  }

  // The columns of the list
  const columns = [
    {
      path: "name",
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
        <Button variant="danger" onClick={() => handleRemove(playlistData)}>
          <FormattedMessage
            id="remove_from_list"
            defaultMessage="remove_from_list"
          />
        </Button>
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
