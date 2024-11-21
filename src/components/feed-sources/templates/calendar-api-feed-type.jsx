import { React } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import MultiselectFromEndpoint from "../../slide/content/multiselect-from-endpoint";
import { Alert } from "react-bootstrap";

const CalendarApiFeedType = ({ feedSourceId, handleInput, formStateObject }) => {
  const { t } = useTranslation("common", {
    keyPrefix: "feed-source-manager.dynamic-fields.calendar-api-feed-type"
  });

  return (
    <>
      {!feedSourceId && (<Alert className="mt-4" variant="warning">
        {t("save-before-locations-can-be-set")}
      </Alert>)}
      {feedSourceId &&
        <MultiselectFromEndpoint
          onChange={handleInput}
          name={"locations"}
          label={t("locations")}
          value={formStateObject.locations ?? []}
          optionsEndpoint={"https://displayapiservice.local.itkdev.dk" + feedSourceId + "/config/locations"}
        />
      }
    </>
  );
};

CalendarApiFeedType.propTypes = {
  handleInput: PropTypes.func,
  formStateObject: PropTypes.shape({
    locations: PropTypes.arrayOf(PropTypes.string)
  }),
  mode: PropTypes.string
};

export default CalendarApiFeedType;
