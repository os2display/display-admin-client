import { React } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import ContentBody from "../util/content-body/content-body";
import ContentFooter from "../util/content-footer/content-footer";
import FormInput from "../util/forms/form-input";
import FormInputArea from "../util/forms/form-input-area";
import SelectSlidesTable from "../util/multi-and-table/select-slides-table";
import LoadingComponent from "../util/loading-component/loading-component";

/**
 * The shared form component.
 *
 * @param {object} props - The props.
 * @param {object} props.playlist The playlist object to modify in the form.
 * @param {Function} props.handleInput Handles form input.
 * @param {Function} props.handleSubmit Handles form submit.
 * @param {string} props.headerText Headline text.
 * @param {string} props.slideId - The id of the slide.
 * @param {boolean} props.isLoading Indicator of whether the form is loading
 * @param {string} props.loadingMessage The loading message for the spinner
 * @param {Array} props.children The children being passed from parent
 * @returns {object} The form shared by campaigns and playlists.
 */
function PlaylistCampaignForm({
  playlist,
  handleInput,
  handleSubmit,
  headerText,
  slideId,
  isLoading,
  loadingMessage,
  children,
}) {
  const { t } = useTranslation("common");
  const history = useHistory();

  return (
    <>
      <LoadingComponent isLoading={isLoading} loadingMessage={loadingMessage} />
      <Form>
        <h1>{headerText}</h1>
        <ContentBody>
          <h2 className="h4">{t("playlist-campaign-form.title-about")}</h2>
          <FormInput
            name="title"
            type="text"
            label={t("playlist-campaign-form.playlist-name-label")}
            placeholder={t("playlist-campaign-form.playlist-name-placeholder")}
            value={playlist.title}
            onChange={handleInput}
          />
          <FormInputArea
            name="description"
            type="text"
            label={t("playlist-campaign-form.playlist-description-label")}
            placeholder={t(
              "playlist-campaign-form.playlist-description-placeholder"
            )}
            value={playlist.description}
            onChange={handleInput}
          />
        </ContentBody>
        <ContentBody>
          <h2 className="h4">{t("playlist-campaign-form.title-slides")}</h2>
          <SelectSlidesTable
            handleChange={handleInput}
            name="slides"
            slideId={slideId}
          />
        </ContentBody>
        {children}
        <ContentBody>
          <h3 className="h4">{t("playlist-campaign-form.publish-title")}</h3>
          <Row className="g-2">
            <Col md>
              <FormInput
                name="published.from"
                type="datetime-local"
                label={t("playlist-campaign-form.publish-from-label")}
                value={playlist.published.from ?? ""}
                onChange={handleInput}
              />
            </Col>
            <Col md>
              <FormInput
                name="published.to"
                type="datetime-local"
                label={t("playlist-campaign-form.publish-to-label")}
                value={playlist.published.to ?? ""}
                onChange={handleInput}
              />
            </Col>
          </Row>
          <Row>
            <small className="form-text">
              {t("playlist-campaign-form.publish-helptext")}
            </small>
          </Row>
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
            {t("playlist-campaign-form.cancel-button")}
          </Button>
          <Button
            variant="primary"
            type="button"
            onClick={handleSubmit}
            id="save_playlist"
            size="lg"
          >
            {t("playlist-campaign-form.save-button")}
          </Button>
        </ContentFooter>
      </Form>
    </>
  );
}

PlaylistCampaignForm.defaultProps = {
  slideId: "",
  isLoading: false,
  loadingMessage: "",
};

PlaylistCampaignForm.propTypes = {
  playlist: PropTypes.objectOf(PropTypes.any).isRequired,
  handleInput: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  headerText: PropTypes.string.isRequired,
  slideId: PropTypes.string,
  isLoading: PropTypes.bool,
  loadingMessage: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default PlaylistCampaignForm;
