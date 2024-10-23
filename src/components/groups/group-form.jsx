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
 * The group form component.
 *
 * @param {object} props - The props.
 * @param {object} props.group The group object to modify in the form.
 * @param {Function} props.handleInput Handles form input.
 * @param {Function} props.handleSubmit Handles form submit.
 * @param {string} props.headerText Headline text.
 * @param {boolean} props.isLoading Indicator of whether the form is loading
 * @param {string} props.loadingMessage The loading message for the spinner
 * @returns {object} The group form.
 */
function GroupForm({
  handleInput,
  handleSubmit,
  headerText,
  isLoading = false,
  loadingMessage = "",
  group = {
    description: "",
    title: "",
  },
}) {
  const { t } = useTranslation("common");
  const navigate = useNavigate();

  return (
    <>
      <LoadingComponent isLoading={isLoading} loadingMessage={loadingMessage} />
      <Form>
        <h1 id="groupTitle">{headerText}</h1>
        <ContentBody>
          <FormInput
            name="title"
            type="text"
            label={t("group-form.group-title-label")}
            placeholder={t("group-form.group-title-placeholder")}
            value={group.title}
            onChange={handleInput}
          />
          <FormInput
            name="description"
            type="text"
            label={t("group-form.group-description-label")}
            placeholder={t("group-form.group-description-placeholder")}
            value={group.description}
            onChange={handleInput}
          />
        </ContentBody>
        <ContentFooter>
          <Button
            variant="secondary"
            type="button"
            id="cancel_group"
            onClick={() => navigate("/group/list/")}
            className="margin-right-button"
            size="lg"
          >
            {t("group-form.cancel-button")}
          </Button>
          <Button
            variant="primary"
            type="button"
            onClick={handleSubmit}
            id="save_group"
            size="lg"
            className="col"
          >
            {t("group-form.save-button")}
          </Button>
        </ContentFooter>
      </Form>
    </>
  );
}

GroupForm.propTypes = {
  group: PropTypes.shape({
    description: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }),
  handleInput: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  headerText: PropTypes.string.isRequired,
  isLoading: PropTypes.bool,
  loadingMessage: PropTypes.string,
};

export default GroupForm;
