import React, { useEffect } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import { Am4ThemesColorTheme } from "./calendarColors";

function Calendar({ data, endDateForXAxis, id }) {
  const chartId = `chart${id}`;
  useEffect(() => {
    am4core.useTheme(Am4ThemesColorTheme);
    const colorSet = new am4core.ColorSet();
    // Add theme colors
    data = data.map(function (item, index) {
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

    var chart = am4core.create(chartId, am4charts.XYChart);

    chart.dateFormatter.inputDateFormat = "yyyy-MM-dd";

    chart.data = data;
    var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "name";
    // categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.inversed = true;

    var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.dateFormatter.dateFormat = "yyyy-MM-dd";
    dateAxis.renderer.minGridDistance = 70;
    dateAxis.baseInterval = { count: 30, timeUnit: "date" };

    dateAxis.max = endDateForXAxis.getTime();
    dateAxis.strictMinMax = true;
    dateAxis.renderer.tooltipLocation = 0;

    var series1 = chart.series.push(new am4charts.ColumnSeries());
    series1.columns.template.width = am4core.percent(80);
    series1.columns.template.tooltipText = "{name}: {openDateX} - {dateX}";

    series1.dataFields.openDateX = "from";
    series1.dataFields.dateX = "to";
    series1.dataFields.categoryY = "name";
    series1.columns.template.propertyFields.fill = "color"; // get color from data
    series1.columns.template.propertyFields.stroke = "black";
    series1.columns.template.strokeOpacity = 1;

    chart.scrollbarX = new am4core.Scrollbar();
    return () => {
      chart.dispose();
    };
  }, [data]);

  return <div id={chartId} className="calendar-chart" />;
}

export default Calendar;
