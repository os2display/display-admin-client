import { React } from "react";
import { useParams } from "react-router-dom";
import { useGetV2FeedSourcesByIdQuery } from "../../redux/api/api.generated.ts";
import FeedSourceManager from "./feed-source-manager";

/**
 * The feed source edit component.
 *
 * @returns {object} The feed sources edit page.
 */
function FeedSourceEdit() {
  const { id } = useParams();
  const {
    data,
    error: loadingError,
    isLoading,
  } = useGetV2FeedSourcesByIdQuery({ id });

  return (
    <FeedSourceManager
      saveMethod="PUT"
      initialState={data}
      id={id}
      loadingError={loadingError}
      isLoading={isLoading}
    />
  );
}

export default FeedSourceEdit;
