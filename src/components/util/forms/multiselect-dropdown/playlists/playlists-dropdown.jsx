import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import MultiSelectComponent from "../multi-dropdown";

/**
 * @param {object} props
 * the props.
 * @param {Function} props.handlePlaylistSelection
 * The callback when an option is selected
 * @param {Array} props.selected
 * The selected options
 * @param {string} props.name
 * The id of the form element
 * @param {Array} props.errors
 * A list of errors, or null.
 * @param {Array} props.data
 * The data for options.
 * @returns {object}
 * The multidropdown of playlists.
 */
function PlaylistsDropdown({
  handlePlaylistSelection,
  selected,
  name,
  errors,
  data,
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
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  name: PropTypes.string.isRequired,
  errors: PropTypes.arrayOf(PropTypes.string),
};

export default PlaylistsDropdown;
