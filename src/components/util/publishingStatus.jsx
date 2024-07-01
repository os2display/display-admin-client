import { React, useEffect, useState } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMinusCircle,
  faCheckCircle,
  faClock,
} from "@fortawesome/free-solid-svg-icons";

/**
 * @param {object} props The props.
 * @param {object} props.published Object with from and to.
 * @returns {object} The published yes/no component.
 */
function PublishingStatus({ published }) {
  const PUBLISHED_EXPIRED = "EXPIRED";
  const PUBLISHED_ACTIVE = "ACTIVE";
  const PUBLISHED_FUTURE = "FUTURE";

  const { t } = useTranslation("common", { keyPrefix: "published-state" });
  const [publishedState, setPublishedState] = useState(null);

  useEffect(() => {
    dayjs.extend(localizedFormat);
  }, []);

  useEffect(() => {
    let newPublishedState = null;
    const now = dayjs(new Date());

    const from = published.from ? dayjs(published.from) : null;
    const to = published.to ? dayjs(published.to) : null;

    if (from !== null) {
      if (from.isAfter(now)) {
        newPublishedState = PUBLISHED_FUTURE;
      }
    }

    if (to !== null) {
      if (to.isBefore(now)) {
        newPublishedState = PUBLISHED_EXPIRED;
      }
    }

    setPublishedState(newPublishedState ?? PUBLISHED_ACTIVE);

    return () => {};
  }, [published]);

  return (
    <span>
      {publishedState === PUBLISHED_EXPIRED && (
        <>
          <FontAwesomeIcon icon={faMinusCircle} className="text-danger" />{" "}
          {t("expired")}
        </>
      )}
      {publishedState === PUBLISHED_ACTIVE && (
        <>
          <FontAwesomeIcon icon={faCheckCircle} className="text-success" />{" "}
          {t("active")}
        </>
      )}
      {publishedState === PUBLISHED_FUTURE && (
        <>
          <FontAwesomeIcon icon={faClock} className="text-primary" />{" "}
          {t("future")}
        </>
      )}
    </span>
  );
}

PublishingStatus.propTypes = {
  published: PropTypes.shape({
    from: PropTypes.string,
    to: PropTypes.string,
  }).isRequired,
};

export default PublishingStatus;
