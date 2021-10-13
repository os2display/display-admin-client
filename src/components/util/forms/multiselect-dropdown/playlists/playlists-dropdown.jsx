import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import MultiSelectComponent from "../multi-dropdown";

/**
 * @param {object} props - the props.
 * @param {Function} props.handlePlaylistSelection - the callback when an option is selected
 * @param {Array} props.selected - the selected options
 * @param {string} props.name - the id of the form element
 * @param {Array} props.errors - a list of errors, or null.
 * @param {Array} props.data - the data for options.
 * @param {Function} props.filterCallback - the callback on search filter.
 * @returns {object} - the multidropdown of playlists.
 */
function PlaylistsDropdown({
  handlePlaylistSelection,
  selected,
  name,
  errors,
  data,
  filterCallback,
}) {
  const { t } = useTranslation("common");
  return (
    <>
      {data && (
        <>
          <MultiSelectComponent
            label={t("playlists-dropdown.label")}
            noSelectedString={t("playlists-dropdown.nothing-selected")}
            handleSelection={handlePlaylistSelection}
            options={data}
            selected={selected}
            name={name}
            errors={errors}
            filterCallback={filterCallback}
          />
        </>
      )}
    </>
  );
}

PlaylistsDropdown.defaultProps = {
  errors: null,
};

PlaylistsDropdown.propTypes = {
  handlePlaylistSelection: PropTypes.func.isRequired,
  selected: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number,
      label: PropTypes.string,
      disabled: PropTypes.bool,
    })
  ).isRequired,
  filterCallback: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.any).isRequired,
  name: PropTypes.string.isRequired,
  errors: PropTypes.arrayOf(PropTypes.string),
};

export default PlaylistsDropdown;
