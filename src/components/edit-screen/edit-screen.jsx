import { React, useState, useEffect } from "react";
import { useParams, Redirect } from "react-router";
import { Container, Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useIntl, FormattedMessage } from "react-intl";
import FormInput from "../util/forms/form-input";
import LocationDropdown from "../util/forms/multiselect-dropdown/locations/location-dropdown";
import GroupsDropdown from "../util/forms/multiselect-dropdown/groups/groups-dropdown";
import Select from "../util/forms/select";
import FormInputArea from "../util/forms/form-input-area";

/**
 * The edit screen component.
 *
 * @returns {object}
 *   The edit screen page.
 */
function EditScreen() {
  const intl = useIntl();
  const history = useHistory();
  const [formStateObject, setFormStateObject] = useState({
    locations: [],
    groups: [],
    screenLayout: [],
  });
  const { id } = useParams();
  const [screen, setScreen] = useState([]);
  const [screenName, setScreenName] = useState("");
  const [layoutOptions, setLayoutOptions] = useState();
  const [submitted, setSubmitted] = useState(false);
  const newScreen = id === "new";

  /**
   * Load content from fixture.
   */
  useEffect(() => {
    // @TODO load real content.
    if (!newScreen) {
      fetch("http://localhost:3000/fixtures/screens/screen.json")
        .then((response) => response.json())
        .then((jsonData) => {
          setScreen(jsonData.screen);
          setScreenName(jsonData.screen.name);
        });
    }
    fetch("http://localhost:3000/fixtures/screen-layout/screen-layout.json")
      .then((response) => response.json())
      .then((jsonData) => {
        setLayoutOptions(jsonData.layouts);
      });
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
    let localFormStateObject = { ...formStateObject };
    localFormStateObject[target.id] = target.value;
    setFormStateObject(localFormStateObject);
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
        <div>{JSON.stringify(formStateObject)}</div>
        <Form onSubmit={handleSubmit}>
          {newScreen && (
            <h1>
              <FormattedMessage
                id="create_new_screen"
                defaultMessage="create_new_screen"
              />
            </h1>
          )}
          {!newScreen && (
            <h1>
              <FormattedMessage id="edit_screen" defaultMessage="edit_screen" />
              {screen.name}
            </h1>
          )}

          <FormInput
            name="name"
            type="text"
            label={intl.formatMessage({ id: "edit_add_screen_label_name" })}
            required
            placeholder={intl.formatMessage({
              id: "edit_add_screen_placeholder_name",
            })}
            value={formStateObject["name"]}
            onChange={handleInput}
            data-message={intl.formatMessage({
              id: "edit_add_screen_invalid_name",
            })}
            onInvalid={handleValidationMessage}
          />
          <FormInputArea
            name="description"
            type="text"
            label={intl.formatMessage({
              id: "edit_add_screen_label_description",
            })}
            required
            placeholder={intl.formatMessage({
              id: "edit_add_screen_placeholder_description",
            })}
            value={formStateObject["description"]}
            onChange={handleInput}
            data-message={intl.formatMessage({
              id: "edit_add_screen_invalid_placeholder",
            })}
            onInvalid={handleValidationMessage}
          ></FormInputArea>
          <GroupsDropdown
            formId="groups"
            handleGroupsSelection={handleInput}
            selected={formStateObject["groups"]}
          />
          <LocationDropdown
            formId="locations"
            handleLocationSelection={handleInput}
            selected={formStateObject["locations"]}
          />
          {layoutOptions && (
            <Select
              name="screenLayout"
              onChange={handleInput}
              label={intl.formatMessage({
                id: "edit_add_screen_label_screen_layout",
              })}
              options={layoutOptions}
              required={true}
              selected={formStateObject["screenLayout"]}
              data-message={intl.formatMessage({
                id: "edit_add_screen_invalid_screen_layout",
              })}
              onInvalid={handleValidationMessage}
            />
          )}
          <FormInput
            name="descriptionOfLocation"
            type="text"
            label={intl.formatMessage({
              id: "edit_add_screen_label_description_of_location",
            })}
            required
            placeholder={intl.formatMessage({
              id: "edit_add_screen_placeholder_description_of_location",
            })}
            value={formStateObject["descriptionOfLocation"]}
            onChange={handleInput}
            data-message={intl.formatMessage({
              id: "edit_add_screen_invalid_screen_description_of_location",
            })}
            onInvalid={handleValidationMessage}
          />
          {submitted && <Redirect to="/screens" />}
          <Button
            variant="secondary"
            type="button"
            onClick={() => history.goBack()}
          >
            <FormattedMessage id="cancel" defaultMessage="cancel" />
          </Button>
          <Button variant="primary" type="submit">
            <FormattedMessage id="save_screen" defaultMessage="save_screen" />
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default EditScreen;
