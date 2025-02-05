import { React, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Button, Card, Row, Spinner } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import { formatDate, getHeaders } from "./poster-helper";
import PosterSingleOverride from "./poster-single-override";
import PosterSingleSearch from "./poster-single-search";

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
  const [singleDisplayOverrides, setSingleDisplayOverrides] = useState(false);
  const [singleSelectedEvent, setSingleSelectedEvent] = useState(null);
  const [singleSelectedOccurrence, setSingleSelectedOccurrence] =
    useState(null);
  const [singleSearchEvents, setSingleSearchEvents] = useState(null);

  const {
    singleSelectedEvent: singleSelectedEventId = null,
    singleSelectedOccurrence: singleSelectedOccurrenceId = null,
  } = configuration;

  const { admin } = feedSource;
  const [firstAdminEntry] = admin;

  const entityEndpoint = firstAdminEntry.endpointEntity ?? null;
  const optionsEndpoint = firstAdminEntry.endpointOption ?? null;
  const searchEndpoint = firstAdminEntry.endpointSearch ?? null;

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
  }, [singleSelectedEventId]);

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
                    <b>{t("chosen-event")}:</b> {singleSelectedEvent.title} (
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
                  <PosterSingleOverride
                    onChange={configurationChange}
                    configuration={configuration}
                  />
                )}
              </Card>
            </Col>
          </Row>
        </>
      )}

      {singleSelectedEvent === null && (
        <>
          <Row className="mb-2">
            <h5 className="mt-2">{t("search-for-event")}</h5>
          </Row>

          <PosterSingleSearch
            optionsEndpoint={optionsEndpoint}
            searchEndpoint={searchEndpoint}
            setLoading={setLoadingResults}
            setResult={setSingleSearchEvents}
          />

          {loadingResults && (
            <Row className="mb-2">
              <Spinner className="mt-3" animation="border" />
            </Row>
          )}

          {singleSearchEvents && (
            <Row className="mb-2">
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
            </Row>
          )}
        </>
      )}

      {singleSelectedEvent !== null && singleSelectedOccurrence === null && (
        <Row className="mb-2">
          <h5>{t("choose-an-occurrence")}</h5>
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
                      <Button onClick={() => handleSelectOccurrence(entityId)}>
                        {t("choose-occurrence")}
                      </Button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </Row>
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
