import { React } from "react";
import PropTypes from "prop-types";
import ModalDialog from "../util/modal/modal-dialog";
import SelectedCellsProptypes from "../proptypes/selected-cells-proptypes";

/**
 * Consolidate modal component.
 *
 * @param {object} props
 * Props.
 * @param {boolean} props.show
 * Whether to show the modal.
 * @param {Function} props.onClose
 * Callback on close modal.
 * @param {Function} props.selectedCells
 * Cells that are selected for deletion
 * @param {Function} props.handleAccept
 * Callback on accept.
 * @returns {object}
 *   The modal.
 */
function ConsolidateModal({ show, onClose, selectedCells, handleAccept }) {
  if (!show) return <></>;

  let valuesToConsolidate = "";
  selectedCells.forEach((element, index) => {
    if (index === 0) {
      valuesToConsolidate = `${element.name}`;
    } else if (index === selectedCells.length - 1) {
      valuesToConsolidate = `${valuesToConsolidate} and ${element.name}`;
    } else {
      valuesToConsolidate = `${valuesToConsolidate}, ${element.name}`;
    }
  });
  return (
    <ModalDialog
      text={`Are you sure you want to consolidate ${valuesToConsolidate}?`}
      title="You are about to consolidate something"
      acceptText="Yes, consolidate"
      declineText="Nono, no consolidating today"
      onClose={onClose}
      handleAccept={handleAccept}
    />
  );
}

ConsolidateModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  selectedCells: SelectedCellsProptypes.isRequired,
  handleAccept: PropTypes.func.isRequired,
};

export default ConsolidateModal;
