import { React, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import set from "lodash.set";
import idFromUrl from "../util/helpers/id-from-url";
import { usePostV1SlidesMutation } from "../../redux/api/api.generated";
import SlideForm from "./slide-form";

/**
 * The slide edit component.
 *
 * @returns {object} The slide edit page.
 */
function SlideCreate() {
  const { t } = useTranslation("common");
  const history = useHistory();
  const headerText = t("slide-create.create-slide-header");
  const [formStateObject, setFormStateObject] = useState({
    title: "",
    description: "",
    duration: 10,
    createdBy: "sdf",
    modifiedBy: "sdf",
    content: {
      text: "",
    },
  });

  const [
    PostV1Slide,
    {
      data,
      isLoading: isSavingSlide,
      error: saveError,
      isSuccess: isSaveSuccess,
    },
  ] = usePostV1SlidesMutation();

  /** When the slide is saved, it redirects to edit slide. */
  useEffect(() => {
    if (isSaveSuccess) {
      history.push(`/slide/edit/${idFromUrl(data["@id"])}`);
    }
  }, [isSaveSuccess]);

  /**
   * Set state on change in input field
   *
   * @param {object} props - The props.
   * @param {object} props.target - Event target.
   */
  function handleInput({ target }) {
    let localFormStateObject = { ...formStateObject };
    localFormStateObject = JSON.parse(JSON.stringify(localFormStateObject));
    set(localFormStateObject, target.id, target.value);
    setFormStateObject(localFormStateObject);
  }

  /** Handles submit. */
  function handleSubmit() {
    const saveData = {
      slideSlideInput: JSON.stringify({
        title: formStateObject.title,
        description: formStateObject.description,
        modifiedBy: formStateObject.modifiedBy,
        published: {
          from: "2021-11-17T06:15:04Z", // Todo
          to: "2021-04-29T09:54:10Z", // Todo
        },
        createdBy: formStateObject.createdBy,
        templateInfo: {
          "@id": formStateObject.templateInfo,
          options: { fade: false },
        },
        duration: 38823, // @TODO:
        content: { text: formStateObject.content.text },
      }),
    };
    PostV1Slide(saveData);
  }

  return (
    <SlideForm
      slide={formStateObject}
      headerText={headerText}
      handleInput={handleInput}
      handleSubmit={handleSubmit}
      isLoading={false}
      isSaveSuccess={isSaveSuccess}
      isSaving={isSavingSlide}
      errors={saveError || false}
    />
  );
}

export default SlideCreate;
