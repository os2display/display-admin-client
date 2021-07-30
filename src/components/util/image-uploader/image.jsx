import { React, useState } from "react";
import PropTypes from "prop-types";
import { Button, Row, Col } from "react-bootstrap";
import FormInput from "../forms/form-input";
import TagDropdown from "../forms/multiselect-dropdown/tags/tag-dropdown";
import { useTranslation } from "react-i18next";
import "./image-uploader.scss";
/**
 * @param {object} props
 * The props.
 * @param {object} props.inputImage
 * The image object.
 * @param {Function} props.handleImageUpload
 * Callback for image upload.
 * @param {string} props.name
 * The name of the image field.
 * @param {boolean} props.multipleImages
 * Whether the user should be able to upload multiple images.
 * @param {Array} props.errors
 * A list of errors, or null.
 * @param {string} props.invalidText
 * Text on error.
 * @returns {object}
 * The image uploader.
 */
function Image({ inputImage, onImageRemove, handleChange, errors, index }) {
  const { t } = useTranslation("common");
  const [image, setImage] = useState(inputImage);

  function onChange({ target }) {
    let localImage = image;
    localImage[target.id] = target.value;
    setImage(localImage);
    handleChange(image);
  }

  return (
    <div>
      <Row className="mb-2">
        <Col md="3" className="image">
          <img src={image.data_url} alt="" />
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
              ></FormInput>
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
              ></FormInput>
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

export default Image;
