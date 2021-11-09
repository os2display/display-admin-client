import { React } from "react";
import { Form } from "react-bootstrap";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import "./checkbox-for-list.scss";

/**
 * A checkbox for the list.
 *
 * @param {object} props Props.
 * @param {Function} props.onSelected The callback for onselected.
 * @param {boolean} props.selected Whether the checkbox should display selected.
 * @param {boolean} props.disabled Whether the checkbox is disabled
 * @returns {object} A checkbox for the list.
 */
function CheckboxForList({ selected, onSelected, disabled }) {
  const { t } = useTranslation("common");
  const classes = `checkbox-for-list ${disabled ?? " disabled"}`;

  return (
    <button
      onClick={disabled ? () => {} : onSelected}
      type="button"
      disabled={disabled}
      className={classes}
    >
      <Form>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check
            checked={selected}
            disabled={disabled}
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
  disabled: false,
};

CheckboxForList.propTypes = {
  onSelected: PropTypes.func.isRequired,
  selected: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default CheckboxForList;
