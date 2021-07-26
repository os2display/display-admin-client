import { React, useState } from "react";
import PropTypes from "prop-types";
import ImageUploading from "react-images-uploading";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import "./image-uploader.scss";
import { FormattedMessage } from "react-intl";

/**
 * @param {object} props
 * The props.
 * @param {object} props.inputImage
 * The image object.
 * @param {Function} props.handleImageUpload
 * Callback for image upload.
 * @param {string} props.name
 * The name of the image field.
 * @returns {object}
 * The image uploader.
 */
function ImageUploader({ inputImage, handleImageUpload, name }) {
  const imageFromProps = inputImage ? [inputImage] : [];
  const [images, setImages] = useState(imageFromProps);
  const onChange = (imageList) => {
    // data for submit
    setImages(imageList);
    const target = { value: imageList, id: name };
    handleImageUpload({ target });
  };

  return (
    <div className="App">
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={1}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          // write your building UI
          <>
            {imageList.length === 0 && (
              <>
                <Button variant="success" onClick={onImageUpload}>
                  <FormattedMessage
                    id="pick_an_image"
                    defaultMessage="pick_an_image"
                  />
                </Button>
                <div
                  className={
                    isDragging
                      ? "drag-drop-area drag-drop-area-active"
                      : "drag-drop-area"
                  }
                  style={
                    isDragging ? { borderColor: "green" } : { borderColor: "" }
                  }
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
              <div key={image.data_url} className="image-item">
                <img src={image.data_url} alt="" width="400" />
                <Button variant="danger" onClick={() => onImageRemove(index)}>
                  <FormattedMessage
                    id="remove_image"
                    defaultMessage="remove_image"
                  />
                </Button>
              </div>
            ))}
          </>
        )}
      </ImageUploading>
    </div>
  );
}

ImageUploader.defaultProps = {
  inputImage: {},
};

ImageUploader.propTypes = {
  inputImage: PropTypes.shape({ data_url: PropTypes.string }),
  handleImageUpload: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default ImageUploader;
