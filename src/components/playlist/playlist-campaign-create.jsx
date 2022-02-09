import { React } from "react";
import PlaylistCampaignManager from "./playlist-campaign-manager";

/**
 * The playlist/campaign create component.
 *
 * @returns {object} The playlist/campaign create page.
 */
function PlaylistCampaignCreate() {
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

  return <PlaylistCampaignManager saveMethod="POST" initialState={data} />;
}

export default PlaylistCampaignCreate;
