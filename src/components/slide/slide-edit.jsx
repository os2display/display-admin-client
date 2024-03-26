import { React } from "react";
import { useParams } from "react-router-dom";
import { useGetV1SlidesByIdQuery } from "../../redux/api/api.generated.ts";
import SlideManager from "./slide-manager";

/**
 * The slide edit component.
 *
 * @returns {object} The slide edit page.
 */
function SlideEdit() {
  const { id } = useParams();

  const {
    data,
    error: loadingError,
    isLoading,
  } = useGetV1SlidesByIdQuery({ id }, { skip: !id });

  return (
    <SlideManager
      saveMethod="PUT"
      initialState={data}
      id={id}
      loadingError={loadingError}
      isLoading={isLoading}
    />
  );
}

export default SlideEdit;
