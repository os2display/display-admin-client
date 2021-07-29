import { React, useEffect, useState } from "react";
import { Redirect, useParams } from "react-router";
import { Button, Container, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { FormattedMessage, useIntl } from "react-intl";
import FormInput from "../util/forms/form-input";
import LocationDropdown from "../util/forms/multiselect-dropdown/locations/location-dropdown";
import GroupsDropdown from "../util/forms/multiselect-dropdown/groups/groups-dropdown";
import Select from "../util/forms/select";
import FormInputArea from "../util/forms/form-input-area";
import RadioButtons from "../util/forms/radio-buttons";
import PlaylistDragAndDrop from "../playlist-drag-and-drop/playlist-drag-and-drop";
import getFormErrors from "../util/helpers/form-errors-helper";
/**
 * The edit screen component.
 *
 * @returns {object}
 *   The edit screen page.
 */
function EditScreen() {
  const intl = useIntl();
  const history = useHistory();
  const requiredFields = [
    "screenName",
    "screenLocations",
    "screenGroups",
    "screenLayout",
  ];
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
    screenLocations: [],
    screenGroups: [],
    screenLayout: "",
    playlists: [],
    horizontalOrVertical: radioButtonOptions[0].id,
  });
  const { id } = useParams();
  const [screenName, setScreenName] = useState([]);
  const [layoutOptions, setLayoutOptions] = useState();
  const [errors, setErrors] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const newScreen = id === "new";

  /**
   * Load content from fixture.
   */
  useEffect(() => {
    // @TODO load real content.
    if (!newScreen) {
      fetch("/fixtures/screens/screen.json")
        .then((response) => response.json())
        .then((jsonData) => {
          setScreenName(jsonData.screen.name);
          // Map existing screen to state.
          setFormStateObject({
            screenLocations: jsonData.screen.locations,
            sizeOfScreen: jsonData.screen.sizeOfScreen,
            resolutionOfScreen: jsonData.screen.resolutionOfScreen,
            screenGroups: jsonData.screen.groups,
            screenLayout: jsonData.screen.screenLayout,
            playlists: jsonData.screen.playlists,
            horizontalOrVertical: jsonData.screen.horizontalOrVertical,
            screenName: jsonData.screen.name,
            description: jsonData.screen.description,
            descriptionOfLocation: jsonData.screen.descriptionOfLocation,
          });
        });
    }
    fetch("/fixtures/screen-layout/screen-layout.json")
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
          errors={errors}
          name="screenName"
          type="text"
          label={intl.formatMessage({ id: "edit_add_screen_label_name" })}
          invalidText={intl.formatMessage({
            id: "edit_add_screen_label_name_invalid",
          })}
          placeholder={intl.formatMessage({
            id: "edit_add_screen_placeholder_name",
          })}
          value={formStateObject.screenName}
          onChange={handleInput}
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
        />
        <GroupsDropdown
          errors={errors}
          name="screenGroups"
          handleGroupsSelection={handleInput}
          selected={formStateObject.screenGroups}
        />
        <LocationDropdown
          errors={errors}
          name="screenLocations"
          handleLocationSelection={handleInput}
          selected={formStateObject.screenLocations}
        />
        {layoutOptions && (
          <Select
            name="screenLayout"
            onChange={handleInput}
            label={intl.formatMessage({
              id: "edit_add_screen_label_screenLayout",
            })}
            errors={errors}
            options={layoutOptions}
            value={formStateObject.screenLayout}
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
          radioGroupName="horizontalOrVertical"
          selected={formStateObject.horizontalOrVertical}
          handleChange={handleInput}
          label={intl.formatMessage({
            id: "edit_add_screen_horizontalOrVertical_label",
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
          id="playlist_drag_and_drop"
          handleChange={handleInput}
          name="playlists"
          data={formStateObject.playlists}
        />
        {submitted && <Redirect to="/screens" />}
        <Button
          variant="secondary"
          type="button"
          id="screen_cancel"
          onClick={() => history.goBack()}
        >
          <FormattedMessage id="cancel" defaultMessage="cancel" />
        </Button>
        <Button variant="primary" type="submit" id="save_screen">
          <FormattedMessage id="save_screen" defaultMessage="save_screen" />
        </Button>
      </Form>
    </Container>
  );
}

export default EditScreen;
