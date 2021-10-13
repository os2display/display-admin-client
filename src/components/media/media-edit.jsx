import { React, useState, useEffect } from "react";
import { useParams, Redirect } from "react-router";
import { Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ContentHeader from "../util/content-header/content-header";
import ContentBody from "../util/content-body/content-body";
import ContentFooter from "../util/content-footer/content-footer";
import getFormErrors from "../util/helpers/form-errors-helper";
import ImageUploader from "../util/image-uploader/image-uploader";
import { useGetV1MediaByIdQuery } from "../../redux/api/api.generated";

/**
 * The edit media component.
 *
 * @returns {object}
 * The edit media page.
 */
function MediaEdit() {
  const { t } = useTranslation("common");
  const [formStateObject, setFormStateObject] = useState({ images: [] });
  const history = useHistory();
  const { id } = useParams();
  const [mediaName, setMediaName] = useState("");
  const [media, setMedia] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState([]);
  const requiredFields = ["mediaName", "mediaDescription", "mediaImages"];
  const { data, error: loadError, isLoading } = useGetV1MediaByIdQuery({ id });

  /**
   * Set loaded data into form state.
   */
  useEffect(() => {
    if (data) {
      let dataCopy = { ...data };
      dataCopy.url = data.assets.uri;
      setFormStateObject({ images: [dataCopy] });
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
  function handleSubmit() {
    const saveData = {
      id,
      screenGroupScreenGroupInput: JSON.stringify(formStateObject),
    };
    PutV1ScreenGroup(saveData);
  }
  return (
    <>
      <Form>
        <ContentHeader title={t("edit-media.edit-media")} />
        <ContentBody>
          <ImageUploader
            errors={errors}
            multipleImages={false} // !!newmedia
            handleImageUpload={handleInput}
            inputImage={formStateObject.images}
            name="images"
            invalidText={t("edit-media.media-validation")}
            showLibraryButton={false}
          />
        </ContentBody>
        <ContentFooter>
          <Button
            variant="secondary"
            type="button"
            id="media_cancel"
            onClick={() => history.goBack()}
          >
            {t("edit-media.cancel-button")}
          </Button>
          <Button variant="primary" onClick={handleSubmit} id="save_media">
            {t("edit-media.save-button")}
          </Button>
        </ContentFooter>
      </Form>
    </>
  );
}

export default MediaEdit;
