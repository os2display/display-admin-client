import { React, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { usePostV1ScreenGroupsMutation } from "../../redux/api/api.generated";
import UserForm from "./user-form";
import {
  displaySuccess,
  displayError,
} from "../util/list/toast-component/display-toast";

/**
 * The user create component.
 *
 * @returns {object} The user create page.
 */
function UserCreate() {
  const { t } = useTranslation("common", { keyPrefix: "user-create" });
  const navigate = useNavigate();
  const headerText = t("create-new-user-header");
  const [formStateObject, setFormStateObject] = useState({
    title: "",
    description: "",
    createdBy: "",
    modifiedBy: "",
  });

  // Todo change post from group to user
  const [
    PostV1ScreenGroups,
    { error: saveError, isLoading: isSaving, isSuccess: isSaveSuccess },
  ] = usePostV1ScreenGroupsMutation();

  /** Handle submitting is done. */
  useEffect(() => {
    if (isSaveSuccess) {
      displaySuccess(t("success-messages.saved-user"));
      navigate("/users/list");
    }
  }, [isSaveSuccess]);

  /** If the user is saved with error, display the error message */
  useEffect(() => {
    if (saveError) {
      displayError(t("error-messages.save-user-error"), saveError);
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
      title: formStateObject.title,
      description: formStateObject.description,
      modifiedBy: formStateObject.modifiedBy,
      createdBy: formStateObject.createdBy,
    };

    PostV1ScreenGroups({
      screenGroupScreenGroupInput: JSON.stringify(saveData),
    });
  };

  return (
    <UserForm
      user={formStateObject}
      headerText={headerText}
      handleInput={handleInput}
      handleSubmit={handleSubmit}
      isLoading={isSaving}
      loadingMessage={t("loading-messages.saving-user")}
    />
  );
}

export default UserCreate;
