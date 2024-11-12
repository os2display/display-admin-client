import { React } from "react";
import PropTypes from "prop-types";
import FormInput from "../../util/forms/form-input";

const CalendarFeedTypeTemplate = ({
  handleInput,
  formStateObject,
  t,
  mode,
}) => {
  return (
    <>
      <FormInput
        name="resources"
        type="text"
        label={t("dynamic-fields.CalendarApiFeedType.resources")}
        onChange={handleInput}
        placeholder={
          mode === "PUT"
            ? t("dynamic-fields.redactedValueInputPlaceholder")
            : ""
        }
        value={formStateObject.resources}
      />
    </>
  );
};

CalendarFeedTypeTemplate.propTypes = {
  handleInput: PropTypes.func,
  formStateObject: PropTypes.shape({
    resources: PropTypes.string,
  }),
  t: PropTypes.func,
  mode: PropTypes.string,
};
export default CalendarFeedTypeTemplate;
