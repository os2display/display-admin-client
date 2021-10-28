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
 * @param {object} props The props.
 * @param {object} props.inputImage The image object.
 * @param {Function} props.handleImageUpload Callback for image upload.
 * @param {string} props.name The name of the image field.
 * @param {boolean} props.multipleImages Whether the user should be able to
 *   upload multiple images.
 * @param {string} props.invalidText Text on error.
 * @param {boolean} props.showLibraryButton Whether to show the library button.
 * @returns {object} The image uploader.
 */
function ImageUploader({
  inputImage,
  handleImageUpload,
  name,
  multipleImages,
  invalidText,
  showLibraryButton,
}) {
  const { t } = useTranslation("common");
  const [images, setImages] = useState([]);
  const [error] = useState(false);
  const invalidInputText = invalidText || t("image-uploader.validation-text");
  const [showMediaModal, setShowMediaModal] = useState(false);

  /** @param {object} image The image with change. */
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

  /** Sets the selected row in state. */
  function onCloseMediaModal() {
    setShowMediaModal(false);
  }
  /**
   * Sets the selected row in state.
   *
   * @param {Array} selectedImages The selected images from the modal
   */
  function onAcceptMediaModal(selectedImages) {
    setImages(selectedImages);
    setShowMediaModal(false);
  }

  /** Load content from fixture. */
  useEffect(() => {
    // @TODO: load real content.
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
    // @TODO: error handling
    <div className={error ? "invalid" : ""}>
      <ImageUploading
        multiple={multipleImages ?? false}
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
          <div className="upload__image-wrapper bg-light border p-3 pb-0 rounded my-3">
            {(imageList.length === 0 || multipleImages) && (
              <>
                <Button
                  variant="success"
                  onClick={onImageUpload}
                  onDrop={dragProps.onDrop}
                  onDragEnter={dragProps.onDragEnter}
                  onDragLeave={dragProps.onDragLeave}
                  onDragOver={dragProps.onDragOver}
                  className="me-3"
                >
                  {!multipleImages && t("image-uploader.pick-image")}
                  {multipleImages && t("image-uploader.pick-more-images")}
                </Button>
                {showLibraryButton && (
                  <Button
                    variant="success"
                    onClick={() => setShowMediaModal(true)}
                  >
                    {t("image-uploader.media-library")}
                  </Button>
                )}
                <div
                  className={
                    isDragging
                      ? "drag-drop-area drag-drop-area-active"
                      : "drag-drop-area"
                  }
                  // @TODO: error handling
                  style={error ? { borderColor: "red" } : {}}
                  onDrop={dragProps.onDrop}
                  onDragEnter={dragProps.onDragEnter}
                  onDragLeave={dragProps.onDragLeave}
                  onDragOver={dragProps.onDragOver}
                >
                  <FontAwesomeIcon icon={faImage} />
                </div>

                <small
                  id="aria-label-for-drag-and-drop"
                  className="form-text mb-3"
                >
                  {t("image-uploader.help-text")}
                </small>
              </>
            )}
            {imageList.map((image, index) => {
              const key = image.file ? image.file.name : image["@id"];
              return (
                <Image
                  inputImage={image}
                  handleChange={handleChange}
                  onImageUpdate={onImageUpdate}
                  onImageRemove={onImageRemove}
                  index={index}
                  key={`image-${key}`}
                />
              );
            })}
          </div>
        )}
      </ImageUploading>
      {/* @TODO: error handling */}
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
  invalidText: null,
  showLibraryButton: true,
};

ImageUploader.propTypes = {
  inputImage: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape({ url: PropTypes.string })),
    PropTypes.shape({ url: PropTypes.string }),
  ]),
  handleImageUpload: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  multipleImages: PropTypes.bool,
  invalidText: PropTypes.string,
  showLibraryButton: PropTypes.bool,
};

export default ImageUploader;
