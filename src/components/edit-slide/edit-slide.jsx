import { React, useState, useEffect } from "react";
import { useParams, Redirect } from "react-router";
import { Container, Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useIntl, FormattedMessage } from "react-intl";
import Select from "../util/forms/select";
import FormInput from "../util/forms/form-input";
import getFormErrors from "../util/helpers/form-errors-helper";
import RenderFormElement from "../util/forms/render-form-element";

/**
 * The edit slide component.
 *
 * @returns {object}
 * The edit slide page.
 */
function EditSlide() {
  const intl = useIntl();
  const [formStateObject, setFormStateObject] = useState({});
  const history = useHistory();
  const { id } = useParams();
  const [slideName, setSlideName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const newSlide = id === "new";
  const requiredFields = ["slide_name", "slide_template"];
  const [errors, setErrors] = useState([]);
  const slideLabel = intl.formatMessage({ id: "edit_add_slide_name_label" });
  const templateLabel = intl.formatMessage({
    id: "edit_add_slide_template_label",
  });
  const slidePlaceholder = intl.formatMessage({
    id: "edit_add_slide_label_placeholder",
  });
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
          localFormStateObject.slide_name = jsonData.slide.name;
          localFormStateObject.slide_template = jsonData.slide.template;
          setFormStateObject(localFormStateObject);
          setSlideName(jsonData.slide.name);
          setTemplateData(jsonData.slide.templateData);
        });
    }
  }, []);
  useEffect(() => {
    // @TODO load real content.
    fetch("/fixtures/slides/slide-form.json")
      .then((response) => response.json())
      .then((jsonData) => {
        setFormData(jsonData);
      });
    fetch("/fixtures/templates/templates.json")
      .then((response) => response.json())
      .then((jsonData) => {
        setTemplateOptions(jsonData.templates);
      });
  }, [templateData, formStateObject]);

  useEffect(() => {
    if (templateData) {
      const localFormStateObject = { ...formStateObject };
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
    const localFormStateObject = { ...formStateObject };
    localFormStateObject[target.id] = target.value;
    setFormStateObject(localFormStateObject);
  }

  /**
   * @param {string} field
   * The required field to validate.
   */
  function handleRequiredField(field) {
    requiredFields.push(field);
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
      <Container>
        <Form onSubmit={handleSubmit}>
          {newSlide && (
            <h1>
              <FormattedMessage
                id="create_new_slide"
                defaultMessage="create_new_slide"
              />
            </h1>
          )}
          {!newSlide && (
            <h1>
              <FormattedMessage id="edit_slide" defaultMessage="edit_slide" />
              {slideName}
            </h1>
          )}
          <FormInput
            name="slide_name"
            type="text"
            errors={errors}
            label={slideLabel}
            placeholder={slidePlaceholder}
            value={formStateObject.slide_name}
            onChange={handleInput}
          />
          <Select
            value={formStateObject.slide_template}
            name="slide_template"
            options={templateOptions}
            onChange={handleInput}
            label={templateLabel}
            errors={errors}
          />
          {formStateObject.slide_template && (
            <div className="border p-2">
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
            </div>
          )}
          {submitted && <Redirect to="/slides" />}
          <Button
            variant="secondary"
            type="button"
            onClick={() => history.goBack()}
          >
            <FormattedMessage id="cancel" defaultMessage="cancel" />
          </Button>
          <Button variant="primary" type="submit" id="save_slide">
            <FormattedMessage id="save_slide" defaultMessage="save_slide" />
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default EditSlide;
