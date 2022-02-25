import { React, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Button } from "react-bootstrap";
import Select from "../../util/forms/select";
import AsyncSelect from 'react-select/async';

function PosterSelector({ feedSource, getValueFromConfiguration, configurationChange }) {
  const { t } = useTranslation("common");
  const apiToken = localStorage.getItem("api-token");

  const [singleSearch, setSingleSearch] = useState("");
  const [singleSearchType, setSingleSearchType] = useState("title");
  const [singleSearchTypeValue, setSingleSearchTypeValue] = useState("");
  const [singleSearchEvents, setSingleSearchEvents] = useState([]);
  const [singleSelectedEvent, setSingleSelectedEvent] = useState(null);
  const [singleSelectedOccurrence, setSingleSelectedOccurrence] = useState(null);

  const posterType = getValueFromConfiguration("posterType");

  useEffect(() => {
    const url = feedSource.admin[0].endpointEntity;
    const eventId = getValueFromConfiguration("singleSelectedEvent");
    const occurrenceId = getValueFromConfiguration("singleSelectedOccurrence");

    fetch(`${url}?path=${eventId}`, {
      headers: {
        authorization: `Bearer ${apiToken ?? ""}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setSingleSelectedEvent(data);
      })
      .catch(() => {
        // TODO: Display error.
      });

    fetch(`${url}?path=${occurrenceId}`, {
      headers: {
        authorization: `Bearer ${apiToken ?? ""}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setSingleSelectedOccurrence(data);
      })
      .catch(() => {
        // TODO: Display error.
      });
  }, []);

  useEffect(() => {
    if (singleSelectedEvent) {
      configurationChange({target: {id: 'singleSelectedEvent', value: singleSelectedEvent['@id']}});
    }
  }, [singleSelectedEvent]);

  useEffect(() => {
    if (singleSelectedOccurrence) {
      configurationChange({target: {id: 'singleSelectedOccurrence', value: singleSelectedOccurrence['@id']}});
    }
  }, [singleSelectedOccurrence]);

  const singleSearchFetch = () => {
    const url = feedSource.admin[0].endpointSearch;
    let query = `?type=events`;

    const singleSearchTypeValueId = singleSearchTypeValue ? singleSearchTypeValue.value.split("/").pop() : null;

    switch (singleSearchType) {
      case 'title':
        query = `${query}&name=${singleSearch}`;
        break;
      case 'tags':
        query = `${query}&tag=${singleSearchTypeValueId}`;
        break;
      case 'organizers':
        query = `${query}&organizer=${singleSearchTypeValueId}`;
        break;
      case 'places':
        query = `${query}&place=${singleSearchTypeValueId}`;
        break;
    }

    // TODO: Get this endpoint in a different way.
    fetch(`${url}${query}`, {
      headers: {
        authorization: `Bearer ${apiToken ?? ""}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setSingleSearchEvents(data);
      })
      .catch(() => {
        // @TODO: Handle error.
      });
  }

  const singleSearchTypeOptions = [
    {
      key: 'singleSearchTypeOptions1',
      value: 'title',
      title: t('poster-selector.single-search-type-title'),
    },
    {
      key: 'singleSearchTypeOptions2',
      value: 'url',
      title: t('poster-selector.single-search-type-url'),
    },
    {
      key: 'singleSearchTypeOptions3',
      value: 'organizers',
      title: t('poster-selector.single-search-type-organizer'),
    },
    {
      key: 'singleSearchTypeOptions4',
      value: 'places',
      title: t('poster-selector.single-search-type-place'),
    },
    {
      key: 'singleSearchTypeOptions5',
      value: 'tags',
      title: t('poster-selector.single-search-type-tag'),
    },
  ];

  const loadOptions = (inputValue, callback) => {
    const url = feedSource.admin[0].endpointSearch;

    let query = `?type=${singleSearchType}&display=options`;

    if (inputValue) {
      query = `${query}&name=${inputValue}`;
    }

    // TODO: Get this endpoint in a different way.
    fetch(`${url}${query}`, {
      headers: {
        authorization: `Bearer ${apiToken ?? ""}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        callback(data);
      })
      .catch(() => {
        callback([]);
        // TODO: Display error.
      });
  };

  return <>
    {!posterType && (
      <>
        <Button onClick={() => configurationChange({
          target: {
            id: "posterType",
            value: "single"
          }
        })}>{t('feed-selector.poster-feed-type-single')}</Button>
        <Button onClick={() => configurationChange({
          target: {
            id: "posterType",
            value: "subscription"
          }
        })}>{t('feed-selector.poster-feed-type-subscription')}</Button>
      </>
    )}
    {posterType && (
      <>
        PosterType: {posterType}

        {posterType === "single" && (
          <>
            {singleSelectedEvent && singleSelectedOccurrence && (
              <>
                <div>Valgt begivenhed: {singleSelectedEvent.name} ({singleSelectedEvent?.organizer?.name})</div>
                <div>Valgt forekomst: {singleSelectedOccurrence.startDate} - Pris: { singleSelectedOccurrence.ticketPriceRange }</div>

                <Button onClick={() => {setSingleSelectedEvent(null); setSingleSelectedOccurrence(null);}}>Remove</Button>
              </>
            )}

            {(!singleSelectedEvent || !singleSelectedOccurrence) && (
              <>
                <Select value={singleSearchType} onChange={({ target }) => setSingleSearchType(target.value)} label={t('poster-selector.single-search-type')} options={singleSearchTypeOptions} name="poster-search-type" allowNull={false} />

                {(singleSearchType === 'title' || singleSearchType === 'url') && (
                  <input name="poster-search" value={singleSearch} onChange={({ target }) => setSingleSearch(target.value)} />
                )}
                {(singleSearchType === 'tags' || singleSearchType === 'places' || singleSearchType === 'organizers') && (
                  <AsyncSelect
                    isClearable
                    isSearchable
                    defaultOptions
                    loadOptions={loadOptions}
                    defaultInputValue={singleSearchTypeValue}
                    onChange={(newValue) => {setSingleSearchTypeValue(newValue)} } />
                )}
                <Button onClick={singleSearchFetch}>{t('feed-selector.poster-single-search')}</Button>

                {!singleSelectedEvent && singleSearchEvents?.length > 0 && (
                  <div>
                    <table className="table table-hover text-left">
                      <thead>
                      <tr>
                        <th scope="col">Billede</th>
                        <th scope="col">Begivenhed</th>
                        <th scope="col">Dato</th>
                      </tr>
                      </thead>
                      <tbody>
                      {singleSearchEvents.map((searchEvent) => (
                        <tr style={{cursor: "pointer"}} key={searchEvent['@id']} onClick={() => setSingleSelectedEvent(searchEvent)}>
                          <td>
                            {searchEvent?.images?.small && (
                              <img src={searchEvent?.images?.small} alt={searchEvent?.name} style={{maxWidth: "80px"}} />
                            )}
                          </td>
                          <td><strong>{searchEvent.name}</strong><br/>{ searchEvent.organizer.name }
                          </td>
                          <td>
                            {searchEvent?.occurrences?.length > 0 && searchEvent?.occurrences[0]?.startDate}
                            {searchEvent?.occurrences?.length > 1 && <span>, ...</span>}
                          </td>
                        </tr>
                      ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {singleSelectedEvent !== null && (
                  <div>
                    {!singleSelectedOccurrence && (
                      <>
                        <h3>Vælg en forekomst:</h3>
                        <table className="table table-hover text-left">
                          <thead>
                          <tr>
                            <th scope="col">Dato</th>
                            <th scope="col">Pris</th>
                          </tr>
                          </thead>
                          <tbody>
                          {singleSelectedEvent?.occurrences?.map((occurrence) => (
                            <tr style={{cursor: "pointer"}} onClick={() => setSingleSelectedOccurrence(occurrence)}>
                              <td>{ occurrence.startDate }</td>
                              <td>{ occurrence.ticketPriceRange }</td>
                            </tr>
                          ))}
                          </tbody>
                        </table>
                      </>
                    )}
                  </div>
                )}
              </>
            )}
          </>
        )}
        {posterType === "subscription" && (
          <>

          </>
        )}
      </>
    )}
  </>;
}

PosterSelector.propTypes = {
  getValueFromConfiguration: PropTypes.func.isRequired,
  configurationChange: PropTypes.func.isRequired,
  feedSource: PropTypes.shape({})
};

export default PosterSelector;
