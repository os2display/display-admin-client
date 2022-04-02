import { React } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import Modal from "react-bootstrap/Modal";
import ModalDialog from "../util/modal/modal-dialog";

/**
 * Delete modal component, a modal that deletes elements.
 *
 * @param {object} props Props.
 * @param {boolean} props.show Whether to show the modal.
 * @param {Function} props.onClose Callback on close modal.
 * @param {Function} props.selectedRows Rows that are selected for deletion
 * @param {Function} props.handleAccept Callback on accept.
 * @returns {object} The modal.
 */
function DeleteModal({ show, onClose, selectedRows, handleAccept }) {
  if (!show) {
    return <></>;
  }
  const { t } = useTranslation("common");

  return (
    <Modal
      animation={false}
      show={show}
      size="m"
      id="delete-modal"
      onHide={onClose}
    >
      <ModalDialog
        title={t("delete-modal.title")}
        onClose={onClose}
        handleAccept={handleAccept}
        btnVariant="danger"
      >
        <ul>
          {selectedRows.map(({ title }) => (
            <li>{title}</li>
          ))}
        </ul>
      </ModalDialog>
    </Modal>
  );
}

DeleteModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  handleAccept: PropTypes.func.isRequired,
};

export default DeleteModal;
