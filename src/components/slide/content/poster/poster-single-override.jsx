import { React } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import FormInput from "../../../util/forms/form-input";
import FormCheckbox from "../../../util/forms/form-checkbox";

/**
 * @param {object} props The props.
 * @param {object} props.configuration The configuration.
 * @param {string} props.configuration.overrideTitle Override title text.
 * @param {string} props.configuration.overrideSubTitle Override subtitle text.
 * @param {string} props.configuration.overrideTicketPrice Override ticket price text.
 * @param {string} props.configuration.readMoreText Override read more text.
 * @param {string} props.configuration.overrideReadMoreUrl Override read more url.
 * @param {boolean} props.configuration.hideTime Hide event time.
 * @param {Function} props.onChange On change callback.
 * @returns {React.JSX.Element} The override component.
 */
function PosterSingleOverride({
  configuration: {
    overrideTitle,
    overrideSubTitle,
    overrideTicketPrice,
    readMoreText,
    overrideReadMoreUrl,
    hideTime,
  },
  onChange,
}) {
  const { t } = useTranslation("common", { keyPrefix: "poster-selector-v2" });

  return (
    <>
      <FormInput
        label={t("single-override-title")}
        name="overrideTitle"
        value={overrideTitle}
        onChange={onChange}
        className="mb-3"
      />
      <FormInput
        label={t("single-override-subtitle")}
        name="overrideSubTitle"
        value={overrideSubTitle}
        onChange={onChange}
        className="mb-3"
      />
      <FormInput
        label={t("single-override-ticket-price")}
        name="overrideTicketPrice"
        value={overrideTicketPrice}
        onChange={onChange}
        className="mb-3"
      />
      <FormInput
        label={t("single-read-more-text")}
        name="readMoreText"
        value={readMoreText}
        onChange={onChange}
        className="mb-3"
      />
      <FormInput
        label={t("single-read-more-url")}
        name="overrideReadMoreUrl"
        value={overrideReadMoreUrl}
        onChange={onChange}
        className="mb-3"
      />
      <FormCheckbox
        label={t("single-hide-time")}
        name="hideTime"
        value={hideTime}
        onChange={onChange}
        className="mb-3"
      />
    </>
  );
}

PosterSingleOverride.propTypes = {
  configuration: PropTypes.shape({
    overrideTitle: PropTypes.string,
    overrideSubTitle: PropTypes.string,
    overrideTicketPrice: PropTypes.string,
    readMoreText: PropTypes.string,
    overrideReadMoreUrl: PropTypes.string,
    hideTime: PropTypes.bool,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default PosterSingleOverride;
