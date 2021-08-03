import { React, useEffect, useState } from "react";
import { Redirect, useParams } from "react-router";
import { Button, Container, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import getFormErrors from "../util/helpers/form-errors-helper";
import FormInput from "../util/forms/form-input";

/**
 * The edit group component.
 *
 * @returns {object}
 * The edit group page.
 */
function EditGroup() {
  const { t } = useTranslation("common");
  const requiredFields = ["groupName"];
  const [formStateObject, setFormStateObject] = useState({});
  const history = useHistory();
  const { id } = useParams();
  const [groupName, setGroupName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const newGroup = id === "new";
  const [errors, setErrors] = useState([]);

  /**
   * Load content from fixture.
   */
  useEffect(() => {
    // @TODO load real content.
    if (!newGroup) {
      fetch(`/fixtures/groups/group.json`)
        .then((response) => response.json())
        .then((jsonData) => {
          setFormStateObject({
            groupName: jsonData.group.name,
          });
          setGroupName(jsonData.group.name);
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
          {newGroup && <h1>{t("edit-group.create-new-group")}</h1>}
          {!newGroup && (
            <h1>
              {t("edit-group.edit-group")}: {groupName}
            </h1>
          )}
          <FormInput
            name="groupName"
            type="text"
            errors={errors}
            label={t("edit-group.group-name-label")}
            placeholder={t("edit-group.group-name-placeholder")}
            value={formStateObject.groupName}
            onChange={handleInput}
          />
          {submitted && <Redirect to="/groups" />}
          <Button
            variant="secondary"
            type="button"
            id="group_cancel"
            onClick={() => history.goBack()}
          >
            {t("edit-group.cancel-button")}
          </Button>
          <Button variant="primary" type="submit" id="save_group">
            {t("edit-group.save-button")}
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default EditGroup;
