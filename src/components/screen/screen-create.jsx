import { React, useState, useEffect } from "react";
import { ulid } from "ulid";
import { useHistory } from "react-router-dom";
import * as dayjs from "dayjs";
import { usePostV1ScreensMutation } from "../../redux/api/api.generated";
import ScreenForm from "./screen-form";
import { useTranslation } from "react-i18next";

/**
 * The screen create component.
 *
 * @returns {object} The screen create page.
 */
function ScreenCreate() {
  const { t } = useTranslation("common");
  const headerText = t("edit-screen.create-new-screen");
  let history = useHistory();
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
   * Redirect to screen edit.
   */
  useEffect(() => {
    debugger;
    saveError;
    if (isSaveSuccess) {
      history.push(`/screen/edit/${newUlid}`);
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
