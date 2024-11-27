import { React, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Card, Row } from "react-bootstrap";
import { ulid } from "ulid";
import { useTranslation } from "react-i18next";
import Col from "react-bootstrap/Col";
import ContactForm from "./contact-form";

/**
 * A contacts component for forms.
 *
 * @param {string} props The props.
 * @param {Array} props.inputContacts Array of contacts.
 * @param {string} props.formGroupClasses Classes.
 * @param {Function} props.onFilesChange When files are changed.
 * @returns {object} A contacts component.
 */
function Contacts({
  name,
  inputContacts,
  getInputFiles,
  onFilesChange,
  onChange,
  formGroupClasses = "",
}) {
  const { t } = useTranslation("common");
  const [contacts, setContacts] = useState([]);

  // Initial state, if editing a slide with saved contacts
  useEffect(() => {
    if (inputContacts) {
      setContacts(inputContacts);
    }
  }, [inputContacts]);

  const addContact = () => {
    const newContacts = [...contacts];
    newContacts.push({
      id: ulid(new Date().getTime()),
      name: "",
      phone: "",
      title: "",
      email: "",
      image: [],
    });
    onChange({ target: { id: name, value: newContacts } });
  };

  const updateContact = (changedContact) => {
    const newContacts = [...contacts];
    const findIndex = newContacts.findIndex(
      ({ id }) => id === changedContact.id
    );
    newContacts[findIndex] = changedContact;
    onChange({ target: { id: name, value: newContacts } });
  };

  const removeContact = (contact) => {
    const newContacts = [...contacts].filter(({ id }) => !(id === contact.id));
    onChange({ target: { id: name, value: newContacts } });
  };

  return (
    <Card className={formGroupClasses}>
      <Card.Body>
        <Row className="mb-3">
          {contacts.map((contact, index) => (
            <Col md="4" key={contact.id}>
              <Card className="m-3">
                <Card.Body>
                  <ContactForm
                    name={name}
                    index={index}
                    contact={contact}
                    onChange={updateContact}
                    getInputFiles={getInputFiles}
                    onFilesChange={onFilesChange}
                  />
                </Card.Body>

                <Card.Footer>
                  <Button
                    variant="danger"
                    type="button"
                    onClick={() => {
                      removeContact(contact);
                    }}
                  >
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

Contacts.propTypes = {
  name: PropTypes.string.isRequired,
  inputContacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      image: PropTypes.arrayOf(PropTypes.string),
      phone: PropTypes.string,
      title: PropTypes.string,
      email: PropTypes.string,
    })
  ).isRequired,
  formGroupClasses: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onFilesChange: PropTypes.func.isRequired,
  getInputFiles: PropTypes.func.isRequired,
};

export default Contacts;
