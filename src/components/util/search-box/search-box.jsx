import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormattedMessage } from "react-intl";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import PropTypes from "prop-types";
import "./search-box.scss";

/**
 * @param {object} props
 * The props.
 * @param {string} props.value
 * the value of the search box.
 * @param {Function} props.onChange
 * The callback for change in search box.
 * @param props.showLabel
 * @returns {object}
 * The search box.
 */
function SearchBox({ value, onChange, showLabel }) {
  return (
    <Form>
      <Form.Label htmlFor="search-field">
        <FormattedMessage id="search" defaultMessage="search" />
      </Form.Label>
      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text id="basic-addon3">
            <FontAwesomeIcon className="search-icon" icon={faSearch} />
          </InputGroup.Text>
        </InputGroup.Prepend>
        <FormattedMessage id="search" defaultMessage="search">
          {(placeholder) => (
            <FormControl
              placeholder={placeholder}
              id="search-field"
              role="search"
              name="search"
              value={value}
              className="form-control"
              onChange={(e) => onChange(e.currentTarget.value)}
            />
          )}
        </FormattedMessage>
      </InputGroup>
    </Form>
  );
}

SearchBox.defaultProps = {
  value: "",
};

SearchBox.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};

export default SearchBox;
