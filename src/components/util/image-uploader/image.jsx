import { React, useState } from "react";
import PropTypes from "prop-types";
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
function Image({
  inputImage,
  onImageUpdate,
  onImageRemove,
  handleChange,
  errors,
  index,
}) {
  const [image, setImage] = useState(inputImage);
  console.log(index);
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
            <Row>
              <Col md="auto">
                <Button variant="success" onClick={() => onImageUpdate(index)}>
                  <FormattedMessage
                    id="replace_image"
                    defaultMessage="replace_image"
                  />
                </Button>
              </Col>
              <Col md="auto">
                <Button variant="danger" onClick={() => onImageRemove(index)}>
                  <FormattedMessage
                    id="remove_image"
                    defaultMessage="remove_image"
                  />
                </Button>
              </Col>
            </Row>
            <div className="m-2">
              <FormInput
                name="imageName"
                type="text"
                errors={errors}
                label={"navn"}
                placeholder={"skriv bileldets navn"}
                value={image.imageName}
                dataUrl={image.url}
                onChange={onChange}
              ></FormInput>
            </div>
            <div className="m-2">
              <FormInput
                name="imageDescription"
                type="text"
                errors={errors}
                dataUrl={image.url}
                label={"Bekrivelse, bruges til alt tekst"}
                placeholder={"Skriv beskrivelse af billedet"}
                value={image.imageDescription}
                onChange={onChange}
              ></FormInput>
            </div>
            <div className="m-2">
              <TagDropdown
                selected={image.imageTags || []}
                name="imageTags"
                label={"dfssdfsdfsdf"}
                handleTagSelection={onChange}
              />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Image;
