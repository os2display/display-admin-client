import { React, useState, useEffect } from "react";
import PropTypes from "prop-types";
import AddEditContact from "./add-edit-contact";
import ContactView from "./contact-view";

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
  const [contactToEdit, setContactToEdit] = useState();

  // Initial state, if editing a slide with saved contacts
  useEffect(() => {
    if (value) {
      setContacts(value);
    }
  }, []);

  /**
   * Set state on change in input field
   *
   * @param {object} contact The contact to add
   */
  function addContact(contact) {
    const localContact = { ...contact };
    const image = getInputImage({ name: localContact.mediaId });
    if (Array.isArray(image) && image.length > 0) {
      localContact.media = { image: [image[0].tempId] };
    }
    const contactsCopy = [...contacts];
    // If the contact is being edited, it has an index.
    if (Number.isInteger(localContact.index)) {
      contactsCopy[localContact.index] = localContact;
    } else {
      contactsCopy.push({ ...localContact, index: contactsCopy.length });
    }
    setContactToEdit();
    setContacts(contactsCopy);
  }

  // If contacts change, return the value to slide manager.
  useEffect(() => {
    const returnTarget = {
      value: contacts,
      id: name,
    };

    onChange({ target: returnTarget });
  }, [contacts]);

  /**
   * Set state on change in input field
   *
   * @param {object} contact The contact to edit
   */
  function editContact(contact) {
    setContactToEdit(contact);
  }

  /** @param {object} contact The contact to remove */
  function removeContact(contact) {
    setContacts(
      [...contacts].filter(({ mediaId }) => !(mediaId === contact.mediaId))
    );
  }

  return (
    <div className={formGroupClasses}>
      {contacts?.length > 0 && (
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
      {(contacts?.length < 6 || contactToEdit) && (
        <AddEditContact
          formData={formData}
          contact={contactToEdit}
          addContact={addContact}
          getInputImage={getInputImage}
          nextIndex={contactToEdit ? contactToEdit.index : contacts.length}
          onMediaChange={onMediaChange}
        />
      )}
    </div>
  );
}
Contacts.defaultProps = {
  formGroupClasses: "",
};

Contacts.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.objectOf(PropTypes.any).isRequired,
  formGroupClasses: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onMediaChange: PropTypes.func.isRequired,
  getInputImage: PropTypes.func.isRequired,
  formData: PropTypes.objectOf(PropTypes.any).isRequired,
};
export default Contacts;
