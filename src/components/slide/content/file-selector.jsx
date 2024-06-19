import { React, useState } from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import "../../util/image-uploader/image-uploader.scss";
import { useTranslation } from "react-i18next";
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
  multiple = false,
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

  const filesAddedFromLibrary = ({ target }) => {
    const newFiles = [...files];

    target?.value?.forEach((id) => {
      const found = newFiles.find((f) => f["@id"] === id);

      if (!found) {
        newFiles.push(id);
      }
    });

    onFilesChange({ target: { id: name, value: newFiles } });
  };

  const fileDataChange = () => {
    onFilesChange({ target: { id: name, value: files } });
  };

  const removeFile = (fileEntry) => {
    const newFiles = [...files].filter((f) => {
      if (Object.prototype.hasOwnProperty.call(fileEntry, "@id")) {
        if (f["@id"] === fileEntry["@id"]) {
          return false;
        }
      }
      if (Object.prototype.hasOwnProperty.call(fileEntry, "tempId")) {
        if (f.tempId === fileEntry.tempId) {
          return false;
        }
      }
      return true;
    });
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
          inputFile={fileEntry}
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
      {enableMediaLibrary && (
        <>
          <Button
            disabled={!multiple && files.length > 0}
            variant="success"
            onClick={() => setShowMediaModal(true)}
          >
            {t("file-selector.open-media-library")}
          </Button>
          {/*
              TODO: Make this configurable. It should always align with sizes in
              https://github.com/os2display/display-api-service/blob/develop/src/Entity/Tenant/Media.php
          */}
          <div className="small mt-3">
            {t("file-selector.max-size")}: 200 MB
          </div>
          <MediaSelectorModal
            selectedMedia={files}
            multiple={multiple}
            onClose={closeModal}
            selectMedia={filesAddedFromLibrary}
            show={showMediaModal}
            fieldName={name}
          />
        </>
      )}

      <div>{renderFileFormElements(files)}</div>
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
