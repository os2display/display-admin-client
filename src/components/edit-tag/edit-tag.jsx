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

/**
 * The edit tag component.
 *
 * @returns {object}
 * The edit tag page.
 */
function EditTag() {
  const { t } = useTranslation("common");
  const [formStateObject, setFormStateObject] = useState({});
  const history = useHistory();
  const { id } = useParams();
  const [tagName, setTagName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const newTag = id === "new";
  const [errors, setErrors] = useState([]);
  const requiredFields = ["tagName"];

  /**
   * Load content from fixture.
   */
  useEffect(() => {
    // @TODO: load real content.
    if (!newTag) {
      fetch(`/fixtures/tags/tag.json`)
        .then((response) => response.json())
        .then((jsonData) => {
          setFormStateObject({
            tagName: jsonData.tag.name,
          });
          setTagName(jsonData.tag.name);
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
   * @TODO: make it save.
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

  return (
    <>
      <Form onSubmit={handleSubmit}>
        {newTag && <ContentHeader title={t("edit-tag.create-new-tag")} />}
        {!newTag && (
          <ContentHeader title={`${t("edit-tag.edit-tag")}: ${tagName}`} />
        )}
        <ContentBody>
          <FormInput
            name="tagName"
            type="text"
            errors={errors}
            label={t("edit-tag.name-label")}
            placeholder={t("edit-tag.name-placeholder")}
            value={formStateObject.tagName}
            onChange={handleInput}
          />
        </ContentBody>
        {submitted && <Redirect to="/tags" />}
        <ContentFooter>
          <Button
            variant="secondary"
            type="button"
            id="tag_cancel"
            onClick={() => history.goBack()}
            size="lg"
            className="me-3"
          >
            {t("edit-tag.cancel-button")}
          </Button>
          <Button variant="primary" type="submit" id="save_tag" size="lg">
            {t("edit-tag.save-button")}
          </Button>
        </ContentFooter>
      </Form>
    </>
  );
}

export default EditTag;
