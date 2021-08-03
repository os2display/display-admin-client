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
 * @param {boolean} props.selected
 * Whether the checkbox should display selected.
 * @returns {object}
 * A checkbox for the list.
 */
function CheckboxForList({ selected, onSelected }) {
  const { t } = useTranslation("common");
  return (
    <button onClick={onSelected} type="button" style={{ minHeight: "50px" }}>
      <Form>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check
            checked={selected}
            tabIndex={-1}
            type="checkbox"
            readOnly
            aria-label={t("checkbox-for-list.checkbox-form-aria-label")}
          />
        </Form.Group>
      </Form>
    </button>
  );
}

CheckboxForList.defaultProps = {
  selected: false,
};

CheckboxForList.propTypes = {
  onSelected: PropTypes.func.isRequired,
  selected: PropTypes.bool,
};

export default CheckboxForList;
