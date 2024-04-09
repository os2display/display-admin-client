import { React, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { usePostMediaCollectionMutation } from "../../redux/api/api.generated.ts";
import MediaForm from "./media-form";
import {
  displayError,
  displaySuccess,
} from "../util/list/toast-component/display-toast";

/**
 * The create media component.
 *
 * @returns {object} The create media page.
 */
function MediaCreate() {
  const { t } = useTranslation("common", { keyPrefix: "media-create" });
  const [formStateObject, setFormStateObject] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [mediaToCreate, setMediaToCreate] = useState([]);
  const headerText = t("create-media");

  const [
    PostV2MediaCollection,
    { isLoading: isSavingMedia, error: saveError, isSuccess: isSaveSuccess },
  ] = usePostMediaCollectionMutation();

  /**
   * Set state on change in input field
   *
   * @param {object} props The props.
   * @param {object} props.target Event target
   */
  const handleInput = ({ target }) => {
    const localFormStateObject = { ...formStateObject };
    localFormStateObject[target.id] = target.value;
    setFormStateObject(localFormStateObject);
  };

  /** Saves multiple pieces of media. */
  useEffect(() => {
    if (mediaToCreate.length > 0) {
      setIsSaving(true);
      const media = mediaToCreate.splice(0, 1).shift();
      PostV2MediaCollection({ body: media });
    }
  }, [mediaToCreate.length, isSaveSuccess]);

  /** If the media is saved with error, display the error message */
  useEffect(() => {
    if (saveError) {
      displayError(t("error-messages.save-media-error"), saveError);
      setIsSaving(false);
    }
  }, [saveError]);

  /** If the image is saved, display the success message, and remove image from ui */
  useEffect(() => {
    if (isSaveSuccess) {
      displaySuccess(t("success-messages.saved-media"));
      setIsSaving(false);
      const localFormStateObject = JSON.parse(JSON.stringify(formStateObject));
      localFormStateObject.images = [];
      setFormStateObject(localFormStateObject);
    }
  }, [isSaveSuccess]);

  /** Handles submit. */
  const handleSubmit = () => {
    const localMediaToCreate = [];
    formStateObject.images.forEach((element) => {
      setLoadingMessage(
        t("loading-messages.saving-media", {
          title: element.title || t("unamed"),
        })
      );
      const formData = new FormData();
      formData.append("file", element.file);
      formData.append("title", element.title);
      formData.append("description", element.description);
      formData.append("license", element.license);
      formData.append("modifiedBy", element.modfiedBy);
      formData.append("createdBy", element.createdBy);
      localMediaToCreate.push(formData);
    });

    setMediaToCreate(localMediaToCreate);
  };

  return (
    <MediaForm
      media={formStateObject}
      headerText={headerText}
      handleInput={handleInput}
      handleSubmit={handleSubmit}
      isLoading={isSavingMedia || isSaving}
      loadingMessage={loadingMessage}
      isSaveSuccess={isSaveSuccess}
      errors={saveError || false}
    />
  );
}

export default MediaCreate;
