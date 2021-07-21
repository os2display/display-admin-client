import React, { useState, useEffect } from "react";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";
import MultiSelectComponent from "../multi-dropdown";

const PlaylistsDropdown = ({ handlePlaylistSelection, selected, formId }) => {
  const intl = useIntl();
  const [options, setOptions] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const noSelectedPlaylists = intl.formatMessage({
    id: "playlists_dropdown_no_selected",
  });
  const playlistsLabel = intl.formatMessage({
    id: "playlists_dropdown_label",
  });
  /**
   * Load content from fixture.
   */
  useEffect(() => {
    // @TODO load real content.
    fetch("http://localhost:3000/fixtures/playlists/playlists.json")
      .then((response) => response.json())
      .then((jsonData) => {
        const mappedArray = jsonData.playlists.map((item) => {
          return {
            label: item.name,
            value: item.id,
            disabled: false,
          };
        });
        setOptions(mappedArray);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      {options && (
        <>
          <label htmlFor={formId}>{playlistsLabel}</label>
          <MultiSelectComponent
            handleSelection={handlePlaylistSelection}
            options={options}
            selected={selected}
            formId={formId}
            isLoading={isLoading}
            noSelectedString={noSelectedPlaylists}
          />
        </>
      )}
    </>
  );
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
  formId: PropTypes.string.isRequired,
};

export default PlaylistsDropdown;
