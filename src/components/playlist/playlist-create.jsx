import { React, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import idFromUrl from "../util/helpers/id-from-url";
import PlaylistForm from "./playlist-form";
import {
  usePostV1PlaylistsMutation,
  usePutV1PlaylistsByIdSlidesMutation,
} from "../../redux/api/api.generated";

/**
 * The playlist edit component.
 *
 * @returns {object} The playlist edit page.
 */
function PlaylistCreate() {
  const { t } = useTranslation("common");
  const history = useHistory();
  const headerText = t("edit-playlist.create-new-playlist");
  const [formStateObject, setFormStateObject] = useState({
    slides: [],
    title: "",
    description: "",
    modifiedBy: "",
    createdBy: "",
    published: {
      from: "2021-11-17T06:15:04Z", // Todo
      to: "2021-04-29T09:54:10Z", // Todo
    },
  });
  const [slidesToAdd, setSlidesToAdd] = useState([]);

  const [
    PostV1Playlist,
    { data, isLoading: isSaving, error: saveError, isSuccess: isSaveSuccess },
  ] = usePostV1PlaylistsMutation();

  const [
    PutV1PlaylistsByIdSlides,
    {
      isLoading: isSavingSlides,
      error: saveErrorSlides,
      isSuccess: isSaveSuccessSlides,
    },
  ] = usePutV1PlaylistsByIdSlidesMutation();

  /**
   * Set state on change in input field
   *
   * @param {object} props - The props.
   * @param {object} props.target - Event target.
   */
  function handleInput({ target }) {
    const localFormStateObject = { ...formStateObject };
    localFormStateObject[target.id] = target.value;
    setFormStateObject(localFormStateObject);
  }

  /**
   * When the screen is saved, the group(s) will be saved.
   * When saved, it redirects to edit screen.
   */
  useEffect(() => {
    if (isSaveSuccessSlides && data) {
      history.push(`/playlist/edit/${idFromUrl(data["@id"])}`);
    }
  }, [isSaveSuccessSlides]);

  /**
   * When the playlist is saved, the slide will be saved.
   */
  useEffect(() => {
    if (isSaveSuccess && data) {
      PutV1PlaylistsByIdSlides({
        id: idFromUrl(data["@id"]),
        body: JSON.stringify(slidesToAdd),
      });
    }
  }, [isSaveSuccess]);

  /**
   * Sets slides to save.
   */
  function handleSaveSlides() {
    const { slides } = formStateObject;
    setSlidesToAdd(
      slides.map((slide, index) => {
        return { slide: idFromUrl(slide), weight: index };
      })
    );
  }

  /**
   * Handles submit.
   */
  function handleSubmit() {
    let saveData = {
      title: formStateObject.title,
      description: formStateObject.description,
      modifiedBy: formStateObject.modifiedBy,
      createdBy: formStateObject.createdBy,
      published: {
        from: formStateObject.published.from,
        to: formStateObject.published.from,
      },
    };
    PostV1Playlist({ playlistPlaylistInput: JSON.stringify(saveData) });
    if (formStateObject.slides.length > 0) {
      handleSaveSlides();
    }
  }

  return (
    <PlaylistForm
      playlist={formStateObject}
      headerText={headerText}
      handleInput={handleInput}
      handleSubmit={handleSubmit}
      isLoading={false}
      isSaveSuccess={isSaveSuccess || isSaveSuccessSlides}
      isSaving={isSaving || isSavingSlides}
      errors={saveError || saveErrorSlides || false}
    />
  );
}

export default PlaylistCreate;
