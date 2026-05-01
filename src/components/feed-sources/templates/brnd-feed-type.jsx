import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import FormInput from "../../util/forms/form-input";
import Select from "../../util/forms/select";

const BrndFeedType = ({ handleInput, formStateObject, mode }) => {
  const { t } = useTranslation("common", {
    keyPrefix: "brnd-feed-type",
  });
  const apiVersionOptions = [
    { key: "api-version-1-0", title: "1.0", value: "1.0" },
    { key: "api-version-2-0", title: "2.0", value: "2.0" },
  ];

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

      <Select
        name="api_version"
        formGroupClasses="mb-2"
        label={t("api-version")}
        options={apiVersionOptions}
        allowNull={false}
        onChange={handleInput}
        value={formStateObject?.api_version || "1.0"}
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
    api_version: PropTypes.string,
  }),
  mode: PropTypes.string,
};

export default BrndFeedType;
