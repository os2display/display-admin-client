import { React, useState, useEffect } from "react";
import { useParams, Redirect } from "react-router";
import { Container, Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useIntl, FormattedMessage } from "react-intl";
import FormInput from "../util/form-input";

/**
 * The edit category component.
 *
 * @returns {object}
 *   The edit category page.
 */
function EditCategories() {
  const intl = useIntl();
  const history = useHistory();
  const { id } = useParams();
  const [category, setCategory] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const newCategory = id === "new";
  const validText = intl.formatMessage({
    id: "valid_text_category_name_input",
  });
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
      fetch("./fixtures/categories/category.json")
        .then((response) => response.json())
        .then((jsonData) => {
          setCategory(jsonData.category);
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
    target.setCustomValidity("");
    setCategoryName(target.value);
  }

  /**
   * Handles validation of input with translation.
   *
   * @param {object} props
   * The props.
   * @param {object} props.target
   * event target
   */
  function handleValidationMessage({ target }) {
    const { message } = target.dataset;
    target.setCustomValidity(message);
  }
  /**
   * Redirects back to list.
   */
  function handleSubmit() {
    setSubmitted(true);
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
            {category.name}
          </h1>
        )}
        <FormInput
          name="category_name"
          type="text"
          label={categoryLabel}
          required
          placeholder={categoryPlaceholder}
          value={categoryName}
          onChange={handleInput}
          data-message={validText}
          onInvalid={handleValidationMessage}
        />
        {submitted && <Redirect to="/categories" />}
        <Button
          variant="secondary"
          type="button"
          onClick={() => history.goBack()}
        >
          <FormattedMessage id="cancel" defaultMessage="cancel" />
        </Button>
        <Button variant="primary" type="submit">
          <FormattedMessage id="save_category" defaultMessage="save_category" />
        </Button>
      </Form>
    </Container>
  );
}

export default EditCategories;
