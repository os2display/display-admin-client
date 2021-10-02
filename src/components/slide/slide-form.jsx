import { React, useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import Toast from "../util/toast/toast";
import ContentBody from "../util/content-body/content-body";
import ContentFooter from "../util/content-footer/content-footer";
// import SelectScreenTable from "../util/multi-and-table/select-screen-table";
import SelectPlaylistTable from "../util/multi-and-table/select-playlists-table";
// import RenderFormElement from "../util/forms/render-form-element";
import Select from "../util/forms/select";
import { useGetV1TemplatesQuery } from "../../redux/api/api.generated";
import FormInput from "../util/forms/form-input";
import FormCheckbox from "../util/forms/form-checkbox";

/**
 * The slide form component.
 *
 * @param {object} props - The props.
 * @param {object} props.slide The slide object to modify in the form.
 * @param {Function} props.handleInput Handles form input.
 * @param {Function} props.handleSubmit Handles form submit.
 * @param {boolean} props.isSaving Is the form saving?
 * @param {string} props.headerText Headline text.
 * @param {boolean|null} props.isSaveSuccess Is the save a success?
 * @param {boolean|null} props.isLoading The data is loading.
 * @param {Array} props.errors Array of errors.
 * @returns {object} The slide form.
 */
function SlideForm({
  slide,
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
  const [templateOptions, setTemplateOptions] = useState([]);
  const { data: templates, isLoading: loadingTemplates } =
    useGetV1TemplatesQuery({
      page: 1,
    });
  /**
   * Set loaded data into form state.
   */

  useEffect(() => {
    if (templates) {
      setTemplateOptions(templates["hydra:member"]);
    }
  }, [templates]);

  return (
    <Form>
      <h1>{headerText}</h1>
      {isLoading && (
        <>
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
            className="m-1"
          />
          {t("edit-slide.loading")}
        </>
      )}
      {isSaving && (
        <>
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
            className="m-1"
          />
          {t("edit-slide.saving")}
        </>
      )}
      {loadingTemplates && !isLoading && (
        <>
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
            className="m-1"
          />
          {t("edit-slide.loading-templates")}
        </>
      )}
      {!isLoading && (
        <>
          <ContentBody>
            <FormInput
              name="title"
              type="text"
              label={t("edit-slide.slide-name-label")}
              helpText={t("edit-slide.slide-name-placeholder")}
              value={slide.title}
              onChange={handleInput}
            />
          </ContentBody>
          {templateOptions && (
            <ContentBody>
              <Select
                value={slide.templateInfo}
                isRequired
                name="templateInfo"
                options={templateOptions}
                onChange={handleInput}
                label={t("edit-slide.slide-template-label")}
                helpText={t("edit-slide.slide-template-help-text")}
              />
            </ContentBody>
          )}
          {slide.slideTemplate && (
            // todo fetch form data
            <ContentBody>
              {/* Render slide form from jsondata */}
              {/* <section className="row">
                {formData.map((data) => (
                  <RenderFormElement
                    key={data.name}
                    data={data}
                    onChange={handleInput}
                    slide={slide}
                  />
                ))}
              </section> */}
            </ContentBody>
          )}
          <ContentBody>
            <h3 className="h4">
              {t("edit-slide.slide-select-playlist-title")}
            </h3>
            {/* todo select playlst will work when onscreen can be fetched */}
            <SelectPlaylistTable
              handleChange={handleInput}
              name="onPlaylists"
              selectedDataEndpoint={slide.onPlaylists}
            />
          </ContentBody>
          <ContentBody>
            <h3 className="h4">{t("edit-slide.slide-publish-title")}</h3>
            <FormCheckbox
              label={t("edit-slide.slide-publish-label")}
              onChange={handleInput}
              name="published"
              value={slide.published}
            />
          </ContentBody>
        </>
      )}
      <ContentFooter>
        <Button
          variant="secondary"
          type="button"
          id="slide_cancel"
          onClick={() => history.push("/slide/list/")}
          className="me-md-3 col"
          size="lg"
        >
          {t("edit-slide.cancel-button")}
        </Button>
        <Button
          variant="primary"
          type="button"
          onClick={handleSubmit}
          id="save_slide"
          size="lg"
          className="col"
        >
          {t("edit-slide.save-button")}
        </Button>
        <Toast show={isSaveSuccess} text={t("edit-slide.saved")} />
        <Toast show={!!errors} text={t("edit-slide.error")} />
      </ContentFooter>
    </Form>
  );
}

SlideForm.propTypes = {
  slide: PropTypes.objectOf(PropTypes.any).isRequired,
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

export default SlideForm;
