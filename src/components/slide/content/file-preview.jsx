import { React, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

/**
 * @param {object} props - The props.
 * @param {object} props.fileEntry - The file to preview.
 * @param {boolean} props.enableVideoControls - Enable the video controls for
 *   the preview of video files?
 * @returns {object} FilePreview component.
 */
function FilePreview({ fileEntry, enableVideoControls = false }) {
  const { t } = useTranslation("common");
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (fileEntry?.file) {
      setPreview(URL.createObjectURL(fileEntry.file));
    }
  }, [fileEntry]);

  const renderPreview = (fileEntryToRender) => {
    /* eslint-disable jsx-a11y/media-has-caption */
    if (fileEntryToRender?.assets) {
      const { assets, title } = fileEntryToRender;

      if (assets.type?.indexOf("image/") === 0) {
        return <img src={assets.uri} alt={title} width="100%" />;
      }

      if (assets.type?.indexOf("video/") === 0) {
        return (
          <video
            width="100%"
            height="100%"
            controls={enableVideoControls}
            src={assets.uri}
          />
        );
      }
    } else if (preview !== "") {
      const { file } = fileEntryToRender;

      if (file.type?.indexOf("image/") === 0) {
        return <img src={preview} alt={t("file.image-preview")} width="100%" />;
      }
      if (file.type?.indexOf("video/") === 0) {
        return (
          <video
            width="100%"
            height="100%"
            muted
            controls={enableVideoControls}
            src={preview}
          />
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
