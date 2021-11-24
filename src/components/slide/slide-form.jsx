import { React, useEffect, useState } from "react";
import { Button, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import ContentBody from "../util/content-body/content-body";
import MultiSelectComponent from "../util/forms/multiselect-dropdown/multi-dropdown";
import ContentFooter from "../util/content-footer/content-footer";
import {
  useGetV1TemplatesQuery,
  useGetV1ThemesQuery,
} from "../../redux/api/api.generated";
import FormInput from "../util/forms/form-input";
import ContentForm from "./content/content-form";
import LoadingComponent from "../util/loading-component/loading-component";
import RemoteComponentWrapper from "./preview/remote-component-wrapper";

/**
 * The slide form component.
 *
 * @param {object} props - The props.
 * @param {object} props.slide The slide object to modify in the form.
 * @param {Function} props.handleInput Handles form input.
 * @param {Function} props.handleSubmit Handles form submit.
 * @param {string} props.headerText Headline text.
 * @param {Function} props.handleContent Function for handling changes to content field
 * @param {Function} props.handleMedia Handle media field
 * @param {Array} props.mediaData Object of loaded media.
 * @param {Function} props.selectTemplate Function to handle select of template.
 * @param {object} props.selectedTemplate Selected template.
 * @param {Function} props.selectTheme Function to handle select of theme.
 * @param {object} props.selectedTheme Selected theme.
 * @param {boolean} props.isLoading Indicator of whether the form is loading
 * @param {string} props.loadingMessage The loading message for the spinner
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
  headerText,
  mediaData,
  selectTheme,
  selectedTheme,
  isLoading,
  loadingMessage,
}) {
  const { t } = useTranslation("common");
  const history = useHistory();
  const [templateOptions, setTemplateOptions] = useState([]);
  const [contentFormElements, setContentFormElements] = useState([]);
  const [searchTextTemplate, setSearchTextTemplate] = useState("");
  const [searchTextTheme, setSearchTextTheme] = useState("");
  const [selectedTemplates, setSelectedTemplates] = useState([]);
  const [themesOptions, setThemesOptions] = useState();

  // Load templates.
  const { data: templates, isLoading: loadingTemplates } =
    useGetV1TemplatesQuery({
      title: searchTextTemplate,
      itemsPerPage: 10,
    });

  // Load themes.
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
    <>
      <LoadingComponent isLoading={isLoading} loadingMessage={loadingMessage} />
      <Form>
        <h1>{headerText}</h1>
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
              isLoading={loadingTemplates}
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
          <>
            <ContentBody>
              <h2 className="h4">{t("slide-form.preview-slide-title")}</h2>
              <RemoteComponentWrapper
                url={selectedTemplate?.resources?.component}
                slide={slide}
                mediaData={mediaData}
              />
            </ContentBody>
            <ContentBody>
              {contentFormElements.map((formElement) => (
                <ContentForm
                  key={formElement.key}
                  data={formElement}
                  onChange={handleContent}
                  onMediaChange={handleMedia}
                  name={formElement.name}
                  mediaData={mediaData}
                  formStateObject={slide.content}
                  requiredFieldCallback={() => {
                    return false;
                  }}
                />
              ))}
            </ContentBody>
          </>
        )}
        <ContentBody>
          <h3 className="h4">{t("slide-form.slide-publish-title")}</h3>
          <Row className="g-2">
            <Col md>
              <FormInput
                name="published.from"
                type="datetime-local"
                label={t("slide-form.slide-from-label")}
                value={slide.published.from ?? ""}
                onChange={handleInput}
              />
            </Col>
            <Col md>
              <FormInput
                name="published.to"
                type="datetime-local"
                label={t("slide-form.slide-to-label")}
                value={slide.published.to ?? ""}
                onChange={handleInput}
              />
            </Col>
          </Row>
        </ContentBody>
        {themesOptions && (
          <ContentBody>
            <MultiSelectComponent
              isLoading={loadingThemes}
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
            {t("slide-form.save-button")}
          </Button>
        </ContentFooter>
      </Form>
    </>
  );
}

SlideForm.defaultProps = {
  selectedTemplate: null,
  selectedTheme: [],
  isLoading: false,
  loadingMessage: "",
};

SlideForm.propTypes = {
  slide: PropTypes.objectOf(PropTypes.any).isRequired,
  handleInput: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  headerText: PropTypes.string.isRequired,
  selectTheme: PropTypes.func.isRequired,
  selectedTheme: PropTypes.arrayOf(
    PropTypes.shape({ "@id": PropTypes.string.isRequired })
  ),
  selectTemplate: PropTypes.func.isRequired,
  selectedTemplate: PropTypes.shape({
    "@id": PropTypes.string,
    resources: PropTypes.shape({
      admin: PropTypes.string.isRequired,
      component: PropTypes.string.isRequired,
    }).isRequired,
  }),
  isLoading: PropTypes.bool,
  loadingMessage: PropTypes.string,
  handleContent: PropTypes.func.isRequired,
  handleMedia: PropTypes.func.isRequired,
  mediaData: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default SlideForm;
