import { React, useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import ModalDialog from "../util/modal/modal-dialog";
import MediaList from "../media-list/media-list";
/**
 * Delete modal component, a modal that deletes elements.
 *
 * @param {object} props
 * Props.
 * @param {boolean} props.show
 * Whether to show the modal.
 * @param {Function} props.onClose
 * Callback on close modal.
 * @param {Function} props.handleAccept
 * The are you sure you want to delete text.
 * @param {Function} props.handleSelected
 * Callback when images are selected.
 * @param {boolean} props.multiple
 * Whether it should be possible to choose multiple images.
 * @returns {object}
 * The modal.
 */
function MediaModal({ show, onClose, handleAccept, handleSelected, multiple }) {
  if (!show) {
    return <></>;
  }
  const [selectedimages, setSelectedImages] = useState([]);
  const { t } = useTranslation("common");

  /**
   * @param images
   */
  function handleSelected(images) {
    setSelectedImages(images);
    if (!multiple && images.length === 1) {
      handleAccept(images);
    }
  }

  return (
    <div id="delete-modal">
      <ModalDialog
        title={multiple? t("media-modal.multiple-select-title") ? t("media-modal.single-select-title")}
        onClose={onClose}
        handleAccept={() => handleAccept(selectedimages)}
        size="xl"
      >
        <MediaList fromModal handleSelected={handleSelected} />
      </ModalDialog>
    </div>
  );
}

MediaModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  handleAccept: PropTypes.func.isRequired,
  handleSelected:PropTypes.func.isRequired,
  multiple:PropTypes.bool.isRequired,
};

export default MediaModal;
