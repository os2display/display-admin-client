import { React } from "react";
import { Button, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import WithLoading from "../util/loading-component/with-loading";
import RRule from "../rrule/rrule";
import ContentBody from "../util/content-body/content-body";
import ContentFooter from "../util/content-footer/content-footer";
import FormInput from "../util/forms/form-input";
import FormInputArea from "../util/forms/form-input-area";
import Toast from "../util/list/toast-component/toast";
import SelectSlidesTable from "../util/multi-and-table/select-slides-table";
import "./playlist-form.scss";

/**
 * The playlist form component.
 *
 * @param {object} props - The props.
 * @param {object} props.playlist The playlist object to modify in the form.
 * @param {Function} props.handleInput Handles form input.
 * @param {Function} props.handleSubmit Handles form submit.
 * @param {string} props.headerText Headline text.
 * @param {boolean | null} props.isSaveSuccess Is the save a success?
 * @param {Array} props.errors Array of errors.
 * @param {string} props.slideId - The id of the slide.
 * @returns {object} The playlist form.
 */
function PlaylistForm({
  playlist,
  handleInput,
  handleSubmit,
  headerText,
  isSaveSuccess,
  errors,
  slideId,
}) {
  const { t } = useTranslation("common");
  const history = useHistory();

  return (
    <Form>
      <h1>{headerText}</h1>
      <ContentBody>
        <h2 className="h4">{t("playlist-form.title-about")}</h2>
        <FormInput
          name="title"
          type="text"
          label={t("playlist-form.playlist-name-label")}
          placeholder={t("playlist-form.playlist-name-placeholder")}
          value={playlist.title}
          onChange={handleInput}
        />
        <FormInputArea
          name="description"
          type="text"
          label={t("playlist-form.playlist-description-label")}
          placeholder={t("playlist-form.playlist-description-placeholder")}
          value={playlist.description}
          onChange={handleInput}
        />
      </ContentBody>
      <ContentBody>
        <h2 className="h4">{t("playlist-form.schedule-header")}</h2>
        <RRule
          value={playlist.schedule}
          name="schedule"
          handleChange={handleInput}
        />
      </ContentBody>
      <ContentBody>
        <h2 className="h4">{t("playlist-form.title-slides")}</h2>
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
          {t("playlist-form.cancel-button")}
        </Button>
        <Button
          variant="primary"
          type="button"
          onClick={handleSubmit}
          id="save_playlist"
          size="lg"
        >
          {t("playlist-form.save-button")}
        </Button>
        <Toast show={isSaveSuccess} text={t("playlist-form.saved")} />
        <Toast show={errors} text={t("playlist-form.error")} />
      </ContentFooter>
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
  headerText: PropTypes.string.isRequired,
  slideId: PropTypes.string,
  isSaveSuccess: PropTypes.bool.isRequired,
  errors: PropTypes.oneOfType([
    PropTypes.objectOf(PropTypes.any),
    PropTypes.bool,
  ]).isRequired,
};

export default WithLoading(PlaylistForm);
