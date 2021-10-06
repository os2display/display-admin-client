import { React, useState } from "react";
import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";
import { useTranslation } from "react-i18next";
import { Button } from "react-bootstrap";
import ModalDialog from "../util/modal/modal-dialog";
import ListEntry from "./list-entry";
/**
 * Info modal component, that displays an info string.
 *
 * @param {object} props
 * Props.
 * @param {boolean} props.show
 * Whether to show the modal.
 * @param {Function} props.onClose
 * Callback on close modal.
 * @param {Function} props.apiCall
 * apiCall for data.
 * @param {Array} props.dataStructureToDisplay
 * The playlists to list.
 * @param {string} props.modalTitle
 * The info modal string.
 * @returns {object}
 * The modal.
 */
function InfoModal({
  show,
  onClose,
  apiCall,
  dataStructureToDisplay,
  modalTitle,
}) {
  if (!show) {
    return <></>;
  }
  const { t } = useTranslation("common");
  // The info modal loads entries and displays the title.
  // To not load too many entries, it has its own simple pagination.
  const paginationVariable = 10;
  const [index, setIndex] = useState(paginationVariable);
  const [paginatedDataStructure, setPaginatedDataStructure] = useState(
    dataStructureToDisplay.slice(0, index)
  );

  /**
   * Displays more list entries.
   */
  function displayMore() {
    let dataStructureToDisplayCopy = dataStructureToDisplay;
    dataStructureToDisplayCopy = dataStructureToDisplayCopy.slice(
      0,
      index + paginationVariable
    );
    setPaginatedDataStructure(dataStructureToDisplayCopy);
    setIndex(index + paginationVariable);
  }

  return (
    <Modal scrollable show size="m" onHide={onClose} id="info-modal">
      <ModalDialog
        title={modalTitle}
        onClose={onClose}
        showAcceptButton={false}
        declineText={t("info-modal.decline-text")}
      >
        <ul>
          {paginatedDataStructure.map((item) => (
            <ListEntry apiCall={apiCall} dataUrl={item} key={item} />
          ))}
        </ul>
        {!(index > paginatedDataStructure.length) && (
          <Button variant="primary" onClick={() => displayMore()}>
            {t("info-modal.show-more-elements")}
          </Button>
        )}
      </ModalDialog>
    </Modal>
  );
}
InfoModal.defaultProps = {
  dataStructureToDisplay: [],
};

InfoModal.propTypes = {
  show: PropTypes.bool.isRequired,
  dataStructureToDisplay: PropTypes.arrayOf(PropTypes.string),
  apiCall: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  modalTitle: PropTypes.string.isRequired,
};

export default InfoModal;
