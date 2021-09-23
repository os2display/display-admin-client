import { React, useState, useEffect } from "react";
import { ulid } from "ulid";
import { useHistory } from "react-router-dom";
import * as dayjs from "dayjs";
import { useTranslation } from "react-i18next";
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
  const headerText = t("edit-slide.create-new-slide");
  const creationTime = dayjs().toISOString();
  const [newUlid] = useState(ulid());
  const [formStateObject, setFormStateObject] = useState({
    id: newUlid,
    "@context": "/contexts/Slide",
    "@id": `/v1/slide/${newUlid}`,
    title: "",
    description: "",
    modified: creationTime,
    created: creationTime,
    modifiedBy: "TODO",
    createdBy: "TODO",
    published: {
      from: creationTime,
      to: null,
    },
  });

  const [
    PostV1Slide,
    { isLoading: isSaving, error: saveError, isSuccess: isSaveSuccess },
  ] = usePostV1SlidesMutation();

  /**
   * Redirect to slide edit.
   */
  useEffect(() => {
    if (isSaveSuccess) {
      history.push(`/slide/edit/${newUlid}`);
    }
  }, [isSaveSuccess]);

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
    PostV1Slide({ body: formStateObject });
  }

  return (
    <SlideForm
      slide={formStateObject}
      headerText={headerText}
      handleInput={handleInput}
      handleSubmit={handleSubmit}
      isLoading={false}
      isSaveSuccess={isSaveSuccess}
      isSaving={isSaving}
      errors={[saveError]}
    />
  );
}

export default SlideCreate;
