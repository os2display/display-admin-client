import { React, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useTranslation } from "react-i18next";
import set from "lodash.set";
import {
  useGetV1SlidesByIdQuery, usePostMediaCollectionMutation,
  usePutV1SlidesByIdMutation
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
  const { id } = useParams();
  const [mediaFields, setMediaFields] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [submittingMedia, setSubmittingMedia] = useState([]);
  const [loadedMedia, setLoadedMedia] = useState({});

  const [
    PutV1Slides,
    { isLoading: isSaving, error: saveError, isSuccess: isSaveSuccess },
  ] = usePutV1SlidesByIdMutation();

  const { data, error: loadError, isLoading } = useGetV1SlidesByIdQuery({ id });

  const [
    PostV1MediaCollection,
    { data: mediaData, isLoading: mediaIsLoading, error: saveMediaError, isSuccess: isSaveMediaSuccess },
  ] = usePostMediaCollectionMutation();

  /**
   * Set loaded data into form state.
   */
  useEffect(() => {
    if (data) {
      const localFormStateObject = JSON.parse(JSON.stringify(data));

      // Make sure content is an object.
      if (localFormStateObject.content instanceof Array) {
        localFormStateObject.content = {};
      }

      setFormStateObject(localFormStateObject);
    }
  }, [data]);

  /**
   * Set state on change in input field
   *
   * @param {object} props - The props.
   * @param {object} props.target - Event target.
   */
  function handleInput({ target }) {
    let localFormStateObject = { ...formStateObject };
    set(localFormStateObject, target.id, target.value);
    setFormStateObject(localFormStateObject);
  }

  /**
   * Update content field for id/value.
   * @param target
   */
  function handleContent({ target }) {
    let localFormStateObject = { ...formStateObject };
    set(localFormStateObject.content, target.id, target.value);
    setFormStateObject(localFormStateObject);
  }

  /**
   * Handle change to a media.
   *
   * @param fieldName
   */
  function handleMedia(fieldName) {
    setMediaFields([ ...new Set([ ...mediaFields, fieldName])]);
  }

  /**
   * Handles submit.
   */
  function handleSubmit() {
    console.log('handleSubmit');
    console.log(JSON.parse(JSON.stringify(formStateObject)));
    console.log(JSON.parse(JSON.stringify(mediaFields)));

    const newSubmittingMedia = [];

    // Setup submittingMedia list.
    mediaFields.forEach((fieldName) => {
      if (Object.prototype.hasOwnProperty.call(formStateObject.content, fieldName)) {
        const contentField = formStateObject.content[fieldName];
        contentField.forEach((element) => {
          const formData = new FormData();
          formData.append("file", element.file);
          formData.append("title", element.title);
          formData.append("description", element.description);
          formData.append("license", element.license);
          // @TODO: Should these be optional in the API?
          formData.append("modifiedBy", '');
          formData.append("createdBy", '');
          newSubmittingMedia.push(formData);
        });
      }
    });

    // Trigger submitting hooks.
    setSubmitting(true);
    setSubmittingMedia(newSubmittingMedia);
  }

  useEffect(() => {
    if (submitting) {
      if (submittingMedia.length > 0) {
        const media = submittingMedia[0];

        // Submit media.
        PostV1MediaCollection({ body: media });
      } else {
        console.log('All media is submitted.');

        // All media have been submitted. Submit slide.
        const saveData = {
          id,
          slideSlideInput: JSON.stringify({
            title: formStateObject.title,
            description: formStateObject.description,
            templateInfo: formStateObject.templateInfo,
            duration: formStateObject?.content?.duration ? parseInt(formStateObject.content.duration) : null,
            content: formStateObject.content,
          }),
        };

        PutV1Slides(saveData);
      }
    }
  }, [submittingMedia.length]);

  useEffect(() => {
    console.log('useEffect - mediaData');
//    console.log(isSaveMediaSuccess, saveMediaError, mediaData);

    if (submitting) {
      if (isSaveMediaSuccess) {
        console.log('isSaveMediaSuccess');

        const newMediaFields = [...mediaFields];
        const firstMediaField = newMediaFields.shift();
        setMediaFields(newMediaFields);

        const newFormStateObject = { ...formStateObject };
        newFormStateObject.media.push(mediaData['@id']);
        newFormStateObject.content[firstMediaField] = mediaData['@id'];
        setFormStateObject(newFormStateObject);

        const newLoadedMedia = { ...loadedMedia };
        newLoadedMedia[mediaData['@id']] = mediaData;
        setLoadedMedia(newLoadedMedia);

        // Move to next media to upload.
        const newList = submittingMedia.slice(1);
        setSubmittingMedia(newList);
      } else if (saveMediaError) {
        console.log('saveMediaError');
      }
    }
  }, [isSaveMediaSuccess]);

  /*
  useEffect(() => {
    if (formStateObject) {
      console.log('formStateObject', JSON.parse(JSON.stringify(formStateObject)));
    }
    if (loadedMedia) {
      console.log('loadedMedia', JSON.parse(JSON.stringify(loadedMedia)));
    }
  }, [formStateObject, loadedMedia]);
   */

  useEffect(() => {
    console.log("isSaveSuccess", isSaveSuccess);

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
          isLoading={isLoading}
          isSaveSuccess={isSaveSuccess}
          isSaving={submitting || isSaving}
          errors={loadError || saveError || false}
        />
      )}
    </>
  );
}

export default SlideEdit;
