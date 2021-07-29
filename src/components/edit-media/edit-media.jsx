import { React, useState, useEffect } from "react";
import { useParams, Redirect } from "react-router";
import { Container, Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useIntl, FormattedMessage } from "react-intl";
import getFormErrors from "../util/helpers/form-errors-helper";
import FormInput from "../util/forms/form-input";

/**
 * The edit media component.
 *
 * @returns {object}
 * The edit media page.
 */
function EditMedia() {
  const intl = useIntl();
  const [formStateObject, setFormStateObject] = useState({});
  const history = useHistory();
  const { id } = useParams();
  const [mediaName, setMediaName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const newMedia = id === "new";
  const [errors, setErrors] = useState([]);
  const mediaLabel = intl.formatMessage({ id: "edit_add_media_label" });
  const requiredFields = ["mediaName"];
  const mediaPlaceholder = intl.formatMessage({
    id: "edit_add_media_label_placeholder",
  });

  /**
   * Load content from fixture.
   */
  useEffect(() => {
    // @TODO load real content.
    if (!newMedia) {
      fetch(`/fixtures/media/media.json`)
        .then((response) => response.json())
        .then((jsonData) => {
          setFormStateObject({
            mediaName: jsonData.media.name,
          });
          setMediaName(jsonData.media.name);
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
          {newMedia && (
            <h1>
              <FormattedMessage
                id="upload_new_media"
                defaultMessage="upload_new_media"
              />
            </h1>
          )}
          {!newMedia && (
            <h1>
              <FormattedMessage id="edit_media" defaultMessage="edit_media" />
              {mediaName}
            </h1>
          )}
          <FormInput
            name="mediaName"
            type="text"
            errors={errors}
            label={mediaLabel}
            placeholder={mediaPlaceholder}
            value={formStateObject.mediaName}
            onChange={handleInput}
          />
          {submitted && <Redirect to="/media-list" />}
          <Button
            variant="secondary"
            type="button"
            id="media_cancel"
            onClick={() => history.goBack()}
          >
            <FormattedMessage id="cancel" defaultMessage="cancel" />
          </Button>
          <Button variant="primary" type="submit" id="save_media">
            <FormattedMessage id="save_media" defaultMessage="save_media" />
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default EditMedia;
