import { React, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { MultiSelect } from "react-multi-select-component";
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
    subscriptionNumberValue = 5,
  },
  handleSelect,
}) {
  const { t } = useTranslation("common", { keyPrefix: "poster-selector-v2" });

  // The user can choose between 1-10 entries to display.
  const numberOptions = Array.from(Array(10).keys());

  const [locations, setLocations] = useState([]);
  const [tags, setTags] = useState([]);
  const [organizations, setOrganizations] = useState([]);

  useEffect(() => {
    loadDropdownOptionsPromise(optionsEndpoint, getHeaders(), "", "tags").then(
      (r) => setTags(r)
    );

    loadDropdownOptionsPromise(
      optionsEndpoint,
      getHeaders(),
      "",
      "locations"
    ).then((r) => setLocations(r));

    loadDropdownOptionsPromise(
      optionsEndpoint,
      getHeaders(),
      "",
      "organizations"
    ).then((r) => setOrganizations(r));
  }, []);

  return (
    <>
      <h5 className="mt-3">{t("filters")}</h5>
      <div className="mb-2">
        <div className="form-group">
          <label htmlFor="select-subscription-places" className="form-label">
            {t("filters-place")}
          </label>
          <MultiSelect
            isCreatable={false}
            id="subscription-search-place"
            label={t("subscription-search-select")}
            name="subscriptionPlaceValue"
            options={locations}
            hasSelectAll={false}
            onChange={(newValue) =>
              handleSelect("subscriptionPlaceValue", newValue)
            }
            value={subscriptionPlaceValue ?? []}
            placeholder={t("subscription-search-placeholder")}
            labelledBy={t("filters-place")}
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
          <MultiSelect
            isCreatable={false}
            id="subscription-search-organizer"
            label={t("subscription-search-select")}
            name="subscriptionOrganizerValue"
            options={organizations}
            hasSelectAll={false}
            onChange={(newValue) =>
              handleSelect("subscriptionOrganizerValue", newValue)
            }
            value={subscriptionOrganizerValue ?? []}
            placeholder={t("subscription-search-placeholder")}
            labelledBy={t("filters-organizer")}
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
          <MultiSelect
            isCreatable={false}
            id="subscription-search-tags"
            label={t("subscription-search-select")}
            name="subscriptionTagValue"
            options={tags}
            hasSelectAll={false}
            onChange={(newValue) =>
              handleSelect("subscriptionTagValue", newValue)
            }
            value={subscriptionTagValue ?? []}
            placeholder={t("subscription-search-placeholder")}
            labelledBy={t("filters-tag")}
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
