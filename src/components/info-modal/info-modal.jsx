import { React } from "react";
import PropTypes from "prop-types";
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
 * @param {string} props.title
 * The info modal string.
 * @returns {object}
 * The modal.
 */
function InfoModal({ show, onClose, dataStructureToDisplay, title }) {
  if (!show || dataStructureToDisplay.length === 0) {
    return <></>;
  }
  const { t } = useTranslation("common");

  return (
    <div id="info-modal">
      <ModalDialog
        title={title}
        onClose={onClose}
        showAcceptButton={false}
        declineText={t("info-modal.decline-text")}
      >
        <ul>
          {dataStructureToDisplay.map(({ name }) => (
            <li>{name}</li>
          ))}
        </ul>
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
  title: PropTypes.string.isRequired,
};

export default InfoModal;
