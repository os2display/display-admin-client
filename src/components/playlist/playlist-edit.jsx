import { React, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useTranslation } from "react-i18next";
import {
  useGetV1PlaylistsByIdQuery,
  usePutV1PlaylistsByIdMutation,
} from "../../redux/api/api.generated";
import PlaylistForm from "./playlist-form";

/**
 * The playlist edit component.
 *
 * @returns {object} The playlist edit page.
 */
function PlaylistEdit() {
  const { t } = useTranslation("common");
  const headerText = t("edit-playlist.edit-playlist");
  const [formStateObject, setFormStateObject] = useState({});
  const { id } = useParams();

  const [
    PutV1Playlists,
    { isLoading: isSaving, error: saveError, isSuccess: isSaveSuccess },
  ] = usePutV1PlaylistsByIdMutation();

  const { data, error: loadError, isLoading } = useGetV1PlaylistsByIdQuery({ id });

  /**
   * Set loaded data into form state.
   */
  useEffect(() => {
    if (data) {
      setFormStateObject(data);
    }
  }, [data]);

  /**
   * Set state on change in input field
   *
   * @param {object} props The props.
   * @param {object} props.target Event target.
   */
  function handleInput({ target }) {
    const localFormStateObject = { ...formStateObject };
    localFormStateObject[target.id] = target.value;
    setFormStateObject(localFormStateObject);
  }

  /**
   * Handles validations, and goes back to list.
   *
   * @param {Event} event The submit event.
   * @returns {boolean} Indicating whether to submit form.
   */
  function handleSubmit(event) {
    let data = { id: id, body: formStateObject };
    PutV1Playlists(data);
  }

  return (
    <PlaylistForm
      playlist={formStateObject}
      headerText={`${headerText}: ${formStateObject && formStateObject.title}`}
      handleInput={handleInput}
      handleSubmit={handleSubmit}
      isLoading={isLoading}
      isSaveSuccess={isSaveSuccess}
      isSaving={isSaving}
      errors={[loadError, saveError]}
    />
  );
}

export default PlaylistEdit;
