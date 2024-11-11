import { React } from "react";
import PropTypes from "prop-types";
import FormInput from "../../util/forms/form-input";

const EventDatabaseApiTemplate = ({ handleInput, formStateObject, t, mode }) => {
  return (
    <>
      <FormInput
        name="host"
        type="text"
        label={t("dynamic-fields.EventDatabaseApiFeedType.host")}
        onChange={handleInput}
        placeholder={
          mode === "edit"
            ? t("dynamic-fields.redactedValueInputPlaceholder")
            : ""
        }
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
  mode: PropTypes.string,
};
export default EventDatabaseApiTemplate;
