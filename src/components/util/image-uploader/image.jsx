import { React, useState } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { Button, Row, Col } from "react-bootstrap";
import "./image-uploader.scss";
import { FormattedMessage } from "react-intl";
import FormInput from "../forms/form-input";
import TagDropdown from "../forms/multiselect-dropdown/tags/tag-dropdown";
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
  const intl = useIntl();
  const inputImageName = intl.formatMessage({ id: "input_image_name" });
  const imageName = intl.formatMessage({ id: "image_name" });
  const imageTags = intl.formatMessage({ id: "image_tags_label" });
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
                label={imageName}
                placeholder={inputImageName}
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
                label={"Bekrivelse, bruges til alt tekst"}
                placeholder={"Skriv beskrivelse af billedet"}
                value={image.mediaDescription}
                onChange={onChange}
              ></FormInput>
            </div>
            <div>
              <TagDropdown
                selected={image.mediaTags || []}
                name="mediaTags"
                label={imageTags}
                handleTagSelection={onChange}
              />
            </div>
            <Row>
              <Col md="auto">
                <Button variant="danger" onClick={() => onImageRemove(index)}>
                  <FormattedMessage
                    id="remove_image"
                    defaultMessage="remove_image"
                  />
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
