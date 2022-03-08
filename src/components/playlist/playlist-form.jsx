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
      {playlist && (
        <ContentBody>
          <h2 className="h4">{t("playlist-form.schedule-header")}</h2>
          <Schedule
            schedules={playlist.schedules}
            onChange={(schedules) =>
              handleInput({ target: { id: "schedules", value: schedules } })
            }
          />
        </ContentBody>
      )}
    </>
  );
}

PlaylistForm.propTypes = {
  playlist: PropTypes.objectOf(PropTypes.any).isRequired,
  handleInput: PropTypes.func.isRequired,
};

export default PlaylistForm;
