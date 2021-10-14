import { React, useState, useEffect } from "react";
import { useParams, Redirect } from "react-router";
import { Form, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { usePostMediaCollectionMutation } from "../../redux/api/api.generated";
import MediaForm from "./media-form";

/**
 * The edit media component.
 *
 * @returns {object}
 * The edit media page.
 */
function MediaCreate() {
  const { t } = useTranslation("common");
  const [formStateObject, setFormStateObject] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [mediaToCreate, setMediaToCreate] = useState([]);
  const headerText = t("media-create.create-media");

  const [
    PostV1MediaCollection,
    { data, isLoading, error: saveError, isSuccess: isSaveSuccess },
  ] = usePostMediaCollectionMutation();

  /**
   * Set state on change in input field
   *
   * @param {object} props
   * The props.
   * @param {object} props.target
   * event target
   */
  function handleInput({ target }) {
    const localFormStateObject = { ...formStateObject };
    localFormStateObject[target.id] = target.value;
    setFormStateObject(localFormStateObject);
  }

  /**
   * Saves multiple pieces of media.
   */
  useEffect(() => {
    if (mediaToCreate.length > 0) {
      setIsSaving(true);
      const media = mediaToCreate.splice(0, 1).shift();
      PostV1MediaCollection({ body: media });
    } else if (isSaveSuccess) {
      window.location.reload(false);
    }
  }, [mediaToCreate.length, isSaveSuccess]);

  /**
   * Handles submit.
   */
  function handleSubmit() {
    let localMediaToCreate = [];
    formStateObject.images.forEach((element) => {
      let formData = new FormData();
      formData.append("file", element.file);
      formData.append("title", element.title);
      formData.append("description", element.description);
      formData.append("license", element.license);
      formData.append("modifiedBy", element.modfiedBy);
      formData.append("createdBy", element.createdBy);
      localMediaToCreate.push(formData);
    });
    setMediaToCreate(localMediaToCreate);
  }

  return (
    <MediaForm
      media={formStateObject}
      headerText={headerText}
      handleInput={handleInput}
      handleSubmit={handleSubmit}
      isLoading={isLoading}
      isSaveSuccess={isSaveSuccess} // todo
      isSaving={isLoading || isSaving || false} // todo
      errors={saveError || false}
    />
  );
}

export default MediaCreate;
