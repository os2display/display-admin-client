import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

/**
 * @param {object} props The props.
 * @param {string} props.value The value of the search box.
 * @param {Function} props.onChange The callback for change in search box.
 * @param {boolean} props.showLabel Whether to show the label.
 * @returns {object} The search box.
 */
function SearchBox({ onChange, value = "", showLabel = false }) {
  const { t } = useTranslation("common", { keyPrefix: "search-box" });

  return (
    <Form>
      {showLabel && (
        <Form.Label htmlFor="search-field">{t("label")}</Form.Label>
      )}
      <InputGroup>
        <InputGroup.Text>
          <FontAwesomeIcon icon={faSearch} />
        </InputGroup.Text>
        <FormControl
          autoFocus
          placeholder={t("placeholder")}
          id="search-field"
          aria-label="search-box-aria-label"
          role="search"
          name="search"
          value={value ?? ""}
          className="form-control"
          onChange={(e) => onChange(e.currentTarget.value)}
        />
        <div className="input-group-append">
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={() => onChange("")}
          >
            {t("delete-search")}
          </button>
        </div>
      </InputGroup>
    </Form>
  );
}

SearchBox.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  showLabel: PropTypes.bool,
};

export default SearchBox;
