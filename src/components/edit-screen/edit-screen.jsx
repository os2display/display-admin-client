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
import RadioButtons from "../util/forms/radio-buttons";
import PlaylistDragAndDrop from "../playlist-drag-and-drop/playlist-drag-and-drop";

/**
 * The edit screen component.
 *
 * @returns {object}
 *   The edit screen page.
 */
function EditScreen() {
  const intl = useIntl();

  const history = useHistory();
  const radioButtonOptions = [
    {
      id: "horizontal",
      label: intl.formatMessage({
        id: "horizontal_layout",
      }),
    },
    {
      id: "vertical",
      label: intl.formatMessage({
        id: "vertical_layout",
      }),
    },
  ];
  const [formStateObject, setFormStateObject] = useState({
    locations: [],
    groups: [],
    screenLayout: 0,
    playlists: [],
    horizontal_or_vertical: radioButtonOptions[0].id,
  });
  const { id } = useParams();
  const [screenName, setScreenName] = useState([]);
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
          setScreenName(jsonData.screen.name);
          setFormStateObject({
            locations: jsonData.screen.locations,
            sizeOfScreen: jsonData.screen.sizeOfScreen,
            resolutionOfScreen: jsonData.screen.resolutionOfScreen,
            groups: jsonData.screen.groups,
            screenLayout: jsonData.screen.screenLayout,
            playlists: jsonData.screen.playlists,
            horizontal_or_vertical: jsonData.screen.horizontal_or_vertical,
            horizontal_or_vertical: radioButtonOptions[0].id,
            name: jsonData.screen.name,
            description: jsonData.screen.description,
            descriptionOfLocation: jsonData.screen.descriptionOfLocation,
          });
          // setScreen(jsonData.screen);
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
    if (target.setCustomValidity) {
      target.setCustomValidity("");
    }
    const localFormStateObject = { ...formStateObject };
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
              {screenName}
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
            value={formStateObject.name}
            onChange={handleInput}
            dataMessage={intl.formatMessage({
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
            placeholder={intl.formatMessage({
              id: "edit_add_screen_placeholder_description",
            })}
            value={formStateObject.description}
            onChange={handleInput}
            dataMessage={intl.formatMessage({
              id: "edit_add_screen_invalid_placeholder",
            })}
            onInvalid={handleValidationMessage}
          />
          <GroupsDropdown
            formId="groups"
            handleGroupsSelection={handleInput}
            selected={formStateObject.groups}
          />
          <LocationDropdown
            formId="locations"
            handleLocationSelection={handleInput}
            selected={formStateObject.locations}
          />
          {layoutOptions && (
            <Select
              name="screenLayout"
              onChange={handleInput}
              label={intl.formatMessage({
                id: "edit_add_screen_label_screen_layout",
              })}
              options={layoutOptions}
              required
              value={formStateObject.screenLayout}
              dataMessage={intl.formatMessage({
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
            value={formStateObject.descriptionOfLocation}
            onChange={handleInput}
            dataMessage={intl.formatMessage({
              id: "edit_add_screen_invalid_screen_description_of_location",
            })}
            onInvalid={handleValidationMessage}
          />
          <FormInput
            name="sizeOfScreen"
            type="text"
            label={intl.formatMessage({
              id: "edit_add_screen_label_size_of_screen",
            })}
            placeholder={intl.formatMessage({
              id: "edit_add_screen_placeholder_size_of_screen",
            })}
            value={formStateObject.sizeOfScreen}
            onChange={handleInput}
          />
          <RadioButtons
            options={radioButtonOptions}
            radioGroupName="horizontal_or_vertical"
            selected={formStateObject.horizontal_or_vertical}
            handleChange={handleInput}
            label={intl.formatMessage({
              id: "edit_add_screen_horizontal_or_vertical_label",
            })}
          />
          <FormInput
            name="resolutionOfScreen"
            type="text"
            label={intl.formatMessage({
              id: "edit_add_screen_label_resolution_of_screen",
            })}
            placeholder={intl.formatMessage({
              id: "edit_add_screen_placeholder_resolution_of_screen",
            })}
            value={formStateObject.resolutionOfScreen}
            helpText={intl.formatMessage({
              id: "edit_add_screen_helptext_resolution_of_screen",
            })}
            pattern="(\d+)x(\d+)"
            onChange={handleInput}
          />
          <PlaylistDragAndDrop
            handleChange={handleInput}
            formId="playlists"
            data={formStateObject.playlists}
          />
          {submitted && <Redirect to="/screens" />}
          <Button
            variant="secondary"
            type="button"
            onClick={() => history.goBack()}
          >
            <FormattedMessage id="cancel" defaultMessage="cancel" />
          </Button>
          <Button variant="primary" type="submit" id="save_screen">
            <FormattedMessage id="save_screen" defaultMessage="save_screen" />
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default EditScreen;
