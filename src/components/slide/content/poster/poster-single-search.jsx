import { React, useEffect, useState } from "react";
import { Button, Row } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { MultiSelect } from "react-multi-select-component";
import Form from "react-bootstrap/Form";
import FormInput from "../../../util/forms/form-input";
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

  const [title, setTitle] = useState("");
  const [organizations, setOrganizations] = useState([]);
  const [locations, setLocations] = useState([]);
  const [tags, setTags] = useState([]);

  const [locationOptions, setLocationOptions] = useState([]);
  const [tagOptions, setTagOptions] = useState([]);
  const [organizationOptions, setOrganizationOptions] = useState([]);

  useEffect(() => {
    loadDropdownOptionsPromise(optionsEndpoint, getHeaders(), "", "tags").then(
      (r) => setTagOptions(r)
    );

    loadDropdownOptionsPromise(
      optionsEndpoint,
      getHeaders(),
      "",
      "locations"
    ).then((r) => setLocationOptions(r));

    loadDropdownOptionsPromise(
      optionsEndpoint,
      getHeaders(),
      "",
      "organizations"
    ).then((r) => setOrganizationOptions(r));
  }, []);

  const singleSearchFetch = () => {
    const params = {
      type: "events",
    };

    params.title = title;
    params.tag = tags.map(({ value }) => value);
    params.organization = organizations.map(({ value }) => value);
    params.location = locations.map(({ value }) => value);

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

  return (
    <>
      <Row className="mb-2">
        <Col>
          <Form.Label htmlFor="single-search-select-locations">
            {t("single-search-locations")}
          </Form.Label>
          <MultiSelect
            id="single-search-select-locations"
            label={t("single-search-select")}
            name="locations"
            onChange={(newValue) => setLocations(newValue)}
            options={locationOptions}
            hasSelectAll={false}
            value={locations}
            placeholder={t("single-search-placeholder")}
            labelledBy={t("single-search-locations")}
          />
        </Col>
        <Col>
          <Form.Label htmlFor="single-search-select-organizations">
            {t("single-search-organizations")}
          </Form.Label>
          <MultiSelect
            id="single-search-select-organizations"
            label={t("single-search-select")}
            name="organizations"
            singleSelect
            options={organizationOptions}
            hasSelectAll={false}
            onChange={(newValue) => setOrganizations(newValue)}
            value={organizations}
            placeholder={t("single-search-placeholder")}
            labelledBy={t("single-search-organizations")}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Label htmlFor="single-search-select-tags">
            {t("single-search-tags")}
          </Form.Label>
          <MultiSelect
            id="single-search-select-tags"
            label={t("single-search-select")}
            name="tags"
            options={tagOptions}
            hasSelectAll={false}
            onChange={(newValue) => setTags(newValue)}
            value={tags}
            placeholder={t("single-search-placeholder")}
            labelledBy={t("single-search-tags")}
          />
        </Col>
        <Col>
          <FormInput
            label={t("single-search-title")}
            name="poster-search"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </Col>
        <Col className="d-flex align-items-end">
          <Button
            onClick={singleSearchFetch}
            className="mt-3"
            variant="success"
          >
            {t("single-search-button")}
          </Button>
        </Col>
      </Row>
    </>
  );
}

PosterSingleSearch.propTypes = {
  searchEndpoint: PropTypes.string.isRequired,
  optionsEndpoint: PropTypes.string.isRequired,
  setLoading: PropTypes.func.isRequired,
  setResult: PropTypes.func.isRequired,
};

export default PosterSingleSearch;
