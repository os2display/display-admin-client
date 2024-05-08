import dayjs from "dayjs";
import PropTypes from "prop-types";
import { React, JSX, useState, useEffect } from "react";
import { Alert, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faExclamationCircle,
  faExclamationTriangle,
  faInfoCircle,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import idFromUrl from "../util/helpers/id-from-url";

/**
 * Displays screen status.
 *
 * @param {object} props The props.
 * @param {object} props.screen The screen.
 * @param {string | null} props.mode The display mode: 'default' or 'minimal'
 * @returns {JSX.Element} The status element.
 */
function ScreenStatus({ screen, mode = "default" }) {
  const { t } = useTranslation("common", { keyPrefix: "screen-status" });
  const navigate = useNavigate();

  const [clientRelease, setClientRelease] = useState(null);

  const { status } = screen;

  useEffect(() => {
    if (status) {
      const now = dayjs().startOf("minute").valueOf();

      if (status?.clientMeta?.host) {
        fetch(`${status.clientMeta.host}/client/release.json?ts=${now}`)
          .then((res) => res.json())
          .then((data) => setClientRelease(data));
      }
    }
  }, ["status"]);

  if (mode === "minimal") {
    if (!status || status?.clientMeta?.tokenExpired) {
      return (
        <Button
          variant="outline-primary"
          type="button"
          id="cancel_user"
          onClick={() => navigate(`/screen/edit/${idFromUrl(screen["@id"])}`)}
          className="margin-right-button"
          size="sm"
        >
          <FontAwesomeIcon icon={faPlus} /> Connect
        </Button>
      );
    }

    const latestRequest = dayjs(status.latestRequestDateTime);
    const inOneHour = dayjs().add(1, "hours");

    if (latestRequest > inOneHour) {
      return (
        <FontAwesomeIcon icon={faExclamationCircle} className="text-danger" />
      );
    }

    if (clientRelease) {
      if (status?.releaseVersion !== clientRelease?.releaseVersion) {
        return <FontAwesomeIcon icon={faInfoCircle} className="text-warning" />;
      }

      if (status?.releaseTimestamp !== clientRelease?.releaseTimestamp) {
        return <FontAwesomeIcon icon={faInfoCircle} className="text-warning" />;
      }
    }

    return (
      <div>
        <FontAwesomeIcon icon={faCheckCircle} className="text-success" />
      </div>
    );
  }

  return (
    <>
      {!status && (
        <div className="mb-3">
          <Alert key="screen-not-bound" variant="danger">
            {t("not-bound")}
          </Alert>
        </div>
      )}
      {status?.clientMeta?.tokenExpired && (
        <div className="mb-3">
          <Alert key="token-expired" variant="danger">
            {t("token-expired")}
          </Alert>
        </div>
      )}
      {status && !status.clientMeta?.tokenExpired && (
        <>
          <div className="mb-3">
            <Alert key="screen-bound" variant="success">
              {t("already-bound")}
            </Alert>
          </div>

          {dayjs(status?.latestRequestDateTime) <
            dayjs().subtract(1, "hour") && (
            <>
              {" "}
              <Alert variant="danger">
                <FontAwesomeIcon icon={faExclamationTriangle} />{"  "}
                {t("latest-request-warning")}
              </Alert>
            </>
          )}

          {(clientRelease?.releaseTimestamp !== status?.releaseTimestamp ||
            clientRelease?.releaseVersion !== status?.releaseVersion) && (
            <Alert variant="warning">
              <FontAwesomeIcon icon={faExclamationTriangle} />{"  "}
              {t("release-warning")}
            </Alert>
          )}

          <Alert variant="info">
            <div>
              {t("latest-request")}:{" "}
              {dayjs(status?.latestRequestDateTime).format("D/M YYYY HH:mm")}
            </div>
            <div>
              {t("release-version")}: {status?.releaseVersion}
            </div>
            <div>
              {t("release-timestamp")}:{" "}
              {dayjs(status?.releaseTimestamp * 1000).format("D/M YYYY HH:mm")}
            </div>
          </Alert>
        </>
      )}
    </>
  );
}

ScreenStatus.defaultProps = {
  mode: "default"
};

ScreenStatus.propTypes = {
  screen: PropTypes.shape({
    "@id": PropTypes.string.isRequired,
    status: PropTypes.shape({
      releaseVersion: PropTypes.string,
      releaseTimestamp: PropTypes.number,
      latestRequestDateTime: PropTypes.string,
      clientMeta: PropTypes.shape({
        ip: PropTypes.string,
        host: PropTypes.string,
        userAgent: PropTypes.string,
        tokenExpired: PropTypes.bool,
      }),
    }),
  }).isRequired,
  mode: PropTypes.string,
};

export default ScreenStatus;
