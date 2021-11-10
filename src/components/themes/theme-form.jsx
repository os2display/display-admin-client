import { React } from "react";
import { Button, Spinner } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import FormInputArea from "../util/forms/form-input-area";
import Toast from "../util/toast/toast";
import ContentBody from "../util/content-body/content-body";
import ContentFooter from "../util/content-footer/content-footer";
import FormInput from "../util/forms/form-input";
import WithLoading from '../groups/group-form';

/**
 * The theme form component.
 *
 * @param {object} props - The props.
 * @param {object} props.theme The theme object to modify in the form.
 * @param {Function} props.handleInput Handles form input.
 * @param {Function} props.handleSubmit Handles form submit.
 * @param {boolean} props.isSaving Is the form saving?
 * @param {string} props.headerText Headline text.
 * @param {boolean | null} props.isSaveSuccess Is the save a success?
 * @param {boolean | null} props.isLoading The data is loading.
 * @param {Array} props.errors Array of errors.
 * @returns {object} The theme form.
 */
function ThemeForm({
  theme,
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
          onClick={() => history.push("/themes/list/")}
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
        >{t("theme-form.save-button")}
        </Button>
        <Toast show={isSaveSuccess} text={t("theme-form.saved")} />
        <Toast show={!!errors} text={t("theme-form.error")} />
      </ContentFooter>
    </Form>
  );
}

ThemeForm.propTypes = {
  theme: PropTypes.objectOf(PropTypes.any).isRequired,
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

export default WithLoading(ThemeForm);
