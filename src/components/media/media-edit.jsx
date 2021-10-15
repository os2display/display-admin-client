import { React, useState, useEffect } from "react";
import { useParams } from "react-router";
import { useTranslation } from "react-i18next";
import { useGetV1MediaByIdQuery } from "../../redux/api/api.generated";
import MediaForm from "./media-form";

/**
 * The edit media component.
 *
 * @returns {object}
 * The edit media page.
 */
function MediaEdit() {
  const { t } = useTranslation("common");
  const [formStateObject, setFormStateObject] = useState({ images: [] });
  const [headerText, setHeaderText] = useState(t("media-edit.edit-media"));
  const { id } = useParams();
  const { data, error: loadError, isLoading } = useGetV1MediaByIdQuery({ id });

  /**
   * Set loaded data into form state.
   */
  useEffect(() => {
    if (data) {
      const dataCopy = { ...data };
      dataCopy.url = data.assets.uri;
      setFormStateObject({ images: [dataCopy] });
      setHeaderText(`${headerText}: ${dataCopy.title}`);
    }
  }, [data]);

  /**
   * Set state on change in input field
   *
   * @param {object} props
   * The props.
   * @param {object} props.target
   * event target
   */
  function handleInput({ target }) {
    const localFormStateObject = { ...formStateObject };
    localFormStateObject[target.id] = target.value;
    setFormStateObject(localFormStateObject);
  }

  /**
   * Handles submit.
   */
  function handleSubmit() {}
  return (
    <>
      {formStateObject && (
        <MediaForm
          media={formStateObject}
          headerText={headerText}
          handleInput={handleInput}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
          isSaveSuccess={false} // todo
          isSaving={false} // todo
          errors={loadError || false}
        />
      )}
    </>
  );
}

export default MediaEdit;
