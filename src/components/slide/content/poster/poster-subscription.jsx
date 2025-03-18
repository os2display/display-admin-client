import { React, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Alert, Row, Spinner } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import { formatDate, getHeaders } from "./poster-helper";
import PosterSubscriptionCriteria from "./poster-subscription-criteria";

/**
 * @param {object} props Props.
 * @param {object} props.feedSource Feed source.
 * @param {Function} props.configurationChange Configuration onChange.
 * @param {object} props.configuration The configuration object.
 * @param {object} props.feedSource.admin The admin configuration.
 * @returns {React.JSX.Element} The poster subscription component.
 */
function PosterSubscription({
  configurationChange,
  configuration,
  feedSource: { admin },
}) {
  const { t } = useTranslation("common", { keyPrefix: "poster-selector-v2" });

  const [subscriptionEvents, setSubscriptionEvents] = useState(null);
  const [loadingResults, setLoadingResults] = useState(false);

  const [firstAdmin] = admin;
  const optionsEndpoint = firstAdmin.endpointOption ?? null;
  const searchEndpoint = firstAdmin.endpointSearch ?? null;

  const {
    subscriptionNumberValue = [],
    subscriptionPlaceValue = [],
    subscriptionOrganizerValue = [],
    subscriptionTagValue = [],
  } = configuration;

  const handleSelect = (id, value = []) => {
    if (!id) {
      return;
    }

    configurationChange({ target: { id, value } });
  };

  const subscriptionFetch = () => {
    const query = new URLSearchParams({
      type: "events",
      itemsPerPage: subscriptionNumberValue,
    });

    const places = subscriptionPlaceValue.map(({ value }) => value);

    places.forEach((place) => {
      query.append("location", place);
    });

    const organizers = subscriptionOrganizerValue.map(({ value }) => value);

    organizers.forEach((organizer) => {
      query.append("organization", organizer);
    });

    const tags = subscriptionTagValue.map(({ value }) => value);

    tags.forEach((tag) => {
      query.append("tag", tag);
    });

    setLoadingResults(true);

    fetch(`${searchEndpoint}?${query}`, {
      headers: getHeaders(),
    })
      .then((response) => response.json())
      .then((data) => {
        setSubscriptionEvents(data);
      })
      .finally(() => {
        setLoadingResults(false);
      });
  };

  useEffect(() => {
    if (configuration) {
      subscriptionFetch();
    }
  }, [configuration]);

  return (
    <>
      <Row>
        <Col>
          <h5>{t("selected-type-subscription")}</h5>
          <small className="form-text">{t("subscription-helptext")}</small>

          <Row className="m-1 mt-2">
            <Alert variant="warning" className="mb-0">
              {t("preview-updates-after-save")}
            </Alert>
          </Row>

          <Row>
            <PosterSubscriptionCriteria
              optionsEndpoint={optionsEndpoint}
              configuration={configuration}
              handleSelect={handleSelect}
            />
          </Row>
          <Row>
            <div>
              <h5>{t("preview-of-events")}</h5>
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
                    subscriptionEvents?.map(
                      ({
                        entityId,
                        occurrences,
                        imageUrls,
                        title,
                        organizer,
                      }) => {
                        const firstOccurrence =
                          occurrences.length > 0 ? occurrences[0] : null;

                        return (
                          <tr key={`event-${entityId}`}>
                            <td>
                              <img
                                src={imageUrls?.small}
                                alt={title}
                                style={{ maxWidth: "80px" }}
                              />
                            </td>
                            <td>
                              <strong>{title}</strong>
                              <br />
                              {organizer?.name}
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
                      }
                    )}
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
  configuration: PropTypes.shape({
    subscriptionPlaceValue: PropTypes.arrayOf(
      PropTypes.shape({ label: PropTypes.string, value: PropTypes.number })
    ),
    subscriptionOrganizerValue: PropTypes.arrayOf(
      PropTypes.shape({ label: PropTypes.string, value: PropTypes.number })
    ),
    subscriptionTagValue: PropTypes.arrayOf(
      PropTypes.shape({ label: PropTypes.string, value: PropTypes.number })
    ),
    subscriptionNumberValue: PropTypes.number,
  }).isRequired,
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
