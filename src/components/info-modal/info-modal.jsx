import { React } from "react";
import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";
import { useTranslation } from "react-i18next";
import ModalDialog from "../util/modal/modal-dialog";

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
 * @param {string} props.modalTitle
 * The info modal string.
 * @returns {object}
 * The modal.
 */
function InfoModal({ show, onClose, dataStructureToDisplay, modalTitle }) {
  if (!show || dataStructureToDisplay.length === 0) {
    return <></>;
  }
  const { t } = useTranslation("common");

  return (
    <Modal scrollable show size="m" onHide={onClose} id="info-modal">
      <ModalDialog
        title={modalTitle}
        onClose={onClose}
        showAcceptButton={false}
        declineText={t("info-modal.decline-text")}
      >
        <ul>
          {dataStructureToDisplay.map(({ title }) => (
            <li>{title}</li>
          ))}
        </ul>
      </ModalDialog>
    </Modal>
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
  modalTitle: PropTypes.string.isRequired,
};

export default InfoModal;
