import { React, useState } from "react";
import PropTypes from "prop-types";
import { Button, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import FormInput from "../forms/form-input";
import "./image-uploader.scss";
/**
 * @param {object} props The props.
 * @param {object} props.inputImage The image object.
 * @param {Function} props.onImageRemove A callback on remove image.
 * @param {Function} props.handleChange A callback on change.
 * @param {number} props.index The index, used for image removal.
 * @returns {object} The image uploader.
 */
function Image({ inputImage, onImageRemove, handleChange, index }) {
  const { t } = useTranslation("common");
  const [image, setImage] = useState(inputImage);

  /**
   * @param {object} props The props
   * @param {object} props.target The onchange target.
   */
  function onChange({ target }) {
    const localImage = image;
    localImage[target.id] = target.value;
    setImage(localImage);
    handleChange(image);
  }

  return (
    <Row className="mb-3">
      <Col md="3" className="mb-3 mb-md-0">
        <div className="image h-100 justify-content-center d-flex rounded">
          <img src={image.url} alt={t("image.image-currently-uploading")} />
        </div>
      </Col>
      <Col md="9">
        <FormInput
          name="title"
          type="text"
          label={t("image.image-name-label")}
          placeholder={t("image.image-name-placeholder")}
          value={image.title}
          onChange={onChange}
          formGroupClasses="mb-3"
        />
        <FormInput
          name="description"
          type="text"
          label={t("image.image-description-label")}
          placeholder={t("image.image-description-placeholder")}
          helpText={t("image.image-description-help-text")}
          value={image.description}
          onChange={onChange}
          formGroupClasses="mb-3"
        />
        <FormInput
          name="license"
          type="text"
          label={t("image.image-license-label")}
          placeholder={t("image.image-license-placeholder")}
          value={image.license}
          onChange={onChange}
          formGroupClasses="mb-3"
        />
        <Button
          className="mt-3"
          variant="danger"
          onClick={() => onImageRemove(index)}
        >
          {t("image.remove-image")}
        </Button>
      </Col>
    </Row>
  );
}

Image.propTypes = {
  inputImage: PropTypes.func.isRequired,
  onImageRemove: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};

export default Image;
