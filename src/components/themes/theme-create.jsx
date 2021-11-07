import { React, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import ThemeForm from "./theme-form";
import { usePostV1ThemesMutation } from "../../redux/api/api.generated";
import idFromUrl from "../util/helpers/id-from-url";

/**
 * The themes create component.
 *
 * @returns {object} The themes create page.
 */
function ThemeCreate() {
  const { t } = useTranslation("common");
  const history = useHistory();
  const headerText = t("theme-create.create-new-theme");
  const [formStateObject, setFormStateObject] = useState({
    title: "",
    description: "",
    modifiedBy: "",
    createdBy: "",
    css: "",
  });

  const [
    postV1Themes,
    { data, isLoading: isSaving, error: saveError, isSuccess: isSaveSuccess },
  ] = usePostV1ThemesMutation();

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

  /** When the theme is saved, it redirects to edit theme. */
  useEffect(() => {
    if (isSaveSuccess && data) {
      history.push(`/themes/edit/${idFromUrl(data["@id"])}`);
    }
  }, [isSaveSuccess]);

  /** Handles submit. */
  function handleSubmit() {
    const saveData = {
      title: formStateObject.title,
      description: formStateObject.description,
      modifiedBy: formStateObject.modifiedBy,
      createdBy: formStateObject.createdBy,
      css: formStateObject.css,
    };
    postV1Themes({ themeThemeInput: JSON.stringify(saveData) });
  }

  return (
    <ThemeForm
      theme={formStateObject}
      headerText={`${headerText}: ${formStateObject?.title}`}
      handleInput={handleInput}
      handleSubmit={handleSubmit}
      isLoading={false}
      isSaveSuccess={isSaveSuccess}
      isSaving={isSaving}
      errors={saveError || false}
    />
  );
}

export default ThemeCreate;
