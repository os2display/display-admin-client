import { React } from "react";
import PropTypes from "prop-types";
import ModalDialog from "../util/modal/modal-dialog";
import SelectedCellsProptypes from "../proptypes/selected-cells-proptypes";

function DeleteModal({ show, onClose, selectedCells, handleAccept }) {
  if (!show) return <></>;

  let valuesToDelete = "";
  selectedCells.forEach((element, index) => {
    if (index === 0) {
      valuesToDelete = `${element.name}`;
    } else if (index === selectedCells.length - 1) {
      valuesToDelete = `${valuesToDelete} and ${element.name}`;
    } else {
      valuesToDelete = `${valuesToDelete}, ${element.name}`;
    }
  });
  return (
    <ModalDialog
      text={`Are you sure you want to delete ${valuesToDelete}?`}
      title="You are about to delete something"
      acceptText="Yes, delete"
      declineText="Nono, no deleting"
      onClose={onClose}
      handleAccept={handleAccept}
    />
  );
}

DeleteModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  selectedCells: SelectedCellsProptypes.isRequired,
  handleAccept: PropTypes.func.isRequired,
};

export default DeleteModal;
