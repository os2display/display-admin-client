import { React } from "react";
import { Modal, Button } from "react-bootstrap";
import PropTypes from "prop-types";

/**
 * @param {object} props
 * The props.
 * @param {string} props.text
 * The modal text
 * @param {string} props.title
 * The modal title
 * @param {string} props.acceptText
 * The text for the acceptbutton
 * @param {string} props.declineText
 * The text for the declinebutton
 * @param {Function} props.onClose
 * The callback for close.
 * @param {Function} props.handleAccept
 * The callback for accept.
 *   @returns {object}
 *   The TagList
 */
function ModalDialog({
  text,
  title,
  acceptText,
  declineText,
  onClose,
  handleAccept,
}) {
  return (
    <Modal.Dialog>
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{text}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          {declineText}
        </Button>
        <Button variant="primary" onClick={handleAccept}>
          {acceptText}
        </Button>
      </Modal.Footer>
    </Modal.Dialog>
  );
}

ModalDialog.propTypes = {
  text: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  acceptText: PropTypes.string.isRequired,
  declineText: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  handleAccept: PropTypes.func.isRequired,
};

export default ModalDialog;
