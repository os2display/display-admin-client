import { React, useState, useEffect } from "react";
import PropTypes from "prop-types";
import ImageUploading from "react-images-uploading";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import "./image-uploader.scss";
import { FormattedMessage, useIntl } from "react-intl";

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

  /**
   * Load content from fixture.
   */
  useEffect(() => {
    // @TODO load real content.
    setImages(Array.isArray(inputImage) ? inputImage : [inputImage]);
  }, [inputImage]);

  const onChange = (imageList) => {
    // data for submit
    setImages(imageList);
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
              <div key={image.data_url} className="d-flex">
                <img
                  src={image.data_url}
                  alt=""
                  style={{ objectFit: "contain" }}
                  width="100"
                />
                <div>
                  <div className="m-2">
                    <Button
                      variant="success"
                      onClick={() => onImageUpdate(index)}
                    >
                      <FormattedMessage
                        id="replace_image"
                        defaultMessage="replace_image"
                      />
                    </Button>
                  </div>
                  <div className="m-2">
                    <Button
                      variant="danger"
                      onClick={() => onImageRemove(index)}
                    >
                      <FormattedMessage
                        id="remove_image"
                        defaultMessage="remove_image"
                      />
                    </Button>
                  </div>
                </div>
              </div>
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
  inputImage: PropTypes.shape({ data_url: PropTypes.string }),
  handleImageUpload: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  multipleImages: PropTypes.bool,
  errors: PropTypes.arrayOf(PropTypes.string),
  invalidText: PropTypes.string,
};

export default ImageUploader;
