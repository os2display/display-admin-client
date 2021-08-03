import { React, useState } from "react";
import PropTypes from "prop-types";
import { Button, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import FormInput from "../forms/form-input";
import TagDropdown from "../forms/multiselect-dropdown/tags/tag-dropdown";
import "./image-uploader.scss";
/**
 * @param {object} props
 * The props.
 * @param {object} props.inputImage
 * The image object.
 * @param {Array} props.errors
 * A list of errors, or null.
 * @param {Function} props.onImageRemove
 * A callback on remove image.
 * @param {Function} props.handleChange
 * A callback on change.
 * @param {number} props.index
 * The index, used for image removal.
 * @returns {object}
 * The image uploader.
 */
function Image({ inputImage, onImageRemove, handleChange, errors, index }) {
  const { t } = useTranslation("common");
  const [image, setImage] = useState(inputImage);

  /**
   * @param {object} props
   * The props
   * @param {object} props.target
   * The onchange target.
   */
  function onChange({ target }) {
    const localImage = image;
    localImage[target.id] = target.value;
    setImage(localImage);
    handleChange(image);
  }

  return (
    <div>
      <Row className="mb-2">
        <Col md="3" className="image">
          <img src={image.url} alt="" />
        </Col>
        <Col>
          <div>
            <div>
              <FormInput
                name="mediaName"
                type="text"
                errors={errors}
                label={t("image.image-name-label")}
                placeholder={t("image.image-name-placeholder")}
                value={image.mediaName}
                dataUrl={image.url}
                onChange={onChange}
              />
            </div>
            <div>
              <FormInput
                name="mediaDescription"
                type="text"
                errors={errors}
                dataUrl={image.url}
                label={t("image.image-description-label")}
                placeholder={t("image.image-description-placeholder")}
                helpText={t("image.image-description-help-text")}
                value={image.mediaDescription}
                onChange={onChange}
              />
            </div>
            <div>
              <TagDropdown
                selected={image.mediaTags || []}
                name="mediaTags"
                label={t("image.image-tags-label")}
                handleTagSelection={onChange}
                helpText={t("image.image-tags-help-text")}
              />
            </div>
            <Row>
              <Col md="auto">
                <Button variant="danger" onClick={() => onImageRemove(index)}>
                  {t("image.remove-image")}
                </Button>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
}

Image.defaultProps = {
  errors: [],
};

Image.propTypes = {
  inputImage: PropTypes.func.isRequired,
  onImageRemove: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  errors: PropTypes.arrayOf(PropTypes.string),
  index: PropTypes.number.isRequired,
};

export default Image;
