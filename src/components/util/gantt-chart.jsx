import React, { useEffect } from "react";
import PropTypes from "prop-types";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import { useNavigate } from "react-router-dom";
import idFromUrl from "./helpers/id-from-url";

/**
 * A gantt chart.
 *
 * @param {object} props The props
 * @param {object} props.data The data to display.
 * @param {string} props.id The id of the chart
 * @param {string} props.component The component to redirect to on click
 * @returns {object} The gantt chart.
 */
function GanttChart({ id, data, component }) {
  const navigate = useNavigate();
  const chartId = `chart${id}`;

  useEffect(() => {
    // Create chart, match id with that in the returned html.
    const chart = am4core.create(chartId, am4charts.XYChart);
    chart.dateFormatter.inputDateFormat = "yyyy-MM-dd";
    chart.data = data;

    // Create vertical axis
    const categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    // Category refers to the category in the mapped data.
    categoryAxis.dataFields.category = "category";
    categoryAxis.dataFields.text = "title";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.inversed = true;

    // Create horizontal axis
    const dateAxis = chart.xAxes.push(new am4charts.DateAxis());

    // set max a year on the date axis
    const d = new Date();
    dateAxis.max = new Date(
      d.getFullYear() + 1,
      d.getMonth(),
      d.getDate()
    ).getTime();

    dateAxis.dateFormatter.dateFormat = "yyyy-MM-dd";

    dateAxis.baseInterval = { count: 30, timeUnit: "date" };
    dateAxis.strictMinMax = true;
    dateAxis.renderer.tooltipLocation = 0;

    // Create the "gantt boxes".
    const series = chart.series.push(new am4charts.ColumnSeries());

    /** @param {object} ev The click event */
    function redirect(ev) {
      if (ev.target.dataItem.dataContext.redirectPossible) {
        navigate(
          `/${component}/edit/${idFromUrl(ev.target.dataItem.dataContext.id)}`
        );
      }
    }

    // Redirect on click
    series.columns.template.events.on("hit", redirect);

    series.columns.template.width = am4core.percent(80);
    // Add a tooltip with the dates, as this can be difficult to read in the visualization.
    series.columns.template.tooltipText = "{title}: {openDateX} - {dateX}";
    series.dataFields.openDateX = "from";
    series.dataFields.dateX = "to";
    series.dataFields.categoryY = "category";

    series.columns.template.propertyFields.fill = "color";
    series.columns.template.propertyFields.stroke = "stroke";
    series.columns.template.propertyFields.focusable = "redirectPossible";
    series.columns.template.height = am4core.percent(50);
    series.columns.template.propertyFields.pixelHeight = "10";
    series.columns.template.strokeOpacity = 1;

    // Add labels
    const valueLabel = series.bullets.push(new am4charts.LabelBullet());
    valueLabel.label.fontSize = 20;

    chart.scrollbarX = new am4core.Scrollbar();

    return () => {
      chart.dispose();
    };
  }, [data]);

  return (
    <div className="charts">
      <div id={chartId} className="gantt-chart-chart" />
    </div>
  );
}

GanttChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      regions: PropTypes.arrayOf(PropTypes.string),
      title: PropTypes.string,
      id: PropTypes.string,
    })
  ).isRequired,
  id: PropTypes.string.isRequired,
  component: PropTypes.string.isRequired,
};

export default GanttChart;
