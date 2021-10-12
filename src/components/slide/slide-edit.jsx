import { React, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useTranslation } from "react-i18next";
import {
  useGetV1SlidesByIdQuery,
  usePutV1SlidesByIdMutation,
  usePutV1PlaylistsByIdSlidesMutation,
} from "../../redux/api/api.generated";
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
  const [playlistsToAdd, setPlaylistsToAdd] = useState([]);
  const { id } = useParams();

  const [
    PutV1Slides,
    { isLoading: isSaving, error: saveError, isSuccess: isSaveSuccess },
  ] = usePutV1SlidesByIdMutation();

  const [
    PutV1PlaylistsByIdSlides,
    {
      isLoading: isSavingPlaylists,
      error: savePlaylistError,
      isSuccess: savePlaylistSuccess,
    },
  ] = usePutV1PlaylistsByIdSlidesMutation();

  const { data, error: loadError, isLoading } = useGetV1SlidesByIdQuery({ id });

  /**
   * Set loaded data into form state.
   */
  useEffect(() => {
    if (data) {
      const dataCopy = { ...data };
      dataCopy.templateInfo = dataCopy.templateInfo["@id"];
      setFormStateObject(dataCopy);
    }
  }, [data]);

  /**
   * When the screen is saved, the groups will be saved.
   */
  useEffect(() => {
    if (isSaveSuccess) {
      // PutV1PlaylistsByIdSlides({
      //   id,
      //   body: JSON.stringify(playlistsToAdd),
      // });
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
    const saveData = {
      id,
      slideSlideInput: JSON.stringify({
        ...formStateObject,
        templateInfo: {
          "@id": formStateObject.templateInfo,
          options: { fade: false },
        },
        published: {
          from: "2021-11-04T20:34:56Z",
          to: "2020-12-25T03:58:27Z",
        },
        media: [
          "/v1/media/01FHG8B7M66G5ETZPDQFYMMNCK",
          "/v1/media/01FHG8B7M66G5ETZPDQFYMMNCX",
        ],
      }),
    };

    PutV1Slides(saveData);
    const { onPlaylists } = formStateObject;
    if (Array.isArray(onPlaylists)) {
      setPlaylistsToAdd(onPlaylists);
    }
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
          isLoading={isLoading || isSavingPlaylists}
          isSaveSuccess={isSaveSuccess}
          isSaving={isSaving}
          errors={loadError || saveError || savePlaylistError || false}
        />
      )}
    </>
  );
}

export default SlideEdit;
