import React, { useEffect } from "react";
import PropTypes from "prop-types";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import { useNavigate } from "react-router-dom";
import idFromUrl from "../util/helpers/id-from-url";

/**
 * A calendar view for lists.
 *
 * @param {object} props The props
 * @param {object} props.data The data to display.
 * @param {string} props.id The id of the chart
 * @returns {object} The gantt chart.
 */
function Calendar({ id, data }) {
  const navigate = useNavigate();
  const chartId = `chart${id}`;

  useEffect(() => {
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
    const series1 = chart.series.push(new am4charts.ColumnSeries());

    /** @param {object} ev The click event */
    function redirect(ev) {
      navigate(
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
    series1.columns.template.height = am4core.percent(50);
    series1.columns.template.propertyFields.pixelHeight = "10";
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
  }, [data]);

  return (
    <div className="charts">
      <div id={chartId} className="calendar-chart" />
    </div>
  );
}

Calendar.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      regions: PropTypes.arrayOf(PropTypes.string),
      title: PropTypes.string,
      id: PropTypes.string,
    })
  ).isRequired,
  id: PropTypes.string.isRequired,
};

export default Calendar;
