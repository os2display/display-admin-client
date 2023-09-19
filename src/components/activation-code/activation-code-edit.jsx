import { React, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  useGetV1ScreenGroupsByIdQuery,
  usePutV1ScreenGroupsByIdMutation,
} from "../../redux/api/api.generated";
import {
  displaySuccess,
  displayError,
} from "../util/list/toast-component/display-toast";
import ActivationCodeForm from "./activation-code-form";

/**
 * The user edit component.
 *
 * @returns {object} The user edit page.
 */
function ActivationCodeEdit() {
  const { t } = useTranslation("common", { keyPrefix: "user-edit" });
  const navigate = useNavigate();
  const headerText = t("edit-user-header");
  const [formStateObject, setFormStateObject] = useState();
  const [savingUser, setSavingUser] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState(
    t("loading-messages.loading-user")
  );
  const { id } = useParams();

  // Todo change put from group to user
  const [PutV1ScreenGroup, { error: saveError, isSuccess: isSaveSuccess }] =
    usePutV1ScreenGroupsByIdMutation();

  // Todo change get from group to user
  const {
    data,
    error: loadError,
    isLoading,
  } = useGetV1ScreenGroupsByIdQuery({ id });

  /** Set loaded data into form state. */
  useEffect(() => {
    if (data) {
      setFormStateObject(data);
    }
  }, [data]);

  /** If the user is saved, display the success message */
  useEffect(() => {
    if (isSaveSuccess) {
      setSavingUser(false);
      displaySuccess(t("success-messages.saved-user"));
      navigate("/user/list");
    }
  }, [isSaveSuccess]);

  /** If the user is saved with error, display the error message */
  useEffect(() => {
    if (saveError) {
      displayError(t("error-messages.save-user-error"), saveError);
      setSavingUser(false);
    }
  }, [saveError]);

  /** If the user is not loaded, display the error message */
  useEffect(() => {
    if (loadError) {
      displayError(
        t("error-messages.load-user-error", {
          error: loadError.error
            ? loadError.error
            : loadError.data["hydra:description"],
          id,
        })
      );
    }
  }, [loadError]);

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
    setSavingUser(true);
    setLoadingMessage(t("loading-messages.saving-user"));
    const saveData = {
      title: formStateObject.title,
      description: formStateObject.description,
      modifiedBy: formStateObject.modifiedBy,
      createdBy: formStateObject.createdBy,
    };
    PutV1ScreenGroup({
      id,
      screenGroupScreenGroupInput: JSON.stringify(saveData),
    });
  };

  return (
    <>
      {formStateObject && (
        <ActivationCodeForm
          user={formStateObject}
          headerText={`${headerText}: ${
            formStateObject && formStateObject.title
          }`}
          handleInput={handleInput}
          handleSubmit={handleSubmit}
          isLoading={isLoading || savingUser}
          loadingMessage={loadingMessage}
        />
      )}
    </>
  );
}

export default ActivationCodeEdit;
