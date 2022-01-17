import { React, useState } from "react";
import PropTypes from "prop-types";
import ImageUploading from "react-images-uploading";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import "../../util/image-uploader/image-uploader.scss";
import { useTranslation } from "react-i18next";
import { ulid } from "ulid";
import Image from "../../util/image-uploader/image";
import MediaSelectorModal from "./media-selector-modal";
import FileFormElement from "./file-form-element";
import FileDropzone from "./file-dropzone";

/**
 * File selector.
 *
 * @param {object} props - The props.
 * @param {object} props.files - The selected files.
 * @param {Function} props.onFilesChange - Callback when files have changed.
 * @param {boolean} props.multiple - Select more than one media?
 * @param {boolean} props.enableMediaLibrary - Whether to allow selecting media
 *   from the library.
 * @param {string} props.name - Field name.
 * @param {Array | null} props.acceptedMimetypes - Accepted mimetypes. Set as
 *   null to allow all.
 * @returns {object} - The FileSelector component.
 */
function FileSelector({
  files,
  multiple = true,
  onFilesChange,
  enableMediaLibrary = true,
  name,
  acceptedMimetypes = null,
}) {
  const { t } = useTranslation("common");
  const [showMediaModal, setShowMediaModal] = useState(false);

  const closeModal = () => {
    setShowMediaModal(false);
  };

  const filesAdded = (addedFiles) => {
    const newFileEntries = [...addedFiles].map((file) => {
      return {
        "@id": `TEMP${ulid(new Date().getTime())}`,
        preview: URL.createObjectURL(file),
        title: "",
        description: "",
        license: "",
        file,
        editable: true,
      };
    });
    const newFiles = multiple ? [...files, ...newFileEntries] : newFileEntries;
    onFilesChange({ target: { id: name, value: newFiles } });
  };

  const fileDataChange = () => {
    onFilesChange({ target: { id: name, value: files } });
  };

  const removeFile = (fileEntry) => {
    const newFiles = files.filter((f) => f.id !== fileEntry.id);
    onFilesChange({ target: { id: name, value: newFiles } });
  };

  const renderFileFormElements = (fileEntries) =>
    fileEntries.map((fileEntry) => (
      <div
        key={fileEntry["@id"]}
        className="bg-light border p-3 pb-0 rounded my-3"
      >
        <FileFormElement
          onChange={fileDataChange}
          input={fileEntry}
          onRemove={() => removeFile(fileEntry)}
          disableInput={!fileEntry.editable}
        />
      </div>
    ));

  return (
    <>
      <FileDropzone
        onFilesAdded={filesAdded}
        acceptedMimetypes={acceptedMimetypes}
      />

      <div>{renderFileFormElements(files)}</div>

      {enableMediaLibrary && (
        <>
          <Button variant="success" onClick={() => setShowMediaModal(true)}>
            {t("file-selector.open-media-library")}
          </Button>
          <MediaSelectorModal
            selectedMedia={files}
            multiple={multiple}
            onClose={closeModal}
            selectMedia={onFilesChange}
            show={showMediaModal}
            fieldName={name}
          />
        </>
      )}
    </>
  );
}

FileSelector.propTypes = {
  files: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onFilesChange: PropTypes.func.isRequired,
  multiple: PropTypes.bool,
  enableMediaLibrary: PropTypes.bool,
  name: PropTypes.string.isRequired,
  acceptedMimetypes: PropTypes.arrayOf(PropTypes.string),
};

export default FileSelector;
