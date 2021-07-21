import { React, useState, useEffect } from "react";
import { useParams, Redirect } from "react-router";
import { Container, Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useIntl, FormattedMessage } from "react-intl";
import FormInput from "../util/form-input";

/**
 * The edit tag component.
 *
 * @returns {object}
 *   The edit tag page.
 */
function EditTag() {
  const intl = useIntl();
  const history = useHistory();
  const { id } = useParams();
  const [tag, setTag] = useState([]);
  const [tagName, setTagName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const newTag = id === "new";
  const validText = intl.formatMessage({ id: "valid_text_tag_name_input" });
  const tagLabel = intl.formatMessage({ id: "edit_add_tag_label" });
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
          setTag(jsonData.tag);
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
    target.setCustomValidity("");
    setTagName(target.value);
  }

  /**
   * Handles validation of input with translation.
   *
   * @param {object} props
   * The props.
   * @param {object} props.target
   * event target
   */
  function handleValidationMessage({ target }) {
    const { message } = target.dataset;
    target.setCustomValidity(message);
  }

  /**
   * Redirects back to list.
   */
  function handleSubmit() {
    setSubmitted(true);
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
              {tag.name}
            </h1>
          )}
          <FormInput
            name="tag_name"
            type="text"
            label={tagLabel}
            required
            placeholder={tagPlaceholder}
            value={tagName}
            onChange={handleInput}
            data-message={validText}
            onInvalid={handleValidationMessage}
          />
          {submitted && <Redirect to="/tags" />}
          <Button
            variant="secondary"
            type="button"
            onClick={() => history.goBack()}
          >
            <FormattedMessage id="cancel" defaultMessage="cancel" />
          </Button>
          <Button variant="primary" type="submit">
            <FormattedMessage id="save_tag" defaultMessage="save_tag" />
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default EditTag;
