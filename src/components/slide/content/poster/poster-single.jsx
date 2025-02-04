import { React, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Button, Card, Row, Spinner } from "react-bootstrap";
import AsyncSelect from "react-select/async";
import Col from "react-bootstrap/Col";
import Select from "../../../util/forms/select";
import FormInput from "../../../util/forms/form-input";
import FormCheckbox from "../../../util/forms/form-checkbox";
import {
  formatDate,
  getHeaders,
  getSingleSearchOptions,
  loadDropdownOptionsPromise,
} from "./poster-helper";

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
  const [singleSelectedOccurrence, setSingleSelectedOccurrence] =
    useState(null);

  const {
    singleSelectedEvent: singleSelectedEventId = null,
    singleSelectedOccurrence: singleSelectedOccurrenceId = null,
    overrideTitle = "",
    overrideSubTitle = "",
    overrideTicketPrice = "",
    readMoreText = "",
    overrideReadMoreUrl = "",
    hideTime = false,
  } = configuration;

  const { admin } = feedSource;
  const [firstAdminEntry] = admin;

  const searchEndpoint = firstAdminEntry.endpointSearch ?? null;
  const optionsEndpoint = firstAdminEntry.endpointOption ?? null;
  const entityEndpoint = firstAdminEntry.endpointEntity ?? null;

  const singleSearchTypeOptions = getSingleSearchOptions(t);

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

  const handleSelectEvent = (eventId, occurrenceIds = []) => {
    if (!eventId) {
      return;
    }

    const configChange = {
      targets: [
        {
          id: "singleSelectedEvent",
          value: eventId,
        },
      ],
    };

    if (occurrenceIds.length === 1) {
      configChange.targets.push({
        id: "singleSelectedOccurrence",
        value: occurrenceIds[0],
      });
    }

    configurationChange(configChange);
  };

  const handleSelectOccurrence = (occurrenceId) => {
    const configChange = {
      targets: [
        {
          id: "singleSelectedOccurrence",
          value: occurrenceId,
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
    if (singleSelectedOccurrenceId !== null) {
      const query = new URLSearchParams({
        entityType: "occurrences",
        entityId: singleSelectedOccurrenceId,
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
  }, [singleSelectedOccurrenceId]);

  useEffect(() => {
    if (singleSelectedEventId !== null) {
      const query = new URLSearchParams({
        entityType: "events",
        entityId: singleSelectedEventId,
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

  useEffect(() => {
    setSingleSearchTypeValue("");
  }, [singleSearchType]);

  return (
    <>
      <h5>{t("selected-type-single")}</h5>
      {(singleSelectedEvent || singleSelectedOccurrence) && (
        <>
          <Row className="mb-3">
            <Col md="9">
              <>
                {singleSelectedEvent && (
                  <div>
                    <b>Valgt begivenhed:</b> {singleSelectedEvent.title} (
                    {singleSelectedEvent?.organizer?.name})
                  </div>
                )}
                {singleSelectedOccurrence && (
                  <div>
                    <b>{t("chosen-occurrence")}:</b>{" "}
                    {formatDate(singleSelectedOccurrence.startDate)}
                    {singleSelectedOccurrence?.ticketPriceRange &&
                      ` - ${singleSelectedOccurrence.ticketPriceRange}`}
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
              <Card className="p-3">
                <Button
                  className="btn-sm mb-2"
                  onClick={() =>
                    setSingleDisplayOverrides(!singleDisplayOverrides)
                  }
                >
                  {singleDisplayOverrides
                    ? t("hide-overrides")
                    : t("display-overrides")}
                </Button>
                {singleDisplayOverrides && (
                  <>
                    <FormInput
                      label={t("single-override-title")}
                      name="overrideTitle"
                      value={overrideTitle}
                      onChange={configurationChange}
                      className="mb-3"
                    />
                    <FormInput
                      label={t("single-override-subtitle")}
                      name="overrideSubTitle"
                      value={overrideSubTitle}
                      onChange={configurationChange}
                      className="mb-3"
                    />
                    <FormInput
                      label={t("single-override-ticket-price")}
                      name="overrideTicketPrice"
                      value={overrideTicketPrice}
                      onChange={configurationChange}
                      className="mb-3"
                    />
                    <FormInput
                      label={t("single-read-more-text")}
                      name="readMoreText"
                      value={readMoreText}
                      onChange={configurationChange}
                      className="mb-3"
                    />
                    <FormInput
                      label={t("single-read-more-url")}
                      name="overrideReadMoreUrl"
                      value={overrideReadMoreUrl}
                      onChange={configurationChange}
                      className="mb-3"
                    />
                    <FormCheckbox
                      label={t("single-hide-time")}
                      name="hideTime"
                      value={hideTime}
                      onChange={configurationChange}
                      className="mb-3"
                    />
                  </>
                )}
              </Card>
            </Col>
          </Row>
        </>
      )}

      {(!singleSelectedEvent || !singleSelectedOccurrence) && (
        <>
          <Row className="mb-2">
            <h5 className="mt-2">{t("search-for-event")}</h5>
          </Row>
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
                <label
                  className="form-label"
                  htmlFor="single-search-select-tags"
                >
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
              <Button
                onClick={singleSearchFetch}
                className="mt-3"
                variant="success"
              >
                {t("single-search-button")}
              </Button>
            </Col>
          </Row>
          <Row className="mb-2">
            {!singleSelectedEvent && singleSearchEvents !== null && (
              <Col>
                <table className="table table-hover text-left">
                  <thead>
                    <tr>
                      <th scope="col">{t("table-image")}</th>
                      <th scope="col">{t("table-event")}</th>
                      <th scope="col">{t("table-date")}</th>
                      <th scope="col" aria-label={t("table-actions")} />
                    </tr>
                  </thead>
                  <tbody>
                    {singleSearchEvents?.map(
                      ({
                        entityId,
                        title,
                        imageUrls,
                        organizer,
                        occurrences,
                      }) => (
                        <tr key={entityId}>
                          <td>
                            {imageUrls?.small && (
                              <img
                                src={imageUrls?.small}
                                alt={t("search-result-image")}
                                style={{ maxWidth: "80px" }}
                              />
                            )}
                          </td>
                          <td>
                            <b>{title}</b>
                            <br />
                            {organizer?.name}
                          </td>
                          <td>
                            {occurrences?.length > 0 &&
                              formatDate(occurrences[0]?.start)}
                            {occurrences?.length > 1 && <span>, ...</span>}
                          </td>
                          <td>
                            <Button
                              onClick={() =>
                                handleSelectEvent(
                                  entityId,
                                  occurrences.map(
                                    ({ entityId: occurrenceEntityId }) =>
                                      occurrenceEntityId
                                  )
                                )
                              }
                            >
                              {t("choose-event")}
                            </Button>
                          </td>
                        </tr>
                      )
                    )}
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
                        <th scope="col" aria-label={t("table-actions")} />
                      </tr>
                    </thead>
                    <tbody>
                      {singleSelectedEvent.occurrences.map(
                        ({ entityId, start, ticketPriceRange }) => (
                          <tr key={entityId}>
                            <td>{formatDate(start)}</td>
                            <td>{ticketPriceRange}</td>
                            <td>
                              <Button
                                onClick={() => handleSelectOccurrence(entityId)}
                              >
                                {t("choose-occurrence")}
                              </Button>
                            </td>
                          </tr>
                        )
                      )}
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
