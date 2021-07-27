import { React, useState, useEffect } from "react";
import { useParams, Redirect } from "react-router";
import { Container, Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useIntl, FormattedMessage } from "react-intl";
import getFormErrors from "../util/helpers/form-errors-helper";
import FormInput from "../util/forms/form-input";

/**
 * The edit category component.
 *
 * @returns {object}
 *   The edit category page.
 */
function EditCategories() {
  const intl = useIntl();
  const requiredFields = ["categoryName"];
  const [errors, setErrors] = useState([]);
  const [formStateObject, setFormStateObject] = useState({});
  const history = useHistory();
  const { id } = useParams();
  const [categoryName, setCategoryName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const newCategory = id === "new";
  const categoryLabel = intl.formatMessage({ id: "edit_add_category_label" });
  const categoryPlaceholder = intl.formatMessage({
    id: "edit_add_category_label_placeholder",
  });

  /**
   * Load content from fixture.
   */
  useEffect(() => {
    // @TODO load real content.
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

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        {newCategory && (
          <h1>
            <FormattedMessage
              id="create_new_category"
              defaultMessage="create_new_category"
            />
          </h1>
        )}
        {!newCategory && (
          <h1>
            <FormattedMessage
              id="edit_category"
              defaultMessage="edit_category"
            />
            {categoryName}
          </h1>
        )}
        <FormInput
          name="categoryName"
          type="text"
          label={categoryLabel}
          required
          placeholder={categoryPlaceholder}
          value={formStateObject.categoryName}
          onChange={handleInput}
          errors={errors}
        />
        {submitted && <Redirect to="/categories" />}
        <Button
          variant="secondary"
          type="button"
          id="category_cancel"
          onClick={() => history.goBack()}
        >
          <FormattedMessage id="cancel" defaultMessage="cancel" />
        </Button>
        <Button variant="primary" type="submit" id="save_category">
          <FormattedMessage id="save_category" defaultMessage="save_category" />
        </Button>
      </Form>
    </Container>
  );
}

export default EditCategories;
