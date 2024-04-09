import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import idFromUrl from "../util/helpers/id-from-url";
import ScreenManager from "./screen-manager";
import { useGetV2ScreensByIdQuery } from "../../redux/api/api.generated.ts";

/**
 * The screen edit component.
 *
 * @returns {object} The screen edit page.
 */
function ScreenEdit() {
  const [groupId, setGroupId] = useState();
  const { id } = useParams();

  const { data, error, isLoading } = useGetV2ScreensByIdQuery({ id });

  /** Sets the id of groups for api call. */
  useEffect(() => {
    if (data && !groupId) {
      setGroupId(idFromUrl(data.inScreenGroups));
    }
  }, [data]);

  return (
    <>
      {groupId && (
        <ScreenManager
          saveMethod="PUT"
          initialState={data}
          id={id}
          loadingError={error}
          isLoading={isLoading}
          groupId={groupId}
        />
      )}
    </>
  );
}

export default ScreenEdit;
