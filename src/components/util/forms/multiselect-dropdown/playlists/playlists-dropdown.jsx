import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import MultiSelectComponent from "../multi-dropdown";
import { useTranslation } from "react-i18next";

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
 * @returns {object}
 * The multidropdown of playlists.
 */
function PlaylistsDropdown({
  handlePlaylistSelection,
  selected,
  name,
  errors,
}) {
  const { t } = useTranslation("common");
  const [options, setOptions] = useState();
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Load content from fixture.
   */
  useEffect(() => {
    // @TODO load real content.
    fetch("/fixtures/playlists/playlists.json")
      .then((response) => response.json())
      .then((jsonData) => {
        setOptions(jsonData.playlists);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      {options && (
        <>
          <MultiSelectComponent
            label={t("playlists-dropdown.label")}
            noSelectedString={t("playlists-dropdown.nothing-selected")}
            handleSelection={handlePlaylistSelection}
            options={options}
            selected={selected}
            name={name}
            isLoading={isLoading}
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
  name: PropTypes.string.isRequired,
  errors: PropTypes.arrayOf(PropTypes.string),
};

export default PlaylistsDropdown;
