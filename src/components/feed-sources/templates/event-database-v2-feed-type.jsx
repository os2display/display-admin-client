import { React } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import FormInput from "../../util/forms/form-input";

const EventDatabaseApiV2FeedType = ({ handleInput, formStateObject, mode }) => {
  const { t } = useTranslation("common", {
    keyPrefix: "event-database-api-v2-feed-type",
  });
  return (
    <>
      <FormInput
        name="host"
        type="text"
        className="mb-2"
        label={t("host")}
        onChange={handleInput}
        value={formStateObject?.host}
      />
      <FormInput
        name="apikey"
        type="text"
        label={t("apikey")}
        onChange={handleInput}
        placeholder={
          mode === "PUT" ? t("redacted-value-input-placeholder") : ""
        }
        value={formStateObject?.apikey}
      />
    </>
  );
};

EventDatabaseApiV2FeedType.propTypes = {
  handleInput: PropTypes.func,
  formStateObject: PropTypes.shape({
    host: PropTypes.string.isRequired,
    apikey: PropTypes.string,
  }),
  mode: PropTypes.string,
};

export default EventDatabaseApiV2FeedType;
