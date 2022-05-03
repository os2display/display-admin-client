import { React } from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { useTranslation } from "react-i18next";

/**
 * A view component for contacts
 *
 * @param {object} props The props.
 * @param {object} props.contact The contact to view
 * @param {Function} props.editContact The callback on edit contact
 * @param {Function} props.getInputFiles The callback for retrieving contact image
 * @param {Function} props.removeContact The callback on remove contact
 * @returns {object} A view component.
 */
function ContactView({ contact, editContact, getInputFiles, removeContact }) {
  const { t } = useTranslation("common");
  const image = getInputFiles({ name: `contacts-image-${contact.tempId}` });
  let imageUrl = "";

  // Get image url, different depending on if it is going to be saved or if it is saved
  if (Array.isArray(image) && image.length > 0) {
    imageUrl = image[0].url ? image[0].url : image[0].assets?.uri;
  }

  return (
    <Card className="mr-2 mt-2" style={{ minWidth: "18rem" }}>
      <Card.Img variant="top" src={imageUrl} />
      <Card.Body>
        <Card.Title>
          {contact.title} {contact.name}
        </Card.Title>
        <Card.Text>
          {contact.phone} {contact.email}
        </Card.Text>
        <Button variant="primary" onClick={() => editContact(contact)}>
          {t("contact-view.edit-contact")}
        </Button>
        <Button
          variant="danger"
          className="ml-2"
          onClick={() => removeContact(contact)}
        >
          {t("contact-view.remove-contact")}
        </Button>
      </Card.Body>
    </Card>
  );
}

ContactView.propTypes = {
  contact: PropTypes.objectOf({
    name: PropTypes.string,
    image: PropTypes.string,
    phone: PropTypes.number,
    title: PropTypes.string,
  }).isRequired,
  editContact: PropTypes.func.isRequired,
  getInputFiles: PropTypes.func.isRequired,
  removeContact: PropTypes.func.isRequired,
};

export default ContactView;
