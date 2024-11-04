import { React } from "react";
import PropTypes from "prop-types";
import FormInput from "../../util/forms/form-input";

const SparkleIOFeedTypeTemplate = ({ handleInput, formStateObject, t }) => {
  return (
    <>
      <FormInput
        name="BaseUrl"
        type="text"
        label={t("dynamic-fields.SparkleIOFeedType.baseUrl")}
        onChange={handleInput}
        value={formStateObject.notifiedFeedTypeToken}
      />
      <FormInput
        name="clientId"
        type="text"
        label={t("dynamic-fields.SparkleIOFeedType.clientId")}
        onChange={handleInput}
        value={formStateObject.notifiedFeedTypeToken}
      />
      <FormInput
        name="clientSecret"
        type="text"
        label={t("dynamic-fields.SparkleIOFeedType.clientSecret")}
        onChange={handleInput}
        value={formStateObject.notifiedFeedTypeToken}
      />
    </>
  );
};


SparkleIOFeedTypeTemplate.propTypes = {
  handleInput: PropTypes.func,
  formStateObject: PropTypes.shape({
    notifiedFeedTypeToken: PropTypes.string,
  }),
  t: PropTypes.func,
};
export default SparkleIOFeedTypeTemplate;
