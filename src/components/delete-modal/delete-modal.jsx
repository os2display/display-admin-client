import { React } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import ModalDialog from "../util/modal/modal-dialog";
import SelectedRowsProptypes from "../proptypes/selected-rows-proptypes";
import contentString from "../util/helpers/content-string";

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
 * @param {string} props.deleteConfirmation
 * The are you sure you want to delete text.
 * @returns {object}
 * The modal.
 */
function DeleteModal({
  show,
  onClose,
  selectedRows,
  handleAccept,
  deleteConfirmation,
}) {
  if (!show) {
    return <></>;
  }
  const intl = useIntl();
  const confirmation =
    deleteConfirmation || intl.formatMessage({ id: "are_you_sure_delete" });
  const title = intl.formatMessage({ id: "delete_title" });
  const and = intl.formatMessage({ id: "and_string" });

  // Creates a string for modal
  const valuesToDelete = `${confirmation}  ${contentString(
    selectedRows,
    and
  )}?`;

  return (
    <div id="delete-modal">
      <ModalDialog title={title} onClose={onClose} handleAccept={handleAccept}>
        {valuesToDelete}
      </ModalDialog>
    </div>
  );
}

DeleteModal.defaultProps = {
  deleteConfirmation: null,
};

DeleteModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  selectedRows: SelectedRowsProptypes.isRequired,
  handleAccept: PropTypes.func.isRequired,
  deleteConfirmation: PropTypes.string,
};

export default DeleteModal;
