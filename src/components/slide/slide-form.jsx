import { React, useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import Toast from "../util/toast/toast";
import ContentBody from "../util/content-body/content-body";
import MultiSelectComponent from "../util/forms/multiselect-dropdown/multi-dropdown";
import ContentFooter from "../util/content-footer/content-footer";
import { useGetV1TemplatesQuery } from "../../redux/api/api.generated";
import FormInput from "../util/forms/form-input";
import FormCheckbox from "../util/forms/form-checkbox";
import RenderFormElement from "./render-form-element";

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
 * @param {Function} props.handleContent Function for handling changes to content field
 * @param {Function} props.handleMedia Handle media field
 * @param {Array} props.loadedMedia Object of loaded media.
 * @param {Function} props.selectTemplate Function to handle select of template.
 * @param {object} props.selectedTemplate Selected template.
 * @returns {object} The slide form.
 */
function SlideForm({
  slide,
  handleInput,
  handleContent,
  handleMedia,
  handleSubmit,
  selectTemplate,
  selectedTemplate,
  isSaving,
  headerText,
  isSaveSuccess,
  isLoading,
  loadedMedia,
  errors,
}) {
  const { t } = useTranslation("common");
  const history = useHistory();
  const [templateOptions, setTemplateOptions] = useState([]);
  const [contentFormElements, setContentFormElements] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedTemplates, setSelectedTemplates] = useState([]);

  // Load all templates. Assume no more than 1000.
  const { data: templates, isLoading: loadingTemplates } =
    useGetV1TemplatesQuery({
      title: searchText,
      itemsPerPage: 10,
    });

  /** Load content form elements for template */
  useEffect(() => {
    const newSelectedTemplates = [];

    if (selectedTemplate) {
      // Get content form from template resources.
      const contentFormUrl = selectedTemplate?.resources?.admin;

      fetch(contentFormUrl).then(response => response.json())
        .then((data) => {
          setContentFormElements(data);
        },
      ).catch((err) => {
        // @TODO: Handle error case. Display error for user.
        console.error(err)
      });

      newSelectedTemplates.push(selectedTemplate);
    }

    setSelectedTemplates(newSelectedTemplates);
  }, [selectedTemplate]);

  /** Set loaded data into form state. */
  useEffect(() => {
    if (templates) {
      const localTemplateOptions = [...templates["hydra:member"]];
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
                handleSelection={selectTemplate}
                options={templateOptions}
                selected={selectedTemplates}
                name="templateInfo"
                filterCallback={onFilter}
                singleSelect
              />
            </ContentBody>
          )}
          {selectedTemplate && contentFormElements && (
            <ContentBody>
              {contentFormElements.map((formElement) => (
                <RenderFormElement
                  key={formElement.key}
                  data={formElement}
                  onChange={handleContent}
                  onMediaChange={handleMedia}
                  loadedMedia={loadedMedia}
                  formStateObject={slide.content}
                  requiredFieldCallback={() => {
                    return false;
                  }}
                />
              ))}
            </ContentBody>
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
          size="lg"
          className="me-3"
        >
          {t("slide-form.cancel-button")}
        </Button>
        <Button
          variant="primary"
          type="button"
          onClick={handleSubmit}
          id="save_slide"
          size="lg"
        >
          <>
            {!isSaving && t("slide-form.save-button")}
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
          </>
        </Button>
        <Toast show={isSaveSuccess} text={t("slide-form.saved")} />
        <Toast show={!!errors} text={t("slide-form.error")} />
      </ContentFooter>
    </Form>
  );
}

SlideForm.defaultProps = {
  selectedTemplate: null,
};

SlideForm.propTypes = {
  slide: PropTypes.objectOf(PropTypes.any).isRequired,
  handleInput: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isSaving: PropTypes.bool.isRequired,
  headerText: PropTypes.string.isRequired,
  isSaveSuccess: PropTypes.bool.isRequired,
  selectTemplate: PropTypes.func.isRequired,
  selectedTemplate: PropTypes.shape({
    "@id": PropTypes.string,
    resources: PropTypes.shape({
      admin: PropTypes.string.isRequired,
    }).isRequired,
  }),
  isLoading: PropTypes.bool.isRequired,
  errors: PropTypes.oneOfType([
    PropTypes.objectOf(PropTypes.any),
    PropTypes.bool,
  ]).isRequired,
  handleContent: PropTypes.func.isRequired,
  handleMedia: PropTypes.func.isRequired,
  loadedMedia: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default SlideForm;
