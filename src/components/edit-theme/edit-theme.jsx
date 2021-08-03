import { React, useEffect, useState } from "react";
import { Redirect, useParams } from "react-router";
import { Button, Container, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import getFormErrors from "../util/helpers/form-errors-helper";
import FormInput from "../util/forms/form-input";

/**
 * The edit theme component.
 *
 * @returns {object}
 * The edit theme page.
 */
function EditTheme() {
  const { t } = useTranslation("common");
  const [formStateObject, setFormStateObject] = useState({});
  const history = useHistory();
  const { id } = useParams();
  const [themeName, setThemeName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const newTheme = id === "new";
  const [errors, setErrors] = useState([]);
  const requiredFields = ["themeName"];

  /**
   * Load content from fixture.
   */
  useEffect(() => {
    // @TODO load real content.
    if (!newTheme) {
      fetch(`/fixtures/themes/theme.json`)
        .then((response) => response.json())
        .then((jsonData) => {
          setFormStateObject({
            themeName: jsonData.theme.name,
          });
          setThemeName(jsonData.theme.name);
        });
    }
  }, []);

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
          {newTheme && <h1>{t("edit-theme.create-new-theme")}</h1>}
          {!newTheme && (
            <h1>
              {t("edit-theme.edit-theme")}: {themeName}
            </h1>
          )}
          <FormInput
            name="themeName"
            type="text"
            errors={errors}
            label={t("edit-theme.name-label")}
            placeholder={t("edit-theme.name-placeholder")}
            value={formStateObject.themeName}
            onChange={handleInput}
          />
          {submitted && <Redirect to="/themes" />}
          <Button
            variant="secondary"
            type="button"
            id="theme_cancel"
            onClick={() => history.goBack()}
          >
            {t("edit-theme.cancel-button")}
          </Button>
          <Button variant="primary" type="submit" id="save_theme">
            {t("edit-theme.save-button")}
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default EditTheme;
