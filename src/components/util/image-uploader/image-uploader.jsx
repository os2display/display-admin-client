import { React, useEffect, useState } from "react";
import PropTypes from "prop-types";
import ImageUploading from "react-images-uploading";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import "./image-uploader.scss";
import { useTranslation } from "react-i18next";
import Image from "./image";
import MediaModal from "../../media-modal/media-modal";

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
  const { t } = useTranslation("common");
  const [images, setImages] = useState([]);
  const [error, setError] = useState();
  const invalidInputText = invalidText || t("image-uploader.validation-text");
  const [showMediaModal, setShowMediaModal] = useState(false);

  /**
   * Handle errors.
   */
  useEffect(() => {
    setError(errors && errors.includes(name));
  }, [errors]);

  /**
   * @param {object} image
   * The image with change.
   */
  function handleChange(image) {
    const localImages = [...images];
    const imageIndex = localImages.findIndex((img) => img.url === image.url);
    localImages[imageIndex] = image;
    const uniqueImages = [
      ...new Set(localImages.map((localImage) => localImage)),
    ];
    setImages(uniqueImages);
    const target = { value: images, id: name };
    handleImageUpload({ target });
  }

  /**
   * Sets the selected row in state.
   *
   */
  function onCloseMediaModal() {
    setShowMediaModal(false);
  }
  /**
   * Sets the selected row in state.
   *
   * @param {Array} selectedImages
   * The selected images from the modal
   */
  function onAcceptMediaModal(selectedImages) {
    setImages(selectedImages);
    setShowMediaModal(false);
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
      ...new Map(imageList.map((item) => [item.url, item])).values(),
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
        dataURLKey="url"
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
                  {!multipleImages && t("image-uploader.pick-image")}
                  {multipleImages && t("image-uploader.pick-more-images")}
                </Button>
                <Button
                  variant="success"
                  onClick={() => setShowMediaModal(true)}
                >
                  {t("image-uploader.media-library")}
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
                  {t("image-uploader.help-text")}
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
                key={image.url}
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

      <MediaModal
        show={showMediaModal}
        onClose={onCloseMediaModal}
        handleAccept={onAcceptMediaModal}
        multiple={multipleImages}
      />
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
  inputImage: PropTypes.arrayOf(PropTypes.shape({ url: PropTypes.string })),
  handleImageUpload: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  multipleImages: PropTypes.bool,
  errors: PropTypes.arrayOf(PropTypes.string),
  invalidText: PropTypes.string,
};

export default ImageUploader;
