import { React, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import ThemeForm from "./theme-form";
import { displaySuccess, displayError } from '../util/list/toast-component/display-toast';
import {
  usePutV1ThemesByIdMutation,
  useGetV1ThemesByIdQuery,
} from "../../redux/api/api.generated";

/**
 * The themes create component.
 *
 * @returns {object} The themes create page.
 */
function ThemeEdit() {
  const { t } = useTranslation("common");
  const headerText = t("theme-edit.edit-theme");
  const [formStateObject, setFormStateObject] = useState();
  const [loadingMessage, setLoadingMessage] = useState(t("theme-edit.loading-messages.loading-theme"));
  const { id } = useParams();

  const [
    PutV1ThemesById,
    { isLoading: isSaving, error: saveError, isSuccess: isSaveSuccess },
  ] = usePutV1ThemesByIdMutation();

  const {
    data: themeData,
    error: loadError,
    isLoading,
  } = useGetV1ThemesByIdQuery({ id });

  /** Set loaded data into form state. */
  useEffect(() => {
    if (themeData) {
      setFormStateObject(themeData);
    }
  }, [themeData]);

  /** Set loaded data into form state. */
  useEffect(() => {
    if (loadError) {
      displayError(
        t("theme-edit.error-messages.load-theme-error", {
          error: loadError.error
            ? loadError.error
            : loadError.data["hydra:description"],
          id,
        })
      );
    }
  }, [loadError]);

  useEffect(() => {
    if (isSaveSuccess) {
      displaySuccess(
        t("theme-edit.success-messages.saved-theme")
      );
    }
  }, [isSaveSuccess]);

  useEffect(() => {
    if (saveError) {
      displayError(
        t("theme-edit.error-messages.save-theme-error", {
          error: saveError.error
            ? saveError.error
            : saveError.data["hydra:description"],
          id,
        })
      );
    }
  }, [saveError]);

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

  /** Handles submit. */
  function handleSubmit() {
    setLoadingMessage(t("theme-edit.loading-messages.saving-theme"))
    const saveData = {
      title: formStateObject.title,
      description: formStateObject.description,
      modifiedBy: formStateObject.modifiedBy,
      createdBy: formStateObject.createdBy,
      css: formStateObject.css,
    };
    PutV1ThemesById({ themeThemeInput: JSON.stringify(saveData), id });
  }

  return (
    <>
      {formStateObject && (
        <ThemeForm
          theme={formStateObject}
          headerText={`${headerText}: ${formStateObject?.title}`}
          handleInput={handleInput}
          handleSubmit={handleSubmit}
          isLoading={isLoading || isSaving}
          loadingMessage={
            loadingMessage
          }
        />
      )}
    </>
  );
}

export default ThemeEdit;
