import { React, useState } from "react";
import PropTypes from "prop-types";
import { Button, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import FormInput from "../../util/forms/form-input";

/**
 * @param {object} props The props.
 * @param {object} props.input The file.
 * @param {Function} props.onRemove A callback on remove file.
 * @param {Function} props.onChange A callback on change.
 * @param {boolean} props.disableInput Should the inputs be disabled?
 * @param {boolean} props.displayPreview Should the preview be shown?
 * @param {boolean} props.displayFileInfo Display file info.
 * @returns {object} The file form element component.
 */
function FileFormElement({ input, onRemove, onChange, disableInput, displayPreview, displayFileInfo }) {
  const { t } = useTranslation("common");
  const [file, setFile] = useState(input);
  const md = displayPreview ? "9" : "12";

  const onChangeFile = ({ target }) => {
    const localFile = file;
    localFile[target.id] = target.value;
    setFile(localFile);
    onChange(localFile);
  }

  const renderPreview = (file) => {
    if (file.type.indexOf('image/') === 0) {
      return <img src={file.preview} alt={t("file.image-preview")} width="100%" />;
    } else if (file.type.indexOf('video/') === 0) {
      return <video width="100%" height="100%" controls src={file.preview} />;
    } else {
      return t('file.preview-not-supported');
    }
  }

  return (
    <Row className="mb-3">
      {displayPreview &&
        <Col md="3" className="mb-3 mb-md-0">
          {renderPreview(file)}
        </Col>
      }
      <Col md={md}>
        <FormInput
          name="title"
          type="text"
          label={t("file.title-label")}
          placeholder={t("file.title-placeholder")}
          value={file.title}
          onChange={onChangeFile}
          formGroupClasses="mb-3"
          disabled={disableInput}
        />
        <FormInput
          name="description"
          type="text"
          label={t("file.description-label")}
          placeholder={t("file.description-placeholder")}
          helpText={t("file.description-help-text")}
          value={file.description}
          onChange={onChangeFile}
          formGroupClasses="mb-3"
          disabled={disableInput}
        />
        <FormInput
          name="license"
          type="text"
          label={t("file.license-label")}
          placeholder={t("file.license-placeholder")}
          value={file.license}
          onChange={onChangeFile}
          formGroupClasses="mb-3"
          disabled={disableInput}
        />
        {displayFileInfo && file?.path && file?.size &&
          <div>
            {file.path} - {file.size} bytes
          </div>
        }
        <Button
          className="mt-3"
          variant="danger"
          onClick={onRemove}
        >
          {t("file.remove")}
        </Button>
      </Col>
    </Row>
  );
}

FileFormElement.defaultProps = {
  disableInput: false,
  displayPreview: true,
  displayFileInfo: true,
}

FileFormElement.propTypes = {
  input: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
  onRemove: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  disableInput: PropTypes.bool,
  displayPreview: PropTypes.bool,
  displayFileInfo: PropTypes.bool,
};

export default FileFormElement;
