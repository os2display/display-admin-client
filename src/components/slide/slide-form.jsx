import { React, useEffect, useState } from "react";
import { Button, Spinner, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import Toast from "../util/toast/toast";
import ContentBody from "../util/content-body/content-body";
import MultiSelectComponent from "../util/forms/multiselect-dropdown/multi-dropdown";
import ContentFooter from "../util/content-footer/content-footer";
import {
  useGetV1TemplatesQuery,
  useGetV1ThemesQuery,
} from "../../redux/api/api.generated";
import FormInput from "../util/forms/form-input";
import RenderFormElement from "./render-form-element";
import RemoteComponentWrapper from "./remote-component-wrapper";

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
 * @param {object} props.mediaFields The uploaded but not yet saved media fields.
 * @param {Function} props.selectTemplate Function to handle select of template.
 * @param {object} props.selectedTemplate Selected template.
 * @param {Function} props.selectTheme Function to handle select of theme.
 * @param {object} props.selectedTheme Selected theme.
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
  mediaFields,
  loadedMedia,
  errors,
  selectTheme,
  selectedTheme,
}) {
  const { t } = useTranslation("common");
  const history = useHistory();
  const [templateOptions, setTemplateOptions] = useState([]);
  const [contentFormElements, setContentFormElements] = useState([]);
  const [searchTextTemplate, setSearchTextTemplate] = useState("");
  const [searchTextTheme, setSearchTextTheme] = useState("");
  const [selectedTemplates, setSelectedTemplates] = useState([]);
  const [themesOptions, setThemesOptions] = useState();

  // Load all templates. Assume no more than 1000.
  const { data: templates, isLoading: loadingTemplates } =
    useGetV1TemplatesQuery({
      title: searchTextTemplate,
      itemsPerPage: 10,
    });

  const { data: themes, isLoading: loadingThemes } = useGetV1ThemesQuery({
    title: searchTextTheme,
    itemsPerPage: searchTextTheme ? 10 : 0,
  });

  /** Load content form elements for template */
  useEffect(() => {
    const newSelectedTemplates = [];

    if (selectedTemplate) {
      // Get content form from template resources.
      const contentFormUrl = selectedTemplate?.resources?.admin;

      fetch(contentFormUrl)
        .then((response) => response.json())
        .then((data) => {
          setContentFormElements(data);
        })
        .catch(() => {
          // @TODO: Handle error case. Display error for user.
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

  /** Set loaded data into form state. */
  useEffect(() => {
    if (themes) {
      setThemesOptions(themes["hydra:member"]);
    }
  }, [themes]);

  /**
   * Fetches data for the multi component
   *
   * @param {string} filter - The filter.
   */
  function onFilterTemplate(filter) {
    setSearchTextTemplate(filter);
  }

  /**
   * Fetches data for the multi component
   *
   * @param {string} filter - The filter.
   */
  function onFilterTheme(filter) {
    setSearchTextTheme(filter);
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
      {loadingThemes && !isLoading && (
        <>
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
            className="m-1"
          />
          {t("slide-form.loading-themes")}
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
              value={slide.title || ""}
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
                filterCallback={onFilterTemplate}
                singleSelect
              />
            </ContentBody>
          )}
          {selectedTemplate && contentFormElements && (
            <ContentBody>
              <RemoteComponentWrapper
                url={selectedTemplate?.resources?.component}
                slide={slide}
                content={slide.content}
                mediaFields={mediaFields}
                loadedMedia={loadedMedia}
              />
              {contentFormElements.map((formElement) => (
                <RenderFormElement
                  key={formElement.key}
                  data={formElement}
                  onChange={handleContent}
                  onMediaChange={handleMedia}
                  name={formElement.name}
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
            <Row className="g-2">
              <Col md>
                <FormInput
                  name="published.from"
                  type="datetime-local"
                  label={t("slide-form.slide-from-label")}
                  value={slide.published.from}
                  onChange={handleInput}
                />
              </Col>

              <Col md>
                <FormInput
                  name="published.to"
                  type="datetime-local"
                  label={t("slide-form.slide-to-label")}
                  value={slide.published.to}
                  onChange={handleInput}
                />
              </Col>
            </Row>
          </ContentBody>
          {themesOptions && (
            <ContentBody>
              <MultiSelectComponent
                label={t("slide-form.slide-theme-label")}
                handleSelection={selectTheme}
                options={themesOptions}
                selected={selectedTheme}
                name="theme"
                filterCallback={onFilterTheme}
                singleSelect
              />
            </ContentBody>
          )}
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
  selectedTheme: PropTypes.string.isRequired,
  isSaveSuccess: PropTypes.bool.isRequired,
  selectTemplate: PropTypes.func.isRequired,
  selectTheme: PropTypes.func.isRequired,
  selectedTemplate: PropTypes.shape({
    "@id": PropTypes.string,
    resources: PropTypes.shape({
      admin: PropTypes.string.isRequired,
      component: PropTypes.string.isRequired,
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
  mediaFields: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default SlideForm;
