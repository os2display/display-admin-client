import { React, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import FormInput from "../../util/forms/form-input";

const BrndFeedType = ({
  feedSourceId,
  handleInput,
  formStateObject,
  mode,
}) => {
  const { t } = useTranslation("common", {
    keyPrefix: "brnd-feed-type",
  });

  return (
    <>
     
      <FormInput
        name="api_base_uri"
        type="text"
        label={t("api-base-uri")}
        className="mb-2"
        onChange={handleInput}
        placeholder={
          mode === "PUT" ? t("redacted-value-input-placeholder") : ""
        }
        value={formStateObject?.api_base_uri}
      />

      <FormInput
        name="company_id"
        type="text"
        className="mb-2"
        label={t("company-id")}
        onChange={handleInput}
        placeholder={
          mode === "PUT" ? t("redacted-value-input-placeholder") : ""
        }
        value={formStateObject?.company_id}
      />

      <FormInput
        name="api_auth_key"
        type="text"
        label={t("api-auth-key")}
        onChange={handleInput}
        placeholder={
          mode === "PUT" ? t("redacted-value-input-placeholder") : ""
        }
        value={formStateObject?.api_auth_key}
      />
    </>
  );
};

BrndFeedType.propTypes = {
  handleInput: PropTypes.func,
  formStateObject: PropTypes.shape({
    api_base_uri: PropTypes.string,
    company_id: PropTypes.string,
    api_auth_key: PropTypes.string,
  }),
  feedSourceId: PropTypes.string,
  mode: PropTypes.string,
};

export default BrndFeedType;
