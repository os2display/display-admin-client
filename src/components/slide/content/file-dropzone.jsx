import { React } from "react";
import { useDropzone } from "react-dropzone";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

/**
 * @param root0
 * @param root0.onFilesAdded
 * @param root0.acceptedMimetypes
 */
function FileDropzone({ onFilesAdded, acceptedMimetypes = null }) {
  const { t } = useTranslation("common");

  const { getRootProps, getInputProps } = useDropzone({
    accept: acceptedMimetypes,
    onDrop: (acceptedFiles) => {
      onFilesAdded([...acceptedFiles]);
    },
  });

  return (
    <>
      {/* TODO: Fix styling for dropzone: https://react-dropzone.js.org/#section-styling-dropzone */}
      <div
        {...getRootProps({ className: "dropzone drag-drop-area" })}
        style={{ height: "100px", fontSize: "2em" }}
      >
        <input {...getInputProps()} />
        <div>{t("file-dropzone.drag-and-drop-text")}</div>
      </div>
    </>
  );
}

FileDropzone.propTypes = {
  onFilesAdded: PropTypes.func.isRequired,
  acceptedMimetypes: PropTypes.arrayOf(PropTypes.string),
};

export default FileDropzone;
