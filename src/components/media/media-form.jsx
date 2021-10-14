import { React } from "react";
import { useHistory } from "react-router-dom";
import { Button, Spinner } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import Toast from "../util/toast/toast";
import ContentBody from "../util/content-body/content-body";
import ContentFooter from "../util/content-footer/content-footer";
import ImageUploader from "../util/image-uploader/image-uploader";

/**
 * The slide form component.
 *
 * @param {object} props - The props.
 * @param {object} props.group The slide object to modify in the form.
 * @param {Function} props.handleInput Handles form input.
 * @param {Function} props.handleSubmit Handles form submit.
 * @param {boolean} props.isSaving Is the form saving?
 * @param {string} props.headerText Headline text.
 * @param {boolean|null} props.isSaveSuccess Is the save a success?
 * @param {boolean|null} props.isLoading The data is loading.
 * @param {Array} props.errors Array of errors.
 * @returns {object} The slide form.
 */
function MediaForm({
  media,
  handleInput,
  handleSubmit,
  isSaving,
  headerText,
  isSaveSuccess,
  isLoading,
  errors,
}) {
  const { t } = useTranslation("common");
  const history = useHistory();

  return (
    <Form>
      <h1>{headerText}</h1>
      {isLoading && !isSaving && (
        <>
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
            className="m-1"
          />
          {t("media-form.loading")}
        </>
      )}
      {isSaving && (
        <>
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
            className="m-1"
          />
          {t("media-form.saving")}
        </>
      )}
      {!isLoading && (
        <ContentBody>
          <ImageUploader
            errors={errors}
            multipleImages={false} // !!newmedia
            handleImageUpload={handleInput}
            inputImage={media.images}
            name="images"
            invalidText={t("edit-media.media-validation")}
            showLibraryButton={false}
          />
        </ContentBody>
      )}
      <ContentFooter>
        <Button
          variant="secondary"
          type="button"
          id="media_cancel"
          className="m-1"
          onClick={() => history.push("/media/list/")}
        >
          {t("media-form.cancel-button")}
        </Button>
        <Button
          variant="primary"
          onClick={handleSubmit}
          id="save_media"
          className="m-1"
        >
          {t("media-form.save-button")}
        </Button>
        <Button
          variant="secondary"
          id="back_to_list"
          className="m-1"
          onClick={() => history.push("/media/list/")}
        >
          {t("media-form.back-to-list")}
        </Button>
        <Toast show={isSaveSuccess} text={t("media-form.saved")} />
        <Toast show={!!errors} text={t("media-form.error")} />
      </ContentFooter>
    </Form>
  );
}

MediaForm.propTypes = {
  group: PropTypes.objectOf(PropTypes.any).isRequired,
  handleInput: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isSaving: PropTypes.bool.isRequired,
  headerText: PropTypes.string.isRequired,
  isSaveSuccess: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  errors: PropTypes.oneOfType([
    PropTypes.objectOf(PropTypes.any),
    PropTypes.bool,
  ]).isRequired,
};

export default MediaForm;
