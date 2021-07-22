import { React, useState, useEffect } from "react";
import { useParams, Redirect } from "react-router";
import { Container, Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useIntl, FormattedMessage } from "react-intl";
import getFormErrors from "../util/helpers/form-errors-helper";
import FormInput from "../util/forms/form-input";

/**
 * The edit location component.
 *
 * @returns {object}
 * The edit location page.
 */
function EditLocation() {
  const intl = useIntl();
  const [formStateObject, setFormStateObject] = useState({});
  const history = useHistory();
  const { id } = useParams();
  const [locationName, setLocationName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const newLocation = id === "new";
  const [errors, setErrors] = useState([]);
  const locationLabel = intl.formatMessage({ id: "edit_add_location_label" });
  const locationPlaceholder = intl.formatMessage({
    id: "edit_add_location_label_placeholder",
  });

  /**
   * Load content from fixture.
   */
  useEffect(() => {
    // @TODO load real content.
    if (!newLocation) {
      fetch(`/fixtures/locations/location.json`)
        .then((response) => response.json())
        .then((jsonData) => {
          setFormStateObject({
            location_name: jsonData.location.name,
          });
          setLocationName(jsonData.location.name);
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
    const createdErrors = getFormErrors(formStateObject, "location");
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
          {newLocation && (
            <h1>
              <FormattedMessage
                id="create_new_location"
                defaultMessage="create_new_location"
              />
            </h1>
          )}
          {!newLocation && (
            <h1>
              <FormattedMessage
                id="edit_location"
                defaultMessage="edit_location"
              />
              {locationName}
            </h1>
          )}
          <FormInput
            name="location_name"
            type="text"
            errors={errors}
            label={locationLabel}
            placeholder={locationPlaceholder}
            value={formStateObject.location_name}
            onChange={handleInput}
          />
          {submitted && <Redirect to="/locations" />}
          <Button
            variant="secondary"
            type="button"
            onClick={() => history.goBack()}
          >
            <FormattedMessage id="cancel" defaultMessage="cancel" />
          </Button>
          <Button variant="primary" type="submit" id="save_location">
            <FormattedMessage
              id="save_location"
              defaultMessage="save_location"
            />
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default EditLocation;
