import { React } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import FormInput from "../../util/forms/form-input";

const CalendarFeedType = ({ handleInput, formStateObject, mode }) => {
  const { t } = useTranslation("common", {
    keyPrefix: "feed-source-manager.dynamic-fields.calendar-api-feed-type",
  });

  return (
    <>
      <FormInput
        name="resources"
        type="text"
        label={t("resources")}
        onChange={handleInput}
        placeholder={
          mode === "PUT"
            ? t("redacted-value-input-placeholder")
            : ""
        }
        value={formStateObject.resources}
      />
    </>
  );
};

CalendarFeedType.propTypes = {
  handleInput: PropTypes.func,
  formStateObject: PropTypes.shape({
    resources: PropTypes.string,
  }),
  mode: PropTypes.string,
};

export default CalendarFeedType;
