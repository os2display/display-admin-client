import { React, useState } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { Form, InputGroup, FormControl } from "react-bootstrap";
import ModalDialog from "../util/modal/modal-dialog";
import SelectedRowsProptypes from "../proptypes/selected-rows-proptypes";
import contentString from "../util/helpers/content-string";

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
  const [mergeName, setMergeName] = useState();
  const intl = useIntl();
  if (!show) {
    return <></>;
  }

  /**
   * @param {string} newMergeName - the new name for the merged data.
   */
  function handleInput(newMergeName) {
    setMergeName(newMergeName);
  }

  const title = intl.formatMessage({ id: "merge_title" });
  const confirmation = intl.formatMessage({ id: "are_you_sure_merge" });
  const chooseNewName = intl.formatMessage({ id: "merge_data_name" });
  const and = intl.formatMessage({ id: "and_string" });

  // Creates a string for modal
  const valuesToMerge = `${confirmation}  ${contentString(selectedRows, and)}?`;

  return (
    <ModalDialog
      title={title}
      onClose={onClose}
      handleAccept={() => handleAccept(mergeName)}
    >
      {valuesToMerge}

      <Form>
        <InputGroup className="mb-3 mt-3">
          <FormControl
            placeholder={chooseNewName}
            aria-label={chooseNewName}
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
