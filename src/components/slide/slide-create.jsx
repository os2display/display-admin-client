import { React, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import idFromUrl from "../util/helpers/id-from-url";
import {
  usePostV1SlidesMutation,
  usePutV1PlaylistsByIdSlideAndSlideIdMutation,
} from "../../redux/api/api.generated";
import SlideForm from "./slide-form";

/**
 * The slide edit component.
 *
 * @returns {object} The slide edit page.
 */
function SlideCreate() {
  const { t } = useTranslation("common");
  const history = useHistory();
  const [playlistsToAdd, setPlaylistsToAdd] = useState([]);
  const headerText = t("edit-slide.create-new-slide");
  const [formStateObject, setFormStateObject] = useState({
    "@type": "Slide",
    modifiedBy: "todo",
    createdBy: "todo",
    published: {
      from: "2021-11-17T06:15:04Z", // Todo
      to: "2021-04-29T09:54:10Z", // Todo
    },
  });

  const [
    PutV1PlaylistsByIdSlideAndSlide,
    {
      isLoading: isSavingPlaylists,
      error: savePlaylistError,
      isSuccess: savePlaylistSuccess,
    },
  ] = usePutV1PlaylistsByIdSlideAndSlideIdMutation();

  const [
    PostV1Slide,
    {
      data,
      isLoading: isSavingSlide,
      error: saveError,
      isSuccess: isSaveSuccess,
    },
  ] = usePostV1SlidesMutation();

  /**
   * When the slide is saved, the playlist(s) will be saved.
   * When saved, it redirects to edit slide.
   */
  useEffect(() => {
    if (isSaveSuccess && data) {
      if (playlistsToAdd.length > 0) {
        // remove first element for saving
        const toAdd = playlistsToAdd.splice(0, 1).shift();
        const toAddId = idFromUrl(toAdd);
        PutV1PlaylistsByIdSlideAndSlide({
          id: toAddId,
          slideId: idFromUrl(data["@id"]),
        });
      } else {
        history.push(`/slide/edit/${idFromUrl(data["@id"])}`);
      }
    }
  }, [isSaveSuccess, savePlaylistSuccess]);

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
   * Set playlist to save state
   */
  function handleSavePlaylists() {
    const { onPlaylists } = formStateObject;
    if (onPlaylists) {
      setPlaylistsToAdd(onPlaylists);
    }
  }

  /**
   * Handles submit.
   */
  function handleSubmit() {
    formStateObject.created = new Date().toISOString();
    formStateObject.modified = new Date().toISOString();
    // Change templateinfo to the format accepted by the api
    if (formStateObject.templateInfo) {
      formStateObject.templateInfo = { "@id": formStateObject.templateInfo };
    }
    // formStateObject.published = { from: creationTime, to: creationTime };
    const saveData = { slideSlideInput: JSON.stringify(formStateObject) };
    PostV1Slide(saveData);
    handleSavePlaylists();
  }

  return (
    <SlideForm
      slide={formStateObject}
      headerText={headerText}
      handleInput={handleInput}
      handleSubmit={handleSubmit}
      isLoading={false}
      isSaveSuccess={isSaveSuccess}
      isSaving={isSavingPlaylists || isSavingSlide}
      errors={saveError || savePlaylistError || false}
    />
  );
}

export default SlideCreate;
