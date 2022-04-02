import { React, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import Table from "../table/table";
import {
  useGetV1PlaylistsQuery,
  useGetV1SlidesByIdPlaylistsQuery,
  useGetV1PlaylistsByIdSlidesQuery,
} from "../../../redux/api/api.generated";
import PlaylistsDropdown from "../forms/multiselect-dropdown/playlists/playlists-dropdown";
import InfoModal from "../../info-modal/info-modal";
import { SelectPlaylistColumns } from "../../playlist/playlists-columns";

/**
 * A multiselect and table for groups.
 *
 * @param {string} props The props.
 * @param {string} props.name The name for the input
 * @param {string} props.id The id used for the get.
 * @param {string} props.helpText Helptext for dropdown.
 * @returns {object} Select groups table.
 */
function SelectPlaylistsTable({ handleChange, name, id, helpText }) {
  const { t } = useTranslation("common");
  const [selectedData, setSelectedData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [onSlides, setOnSlides] = useState();
  const { data: playlists } = useGetV1PlaylistsQuery({
    title: searchText,
    itemsPerPage: 100,
    isCampaign: false,
    sharedWithMe: false,
    order: { createdAt: "desc" },
  });
  const { data } = useGetV1SlidesByIdPlaylistsQuery({ id });

  /** Map loaded data. */
  useEffect(() => {
    if (data) {
      setSelectedData(data["hydra:member"]);
    }
  }, [data]);

  /**
   * Adds group to list of groups.
   *
   * @param {object} props - The props.
   * @param {object} props.target - The target.
   */
  function handleAdd({ target }) {
    const { value, id: localId } = target;
    setSelectedData(value);
    handleChange({
      target: { id: localId, value: value.map((item) => item["@id"]) },
    });
  }

  /** @param {Array} slidesArray The array of playlists. */
  function openInfoModal(slidesArray) {
    setOnSlides(slidesArray);
    setShowInfoModal(true);
  }

  /** Closes the info modal. */
  function onCloseInfoModal() {
    setShowInfoModal(false);
    setOnSlides();
  }

  /**
   * Fetches data for the multi component
   *
   * @param {string} filter - The filter.
   */
  function onFilter(filter) {
    setSearchText(filter);
  }

  /**
   * Removes playlist from list of groups.
   *
   * @param {object} removeItem The item to remove.
   */
  function removeFromList(removeItem) {
    const indexOfItemToRemove = selectedData
      .map((item) => {
        return item["@id"];
      })
      .indexOf(removeItem);
    const selectedDataCopy = [...selectedData];
    selectedDataCopy.splice(indexOfItemToRemove, 1);
    setSelectedData(selectedDataCopy);

    const target = {
      value: selectedDataCopy.map((item) => item["@id"]),
      id: name,
    };
    handleChange({ target });
  }

  // The columns for the table.
  const columns = SelectPlaylistColumns({
    handleDelete: removeFromList,
    listButtonCallback: openInfoModal,
    apiCall: useGetV1PlaylistsByIdSlidesQuery,
    editTarget: "playlist",
  });

  return (
    <>
      {playlists && (
        <>
          <PlaylistsDropdown
            name={name}
            data={playlists["hydra:member"]}
            handlePlaylistSelection={handleAdd}
            selected={selectedData}
            filterCallback={onFilter}
            helpText={helpText}
          />
          {selectedData.length > 0 && (
            <>
              <Table columns={columns} data={selectedData} />
            </>
          )}
          <InfoModal
            show={showInfoModal}
            redirectTo="/slide/edit"
            apiCall={useGetV1PlaylistsByIdSlidesQuery}
            onClose={onCloseInfoModal}
            dataKey="slide"
            dataStructureToDisplay={onSlides}
            modalTitle={t("select-playlists-table.info-modal.slides")}
          />
        </>
      )}
    </>
  );
}

SelectPlaylistsTable.defaultProps = {
  id: "",
};

SelectPlaylistsTable.propTypes = {
  name: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  id: PropTypes.string,
  helpText: PropTypes.string.isRequired,
};

export default SelectPlaylistsTable;
