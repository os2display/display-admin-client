import { React, useEffect, useState } from "react";
import PropTypes from "prop-types";
import set from "lodash.set";
import { Button, Col, Row } from "react-bootstrap";
import { ulid } from "ulid";
import { useTranslation } from "react-i18next";
import FileSelector from "../../../slide/content/file-selector";
import FormInput from "../../../util/forms/form-input";

/**
 * Contact form.
 *
 * @param {string} props The props.
 * @param {Function} props.onChange Callback when contact changes.
 * @param {Function} props.getInputFiles For getting contact image.
 * @returns {object} Contact form component.
 */
function ContactForm({
  contact,
  onChange,
   getInputFiles,
}) {
  const { t } = useTranslation("common");

  /**
   * @param {object} props The props
   * @param {object} props.target Event target.
   */
  function onInput({ target }) {
    let localContact = { ...contact };
    set(localContact, target.name, target.value);
    onChange(localContact);
  }

  return (
    <>
      <Row className="g-2">
        <Col>
          <FormInput
            name="title"
            type="text"
            label={t("add-edit-contact.title")}
            value={contact.title}
            onChange={onInput}
          />
        </Col>
        <Col>
          <FormInput
            name="name"
            type="text"
            label={t("add-edit-contact.name")}
            value={contact.name}
            onChange={onInput}
          />
        </Col>
      </Row>
      <Row className="g-2">
        <Col>
          <FormInput
            name="phone"
            type="number"
            label={t("add-edit-contact.phone")}
            value={contact.phone}
            onChange={onInput}
          />
        </Col>
        <Col>
          <FormInput
            name="email"
            type="email"
            label={t("add-edit-contact.email")}
            value={contact.email}
            onChange={onInput}
          />
        </Col>
      </Row>
      <FileSelector
        files={[]}
        onFilesChange={(t) => {console.log('TODO: onFilesChange', t)}}
        acceptedMimetypes={["image/*"]}
        multiple={false}
        name={`contacts-image-${contact.id}`}
      />
    </>
  );
}

ContactForm.propTypes = {
  contact: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    phone: PropTypes.number,
    title: PropTypes.string,
  }).isRequired,
  getInputFiles: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onMediaChange: PropTypes.func.isRequired,
};

export default ContactForm;
