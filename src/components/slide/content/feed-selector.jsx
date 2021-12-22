import { React, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { api, useGetV1FeedSourcesQuery } from "../../../redux/api/api.generated";
import { Spinner } from "react-bootstrap";
import { MultiSelect } from "react-multi-select-component";
import MultiSelectComponent from "../../util/forms/multiselect-dropdown/multi-dropdown";
import idFromUrl from "../../util/helpers/id-from-url";
import { useDispatch } from "react-redux";
import ContentForm from "./content-form";
import set from "lodash.set";

/**
 * Feed selector.
 *
 * @param {object} props - The props.
 */
function FeedSelector({ value, onChange }) {
  const dispatch = useDispatch();
  const { t } = useTranslation("common");
  const [feedSourceOptions, setFeedSourceOptions] = useState([]);
  const [feedSourceData, setFeedSourceData] = useState();

  // @TODO: Filter by dataType
  const {
    data: feedSourcesData,
    error: feedSourcesLoadingError,
    isLoading: feedSourcesLoading
  } = useGetV1FeedSourcesQuery({ page: 1 });

  useEffect(() => {
    if (feedSourcesData) {
      setFeedSourceOptions(feedSourcesData["hydra:member"].map((source) => {
        return { title: source["title"], value: source["@id"], key: source["@id"] };
      }));
    }
  }, [feedSourcesData]);

  const getSelected = (value) => {
    return feedSourceOptions.filter((option) => option.value === value);
  };

  useEffect(() => {
    if (value?.feedSource) {
      dispatch(
        api.endpoints.getV1FeedSourcesById.initiate({ id: idFromUrl(value.feedSource) })
      ).then((response) => {
        setFeedSourceData(response.data);
      }).catch((err) => console.error(err));
    }
  }, [value.feedSource]);

  const feedSourceChange = ({target}) => {
    const feedSource = target.value[0].value ?? null;
    const newValue = {...value, feedSource };
    onChange(newValue);
  }

  const configurationChange = ({target}) => {
    const configuration = {...value.configuration};
    set(configuration, target.id, target.value);
    const newValue = {...value, configuration};
    onChange(newValue);
  }

  return (
    <>
      {feedSourcesLoadingError &&
        <div>Error</div>
      }
      {feedSourcesLoading && <Spinner animation="border" />}

      {feedSourcesData && feedSourceOptions && (
        <MultiSelectComponent
          options={feedSourceOptions}
          selected={getSelected(value?.feedSource)}
          name="feedSource"
          labelledBy="Select"
          singleSelect
          overrideStrings={{
            allItemsAreSelected: t("feed.feed-source.all-selected"),
            clearSelected: t("feed.feed-source.clear-selection"),
            selectAll: t("feed.feed-source.selected-all"),
            selectSomeItems: t("feed.feed-source.select-some-options")
          }}
          handleSelection={feedSourceChange}
          filterCallback={() => {
          }}
          label={t("feed-selector.select-feed-source")}
        />
      )}

      {feedSourceData?.admin && feedSourceData.admin.map((element) => (
        <ContentForm
          key={element.key}
          data={element}
          onChange={configurationChange}
          name={element.name}
          formStateObject={value?.configuration ?? {}}
        />
      ))}
    </>
  );
}

FeedSelector.defaultProps = {
  value: {
    feedSource: ""
  }
};

FeedSelector.propTypes = {
  value: PropTypes.shape({
    feedSource: PropTypes.string
  }),
  onChange: PropTypes.func.isRequired,
  dataType: PropTypes.string
};

export default FeedSelector;
