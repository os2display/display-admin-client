import { React, useState, useEffect } from "react";
import { useParams, Redirect } from "react-router";
import { Container, Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import getFormErrors from "../util/helpers/form-errors-helper";
import ImageUploader from "../util/image-uploader/image-uploader";

/**
 * The edit media component.
 *
 * @returns {object}
 * The edit media page.
 */
function EditMedia() {
  const { t } = useTranslation("common");
  const [formStateObject, setFormStateObject] = useState({ images: [] });
  const history = useHistory();
  const { id } = useParams();
  const [mediaName, setMediaName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const newMedia = id === "new";
  const [errors, setErrors] = useState([]);
  const requiredFields = ["mediaName", "mediaDescription", "mediaImages"];

  /**
   * Load content from fixture.
   */
  useEffect(() => {
    // @TODO load real content.
    if (!newMedia) {
      fetch(`/fixtures/media/one_media.json`)
        .then((response) => response.json())
        .then((jsonData) => {
          setFormStateObject({
            images: [
              {
                data_url: jsonData.media.url,
                mediaName: jsonData.media.name,
                mediaDescription: jsonData.media.description,
                mediaTags: jsonData.media.tags,
              },
            ],
          });
          setMediaName(jsonData.media.name);
        });
    }
  }, []);

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
   * Handles validations, and goes back to list.
   *
   * @todo make it save.
   * @param {object} e
   * the submit event.
   * @returns {boolean}
   * Boolean indicating whether to submit form.
   */
  function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);
    let returnValue = false;
    const createdErrors = getFormErrors(requiredFields, formStateObject);
    if (createdErrors.length > 0) {
      setErrors(createdErrors);
    } else {
      setSubmitted(true);
      returnValue = true;
    }
    return returnValue;
  }

  return (
    <>
      <Container>
        <Form onSubmit={handleSubmit}>
          {newMedia && <h1>{t("edit-media.upload-new-media")}</h1>}
          {!newMedia && (
            <h1>
              {t("edit-media.edit-media")}: {mediaName}
            </h1>
          )}
          <ImageUploader
            errors={errors}
            multipleImages={!!newMedia}
            handleImageUpload={handleInput}
            inputImage={formStateObject.images}
            name="mediaImages"
            invalidText={t("edit-media.media-validation")}
          />
          {submitted && <Redirect to="/media-list" />}
          <Button
            variant="secondary"
            type="button"
            id="media_cancel"
            onClick={() => history.goBack()}
          >
            {t("edit-media.cancel-button")}
          </Button>
          <Button variant="primary" type="submit" id="save_media">
            {t("edit-media.save-button")}
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default EditMedia;
