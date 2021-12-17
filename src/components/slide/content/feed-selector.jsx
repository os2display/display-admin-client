import { React, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { useGetV1FeedSourcesQuery } from "../../../redux/api/api.generated";
import { Spinner } from "react-bootstrap";
import { MultiSelect } from "react-multi-select-component";

/**
 * Feed selector.
 *
 * @param {object} props - The props.
 */
function FeedSelector({name, onChange, configuration}) {
  const { t } = useTranslation("common");
  const [newConfig, setNewConfig] = useState({});

  const {
    data: feedSourcesData,
    error: feedSourcesLoadingError,
    isLoading: feedSourcesLoading,
  } = useGetV1FeedSourcesQuery();

  const feedSourceOptions = (feedSources) => {
    return feedSources.map((source) => {
      return { label: source['title'], value: source['@id'], key: source['@id'] };
    })
  }

  useEffect(() => {
    setNewConfig(configuration);
  }, ['configuration'])

  return (
    <>
      {feedSourcesLoadingError &&
        <div>Error</div>
      }
      {feedSourcesLoading && <Spinner animation="border" />}

      <MultiSelect
        options={feedSourceOptions(feedSourcesData)}
        value={newConfig.feedSource}
        name="feedSource"
        disableSearch
        labelledBy="Select"
        overrideStrings={{
          allItemsAreSelected: t("feed.feed-source.all-selected"),
          clearSelected: t("feed.feed-source.clear-selection"),
          selectAll: t("feed.feed-source.selected-all"),
          selectSomeItems: t("feed.feed-source.select-some-options"),
        }}
        onChange={(values) => console.log('onChange', values)}
      />

      {feedSourcesData && feedSourcesData.map((source) => source.title)}
    </>
  );
}

FeedSelector.defaultProps = {};

FeedSelector.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  configuration: PropTypes.shape({
    feedSource: PropTypes.string,
  }),
};

export default FeedSelector;
