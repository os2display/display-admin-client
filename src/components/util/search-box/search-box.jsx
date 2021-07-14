import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
 *  the value of the search box.
 *  @param {Function} props.onChange
 * The callback for change in search box.
 * @returns {object}
 *   The search box.
 */
function SearchBox({ value, onChange }) {
  return (
    <Form>
      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text id="basic-addon3">
            <FontAwesomeIcon className="search-icon" icon={faSearch} />
          </InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          placeholder="Søg"
          id="search-field"
          role="search"
          name="search"
          value={value}
          className="form-control"
          onChange={(e) => onChange(e.currentTarget.value)}
        />
      </InputGroup>
    </Form>
  );
}

SearchBox.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SearchBox;
