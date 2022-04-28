import { React, useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import Modal from "react-bootstrap/Modal";
import ModalDialog from "../util/modal/modal-dialog";
import MediaList from "../media/media-list";

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
  if (!show) {
    return <></>;
  }

  const [selectedImages, setSelectedImages] = useState([]);
  const { t } = useTranslation("common");

  /** @param {Array} images The images that are selected in the dialog. */
  function handleSelectedImages(images) {
    setSelectedImages(images);
    if (!multiple && images.length === 1) {
      handleAccept(images);
    }
  }

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
        handleAccept={() => handleAccept(selectedImages)}
      >
        <MediaList fromModal handleSelected={handleSelectedImages} />
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
