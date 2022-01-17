import { React } from "react";
import PropTypes from "prop-types";

/**
 * @param root0
 * @param root0.fileEntry
 */
function FilePreview({ fileEntry }) {
  const renderPreview = (fileEntry) => {
    if (fileEntry?.assets) {
      const { assets } = fileEntry;

      if (assets.type?.indexOf("image/") === 0) {
        return (
          <img src={assets.uri} alt={t("file.image-preview")} width="100%" />
        );
      }
      if (assets.type?.indexOf("video/") === 0) {
        return <video width="100%" height="100%" controls src={assets.uri} />;
      }
      return t("file.preview-not-supported");
    }
    if (fileEntry?.file) {
      const { file } = fileEntry;

      if (file.type?.indexOf("image/") === 0) {
        return (
          <img
            src={fileEntry?.preview}
            alt={t("file.image-preview")}
            width="100%"
          />
        );
      }
      if (file.type?.indexOf("video/") === 0) {
        return (
          <video width="100%" height="100%" controls src={fileEntry?.preview} />
        );
      }
      return t("file.preview-not-supported");
    }
  };

  return renderPreview(fileEntry);
}

FilePreview.propTypes = {
  fileEntry: PropTypes.shape({
    assets: PropTypes.shape({}),
    file: PropTypes.shape({}),
  }),
};

export default FilePreview;
