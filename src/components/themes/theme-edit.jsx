import { React, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams, useNavigate } from "react-router-dom";
import ThemeForm from "./theme-form";
import {
  displaySuccess,
  displayError,
} from "../util/list/toast-component/display-toast";

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
  const { t } = useTranslation("common", { keyPrefix: "theme-edit" });
  const navigate = useNavigate();
  const headerText = t("edit-theme");
  const [formStateObject, setFormStateObject] = useState();
  const [loadingMessage, setLoadingMessage] = useState(
    t("loading-messages.loading-theme")
  );
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

  /** If the theme is not loaded, display the error message */
  useEffect(() => {
    if (loadError) {
      displayError(t("error-messages.load-theme-error"), loadError);
    }
  }, [loadError]);

  /** If the theme is saved, display the success message */
  useEffect(() => {
    if (isSaveSuccess) {
      displaySuccess(t("success-messages.saved-theme"));
      navigate("/themes/list");
    }
  }, [isSaveSuccess]);

  /** If the theme is saved with error, display the error message */
  useEffect(() => {
    if (saveError) {
      displayError(t("error-messages.save-theme-error"), saveError);
    }
  }, [saveError]);

  /**
   * Set state on change in input field
   *
   * @param {object} props - The props.
   * @param {object} props.target - Event target.
   */
  const handleInput = ({ target }) => {
    const localFormStateObject = { ...formStateObject };
    localFormStateObject[target.id] = target.value;
    setFormStateObject(localFormStateObject);
  };

  /** Handles submit. */
  const handleSubmit = () => {
    setLoadingMessage(t("loading-messages.saving-theme"));
    const saveData = {
      title: formStateObject.title,
      description: formStateObject.description,
      modifiedBy: formStateObject.modifiedBy,
      createdBy: formStateObject.createdBy,
      css: formStateObject.css,
    };
    PutV1ThemesById({ themeThemeInput: JSON.stringify(saveData), id });
  };

  return (
    <>
      {formStateObject && (
        <ThemeForm
          theme={formStateObject}
          headerText={`${headerText}: ${formStateObject?.title}`}
          handleInput={handleInput}
          handleSubmit={handleSubmit}
          isLoading={isLoading || isSaving}
          loadingMessage={loadingMessage}
        />
      )}
    </>
  );
}

export default ThemeEdit;
