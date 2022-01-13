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
import FileFormElement from "./file-form-element";
import FileDropzone from "./file-dropzone";

/**
 * File selector.
 *
 * @param {object} props - The props.
 * @param {object} props.files - The selected files.
 * @param {Function} props.onFileChange - Callback when selected file has changed.
 * @param {boolean} props.multiple - Select more than one media?
 * @param {boolean} props.enableMediaLibrary - Whether to allow selecting media from the library.
 * @param {string} props.name Field name.
 * @returns {object} The FileSelector component.
 */
function FileSelector({
  files,
  multiple = false,
  onFileChange,
  enableMediaLibrary = true,
  name,
}) {
  const { t } = useTranslation("common");
  const [showMediaModal, setShowMediaModal] = useState(false);

  const closeModal = () => {
    setShowMediaModal(false);
  }

  const filesChange = (files) => {
    console.log("filesChange", files);
    onFileChange({ target: { id: name, value: files } });
  };

  const fileDataChange = (file) => {
    const newFiles = [...files, file];
    onFileChange(newFiles);
  }

  const renderFileFormElements = (files) => files.map(file => (
    <div key={file.path} className="bg-light border p-3 pb-0 rounded my-3">
      <FileFormElement onChange={(data) => {fileDataChange(data)}} input={file} onRemove={() => {console.log('onRemove - TODO')}} disableInput={false} />
    </div>
  ));

  return (
    <>
      <FileDropzone onChange={filesChange} files={files} />

      <div>{renderFileFormElements(files)}</div>

      {enableMediaLibrary && (
        <>
          {/*
        <MediaSelectorModal
          selectedMedia={files}
          multiple={multiple}
          onClose={closeModal}
          selectMedia={onSelectedMedia}
          show={showMediaModal}
          fieldName={name}
        />
        */}
        </>
      )}
    </>
  );
}

FileSelector.propTypes = {
  files: PropTypes.arrayOf(
    PropTypes.shape({})
  ).isRequired,
  onFileChange: PropTypes.func.isRequired,
  multiple: PropTypes.bool,
  enableMediaLibrary: PropTypes.bool,
  name: PropTypes.string.isRequired,
};

export default FileSelector;
