import { React, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { usePostV2UserActivationCodesMutation } from "../../redux/api/api.generated.ts";
import ActivationCodeForm from "./activation-code-form";
import {
  displaySuccess,
  displayError,
} from "../util/list/toast-component/display-toast";

/**
 * The user create component.
 *
 * @returns {object} The user create page.
 */
function ActivationCodeCreate() {
  const { t } = useTranslation("common", {
    keyPrefix: "activation-code-create",
  });
  const navigate = useNavigate();
  const headerText = t("create-new-activation-code-header");
  const [formStateObject, setFormStateObject] = useState({
    displayName: "",
    role: "",
  });

  const [
    PostV2UserActivationCode,
    { error: saveError, isLoading: isSaving, isSuccess: isSaveSuccess },
  ] = usePostV2UserActivationCodesMutation();

  /** Handle submitting is done. */
  useEffect(() => {
    if (isSaveSuccess) {
      displaySuccess(t("success-messages.saved-activation-code"));
      navigate("/activation/list");
    }
  }, [isSaveSuccess]);

  /** If the user is saved with error, display the error message */
  useEffect(() => {
    if (saveError) {
      displayError(t("error-messages.save-activation-code-error"), saveError);
    }
  }, [saveError]);

  /**
   * Set state on change in input field
   *
   * @param {object} props The props.
   * @param {object} props.target Event target.
   */
  const handleInput = ({ target }) => {
    const localFormStateObject = { ...formStateObject };
    localFormStateObject[target.id] = target.value;
    setFormStateObject(localFormStateObject);
  };

  /** Handles submit. */
  const handleSubmit = () => {
    const saveData = {
      displayName: formStateObject.displayName,
      roles: [formStateObject.role],
    };

    PostV2UserActivationCode({
      userActivationCodeUserActivationCodeInput: JSON.stringify(saveData),
    });
  };

  return (
    <ActivationCodeForm
      activationCode={formStateObject}
      headerText={headerText}
      handleInput={handleInput}
      handleSubmit={handleSubmit}
      isLoading={isSaving}
      loadingMessage={t("loading-messages.saving-activation-code")}
    />
  );
}

export default ActivationCodeCreate;
