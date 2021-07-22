import { React } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import ModalDialog from "../util/modal/modal-dialog";
import contentString from "../util/helpers/content-string";

/**
 * Info modal component, that displays an info string.
 *
 * @param {object} props
 * Props.
 * @param {boolean} props.show
 * Whether to show the modal.
 * @param {Function} props.onClose
 * Callback on close modal.
 * @param {Array} props.onPlaylists
 * The playlists to list.
 * @returns {object}
 * The modal.
 */
function InfoModal({ show, onClose, onPlaylists }) {
  if (!show) {
    return <></>;
  }

  const intl = useIntl();
  const title = intl.formatMessage({ id: "info_title" });
  const declineText = intl.formatMessage({ id: "info_decline_text" });
  const onTheFollowingPlaylists = intl.formatMessage({
    id: "on_the_following_playlists",
  });
  const and = intl.formatMessage({ id: "and" });

  // Creates a string for modal
  const content = `${onTheFollowingPlaylists}:  ${contentString(
    onPlaylists,
    and
  )}`;

  return (
    <div id="info-modal">
      <ModalDialog
        title={title}
        onClose={onClose}
        showAcceptButton={false}
        declineText={declineText}
      >
        {content}
      </ModalDialog>
    </div>
  );
}

InfoModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onPlaylists: PropTypes.arrayOf(
    PropTypes.shape({ name: PropTypes.string, id: PropTypes.number })
  ).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default InfoModal;
