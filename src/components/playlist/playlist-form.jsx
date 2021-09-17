import { React, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import { useTranslation } from "react-i18next";
import ContentBody from "../util/content-body/content-body";
import ContentFooter from "../util/content-footer/content-footer";
import FormInput from "../util/forms/form-input";
import FormInputArea from "../util/forms/form-input-area";
import SelectScreenTable from "../util/multi-and-table/select-screen-table";
import SelectSlidesTable from "../util/multi-and-table/select-slides-table";
import CategoriesDropdown from "../util/forms/multiselect-dropdown/categories/categories-dropdown";
import Alert from "react-bootstrap/Alert";
import { useHistory } from "react-router-dom";

/**
 * The playlist form component.
 *
 * @returns {object} The playlist form.
 */
function PlaylistForm({ playlist, handleInput, handleSubmit, isSaving, headerText, isSaveSuccess, isLoading, errors }) {
  const { t } = useTranslation("common");
  const history = useHistory();
  const [displaySaveSuccess, setDisplaySaveSuccess] = useState(false);
  const displaySaveSuccessMilliseconds = 5000;

  /**
   * Display a banner if save is successful.
   */
  useEffect(() => {
    let timer = null;
    if (isSaveSuccess) {
      setDisplaySaveSuccess(true);
      timer = setTimeout(() => {
        setDisplaySaveSuccess(false);
      }, displaySaveSuccessMilliseconds);
    }
    return function cleanup() {
      if (timer !== null) {
        clearInterval(timer);
      }
    };
  }, [isSaveSuccess]);

  return (
    <Form>
      <h1>{headerText}</h1>
      {isLoading &&
        <>
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
            className="m-1"
          />
          {t("edit-playlist.loading")}
        </>
      }
      {!isLoading &&
        <>
          <ContentBody>
            <h2 className="h4">{t("edit-playlist.title-about")}</h2>
            <FormInput
              name="title"
              type="text"
              errors={errors}
              label={t("edit-playlist.playlist-name-label")}
              placeholder={t("edit-playlist.playlist-name-placeholder")}
              value={playlist.title}
              onChange={handleInput}
            />
            <FormInputArea
              name="description"
              type="text"
              label={t("edit-playlist.playlist-description-label")}
              placeholder={t("edit-playlist.playlist-description-placeholder")}
              value={playlist.description}
              onChange={handleInput}
            />
            {/* @TODO:
        <CategoriesDropdown
          errors={errors}
          name="playlistCategories"
          handleCategorySelection={handleInput}
          selected={playlist.playlistCategories}
        />
        */}
          </ContentBody>
          <ContentBody>
            <h2 className="h4">{t("edit-playlist.title-screens")}</h2>
            {/* @TODO:
        <SelectScreenTable
          handleChange={handleInput}
          name="playlistScreens"
          errors={errors}
          selectedData={playlist.onScreens}
        />
        */}
          </ContentBody>
          <ContentBody>
            <h2 className="h4">{t("edit-playlist.title-slides")}</h2>
            {/* @TODO:
        <SelectSlidesTable
          handleChange={handleInput}
          name="playlistSlides"
          errors={errors}
          selectedData={playlist.playlistSlides}
        />
        */}
          </ContentBody>
          <ContentFooter>
            <Button
              variant="secondary"
              type="button"
              id="playlist_cancel"
              onClick={() => history.goBack()}
              size="lg"
              className="me-3"
            >
              {t("edit-playlist.cancel-button")}
            </Button>
            <Button
              variant="primary"
              type="button"
              onClick={handleSubmit}
              id="save_playlist"
              size="lg"
            >
              <>
                {!isSaving && t("edit-playlist.save-button")}
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
                    {t("edit-playlist.saving")}
                  </>
                )}
              </>
            </Button>

            {displaySaveSuccess && (
              <Alert className="mt-2" variant="success">
                {t("edit-playlist.saved")}
              </Alert>
            )}
          </ContentFooter>
        </>
      }

    </Form>
  );
}

export default PlaylistForm;