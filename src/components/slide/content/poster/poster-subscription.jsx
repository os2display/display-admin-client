import { React, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Row, Spinner } from "react-bootstrap";
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

  const [subscriptionOccurrences, setSubscriptionOccurrences] = useState(null);
  const [loadingResults, setLoadingResults] = useState(false);

  const [firstAdmin] = admin;
  const optionsEndpoint = firstAdmin.endpointOption ?? null;
  const subscriptionEndpoint = firstAdmin.endpointSubscription ?? null;

  const {
    subscriptionNumberValue = 5,
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
      numberOfItems: subscriptionNumberValue,
    });

    const places = subscriptionPlaceValue.map(({ value }) => value);

    places.forEach((place) => {
      query.append("location[]", place);
    });

    const organizers = subscriptionOrganizerValue.map(({ value }) => value);

    organizers.forEach((organizer) => {
      query.append("organization[]", organizer);
    });

    const tags = subscriptionTagValue.map(({ value }) => value);

    tags.forEach((tag) => {
      query.append("tag[]", tag);
    });

    setLoadingResults(true);

    fetch(`${subscriptionEndpoint}?${query}`, {
      headers: getHeaders(),
    })
      .then((response) => response.json())
      .then((data) => {
        setSubscriptionOccurrences(data);
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
                  {subscriptionOccurrences?.length > 0 &&
                    subscriptionOccurrences?.map(
                      ({
                        eventId,
                        imageThumbnail,
                        image,
                        startDate,
                        endDate,
                        title,
                        organizer,
                        place,
                      }) => {
                        return (
                          <tr key={`event-${eventId}`}>
                            <td>
                              <img
                                src={imageThumbnail ?? image}
                                alt={title}
                                style={{ maxWidth: "80px" }}
                              />
                            </td>
                            <td>
                              <strong>{title}</strong>
                              <br />
                              {organizer?.name}
                            </td>
                            <td>{place?.name}</td>
                            <td>
                              {formatDate(startDate, "L HH:mm")}
                              {" - "}
                              {formatDate(endDate, "L HH:mm")}
                            </td>
                          </tr>
                        );
                      }
                    )}
                </tbody>
              </table>
            </div>

            <small className="form-text">
              {t("subscription-preview-of-events-helptext")}
            </small>
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
        endpointSubscription: PropTypes.string,
      })
    ),
  }).isRequired,
};

export default PosterSubscription;
