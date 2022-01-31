import { React } from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import Schedule from "../util/schedule/schedule";
import ContentBody from "../util/content-body/content-body";

/**
 * The playlist form component.
 *
 * @param {object} props - The props.
 * @param {object} props.playlist The playlist object to modify in the form.
 * @param {Function} props.handleInput Handles form input.
 * @returns {object} The playlist form.
 */
function PlaylistForm({ playlist, handleInput }) {
  const { t } = useTranslation("common");

  return (
    <>
      <LoadingComponent isLoading={isLoading} loadingMessage={loadingMessage} />
      <Form>
        <h1 id="playlistTitle">{headerText}</h1>
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
        <ContentBody id="slides-section">
          <h2 className="h4">{t("playlist-form.title-slides")}</h2>
          <SelectSlidesTable
            handleChange={handleInput}
            name="slides"
            slideId={slideId}
          />
        </ContentBody>
        <ContentBody>
          <h2 className="h4">{t("playlist-form.schedule-header")}</h2>
          <Schedule
            schedules={playlist.schedules}
            onChange={(schedules) =>
              handleInput({ target: { id: "schedules", value: schedules } })
            }
          />
        </ContentBody>
        <ContentBody>
          <h3 className="h4">{t("playlist-form.publish-title")}</h3>
          <Row className="g-2">
            <Col md>
              <FormInput
                name="published.from"
                type="datetime-local"
                label={t("playlist-form.publish-from-label")}
                value={playlist.published.from ?? ""}
                onChange={handleInput}
              />
            </Col>
            <Col md>
              <FormInput
                name="published.to"
                type="datetime-local"
                label={t("playlist-form.publish-to-label")}
                value={playlist.published.to ?? ""}
                onChange={handleInput}
              />
            </Col>
          </Row>
          <Row>
            <small className="form-text">
              {t("playlist-form.publish-helptext")}
            </small>
          </Row>
        </ContentBody>
        <ContentFooter>
          <Button
            variant="secondary"
            type="button"
            id="cancel_playlist"
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
        </ContentFooter>
      </Form>
    </>
  );
}

PlaylistForm.propTypes = {
  playlist: PropTypes.objectOf(PropTypes.any).isRequired,
  handleInput: PropTypes.func.isRequired,
};

export default PlaylistForm;
