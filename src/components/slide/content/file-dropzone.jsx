import { React } from "react";
import { useDropzone } from "react-dropzone";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

/**
 * @param {object} props - The props.
 * @param {Function} props.onFilesAdded - Callback when files are added.
 * @param {Array | null} props.acceptedMimetypes - Mimetypes to accept.
 * @returns {object} Dropzone component.
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
      {/* eslint-disable react/jsx-props-no-spreading */}
      <div {...getRootProps({ className: "dropzone drag-drop-area" })}>
        <input {...getInputProps()} />
        <div>{t("file-dropzone.drag-and-drop-text")}</div>
      </div>
      {/* eslint-enable react/jsx-props-no-spreading */}
    </>
  );
}

FileDropzone.defaultProps = {
  acceptedMimetypes: null,
};

FileDropzone.propTypes = {
  onFilesAdded: PropTypes.func.isRequired,
  acceptedMimetypes: PropTypes.arrayOf(PropTypes.string),
};

export default FileDropzone;
