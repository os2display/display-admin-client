import { React, useEffect, useState } from "react";
import { Redirect, useParams, useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import ContentHeader from "../util/content-header/content-header";
import ContentBody from "../util/content-body/content-body";
import ContentFooter from "../util/content-footer/content-footer";
import getFormErrors from "../util/helpers/form-errors-helper";
import FormInput from "../util/forms/form-input";

/**
 * The edit user component.
 *
 * @returns {object} The edit user page.
 */
function EditUser() {
  const { t } = useTranslation("common");
  const [formStateObject, setFormStateObject] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();
  const [userName, setUserName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const newUser = id === "new";
  const [errors, setErrors] = useState([]);
  const requiredFields = ["userName"];

  /** Load content from fixture. */
  useEffect(() => {
    // @TODO: load real content.
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
   * @param {object} props The props.
   * @param {object} props.target Event target
   */
  function handleInput({ target }) {
    const localFormStateObject = { ...formStateObject };
    localFormStateObject[target.id] = target.value;
    setFormStateObject(localFormStateObject);
  }

  /**
   * Handles validations, and goes back to list.
   *
   * @param {object} e The submit event.
   * @returns {boolean} Boolean indicating whether to submit form.
   */
  function handleSubmit(e) {
    // @TODO: make it save.
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
        {newUser && <ContentHeader title={t("edit-user.create-new-user")} />}
        {!newUser && (
          <ContentHeader title={`${t("edit-user.edit-user")}: ${userName}`} />
        )}
        <ContentBody>
          <FormInput
            name="userName"
            type="text"
            errors={errors}
            label={t("edit-user.name-label")}
            placeholder={t("edit-user.name-placeholder")}
            value={formStateObject.userName}
            onChange={handleInput}
          />
        </ContentBody>
        {submitted && <Redirect to="/users" />}
        <ContentFooter>
          <Button
            variant="secondary"
            type="button"
            id="user_cancel"
            onClick={() => navigate(-1)}
            size="lg"
            className="me-3"
          >
            {t("edit-user.cancel-button")}
          </Button>
          <Button variant="primary" type="submit" id="save_user" size="lg">
            {t("edit-user.save-button")}
          </Button>
        </ContentFooter>
      </Form>
    </>
  );
}

export default EditUser;
