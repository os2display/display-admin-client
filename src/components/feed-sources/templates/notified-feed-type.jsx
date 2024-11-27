import { React } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import FormInput from "../../util/forms/form-input";

const NotifiedFeedType = ({ handleInput, formStateObject, mode }) => {
  const { t } = useTranslation("common", {
    keyPrefix: "feed-source-manager.dynamic-fields.notified-feed-type",
  });

  return (
    <>
      <FormInput
        name="token"
        type="text"
        label={t("token")}
        onChange={handleInput}
        placeholder={
          mode === "PUT" ? t("redacted-value-input-placeholder") : ""
        }
        value={formStateObject.token}
      />
    </>
  );
};

NotifiedFeedType.propTypes = {
  handleInput: PropTypes.func,
  formStateObject: PropTypes.shape({
    token: PropTypes.string,
  }),
  mode: PropTypes.string,
};

export default NotifiedFeedType;
