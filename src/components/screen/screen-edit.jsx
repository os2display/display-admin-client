import { React, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useTranslation } from "react-i18next";
import {
  useGetV1ScreensByIdQuery,
  usePutV1ScreensByIdMutation,
} from "../../redux/api/api.generated";
import ScreenForm from "./screen-form";

/**
 * The screen edit component.
 *
 * @returns {object} The screen edit page.
 */
function ScreenEdit() {
  const { t } = useTranslation("common");
  const headerText = t("edit-screen.edit-screen");
  const [formStateObject, setFormStateObject] = useState({});
  const { id } = useParams();

  const [
    PutV1Screens,
    { isLoading: isSaving, error: saveError, isSuccess: isSaveSuccess },
  ] = usePutV1ScreensByIdMutation();

  const {
    data,
    error: loadError,
    isLoading: isLoadingScreen,
  } = useGetV1ScreensByIdQuery({ id });

  /**
   * Set loaded data into form state.
   */
  useEffect(() => {
    if (data) {
      setFormStateObject(data);
      console.log(data);
    }
  }, [data]);

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

  /**
   * Handles submit.
   */
  function handleSubmit() {
    const saveData = { id, body: JSON.stringify(formStateObject) };
    PutV1Screens(saveData);
  }

  return (
    <ScreenForm
      screen={formStateObject}
      headerText={headerText}
      handleInput={handleInput}
      handleSubmit={handleSubmit}
      isLoading={isLoadingScreen}
      isSaveSuccess={isSaveSuccess}
      isSaving={isSaving}
      errors={saveError || loadError}
    />
  );
}

export default ScreenEdit;
