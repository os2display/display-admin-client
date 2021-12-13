import { React, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useTranslation } from "react-i18next";
import SideAndTopbarHOC from "../side-and-topbar-hoc/side-and-topbar-hoc";
import {
  useGetV1ScreenGroupsByIdQuery,
  usePutV1ScreenGroupsByIdMutation,
} from "../../redux/api/api.generated";
import {
  displaySuccess,
  displayError,
} from "../util/list/toast-component/display-toast";
import GroupForm from "./group-form";

/**
 * The group edit component.
 *
 * @returns {object} The group edit page.
 */
function GroupEdit() {
  const { t } = useTranslation("common");
  const headerText = t("group-edit.edit-group-header");
  const [formStateObject, setFormStateObject] = useState();
  const [savingGroup, setSavingGroup] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState(
    t("group-edit.loading-messages.loading-group")
  );
  const { id } = useParams();

  const [PutV1ScreenGroup, { error: saveError, isSuccess: isSaveSuccess }] =
    usePutV1ScreenGroupsByIdMutation();

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

  /** If the group is saved, display the success message */
  useEffect(() => {
    if (isSaveSuccess) {
      setSavingGroup(false);
      displaySuccess(t("group-edit.success-messages.saved-group"));
    }
  }, [isSaveSuccess]);

  /** If the group is saved with error, display the error message */
  useEffect(() => {
    if (saveError) {
      displayError(
        t("group-edit.error-messages.save-group-error", {
          error: saveError.error
            ? saveError.error
            : saveError.data["hydra:description"],
        })
      );
      setSavingGroup(false);
    }
  }, [saveError]);

  /** If the group is not loaded, display the error message */
  useEffect(() => {
    if (loadError) {
      displayError(
        t("group-edit.error-messages.load-group-error", {
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
  function handleInput({ target }) {
    const localFormStateObject = { ...formStateObject };
    localFormStateObject[target.id] = target.value;
    setFormStateObject(localFormStateObject);
  }

  /** Handles submit. */
  function handleSubmit() {
    setSavingGroup(true);
    setLoadingMessage(t("group-edit.loading-messages.saving-group"));
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
  }

  return (
    <>
      {formStateObject && (
        <GroupForm
          group={formStateObject}
          headerText={`${headerText}: ${
            formStateObject && formStateObject.title
          }`}
          handleInput={handleInput}
          handleSubmit={handleSubmit}
          isLoading={isLoading || savingGroup}
          loadingMessage={loadingMessage}
        />
      )}
    </>
  );
}

export default SideAndTopbarHOC(GroupEdit);
