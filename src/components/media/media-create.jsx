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
  const headerText = t("media-create.media-create");

  const [
    PostV1MediaCollection,
    { data, isLoading: isSaving, error: saveError, isSuccess: isSaveSuccess },
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
   * Handles submit.
   */
  function handleSubmit() {
    const saveData = {
      id,
      screenGroupScreenGroupInput: JSON.stringify(formStateObject),
    };
    PutV1ScreenGroup(saveData);
  }
  return (
    <MediaForm
      media={formStateObject}
      headerText={headerText}
      handleInput={handleInput}
      handleSubmit={handleSubmit}
      isLoading={isLoading}
      isSaveSuccess={false} // todo
      isSaving={false} // todo
      errors={loadError || false}
    />
  );
}

export default MediaCreate;
