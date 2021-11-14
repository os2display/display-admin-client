import { React } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import FormLoading from "../util/loading-component/form-loading";
import ContentBody from "../util/content-body/content-body";
import ContentFooter from "../util/content-footer/content-footer";
import ImageUploader from "../util/image-uploader/image-uploader";

/**
 * The media form component.
 *
 * @param {object} props - The props.
 * @param {object} props.media The media object to modify in the form.
 * @param {Function} props.handleInput Handles form input.
 * @param {Function} props.handleSubmit Handles form submit.
 * @param {string} props.headerText Headline text.
 * @param {Array} props.errors Array of errors.
 * @param {boolean} props.isLoading Indicator of whether the form is loading
 * @param {string} props.loadingMessage The loading message for the spinner
 * @returns {object} The slide form.
 */
function MediaForm({
  media,
  handleInput,
  handleSubmit,
  headerText,
  errors,
  isLoading,
  loadingMessage,
}) {
  const { t } = useTranslation("common");
  const history = useHistory();

  return (
    <>
      <Form>
        <FormLoading isLoading={isLoading} loadingMessage={loadingMessage} />
        <h1>{headerText}</h1>
        <ContentBody>
          <ImageUploader
            errors={errors}
            multipleImages={false} // @TODO: !!newmedia
            handleImageUpload={handleInput}
            inputImage={media.images}
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
        </ContentFooter>
      </Form>
    </>
  );
}

MediaForm.defaultProps = {
  isLoading: false,
  loadingMessage: "",
};

MediaForm.propTypes = {
  media: PropTypes.objectOf(PropTypes.any).isRequired,
  handleInput: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  headerText: PropTypes.string.isRequired,
  errors: PropTypes.oneOfType([
    PropTypes.objectOf(PropTypes.any),
    PropTypes.bool,
  ]).isRequired,
  isLoading: PropTypes.bool,
  loadingMessage: PropTypes.string,
};

export default MediaForm;
