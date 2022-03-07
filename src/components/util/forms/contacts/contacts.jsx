import { React, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import AddEditContact from "./add-edit-contact";
import ContactView from "./contact-view";
import { ulid } from "ulid";

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
  getInputImage,
  onMediaChange,
  formData,
}) {
  const [contacts, setContacts] = useState([]);
  const [contactToEdit, setContactToEdit] = useState(null);

  // Initial state, if editing a slide with saved contacts
  useEffect(() => {
    if (value?.contacts) {
      setContacts(value.contacts);
    }
  }, [value]);

  /**
   * Set state on change in input field
   *
   * @param {object} contact The contact to add
   */
  function addContact(contact) {
    const contactsCopy = [...contacts];
    contactsCopy.push({ ...contact, id: ulid(new Date().getTime()) });
    setContacts(contactsCopy);
  }

  /**
   * Set state on change in input field
   *
   * @param {object} contact The contact to edit
   */
  function editContact(contact) {
    setContactToEdit(contact);
  }

-  /** @param {object} contact The contact to remove */
  function removeContact(contact) {
    setContacts(
      [...contacts].filter(({ id }) => !(id === contact.id))
    );
  }

  return (
    <Card className={formGroupClasses}>
      <Card.Body>
        {contacts.length > 0 && (
          <div className="d-flex flex-wrap">
            {contacts.map((contact) => (
              <ContactView
                contact={contact}
                removeContact={removeContact}
                getInputImage={getInputImage}
                editContact={editContact}
              />
            ))}
          </div>
        )}
        {(contacts.length < 6 || contactToEdit) && (
          <AddEditContact
            formData={formData}
            contact={contactToEdit}
            getInputImage={getInputImage}
            nextIndex={
              contactToEdit ? contactToEdit.index : contacts.length
            }
            onMediaChange={onMediaChange}
            editContact={() => {}}
            addContact={() => {}}/>
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
  onMediaChange: PropTypes.func.isRequired,
  getInputImage: PropTypes.func.isRequired,
  formData: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Contacts;
