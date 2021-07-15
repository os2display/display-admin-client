import { React } from "react";
import { useIntl } from "react-intl";
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
 * @param {object}props.children
 * The children to be rendered.
 * @returns {object}
 * The TagList
 */
function ModalDialog({
  title,
  acceptText,
  declineText,
  onClose,
  handleAccept,
  children,
}) {
  const intl = useIntl();
  const yes = intl.formatMessage({ id: "yes" });
  const no = intl.formatMessage({ id: "no" });
  return (
    <div className="modal-container">
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            {declineText || no}
          </Button>
          <Button variant="primary" onClick={handleAccept}>
            {acceptText || yes}
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}

ModalDialog.defaultProps = {
  acceptText: "",
  declineText: "",
};

ModalDialog.propTypes = {
  title: PropTypes.string.isRequired,
  acceptText: PropTypes.string,
  declineText: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  handleAccept: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default ModalDialog;
