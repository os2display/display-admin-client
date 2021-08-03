import { React } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
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
  if (!show || dataStructureToDisplay.length === 0) {
    return <></>;
  }
  const { t } = useTranslation("common");

  // Creates a string for modal
  const content = `${infoModalString}: ${contentString(
    dataStructureToDisplay,
    t("info-modal.and-string")
  )}`;

  return (
    <div id="info-modal">
      <ModalDialog
        title={t("info-modal.title")}
        onClose={onClose}
        showAcceptButton={false}
        declineText={t("info-modal.decline-text")}
      >
        {content}
      </ModalDialog>
    </div>
  );
}
InfoModal.defaultProps = {
  dataStructureToDisplay: [],
};

InfoModal.propTypes = {
  show: PropTypes.bool.isRequired,
  dataStructureToDisplay: PropTypes.arrayOf(
    PropTypes.shape({ name: PropTypes.string, id: PropTypes.number })
  ),
  onClose: PropTypes.func.isRequired,
  infoModalString: PropTypes.string.isRequired,
};

export default InfoModal;
