import { React, useEffect, useState } from "react";
import { Button, Form, Spinner, Alert } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import ContentBody from "../util/content-body/content-body";
import ContentFooter from "../util/content-footer/content-footer";
import FormInput from "../util/forms/form-input";
import FormInputArea from "../util/forms/form-input-area";
import SelectGroupsTable from "../util/multi-and-table/select-groups-table";
import GridGenerationAndSelect from "./util/grid-generation-and-select";
import MultiSelectComponent from "../util/forms/multiselect-dropdown/multi-dropdown";
import idFromUrl from "../util/helpers/id-from-url";
import {
  api,
  useGetV1LayoutsQuery,
  useGetV1ScreensByIdScreenGroupsQuery,
} from "../../redux/api/api.generated";
import { displayError } from "../util/list/toast-component/display-toast";
import FormCheckbox from "../util/forms/form-checkbox";
import "./screen-form.scss";

/**
 * The screen form component.
 *
 * @param {object} props The props.
 * @param {object} props.screen Screen The screen object to modify in the form.
 * @param {Function} props.handleInput HandleInput Handles form input.
 * @param {Function} props.handleSubmit HandleSubmit Handles form submit.
 * @param {string} props.headerText HeaderText Headline text.
 * @param {string} props.groupId The group id.
 * @param {boolean} props.isLoading Indicator of whether the form is loading
 * @param {string} props.loadingMessage The loading message for the spinner
 * @param {object} props.orientationOptions The options for the orientation dropdown
 * @param {object} props.resolutionOptions The options for the resolution dropdown
 * @returns {object} The screen form.
 */
function ScreenForm({
  screen,
  handleInput,
  handleSubmit,
  headerText,
  groupId,
  isLoading,
  loadingMessage,
  orientationOptions,
  resolutionOptions,
}) {
  const { t } = useTranslation("common", { keyPrefix: "screen-form" });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedLayout, setSelectedLayout] = useState();
  const [layoutOptions, setLayoutOptions] = useState();
  const [bindKey, setBindKey] = useState("");
  const { data: layouts } = useGetV1LayoutsQuery({
    page: 1,
    itemsPerPage: 20,
    order: { createdAt: "desc" },
  });

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

  const handleBindScreen = () => {
    if (bindKey) {
      dispatch(
        api.endpoints.postScreenBindKey.initiate({
          id: idFromUrl(screen["@id"]),
          screenBindObject: JSON.stringify({
            bindKey,
          }),
        })
      ).then((response) => {
        if (response.error) {
          const err = response.error;
          displayError(
            t("error-messages.error-binding", {
              status: err.status,
            }),
            err
          );
        } else {
          // Set screenUser to true, to indicate it has been set.
          handleInput({ target: { id: "screenUser", value: true } });
        }
      });
    }
  };

  const handleUnbindScreen = () => {
    if (screen?.screenUser) {
      setBindKey("");

      dispatch(
        api.endpoints.postScreenUnbind.initiate({
          id: idFromUrl(screen["@id"]),
        })
      ).then((response) => {
        if (response.error) {
          const err = response.error;
          displayError(
            t("error-messages.error-unbinding", {
              status: err.status,
            }),
            err
          );
        } else {
          // Set screenUser to null, to indicate it has been removed.
          handleInput({ target: { id: "screenUser", value: null } });
        }
      });
    }
  };

  const isVertical = () => {
    if (screen.orientation) {
      return screen.orientation[0].id === "vertical";
    }
    return false;
  };

  return (
    <>
      {isLoading && (
        <div className="spinner-overlay">
          <Spinner animation="border" className="loading-spinner" />
          {loadingMessage && <h2>{loadingMessage}</h2>}
        </div>
      )}
      <Form>
        <h1 id="screenTitle">{headerText}</h1>
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
            {screen?.screenUser && (
              <>
                <div className="mb-3">
                  <Alert key="screen-bound" variant="success">
                    {t("already-bound")}
                  </Alert>
                </div>
                <Button onClick={handleUnbindScreen}>{t("unbind")}</Button>
              </>
            )}
            {!screen?.screenUser && (
              <>
                <div className="mb-3">
                  <Alert key="screen-not-bound" variant="danger">
                    {t("not-bound")}
                  </Alert>
                </div>
                <FormInput
                  onChange={({ target }) => {
                    setBindKey(target?.value);
                  }}
                  name="bindKey"
                  value={bindKey}
                  label={t("bindkey-label")}
                  className="mb-3"
                />
                <Button onClick={handleBindScreen}>{t("bind")}</Button>
              </>
            )}
          </ContentBody>
        )}
        <ContentBody>
          <h2 className="h4">{t("screen-groups")}</h2>
          <SelectGroupsTable
            handleChange={handleInput}
            name="inScreenGroups"
            id={groupId}
            getSelectedMethod={useGetV1ScreensByIdScreenGroupsQuery}
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
            selected={screen.resolution || ""}
            name="resolution"
            singleSelect
          />
          <MultiSelectComponent
            label={t("screen-orientation-label")}
            noSelectedString={t("nothing-selected-orientation")}
            handleSelection={handleInput}
            options={orientationOptions}
            selected={screen.orientation || ""}
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
                  singleSelect
                />
              </div>
            )}
            {selectedLayout &&
              selectedLayout.grid &&
              selectedLayout.regions && (
                <GridGenerationAndSelect
                  screenId={idFromUrl(screen["@id"])}
                  grid={selectedLayout?.grid}
                  vertical={isVertical()}
                  regions={selectedLayout.regions}
                  handleInput={handleInput}
                  selectedData={screen.layout}
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
        <ContentFooter>
          <Button
            variant="secondary"
            type="button"
            id="cancel_screen"
            onClick={() => navigate("/screen/list")}
            size="lg"
            className="margin-right-button"
          >
            {t("cancel-button")}
          </Button>
          <Button
            variant="primary"
            type="button"
            id="save_screen"
            size="lg"
            onClick={handleSubmit}
          >
            {t("save-button")}
          </Button>
        </ContentFooter>
      </Form>
    </>
  );
}

ScreenForm.defaultProps = {
  groupId: "",
  isLoading: false,
  loadingMessage: "",
  screen: null,
};

ScreenForm.propTypes = {
  screen: PropTypes.shape({
    resolution: PropTypes.string,
    "@id": PropTypes.string,
    description: PropTypes.string,
    orientation: PropTypes.string,
    enableColorSchemeChange: PropTypes.bool,
    layout: PropTypes.string,
    location: PropTypes.string,
    regions: PropTypes.arrayOf(PropTypes.string),
    screenUser: PropTypes.string,
    size: PropTypes.string,
    title: PropTypes.string,
    playlists: PropTypes.arrayOf(
      PropTypes.shape({ name: PropTypes.string, id: PropTypes.number })
    ),
  }),
  handleInput: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  headerText: PropTypes.string.isRequired,
  groupId: PropTypes.string,
  isLoading: PropTypes.bool,
  loadingMessage: PropTypes.string,
  orientationOptions: PropTypes.arrayOf(
    PropTypes.shape({ title: PropTypes.string, id: PropTypes.string })
  ).isRequired,
  resolutionOptions: PropTypes.arrayOf(
    PropTypes.shape({ title: PropTypes.string, id: PropTypes.string })
  ).isRequired,
};

export default ScreenForm;
