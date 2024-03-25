import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import GanttChart from "../util/gantt-chart";
import localStorageKeys from "../util/local-storage-keys";
import FormCheckbox from "../util/forms/form-checkbox";

/**
 * @param {object} props The props.
 * @param {object} props.slides The slides.
 * @returns {object} The gantt chart view of the playlist.
 */
function PlaylistGanttChart({ slides }) {
  const { t } = useTranslation("common", { keyPrefix: "playlist-gantt-chart" });
  const [dataForGanttChart, setDataForGantChart] = useState();
  const [showGantt, setShowGantt] = useState(false);

  /** Get show from local storage */
  useEffect(() => {
    const localStorageShow = localStorage.getItem(
      localStorageKeys.VIEW_GANT_PLAYLIST
    );
    setShowGantt(localStorageShow === "true");
  }, []);

  useEffect(() => {
    if (slides) {
      // As playlists default to being published, if they have no values for
      // from / to, I here create today (from), and a year from today (to).
      const today = new Date();

      const inAYear = new Date(
        today.getFullYear() + 1,
        today.getMonth(),
        today.getDate()
      );
      setDataForGantChart(
        slides.map((slide) => {
          return {
            category: slide["@id"],
            from: slide.published?.from || today,
            to: slide.published?.to || inAYear,
            id: slide["@id"],
            color: "lightblue",
            stroke: "black",
            title: slide.title,
          };
        })
      );
    }
  }, [slides]);

  /**
   * Changes the show value, and saves to localstorage
   *
   * @param {object} props Props.
   * @param {boolean} props.target The returned value from the checkbox.
   */
  const changeShowPlaylistGantt = ({ target }) => {
    const { value } = target;
    localStorage.setItem(localStorageKeys.VIEW_GANT_PLAYLIST, value);

    setShowGantt(value);
  };

  return (
    <>
      <FormCheckbox
        label={t("show-gantt")}
        formGroupClasses="mt-3"
        onChange={changeShowPlaylistGantt}
        value={showGantt}
        name="show-screen-gant"
      />
      {dataForGanttChart && showGantt && (
        <GanttChart
          id="slides-chart"
          data={dataForGanttChart}
          component="slide"
        />
      )}
    </>
  );
}

PlaylistGanttChart.propTypes = {
  slides: PropTypes.arrayOf(
    PropTypes.shape({ name: PropTypes.string, id: PropTypes.string })
  ).isRequired,
};
export default PlaylistGanttChart;
