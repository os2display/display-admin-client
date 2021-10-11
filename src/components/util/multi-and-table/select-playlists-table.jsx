import { React, useState } from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Table from "../table/table";
import PlaylistsDropdown from "../forms/multiselect-dropdown/playlists/playlists-dropdown";
// import InfoModal from "../../info-modal/info-modal";
import { useGetV1PlaylistsQuery } from "../../../redux/api/api.generated";
/**
 * A multiselect and table for playlists.
 *
 * @param {string} props
 * the props.
 * @param {string} props.name
 * The name for the input
 * @returns {object}
 * An input.
 */
function SelectPlaylistTable({ handleChange, name }) {
  const { t } = useTranslation("common");
  const [selectedData, setSelectedData] = useState([]);
  const { data, isLoading } = useGetV1PlaylistsQuery({});
  /**
   * Removes playlist from list of playlists.
   *
   * @param {object} removeItem
   * The item to remove.
   */
  function removeFromList(removeItem) {
    const indexOfItemToRemove = selectedData
      .map((item) => {
        return item["@id"];
      })
      .indexOf(removeItem["@id"]);
    const selectedDataCopy = [...selectedData];
    selectedDataCopy.splice(indexOfItemToRemove, 1);
    setSelectedData(selectedDataCopy);

    const target = {
      value: selectedDataCopy.map((item) => item["@id"]),
      id: name,
    };
    handleChange({ target });
  }

  /**
   * Fetches data for the multi component // todo
   *
   * @param {string} filter - the filter.
   */
  function onFilter(filter) {
    console.log(filter);
  }

  /**
   * Adds playlist to list of playlists.
   *
   * @param {object} props - the props.
   * @param {object} props.target - the target.
   */
  function handleAdd({ target }) {
    const { value, id } = target;
    setSelectedData(value);
    handleChange({
      target: { id: id, value: value.map((item) => item["@id"]) },
    });
  }

  // The columns for the table.
  const columns = [
    {
      path: "title",
      label: t("select-playlists-table.columns.name"),
    },
    {
      key: "delete",
      content: (screenData) => (
        <Button variant="danger" onClick={() => removeFromList(screenData)}>
          {t("select-playlists-table.remove-from-list")}
        </Button>
      ),
    },
  ];
  return (
    <>
      {!isLoading && data && data["hydra:member"] && (
        <>
          <PlaylistsDropdown
            filterCallback={onFilter}
            name={name}
            data={data["hydra:member"]}
            handlePlaylistSelection={handleAdd}
            selected={selectedData}
          />
          {selectedData.length > 0 && (
            <Table columns={columns} data={selectedData} />
          )}
          {/* <InfoModal
            show={showInfoModal}
            onClose={onCloseInfoModal}
            dataStructureToDisplay={dataStructureToDisplay}
            modalTitle={infoModalTitle}
          /> */}
        </>
      )}
    </>
  );
}

SelectPlaylistTable.propTypes = {
  name: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default SelectPlaylistTable;
