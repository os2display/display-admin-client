import { React } from "react";
import { Button, Form } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import RRule from "../rrule/rrule";
import ContentBody from "../util/content-body/content-body";
import ContentFooter from "../util/content-footer/content-footer";
import FormInput from "../util/forms/form-input";
import FormInputArea from "../util/forms/form-input-area";
import Toast from "../util/toast/toast";
import SelectSlidesTable from "../util/multi-and-table/select-slides-table";

/**
 * The playlist form component.
 *
 * @param {object} props - The props.
 * @param {object} props.playlist The playlist object to modify in the form.
 * @param {Function} props.handleInput Handles form input.
 * @param {Function} props.handleSubmit Handles form submit.
 * @param {boolean} props.isSaving Is the form saving?
 * @param {string} props.headerText Headline text.
 * @param {boolean | null} props.isSaveSuccess Is the save a success?
 * @param {boolean | null} props.isLoading The data is loading.
 * @param {Array} props.errors Array of errors.
 * @param {string} props.slideId - The id of the slide.
 * @returns {object} The playlist form.
 */
function PlaylistForm({
  playlist,
  handleInput,
  handleSubmit,
  isSaving,
  headerText,
  isSaveSuccess,
  isLoading,
  errors,
  slideId,
}) {
  const { t } = useTranslation("common");
  const history = useHistory();

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
          {t("edit-playlist.loading")}
        </>
      )}
      {!isLoading && (
        <>
          <ContentBody>
            <h2 className="h4">{t("edit-playlist.title-about")}</h2>
            <FormInput
              name="title"
              type="text"
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
          </ContentBody>
          <ContentBody>
            <h2 className="h4">{t("edit-playlist.schedule-header")}</h2>
            <RRule
              value={playlist.schedule}
              name="schedule"
              handleChange={handleInput}
            />
          </ContentBody>
          <ContentBody>
            <h2 className="h4">{t("edit-playlist.title-slides")}</h2>
            <SelectSlidesTable
              handleChange={handleInput}
              name="slides"
              slideId={slideId}
            />
          </ContentBody>
          <ContentFooter>
            <Button
              variant="secondary"
              type="button"
              id="playlist_cancel"
              onClick={() => history.push("/playlist/list/")}
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
            <Toast show={isSaveSuccess} text={t("edit-playlist.saved")} />
            <Toast show={errors} text={t("edit-playlist.error")} />
          </ContentFooter>
        </>
      )}
    </Form>
  );
}

PlaylistForm.defaultProps = {
  slideId: "",
};

PlaylistForm.propTypes = {
  playlist: PropTypes.objectOf(PropTypes.any).isRequired,
  handleInput: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isSaving: PropTypes.bool.isRequired,
  headerText: PropTypes.string.isRequired,
  slideId: PropTypes.string,
  isSaveSuccess: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  errors: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default PlaylistForm;
