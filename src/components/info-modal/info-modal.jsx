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
 * @param {Array} props.dataStructureToDisplay
 * The playlists to list.
 * @param {string} props.infoModalString
 * The info modal string.
 * @returns {object}
 * The modal.
 */
function InfoModal({ show, onClose, dataStructureToDisplay, infoModalString }) {
  if (!show) {
    return <></>;
  }

  const intl = useIntl();
  const title = intl.formatMessage({ id: "info_title" });
  const declineText = intl.formatMessage({ id: "info_decline_text" });
  const andString = intl.formatMessage({ id: "and" });

  // Creates a string for modal
  const content = `${infoModalString}: ${contentString(
    dataStructureToDisplay,
    andString
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
  dataStructureToDisplay: PropTypes.arrayOf(
    PropTypes.shape({ name: PropTypes.string, id: PropTypes.number })
  ).isRequired,
  onClose: PropTypes.func.isRequired,
  infoModalString: PropTypes.string.isRequired,
};

export default InfoModal;
