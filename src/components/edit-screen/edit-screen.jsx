import { React, useEffect, useState } from "react";
import { Redirect, useParams } from "react-router";
import { Button, Container, Form } from "react-bootstrap";
import FormInput from "../util/forms/form-input";
import LocationDropdown from "../util/forms/multiselect-dropdown/locations/location-dropdown";
import GroupsDropdown from "../util/forms/multiselect-dropdown/groups/groups-dropdown";
import Select from "../util/forms/select";
import FormInputArea from "../util/forms/form-input-area";
import RadioButtons from "../util/forms/radio-buttons";
import PlaylistDragAndDrop from "../playlist-drag-and-drop/playlist-drag-and-drop";
import getFormErrors from "../util/helpers/form-errors-helper";
import { useTranslation } from "react-i18next";

/**
 * The edit screen component.
 *
 * @returns {object}
 *   The edit screen page.
 */
function EditScreen() {
  const { t } = useTranslation("common");
  const requiredFields = [
    "screenName",
    "screenLocations",
    "screenGroups",
    "screenLayout",
  ];
  const radioButtonOptions = [
    {
      id: "horizontal",
      label: t("edit-screen.radio-button-horizontal"),
    },
    {
      id: "vertical",
      label: t("edit-screen.radio-button-vertical"),
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
        {newScreen && <h1>{t("edit-screen.create-new-screen")}</h1>}
        {!newScreen && (
          <h1>
            {t("edit-screen.edit-screen")}: {screenName}
          </h1>
        )}
        <FormInput
          errors={errors}
          name="screenName"
          type="text"
          label={t("edit-screen.screen-name-label")}
          invalidText={t("edit-screen.screen-name-validation")}
          placeholder={t("edit-screen.screen-name-placeholder")}
          value={formStateObject.screenName}
          onChange={handleInput}
        />
        <FormInputArea
          name="description"
          type="text"
          label={t("edit-screen.screen-description-label")}
          placeholder={t("edit-screen.screen-description-placeholder")}
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
            label={t("edit-screen.screen-layout-label")}
            errors={errors}
            options={layoutOptions}
            value={formStateObject.screenLayout}
          />
        )}
        <FormInput
          name="descriptionOfLocation"
          type="text"
          required
          label={t("edit-screen.screen-description-of-location-label")}
          placeholder={t(
            "edit-screen.screen-description-of-location-placeholder"
          )}
          value={formStateObject.descriptionOfLocation}
          onChange={handleInput}
        />
        <FormInput
          name="sizeOfScreen"
          type="text"
          label={t("edit-screen.screen-size-of-screen-label")}
          placeholder={t("edit-screen.screen-size-of-screen-placeholder")}
          value={formStateObject.sizeOfScreen}
          onChange={handleInput}
        />
        <RadioButtons
          options={radioButtonOptions}
          radioGroupName="horizontalOrVertical"
          selected={formStateObject.horizontalOrVertical}
          handleChange={handleInput}
          label={t("edit-screen.radio-buttons-horizontal-or-vertical-label")}
        />
        <FormInput
          name="resolutionOfScreen"
          type="text"
          label={t("edit-screen.screen-resolution-of-screen-label")}
          placeholder={t("edit-screen.screen-resolution-of-screen-placeholder")}
          value={formStateObject.resolutionOfScreen}
          helpText={t("edit-screen.screen-resolution-of-screen-helptext")}
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
          {t("edit-screen.cancel-button")}
        </Button>
        <Button variant="primary" type="submit" id="save_screen">
          {t("edit-screen.save-button")}
        </Button>
      </Form>
    </Container>
  );
}

export default EditScreen;
