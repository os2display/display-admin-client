import { React, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useTranslation } from "react-i18next";
import {
  useGetV1SlidesByIdQuery,
  usePutV1SlidesByIdMutation,
  usePutV1PlaylistsByIdSlideAndSlideIdMutation,
  useDeleteV1PlaylistsByIdSlideAndSlideIdMutation,
} from "../../redux/api/api.generated";
import idFromUrl from "../util/helpers/id-from-url";
import SlideForm from "./slide-form";

/**
 * The slide edit component.
 *
 * @returns {object} The slide edit page.
 */
function SlideEdit() {
  const { t } = useTranslation("common");
  const headerText = t("slide-edit.edit-slide-header");
  const [formStateObject, setFormStateObject] = useState();
  const [playlistsToRemove, setPlaylistsToRemove] = useState([]);
  const [originallySelectedPlaylists, setOriginallySelectedPlaylists] =
    useState([]);
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

  const { data, error: loadError, isLoading } = useGetV1SlidesByIdQuery({ id });

  /**
   * Set loaded data into form state.
   */
  useEffect(() => {
    if (data) {
      const dataCopy = { ...data };
      dataCopy.templateInfo = dataCopy.templateInfo["@id"];
      setFormStateObject(dataCopy);
      setOriginallySelectedPlaylists(data.onPlaylists);
    }
  }, [data]);

  /**
   * When the slide is saved, the playlists will be saved.
   */
  useEffect(() => {
    if (isSaveSuccess) {
      if (playlistsToAdd.length > 0) {
        // remove first element for saving
        const toAdd = playlistsToAdd.splice(0, 1).shift();
        const toAddId = idFromUrl(toAdd);
        PutV1PlaylistsByIdSlideAndSlide({ id: toAddId, slideId: id });
      } else if (playlistsToRemove.length > 0) {
        // remove first element for deleting
        const toRemove = playlistsToRemove.splice(0, 1).shift();
        const toRemoveId = idFromUrl(toRemove);
        DeleteV1PlaylistsByIdSlideAndSlide({ id: toRemoveId, slideId: id });
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
   *
   */
  function handleSavePlaylists() {
    const { onPlaylists } = formStateObject;
    // The elements removed from the original list
    const ToRemove = originallySelectedPlaylists.filter(
      (x) => !onPlaylists.includes(x)
    );
    // The elements added to the original list
    const toAdd = onPlaylists.filter(
      (x) => !originallySelectedPlaylists.includes(x)
    );
    setPlaylistsToRemove(ToRemove);
    setPlaylistsToAdd(toAdd);
  }

  /**
   * Handles submit.
   */
  function handleSubmit() {
    formStateObject.modified = new Date().toISOString();
    const saveData = {
      id,
      slideSlideInput: JSON.stringify({
        ...formStateObject,
        templateInfo: { "@id": formStateObject.templateInfo },
      }),
    };
    PutV1Slides(saveData);
    handleSavePlaylists();
  }

  return (
    <>
      {formStateObject && (
        <SlideForm
          slide={formStateObject}
          headerText={`${headerText}: ${
            formStateObject && formStateObject.title
          }`}
          handleInput={handleInput}
          handleSubmit={handleSubmit}
          isLoading={isLoading || isDeletingPlaylists || isSavingPlaylists}
          isSaveSuccess={isSaveSuccess}
          isSaving={isSaving}
          errors={
            loadError ||
            saveError ||
            savePlaylistError ||
            deletePlaylistError ||
            false
          }
        />
      )}
    </>
  );
}

export default SlideEdit;
