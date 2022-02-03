import { React, useEffect, useState } from "react";
import { useParams } from "react-router";
import SharedManager from "./playlist-campaign-manager";
import idFromUrl from "../util/helpers/id-from-url";
import { useGetV1PlaylistsByIdQuery } from "../../redux/api/api.generated";

/**
 * The playlist/campaign edit component.
 *
 * @returns {object} The playlist/campaign edit page.
 */
function PlaylistCampaignEdit() {
  const { id } = useParams();
  const [slideId, setSlideId] = useState();
  const {
    data,
    error: loadingError,
    isLoading,
  } = useGetV1PlaylistsByIdQuery({ id });

  /** Sets the id of slides for api call. */
  useEffect(() => {
    if (data && !slideId) {
      setSlideId(idFromUrl(data.slides));
    }
  }, [data]);

  return (
    <>
      {slideId && (
        <SharedManager
          saveMethod="PUT"
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

export default PlaylistCampaignEdit;
