import { React } from "react";
import { useDropzone } from 'react-dropzone';
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

function FileDropzone({ onChange }) {
  const { t } = useTranslation("common");

  const {getRootProps, getInputProps} = useDropzone({
    onDrop: (acceptedFiles) => {
      const newFiles = [...acceptedFiles].map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      }));

      onChange(newFiles);
    }
  });

  return (
    <>
      {/* TODO: Move styling into class */}
      <div {...getRootProps({className: 'dropzone drag-drop-area'})} style={{height: '100px', fontSize: '2em'}}>
        <input {...getInputProps()} />
        <div>{t('file-dropzone.drag-and-drop-text')}</div>
      </div>
    </>
  );
}

FileDropzone.propTypes = {
  onChange: PropTypes.func.isRequired,
}

export default FileDropzone;
