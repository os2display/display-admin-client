import { React, useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import Toast from "../util/toast/toast";
import ContentBody from "../util/content-body/content-body";
import MultiSelectComponent from "../util/forms/multiselect-dropdown/multi-dropdown";
import TemplateRender from "./template-render";
import ContentFooter from "../util/content-footer/content-footer";
import { useGetV1TemplatesQuery } from "../../redux/api/api.generated";
import FormInput from "../util/forms/form-input";
import FormCheckbox from "../util/forms/form-checkbox";

/**
 * The slide form component.
 *
 * @param {object} props - The props.
 * @param {object} props.slide The slide object to modify in the form.
 * @param {Function} props.handleInput Handles form input.
 * @param {Function} props.handleSubmit Handles form submit.
 * @param {boolean} props.isSaving Is the form saving?
 * @param {string} props.headerText Headline text.
 * @param {boolean | null} props.isSaveSuccess Is the save a success?
 * @param {boolean | null} props.isLoading The data is loading.
 * @param {Array} props.errors Array of errors.
 * @param {object} props.template - the template for the slide.
 * @returns {object} The slide form.
 */
function SlideForm({
  slide,
  template,
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
  const [templateOptions, setTemplateOptions] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState(
    template ? [template] : []
  );
  const { data: templates, isLoading: loadingTemplates } =
    useGetV1TemplatesQuery({
      title: searchText,
      itemsPerPage: searchText ? 10 : 0,
    });

  /** Set loaded data into form state. */
  useEffect(() => {
    if (templates) {
      const localTemplateOptions = [...templates["hydra:member"]];
      if (template) {
        localTemplateOptions.push(template);
      }
      setTemplateOptions(localTemplateOptions);
    }
  }, [templates]);

  /**
   * Fetches data for the multi component
   *
   * @param {string} filter - The filter.
   */
  function onFilter(filter) {
    setSearchText(filter);
  }

  /**
   * Adds group to list of groups.
   *
   * @param {object} props - The props.
   * @param {object} props.target - The target.
   */
  function handleAdd({ target }) {
    const { value, id } = target;
    setSelectedTemplate(value);
    handleInput({
      target: { id, value: value.map((item) => item["@id"]).shift() },
    });
  }

  return (
    <Form>
      <h1>{headerText}</h1>
      {isLoading && (
        <>
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
            className="m-1"
          />
          {t("slide-form.loading")}
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
          {t("slide-form.saving")}
        </>
      )}
      {loadingTemplates && !isLoading && (
        <>
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
            className="m-1"
          />
          {t("slide-form.loading-templates")}
        </>
      )}
      {!isLoading && (
        <>
          <ContentBody>
            <FormInput
              name="title"
              type="text"
              label={t("slide-form.slide-name-label")}
              helpText={t("slide-form.slide-name-placeholder")}
              value={slide.title}
              onChange={handleInput}
            />
          </ContentBody>
          {templateOptions && (
            <ContentBody>
              <MultiSelectComponent
                label={t("slide-form.slide-template-label")}
                helpText={t("slide-form.slide-template-help-text")}
                handleSelection={handleAdd}
                options={templateOptions}
                selected={selectedTemplate}
                name="templateInfo"
                filterCallback={onFilter}
                singleSelect
              />
            </ContentBody>
          )}
          {slide.templateInfo && typeof slide.templateInfo === "string" && (
            <>
              <ContentBody>
                <h3 className="h4">{t("slide-form.slide-content-header")}</h3>
                <FormInput
                  name="content.text"
                  type="text"
                  label={t("slide-form.slide-content-label")}
                  value={slide.content.text}
                  onChange={handleInput}
                />
              </ContentBody>
              {/* @TODO: */}
              {/* <ContentBody>
               <TemplateRender slide={slide} handleInput={handleInput} />
             </ContentBody> */}
            </>
          )}
          <ContentBody>
            <h3 className="h4">{t("slide-form.slide-publish-title")}</h3>
            <FormCheckbox
              label={t("slide-form.slide-publish-label")}
              onChange={handleInput}
              name="published"
              value={slide.published}
            />
          </ContentBody>
        </>
      )}
      <ContentFooter>
        <Button
          variant="secondary"
          type="button"
          id="cancel_slide"
          onClick={() => history.push("/slide/list/")}
          className="me-md-3 col"
          size="lg"
        >
          {t("slide-form.cancel-button")}
        </Button>
        <Button
          variant="primary"
          type="button"
          onClick={handleSubmit}
          id="save_slide"
          size="lg"
          className="col"
        >
          {t("slide-form.save-button")}
        </Button>
        <Toast show={isSaveSuccess} text={t("slide-form.saved")} />
        <Toast show={!!errors} text={t("slide-form.error")} />
      </ContentFooter>
    </Form>
  );
}

SlideForm.propTypes = {
  slide: PropTypes.objectOf(PropTypes.any).isRequired,
  handleInput: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isSaving: PropTypes.bool.isRequired,
  headerText: PropTypes.string.isRequired,
  isSaveSuccess: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  template: PropTypes.objectOf(PropTypes.any).isRequired,
  errors: PropTypes.oneOfType([
    PropTypes.objectOf(PropTypes.any),
    PropTypes.bool,
  ]).isRequired,
};

export default SlideForm;
