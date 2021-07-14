import { React } from "react";
import { Modal, Button } from "react-bootstrap";
import PropTypes from "prop-types";

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
