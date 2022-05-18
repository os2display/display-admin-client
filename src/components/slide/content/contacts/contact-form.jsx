import { React } from "react";
import PropTypes from "prop-types";
import set from "lodash.set";
import { Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import FileSelector from "../file-selector";
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
  name,
  index,
  contact,
  onChange,
  getInputFiles,
  onFilesChange,
}) {
  const { t } = useTranslation("common");

  /**
   * @param {object} props The props
   * @param {object} props.target Event target.
   */
  const onInput = ({ target }) => {
    const localContact = { ...contact };
    set(localContact, target.name, target.value);
    onChange(localContact);
  };

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
            type="text"
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
        files={getInputFiles(contact.image)}
        onFilesChange={({ target }) => {
          onFilesChange({
            target: { id: `${name}.${index}.image`, value: target.value },
          });
        }}
        acceptedMimetypes={["image/*"]}
        multiple={false}
        name="image"
      />
    </>
  );
}

ContactForm.propTypes = {
  name: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  contact: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.arrayOf(PropTypes.string),
    phone: PropTypes.string,
    email: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
  getInputFiles: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onFilesChange: PropTypes.func.isRequired,
};

export default ContactForm;
