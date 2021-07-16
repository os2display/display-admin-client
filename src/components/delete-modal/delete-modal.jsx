import { React } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import ModalDialog from "../util/modal/modal-dialog";
import SelectedRowsProptypes from "../proptypes/selected-rows-proptypes";
import contentString from "../util/helpers/contentString";

/**
 * Delete modal component, a modal that deletes elements.
 *
 * @param {object} props
 * Props.
 * @param {boolean} props.show
 * Whether to show the modal.
 * @param {Function} props.onClose
 * Callback on close modal.
 * @param {Function} props.selectedRows
 * Rows that are selected for deletion
 * @param {Function} props.handleAccept
 * Callback on accept.
 * @returns {object}
 * The modal.
 */
function DeleteModal({ show, onClose, selectedRows, handleAccept }) {
  if (!show) {
    return <></>;
  }
  const intl = useIntl();
  const title = intl.formatMessage({ id: "delete_title" });
  const areYouSure = intl.formatMessage({ id: "are_you_sure_delete" });

  // Creates a string for modal
  const valuesToDelete = `${areYouSure}  ${contentString(selectedRows)}?`;

  return (
    <ModalDialog title={title} onClose={onClose} handleAccept={handleAccept}>
      {valuesToDelete}
    </ModalDialog>
  );
}

DeleteModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  selectedRows: SelectedRowsProptypes.isRequired,
  handleAccept: PropTypes.func.isRequired,
};

export default DeleteModal;
