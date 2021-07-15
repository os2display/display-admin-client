import { React } from "react";
import PropTypes from "prop-types";
import ModalDialog from "../util/modal/modal-dialog";
import { FormattedMessage, useIntl } from "react-intl";
import SelectedCellsProptypes from "../proptypes/selected-cells-proptypes";
/**
 * Consolidate modal component, a modal that merges elements together.
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
 * The modal.
 */
function ConsolidateModal({ show, onClose, selectedCells, handleAccept }) {
  const intl = useIntl();
  if (!show) {
    return <></>;
  }

  let and = intl.formatMessage({ id: "and" });
  let title = intl.formatMessage({ id: "consolidate_title" });
  let areYouSure = intl.formatMessage({ id: "are_you_sure_consolidate" });

  let valuesToConsolidate = "";
  selectedCells.forEach((element, index) => {
    if (index === 0) {
      valuesToConsolidate = `${element.name}`;
    } else if (index === selectedCells.length - 1) {
      valuesToConsolidate = `${valuesToConsolidate} ${and} ${element.name}`;
    } else {
      valuesToConsolidate = `${valuesToConsolidate}, ${element.name}`;
    }
  });
  valuesToConsolidate = `${areYouSure} ${valuesToConsolidate}?`;
  return (
    <ModalDialog
      text={valuesToConsolidate}
      title={title}
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
