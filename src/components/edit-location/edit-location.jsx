import { React, useEffect, useState } from "react";
import { Redirect, useParams } from "react-router";
import { Button, Container, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import getFormErrors from "../util/helpers/form-errors-helper";
import FormInput from "../util/forms/form-input";
import SelectScreenTable from "../util/multi-and-table/select-screen-table";
import { useTranslation } from "react-i18next";

/**
 * The edit location component.
 *
 * @returns {object}
 * The edit location page.
 */
function EditLocation() {
  const { t } = useTranslation("common");
  const requiredFields = ["locationName", "locationScreens"];
  const [formStateObject, setFormStateObject] = useState({
    locationScreens: [],
  });
  const history = useHistory();
  const { id } = useParams();
  const [locationName, setLocationName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const newLocation = id === "new";
  const [errors, setErrors] = useState([]);

  /**
   * Load content from fixture.
   */
  useEffect(() => {
    // @TODO load real content.
    if (!newLocation) {
      fetch("/fixtures/locations/location.json")
        .then((response) => response.json())
        .then((jsonData) => {
          setFormStateObject({
            locationName: jsonData.location.name,
            locationScreens: jsonData.location.onFollowingScreens,
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
          {newLocation && <h1>{t("edit-location.create-new-location")}</h1>}
          {!newLocation && (
            <h1>
              {t("edit-location.edit-location")}: {locationName}
            </h1>
          )}
          <FormInput
            name="locationName"
            type="text"
            errors={errors}
            label={t("edit-location.location-name-label")}
            placeholder={t("edit-location.location-name-placeholder")}
            value={formStateObject.locationName}
            onChange={handleInput}
          />
          <SelectScreenTable
            handleChange={handleInput}
            name="locationScreens"
            errors={errors}
            selectedData={formStateObject.locationScreens}
          />
          {submitted && <Redirect to="/locations" />}
          <Button
            variant="secondary"
            type="button"
            id="location_cancel"
            onClick={() => history.goBack()}
          >
            {t("edit-location.cancel-button")}
          </Button>
          <Button variant="primary" type="submit" id="save_location">
            {t("edit-location.save-button")}
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default EditLocation;
