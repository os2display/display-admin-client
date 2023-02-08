import React, { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { PropTypes } from "prop-types";
import ModalDialog from "../../components/util/modal/modal-dialog";

/**
 * Delete modal component, a modal that deletes elements.
 *
 * @param {object} props - The props.
 * @param {Function} props.unSetModal - Close the modal.
 * @param {Function} props.onAccept - A callback on accept.
 * @param {Array} props.selected - The selected entries, to list.
 * @param {Function} props.setSelected - Set selected entries.
 * @returns {object} The delete modal.
 */
function DeleteModal({ unSetModal, onAccept, selected, setSelected }) {
  const { t } = useTranslation("common", { keyPrefix: "delete-modal" });

  /**
   * For closing modals on escape key.
   *
   * @param {object} props - The props.
   * @param {string} props.key - The key input.
   */
  const downHandler = ({ key }) => {
    if (key === "Escape") {
      unSetModal();
    }
  };

  // Add event listeners for keypress
  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", downHandler);
    };
  }, []);

  /** If the user rejects deletion, the selected should be reset and the modal closed. */
  const rejectDeletion = () => {
    unSetModal();
    setSelected([]);
  };

  /** If the user accepts deletion, the callback is called and the modal closed. */
  const acceptDeletion = () => {
    onAccept();
    unSetModal();
  };

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
          {/* eslint-disable-next-line react/prop-types */}
          {selected.map(({ title }) => (
            <li key={title}>{title}</li>
          ))}
        </ul>
      </ModalDialog>
    </Modal>
  );
}

DeleteModal.propTypes = {
  unSetModal: PropTypes.func.isRequired,
  onAccept: PropTypes.func.isRequired,
  setSelected: PropTypes.func.isRequired,
  selected: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
    })
  ).isRequired,
};

export default DeleteModal;
