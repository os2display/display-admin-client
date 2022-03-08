import { React, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Card, Row } from "react-bootstrap";
import ContactForm from "./contact-form";
import { ulid } from "ulid";
import { useTranslation } from "react-i18next";
import Col from "react-bootstrap/Col";

/**
 * A contacts component for forms.
 *
 * @param {string} props The props.
 * @param {string} props.name The name of the rich text field
 * @param {string} props.value The value of the rich text field
 * @param {Function} props.onChange The callback for changes in the rich text field
 * @param {string} props.formGroupClasses Classes for the formgroup
 * @param {Function} props.onMediaChange For keeping images updated
 * @param {object} props.formData FormData for retrieving images
 * @returns {object} A contacts component.
 */
function Contacts({
  name,
  value,
  onChange,
  formGroupClasses,
  getInputFiles,
  onMediaChange,
  formData,
}) {
  const { t } = useTranslation("common");
  const [contacts, setContacts] = useState([]);

  // Initial state, if editing a slide with saved contacts
  useEffect(() => {
    if (value?.contacts) {
      setContacts(value.contacts);
    }
  }, [value]);

  /**
   * Add a contact.
   */
  function addContact() {
    const contactsCopy = [...contacts];
    contactsCopy.push({
      name: "",
      phone: undefined,
      title: "",
      email: "",
      image: "",
      id: ulid(new Date().getTime()),
    });
    setContacts(contactsCopy);
  }

  const updateContact = (changedContact) => {
    const newContacts =  [...contacts];
    const findIndex = newContacts.findIndex(({ id }) => !(id === contact.id));
    console.log('findIndex', findIndex);
  }

  /**
   * Remove a contact.
   *
   * @param {object} contact The contact to remove
   */
  const removeContact = (contact) => {
    setContacts(
      [...contacts].filter(({ id }) => !(id === contact.id))
    );
  }

  return (
    <Card className={formGroupClasses}>
      <Card.Body>
        <Row className="mb-3">
          {contacts.map((contact) => (
            <Col md="4" key={contact.id}>
              <Card className="m-3">
                <Card.Body>
                  <ContactForm
                    contact={contact}
                    onChange={(changedContact) => {console.log("TODO: on change", changedContact)}}
                    getInputFiles={getInputFiles}
                    onMediaChange={() => {}}
                  />
                </Card.Body>

                <Card.Footer>
                  <Button variant="danger" type="button" onClick={() => {removeContact(contact)}}>
                    {t("contacts.remove-contact")}
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          ))}

        </Row>

        {contacts?.length < 6 && (
          <Button variant="primary" type="button" onClick={addContact}>
            {t("contacts.add-contact")}
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

Contacts.defaultProps = {
  formGroupClasses: "",
};

Contacts.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.shape({
    contacts: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      image: PropTypes.string,
      phone: PropTypes.number,
      title: PropTypes.string,
      email: PropTypes.string,
    })),
  }),
  formGroupClasses: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  getInputFiles: PropTypes.func.isRequired,
  formData: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Contacts;
