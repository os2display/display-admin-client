import { React, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import idFromUrl from "../util/helpers/id-from-url";
import {
  usePostV1SlidesMutation,
  usePutV1PlaylistsByIdSlideAndSlideIdMutation,
  usePutV1PlaylistsByIdSlidesMutation,
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
  const headerText = t("slide-create.create-slide-header");
  const [formStateObject, setFormStateObject] = useState({
    modifiedBy: "todo",
    createdBy: "todo",
    published: {
      from: "2021-11-17T06:15:04Z", // Todo
      to: "2021-04-29T09:54:10Z", // Todo
    },
  });

  const [
    PutV1PlaylistsByIdSlides,
    {
      isLoading: isSavingPlaylists,
      error: savePlaylistError,
      isSuccess: savePlaylistSuccess,
    },
  ] = usePutV1PlaylistsByIdSlidesMutation();

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
   * When the slide is saved, the playlists will be saved.
   */
  useEffect(() => {
    if (isSaveSuccess) {
      PutV1PlaylistsByIdSlides({
        id,
        body: JSON.stringify(playlistsToAdd),
      });
    }
  }, [isSaveSuccess]);

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
    formStateObject.created = new Date().toISOString();
    formStateObject.modified = new Date().toISOString();
    // Change templateinfo to the format accepted by the api
    if (formStateObject.templateInfo) {
      formStateObject.templateInfo = { "@id": formStateObject.templateInfo };
    }
    // formStateObject.published = { from: creationTime, to: creationTime };
    const saveData = { slideSlideInput: JSON.stringify(formStateObject) };
    PostV1Slide(saveData);
    const { onPlaylists } = formStateObject;
    if (Array.isArray(onPlaylists)) {
      setPlaylistsToAdd(onPlaylists);
    }
  }

  return (
    <SlideForm
      slide={formStateObject}
      headerText={headerText}
      handleInput={handleInput}
      handleSubmit={handleSubmit}
      isLoading={false}
      isSaveSuccess={isSaveSuccess || savePlaylistSuccess}
      isSaving={isSavingPlaylists || isSavingSlide}
      errors={saveError || savePlaylistError || false}
    />
  );
}

export default SlideCreate;
