import { React } from "react";
import { useParams } from "react-router-dom";
import { useGetV2ThemesByIdQuery } from "../../redux/api/api.generated.ts";
import ThemeManager from "./theme-manager";

/**
 * The themes create component.
 *
 * @returns {object} The themes create page.
 */
function ThemeEdit() {
  const { id } = useParams();

  const {
    data,
    error: loadingError,
    isLoading,
  } = useGetV2ThemesByIdQuery({ id });

  return (
    <div className="p-3">
      <ThemeManager
        saveMethod="PUT"
        initialState={data}
        id={id}
        loadingError={loadingError}
        isLoading={isLoading}
      />
    </div>
  );
}

export default ThemeEdit;
