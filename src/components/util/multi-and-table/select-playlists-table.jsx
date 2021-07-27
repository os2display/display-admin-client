import { React, useState } from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { useIntl, FormattedMessage } from "react-intl";
import Table from "../table/table";
import PlaylistsDropdown from "../forms/multiselect-dropdown/playlists/playlists-dropdown";
import InfoModal from "../../info-modal/info-modal";
import ListButton from "../list/list-button";
/**
 * A multiselect and table for playlists.
 *
 * @param {string} props
 * the props.
 * @param {string} props.name
 * The name for the input
 * @param {string} props.selectedData
 * The data for the multidropdown.
 * @param {Array} props.errors
 * A list of errors, or null.
 * @returns {object}
 * An input.
 */
function SelectPlaylistTable({ handleChange, name, selectedData, errors }) {
  const intl = useIntl();
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
   * Removes screen from list of screens.
   *
   * @param {object} props
   * The props.
   * @param {string} props.id
   * The id of the screen
   */
  function removeFromList({ id }) {
    const indexOfItemToRemove = selectedData
      .map((item) => {
        return item.id;
      })
      .indexOf(id);
    selectedData.splice(indexOfItemToRemove, 1);
    const target = { value: selectedData, id: name };
    handleChange({ target });
  }

  // The columns for the table.
  const columns = [
    {
      path: "name",
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
      key: "categories",
      label: intl.formatMessage({ id: "table_header_number_of_categories" }),
    },
    {
      key: "delete",
      content: (screenData) => (
        <Button variant="danger" onClick={() => removeFromList(screenData)}>
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
        errors={errors}
        name={name}
        handlePlaylistSelection={handleChange}
        selected={selectedData}
      />
      {selectedData.length > 0 && (
        <Table columns={columns} data={selectedData} />
      )}
      <InfoModal
        show={showInfoModal}
        onClose={onCloseInfoModal}
        dataStructureToDisplay={dataStructureToDisplay}
        infoModalString={infoModalText}
      />
    </>
  );
}

SelectPlaylistTable.defaultProps = {
  errors: [],
  selectedData: [],
};

SelectPlaylistTable.propTypes = {
  name: PropTypes.string.isRequired,
  selectedData: PropTypes.arrayOf(
    PropTypes.shape({ value: PropTypes.number, label: PropTypes.string })
  ),
  handleChange: PropTypes.func.isRequired,
  errors: PropTypes.arrayOf(PropTypes.string),
};

export default SelectPlaylistTable;
