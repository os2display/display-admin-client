import { React, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useTranslation } from "react-i18next";
import {
  useGetV1ScreenGroupsByIdQuery,
  usePutV1ScreenGroupsByIdMutation,
} from "../../redux/api/api.generated";
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
  useState([]);
  const { id } = useParams();

  const [
    PutV1ScreenGroup,
    { isLoading: isSaving, error: saveError, isSuccess: isSaveSuccess },
  ] = usePutV1ScreenGroupsByIdMutation();

  const {
    data,
    error: loadError,
    isLoading,
  } = useGetV1ScreenGroupsByIdQuery({ id });

  /**
   * Set loaded data into form state.
   */
  useEffect(() => {
    if (data) {
      setFormStateObject(data);
    }
  }, [data]);

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
    let saveData = {
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
          isLoading={isLoading}
          isSaveSuccess={isSaveSuccess}
          isSaving={isSaving}
          errors={loadError || saveError || false}
        />
      )}
    </>
  );
}

export default GroupEdit;
