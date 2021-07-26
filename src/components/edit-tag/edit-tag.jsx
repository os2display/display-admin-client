import { React, useState, useEffect } from "react";
import { useParams, Redirect } from "react-router";
import { Container, Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useIntl, FormattedMessage } from "react-intl";
import getFormErrors from "../util/helpers/form-errors-helper";
import FormInput from "../util/forms/form-input";

/**
 * The edit tag component.
 *
 * @returns {object}
 * The edit tag page.
 */
function EditTag() {
  const intl = useIntl();
  const [formStateObject, setFormStateObject] = useState({});
  const history = useHistory();
  const { id } = useParams();
  const [tagName, setTagName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const newTag = id === "new";
  const [errors, setErrors] = useState([]);
  const tagLabel = intl.formatMessage({ id: "edit_add_tag_label" });
  const requiredFields = ["tag_name"];
  const tagPlaceholder = intl.formatMessage({
    id: "edit_add_tag_label_placeholder",
  });

  /**
   * Load content from fixture.
   */
  useEffect(() => {
    // @TODO load real content.
    if (!newTag) {
      fetch(`/fixtures/tags/tag.json`)
        .then((response) => response.json())
        .then((jsonData) => {
          setFormStateObject({
            tag_name: jsonData.tag.name,
          });
          setTagName(jsonData.tag.name);
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
    debugger;
    return returnValue;
  }

  return (
    <>
      <Container>
        <Form onSubmit={handleSubmit}>
          {newTag && (
            <h1>
              <FormattedMessage
                id="create_new_tag"
                defaultMessage="create_new_tag"
              />
            </h1>
          )}
          {!newTag && (
            <h1>
              <FormattedMessage id="edit_tag" defaultMessage="edit_tag" />
              {tagName}
            </h1>
          )}
          <FormInput
            name="tag_name"
            type="text"
            errors={errors}
            label={tagLabel}
            placeholder={tagPlaceholder}
            value={formStateObject.tag_name}
            onChange={handleInput}
          />
          {submitted && <Redirect to="/tags" />}
          <Button
            variant="secondary"
            type="button"
            onClick={() => history.goBack()}
          >
            <FormattedMessage id="cancel" defaultMessage="cancel" />
          </Button>
          <Button variant="primary" type="submit" id="save_tag">
            <FormattedMessage id="save_tag" defaultMessage="save_tag" />
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default EditTag;
