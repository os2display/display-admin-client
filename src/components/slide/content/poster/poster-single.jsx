import { React, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Button, Card, Row, Spinner } from "react-bootstrap";
import AsyncSelect from "react-select/async";
import Col from "react-bootstrap/Col";
import dayjs from "dayjs";
import localeDa from "dayjs/locale/da";
import Select from "../../../util/forms/select.jsx";
import FormInput from "../../../util/forms/form-input.jsx";
import FormCheckbox from "../../../util/forms/form-checkbox.jsx";
import localStorageKeys from "../../../util/local-storage-keys.jsx";
import {formatDate, loadDropdownOptions} from "./poster-helper.js";

/**
 * @param {object} props Props.
 * @param {object} props.feedSource Feed source.
 * @param {Function} props.getValueFromConfiguration Gets a value from the feed
 *   configuration.
 * @param {Function} props.configurationChange Configuration onChange.
 * @returns {object} PosterSingle component.
 */
function PosterSingle({
  getValueFromConfiguration,
  configurationChange,
  feedSource,
}) {
  const { t } = useTranslation("common", { keyPrefix: "poster-selector-v2" });

  const apiToken = localStorage.getItem(localStorageKeys.API_TOKEN);
  const tenantKey = JSON.parse(
    localStorage.getItem(localStorageKeys.SELECTED_TENANT)
  );

  const headers = {
    authorization: `Bearer ${apiToken ?? ""}`,
  };

  if (tenantKey) {
    headers["Authorization-Tenant-Key"] = tenantKey.tenantKey;
  }

  const [loadingResults, setLoadingResults] = useState(false);

  const [singleSearch, setSingleSearch] = useState("");
  const [singleSearchType, setSingleSearchType] = useState("title");
  const [singleSearchTypeValue, setSingleSearchTypeValue] = useState("");
  const [singleSearchEvents, setSingleSearchEvents] = useState(null);
  const [singleDisplayOverrides, setSingleDisplayOverrides] = useState(false);

  const [singleSelectedEvent, setSingleSelectedEvent] = useState(
    getValueFromConfiguration("singleSelectedEvent") ?? null
  );
  const [singleSelectedOccurrence, setSingleSelectedOccurrence] = useState(
    getValueFromConfiguration("singleSelectedOccurrence") ?? null
  );

  const removeSingleSelected = () => {
    setSingleSelectedEvent(null);
    setSingleSelectedOccurrence(null);
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
      value: "organizers",
      title: t("single-search-type-organizer"),
    },
    {
      key: "singleSearchTypeOptions4",
      value: "places",
      title: t("single-search-type-place"),
    },
    {
      key: "singleSearchTypeOptions5",
      value: "tags",
      title: t("single-search-type-tag"),
    },
  ];

  const handleSelectEvent = (singleEvent) => {
    setSingleSelectedEvent(singleEvent);
    if (singleEvent.occurrences?.length === 1) {
      setSingleSelectedOccurrence(singleEvent.occurrences[0]);
    }
  };

  const singleSearchFetch = () => {
    const url = feedSource.admin[0].endpointSearch;
    let query = `?type=events`;

    const singleSearchTypeValueId = singleSearchTypeValue
      ? singleSearchTypeValue.value.split("/").pop()
      : null;

    switch (singleSearchType) {
      case "title":
        query = `${query}&title=${singleSearch}`;
        break;
      case "url":
        query = `${query}&url=${singleSearch}`;
        break;
      case "tags":
        query = `${query}&tag=${singleSearchTypeValueId}`;
        break;
      case "organizers":
        query = `${query}&organizer=${singleSearchTypeValueId}`;
        break;
      case "places":
        query = `${query}&place=${singleSearchTypeValueId}`;
        break;
      default:
    }

    setLoadingResults(true);

    fetch(`${url}${query}`, {
      headers,
    })
      .then((response) => response.json())
      .then((data) => {
        setSingleSearchEvents(data);
      })
      .catch(() => {
        // @TODO: Handle error.
      })
      .finally(() => {
        setLoadingResults(false);
      });
  };

  useEffect(() => {
    configurationChange({
      target: {
        id: "singleSelectedEvent",
        value: singleSelectedEvent ? singleSelectedEvent["@id"] : null,
      },
    });
  }, [singleSelectedEvent]);

  useEffect(() => {
    configurationChange({
      target: {
        id: "singleSelectedOccurrence",
        value: singleSelectedOccurrence
          ? singleSelectedOccurrence.entityId
          : null,
      },
    });
  }, [singleSelectedOccurrence]);

  useEffect(() => {
    const url = feedSource.admin[0].endpointEntity;
    const eventId = getValueFromConfiguration("singleSelectedEvent");
    const occurrenceId = getValueFromConfiguration("singleSelectedOccurrence");

    console.log(occurrenceId, "occurrenceId");

    if (eventId !== null) {
      fetch(`${url}?path=${eventId}`, {
        headers,
      })
        .then((response) => response.json())
        .then((data) => {
          setSingleSelectedEvent(data);
        })
        .catch(() => {
          // TODO: Display error.
        });
    }

    if (occurrenceId !== null) {
      fetch(`${url}?path=/occurrences/${occurrenceId}`, {
        headers,
      })
        .then((response) => response.json())
        .then((data) => {
          setSingleSelectedOccurrence(data["hydra:member"][0]);
        })
        .catch(() => {
          // TODO: Display error.
        });
    }
  }, []);

  const searchEndpoint = feedSource.admin[0].endpointSearch ?? null;

  return (
    <>
      <h5>{t("selected-type-single")}</h5>
      {(singleSelectedEvent || singleSelectedOccurrence) && (
        <>
          <Row>
            <Col md="9">
              <>
                {singleSelectedEvent && (
                  <div>
                    <strong>Valgt begivenhed:</strong>{" "}
                    {singleSelectedEvent.title} (
                    {singleSelectedEvent?.organizer?.name})
                  </div>
                )}
                {singleSelectedOccurrence && (
                  <div>
                    <strong>{t("chosen-occurrence")}:</strong>{" "}
                    {formatDate(singleSelectedOccurrence.start)} -
                    {singleSelectedOccurrence.ticketPriceRange}
                  </div>
                )}
              </>
            </Col>
            <Col md="3">
              <Button variant="danger" onClick={removeSingleSelected}>
                {t("remove")}
              </Button>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Button
                onClick={() =>
                  setSingleDisplayOverrides(!singleDisplayOverrides)
                }
              >
                {singleDisplayOverrides
                  ? t("hide-overrides")
                  : t("display-overrides")}
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              {singleDisplayOverrides && (
                <>
                  <FormInput
                    label={t("single-override-title")}
                    name="overrideTitle"
                    value={getValueFromConfiguration("overrideTitle") ?? ""}
                    onChange={configurationChange}
                    className="mb-3"
                  />
                  <FormInput
                    label={t("single-override-subtitle")}
                    name="overrideSubTitle"
                    value={getValueFromConfiguration("overrideSubTitle") ?? ""}
                    onChange={configurationChange}
                    className="mb-3"
                  />
                  <FormInput
                    label={t("single-override-ticket-price")}
                    name="overrideTicketPrice"
                    value={
                      getValueFromConfiguration("overrideTicketPrice") ?? ""
                    }
                    onChange={configurationChange}
                    className="mb-3"
                  />
                  <FormInput
                    label={t("single-read-more-text")}
                    name="readMoreText"
                    value={getValueFromConfiguration("readMoreText") ?? ""}
                    onChange={configurationChange}
                    className="mb-3"
                  />
                  <FormInput
                    label={t("single-read-more-url")}
                    name="overrideReadMoreUrl"
                    value={
                      getValueFromConfiguration("overrideReadMoreUrl") ?? ""
                    }
                    onChange={configurationChange}
                    className="mb-3"
                  />
                  <FormCheckbox
                    label={t("single-hide-time")}
                    name="hideTime"
                    value={getValueFromConfiguration("hideTime") ?? false}
                    onChange={configurationChange}
                    className="mb-3"
                  />
                </>
              )}
            </Col>
          </Row>
        </>
      )}

      {(!singleSelectedEvent || !singleSelectedOccurrence) && (
        <>
          <Row>
            <h5 className="mt-2">{t("search-for-event")}</h5>
          </Row>
          <Row>
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
            {(singleSearchType === "tags" ||
              singleSearchType === "places" ||
              singleSearchType === "organizers") && (
              <Col>
                <label className="form-label" htmlFor="single-search-select">
                  {t("single-search-select")}
                </label>
                <AsyncSelect
                  id="single-search-select"
                  isClearable
                  isSearchable
                  defaultOptions
                  loadOptions={(inputValue, callback) =>
                    loadDropdownOptions(
                      searchEndpoint,
                      headers,
                      inputValue,
                      callback,
                      singleSearchType
                    )
                  }
                  defaultInputValue={singleSearchTypeValue}
                  onChange={(newValue) => {
                    setSingleSearchTypeValue(newValue);
                  }}
                />
              </Col>
            )}
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
          <Row>
            {!singleSelectedEvent && singleSearchEvents !== null && (
              <Col>
                <table className="table table-hover text-left">
                  <thead>
                    <tr>
                      <th scope="col">{t("table-image")}</th>
                      <th scope="col">{t("table-event")}</th>
                      <th scope="col">{t("table-date")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {singleSearchEvents?.map((searchEvent) => (
                      <tr
                        style={{ cursor: "pointer" }}
                        key={searchEvent["@id"]}
                        onClick={() => handleSelectEvent(searchEvent)}
                      >
                        <td>
                          {searchEvent?.imageUrls?.small && (
                            <img
                              src={searchEvent?.imageUrls?.small}
                              alt={searchEvent?.title}
                              style={{ maxWidth: "80px" }}
                            />
                          )}
                        </td>
                        <td>
                          <strong>{searchEvent.title}</strong>
                          <br />
                          {searchEvent.organizer.name}
                        </td>
                        <td>
                          {searchEvent?.occurrences?.length > 0 &&
                            formatDate(searchEvent?.occurrences[0]?.start)}
                          {searchEvent?.occurrences?.length > 1 && (
                            <span>, ...</span>
                          )}
                        </td>
                      </tr>
                    ))}
                    {singleSearchEvents?.length === 0 && (
                      <tr>
                        <td colSpan="3">{t("no-results")}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </Col>
            )}
            {loadingResults && (
              <Col>
                <Spinner className="mt-3" animation="border" />
              </Col>
            )}

            {singleSelectedEvent !== null && (
              <Col>
                <h5>{t("choose-an-occurrence")}</h5>
                {!singleSelectedOccurrence && (
                  <>
                    <table className="table table-hover text-left">
                      <thead>
                        <tr>
                          <th scope="col">{t("table-date")}</th>
                          <th scope="col">{t("table-price")}</th>
                          <th scope="col"> </th>
                        </tr>
                      </thead>
                      <tbody>
                        {singleSelectedEvent?.occurrences?.map((occurrence) => (
                          <tr>
                            <td>{occurrence.start}</td>
                            <td>{occurrence.ticketPriceRange}</td>
                            <td>
                              <Button
                                onClick={() =>
                                  setSingleSelectedOccurrence(occurrence)
                                }
                              >
                                {t("choose-occurrence")}
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </>
                )}
              </Col>
            )}
          </Row>
        </>
      )}
    </>
  );
}

PosterSingle.propTypes = {
  getValueFromConfiguration: PropTypes.func.isRequired,
  configurationChange: PropTypes.func.isRequired,
  feedSource: PropTypes.shape({
    admin: PropTypes.arrayOf(
      PropTypes.shape({
        endpointEntity: PropTypes.string,
        endpointSearch: PropTypes.string,
      })
    ),
  }).isRequired,
};

export default PosterSingle;
