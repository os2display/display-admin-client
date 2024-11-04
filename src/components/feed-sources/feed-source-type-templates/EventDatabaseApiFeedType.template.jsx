import { React } from "react";
import PropTypes from "prop-types";
import FormInput from "../../util/forms/form-input";

const EventDatabaseApiTemplate = ({ handleInput, formStateObject, t }) => {
  return (
    <>
      <FormInput
        name="host"
        type="text"
        label={t("dynamic-fields.eventDatabaseApi.host")}
        onChange={handleInput}
        value={formStateObject.host}
      />
    </>
  );
};

EventDatabaseApiTemplate.propTypes = {
  handleInput: PropTypes.func,
  formStateObject: PropTypes.shape({
    host: PropTypes.string,
  }),
  t: PropTypes.func,
};
export default EventDatabaseApiTemplate;
