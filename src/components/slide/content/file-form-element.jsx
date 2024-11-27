import { React } from "react";
import PropTypes from "prop-types";
import { Button, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import FormInput from "../../util/forms/form-input";
import FilePreview from "./file-preview";

/**
 * @param {object} props The props.
 * @param {object} props.inputFile The file.
 * @param {Function} props.onRemove A callback on remove file.
 * @param {Function} props.onChange A callback on change.
 * @param {boolean} props.disableInput Should the inputs be disabled?
 * @param {boolean} props.displayPreview Should the preview be shown?
 * @param {boolean} props.displayFileInfo Display file info.
 * @returns {object} The file form element component.
 */
function FileFormElement({
  inputFile,
  onRemove,
  onChange,
  disableInput = false,
  displayPreview = true,
  displayFileInfo = true,
}) {
  const { t } = useTranslation("common");
  const md = displayPreview ? "4" : "6";

  const onChangeFile = ({ target }) => {
    const localFile = inputFile;
    localFile[target.id] = target.value;
    onChange(localFile);
  };

  return (
    <Row className="mb-3">
      {displayPreview && (
        <Col md="4" className="mb-3 mb-md-0">
          <FilePreview fileEntry={inputFile} enableVideoControls />
        </Col>
      )}
      <Col md={md}>
        <FormInput
          name="title"
          type="text"
          label={t("file-form-element.title-label")}
          placeholder={
            !disableInput ? t("file-form-element.title-placeholder") : ""
          }
          helpText={!disableInput ? t("file-form-element.title-help-text") : ""}
          value={inputFile.title}
          onChange={onChangeFile}
          formGroupClasses="mb-3"
          disabled={disableInput}
        />
        <FormInput
          name="description"
          type="text"
          label={t("file-form-element.description-label")}
          placeholder={
            !disableInput ? t("file-form-element.description-placeholder") : ""
          }
          helpText={
            !disableInput ? t("file-form-element.description-help-text") : ""
          }
          value={inputFile.description}
          onChange={onChangeFile}
          formGroupClasses="mb-3"
          disabled={disableInput}
        />
      </Col>
      <Col md={md}>
        <FormInput
          name="license"
          type="text"
          label={t("file-form-element.license-label")}
          placeholder={
            !disableInput ? t("file-form-element.license-placeholder") : ""
          }
          helpText={
            !disableInput ? t("file-form-element.license-help-text") : ""
          }
          value={inputFile.license}
          onChange={onChangeFile}
          formGroupClasses="mb-3"
          disabled={disableInput}
        />
        {displayFileInfo && inputFile?.file?.path && inputFile?.file?.size && (
          <div>
            {inputFile.file.path} - {inputFile.file.size} bytes
          </div>
        )}
        <Button className="mt-3" variant="danger" onClick={onRemove}>
          {t("file-form-element.remove")}
        </Button>
      </Col>
    </Row>
  );
}

FileFormElement.propTypes = {
  inputFile: PropTypes.shape({
    url: PropTypes.string,
    file: PropTypes.shape({
      path: PropTypes.string,
      size: PropTypes.number,
    }),
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
