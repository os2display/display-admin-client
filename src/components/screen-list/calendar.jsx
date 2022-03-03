import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import idFromUrl from "../util/helpers/id-from-url";
import { api } from "../../redux/api/api.generated";
import Am4ThemesColorTheme from "./calendar-colors";

/**
 * A calendar view for lists.
 *
 * @param {object} props The props
 * @param {object} props.screen The screen to display.
 * @returns {object} The gantt chart.
 */
function Calendar({ screen }) {
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
            // Map data so it fits amcharts
            const regionData = region.data["hydra:member"].map(
              ({ playlist }) => {
                return {
                  title: playlist.title,
                  category: playlist["@id"],
                  categoryTitle: `Region ${index + 1}:`,
                  from: playlist.published.from,
                  to: playlist.published.to,
                  id: playlist["@id"],
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
    am4core.useTheme(Am4ThemesColorTheme);
    const colorSet = new am4core.ColorSet();
    // Add theme colors
    const data = playlistsByRegion.map((item, index) => {
      // There are 10 colors in the theme, so
      // if the index exceeds 9, the last int in
      // the number is used
      const number = index > 9 ? index % 10 : index;

      return {
        ...item,
        color: colorSet.getIndex(number),
        black: "#000",
      };
    });

    // Create chart, match id with that in the returned html.
    const chart = am4core.create(chartId, am4charts.XYChart);
    chart.dateFormatter.inputDateFormat = "yyyy-MM-dd";
    chart.data = data;

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
    series1.columns.template.width = am4core.percent(80);
    // Add a tooltip with the dates, as this can be difficult to read in the visualization.
    series1.columns.template.tooltipText = "{title}: {openDateX} - {dateX}";
    series1.dataFields.openDateX = "from";
    series1.dataFields.dateX = "to";
    series1.dataFields.categoryY = "category";
    // get color from color data (calendar-colors.jsx)
    series1.columns.template.propertyFields.fill = "color";
    series1.columns.template.propertyFields.stroke = "black";
    series1.columns.template.strokeOpacity = 1;

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
