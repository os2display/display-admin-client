import { React, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

/**
 * @param {object} props
 * The props.
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
 * @param {boolean} props.showAcceptButton
 * Whether to show the accept button.
 * @param {string} props.showAcceptButton
 * The size of the modal.
 * @param props.size
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
  showAcceptButton,
  size,
}) {
  const { t } = useTranslation("common");

  /**
   * For closing modals on escape key.
   *
   * @param {object} props - the props.
   * @param {string} props.key - the key input.
   */
  function downHandler({ key }) {
    if (key === "Escape") {
      onClose();
    }
  }

  // Add event listeners for keypress
  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", downHandler);
    };
  }, []);

  return (
    <div className="modal-container">
      <Modal.Dialog size={size}>
        <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" type="button" onClick={onClose}>
            {declineText || t("modal-dialog.no")}
          </Button>
          {showAcceptButton && (
            <Button variant="primary" type="submit" onClick={handleAccept}>
              {acceptText || t("modal-dialog.yes")}
            </Button>
          )}
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}

ModalDialog.defaultProps = {
  acceptText: "",
  declineText: "",
  showAcceptButton: true,
  handleAccept: () => {},
  size: "sm",
};

ModalDialog.propTypes = {
  title: PropTypes.string.isRequired,
  acceptText: PropTypes.string,
  declineText: PropTypes.string,
  showAcceptButton: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  handleAccept: PropTypes.func,
  size: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default ModalDialog;
