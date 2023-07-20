import { React } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlayCircle,
  faStopCircle,
  faPauseCircle,
} from "@fortawesome/free-solid-svg-icons";
import {
  currentlyPlaying,
  willPlayInTheFuture,
} from "./helpers/published-helper";

/**
 * @param {object} props The props.
 * @param {object} props.published Object with from and to.
 * @returns {object} The published yes/no component.
 */
function Playing({ published }) {
  const { t } = useTranslation("common", { keyPrefix: "playing" });

  if (currentlyPlaying(published))
    return (
      <span>
        <FontAwesomeIcon
          aria-hidden="true"
          className="text-success me-1"
          icon={faPlayCircle}
        />
        {t("playing")}
      </span>
    );

  if (willPlayInTheFuture(published))
    return (
      <span>
        <FontAwesomeIcon
          aria-hidden="true"
          className="me-1 "
          icon={faPauseCircle}
        />
        {t("played-in-the-future")}
      </span>
    );

  return (
    <span>
      <FontAwesomeIcon
        aria-hidden="true"
        className="me-1 text-muted"
        icon={faStopCircle}
      />

      {t("not-playing")}
    </span>
  );
}

Playing.propTypes = {
  published: PropTypes.shape({
    from: PropTypes.string,
    to: PropTypes.string,
  }).isRequired,
};

export default Playing;
