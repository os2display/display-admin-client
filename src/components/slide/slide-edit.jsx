import { React, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useTranslation } from "react-i18next";
import {
  useGetV1SlidesByIdQuery,
  usePutV1SlidesByIdMutation,
} from "../../redux/api/api.generated";
import SlideForm from "./slide-form";

/**
 * The slide edit component.
 *
 * @returns {object} The slide edit page.
 */
function SlideEdit() {
  const { t } = useTranslation("common");
  const headerText = t("edit-slide.edit-slide");
  const [formStateObject, setFormStateObject] = useState({});
  const { id } = useParams();

  const [
    PutV1Slides,
    { isLoading: isSaving, error: saveError, isSuccess: isSaveSuccess },
  ] = usePutV1SlidesByIdMutation();

  const { data, error: loadError, isLoading } = useGetV1SlidesByIdQuery({ id });

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
    const saveData = { id, body: formStateObject };
    PutV1Slides(saveData);
  }

  return (
    <SlideForm
      slide={formStateObject}
      headerText={`${headerText}: ${formStateObject && formStateObject.title}`}
      handleInput={handleInput}
      handleSubmit={handleSubmit}
      isLoading={isLoading}
      isSaveSuccess={isSaveSuccess}
      isSaving={isSaving}
      errors={[loadError, saveError]}
    />
  );
}

export default SlideEdit;
