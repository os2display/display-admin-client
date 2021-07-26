import { React, useState, useEffect } from "react";
import { useParams, Redirect } from "react-router";
import { Container, Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useIntl, FormattedMessage } from "react-intl";
import getFormErrors from "../util/helpers/form-errors-helper";
import FormInput from "../util/forms/form-input";

/**
 * The edit group component.
 *
 * @returns {object}
 * The edit group page.
 */
function EditGroup() {
  const intl = useIntl();
  const requiredFields = ["group_name"];
  const [formStateObject, setFormStateObject] = useState({});
  const history = useHistory();
  const { id } = useParams();
  const [groupName, setGroupName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const newGroup = id === "new";
  const [errors, setErrors] = useState([]);
  const groupLabel = intl.formatMessage({ id: "edit_add_group_label" });
  const groupPlaceholder = intl.formatMessage({
    id: "edit_add_group_label_placeholder",
  });

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
            group_name: jsonData.group.name,
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
          {newGroup && (
            <h1>
              <FormattedMessage
                id="create_new_group"
                defaultMessage="create_new_group"
              />
            </h1>
          )}
          {!newGroup && (
            <h1>
              <FormattedMessage id="edit_group" defaultMessage="edit_group" />
              {groupName}
            </h1>
          )}
          <FormInput
            name="group_name"
            type="text"
            errors={errors}
            label={groupLabel}
            placeholder={groupPlaceholder}
            value={formStateObject.group_name}
            onChange={handleInput}
          />
          {submitted && <Redirect to="/groups" />}
          <Button
            variant="secondary"
            type="button"
            id="group_cancel"
            onClick={() => history.goBack()}
          >
            <FormattedMessage id="cancel" defaultMessage="cancel" />
          </Button>
          <Button variant="primary" type="submit" id="save_group">
            <FormattedMessage id="save_group" defaultMessage="save_group" />
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default EditGroup;
