import { React, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Button, Row, Spinner } from "react-bootstrap";
import AsyncSelect from "react-select/async";
import Col from "react-bootstrap/Col";
import Select from "../../../util/forms/select";
import FormInput from "../../../util/forms/form-input";
import FormCheckbox from "../../../util/forms/form-checkbox";
import {
  formatDate,
  getHeaders,
  loadDropdownOptionsPromise,
} from "./poster-helper";
import dayjs from "dayjs";

/**
 * @param {object} props Props.
 * @param {object} props.feedSource Feed source.
 * @param {Function} props.configurationChange Configuration onChange.
 * @param {object} props.configuration Feed configuration.
 * @returns {object} PosterSingle component.
 */
function PosterSingle({ configurationChange, feedSource, configuration }) {
  const { t } = useTranslation("common", { keyPrefix: "poster-selector-v2" });

  const [loadingResults, setLoadingResults] = useState(false);
  const [singleSearch, setSingleSearch] = useState("");
  const [singleSearchType, setSingleSearchType] = useState("title");
  const [singleSearchTypeValue, setSingleSearchTypeValue] = useState("");
  const [singleSearchEvents, setSingleSearchEvents] = useState(null);
  const [singleDisplayOverrides, setSingleDisplayOverrides] = useState(false);
  const [singleSelectedEvent, setSingleSelectedEvent] = useState(null);
  const [singleSelectedOccurrence, setSingleSelectedOccurrence] = useState(null);

  const searchEndpoint = feedSource.admin[0].endpointSearch ?? null;
  const optionsEndpoint = feedSource.admin[0].endpointOption ?? null;
  const entityEndpoint = feedSource.admin[0].endpointEntity ?? null;

  const removeSingleSelected = () => {
    configurationChange({
      targets: [
        {
          id: "singleSelectedEvent",
          value: null,
        },
        {
          id: "singleSelectedOccurrence",
          value: null,
        },
      ],
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

  const handleSelectEvent = (singleEvent) => {
    if (!singleEvent) {
      return;
    }

    const numberOfOccurrences = singleEvent.occurrences?.length ?? 0;

    const configChange = {
      targets: [
        {
          id: "singleSelectedEvent",
          value: singleEvent.entityId,
        },
      ],
    };

    if (numberOfOccurrences === 1) {
      configChange.targets.push({
        id: "singleSelectedOccurrence",
        value: singleEvent.occurrences.pop().entityId,
      });
    }

    configurationChange(configChange);
  };

  const handleSelectOccurrence = (occurrence) => {
    const configChange = {
      targets: [
        {
          id: "singleSelectedOccurrence",
          value: occurrence.entityId,
        },
      ],
    };

    configurationChange(configChange);
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

    setLoadingResults(true);

    const query = new URLSearchParams(params);

    fetch(`${searchEndpoint}?${query}`, {
      headers: getHeaders(),
    })
      .then((response) => response.json())
      .then((data) => {
        setSingleSearchEvents(data);
      })
      .finally(() => {
        setLoadingResults(false);
      });
  };

  useEffect(() => {
    const occurrenceId = configuration.singleSelectedOccurrence ?? null;

    if (occurrenceId !== null) {
      const query = new URLSearchParams({
        entityType: "occurrences",
        entityId: occurrenceId,
      });

      fetch(`${entityEndpoint}?${query}`, {
        headers: getHeaders(),
      })
        .then((response) => response.json())
        .then((data) => {
          setSingleSelectedOccurrence(data[0]);
        });
    } else {
      setSingleSelectedOccurrence(null);
    }
  }, [configuration?.singleSelectedOccurrence]);

  useEffect(() => {
    const eventId = configuration.singleSelectedEvent ?? null;

    if (eventId !== null) {
      const query = new URLSearchParams({
        entityType: "events",
        entityId: eventId,
      });

      fetch(`${entityEndpoint}?${query}`, {
        headers: getHeaders(),
      })
        .then((response) => response.json())
        .then((data) => {
          setSingleSelectedEvent(data[0]);
        });
    } else {
      setSingleSelectedEvent(null);
    }
  }, [configuration?.singleSelectedEvent]);

  const timeoutRef = useRef(null);

  const debounceOptions = (inputValue) => {
    // Debounce promise.
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
                    {formatDate(singleSelectedOccurrence.startDate)}
                    {" - "}
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
                    value={configuration.overrideTitle ?? ""}
                    onChange={configurationChange}
                    className="mb-3"
                  />
                  <FormInput
                    label={t("single-override-subtitle")}
                    name="overrideSubTitle"
                    value={configuration.overrideSubTitle ?? ""}
                    onChange={configurationChange}
                    className="mb-3"
                  />
                  <FormInput
                    label={t("single-override-ticket-price")}
                    name="overrideTicketPrice"
                    value={configuration.overrideTicketPrice ?? ""}
                    onChange={configurationChange}
                    className="mb-3"
                  />
                  <FormInput
                    label={t("single-read-more-text")}
                    name="readMoreText"
                    value={configuration.readMoreText ?? ""}
                    onChange={configurationChange}
                    className="mb-3"
                  />
                  <FormInput
                    label={t("single-read-more-url")}
                    name="overrideReadMoreUrl"
                    value={configuration.overrideReadMoreUrl ?? ""}
                    onChange={configurationChange}
                    className="mb-3"
                  />
                  <FormCheckbox
                    label={t("single-hide-time")}
                    name="hideTime"
                    value={configuration.hideTime ?? false}
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
            {singleSearchType === "locations" && (
              <Col>
                <label className="form-label" htmlFor="single-search-select">
                  {t("single-search-select")}
                </label>
                <AsyncSelect
                  id="single-search-select-locations"
                  isClearable
                  isSearchable
                  defaultOptions
                  loadOptions={debounceOptions}
                  defaultInputValue={singleSearchTypeValue}
                  onChange={(newValue) => {
                    setSingleSearchTypeValue(newValue);
                  }}
                />
              </Col>
            )}
            {singleSearchType === "organizations" && (
              <Col>
                <label className="form-label" htmlFor="single-search-select">
                  {t("single-search-select")}
                </label>
                <AsyncSelect
                  id="single-search-select-organizations"
                  isClearable
                  isSearchable
                  defaultOptions
                  loadOptions={debounceOptions}
                  defaultInputValue={singleSearchTypeValue}
                  onChange={(newValue) => {
                    setSingleSearchTypeValue(newValue);
                  }}
                />
              </Col>
            )}
            {singleSearchType === "tags" && (
              <Col>
                <label className="form-label" htmlFor="single-search-select">
                  {t("single-search-select")}
                </label>
                <AsyncSelect
                  id="single-search-select-tags"
                  isClearable
                  isSearchable
                  defaultOptions
                  loadOptions={debounceOptions}
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
                        key={searchEvent.entityId}
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
                  <table className="table table-hover text-left">
                    <thead>
                      <tr>
                        <th scope="col">{t("table-date")}</th>
                        <th scope="col">{t("table-price")}</th>
                        <th scope="col" />
                      </tr>
                    </thead>
                    <tbody>
                      {singleSelectedEvent?.occurrences?.map((occurrence) => (
                        <tr key={occurrence.entityId}>
                          <td>{formatDate(occurrence.start)}</td>
                          <td>{occurrence.ticketPriceRange}</td>
                          <td>
                            <Button
                              onClick={() =>
                                handleSelectOccurrence(occurrence)
                              }
                            >
                              {t("choose-occurrence")}
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
  configurationChange: PropTypes.func.isRequired,
  configuration: PropTypes.shape({
    singleSelectedEvent: PropTypes.number,
    singleSelectedOccurrence: PropTypes.number,
    overrideTitle: PropTypes.string,
    overrideSubTitle: PropTypes.string,
    overrideTicketPrice: PropTypes.string,
    readMoreText: PropTypes.string,
    overrideReadMoreUrl: PropTypes.string,
    hideTime: PropTypes.bool,
  }).isRequired,
  feedSource: PropTypes.shape({
    admin: PropTypes.arrayOf(
      PropTypes.shape({
        endpointEntity: PropTypes.string,
        endpointSearch: PropTypes.string,
        endpointOption: PropTypes.string,
      })
    ),
  }).isRequired,
};

export default PosterSingle;
