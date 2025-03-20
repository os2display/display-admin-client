import { React, useEffect, useState } from "react";
import { Button, Row } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { MultiSelect } from "react-multi-select-component";
import Form from "react-bootstrap/Form";
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

  const [locations, setLocations] = useState([]);
  const [tags, setTags] = useState([]);
  const [organizations, setOrganizations] = useState([]);

  useEffect(() => {
    loadDropdownOptionsPromise(optionsEndpoint, getHeaders(), "", "tags").then(
      (r) => setTags(r)
    );

    loadDropdownOptionsPromise(
      optionsEndpoint,
      getHeaders(),
      "",
      "locations"
    ).then((r) => setLocations(r));

    loadDropdownOptionsPromise(
      optionsEndpoint,
      getHeaders(),
      "",
      "organizations"
    ).then((r) => setOrganizations(r));
  }, []);

  const singleSearchFetch = () => {
    const params = {
      type: "events",
    };

    const singleSearchTypeValueId = singleSearchTypeValue?.value;

    switch (singleSearchType) {
      case "title":
        params.title = singleSearch;
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
      value: "organizations",
      title: t("single-search-type-organization"),
    },
    {
      key: "singleSearchTypeOptions3",
      value: "locations",
      title: t("single-search-type-location"),
    },
    {
      key: "singleSearchTypeOptions4",
      value: "tags",
      title: t("single-search-type-tag"),
    },
  ];

  /**
   * A callback on changed data.
   *
   * @param {Array} data The data to call back with
   */
  const changeData = (data) => {
    if (data?.length > 0) {
      const index = data?.length > 1 ? 1 : 0;
      setSingleSearchTypeValue(data[index]);
    }
  };

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
      {singleSearchType === "title" && (
        <Col>
          <FormInput
            label={t("single-search-title")}
            name="poster-search"
            value={singleSearch}
            onChange={({ target }) => setSingleSearch(target.value)}
          />
        </Col>
      )}
      {singleSearchType === "locations" && (
        <Col>
          <Form.Label htmlFor="single-search-select-locations">
            {t("single-search-select")}
          </Form.Label>
          <MultiSelect
            id="single-search-select-locations"
            label={t("single-search-select")}
            name="locations"
            onChange={changeData}
            options={locations}
            value={singleSearchTypeValue ? [singleSearchTypeValue] : []}
            placeholder={t("single-search-placeholder")}
            labelledBy="single-search-select-locations"
          />
        </Col>
      )}
      {singleSearchType === "organizations" && (
        <Col>
          <Form.Label htmlFor="single-search-select-organizations">
            {t("single-search-select")}
          </Form.Label>
          <MultiSelect
            id="single-search-select-organizations"
            label={t("single-search-select")}
            name="organizations"
            singleSelect
            options={organizations}
            onChange={changeData}
            value={singleSearchTypeValue ? [singleSearchTypeValue] : []}
            placeholder={t("single-search-placeholder")}
            labelledBy="single-search-select-organizations"
          />
        </Col>
      )}
      {singleSearchType === "tags" && (
        <Col>
          <Form.Label htmlFor="single-search-select-tags">
            {t("single-search-select")}
          </Form.Label>
          <MultiSelect
            id="single-search-select-tags"
            label={t("single-search-select")}
            name="tags"
            options={tags}
            onChange={changeData}
            value={singleSearchTypeValue ? [singleSearchTypeValue] : []}
            placeholder={t("single-search-placeholder")}
            labelledBy="single-search-select-tags"
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
