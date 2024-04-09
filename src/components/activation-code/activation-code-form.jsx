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
import RadioButtons from "../util/forms/radio-buttons";

/**
 * The user form component.
 *
 * @param {object} props - The props.
 * @param {object} props.activationCode The activationCode object to modify in the form.
 * @param {Function} props.handleInput Handles form input.
 * @param {Function} props.handleSubmit Handles form submit.
 * @param {string} props.headerText Headline text.
 * @param {boolean} props.isLoading Indicator of whether the form is loading
 * @param {string} props.loadingMessage The loading message for the spinner
 * @returns {object} The user form.
 */
function ActivationCodeForm({
  activationCode,
  handleInput,
  handleSubmit,
  headerText,
  isLoading,
  loadingMessage,
}) {
  const { t } = useTranslation("common", { keyPrefix: "activation-code-form" });
  const navigate = useNavigate();

  const roles = [
    {
      id: "ROLE_EXTERNAL_USER",
      label: t("role-external-user"),
    },
    {
      id: "ROLE_EXTERNAL_USER_ADMIN",
      label: t("role-external-user-admin"),
    },
  ];

  // 123

  return (
    <>
      <LoadingComponent isLoading={isLoading} loadingMessage={loadingMessage} />
      <Form>
        <h1 id="h1UserDisplayName">{headerText}</h1>
        <ContentBody>
          <div className="mb-2">
            <FormInput
              title="display-name"
              type="text"
              label={t("display-name-label")}
              placeholder={t("display-name-placeholder")}
              value={activationCode.displayName}
              onChange={handleInput}
              name="displayName"
              required
            />
          </div>
          <div className="mb-2">
            <RadioButtons
              radioGroupName="role"
              handleChange={handleInput}
              options={roles}
              label={t("role-label")}
              selected={activationCode.role}
            />
            <div>
              <small>{t("role-external-user-helptext")}</small>
            </div>
            <div>
              <small>{t("role-external-user-admin-helptext")}</small>
            </div>
          </div>
        </ContentBody>
        <ContentFooter>
          <Button
            variant="secondary"
            type="button"
            id="cancel_user"
            onClick={() => navigate("/activation/list/")}
            className="margin-right-button"
            size="lg"
          >
            {t("cancel-button")}
          </Button>
          <Button
            variant="primary"
            type="button"
            onClick={handleSubmit}
            id="save_user"
            size="lg"
            className="col"
          >
            {t("save-button")}
          </Button>
        </ContentFooter>
      </Form>
    </>
  );
}

ActivationCodeForm.defaultProps = {
  isLoading: false,
  loadingMessage: "",
  activationCode: PropTypes.shape({
    displayName: "",
    role: "",
  }),
};

ActivationCodeForm.propTypes = {
  activationCode: PropTypes.shape({
    displayName: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
  }),
  handleInput: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  headerText: PropTypes.string.isRequired,
  isLoading: PropTypes.bool,
  loadingMessage: PropTypes.string,
};

export default ActivationCodeForm;
