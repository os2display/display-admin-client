import { React, useEffect, useState } from "react";
import PropTypes from "prop-types";
import ImageUploading from "react-images-uploading";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import "./image-uploader.scss";
import { FormattedMessage, useIntl } from "react-intl";
import FormInput from "../forms/form-input";
import Image from "./image";

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
function ImageUploader({
  inputImage,
  handleImageUpload,
  name,
  multipleImages,
  errors,
  invalidText,
}) {
  const intl = useIntl();
  const [images, setImages] = useState([]);
  const [error, setError] = useState();
  const invalidInputText =
    invalidText || intl.formatMessage({ id: "input_error_text" });

  /**
   * Handle errors.
   */
  useEffect(() => {
    setError(errors && errors.includes(name));
  }, [errors]);

  function handleChange(image) {
    let localImages = [...images];
    let imageIndex = localImages.findIndex(
      (img) => img.data_url == image.data_url
    );
    localImages[imageIndex] = image;
    const uniqueImages = [...new Set(localImages.map((image) => image))];
    setImages(uniqueImages);
    const target = { value: images, id: name };
    handleImageUpload({ target });
  }
  /**
   * Load content from fixture.
   */
  useEffect(() => {
    // @TODO load real content.
    setImages(Array.isArray(inputImage) ? inputImage : [inputImage]);
  }, [inputImage]);

  const onChange = (imageList) => {
    // data for submit
    const uniqueImages = [
      ...new Map(imageList.map((item) => [item["data_url"], item])).values(),
    ];

    setImages(uniqueImages);
    const target = { value: imageList, id: name };
    handleImageUpload({ target });
  };

  return (
    <div className={error ? "invalid" : ""}>
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          // write your building UI
          <div className="upload__image-wrapper">
            {(imageList.length === 0 || multipleImages) && (
              <>
                <Button
                  variant="success"
                  onClick={onImageUpload}
                  onDrop={dragProps.onDrop}
                  onDragEnter={dragProps.onDragEnter}
                  onDragLeave={dragProps.onDragLeave}
                  onDragOver={dragProps.onDragOver}
                >
                  {!multipleImages && (
                    <FormattedMessage
                      id="pick_an_image"
                      defaultMessage="pick_an_image"
                    />
                  )}
                  {multipleImages && (
                    <FormattedMessage
                      id="pick_more_images"
                      defaultMessage="pick_more_images"
                    />
                  )}
                </Button>

                <div
                  className={
                    isDragging
                      ? "drag-drop-area drag-drop-area-active"
                      : "drag-drop-area"
                  }
                  style={error ? { borderColor: "red" } : {}}
                  onDrop={dragProps.onDrop}
                  onDragEnter={dragProps.onDragEnter}
                  onDragLeave={dragProps.onDragLeave}
                  onDragOver={dragProps.onDragOver}
                >
                  <FontAwesomeIcon icon={faImage} />
                </div>

                <small id="aria-label-for-drag-and-drop" className="form-text">
                  <FormattedMessage
                    id="image_upload_help_text"
                    defaultMessage="image_upload_help_text"
                  />
                </small>
              </>
            )}
            {imageList.map((image, index) => (
              <Image
                inputImage={image}
                handleChange={handleChange}
                onImageUpdate={onImageUpdate}
                onImageRemove={onImageRemove}
                index={index}
                key={image.data_url}
                errors={errors}
              />
            ))}
          </div>
        )}
      </ImageUploading>
      {error && (
        <div className="invalid-feedback-image-uploader">
          {invalidInputText}
        </div>
      )}
    </div>
  );
}

ImageUploader.defaultProps = {
  inputImage: [],
  multipleImages: false,
  errors: [],
  invalidText: null,
};

ImageUploader.propTypes = {
  inputImage: PropTypes.arrayOf(
    PropTypes.shape({ data_url: PropTypes.string })
  ),
  handleImageUpload: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  multipleImages: PropTypes.bool,
  errors: PropTypes.arrayOf(PropTypes.string),
  invalidText: PropTypes.string,
};

export default ImageUploader;
