import { React, useState, useEffect } from "react";
import { useParams } from "react-router";
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
  const newTag = id === "new";
  const validText = intl.formatMessage({ id: "valid_text_tag_name_input" });

  /**
   * Load content from fixture.
   */
  useEffect(() => {
    // @TODO load real content.
    if (!newTag) {
      fetch("http://localhost:3000/fixtures/tags/tag.json")
        .then((response) => response.json())
        .then((jsonData) => {
          setTag(jsonData.tag);
          setTagName(jsonData.tag.name);
        });
    }
  }, []);

  /**
   * @param newTagName
   */
  function handleInput(newTagName) {
    setTagName(newTagName);
  }

  /**
   * @param root0
   * @param root0.target
   */
  function handleValidationMessage({ target }) {
    const { message } = target.dataset;
    target.setCustomValidity(message);
  }

  return (
    <>
      <Container>
        <Form>
          {newTag && <h1>create tag!</h1>}
          {!newTag && <h1>Edit tag {tag.name}!</h1>}
          <FormInput
            name="tag_name"
            type="text"
            label="Taggets navn"
            required
            placeholder="Udfyld taggets navn"
            value={tagName}
            onChange={(e) => handleInput(e.currentTarget.value)}
            data-message={validText}
            onInvalid={handleValidationMessage}
          />
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
