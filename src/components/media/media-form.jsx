import { React } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import LoadingComponent from "../util/loading-component/loading-component";
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
  isLoading = false,
  loadingMessage = "",
}) {
  const { t } = useTranslation("common");
  const navigate = useNavigate();

  return (
    <>
      <Form>
        <LoadingComponent
          isLoading={isLoading}
          loadingMessage={loadingMessage}
        />
        <h1>{headerText}</h1>
        <ContentBody>
          <ImageUploader
            errors={errors}
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
            className="margin-right-button"
            onClick={() => navigate("/media/list/")}
          >
            {t("media-form.cancel-button")}
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            id="save_media"
            className="margin-right-button"
          >
            {t("media-form.save-button")}
          </Button>
          <Button
            variant="secondary"
            id="back_to_list"
            className="margin-right-button"
            onClick={() => navigate("/media/list")}
          >
            {t("media-form.back-to-list")}
          </Button>
        </ContentFooter>
      </Form>
    </>
  );
}

MediaForm.propTypes = {
  media: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string,
    })
  ).isRequired,
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
