import { React, useEffect, useState } from "react";
import { Redirect, useParams } from "react-router";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Select from "../util/forms/select";
import FormInput from "../util/forms/form-input";
import getFormErrors from "../util/helpers/form-errors-helper";
import RenderFormElement from "../util/forms/render-form-element";
import FormCheckbox from "../util/forms/form-checkbox";
import SelectScreenTable from "../util/multi-and-table/select-screen-table";
import SelectPlaylistTable from "../util/multi-and-table/select-playlists-table";
import ContentBody from "../util/content-body/content-body";
import ContentFooter from "../util/content-footer/content-footer";

/**
 * The edit slide component.
 *
 * @returns {object}
 * The edit slide page.
 */
function EditSlide() {
  const { t } = useTranslation("common");
  const [formStateObject, setFormStateObject] = useState({
    playlists: [],
    slideTemplate: "",
  });
  const history = useHistory();
  const { id } = useParams();
  const [slideName, setSlideName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const newSlide = id === "new";
  const requiredFields = ["slideName", "slideTemplate"];
  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState([]);
  const [templateData, setTemplateData] = useState();
  const [templateOptions, setTemplateOptions] = useState([]);

  /**
   * Load content from fixture.
   */
  useEffect(() => {
    // @TODO load real content.
    if (!newSlide) {
      fetch("/fixtures/slides/slide.json")
        .then((response) => response.json())
        .then((jsonData) => {
          const localFormStateObject = { ...formStateObject };
          localFormStateObject.slideName = jsonData.slide.name;
          localFormStateObject.slideTemplate = jsonData.slide.template;
          localFormStateObject.slideScreen = jsonData.slide.onFollowingScreens;
          localFormStateObject.slidePlaylist = jsonData.slide.playlists;
          setFormStateObject(localFormStateObject);
          setSlideName(jsonData.slide.name);
          setTemplateData(jsonData.slide.templateData);
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error("Error:", error);
        });
    }
  }, []);

  useEffect(() => {
    const newTemplate = templateOptions.find(
      (template) => template.id === formStateObject.slideTemplate
    );
    if (newTemplate) {
      fetch(newTemplate.url)
        .then((response) => response.json())
        .then((jsonData) => {
          setFormData(jsonData);
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error("Error:", error);
        });
    }
  }, [formStateObject.slideTemplate, templateOptions]);

  useEffect(() => {
    // @TODO load real content.
    fetch("/fixtures/templates/templates.json")
      .then((response) => response.json())
      .then((jsonData) => {
        setTemplateOptions(jsonData.templates);
      })
      .catch((error) => {
        // eslint-disable-next-line
        console.error("Error:", error);
      });
  }, [templateData]);

  useEffect(() => {
    if (templateData) {
      const localFormStateObject = { ...formStateObject };
      setFormStateObject({});
      formData.forEach((element) => {
        localFormStateObject[element.name] = templateData
          ? templateData[element.name]
          : "";
      });
      setFormStateObject(localFormStateObject);
    }
  }, [formData]);

  /**
   * Set state on change in input field
   *
   * @param {object} props
   * The props.
   * @param {object} props.target
   * event target
   */
  function handleInput({ target }) {
    let localErrors = [...errors];
    if (localErrors.length > 0) {
      localErrors = localErrors.filter((error) => error !== target.id);
      setErrors(localErrors);
    }
    const localFormStateObject = { ...formStateObject };
    localFormStateObject[target.id] = target.value;
    setFormStateObject(localFormStateObject);
  }

  /**
   * @param {string} field
   * The required field to validate.
   */
  function handleRequiredField(field) {
    if (Array.isArray(field)) {
      field.forEach((f) => {
        requiredFields.push(f);
      });
    } else {
      requiredFields.push(field);
    }
  }

  /**
   * Handles validations, and goes back to list.
   *
   * @todo make it save.
   * @param {object} e
   * the submit event.
   * @returns {boolean}
   * Boolean indicating whether to submit form.
   */
  function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);
    let returnValue = false;
    const createdErrors = getFormErrors(requiredFields, formStateObject);
    if (createdErrors.length > 0) {
      setErrors(createdErrors);
    } else {
      setSubmitted(true);
      returnValue = true;
    }
    return returnValue;
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        {newSlide && <h1>{t("edit-slide.create-new-slide")}</h1>}
        {!newSlide && (
          <h1 className="m-3 h3">
            {t("edit-slide.edit-slide")}: {slideName}
          </h1>
        )}
        <ContentBody>
          <Col>
            <FormInput
              name="slideName"
              type="text"
              errors={errors}
              label={t("edit-slide.slide-name-label")}
              placeholder={t("edit-slide.slide-name-placeholder")}
              value={formStateObject.slideName}
              onChange={handleInput}
            />
          </Col>
          <Col>
            <Select
              value={formStateObject.slideTemplate}
              name="slideTemplate"
              options={templateOptions}
              onChange={handleInput}
              label={t("edit-slide.slide-template-label")}
              errors={errors}
            />
          </Col>
        </ContentBody>
        <ContentBody>
          {formStateObject.slideTemplate && (
            <section>
              {/* Render slide form from jsondata */}
              {formData.map((data) => (
                <RenderFormElement
                  key={data.name}
                  data={data}
                  errors={errors}
                  onChange={handleInput}
                  formStateObject={formStateObject}
                  requiredFieldCallback={handleRequiredField}
                />
              ))}
            </section>
          )}
        </ContentBody>
        <ContentBody>
          <SelectScreenTable
            handleChange={handleInput}
            name="slideScreen"
            errors={errors}
            selectedData={formStateObject.slideScreen}
          />
        </ContentBody>
        <ContentBody>
          <SelectPlaylistTable
            handleChange={handleInput}
            name="slidePlaylist"
            errors={errors}
            selectedData={formStateObject.slidePlaylist}
          />
          <FormCheckbox
            label={t("edit-slide.slide-publish-label")}
            onChange={handleInput}
            name="slide_publish"
            value={formStateObject.slidePublish}
          />
          {submitted && <Redirect to="/slides" />}
        </ContentBody>
        <ContentFooter>
          <Button
            variant="secondary"
            type="button"
            id="slide_cancel"
            onClick={() => history.goBack()}
            className="me-md-3"
            size="lg"
          >
            {t("edit-slide.cancel-button")}
          </Button>
          <Button variant="primary" type="submit" id="save_slide" size="lg">
            {t("edit-slide.save-button")}
          </Button>
        </ContentFooter>
      </Form>
    </>
  );
}

export default EditSlide;
