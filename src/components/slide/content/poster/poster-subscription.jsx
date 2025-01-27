import { React, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Row, Spinner } from "react-bootstrap";
import AsyncSelect from "react-select/async";
import Col from "react-bootstrap/Col";
import localStorageKeys from "../../../util/local-storage-keys";
import { formatDate } from "./poster-helper";

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
  const posterType = getValueFromConfiguration("posterType");

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
    let query = `?type=events`;

    const places = subscriptionPlaceValue.map((option) => option.value);

    places.forEach((place) => {
      query = `${query}&place=${place}`;
    });

    const organizers = subscriptionOrganizerValue.map((option) => option.value);

    organizers.forEach((organizer) => {
      query = `${query}&organizer=${organizer}`;
    });

    const tags = subscriptionTagValue.map((option) => option.value);

    tags.forEach((tag) => {
      query = `${query}&tag=${tag}`;
    });

    query = `${query}&items_per_page=${subscriptionNumberValue}`;

    setLoadingResults(true);

    fetch(`${url}${query}`, {
      headers,
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
    if (posterType === "subscription") {
      subscriptionFetch();
    }
  }, [
    subscriptionPlaceValue,
    subscriptionOrganizerValue,
    subscriptionTagValue,
    subscriptionNumberValue,
  ]);

  const loadDropdownOptions = (inputValue, callback, type) => {
    const url = feedSource.admin[0].endpointSearch;

    let query = `?type=${type}&display=options`;

    if (inputValue) {
      query = `${query}&title=${inputValue}`;
    }

    // TODO: Get this endpoint in a different way.
    fetch(`${url}${query}`, {
      headers,
    })
      .then((response) => response.json())
      .then((data) => {
        callback(data);
      })
      .catch(() => {
        callback([]);
        // TODO: Display error.
      });
  };


  const numberOptions = Array.from(Array(10).keys());

  return (
    <>
      <Row>
        <Col>
          <h5>{t("selected-type-subscription")}</h5>
          <small className="form-text">
            {t("subscription-helptext")}
          </small>

          <Row>
            <Col md="3" className="bg-light">
              <h5 className="mt-3">{t("filters")}</h5>
              <div className="mb-2">
                <div className="form-group">
                  <label htmlFor="os2display-poster--select-subscription-places">
                    {t("filters-place")}
                  </label>
                  <AsyncSelect
                    id="subscription-search-place"
                    isClearable
                    isSearchable
                    defaultOptions
                    isMulti
                    loadOptions={(inputValue, callback) =>
                      loadDropdownOptions(inputValue, callback, "places")
                    }
                    value={subscriptionPlaceValue}
                    onChange={(newValue) => {
                      setSubscriptionPlaceValue(newValue);
                    }}
                  />
                  <small className="form-text">
                    {t("filter-place-helptext")}
                  </small>
                </div>
              </div>

              <div className="mb-2">
                <div className="form-group">
                  <label htmlFor="os2display-poster--select-subscription-organizers">
                    {t("filters-organizer")}
                  </label>
                  <AsyncSelect
                    id="subscription-search-place"
                    isClearable
                    isSearchable
                    defaultOptions
                    isMulti
                    loadOptions={(inputValue, callback) =>
                      loadDropdownOptions(inputValue, callback, "organizers")
                    }
                    value={subscriptionOrganizerValue}
                    onChange={(newValue) => {
                      setSubscriptionOrganizerValue(newValue);
                    }}
                  />
                  <small className="form-text">
                    {t("filter-organizer-helptext")}
                  </small>
                </div>
              </div>

              <div className="mb-2">
                <div className="form-group">
                  <label htmlFor="os2display-poster--select-subscription-tags">
                    {t("filters-tag")}
                  </label>
                  <AsyncSelect
                    id="subscription-search-place"
                    isClearable
                    isSearchable
                    defaultOptions
                    isMulti
                    loadOptions={(inputValue, callback) =>
                      loadDropdownOptions(inputValue, callback, "tags")
                    }
                    value={subscriptionTagValue}
                    onChange={(newValue) => {
                      setSubscriptionTagValue(newValue);
                    }}
                  />
                  <small className="form-text">
                    {t("filter-tag-helptext")}
                  </small>
                </div>
              </div>

              <div>
                <div className="form-group">
                  <div>
                    <label htmlFor="os2display-poster--select-number">
                      {t("number-of-slides")}
                      <select
                        id="os2display-poster--select-number"
                        value={subscriptionNumberValue}
                        onChange={({ target }) =>
                          setSubscriptionNumberValue(target.value)
                        }
                      >
                        {numberOptions?.map((i) => (
                          <option value={i + 1}>{i + 1}</option>
                        ))}
                      </select>
                    </label>
                  </div>
                  <span className="small text-muted">
                    {t("number-of-slides-helptext")}
                  </span>
                </div>
              </div>
            </Col>
            <div className="col-md-9">
              <div>
                <h5 className="mt-3">
                  {t("preview-of-events")}
                </h5>
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
                    {loadingResults && <Spinner animation="border" />}
                    {subscriptionEvents?.map((event) => {
                      const firstOccurrence =
                        event?.occurrences.length > 0
                          ? event.occurrences[0]
                          : null;

                      return (
                        <tr>
                          <td>
                            <img
                              src={event?.imageUrls?.small}
                              alt={event.name}
                              style={{ maxWidth: "80px" }}
                            />
                          </td>
                          <td>
                            <strong>{event.name}</strong>
                            <br />
                            {event?.organizer?.name}
                          </td>
                          <td>
                            {firstOccurrence && firstOccurrence.place?.name}
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
        endpointSearch: PropTypes.string,
      })
    ),
  }).isRequired,
};

export default PosterSubscription;
