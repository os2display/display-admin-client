import React, { useEffect, useState } from "react";
import RRule from "rrule";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import Calendar from "./calendar";
import idFromUrl from "../util/helpers/id-from-url";
import { api } from "../../redux/api/api.generated";

/**
 * @param {object} props The props.
 * @param {object} props.item The screen.
 * @returns {object} The calendar list.
 */
function ScreenCalendarCell({ item: screen }) {
  const [dataForCalendar, setDataForCalendar] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    if (screen) {
      // Upload media already added to the slide.
      const promises = [];

      // Get the playlists per region.
      // eslint-disable-next-line react/prop-types
      screen.regions.forEach((region) => {
        promises.push(
          dispatch(
            api.endpoints.getV1ScreensByIdRegionsAndRegionIdPlaylists.initiate({
              id: idFromUrl(screen["@id"]),
              regionId: idFromUrl(region, 1),
            })
          )
        );
      });

      Promise.all(promises).then((results) => {
        let playlistsToReturn = [];
        if (results.length > 0) {
          results.forEach((region, index) => {
            if (region.data && region.data["hydra:member"]) {
              const playlistData = [];
              // As playlists default to being published, if they have no values for
              // from / to, I here create today (from), and a year from today (to).
              const today = new Date();
              const year = today.getFullYear();
              const month = today.getMonth();
              const day = today.getDate();
              const inAYear = new Date(year + 1, month, day);

              region.data["hydra:member"].forEach(({ playlist }) => {
                // If the playlist has scheduling, a playlist per scheduling will
                // be added to the calendar data.
                if (playlist.schedules?.length > 0) {
                  playlist.schedules.forEach(({ rrule, duration }) => {
                    // Get rrule dates in an array
                    const occurrences = RRule.fromString(
                      rrule.replace("\\n", "\n")
                    ).all();

                    // Map published and add to data structure
                    occurrences.forEach((occurrence) => {
                      const startDateTime = new Date(occurrence);

                      // End date is start date plus duration, as rrule
                      const endDateTime = new Date(occurrence).setSeconds(
                        startDateTime.getSeconds() + duration
                      );

                      const playlistWithPublished = { ...playlist };
                      playlistWithPublished.published = {};
                      playlistWithPublished.published.from = startDateTime;
                      playlistWithPublished.published.to = endDateTime;
                      playlistData.push(playlistWithPublished);
                    });
                  });
                } else {
                  // If there is no schedule, we just add the playlist and go by published
                  playlistData.push(playlist);
                }
              });

              // Map data so it fits amcharts
              const regionData = playlistData.map((playlist) => {
                return {
                  title: playlist.title,
                  category: playlist["@id"],
                  categoryTitle: `Region ${index + 1}:`,
                  from: playlist.published?.from || today,
                  to: playlist.published?.to || inAYear,
                  id: playlist["@id"],
                  color: "lightblue",
                  black: "#000",
                };
              });

              playlistsToReturn = [...playlistsToReturn, ...regionData];
            }
          });
        }
        return setDataForCalendar(playlistsToReturn);
      });
    }
  }, []);

  return (
    <>
      {dataForCalendar && (
        <tr key={screen["@id"]}>
          <td colSpan="100%">
            <h2 className="h4">{screen.title}</h2>
            <Calendar id={screen["@id"]} data={dataForCalendar} />
          </td>
        </tr>
      )}
    </>
  );
}

ScreenCalendarCell.defaultProps = {
  item: {},
};

ScreenCalendarCell.propTypes = {
  item: PropTypes.shape({
    "@id": PropTypes.string,
    title: PropTypes.string,
  }),
};
export default ScreenCalendarCell;
