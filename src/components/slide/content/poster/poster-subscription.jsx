import { React, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Row, Spinner } from "react-bootstrap";
import AsyncSelect from "react-select/async";
import Col from "react-bootstrap/Col";
import {
  formatDate,
  getHeaders,
  loadDropdownOptionsPromise,
} from "./poster-helper";

/**
 * @param {object} props Props.
 * @param {object} props.feedSource Feed source.
 * @param {Function} props.getValueFromConfiguration Gets a value from the feed
 *   configuration.
 * @param {Function} props.configurationChange Configuration onChange.
 * @returns {object} PosterSubscription component.
 */
function PosterSubscription({
  getValueFromConfiguration,
  configurationChange,
  feedSource,
}) {
  const { t } = useTranslation("common", { keyPrefix: "poster-selector-v2" });

  const [subscriptionPlaceValue, setSubscriptionPlaceValue] = useState(
    getValueFromConfiguration("subscriptionPlaceValue") ?? []
  );
  const [subscriptionOrganizerValue, setSubscriptionOrganizerValue] = useState(
    getValueFromConfiguration("subscriptionOrganizerValue") ?? []
  );
  const [subscriptionTagValue, setSubscriptionTagValue] = useState(
    getValueFromConfiguration("subscriptionTagValue") ?? []
  );
  const [subscriptionNumberValue, setSubscriptionNumberValue] = useState(
    getValueFromConfiguration("subscriptionNumberValue") ?? 5
  );

  const [subscriptionEvents, setSubscriptionEvents] = useState(null);

  const [loadingResults, setLoadingResults] = useState(false);

  const optionsEndpoint = feedSource.admin[0].endpointOption ?? null;

  const numberOptions = Array.from(Array(10).keys());

  useEffect(() => {
    if (subscriptionPlaceValue) {
      configurationChange({
        target: { id: "subscriptionPlaceValue", value: subscriptionPlaceValue },
      });
    }
  }, [subscriptionPlaceValue]);

  useEffect(() => {
    if (subscriptionOrganizerValue) {
      configurationChange({
        target: {
          id: "subscriptionOrganizerValue",
          value: subscriptionOrganizerValue,
        },
      });
    }
  }, [subscriptionOrganizerValue]);

  useEffect(() => {
    if (subscriptionTagValue) {
      configurationChange({
        target: { id: "subscriptionTagValue", value: subscriptionTagValue },
      });
    }
  }, [subscriptionTagValue]);

  useEffect(() => {
    if (subscriptionNumberValue) {
      configurationChange({
        target: {
          id: "subscriptionNumberValue",
          value: subscriptionNumberValue,
        },
      });
    }
  }, [subscriptionNumberValue]);

  const subscriptionFetch = () => {
    const url = feedSource.admin[0].endpointSearch;

    const query = new URLSearchParams({
      type: "events",
      itemsPerPage: subscriptionNumberValue,
    });

    const places = subscriptionPlaceValue.map((option) => option.value);

    places.forEach((place) => {
      query.append("location", place);
    });

    const organizers = subscriptionOrganizerValue.map((option) => option.value);

    organizers.forEach((organizer) => {
      query.append("organization", organizer);
    });

    const tags = subscriptionTagValue.map((option) => option.value);

    tags.forEach((tag) => {
      query.append("tag", tag);
    });

    setLoadingResults(true);

    fetch(`${url}?${query}`, {
      headers: getHeaders(),
    })
      .then((response) => response.json())
      .then((data) => {
        setSubscriptionEvents(data);
      })
      .catch(() => {
        // @TODO: Handle error.
      })
      .finally(() => {
        setLoadingResults(false);
      });
  };

  // Fetch results.
  useEffect(() => {
    subscriptionFetch();
  }, [
    subscriptionPlaceValue,
    subscriptionOrganizerValue,
    subscriptionTagValue,
    subscriptionNumberValue,
  ]);

  const locationTimeoutRef = useRef(null);
  const organizationTimeoutRef = useRef(null);
  const tagTimeoutRef = useRef(null);

  const debounceOptions = (inputValue, type) => {
    // Debounce promise.
    return new Promise((resolve, reject) => {
      let timeoutRef = null;

      switch (type) {
        case "locations":
          timeoutRef = locationTimeoutRef;
          break;
        case "organizations":
          timeoutRef = organizationTimeoutRef;
          break;
        case "tags":
          timeoutRef = tagTimeoutRef;
          break;
        default:
          return;
      }

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        loadDropdownOptionsPromise(
          optionsEndpoint,
          getHeaders(),
          inputValue,
          type
        )
          .then((data) => resolve(data))
          .catch((reason) => reject(reason));
      }, 500);
    });
  };

  return (
    <>
      <Row>
        <Col>
          <h5>{t("selected-type-subscription")}</h5>
          <small className="form-text">{t("subscription-helptext")}</small>

          <Row>
            <h5 className="mt-3">{t("filters")}</h5>
            <div className="mb-2">
              <div className="form-group">
                <label htmlFor="os2display-poster--select-subscription-places" className="form-label">
                  {t("filters-place")}
                </label>
                <AsyncSelect
                  id="subscription-search-place"
                  isClearable
                  isSearchable
                  defaultOptions
                  isMulti
                  loadOptions={(inputValue) =>
                    debounceOptions(inputValue, "locations")
                  }
                  value={subscriptionPlaceValue}
                  onChange={(newValue) => {
                    setSubscriptionPlaceValue(newValue);
                  }}
                />
              </div>
            </div>

            <div className="mb-2">
              <div className="form-group">
                <label htmlFor="os2display-poster--select-subscription-organizers" className="form-label">
                  {t("filters-organizer")}
                </label>
                <AsyncSelect
                  id="subscription-search-place"
                  isClearable
                  isSearchable
                  defaultOptions
                  isMulti
                  loadOptions={(inputValue) =>
                    debounceOptions(inputValue, "organizations")
                  }
                  value={subscriptionOrganizerValue}
                  onChange={(newValue) => {
                    setSubscriptionOrganizerValue(newValue);
                  }}
                />
              </div>
            </div>

            <div className="mb-2">
              <div className="form-group">
                <label htmlFor="os2display-poster--select-subscription-tags" className="form-label">
                  {t("filters-tag")}
                </label>
                <AsyncSelect
                  id="subscription-search-tag"
                  isClearable
                  isSearchable
                  defaultOptions
                  isMulti
                  loadOptions={(inputValue) =>
                    debounceOptions(inputValue, "tags")
                  }
                  value={subscriptionTagValue}
                  onChange={(newValue) => {
                    setSubscriptionTagValue(newValue);
                  }}
                />
              </div>
            </div>

            <div>
              <div className="form-group">
                <div>
                  <label htmlFor="os2display-poster--select-number" className="form-label">
                    {t("number-of-slides")}
                    <select
                      className="form-control"
                      id="os2display-poster--select-number"
                      value={subscriptionNumberValue}
                      onChange={({ target }) =>
                        setSubscriptionNumberValue(target.value)
                      }
                    >
                      {numberOptions?.map((i) => (
                        <option
                          value={i + 1}
                          key={`number-of-slides-option-${i}`}
                        >
                          {i + 1}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              </div>
            </div>
          </Row>
          <Row>
            <div>
              <h5 className="mt-3">{t("preview-of-events")}</h5>
              {loadingResults && <Spinner animation="border" />}
              <table className="table table-hover text-left">
                <thead>
                  <tr>
                    <th scope="col">{t("table-image")}</th>
                    <th scope="col">{t("table-event")}</th>
                    <th scope="col">{t("table-place")}</th>
                    <th scope="col">{t("table-date")}</th>
                  </tr>
                </thead>
                <tbody>
                  {subscriptionEvents?.length > 0 &&
                    subscriptionEvents?.map((event) => {
                      const firstOccurrence =
                        event?.occurrences.length > 0
                          ? event.occurrences[0]
                          : null;

                      return (
                        <tr key={`event-${event.entityId}`}>
                          <td>
                            <img
                              src={event?.imageUrls?.small}
                              alt={event.name}
                              style={{ maxWidth: "80px" }}
                            />
                          </td>
                          <td>
                            <strong>{event.title}</strong>
                            <br />
                            {event?.organizer?.name}
                          </td>
                          <td>
                            {firstOccurrence && firstOccurrence?.place?.name}
                          </td>
                          <td>
                            {firstOccurrence && (
                              <>
                                {`${formatDate(
                                  firstOccurrence.start,
                                  "L"
                                )} - ${formatDate(firstOccurrence.end, "L")}`}
                              </>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </Row>
        </Col>
      </Row>
    </>
  );
}

PosterSubscription.propTypes = {
  getValueFromConfiguration: PropTypes.func.isRequired,
  configurationChange: PropTypes.func.isRequired,
  feedSource: PropTypes.shape({
    admin: PropTypes.arrayOf(
      PropTypes.shape({
        endpointEntity: PropTypes.string,
        endpointOption: PropTypes.string,
        endpointSearch: PropTypes.string,
      })
    ),
  }).isRequired,
};

export default PosterSubscription;
