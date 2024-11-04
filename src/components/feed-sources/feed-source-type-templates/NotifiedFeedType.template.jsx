import { React } from "react";
import PropTypes from "prop-types";
import FormInput from "../../util/forms/form-input";

const NotifiedFeedTypeTemplate = ({ handleInput, formStateObject, t }) => {
  return (
    <>
      <FormInput
        name="token"
        type="text"
        label={t("dynamic-fields.AppFeedNotifiedFeedType.token")}
        onChange={handleInput}
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
};
export default NotifiedFeedTypeTemplate;
