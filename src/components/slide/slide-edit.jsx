import { React, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import set from "lodash.set";
import {
  useGetV1SlidesByIdQuery,
  usePostMediaCollectionMutation,
  usePutV1SlidesByIdMutation,
  api,
} from "../../redux/api/api.generated";
import SlideForm from "./slide-form";
import idFromUrl from "../util/helpers/id-from-url";

/**
 * The slide edit component.
 *
 * @returns {object} The slide edit page.
 */
function SlideEdit() {
  const { t } = useTranslation("common");
  const { id } = useParams();
  const dispatch = useDispatch();
  const headerText = t("slide-edit.edit-slide-header");
  const [formStateObject, setFormStateObject] = useState();
  const [mediaFields, setMediaFields] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [submittingMedia, setSubmittingMedia] = useState([]);
  const [loadedMedia, setLoadedMedia] = useState({});

  const [
    PutV1Slides,
    { isLoading: isSaving, error: saveError, isSuccess: isSaveSuccess },
  ] = usePutV1SlidesByIdMutation();

  const {
    data: getSlideData,
    error: getSlideError,
    isLoading: getSlideIsLoading,
  } = useGetV1SlidesByIdQuery({ id });

  const [
    PostV1MediaCollection,
    {
      data: mediaData,
      isLoading: mediaIsLoading,
      error: saveMediaError,
      isSuccess: isSaveMediaSuccess,
    },
  ] = usePostMediaCollectionMutation();

  /**
   * Set state on change in input field
   *
   * @param {object} props - The props.
   * @param {object} props.target - Event target.
   */
  function handleInput({ target }) {
    const localFormStateObject = { ...formStateObject };
    set(localFormStateObject, target.id, target.value);
    setFormStateObject(localFormStateObject);
  }

  /**
   * Update content field for id/value.
   *
   * @param target.target
   * @param target
   */
  function handleContent({ target }) {
    const localFormStateObject = { ...formStateObject };
    set(localFormStateObject.content, target.id, target.value);
    setFormStateObject(localFormStateObject);
  }

  /**
   * Handle change to a media.
   *
   * @param fieldName
   */
  function handleMedia(fieldName) {
    setMediaFields([...new Set([...mediaFields, fieldName])]);
  }

  /** Handles submit. */
  function handleSubmit() {
    const newSubmittingMedia = [];

    // Setup submittingMedia list.
    mediaFields.forEach((fieldName) => {
      if (
        Object.prototype.hasOwnProperty.call(formStateObject.content, fieldName)
      ) {
        const contentField = formStateObject.content[fieldName];
        contentField.forEach((element) => {
          const formData = new FormData();
          formData.append("file", element.file);
          formData.append("title", element.title);
          formData.append("description", element.description);
          formData.append("license", element.license);
          // @TODO: Should these be optional in the API?
          formData.append("modifiedBy", "");
          formData.append("createdBy", "");
          newSubmittingMedia.push(formData);
        });
      }
    });

    // Trigger submitting hooks.
    setSubmitting(true);
    setSubmittingMedia(newSubmittingMedia);
  }

  /** Set loaded data into form state. */
  useEffect(() => {
    if (getSlideData) {
      const localFormStateObject = JSON.parse(JSON.stringify(getSlideData));

      // Make sure content is an object.
      if (localFormStateObject.content instanceof Array) {
        localFormStateObject.content = {};
      }

      // Upload media already added to the slide.
      const promises = [];

      localFormStateObject.media.forEach((media) => {
        promises.push(
          dispatch(
            api.endpoints.getV1MediaById.initiate({ id: idFromUrl(media) })
          )
        );
      });

      Promise.all(promises).then((results) => {
        const newLoadedMedia = { ...loadedMedia };

        results.forEach((result) => {
          newLoadedMedia[result.data["@id"]] = { ...result.data };
        });

        setLoadedMedia(newLoadedMedia);
      });

      setFormStateObject(localFormStateObject);
    }
  }, [getSlideData]);

  /** Handle submitting. */
  useEffect(() => {
    if (submitting) {
      if (submittingMedia.length > 0) {
        const media = submittingMedia[0];

        // Submit media.
        PostV1MediaCollection({ body: media });
      } else {
        // All media have been submitted. Submit slide.
        const saveData = {
          id,
          slideSlideInput: JSON.stringify({
            title: formStateObject.title,
            description: formStateObject.description,
            templateInfo: formStateObject.templateInfo,
            duration: formStateObject?.content?.duration
              ? parseInt(formStateObject.content.duration)
              : null,
            content: formStateObject.content,
            media: formStateObject.media,
          }),
        };

        PutV1Slides(saveData);
      }
    }
  }, [submittingMedia.length, submitting]);

  /** Submitted media is successful. */
  useEffect(() => {
    if (submitting) {
      if (isSaveMediaSuccess) {
        const newMediaFields = [...mediaFields];
        const firstMediaField = newMediaFields.shift();
        setMediaFields(newMediaFields);

        const newFormStateObject = { ...formStateObject };
        newFormStateObject.media.push(mediaData["@id"]);
        newFormStateObject.content[firstMediaField] = mediaData["@id"];
        setFormStateObject(newFormStateObject);

        const newLoadedMedia = { ...loadedMedia };
        newLoadedMedia[mediaData["@id"]] = mediaData;
        setLoadedMedia(newLoadedMedia);

        // Move to next media to upload.
        const newList = submittingMedia.slice(1);
        setSubmittingMedia(newList);
      } else if (saveMediaError) {
        console.log("saveMediaError");
      }
    }
  }, [isSaveMediaSuccess]);

  /** Handle submitting is done. */
  useEffect(() => {
    if (isSaveSuccess) {
      setSubmitting(false);
    }
  }, [isSaveSuccess]);

  return (
    <>
      {formStateObject && (
        <SlideForm
          slide={formStateObject}
          headerText={`${headerText}: ${formStateObject?.title}`}
          handleInput={handleInput}
          handleContent={handleContent}
          handleMedia={handleMedia}
          handleSubmit={handleSubmit}
          loadedMedia={loadedMedia}
          isLoading={getSlideIsLoading}
          isSaveSuccess={isSaveSuccess}
          isSaving={submitting || isSaving}
          errors={getSlideError || saveError || false}
        />
      )}
    </>
  );
}

export default SlideEdit;
