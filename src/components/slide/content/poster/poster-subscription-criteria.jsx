import AsyncSelect from "react-select/async";
import { React, useRef } from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { getHeaders, loadDropdownOptionsPromise } from "./poster-helper";

/**
 * @param {object} props The props.
 * @param {string} props.optionsEndpoint The options endpoint.
 * @param {object} props.configuration The configuration object.
 * @param {Array} props.configuration.subscriptionPlaceValue Array of selections.
 * @param {Array} props.configuration.subscriptionOrganizerValue Array of selections.
 * @param {Array} props.configuration.subscriptionTagValue Array of selections.
 * @param {number} props.configuration.subscriptionNumberValue Number of results to pick.
 * @param {Function} props.handleSelect Select callback.
 * @returns {React.JSX.Element} The criteria component.
 */
function PosterSubscriptionCriteria({
  optionsEndpoint,
  configuration: {
    subscriptionPlaceValue,
    subscriptionOrganizerValue,
    subscriptionTagValue,
    subscriptionNumberValue,
  },
  handleSelect,
}) {
  const { t } = useTranslation("common", { keyPrefix: "poster-selector-v2" });

  const locationTimeoutRef = useRef(null);
  const organizationTimeoutRef = useRef(null);
  const tagTimeoutRef = useRef(null);

  // The user can choose between 1-10 entries to display.
  const numberOptions = Array.from(Array(10).keys());

  const debounceOptions = (inputValue, type) => {
    // Debounce promise.
    return new Promise((resolve, reject) => {
      let timeoutRef = null;

      switch (type) {
        case "locations":
          timeoutRef = locationTimeoutRef;
          break;
        case "organizations":
          timeoutRef = organizationTimeoutRef;
          break;
        case "tags":
          timeoutRef = tagTimeoutRef;
          break;
        default:
          return;
      }

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        loadDropdownOptionsPromise(
          optionsEndpoint,
          getHeaders(),
          inputValue,
          type
        )
          .then((data) => resolve(data))
          .catch((reason) => reject(reason));
      }, 500);
    });
  };

  return (
    <>
      <h5 className="mt-3">{t("filters")}</h5>
      <div className="mb-2">
        <div className="form-group">
          <label
            htmlFor="os2display-poster--select-subscription-places"
            className="form-label"
          >
            {t("filters-place")}
          </label>
          <AsyncSelect
            id="subscription-search-place"
            isClearable
            isSearchable
            defaultOptions
            isMulti
            loadOptions={(inputValue) =>
              debounceOptions(inputValue, "locations")
            }
            value={subscriptionPlaceValue}
            onChange={(newValue) => {
              handleSelect("subscriptionPlaceValue", newValue);
            }}
          />
        </div>
      </div>

      <div className="mb-2">
        <div className="form-group">
          <label
            htmlFor="os2display-poster--select-subscription-organizers"
            className="form-label"
          >
            {t("filters-organizer")}
          </label>
          <AsyncSelect
            id="subscription-search-place"
            isClearable
            isSearchable
            defaultOptions
            isMulti
            loadOptions={(inputValue) =>
              debounceOptions(inputValue, "organizations")
            }
            value={subscriptionOrganizerValue}
            onChange={(newValue) => {
              handleSelect("subscriptionOrganizerValue", newValue);
            }}
          />
        </div>
      </div>

      <div className="mb-2">
        <div className="form-group">
          <label
            htmlFor="os2display-poster--select-subscription-tags"
            className="form-label"
          >
            {t("filters-tag")}
          </label>
          <AsyncSelect
            id="subscription-search-tag"
            isClearable
            isSearchable
            defaultOptions
            isMulti
            loadOptions={(inputValue) => debounceOptions(inputValue, "tags")}
            value={subscriptionTagValue}
            onChange={(newValue) => {
              handleSelect("subscriptionTagValue", newValue);
            }}
          />
        </div>
      </div>

      <div>
        <div className="form-group">
          <div>
            <label
              htmlFor="os2display-poster--select-number"
              className="form-label"
            >
              {t("number-of-slides")}
              <select
                className="form-control"
                id="os2display-poster--select-number"
                value={subscriptionNumberValue}
                onChange={({ target }) =>
                  handleSelect("subscriptionNumberValue", target.value)
                }
              >
                {numberOptions?.map((i) => (
                  <option value={i + 1} key={`number-of-slides-option-${i}`}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

PosterSubscriptionCriteria.propTypes = {
  optionsEndpoint: PropTypes.string.isRequired,
  configuration: PropTypes.shape({
    subscriptionPlaceValue: PropTypes.arrayOf(
      PropTypes.shape({ label: PropTypes.string, value: PropTypes.number })
    ),
    subscriptionOrganizerValue: PropTypes.arrayOf(
      PropTypes.shape({ label: PropTypes.string, value: PropTypes.number })
    ),
    subscriptionTagValue: PropTypes.arrayOf(
      PropTypes.shape({ label: PropTypes.string, value: PropTypes.number })
    ),
    subscriptionNumberValue: PropTypes.number,
  }).isRequired,
  handleSelect: PropTypes.func.isRequired,
};

export default PosterSubscriptionCriteria;
