import { React, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useTranslation } from "react-i18next";
import {
  useGetV1SlidesByIdQuery,
  usePutV1SlidesByIdMutation,
  usePutV1PlaylistsByIdSlideAndSlideIdMutation,
  useDeleteV1PlaylistsByIdSlideAndSlideIdMutation,
} from "../../redux/api/api.generated";
import SlideForm from "./slide-form";

/**
 * The slide edit component.
 *
 * @returns {object} The slide edit page.
 */
function SlideEdit() {
  const { t } = useTranslation("common");
  const headerText = t("edit-slide.edit-slide");
  const [formStateObject, setFormStateObject] = useState({});
  const [playlistsToRemove, setPlaylistsToRemove] = useState([]);
  const [playlistsToAdd, setPlaylistsToAdd] = useState([]);
  const { id } = useParams();

  const [
    PutV1Slides,
    { isLoading: isSaving, error: saveError, isSuccess: isSaveSuccess },
  ] = usePutV1SlidesByIdMutation();
  const [
    PutV1PlaylistsByIdSlideAndSlide,
    {
      isLoading: isSavingPlaylists,
      error: savePlaylistError,
      isSuccess: savePlaylistSuccess,
    },
  ] = usePutV1PlaylistsByIdSlideAndSlideIdMutation();
  const [
    DeleteV1PlaylistsByIdSlideAndSlide,
    {
      isLoading: isDeletingPlaylists,
      error: deletePlaylistError,
      isSuccess: deletePlaylistSuccess,
    },
  ] = useDeleteV1PlaylistsByIdSlideAndSlideIdMutation();
  console.log("isDeletingPlaylists", isDeletingPlaylists);
  console.log("deletePlaylistError", deletePlaylistError);
  console.log("deletePlaylistSuccess", deletePlaylistSuccess);
  const { data, error: loadError, isLoading } = useGetV1SlidesByIdQuery({ id });
  /**
   * Set loaded data into form state.
   */
  useEffect(() => {
    if (data) {
      setFormStateObject(data);
    }
  }, [data]);

  /**
   * Set loaded data into form state.
   */
  useEffect(() => {
    if (isSaveSuccess) {
      if (playlistsToAdd.length > 0) {
        let toAdd = playlistsToAdd.splice(0, 1);
        let toAddId = toAdd[0].id;
        const saveData = { id: toAddId, slideId: id };
        PutV1PlaylistsByIdSlideAndSlide(saveData);
      } else if (playlistsToRemove.length > 0) {
        let toRemove = playlistsToRemove.splice(0, 1);
        let toRemoveId = toRemove[0].id;
        const saveData = { id: toRemoveId, slideId: id };
        DeleteV1PlaylistsByIdSlideAndSlide(saveData);
      }
    }
  }, [isSaveSuccess, deletePlaylistSuccess, savePlaylistSuccess]);

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
   * Handles submit.
   */
  function handleSubmit() {
    // save screen
    const saveData = { id, body: formStateObject };
    PutV1Slides(saveData);
    setPlaylistsToRemove(
      formStateObject.playlists.filter(({ toRemove }) => toRemove)
    );
    setPlaylistsToAdd(formStateObject.playlists.filter(({ toAdd }) => toAdd));
  }

  return (
    <SlideForm
      slide={formStateObject}
      headerText={`${headerText}: ${formStateObject && formStateObject.title}`}
      handleInput={handleInput}
      handleSubmit={handleSubmit}
      isLoading={isLoading || isDeletingPlaylists}
      isSaveSuccess={isSaveSuccess}
      isSaving={isSaving}
      errors={
        loadError || saveError || savePlaylistError || deletePlaylistError
      }
    />
  );
}

export default SlideEdit;
