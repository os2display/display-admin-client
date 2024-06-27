import { React, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import FocusTrap from "focus-trap-react";

/**
 * @param {object} props The props.
 * @param {string} props.title The modal title
 * @param {string | null} props.acceptText The text for the accept button
 * @param {string | null} props.declineText The text for the decline button
 * @param {Function} props.onClose The callback for close.
 * @param {Function} props.handleAccept The callback for accept.
 * @param {object} props.children The children to be rendered.
 * @param {boolean} props.showAcceptButton Whether to show the accept button.
 * @param {string} props.btnVariant The variant of the submit button.
 * @returns {object} The the modal dialog
 */
function ModalDialog({
  title,
  onClose,
  children,
  acceptText = null,
  declineText = null,
  showAcceptButton = true,
  handleAccept = () => {},
  btnVariant = "primary",
}) {
  const { t } = useTranslation("common");

  /**
   * For closing modals on escape key.
   *
   * @param {object} props - The props.
   * @param {string} props.key - The key input.
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
    <FocusTrap>
      <div>
        <Modal.Header>
          <Modal.Title>
            <h1>{title}</h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" type="button" onClick={onClose}>
            {declineText || t("modal-dialog.cancel")}
          </Button>
          {showAcceptButton && (
            <Button variant={btnVariant} type="submit" onClick={handleAccept}>
              {acceptText || t("modal-dialog.remove")}
            </Button>
          )}
        </Modal.Footer>
      </div>
    </FocusTrap>
  );
}

ModalDialog.propTypes = {
  title: PropTypes.string.isRequired,
  acceptText: PropTypes.string,
  declineText: PropTypes.string,
  showAcceptButton: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  handleAccept: PropTypes.func,
  children: PropTypes.node.isRequired,
  btnVariant: PropTypes.string,
};

export default ModalDialog;
