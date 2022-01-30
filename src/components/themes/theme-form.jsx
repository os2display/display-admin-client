
import { React } from "react";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import LoadingComponent from "../util/loading-component/loading-component";
import FormInputArea from "../util/forms/form-input-area";
import ContentBody from "../util/content-body/content-body";
import ContentFooter from "../util/content-footer/content-footer";
import FormInput from "../util/forms/form-input";

/**
 * The theme form component.
 *
 * @param {object} props - The props.
 * @param {object} props.theme The theme object to modify in the form.
 * @param {Function} props.handleInput Handles form input.
 * @param {Function} props.handleSubmit Handles form submit.
 * @param {string} props.headerText Headline text.
 * @param {boolean} props.isLoading Indicator of whether the form is loading
 * @param {string} props.loadingMessage The loading message for the spinner
 * @returns {object} The theme form.
 */
function ThemeForm({
  theme,
  handleInput,
  handleSubmit,
  headerText,
  isLoading,
  loadingMessage,
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
        <h1 id="themeTitle">{headerText}</h1>
        <ContentBody>
          <FormInput
            name="title"
            type="text"
            label={t("theme-form.theme-name-label")}
            value={theme.title}
            onChange={handleInput}
          />
          <FormInputArea
            name="description"
            type="text"
            label={t("theme-form.theme-description-label")}
            value={theme.description}
            onChange={handleInput}
          />
        </ContentBody>
        <ContentBody>
          <h2 className="h4">{t("theme-form.css-header")}</h2>
          <FormInputArea
            name="css"
            type="text"
            label={t("theme-form.theme-css-label")}
            value={theme.css}
            onChange={handleInput}
          />
          <code>{theme.css}</code>
        </ContentBody>
        <ContentFooter>
          <Button
            variant="secondary"
            type="button"
            id="cancel_theme"
            onClick={() => navigate(-1)}
            size="lg"
            className="me-3"
          >
            {t("theme-form.cancel-button")}
          </Button>
          <Button
            variant="primary"
            type="button"
            onClick={handleSubmit}
            id="save_theme"
            size="lg"
          >
            {t("theme-form.save-button")}
          </Button>
        </ContentFooter>
      </Form>
    </>
  );
}

ThemeForm.defaultProps = {
  isLoading: false,
  loadingMessage: "",
};

ThemeForm.propTypes = {
  theme: PropTypes.objectOf(PropTypes.any).isRequired,
  handleInput: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  headerText: PropTypes.string.isRequired,
  isLoading: PropTypes.bool,
  loadingMessage: PropTypes.string,
};

export default ThemeForm;
