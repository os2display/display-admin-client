import { React } from "react";
import { Button, FormLabel } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import LoadingComponent from "../util/loading-component/loading-component";
import FormInputArea from "../util/forms/form-input-area";
import ContentBody from "../util/content-body/content-body";
import ContentFooter from "../util/content-footer/content-footer";
import FormInput from "../util/forms/form-input";
import ImageUploader from "../util/image-uploader/image-uploader";

/**
 * The feed-source form component.
 *
 * @param {object} props - The props.
 * @param {object} props.feed-source The feed-source object to modify in the form.
 * @param {Function} props.handleInput Handles form input.
 * @param {Function} props.handleSubmit Handles form submit.
 * @param {string} props.headerText Headline text.
 * @param {boolean} props.isLoading Indicator of whether the form is loading
 * @param {string} props.loadingMessage The loading message for the spinner
 * @returns {object} The feed-source form.
 */
function FeedSourceForm({
  handleInput,
  handleSubmit,
  headerText,
  isLoading = false,
  loadingMessage = "",
  feedSource = null,
}) {
  const { t } = useTranslation("common", { keyPrefix: "feed-source-form" });
  const navigate = useNavigate();

  return (
    <>
      <Form>
        <LoadingComponent
          isLoading={isLoading}
          loadingMessage={loadingMessage}
        />
        <h1 id="feed-sourceTitle">{headerText}</h1>
        <ContentBody>
          <FormInput
            name="title"
            type="text"
            label={t("feed-source-name-label")}
            value={feedSource.title}
            onChange={handleInput}
          />
          <FormInputArea
            name="description"
            type="text"
            label={t("feed-source-description-label")}
            value={feedSource.description}
            onChange={handleInput}
          />
        </ContentBody>
        <ContentBody>
          <h2 className="h4">{t("css-header")}</h2>
          <FormInputArea
            name="cssStyles"
            type="text"
            label={t("feed-source-css-label")}
            value={feedSource.cssStyles}
            onChange={handleInput}
          />
          <FormLabel htmlFor="logo" className="mt-5">
            {t("logo-title")}
          </FormLabel>
          <ImageUploader
            multipleImages={false}
            handleImageUpload={handleInput}
            inputImage={feedSource.logo}
            name="logo"
            showLibraryButton
          />
        </ContentBody>
        <ContentFooter>
          <Button
            variant="secondary"
            type="button"
            id="cancel_feed-source"
            onClick={() => navigate("/feed-sources/list")}
            size="lg"
            className="margin-right-button"
          >
            {t("cancel-button")}
          </Button>
          <Button
            variant="primary"
            type="button"
            onClick={handleSubmit}
            id="save_feed-source"
            size="lg"
          >
            {t("save-button")}
          </Button>
        </ContentFooter>
      </Form>
    </>
  );
}

FeedSourceForm.propTypes = {
  feedSource: PropTypes.shape({
    cssStyles: PropTypes.string,
    logo: PropTypes.shape({}),
    description: PropTypes.string,
    title: PropTypes.string,
  }),
  handleInput: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  headerText: PropTypes.string.isRequired,
  isLoading: PropTypes.bool,
  loadingMessage: PropTypes.string,
};

export default FeedSourceForm;
