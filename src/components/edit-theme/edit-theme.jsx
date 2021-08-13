import { React, useEffect, useState } from "react";
import { Redirect, useParams } from "react-router";
import { Button, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ContentHeader from "../util/content-header/content-header";
import ContentBody from "../util/content-body/content-body";
import ContentFooter from "../util/content-footer/content-footer";
import getFormErrors from "../util/helpers/form-errors-helper";
import FormInput from "../util/forms/form-input";
import ColorPicker from "../util/color-picker/color-picker";
import ColorPreview from "../util/color-picker/color-preview";
import ImageUploader from "../util/image-uploader/image-uploader";
import Select from "../util/forms/select";
import "./edit-theme.scss";
/**
 * The edit theme component.
 *
 * @returns {object}
 * The edit theme page.
 */
function EditTheme() {
  const { t } = useTranslation("common");
  const [formStateObject, setFormStateObject] = useState({
    primaryColor: "",
    secondaryColor: "",
    tertiaryColor: "",
    fontColor: "",
    logo: "",
  });
  const [showColorPicker, setShowColorPicker] = useState(null);
  const history = useHistory();
  const { id } = useParams();
  const [themeName, setThemeName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const newTheme = id === "new";
  const [errors, setErrors] = useState([]);
  const requiredFields = ["themeName", "mediaDescription", "themeName"];
  // Todo change this when real data is here.
  const fontOptions = [
    { name: "Arial", id: 2 },
    { name: "Comic sans", id: 1 },
  ];
  /**
   * Load content from fixture.
   */
  useEffect(() => {
    // @TODO load real content.
    if (!newTheme) {
      fetch("/fixtures/themes/theme.json")
        .then((response) => response.json())
        .then((jsonData) => {
          setFormStateObject({
            themeName: jsonData.theme.name,
            primaryColor: jsonData.theme.colors.primary,
            secondaryColor: jsonData.theme.colors.secondary,
            tertiaryColor: jsonData.theme.colors.tertiary,
            fontColor: jsonData.theme.colors.fontColor,
            images: [jsonData.theme.logo],
          });
          setThemeName(jsonData.theme.name);
        });
    }
  }, []);

  /**
   * Set state on change in input field
   *
   * @param {object} props
   * The props.
   * @param {object} props.target
   * event target
   */
  function handleInput({ target }) {
    const localFormStateObject = { ...formStateObject };
    localFormStateObject[target.id] = target.value;
    setFormStateObject(localFormStateObject);
  }

  /**
   * Handles validations, and goes back to list.
   *
   * @todo make it save.
   * @param {object} e
   * the submit event.
   * @returns {boolean}
   * Boolean indicating whether to submit form.
   */
  function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);
    let returnValue = false;
    const createdErrors = getFormErrors(requiredFields, formStateObject);
    if (createdErrors.length > 0) {
      setErrors(createdErrors);
    } else {
      setSubmitted(true);
      returnValue = true;
    }
    return returnValue;
  }

  /**
   * @param {string} selectedColor
   * A string or null, the selected color to open color picker for.
   */
  function openColorPicker(selectedColor) {
    const newColorPickerValue =
      typeof showColorPicker === "string" ? null : selectedColor;
    setShowColorPicker(newColorPickerValue);
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        {newTheme && <ContentHeader title={t("edit-theme.create-new-theme")} />}
        {!newTheme && (
          <ContentHeader
            title={`${t("edit-theme.edit-theme")}: ${themeName}`}
          />
        )}
        <ContentBody>
          <FormInput
            name="themeName"
            type="text"
            errors={errors}
            label={t("edit-theme.name-label")}
            placeholder={t("edit-theme.name-placeholder")}
            value={formStateObject.themeName}
            onChange={handleInput}
          />
          <ColorPreview
            name="primaryColor"
            color={formStateObject.primaryColor}
            openColorPicker={openColorPicker}
            label={t("edit-theme.pick-primary-color")}
          />
          <ColorPreview
            name="secondaryColor"
            color={formStateObject.secondaryColor}
            openColorPicker={openColorPicker}
            label={t("edit-theme.pick-secondary-color")}
          />
          <ColorPreview
            name="tertiaryColor"
            color={formStateObject.tertiaryColor}
            openColorPicker={openColorPicker}
            label={t("edit-theme.pick-tertiary-color")}
          />
          <ColorPicker
            handleChange={handleInput}
            show={showColorPicker}
            color={formStateObject[showColorPicker]}
            closeColorPicker={() => setShowColorPicker(false)}
          />
          <ImageUploader
            handleImageUpload={handleInput}
            inputImage={formStateObject.images}
            name="logo"
            errors={errors}
          />
          <Select
            value={formStateObject.fontColor}
            name="fontColor"
            options={fontOptions}
            label={t("edit-theme.font-label")}
          />
          <ColorPreview
            name="fontColor"
            color={formStateObject.fontColor}
            openColorPicker={openColorPicker}
            label={t("edit-theme.pick-font-color")}
          />
        </ContentBody>
        {submitted && <Redirect to="/themes" />}
        <ContentFooter>
          <Button
            variant="secondary"
            type="button"
            id="theme_cancel"
            onClick={() => history.goBack()}
            size="lg"
            className="me-3"
          >
            {t("edit-theme.cancel-button")}
          </Button>
          <Button variant="primary" type="submit" id="save_theme" size="lg">
            {t("edit-theme.save-button")}
          </Button>
        </ContentFooter>
      </Form>
    </>
  );
}

export default EditTheme;
