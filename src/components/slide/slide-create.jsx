import { React, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import idFromUrl from "../util/helpers/id-from-url";
import {
  usePostV1SlidesMutation,
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
    title: "",
    description: "",
    duration: 10,
    published: {
      from: "2020-12-25T03:58:27Z",
      to: "2020-12-25T03:58:27Z",
    },
    media: [
      "/v1/media/01FHG8B7M66G5ETZPDQFYMMNCK",
      "/v1/media/01FHG8B7M66G5ETZPDQFYMMNCX",
    ],
    content: {
      text: "Test text",
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
    if (isSaveSuccess && data) {
      // PutV1PlaylistsByIdSlides({
      //   id: idFromUrl(data["@id"]),
      //   body: JSON.stringify(playlistsToAdd),
      // });
    }
  }, [isSaveSuccess]);

  /**
   * When the screen and group(s) are saved.
   * it redirects to edit screen.
   */
  useEffect(() => {
    if (savePlaylistSuccess) {
      history.push(`/slide/edit/${idFromUrl(data["@id"])}`);
    }
  }, [savePlaylistSuccess]);

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
    // Change templateinfo to the format accepted by the api
    formStateObject.templateInfo = {
      "@id": formStateObject.templateInfo,
      options: { fade: false },
    };
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
