import { React, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

/**
 * @param root0
 * @param root0.fileEntry
 */
function FilePreview({ fileEntry }) {
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
        return <video width="100%" height="100%" controls src={assets.uri} />;
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
          <video width="100%" height="100%" controls src={preview} />
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
};

export default FilePreview;
