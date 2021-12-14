import { React, useState } from "react";
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
 * Media selector.
 *
 * @param {object} props - The props.
 * @param {object} props.selectedMedia - The selected media.
 * @param {Function} props.onSelectedMedia - Callback when selected media has changed.
 * @param {boolean} props.multiple - Whether the user should be able to upload
 *   multiple media.
 * @param {boolean} props.enableMediaLibrary Whether to show the library button.
 * @param {boolean} props.enableDropZone Enable the dropzone.
 * @param {string} props.name Field name.
 * @returns {object} The media uploader.
 */
function MediaSelector({
  selectedMedia,
  multiple,
  onSelectedMedia,
  enableMediaLibrary,
  enableDropZone,
  name,
}) {
  const { t } = useTranslation("common");
  const [showMediaModal, setShowMediaModal] = useState(false);

  /** Close the modal */
  function closeModal() {
    setShowMediaModal(false);
  }

  /**
   * Handle image uploading change
   *
   * @param {Array} data Array of media.
   */
  const imageUploadingChange = (data) => {
    onSelectedMedia({ target: { id: name, value: data } });
  };

  return (
    <>
      <ImageUploading
        multiple={multiple}
        value={selectedMedia}
        onChange={imageUploadingChange}
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

                {enableDropZone && (
                  <>
                    <div
                      className={
                        isDragging
                          ? "drag-drop-area drag-drop-area-active"
                          : "drag-drop-area"
                      }
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
              </>
            )}

            {imageList.map((image, index) => {
              const key = image?.file ? image.file.name : image["@id"];

              return (
                <Image
                  inputImage={image}
                  handleChange={() => {
                    imageUploadingChange(imageList);
                  }}
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

      {enableMediaLibrary && (
        <MediaSelectorModal
          selectedMedia={selectedMedia}
          multiple={multiple}
          onClose={closeModal}
          selectMedia={onSelectedMedia}
          show={showMediaModal}
          fieldName={name}
        />
      )}
    </>
  );
}

MediaSelector.defaultProps = {
  multiple: false,
  enableMediaLibrary: true,
  enableDropZone: true,
};

MediaSelector.propTypes = {
  selectedMedia: PropTypes.arrayOf(PropTypes.shape({ url: PropTypes.string }))
    .isRequired,
  onSelectedMedia: PropTypes.func.isRequired,
  multiple: PropTypes.bool,
  enableMediaLibrary: PropTypes.bool,
  enableDropZone: PropTypes.bool,
  name: PropTypes.string.isRequired,
};

export default MediaSelector;
