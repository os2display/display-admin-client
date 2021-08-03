import { React } from "react";
import { Form } from "react-bootstrap";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

/**
 * A checkbox for the list.
 *
 * @param {object} props
 * Props.
 * @param {Function} props.onSelected
 * The callback for onselected.
 * @returns {object}
 * A checkbox for the list.
 */
function CheckboxForList({ onSelected }) {
  const { t } = useTranslation("common");

  return (
    <Form>
      <Form.Group controlId="formBasicCheckbox">
        <Form.Check
          onChange={onSelected}
          type="checkbox"
          aria-label={t("checkbox-for-list.checkbox-form-aria-label")}
        />
      </Form.Group>
    </Form>
  );
}

CheckboxForList.propTypes = {
  onSelected: PropTypes.func.isRequired,
};

export default CheckboxForList;
