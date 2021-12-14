import { React, useEffect, useState } from "react";
import PropTypes from "prop-types";
import set from "lodash.set";
import { Button, Col, Row } from "react-bootstrap";
import { ulid } from "ulid";
import { useTranslation } from "react-i18next";
import MediaSelector from "../../../slide/content/media-selector";
import FormInput from "../form-input";

/**
 * An input for adding/editing contacts.
 *
 * @param {string} props The props.
 * @param {Function} props.onMediaChange For keeping images updated
 * @param {Function} props.addContact For adding contact
 * @param {Function} props.contact The contact currently being edited
 * @param {Function} props.getInputImage For getting contact image
 * @returns {object} Add/edit contact component.
 */
function AddEditContact({
  addContact,
  contact: inputContact,
  onMediaChange,
  getInputImage,
}) {
  const { t } = useTranslation("common");
  const [edit, setEdit] = useState(false);
  const [contact, setContact] = useState({
    name: "",
    phone: "",
    title: "",
    email: "",
    image: "",
    tempId: ulid(new Date().getTime()),
  });

  useEffect(() => {
    if (inputContact) {
      setContact(inputContact);
      setEdit(true);
    }
  }, [inputContact]);

  /**
   * @param {object} props The props
   * @param {object} props.target Event target.
   */
  function onInput({ target }) {
    let localContact = { ...contact };
    localContact = JSON.parse(JSON.stringify(localContact));
    set(localContact, target.name, target.value);
    setContact(localContact);
  }

  /** Adding contact callback */
  function onAdd() {
    addContact(contact);

    setContact({
      name: "",
      phone: "",
      title: "",
      email: "",
      image: "",
      tempId: ulid(new Date().getTime()),
    });
    setEdit(false);
  }

  return (
    <>
      <Row className="g-2">
        <Col xs="auto">
          <FormInput
            name="title"
            type="text"
            label={t("add-contact.title")}
            value={contact.title}
            onChange={onInput}
          />
        </Col>
        <Col md>
          <FormInput
            name="name"
            type="text"
            label={t("add-contact.name")}
            value={contact.name}
            onChange={onInput}
          />
        </Col>
      </Row>
      <Row className="g-2">
        <Col xs="auto">
          <FormInput
            name="phone"
            type="number"
            label={t("add-contact.phone")}
            value={contact.phone}
            onChange={onInput}
          />
        </Col>
        <Col md>
          <FormInput
            name="email"
            type="email"
            label={t("add-contact.email")}
            value={contact.email}
            onChange={onInput}
          />
        </Col>
      </Row>
      <MediaSelector
        multiple={false}
        selectedMedia={
          contact.tempId
            ? getInputImage({
                name: `contacts-image-${contact.tempId}`,
              })
            : []
        }
        onSelectedMedia={onMediaChange}
        name={`contacts-image-${contact.tempId}`}
      />
      {!edit && (
        <Button variant="primary" type="button" onClick={() => onAdd()}>
          {t("add-contact.add-contact")}
        </Button>
      )}
      {edit && (
        <Button variant="primary" type="button" onClick={() => onAdd()}>
          {t("add-contact.update-contact")}
        </Button>
      )}
    </>
  );
}

AddEditContact.propTypes = {
  addContact: PropTypes.func.isRequired,
  contact: PropTypes.objectOf({
    name: PropTypes.string,
    image: PropTypes.string,
    phone: PropTypes.number,
    title: PropTypes.string,
  }).isRequired,
  onMediaChange: PropTypes.func.isRequired,
  getInputImage: PropTypes.func.isRequired,
};

export default AddEditContact;
