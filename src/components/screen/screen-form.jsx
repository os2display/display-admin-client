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
import SelectGroupsTable from "../util/multi-and-table/select-groups-table";
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

  useEffect(() => {
    if (layouts) {
      setLayoutOptions(layouts["hydra:member"]);
    }
  }, [layouts]);

  useEffect(() => {
    if (layoutOptions) {
      const localGrid = layoutOptions.find(
        (layout) => layout["@id"] === screen.layout
      );
      if (localGrid) {
        setGrid(localGrid);
      }
    }
  }, [screen.layout, layoutOptions]);
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
          {t("screen-form.loading")}
        </>
      )}
      {!isLoading && (
        <>
          <ContentBody>
            <h2 className="h4">{t("screen-form.screen-about")}</h2>
            <FormInput
              name="title"
              type="text"
              label={t("screen-form.screen-name-label")}
              invalidText={t("screen-form.screen-name-validation")}
              helpText={t("screen-form.screen-name-placeholder")}
              value={screen.title}
              onChange={handleInput}
            />
            <FormInputArea
              name="description"
              type="text"
              label={t("screen-form.screen-description-label")}
              helpText={t("screen-form.screen-description-placeholder")}
              value={screen.description}
              onChange={handleInput}
            />
          </ContentBody>
          <ContentBody>
            <h2 className="h4">{t("screen-form.screen-groups")}</h2>
            <SelectGroupsTable
              handleChange={handleInput}
              name="inScreenGroups"
              selectedDataEndpoint={screen.inScreenGroups}
            />
          </ContentBody>
          <ContentBody>
            <h2 className="h4">{t("screen-form.screen-location")}</h2>
            <FormInput
              name="location"
              type="text"
              required
              label={t("screen-form.screen-location-label")}
              helpText={t("screen-form.screen-location-placeholder")}
              value={screen.location}
              onChange={handleInput}
            />
          </ContentBody>
          <ContentBody>
            <h2 className="h4">{t("screen-form.screen-settings")}</h2>
            <FormInput
              name="size"
              type="text"
              label={t("screen-form.screen-size-of-screen-label")}
              helpText={t("screen-form.screen-size-of-screen-placeholder")}
              value={screen.size}
              onChange={handleInput}
            />
            <Row className="g-2">
              <Col md>
                <FormInput
                  name="dimensions.height"
                  type="number"
                  label={t("screen-form.screen-resolution-height")}
                  placeholder={t(
                    "screen-form.screen-resolution-of-screen-height-placeholder"
                  )}
                  value={screen.dimensions.height}
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
                  label={t("screen-form.screen-resolution-width")}
                  placeholder={t(
                    "screen-form.screen-resolution-of-screen-width-placeholder"
                  )}
                  value={screen.dimensions.width}
                  onChange={handleInput}
                />
              </Col>
            </Row>
          </ContentBody>
          <ContentBody>
            <h2 className="h4">{t("screen-form.screen-layout")}</h2>
            <div className="row">
              {layoutOptions && (
                <div className="col-md-8">
                  <Select
                    name="layout"
                    onChange={handleInput}
                    label={t("screen-form.screen-layout-label")}
                    options={layoutOptions}
                    value={screen.layout}
                  />
                </div>
              )}
              {grid?.grid && (
                <GridGenerationAndSelect
                  grid={grid?.grid}
                  vertical={screen.dimensions.height > screen.dimensions.width}
                  regions={grid.regions}
                  handleInput={handleInput}
                  selectedData={screen.layout}
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
          onClick={() => history.push("/screen/list/")}
          size="lg"
          className="me-3"
        >
          {t("screen-form.cancel-button")}
        </Button>
        <Button
          variant="primary"
          type="button"
          id="save_screen"
          size="lg"
          onClick={handleSubmit}
        >
          {t("screen-form.save-button")}
        </Button>
        <Toast show={isSaveSuccess} text={t("screen-form.saved")} />
        <Toast show={errors} text={t("screen-form.error")} />
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
  errors: PropTypes.oneOfType([
    PropTypes.objectOf(PropTypes.any),
    PropTypes.bool,
  ]).isRequired,
};

export default ScreenForm;
