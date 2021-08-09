import { React, useEffect, useState } from "react";
import { Redirect, useParams } from "react-router";
import { Button, Container, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import getFormErrors from "../util/helpers/form-errors-helper";
import FormInput from "../util/forms/form-input";

/**
 * The edit user component.
 *
 * @returns {object}
 * The edit user page.
 */
function EditUser() {
  const { t } = useTranslation("common");
  const [formStateObject, setFormStateObject] = useState({});
  const history = useHistory();
  const { id } = useParams();
  const [userName, setUserName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const newUser = id === "new";
  const [errors, setErrors] = useState([]);
  const requiredFields = ["userName"];

  /**
   * Load content from fixture.
   */
  useEffect(() => {
    // @TODO load real content.
    if (!newUser) {
      fetch(`/fixtures/users/user.json`)
        .then((response) => response.json())
        .then((jsonData) => {
          setFormStateObject({
            userName: jsonData.user.name,
          });
          setUserName(jsonData.user.name);
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
          {newUser && <h1>{t("edit-user.create-new-user")}</h1>}
          {!newUser && (
            <h1>
              {t("edit-user.edit-user")}: {userName}
            </h1>
          )}
          <FormInput
            name="userName"
            type="text"
            errors={errors}
            label={t("edit-user.name-label")}
            placeholder={t("edit-user.name-placeholder")}
            value={formStateObject.userName}
            onChange={handleInput}
          />
          {submitted && <Redirect to="/users" />}
          <Button
            variant="secondary"
            type="button"
            id="user_cancel"
            onClick={() => history.goBack()}
          >
            {t("edit-user.cancel-button")}
          </Button>
          <Button variant="primary" type="submit" id="save_user">
            {t("edit-user.save-button")}
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default EditUser;
