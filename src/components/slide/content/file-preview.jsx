import { React } from "react";
import PropTypes from "prop-types";

function FilePreview({fileEntry}) {
  const renderPreview = (fileEntry) => {
    if (fileEntry?.assets) {
      const assets = fileEntry.assets;

      if (assets.type?.indexOf('image/') === 0) {
        return <img src={assets.uri} alt={t("file.image-preview")} width="100%" />;
      } else if (assets.type?.indexOf('video/') === 0) {
        return <video width="100%" height="100%" controls src={assets.uri} />;
      } else {
        return t('file.preview-not-supported');
      }
    } else if (fileEntry?.file) {
      const file = fileEntry.file;

      if (file.type?.indexOf('image/') === 0) {
        return <img src={fileEntry?.preview} alt={t("file.image-preview")} width="100%" />;
      } else if (file.type?.indexOf('video/') === 0) {
        return <video width="100%" height="100%" controls src={fileEntry?.preview} />;
      } else {
        return t('file.preview-not-supported');
      }
    }
  }

  return renderPreview(fileEntry);
}

FilePreview.propTypes = {
  fileEntry: PropTypes.shape({
    assets: PropTypes.shape({}),
    file: PropTypes.shape({}),
  })
}

export default FilePreview;
