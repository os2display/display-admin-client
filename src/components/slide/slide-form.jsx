import { React, useEffect, useState } from "react";
import { Button, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import FormCheckbox from "../util/forms/form-checkbox";
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
import RadioButtons from "../util/forms/radio-buttons";
import "./slide-form.scss";

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
  const [showPreview, setShowPreview] = useState(false);
  const [previewLayout, setPreviewLayout] = useState("horizontal");
  const [previewOverlayVisible, setPreviewOverlayVisible] = useState(false);
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

  /**
   * For closing overlay on escape key.
   *
   * @param {object} props - The props.
   * @param {string} props.key - The key input.
   */
  function downHandler({ key }) {
    if (key === "Escape") {
      setPreviewOverlayVisible(false);
    }
  }

  // Add event listeners for keypress
  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", downHandler);
    };
  }, []);

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

  /** Get show from local storage */
  useEffect(() => {
    const localStorageShow = localStorage.getItem("preview-slide");
    setShowPreview(localStorageShow === "true");
    const localStorageLayout = localStorage.getItem("preview-slide-layout");
    if (localStorageLayout) {
      setPreviewLayout(localStorageLayout);
    }
  }, []);

  /**
   * Changes the show value, and saves to localstorage
   *
   * @param {object} props Props.
   * @param {boolean} props.target The returned value from the checkbox.
   */
  function changeShowPreview({ target }) {
    const { value } = target;
    localStorage.setItem("preview-slide", value);

    setShowPreview(value);
  }

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

  /**
   * Change preview layout.
   *
   * @param {object} props The props.
   * @param {object} props.target Event target
   */
  function onChangePreviewLayout({ target }) {
    setPreviewLayout(target.value);
    localStorage.setItem("preview-slide-layout", target.value);
  }

  return (
    <>
      <LoadingComponent isLoading={isLoading} loadingMessage={loadingMessage} />
      <Form>
        <Row>
          <Col md>
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
                <div className="toggle-preview">
                  <ContentBody>
                    <h2 className="h4">
                      {t("slide-form.preview-slide-title")}
                    </h2>
                    <div className="mt-2">
                      <FormCheckbox
                        label={t("slide-form.show-preview-label")}
                        onChange={changeShowPreview}
                        value={showPreview}
                        name="show-preview"
                      />
                    </div>
                    <div className="mt-2">
                      <RadioButtons
                        label={t("slide-form.horizontal-or-vertical-label")}
                        selected={previewLayout}
                        radioGroupName="vertical_horizontal"
                        disabled={!showPreview}
                        options={[
                          {
                            id: "horizontal",
                            label: t("slide-form.horizontal-label"),
                          },
                          {
                            id: "vertical",
                            label: t("slide-form.vertical-label"),
                          },
                        ]}
                        handleChange={onChangePreviewLayout}
                      />
                    </div>
                    <Button
                      variant="secondary"
                      type="button"
                      id="cancel_slide"
                      onClick={() =>
                        setPreviewOverlayVisible(!previewOverlayVisible)
                      }
                      size="lg"
                      className="me-3"
                    >
                      {t("slide-form.preview-in-full-screen")}
                    </Button>
                    {previewOverlayVisible && (
                      <div
                        onClick={() =>
                          setPreviewOverlayVisible(!previewOverlayVisible)
                        }
                        role="presentation"
                        className="preview-overlay"
                      >
                        <RemoteComponentWrapper
                          url={selectedTemplate?.resources?.component}
                          slide={slide}
                          mediaData={mediaData}
                          showPreview={showPreview}
                          orientation=""
                          closeButton
                          closeCallback={() => setPreviewOverlayVisible(false)}
                        />
                      </div>
                    )}
                  </ContentBody>
                </div>
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
              <Row>
                <small className="form-text">
                  {t("slide-form.publish-helptext")}
                </small>
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
          </Col>
          {showPreview && (
            <Col md className="responsive-side">
              <RemoteComponentWrapper
                url={selectedTemplate?.resources?.component}
                slide={slide}
                mediaData={mediaData}
                showPreview={showPreview}
                orientation={previewLayout}
              />
            </Col>
          )}
        </Row>
        <div className="preview-button-container">
          <button
            type="button"
            className="preview-button bg-light"
            onClick={() =>
              changeShowPreview({ target: { value: !showPreview } })
            }
          >
            {t("slide-form.show-preview-label")}
          </button>
          {showPreview && (
            <RadioButtons
              label={t("slide-form.horizontal-or-vertical-label")}
              selected={previewLayout}
              radioGroupName="vertical_horizontal"
              disabled={!showPreview}
              options={[
                {
                  id: "horizontal",
                  label: t("slide-form.horizontal-label"),
                },
                {
                  id: "vertical",
                  label: t("slide-form.vertical-label"),
                },
              ]}
              handleChange={onChangePreviewLayout}
            />
          )}
        </div>
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
