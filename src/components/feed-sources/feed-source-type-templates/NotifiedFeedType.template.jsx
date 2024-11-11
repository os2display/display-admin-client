import { React } from "react";
import PropTypes from "prop-types";
import FormInput from "../../util/forms/form-input";

const NotifiedFeedTypeTemplate = ({ handleInput, formStateObject, t, mode }) => {
  return (
    <>
      <FormInput
        name="token"
        type="text"
        label={t("dynamic-fields.NotifiedFeedType.token")}
        onChange={handleInput}
        placeholder={
          mode === "edit"
            ? t("dynamic-fields.redactedValueInputPlaceholder")
            : ""
        }
        value={formStateObject.token}
      />
    </>
  );
};

NotifiedFeedTypeTemplate.propTypes = {
  handleInput: PropTypes.func,
  formStateObject: PropTypes.shape({
    token: PropTypes.string,
  }),
  t: PropTypes.func,
  mode: PropTypes.string,
};
export default NotifiedFeedTypeTemplate;
