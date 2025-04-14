import { useContext, useEffect, useState } from "react";
import { Button, Form, Spinner, Alert, Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpand } from "@fortawesome/free-solid-svg-icons";
import ContentBody from "../util/content-body/content-body";
import FormInput from "../util/forms/form-input";
import FormInputArea from "../util/forms/form-input-area";
import SelectGroupsTable from "../util/multi-and-table/select-groups-table";
import GridGenerationAndSelect from "./util/grid-generation-and-select";
import MultiSelectComponent from "../util/forms/multiselect-dropdown/multi-dropdown";
import idFromUrl from "../util/helpers/id-from-url";
import {
  useGetV2LayoutsQuery,
  useGetV2ScreensByIdScreenGroupsQuery,
} from "../../redux/api/api.generated.ts";
import FormCheckbox from "../util/forms/form-checkbox";
import "./screen-form.scss";
import Preview from "../preview/preview";
import StickyFooter from "../util/sticky-footer";
import Select from "../util/forms/select";
import userContext from "../../context/user-context";
import ScreenStatus from "./screen-status";
import { displayError } from "../util/list/toast-component/display-toast";

/**
 * The screen form component.
 *
 * @param {object} props The props.
 * @param {object} props.screen Screen The screen object to modify in the form.
 * @param {Function} props.handleInput HandleInput Handles form input.
 * @param {string} props.headerText HeaderText Headline text.
 * @param {string} props.groupId The group id.
 * @param {boolean} props.isLoading Indicator of whether the form is loading
 * @param {string} props.loadingMessage The loading message for the spinner
 * @param {object} props.orientationOptions The options for the orientation dropdown
 * @param {object} props.resolutionOptions The options for the resolution dropdown
 * @param {Function} props.handleSubmitWithoutRedirect Handles form submit
 *   without redirect.
 * @param {Function} props.handleSubmitWithRedirect Handles form submit with redirect.
 * @returns {object} The screen form.
 */
function ScreenForm({
  handleSubmitWithoutRedirect,
  handleInput,
  handleSubmitWithRedirect,
  headerText,
  orientationOptions,
  resolutionOptions,
  groupId = "",
  isLoading = false,
  loadingMessage = "",
  screen = null,
}) {
  const { t } = useTranslation("common", { keyPrefix: "screen-form" });
  const { config } = useContext(userContext);
  const navigate = useNavigate();

  const [layoutError, setLayoutError] = useState(false);
  const [selectedLayout, setSelectedLayout] = useState();
  const [layoutOptions, setLayoutOptions] = useState();
  const { data: layouts } = useGetV2LayoutsQuery({
    page: 1,
    itemsPerPage: 20,
    order: { createdAt: "desc" },
  });
  const [displayPreview, setDisplayPreview] = useState(null);
  const [previewOverlayVisible, setPreviewOverlayVisible] = useState(false);
  const previewOrientationOptions = [
    {
      value: "horizontal",
      title: t("preview-orientation-landscape"),
      key: "horizontal",
    },
    {
      value: "vertical",
      title: t("preview-orientation-portrait"),
      key: "vertical",
    },
  ];
  const [previewOrientation, setPreviewOrientation] = useState(
    previewOrientationOptions[0].value
  );

  /**
   * Check if published is set
   *
   * @param {boolean} redirect Whether to redirect after submit
   */
  const checkInputsHandleSubmit = (redirect) => {
    setLayoutError(false);
    let submit = true;

    if (!selectedLayout) {
      displayError(t("remember-layout-error"));
      setLayoutError(true);
      submit = false;
    }

    if (submit) {
      if (redirect) {
        handleSubmitWithRedirect();
      } else {
        handleSubmitWithoutRedirect();
      }
    }
  };

  useEffect(() => {
    if (layouts) {
      setLayoutOptions(layouts["hydra:member"]);
    }
  }, [layouts]);

  useEffect(() => {
    if (layoutOptions) {
      const localSelectedLayout = layoutOptions.find(
        (layout) => layout["@id"] === screen.layout
      );
      if (localSelectedLayout) {
        setSelectedLayout(localSelectedLayout);
        // Initialize regions in the formstate object of screenmanager. used to save "empty" playlists, in the situation
        // we are deleting all playlists from a screen region
        handleInput({
          target: { id: "regions", value: localSelectedLayout.regions },
        });
      }
    }
  }, [screen.layout, layoutOptions]);

  /**
   * Adds group to list of groups.
   *
   * @param {object} props - The props.
   * @param {object} props.target - The target.
   */
  const handleAdd = ({ target }) => {
    const { value, id } = target;

    setSelectedLayout(value);
    handleInput({
      target: { id, value: value.map((item) => item["@id"]).shift() },
    });
  };

  const isVertical = () => {
    if (screen?.orientation?.length > 0) {
      return screen.orientation[0].id === "vertical";
    }
    return false;
  };

  return (
    <div>
      {isLoading && (
        <div className="spinner-overlay">
          <Spinner animation="border" className="loading-spinner" />
          {loadingMessage && <h2>{loadingMessage}</h2>}
        </div>
      )}
      <Form>
        <Row className="p-3">
          <h1 id="screenTitle">{headerText}</h1>

          <Col>
            <ContentBody>
              <h2 className="h4">{t("screen-about")}</h2>
              <FormInput
                name="title"
                type="text"
                label={t("screen-name-label")}
                invalidText={t("screen-name-validation")}
                helpText={t("screen-name-placeholder")}
                value={screen.title}
                onChange={handleInput}
              />
              <FormInputArea
                name="description"
                type="text"
                label={t("screen-description-label")}
                helpText={t("screen-description-placeholder")}
                value={screen.description}
                onChange={handleInput}
              />
            </ContentBody>
            {Object.prototype.hasOwnProperty.call(screen, "@id") && (
              <ContentBody>
                <h2 className="h4 mb-3">{t("bind-header")}</h2>
                <ScreenStatus screen={screen} handleInput={handleInput} />
              </ContentBody>
            )}
            <ContentBody>
              <h2 className="h4">{t("screen-groups")}</h2>
              <SelectGroupsTable
                handleChange={handleInput}
                name="inScreenGroups"
                id={groupId}
                getSelectedMethod={useGetV2ScreensByIdScreenGroupsQuery}
              />
            </ContentBody>
            <ContentBody>
              <h2 className="h4">{t("screen-location")}</h2>
              <FormInput
                name="location"
                type="text"
                required
                label={t("screen-location-label")}
                helpText={t("screen-location-placeholder")}
                value={screen.location}
                onChange={handleInput}
              />
            </ContentBody>
            <ContentBody>
              <h2 className="h4">{t("screen-settings")}</h2>
              <div className="mb-3">
                <FormInput
                  name="size"
                  type="text"
                  label={t("screen-size-of-screen-label")}
                  helpText={t("screen-size-of-screen-placeholder")}
                  value={screen.size}
                  onChange={handleInput}
                />
              </div>
              <MultiSelectComponent
                label={t("screen-resolution-label")}
                noSelectedString={t("nothing-selected-resolution")}
                handleSelection={handleInput}
                options={resolutionOptions}
                selected={screen.resolution || []}
                name="resolution"
                singleSelect
              />
              <MultiSelectComponent
                label={t("screen-orientation-label")}
                noSelectedString={t("nothing-selected-orientation")}
                handleSelection={handleInput}
                options={orientationOptions}
                selected={screen.orientation || []}
                name="orientation"
                singleSelect
              />
            </ContentBody>
            <ContentBody id="layout-section">
              <h2 className="h4">{t("screen-layout")}</h2>
              <div className="row">
                {layoutOptions && (
                  <div className="col-md-8">
                    <MultiSelectComponent
                      label={t("screen-layout-label")}
                      noSelectedString={t("nothing-selected-layout")}
                      handleSelection={handleAdd}
                      options={layoutOptions}
                      helpText={t("search-to-se-possible-selections")}
                      selected={selectedLayout ? [selectedLayout] : []}
                      name="layout"
                      error={layoutError}
                      singleSelect
                    />
                  </div>
                )}
                {selectedLayout &&
                  selectedLayout.grid &&
                  selectedLayout.regions &&
                  screen.layout && (
                    <GridGenerationAndSelect
                      screenId={idFromUrl(screen["@id"])}
                      grid={selectedLayout?.grid}
                      vertical={isVertical()}
                      regions={selectedLayout.regions}
                      handleInput={handleInput}
                    />
                  )}
              </div>
            </ContentBody>
            <ContentBody id="color-scheme-section">
              <h2 className="h4">{t("enable-color-scheme-change-headline")}</h2>
              <FormCheckbox
                name="enableColorSchemeChange"
                label={t("enable-color-scheme-change")}
                helpText={t("enable-color-scheme-change-helptext")}
                value={screen.enableColorSchemeChange}
                onChange={handleInput}
              />
            </ContentBody>
          </Col>

          {displayPreview && (
            <Col
              className="responsive-side shadow-sm p-3 mb-3 bg-body rounded me-3 sticky-top"
              style={{ top: "20px", maxWidth: "520px" }}
            >
              <h2 className="h4">{t("preview")}</h2>
              <div>
                <Alert
                  key="screen-preview-about"
                  variant="info"
                  className="mt-3"
                >
                  {t("preview-small-about")}
                </Alert>
                <div className="preview-actions mb-3">
                  <Select
                    isRequired
                    allowNull={false}
                    onChange={({ target }) =>
                      setPreviewOrientation(target.value)
                    }
                    required
                    name="preview-orientation"
                    options={previewOrientationOptions}
                    className="m-0"
                    value={previewOrientation}
                  />

                  <Button
                    variant="outline-secondary"
                    type="button"
                    id="preview_slide"
                    onClick={() =>
                      setPreviewOverlayVisible(!previewOverlayVisible)
                    }
                  >
                    <FontAwesomeIcon icon={faExpand} className="me-3" />
                    {t("preview-in-full-screen")}
                  </Button>
                </div>
                <Preview
                  id={idFromUrl(screen["@id"])}
                  mode="screen"
                  height={previewOrientation === "horizontal" ? 270 : 480}
                  width={previewOrientation === "horizontal" ? 480 : 270}
                  simulatedHeight={
                    previewOrientation === "horizontal" ? 1080 : 1920
                  }
                  simulatedWidth={
                    previewOrientation === "horizontal" ? 1920 : 1080
                  }
                />
              </div>
              {previewOverlayVisible && (
                <div
                  role="presentation"
                  className="preview-overlay d-flex justify-content-center align-items-center flex-column"
                >
                  <Button
                    variant="primary"
                    type="button"
                    className="preview-close-button"
                    onClick={() =>
                      setPreviewOverlayVisible(!previewOverlayVisible)
                    }
                  >
                    {t("preview-close-button")}
                  </Button>

                  <Preview id={idFromUrl(screen["@id"])} mode="screen" />

                  <Alert
                    key="slide-preview-about"
                    variant="info"
                    className="mt-3"
                  >
                    {t("screen-preview-about")}
                  </Alert>
                </div>
              )}
            </Col>
          )}
        </Row>

        <StickyFooter>
          <Button
            variant="secondary"
            type="button"
            id="cancel_screen"
            onClick={() => navigate("/screen/list")}
            className="margin-right-button"
          >
            {t("cancel-button")}
          </Button>
          <Button
            variant="outline-primary"
            type="button"
            className="margin-right-button"
            id="save_screen"
            onClick={() => checkInputsHandleSubmit(false)}
          >
            {t("save-button")}
          </Button>
          <Button
            variant="primary"
            type="button"
            onClick={() => checkInputsHandleSubmit(true)}
            id="save_slide_an_close"
            className="margin-right-button"
          >
            {t("save-button-and-close")}
          </Button>
          {config?.previewClient && (
            <Button
              variant="success"
              type="button"
              onClick={() => setDisplayPreview(!displayPreview)}
              id="toggle_display_preview"
              className="margin-right-button"
            >
              {displayPreview ? t("hide-preview") : t("show-preview")}
            </Button>
          )}
        </StickyFooter>
      </Form>
    </div>
  );
}

export default ScreenForm;
