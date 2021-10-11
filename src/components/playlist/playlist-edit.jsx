import { React, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useTranslation } from "react-i18next";
import idFromUrl from "../util/helpers/id-from-url";
import {
  useGetV1PlaylistsByIdQuery,
  usePutV1PlaylistsByIdMutation,
  usePutV1PlaylistsByIdSlidesMutation,
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
  const [formStateObject, setFormStateObject] = useState();
  const [slidesToAdd, setSlidesToAdd] = useState([]);
  const { id } = useParams();

  const [
    PutV1Playlists,
    { isLoading: isSaving, error: saveError, isSuccess: isSaveSuccess },
  ] = usePutV1PlaylistsByIdMutation();

  const [
    PutV1PlaylistsByIdSlides,
    {
      isLoading: isSavingSlides,
      error: saveErrorSlides,
      isSuccess: isSaveSuccessSlides,
    },
  ] = usePutV1PlaylistsByIdSlidesMutation();

  const {
    data,
    error: loadError,
    isLoading,
  } = useGetV1PlaylistsByIdQuery({ id });

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
   * Set loaded data into form state.
   */
  useEffect(() => {
    if (data) {
      setFormStateObject(data);
    }
  }, [data]);

  /**
   * When the playlist is saved, the slide will be saved.
   */
  useEffect(() => {
    if (isSaveSuccess) {
      PutV1PlaylistsByIdSlides({
        id,
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
    PutV1Playlists({
      id,
      playlistPlaylistInput: JSON.stringify(formStateObject),
    });
    if (Array.isArray(formStateObject.slides)) {
      handleSaveSlides();
    }
  }

  return (
    <>
      {formStateObject && (
        <PlaylistForm
          playlist={formStateObject}
          headerText={`${headerText}: ${
            formStateObject && formStateObject.title
          }`}
          handleInput={handleInput}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
          isSaveSuccess={isSaveSuccess || isSaveSuccessSlides}
          isSaving={isSaving || isSavingSlides}
          errors={loadError || saveError || saveErrorSlides || false}
        />
      )}
    </>
  );
}

export default PlaylistEdit;
