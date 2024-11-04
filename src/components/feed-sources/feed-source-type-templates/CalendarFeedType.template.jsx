import { React } from "react";
import PropTypes from "prop-types";
import FormInput from "../../util/forms/form-input";

const CalendarFeedTypeTemplate = ({ handleInput, formStateObject, t }) => {
  return (
    <>
      <FormInput
        name="resources"
        type="text"
        label={t("dynamic-fields.CalendarApiFeedType.resources")}
        onChange={handleInput}
        value={formStateObject.feedSources}
      />
    </>
  );
};


CalendarFeedTypeTemplate.propTypes = {
  handleInput: PropTypes.func,
  formStateObject: PropTypes.shape({
    feedSources: PropTypes.string,
  }),
  t: PropTypes.func,
};
export default CalendarFeedTypeTemplate;
