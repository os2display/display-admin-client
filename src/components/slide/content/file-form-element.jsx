import { React } from "react";
import PropTypes from "prop-types";
import { Button, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import FormInput from "../../util/forms/form-input";
import FilePreview from "./file-preview";

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
  const md = displayPreview ? "9" : "12";

  const onChangeFile = ({ target }) => {
    const localFile = input;
    localFile[target.id] = target.value;
    onChange(localFile);
  }

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

  return (
    <Row className="mb-3">
      {displayPreview &&
        <Col md="3" className="mb-3 mb-md-0">
          {FilePreview(input)}
        </Col>
      }
      <Col md={md}>
        <FormInput
          name="title"
          type="text"
          label={t("file.title-label")}
          placeholder={t("file.title-placeholder")}
          value={input.title}
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
          value={input.description}
          onChange={onChangeFile}
          formGroupClasses="mb-3"
          disabled={disableInput}
        />
        <FormInput
          name="license"
          type="text"
          label={t("file.license-label")}
          placeholder={t("file.license-placeholder")}
          value={input.license}
          onChange={onChangeFile}
          formGroupClasses="mb-3"
          disabled={disableInput}
        />
        {displayFileInfo && input?.file?.path && input?.file?.size &&
          <div>
            {input.file.path} - {input.file.size} bytes
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
    file: PropTypes.shape({}),
    title: PropTypes.string,
    description: PropTypes.string,
    license: PropTypes.string,
  }).isRequired,
  onRemove: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  disableInput: PropTypes.bool,
  displayPreview: PropTypes.bool,
  displayFileInfo: PropTypes.bool,
};

export default FileFormElement;
