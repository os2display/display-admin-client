import { React } from "react";
import PropTypes from "prop-types";
import PlaylistCampaignManager from "./playlist-campaign-manager";

/**
 * The playlist/campaign create component.
 *
 * @param {object} props Props.
 * @param {string} props.location Either playlist or campaign.
 * @returns {object} The playlist/campaign create page.
 */
function PlaylistCampaignCreate({ location }) {
  // Initialize to empty playlist/campaign object.
  const data = {
    slides: [],
    title: "",
    description: "",
    modifiedBy: "",
    createdBy: "",
    schedules: [],
    published: {
      from: null,
      to: null,
    },
  };

  return (
    <PlaylistCampaignManager
      location={location}
      saveMethod="POST"
      initialState={data}
    />
  );
}

PlaylistCampaignCreate.propTypes = {
  location: PropTypes.string.isRequired,
};

export default PlaylistCampaignCreate;
