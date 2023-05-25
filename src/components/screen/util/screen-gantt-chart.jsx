import React, { useEffect, useState, useContext } from "react";
import { RRule } from "rrule";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import GanttChart from "../../util/gantt-chart";
import localStorageKeys from "../../util/local-storage-keys";
import FormCheckbox from "../../util/forms/form-checkbox";
import UserContext from "../../../context/user-context";

/**
 * @param {object} props The props.
 * @param {object} props.playlists The playlists to display
 * @param {string} props.id The playlists to display
 * @returns {object} The gantt chart view of the screen.
 */
function ScreenGanttChart({ playlists, id }) {
  const { t } = useTranslation("common", { keyPrefix: "screen-gantt-chart" });
  const context = useContext(UserContext);
  const [dataForGanttChart, setdataForGanttChart] = useState();
  const [showGantt, setShowGantt] = useState(false);

  /** Get show from local storage */
  useEffect(() => {
    const localStorageShow = localStorage.getItem(
      localStorageKeys.VIEW_GANT_SCREEN
    );
    setShowGantt(localStorageShow === "true");
  }, []);

  useEffect(() => {
    const playlistData = [];
    // As playlists default to being published, if they have no values for
    // from / to, I here create today (from), and a year from today (to).
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const day = today.getDate();
    const inAYear = new Date(year + 1, month, day);

    playlists.forEach((playlist) => {
      const { tenants } = playlist;
      const redirectPossible =
        tenants?.length === 0 ||
        !tenants.find(
          (tenant) => tenant.tenantKey === context.selectedTenant.get.tenantKey
        );

      // If the playlist has scheduling, a playlist per scheduling will
      // be added to the gantt chart data.
      if (playlist.schedules?.length > 0) {
        playlist.schedules.forEach(({ rrule, duration }) => {
          // Get rrule dates in an array
          // From today, to in a year - which is also the upper boundary of the gantt chart
          const occurrences = RRule.fromString(
            rrule.replace("\\n", "\n")
          ).between(new Date(), inAYear);

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
            playlistData.push({ ...playlistWithPublished, redirectPossible });
          });
        });
      } else {
        // If there is no schedule, we just add the playlist and go by published
        playlistData.push({ ...playlist, redirectPossible });
      }
    });

    // Map data so it fits amcharts
    const regionData = playlistData.map((playlist) => {
      return {
        category: playlist["@id"],
        from: playlist.published?.from || today,
        to: playlist.published?.to || inAYear,
        id: playlist["@id"],
        title: playlist.title,
        color: playlist.redirectPossible ? "lightblue" : "grey",
        stroke: playlist.redirectPossible ? "black" : "grey",
        redirectPossible: playlist.redirectPossible,
      };
    });

    return setdataForGanttChart(regionData);
  }, [playlists]);

  /**
   * Changes the show value, and saves to localstorage
   *
   * @param {object} props Props.
   * @param {boolean} props.target The returned value from the checkbox.
   */
  const changeShowScreenGantt = ({ target }) => {
    const { value } = target;
    localStorage.setItem(localStorageKeys.VIEW_GANT_SCREEN, value);

    setShowGantt(value);
  };

  return (
    <>
      <FormCheckbox
        formGroupClasses="mt-3"
        label={t("show-gantt")}
        onChange={changeShowScreenGantt}
        value={showGantt}
        name="show-screen-gant"
      />
      {dataForGanttChart && showGantt && (
        <GanttChart
          id={`screen-chart-${id}`}
          data={dataForGanttChart}
          component="playlist"
        />
      )}
    </>
  );
}

ScreenGanttChart.propTypes = {
  playlists: PropTypes.arrayOf(
    PropTypes.shape({ name: PropTypes.string, id: PropTypes.number })
  ).isRequired,
  id: PropTypes.string.isRequired,
};
export default ScreenGanttChart;
