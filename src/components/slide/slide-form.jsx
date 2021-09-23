import { React, useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import Toast from "../util/toast/toast";
import { useTranslation } from "react-i18next";
import ContentBody from "../util/content-body/content-body";
import ContentFooter from "../util/content-footer/content-footer";
import SelectScreenTable from "../util/multi-and-table/select-screen-table";
import { useHistory } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Select from "../util/forms/select";
import { useGetV1TemplatesQuery } from "../../redux/api/api.generated";
import FormInput from "../util/forms/form-input";
import RenderFormElement from "../util/forms/render-form-element";
import FormCheckbox from "../util/forms/form-checkbox";
import SelectPlaylistTable from "../util/multi-and-table/select-playlists-table";

/**
 * The slide form component.
 *
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
  const [displaySaveSuccess, setDisplaySaveSuccess] = useState(false);
  const displaySaveSuccessMilliseconds = 5000;
  const [templateOptions, setTemplateOptions] = useState([]);
  const { data: templates, isLoading: loadingTemplates } =
    useGetV1TemplatesQuery({
      page: 1,
    });

  useEffect(() => {
    if (templates) {
      setTemplateOptions(templates["hydra:member"]);
    }
  }, [templates]);

  return (
    <Form>
      <Toast text={t("edit-slide.saved")} show={isSaveSuccess} />
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
              errors={errors}
              label={t("edit-slide.slide-name-label")}
              helpText={t("edit-slide.slide-name-placeholder")}
              value={slide.title}
              onChange={handleInput}
            />
          </ContentBody>
          {templateOptions && (
            <ContentBody>
              <Select
                value={slide.template}
                name="template"
                options={templateOptions}
                onChange={handleInput}
                label={t("edit-slide.slide-template-label")}
                helpText={t("edit-slide.slide-template-help-text")}
                errors={errors}
              />
            </ContentBody>
          )}
          {slide.slideTemplate && (
            // todo fetch form data
            <ContentBody>
              <section className="row">
                {/* Render slide form from jsondata */}
                {formData.map((data) => (
                  <RenderFormElement
                    key={data.name}
                    data={data}
                    errors={errors}
                    onChange={handleInput}
                    slide={slide}
                    requiredFieldCallback={handleRequiredField}
                  />
                ))}
              </section>
            </ContentBody>
          )}
          <ContentBody>
            <h3 className="h4">{t("edit-slide.slide-select-screen-title")}</h3>
            {/* todo select screen will work when onscreen can be fetched */}
            {/* <SelectScreenTable
              handleChange={handleInput}
              name="onScreens"
              errors={errors}
              selectedData={slide.onScreens}
            /> */}
          </ContentBody>
          <ContentBody>
            <h3 className="h4">
              {t("edit-slide.slide-select-playlist-title")}
            </h3>
            {/* todo select playlst will work when onscreen can be fetched */}
            {/* <SelectPlaylistTable
              handleChange={handleInput}
              name="onPlaylists"
              errors={errors}
              selectedData={slide.onPlaylists}
            /> */}
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
          onClick={() => history.goBack()}
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
      </ContentFooter>
    </Form>
  );
}

export default SlideForm;
