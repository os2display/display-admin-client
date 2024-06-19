import { React, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import Table from "../table/table";
import {
  useGetV2PlaylistsQuery,
  useGetV2SlidesByIdPlaylistsQuery,
  useGetV2PlaylistsByIdSlidesQuery,
} from "../../../redux/api/api.generated.ts";
import PlaylistsDropdown from "../forms/multiselect-dropdown/playlists/playlists-dropdown";
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
function SelectPlaylistsTable({ handleChange, name, id = "", helpText }) {
  const { t } = useTranslation("common", {
    keyPrefix: "select-playlists-table",
  });
  const [selectedData, setSelectedData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");

  // Get 30 playlists for dropdown, and when search is changed more will be fetched.
  const { data: playlists } = useGetV2PlaylistsQuery({
    title: searchText,
    itemsPerPage: 30,
    isCampaign: false,
    sharedWithMe: false,
    order: { createdAt: "desc" },
  });

  // Get 10 of the selected playlists for table below dropdown, table is paginated so on page change more is fetched.
  const { data: alreadySelectedPlaylists } = useGetV2SlidesByIdPlaylistsQuery(
    {
      itemsPerPage: 10,
      page,
      id,
    },
    { skip: !id }
  );

  /** Map loaded data. */
  useEffect(() => {
    if (alreadySelectedPlaylists) {
      setTotalItems(alreadySelectedPlaylists["hydra:totalItems"]);
      const newPlaylists = alreadySelectedPlaylists["hydra:member"].map(
        ({ playlist }) => {
          return playlist;
        }
      );
      setSelectedData([...selectedData, ...newPlaylists]);
    }
  }, [alreadySelectedPlaylists]);

  /**
   * Adds group to list of groups.
   *
   * @param {object} props - The props.
   * @param {object} props.target - The target.
   */
  const handleAdd = ({ target }) => {
    const { value, id: localId } = target;
    setSelectedData(value);
    handleChange({
      target: { id: localId, value: value.map((item) => item["@id"]) },
    });
  };

  /**
   * Fetches data for the multi component
   *
   * @param {string} filter - The filter.
   */
  const onFilter = (filter) => {
    setSearchText(filter);
  };

  /**
   * Removes playlist from list of groups.
   *
   * @param {object} removeItem The item to remove.
   */
  const removeFromList = (removeItem) => {
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
  };

  // The columns for the table.
  const columns = SelectPlaylistColumns({
    handleDelete: removeFromList,
    apiCall: useGetV2PlaylistsByIdSlidesQuery,
    editTarget: "playlist",
    infoModalRedirect: "/slide/edit",
    dataKey: "slide",
    infoModalTitle: t("info-modal.slides"),
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
            <Table
              columns={columns}
              data={selectedData}
              callback={() => setPage(page + 1)}
              label={t("more-playlists")}
              totalItems={totalItems}
            />
          )}
        </>
      )}
    </>
  );
}

SelectPlaylistsTable.propTypes = {
  name: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  id: PropTypes.string,
  helpText: PropTypes.string.isRequired,
};

export default SelectPlaylistsTable;
