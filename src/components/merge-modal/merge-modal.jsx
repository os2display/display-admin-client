import { React, useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import Modal from "react-bootstrap/Modal";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";
import ModalDialog from "../util/modal/modal-dialog";
import SelectedRowsProptypes from "../proptypes/selected-rows-proptypes";
import FormInput from "../util/forms/form-input";

/**
 * Merge modal component, a modal that merges elements together.
 *
 * @param {object} props
 * Props.
 * @param {boolean} props.show
 * Whether to show the modal.
 * @param {Function} props.onClose
 * Callback on close modal.
 * @param {Function} props.dataStructureToDisplay
 * Rows that are selected for deletion
 * @param {Function} props.handleAccept
 * Callback on accept.
 * @returns {object}
 * The modal.
 */
function MergeModal({ show, onClose, dataStructureToDisplay, handleAccept }) {
  if (!show) {
    return <></>;
  }
  const [mergeName, setMergeName] = useState();
  const { t } = useTranslation("common");

  /**
   * @param {string} newMergeName - the new name for the merged data.
   */
  function handleInput(newMergeName) {
    setMergeName(newMergeName);
  }

  return (
    <Modal show={show} size="xl" id="merge-modal">
      <ModalDialog
        title={t("merge-modal.title")}
        onClose={onClose}
        handleAccept={() => handleAccept(mergeName)}
        acceptText={t("merge-modal.accept-text")}
      >
        <ul>
          {dataStructureToDisplay.map(({ name }) => (
            <li>{name}</li>
          ))}
        </ul>
        <FormInput
          name="mergeName"
          aria-label={t("merge-modal.new-name-label")}
          label={t("merge-modal.new-name-label")}
          placeholder={t("merge-modal.new-name-placeholder")}
          value={mergeName}
          onChange={(e) => handleInput(e.currentTarget.value)}
          id="merged-data-name"
        />
      </ModalDialog>
    </Modal>
  );
}

MergeModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  dataStructureToDisplay: SelectedRowsProptypes.isRequired,
  handleAccept: PropTypes.func.isRequired,
};

export default MergeModal;
