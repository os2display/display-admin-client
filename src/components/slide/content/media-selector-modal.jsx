import { React, useEffect, useState } from "react";
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
function MediaSelectorModal({ show, onClose, selectMedia, selectedMedia, multiple, targetId }) {
  const { t } = useTranslation("common");
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    if (selectedMedia) {
      const newSelected = selectedMedia.map((entry) => entry['@id']);
      setSelected(newSelected);
    }
  }, [selectedMedia]);

  const handleAccept = () => {
    selectMedia({target: {id: targetId, value: selected}});
    onClose();
  };

  const handleClick = (data) => {
    if (!multiple) {
      selectMedia({target: {id: targetId, value: [data]}});
      onClose();
    }
    else {
      const newSelected = [];
      let found = false;

      [...selected].forEach((element) => {
        if (element === data['@id'] || (Object.prototype.hasOwnProperty.call(element, '@id') && element['@id'] === data['@id'])) {
          found = true;
        }
        else {
          newSelected.push(element);
        }
      })

      if (!found) {
        newSelected.push(data);
      }

      setSelected(newSelected);
    }
  }

  const handleReject = () => {
    onClose();
  }

  const getSelectedIds = () => {
    return selected.map((entry) => {
      if (typeof entry === 'string') {
        return entry;
      }
      else {
        return entry['@id'];
      }
    });
  }

  if (!show) {
    return <></>;
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
        handleAccept={handleAccept}
        acceptText={t("media-modal.select-multiple")}
        declineText={t('media-modal.cancel')}
      >
        <SlideMediaList onItemClick={handleClick} selectedMediaIds={getSelectedIds()} multiple={multiple} />
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
  targetId: PropTypes.string.isRequired,
};

export default MediaSelectorModal;
