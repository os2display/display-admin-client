import { React } from "react";
import { Form } from "react-bootstrap";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";

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
  return (
    <FormattedMessage
      id="aria_choose_element_for_action"
      defaultMessage="aria_choose_element_for_action"
    >
      {(message) => (
        <Form>
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check
              onChange={onSelected}
              type="checkbox"
              aria-label={message}
            />
          </Form.Group>
        </Form>
      )}
    </FormattedMessage>
  );
}

CheckboxForList.propTypes = {
  onSelected: PropTypes.func.isRequired,
};

export default CheckboxForList;
