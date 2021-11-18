import { React, useEffect, useState } from "react";
import PropTypes from "prop-types";
import ImageUploading from "react-images-uploading";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import "../../util/image-uploader/image-uploader.scss";
import { useTranslation } from "react-i18next";
import Image from "../../util/image-uploader/image";
import MediaSelectorModal from "./media-selector-modal";

/**
 * @param {object} props - The props.
 * @param {object} props.selectedMedia - The selected images.
 * @param {Function} props.onSelectedMedia - Callback when selected images have changed.
 * @param {boolean} props.multiple - Whether the user should be able to upload multiple images.
 * @param {string} props.invalidText Text on error.
 * @param {boolean} props.enableMediaLibrary Whether to show the library button.
 * @returns {object} The image uploader.
 */
function MediaSelector(
  {
    selectedMedia,
    multiple,
    onSelectedMedia,
    invalidText,
    enableMediaLibrary,
    enableDropZone
  }) {
  const { t } = useTranslation("common");
  const invalidInputText = invalidText || t("image-uploader.validation-text");
  const [showMediaModal, setShowMediaModal] = useState(false);

  // @TODO: Handles errors.
  const [error] = useState(false);

  /** Close the modal */
  function closeModal() {
    setShowMediaModal(false);
  }

  /** @TODO: Document */
  const onChange = (images) => {
    console.log('@TODO: onChange', images);
    onSelectedMedia(images);
  }

  return (
    // @TODO: error handling
    <div className={error ? "invalid" : ""}>
      <ImageUploading
        multiple={multiple}
        value={selectedMedia}
        onChange={onChange}
        dataURLKey="url"
      >
        {({ imageList, onImageUpload, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
          <div className="upload__image-wrapper bg-light border p-3 pb-0 rounded my-3">
            {(imageList.length === 0 || multiple) && (
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
                  {!multiple && t("image-uploader.pick-image")}
                  {multiple && t("image-uploader.pick-more-images")}
                </Button>

                {enableMediaLibrary && (
                  <Button
                    variant="success"
                    onClick={() => setShowMediaModal(true)}
                  >
                    {t("image-uploader.media-library")}
                  </Button>
                )}

                {enableDropZone &&
                  <>
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

                    <small
                      id="aria-label-for-drag-and-drop"
                      className="form-text mb-3"
                    >
                      {t("image-uploader.help-text")}
                    </small>
                  </>
                }
              </>
            )}

            {imageList.map((image, index) => {
              const key = image?.file ? image.file.name : image["@id"];

              return (
                <Image
                  inputImage={image}
                  handleChange={onChange}
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

      {error && (
        <div className="invalid-feedback-image-uploader">
          {invalidInputText}
        </div>
      )}

      {enableMediaLibrary &&
        <MediaSelectorModal
          selectedMedia={[]}
          multiple={multiple}
          onClose={closeModal}
          selectMedia={onChange}
          show={showMediaModal}
        />
      }
    </div>
  );
}

MediaSelector.defaultProps = {
  multiple: false,
  enableMediaLibrary: true,
  enableDropZone: true,
  invalidText: null,
};

MediaSelector.propTypes = {
  selectedMedia: PropTypes.arrayOf(PropTypes.shape({ url: PropTypes.string })).isRequired,
  onSelectedMedia: PropTypes.func.isRequired,
  multiple: PropTypes.bool,
  enableMediaLibrary: PropTypes.bool,
  enableDropZone: PropTypes.bool,
  invalidText: PropTypes.string,
};

export default MediaSelector;
