import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import { useHistory } from "react-router-dom";
import idFromUrl from "../util/helpers/id-from-url";
import { api } from "../../redux/api/api.generated";

/**
 * A calendar view for lists.
 *
 * @param {object} props The props
 * @param {object} props.screen The screen to display.
 * @returns {object} The gantt chart.
 */
function Calendar({ screen }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [playlistsByRegion, setPlaylistsByRegion] = useState([]);

  const chartId = `chart${screen["@id"]}`;

  useEffect(() => {
    // Upload media already added to the slide.
    const promises = [];
    let playlistsByRegionCopy = [...playlistsByRegion];

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
      if (results.length > 0) {
        results.forEach((region, index) => {
          if (region.data && region.data["hydra:member"]) {
            // As playlists default to being published, if they have no values for
            // from / to, I here create today (from), and a year from today (to).
            const today = new Date();
            const year = today.getFullYear();
            const month = today.getMonth();
            const day = today.getDate();
            const inAYear = new Date(year + 1, month, day);

            // Map data so it fits amcharts
            const regionData = region.data["hydra:member"].map(
              ({ playlist }) => {
                return {
                  title: playlist.title,
                  category: playlist["@id"],
                  // url: `playlist/${idFromUrl(playlist["@id"])}`,
                  categoryTitle: `Region ${index + 1}:`,
                  from: playlist.published.from || today,
                  to: playlist.published.to || inAYear,
                  id: playlist["@id"],
                  color: "lightblue",
                  black: "#000",
                };
              }
            );

            playlistsByRegionCopy = [...playlistsByRegionCopy, ...regionData];
          }
        });

        setPlaylistsByRegion(playlistsByRegionCopy);
      }
    });
  }, []);

  useEffect(() => {
    // Create chart, match id with that in the returned html.
    const chart = am4core.create(chartId, am4charts.XYChart);
    chart.dateFormatter.inputDateFormat = "yyyy-MM-dd";
    chart.data = playlistsByRegion;

    // Create vertical axis
    const categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    // Category/categoryTitle refers to the category/categoryTitle in the mapped data.
    categoryAxis.dataFields.category = "category";
    categoryAxis.dataFields.text = "categoryTitle";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.inversed = true;

    // Create horizontal axis
    const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.dateFormatter.dateFormat = "yyyy-MM-dd";
    // dateAxis.renderer.minGridDistance = 70;
    dateAxis.baseInterval = { count: 30, timeUnit: "date" };
    dateAxis.strictMinMax = true;
    dateAxis.renderer.tooltipLocation = 0;

    // Create the "gantt boxes".
    const series1 = chart.series.push(new am4charts.ColumnSeries());

    /** @param {object} ev The click event */
    function redirect(ev) {
      history.push(
        `/playlist/edit/${idFromUrl(ev.target.dataItem.dataContext.id)}`
      );
    }

    // Redirect on click
    series1.columns.template.events.on("hit", redirect);

    series1.columns.template.width = am4core.percent(80);
    // Add a tooltip with the dates, as this can be difficult to read in the visualization.
    series1.columns.template.tooltipText = "{title}: {openDateX} - {dateX}";
    series1.dataFields.openDateX = "from";
    series1.dataFields.dateX = "to";
    series1.dataFields.categoryY = "category";

    series1.columns.template.propertyFields.fill = "color";
    series1.columns.template.propertyFields.stroke = "black";
    series1.columns.template.strokeOpacity = 1;
    series1.columns.template.cursorOverStyle = am4core.MouseCursorStyle.pointer;

    // Add labels
    const valueLabel = series1.bullets.push(new am4charts.LabelBullet());
    valueLabel.label.text = "{title}";
    valueLabel.label.fontSize = 20;

    chart.scrollbarX = new am4core.Scrollbar();

    return () => {
      chart.dispose();
    };
  }, [playlistsByRegion]);

  return (
    <div className="charts">
      <div id={chartId} className="calendar-chart" />
    </div>
  );
}

Calendar.propTypes = {
  screen: PropTypes.objectOf(
    PropTypes.shape({
      regions: PropTypes.arrayOf(PropTypes.string),
      title: PropTypes.string,
      id: PropTypes.number,
    })
  ).isRequired,
};

export default Calendar;
