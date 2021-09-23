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
 * The edit category component.
 *
 * @returns {object}
 *   The edit category page.
 */
function EditCategories() {
  const { t } = useTranslation("common");
  const requiredFields = ["categoryName"];
  const [errors, setErrors] = useState([]);
  const [formStateObject, setFormStateObject] = useState({});
  const history = useHistory();
  const { id } = useParams();
  const [categoryName, setCategoryName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const newCategory = id === "new";

  /**
   * Load content from fixture.
   */
  useEffect(() => {
    // @TODO: load real content.
    if (!newCategory) {
      fetch("/fixtures/categories/category.json")
        .then((response) => response.json())
        .then((jsonData) => {
          setFormStateObject({
            categoryName: jsonData.category.name,
          });
          setCategoryName(jsonData.category.name);
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
   * @param {object} e
   * the submit event.
   * @returns {boolean}
   * Boolean indicating whether to submit form.
   */
  function handleSubmit(e) {
    // @TODO: make it save.
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
    <Form onSubmit={handleSubmit}>
      {newCategory && (
        <ContentHeader title={t("edit-category.create-new-category")} />
      )}
      {!newCategory && (
        <ContentHeader
          title={`${t("edit-category.edit-category")}: ${categoryName}`}
        />
      )}
      <ContentBody>
        <FormInput
          name="categoryName"
          type="text"
          label={t("edit-category.category-name-label")}
          required
          placeholder={t("edit-category.category-name-placeholder")}
          value={formStateObject.categoryName}
          onChange={handleInput}
          errors={errors}
        />
      </ContentBody>
      <ContentFooter>
        {submitted && <Redirect to="/categories" />}
        <Button
          variant="secondary"
          type="button"
          id="category_cancel"
          onClick={() => history.goBack()}
          size="lg"
          className="me-3"
        >
          {t("edit-category.cancel-button")}
        </Button>
        <Button variant="primary" type="submit" id="save_category" size="lg">
          {t("edit-category.save-button")}
        </Button>
      </ContentFooter>
    </Form>
  );
}

export default EditCategories;
