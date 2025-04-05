import { Button } from "react-bootstrap";
import { React } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { formatDate } from "./poster-helper";

/**
 * @param {object} props The props.
 * @param {Array} props.events The events to present.
 * @param {Function} props.handleSelectEvent Handle select event.
 * @returns {React.JSX.Element} The events list component.
 */
function PosterSingleEvents({ events, handleSelectEvent }) {
  const { t } = useTranslation("common", { keyPrefix: "poster-selector-v2" });

  return (
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
        {events?.map(
          ({ entityId, title, imageUrls, organizer, occurrences }) => (
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
                {occurrences?.length > 0 && formatDate(occurrences[0]?.start)}
                {occurrences?.length > 1 && <span>, ...</span>}
              </td>
              <td>
                <Button
                  onClick={() =>
                    handleSelectEvent(
                      entityId,
                      occurrences.map(
                        ({ entityId: occurrenceEntityId }) => occurrenceEntityId
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
        {events?.length === 0 && (
          <tr>
            <td colSpan="3">{t("no-results")}</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

PosterSingleEvents.propTypes = {
  events: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  handleSelectEvent: PropTypes.func.isRequired,
};

export default PosterSingleEvents;
