import { React, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

/**
 * @param props - The props.
 * @param props.fileEntry - The file to preview.
 * @param props.enableVideoControls - Enable the video controls for the preview of video files?
 */
function FilePreview({ fileEntry, enableVideoControls = false }) {
  const { t } = useTranslation("common");
  const [preview, setPreview] = useState('');

  useEffect(() => {
    if (fileEntry?.file) {
      setPreview(URL.createObjectURL(fileEntry.file));
    }
  }, [fileEntry]);

  const renderPreview = (fileEntry) => {
    if (fileEntry?.assets) {
      const { assets } = fileEntry;

      if (assets.type?.indexOf("image/") === 0) {
        return (
          <img src={assets.uri} alt={t("file.image-preview")} width="100%" />
        );
      } else if (assets.type?.indexOf("video/") === 0) {
        return <video width="100%" height="100%" controls={enableVideoControls} src={assets.uri} />;
      }
    }
    else if (preview !== '') {
      const { file } = fileEntry;

      if (file.type?.indexOf("image/") === 0) {
        return (
          <img
            src={preview}
            alt={t("file.image-preview")}
            width="100%"
          />
        );
      } else if (file.type?.indexOf("video/") === 0) {
        return (
          <video width="100%" height="100%" controls={enableVideoControls} src={preview} />
        );
      }
    }

    return t("file-preview.not-supported");
  };

  return renderPreview(fileEntry);
}

FilePreview.propTypes = {
  fileEntry: PropTypes.shape({
    assets: PropTypes.shape({}),
    file: PropTypes.shape({}),
  }),
  enableVideoControls: PropTypes.bool,
};

export default FilePreview;
