import { React, useState } from "react";
import { ulid } from "ulid";
import { Redirect } from "react-router";
import * as dayjs from "dayjs";
import { usePostV1ScreensMutation } from "../../redux/api/api.generated";
import ScreenForm from "./screen-form";
import { useTranslation } from "react-i18next";

/**
 * The screen edit component.
 *
 * @returns {object} The screen edit page.
 */
function ScreenCreate() {
  const { t } = useTranslation("common");
  const headerText = t("edit-screen.create-new-screen");

  const creationTime = dayjs().toISOString();
  const newUlid = ulid();
  const [formStateObject, setFormStateObject] = useState({
    id: newUlid,
    "@context": "/contexts/Screen",
    "@id": "/v1/screens/" + newUlid,
    title: "",
    description: "",
    modified: creationTime,
    created: creationTime,
    modifiedBy: "TODO",
    createdBy: "TODO",
    published: {
      from: creationTime,
      to: null,
    },
  });

  const [
    PostV1Screen,
    { isLoading: isSaving, error: saveError, isSuccess: isSaveSuccess },
  ] = usePostV1ScreensMutation();

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
   *
   * @param {Event} event The submit event.
   */
  function handleSubmit(event) {
    PostV1Screen({ body: formStateObject });
  }

  return (
    <ScreenForm
      screen={formStateObject}
      headerText={headerText}
      handleInput={handleInput}
      handleSubmit={handleSubmit}
      isLoading={false}
      isSaveSuccess={isSaveSuccess}
      isSaving={isSaving}
      errors={[saveError]}
    />
  );
}

export default ScreenCreate;
