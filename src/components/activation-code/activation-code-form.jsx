import { React } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import LoadingComponent from "../util/loading-component/loading-component";
import ContentBody from "../util/content-body/content-body";
import ContentFooter from "../util/content-footer/content-footer";
import FormInput from "../util/forms/form-input";

/**
 * The user form component.
 *
 * @param {object} props - The props.
 * @param {object} props.user The user object to modify in the form.
 * @param {Function} props.handleInput Handles form input.
 * @param {Function} props.handleSubmit Handles form submit.
 * @param {string} props.headerText Headline text.
 * @param {boolean} props.isLoading Indicator of whether the form is loading
 * @param {string} props.loadingMessage The loading message for the spinner
 * @returns {object} The user form.
 */
function ActivationCodeForm({
  user,
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
      <LoadingComponent isLoading={isLoading} loadingMessage={loadingMessage} />
      <Form>
        <h1 id="userTitle">{headerText}</h1>
        <ContentBody>
          <FormInput
            title="title"
            type="text"
            label={t("user-form.user-title-label")}
            placeholder={t("user-form.user-title-placeholder")}
            value={user.title}
            onChange={handleInput}
          />
        </ContentBody>
        <ContentFooter>
          <Button
            variant="secondary"
            type="button"
            id="cancel_user"
            onClick={() => navigate("/user/list/")}
            className="margin-right-button"
            size="lg"
          >
            {t("user-form.cancel-button")}
          </Button>
          <Button
            variant="primary"
            type="button"
            onClick={handleSubmit}
            id="save_user"
            size="lg"
            className="col"
          >
            {t("user-form.save-button")}
          </Button>
        </ContentFooter>
      </Form>
    </>
  );
}

ActivationCodeForm.defaultProps = {
  isLoading: false,
  loadingMessage: "",
  user: PropTypes.shape({
    title: "",
  }),
};

ActivationCodeForm.propTypes = {
  user: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }),
  handleInput: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  headerText: PropTypes.string.isRequired,
  isLoading: PropTypes.bool,
  loadingMessage: PropTypes.string,
};

export default ActivationCodeForm;
