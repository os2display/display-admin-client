import { React, useEffect, useRef, useState } from "react";
import { Button, Row } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import AsyncSelect from "react-select/async";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import FormInput from "../../../util/forms/form-input";
import Select from "../../../util/forms/select";
import { getHeaders, loadDropdownOptionsPromise } from "./poster-helper";

/**
 * @param {object} props The props.
 * @param {string} props.searchEndpoint The search endpoint.
 * @param {string} props.optionsEndpoint The options endpoint
 * @param {Function} props.setLoading Set loading status.
 * @param {Function} props.setResult Set results of search.
 * @returns {React.JSX.Element} The search component.
 */
function PosterSingleSearch({
  searchEndpoint,
  optionsEndpoint,
  setLoading,
  setResult,
}) {
  const { t } = useTranslation("common", { keyPrefix: "poster-selector-v2" });

  const [singleSearch, setSingleSearch] = useState("");
  const [singleSearchType, setSingleSearchType] = useState("title");
  const [singleSearchTypeValue, setSingleSearchTypeValue] = useState("");

  const timeoutRef = useRef(null);

  const debounceOptions = (inputValue) => {
    // Debounce result to avoid searching while typing.
    return new Promise((resolve, reject) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        loadDropdownOptionsPromise(
          optionsEndpoint,
          getHeaders(),
          inputValue,
          singleSearchType
        )
          .then((data) => resolve(data))
          .catch((reason) => reject(reason));
      }, 500);
    });
  };

  const singleSearchFetch = () => {
    const params = {
      type: "events",
    };

    const singleSearchTypeValueId = singleSearchTypeValue?.value;

    switch (singleSearchType) {
      case "title":
        params.title = singleSearch;
        break;
      case "url":
        params.url = singleSearch;
        break;
      case "tags":
        params.tag = singleSearchTypeValueId;
        break;
      case "organizations":
        params.organization = singleSearchTypeValueId;
        break;
      case "locations":
        params.location = singleSearchTypeValueId;
        break;
      default:
    }

    setLoading(true);

    const query = new URLSearchParams(params);

    fetch(`${searchEndpoint}?${query}`, {
      headers: getHeaders(),
    })
      .then((response) => response.json())
      .then((data) => {
        setResult(data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const singleSearchTypeOptions = [
    {
      key: "singleSearchTypeOptions1",
      value: "title",
      title: t("single-search-type-title"),
    },
    {
      key: "singleSearchTypeOptions2",
      value: "url",
      title: t("single-search-type-url"),
    },
    {
      key: "singleSearchTypeOptions3",
      value: "organizations",
      title: t("single-search-type-organization"),
    },
    {
      key: "singleSearchTypeOptions4",
      value: "locations",
      title: t("single-search-type-location"),
    },
    {
      key: "singleSearchTypeOptions5",
      value: "tags",
      title: t("single-search-type-tag"),
    },
  ];

  useEffect(() => {
    setSingleSearchTypeValue("");
  }, [singleSearchType]);

  return (
    <Row className="mb-2">
      <Col>
        <Select
          value={singleSearchType}
          onChange={({ target }) => setSingleSearchType(target.value)}
          label={t("single-search-type")}
          options={singleSearchTypeOptions}
          name="poster-search-type"
          allowNull={false}
        />
      </Col>
      {(singleSearchType === "title" || singleSearchType === "url") && (
        <Col>
          <FormInput
            label={t("single-search-text")}
            name="poster-search"
            value={singleSearch}
            onChange={({ target }) => setSingleSearch(target.value)}
          />
        </Col>
      )}
      {singleSearchType === "locations" && (
        <Col>
          <label
            className="form-label"
            htmlFor="single-search-select-locations"
          >
            {t("single-search-select")}
          </label>
          <AsyncSelect
            id="single-search-select-locations"
            isClearable
            isSearchable
            defaultOptions
            loadOptions={debounceOptions}
            value={singleSearchTypeValue}
            onChange={(newValue) => {
              setSingleSearchTypeValue(newValue);
            }}
          />
        </Col>
      )}
      {singleSearchType === "organizations" && (
        <Col>
          <label
            className="form-label"
            htmlFor="single-search-select-organizations"
          >
            {t("single-search-select")}
          </label>
          <AsyncSelect
            id="single-search-select-organizations"
            isClearable
            isSearchable
            defaultOptions
            loadOptions={debounceOptions}
            value={singleSearchTypeValue}
            onChange={(newValue) => {
              setSingleSearchTypeValue(newValue);
            }}
          />
        </Col>
      )}
      {singleSearchType === "tags" && (
        <Col>
          <label className="form-label" htmlFor="single-search-select-tags">
            {t("single-search-select")}
          </label>
          <AsyncSelect
            id="single-search-select-tags"
            isClearable
            isSearchable
            defaultOptions
            loadOptions={debounceOptions}
            value={singleSearchTypeValue}
            onChange={(newValue) => {
              setSingleSearchTypeValue(newValue);
            }}
          />
        </Col>
      )}
      <Col className="d-flex align-items-end">
        <Button onClick={singleSearchFetch} className="mt-3" variant="success">
          {t("single-search-button")}
        </Button>
      </Col>
    </Row>
  );
}

PosterSingleSearch.propTypes = {
  searchEndpoint: PropTypes.string.isRequired,
  optionsEndpoint: PropTypes.string.isRequired,
  setLoading: PropTypes.func.isRequired,
  setResult: PropTypes.func.isRequired,
};

export default PosterSingleSearch;
