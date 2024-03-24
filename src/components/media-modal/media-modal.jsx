import { React, useEffect } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import Modal from "react-bootstrap/Modal";
import ModalDialog from "../util/modal/modal-dialog";
import MediaList from "../media/media-list";
import useModal from "../../context/modal-context/modal-context-hook";

/**
 * Media modal component.
 *
 * @param {object} props Props.
 * @param {boolean} props.show Whether to show the modal.
 * @param {Function} props.onClose Callback on close modal.
 * @param {Function} props.handleAccept The are you sure you want to delete text.
 * @param {boolean} props.multiple Whether it should be possible to choose
 *   multiple images.
 * @returns {object} The modal.
 */
function MediaModal({ show, onClose, handleAccept, multiple }) {
  const { t } = useTranslation("common");
  const { selected } = useModal();

  if (!show) {
    return <></>;
  }

  useEffect(() => {
    if (selected && selected.length > 0) {
      handleAccept(selected);
    }
  }, [selected]);

  return (
    <Modal
      animation={false}
      show={show}
      size="xl"
      id="media-modal"
      onHide={onClose}
    >
      <ModalDialog
        title={t("media-modal.multiple-select-title")}
        onClose={onClose}
        handleAccept={() => handleAccept(selected)}
      >
        <MediaList fromModal multiple={multiple} />
      </ModalDialog>
    </Modal>
  );
}

MediaModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  handleAccept: PropTypes.func.isRequired,
  multiple: PropTypes.bool.isRequired,
};

export default MediaModal;
