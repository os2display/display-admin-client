import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import PlaylistCampaignManager from "./playlist-campaign-manager";
import idFromUrl from "../util/helpers/id-from-url";
import { useGetV2PlaylistsByIdQuery } from "../../redux/api/api.generated.ts";

/**
 * The playlist/campaign edit component.
 *
 * @param {object} props Props.
 * @param {string} props.location Either playlist or campaign.
 * @returns {object} The playlist/campaign edit page.
 */
function PlaylistCampaignEdit({ location }) {
  const { id } = useParams();
  const [slideId, setSlideId] = useState();
  const {
    data,
    error: loadingError,
    isLoading,
  } = useGetV2PlaylistsByIdQuery({ id });

  /** Sets the id of slides for api call. */
  useEffect(() => {
    if (data && !slideId) {
      setSlideId(idFromUrl(data.slides));
    }
  }, [data]);

  return (
    <>
      {(slideId || loadingError) && (
        <PlaylistCampaignManager
          saveMethod="PUT"
          location={location}
          initialState={data}
          id={id}
          loadingError={loadingError}
          isLoading={isLoading}
          slideId={slideId}
        />
      )}
    </>
  );
}

PlaylistCampaignEdit.propTypes = {
  location: PropTypes.string.isRequired,
};

export default PlaylistCampaignEdit;
