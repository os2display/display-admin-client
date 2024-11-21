import { React, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Alert } from "react-bootstrap";
import MultiselectFromEndpoint from "../../slide/content/multiselect-from-endpoint";
import ConfigLoader from "../../../config-loader";

const CalendarApiFeedType = ({
  feedSourceId,
  handleInput,
  formStateObject,
}) => {
  const { t } = useTranslation("common", {
    keyPrefix: "feed-source-manager.dynamic-fields.calendar-api-feed-type",
  });

  const [optionsEndpoint, setOptionsEndpoint] = useState(null);

  useEffect(() => {
    if (feedSourceId && feedSourceId !== "") {
      ConfigLoader.loadConfig().then((config) => {
        setOptionsEndpoint(`${config.api + feedSourceId}/config/locations`);
      });
    }
  }, [feedSourceId]);

  return (
    <>
      {!feedSourceId && (
        <Alert className="mt-4" variant="warning">
          {t("save-before-locations-can-be-set")}
        </Alert>
      )}
      {optionsEndpoint && (
        <MultiselectFromEndpoint
          onChange={handleInput}
          name="locations"
          label={t("locations")}
          value={formStateObject.locations ?? []}
          optionsEndpoint={optionsEndpoint}
        />
      )}
    </>
  );
};

CalendarApiFeedType.propTypes = {
  handleInput: PropTypes.func,
  formStateObject: PropTypes.shape({
    locations: PropTypes.arrayOf(PropTypes.string),
  }),
  feedSourceId: PropTypes.string,
};

export default CalendarApiFeedType;
