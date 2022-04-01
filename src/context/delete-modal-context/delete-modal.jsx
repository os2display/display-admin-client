import React, { useEffect } from "react";
import { Modal } from 'react-bootstrap';
import ModalDialog from '../../components/util/modal/modal-dialog';
import { useTranslation } from 'react-i18next';

/**
 * @param root0
 * @param root0.modal
 * @param root0.unSetModal
 * @param root0.onAccept
 * @param root0.onReject
 */
 function DeleteModal({ unSetModal, onAccept, selected }) {
  const { t } = useTranslation("common", { keyPrefix: "delete-modal" });

  /**
   * For closing modals on escape key.
   *
   * @param {object} props - The props.
   * @param {string} props.key - The key input.
   */
  function downHandler({ key }) {
    if (key === "Escape") {
      unSetModal();
    }
  }

  // Add event listeners for keypress
  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", downHandler);
    };
  }, []);

  function rejectDeletion() {
    unSetModal();
  }
  function acceptDeletion() {
    unSetModal();
    onAccept();
  }

  return (
    <Modal
      animation={false}
      show
      size="m"
      id="delete-modal"
      onHide={rejectDeletion}
    >
      <ModalDialog
        title={t("title")}
        onClose={rejectDeletion}
        handleAccept={acceptDeletion}
        btnVariant="danger"
        declineText={t("cancel")}
        acceptText={t("delete")}
      >
        <ul>
          {selected.map(({ title }) => (
            <li>{title}</li>
          ))}
        </ul>
      </ModalDialog>
    </Modal>
  );
}

export default DeleteModal;
