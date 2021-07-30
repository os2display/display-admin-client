import { React, useState } from "react";
import PropTypes from "prop-types";
import { Form, FormControl, InputGroup } from "react-bootstrap";
import ModalDialog from "../util/modal/modal-dialog";
import SelectedRowsProptypes from "../proptypes/selected-rows-proptypes";
import contentString from "../util/helpers/content-string";
import { useTranslation } from "react-i18next";

/**
 * Merge modal component, a modal that merges elements together.
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
 * @returns {object}
 * The modal.
 */
function MergeModal({ show, onClose, selectedRows, handleAccept }) {
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

  // Creates a string for modal
  const valuesToMerge = `${confirmation}: ${contentString(
    selectedRows,
    t("merge-modal.and-string")
  )}?`;

  return (
    <ModalDialog
      title={t("merge-modal.title")}
      onClose={onClose}
      handleAccept={() => handleAccept(mergeName)}
    >
      {valuesToMerge}
      <Form>
        <InputGroup className="mb-3 mt-3">
          <FormControl
            aria-label={t("merge-modal.new-name-label")}
            placeholder={t("merge-modal.new-name-placeholder")}
            id="merged-data-name"
            className="form-control"
            onChange={(e) => handleInput(e.currentTarget.value)}
          />
        </InputGroup>
      </Form>
    </ModalDialog>
  );
}

MergeModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  selectedRows: SelectedRowsProptypes.isRequired,
  handleAccept: PropTypes.func.isRequired,
};

export default MergeModal;
