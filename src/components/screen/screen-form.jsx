import { React, useEffect, useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import ContentBody from "../util/content-body/content-body";
import Select from "../util/forms/select";
import ContentFooter from "../util/content-footer/content-footer";
import FormInput from "../util/forms/form-input";
import FormInputArea from "../util/forms/form-input-area";
// import GroupsDropdown from "../util/forms/multiselect-dropdown/groups/groups-dropdown";
// import LocationDropdown from "../util/forms/multiselect-dropdown/locations/location-dropdown";
import RadioButtons from "../util/forms/radio-buttons";
import GridGenerationAndSelect from "./grid-generation-and-select";
import Toast from "../util/toast/toast";
import { useGetV1LayoutsQuery } from "../../redux/api/api.generated";
import "./screen-form.scss";

/**
 * The screen form component.
 *
 * @param {object} props - The props.
 * @param {object} props.screen - screen The screen object to modify in the form.
 * @param {Function} props.handleInput - handleInput Handles form input.
 * @param {Function} props.handleSubmit - handleSubmit Handles form submit.
 * @param {boolean} props.isSaving - isSaving Is the form saving?
 * @param {string} props.headerText - headerText Headline text.
 * @param {boolean|null} props.isSaveSuccess - isSaveSuccess Is the save a success?
 * @param {boolean|null} props.isLoading - isLoading The data is loading.
 * @param {Array} props.errors - errors Array of errors.
 * @returns {object} The screen form.
 */
function ScreenForm({
  screen,
  handleInput,
  handleSubmit,
  isSaving,
  headerText,
  isSaveSuccess,
  isLoading,
  errors,
}) {
  const { t } = useTranslation("common");
  const history = useHistory();
  const [grid, setGrid] = useState();
  const [layoutOptions, setLayoutOptions] = useState();
  const { data: layouts } = useGetV1LayoutsQuery({
    page: 1,
  });

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

  useEffect(() => {
    if (layouts) {
      setLayoutOptions(layouts["hydra:member"]);
    }
  }, [layouts]);

  useEffect(() => {
    if (layoutOptions) {
      const localGrid = layoutOptions.find(
        (layout) => layout.id === screen.screenLayout
      );
      if (localGrid) {
        setGrid(localGrid);
      }
    }
  }, [screen.screenLayout, layoutOptions]);

  return (
    <Form>
      <h1>{headerText}</h1>
      {(isLoading || isSaving) && (
        <>
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
            className="m-1"
          />
          {t("edit-screen.loading")}
        </>
      )}
      {!isLoading && (
        <>
          <ContentBody>
            <h2 className="h4">{t("edit-screen.screen-about")}</h2>
            <FormInput
              errors={errors}
              name="title"
              type="text"
              label={t("edit-screen.screen-name-label")}
              invalidText={t("edit-screen.screen-name-validation")}
              helpText={t("edit-screen.screen-name-placeholder")}
              value={screen.title}
              onChange={handleInput}
            />
            <FormInputArea
              name="description"
              type="text"
              label={t("edit-screen.screen-description-label")}
              helpText={t("edit-screen.screen-description-placeholder")}
              value={screen.description}
              onChange={handleInput}
            />
          </ContentBody>
          <ContentBody>
            <h2 className="h4">{t("edit-screen.screen-groups")}</h2>
            {/* @TODO: make work when relevant data from api */}
            {/* <GroupsDropdown
              errors={errors}
              name="screenGroups"
              isCreatable
              handleGroupsSelection={handleInput}
              selected={screen.screenGroups}
            /> */}
          </ContentBody>
          <ContentBody>
            {/* @TODO: connect location to api data */}
            <h2 className="h4">{t("edit-screen.screen-location")}</h2>
            {/* <LocationDropdown
              errors={errors}
              isCreatable
              name="screenLocations"
              handleLocationSelection={handleInput}
              selected={screen.screenLocations}
              formGroupClasses="mb-3"
            /> */}
            <FormInput
              name="descriptionOfLocation"
              type="text"
              required
              label={t("edit-screen.screen-description-of-location-label")}
              helpText={t(
                "edit-screen.screen-description-of-location-placeholder"
              )}
              value={screen.descriptionOfLocation}
              onChange={handleInput}
            />
          </ContentBody>
          <ContentBody>
            <h2 className="h4">{t("edit-screen.screen-settings")}</h2>
            <FormInput
              name="size"
              type="text"
              label={t("edit-screen.screen-size-of-screen-label")}
              helpText={t("edit-screen.screen-size-of-screen-placeholder")}
              value={screen.size}
              onChange={handleInput}
            />
            <RadioButtons
              options={radioButtonOptions}
              radioGroupName="horizontalOrVertical"
              selected={screen.horizontalOrVertical}
              handleChange={handleInput}
              label={t(
                "edit-screen.radio-buttons-horizontal-or-vertical-label"
              )}
            />
            <Row className="g-2">
              <Col md>
                <FormInput
                  name="dimensions.height"
                  type="number"
                  label={t("edit-screen.screen-resolution-height")}
                  placeholder={t(
                    "edit-screen.screen-resolution-of-screen-height-placeholder"
                  )}
                  value={screen.dimensions?.height || ""}
                  onChange={handleInput}
                />
              </Col>
              <FontAwesomeIcon
                className="resolution-plus-icon"
                icon={faTimes}
              />
              <Col md>
                <FormInput
                  name="dimensions.width"
                  type="number"
                  label={t("edit-screen.screen-resolution-width")}
                  placeholder={t(
                    "edit-screen.screen-resolution-of-screen-width-placeholder"
                  )}
                  value={screen.dimensions?.width || ""}
                  onChange={handleInput}
                />
              </Col>
            </Row>
          </ContentBody>
          <ContentBody>
            <h2 className="h4">{t("edit-screen.screen-layout")}</h2>
            <div className="row">
              {layoutOptions && (
                <div className="col-md-8">
                  <Select
                    name="screenLayout"
                    onChange={handleInput}
                    label={t("edit-screen.screen-layout-label")}
                    errors={errors}
                    options={layoutOptions}
                    value={screen.screenLayout}
                  />
                </div>
              )}
              {grid?.grid && (
                <GridGenerationAndSelect
                  grid={grid?.grid}
                  layout={screen.horizontalOrVertical}
                  regions={grid?.regions}
                  handleInput={handleInput}
                  selectedData={screen.screenLayout}
                />
              )}
            </div>
          </ContentBody>
        </>
      )}
      <ContentFooter>
        <Button
          variant="secondary"
          type="button"
          id="screen_cancel"
          onClick={() => history.goBack()}
          size="lg"
          className="me-3"
        >
          {t("edit-screen.cancel-button")}
        </Button>
        <Button
          variant="primary"
          type="button"
          id="save_screen"
          size="lg"
          onClick={handleSubmit}
        >
          {t("edit-screen.save-button")}
        </Button>
        <Toast show={isSaveSuccess} text={t("edit-screen.saved")} />
        <Toast show={errors} text={t("edit-screen.error")} />
      </ContentFooter>
    </Form>
  );
}

ScreenForm.propTypes = {
  screen: PropTypes.objectOf(PropTypes.any).isRequired,
  handleInput: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isSaving: PropTypes.bool.isRequired,
  headerText: PropTypes.string.isRequired,
  isSaveSuccess: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  errors: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default ScreenForm;
