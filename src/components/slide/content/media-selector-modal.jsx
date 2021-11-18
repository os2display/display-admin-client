import { React, useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import Modal from "react-bootstrap/Modal";
import ModalDialog from "../../util/modal/modal-dialog";
import SlideMediaList from "./media-selector-list";

/**
 * Slide media modal component.
 *
 * @param {object} props Props.
 * @param {boolean} props.show Whether to show the modal.
 * @param {Function} props.onClose Callback on close modal.
 * @param {Function} props.selectMedia Callback for selecting media.
 * @param {boolean} props.multiple Whether it should be possible to choose
 *   multiple media.
 * @param {Array} selectedMedia Selected media.
 * @returns {object} The modal.
 */
function MediaSelectorModal({ show, onClose, selectMedia, selectedMedia,  multiple }) {
  const { t } = useTranslation("common");
  const [newSelected, setNewSelected] = useState([]);

  if (!show) {
    return <></>;
  }

  const handleSelectMultiple = () => {
    console.log('handleSelectMultiple');
    console.log(newSelected);
  };

  const handleClick = ({ target }) => {
    console.log('handleClick');
    console.log(target);

    if (!multiple) {
      selectMedia()
    }
  }

  const handleReject = () => {
    console.log('handleReject');
    onClose();
  }

  return (
    <Modal show={show} size="xl" id="slide-media-modal" onHide={onClose}>
      <ModalDialog
        title={
          multiple
            ? t("slide-media-modal.multiple-select-title")
            : t("slide-media-modal.single-select-title")
        }
        onClose={handleReject}
        handleAccept={handleSelectMultiple}
        acceptText={t("media-modal.select-multiple")}
        declineText={t('media-modal.cancel')}
      >
        <SlideMediaList onItemClick={handleClick} />
      </ModalDialog>
    </Modal>
  );
}

MediaSelectorModal.propTypes = {
  multiple: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  selectedMedia: PropTypes.array.isRequired,
  selectMedia: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};

export default MediaSelectorModal;
