import React, { Component } from "react";
// import "./Trends.css";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import MDBox from "components/MDBox";


am4core.useTheme(am4themes_animated);

class Chart extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    let trendData = this.props.trendData.data;
    let parameters = this.props.parameters;
    let chart = am4core.create("chartdiv", am4charts.XYChart);

    // Increase contrast by taking evey second color
    chart.colors.step = 2;

    // Add data
    chart.data = generateChartData();

    // Create axes
    var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.minGridDistance = 100;

    // Create series
    function createAxisAndSeries(field, name, opposite, bullet) {
      var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      if (chart.yAxes.indexOf(valueAxis) != 0) {
        valueAxis.syncWithAxis = chart.yAxes.getIndex(0);
      }

      var series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.valueY = field;
      series.dataFields.dateX = "date";
      series.strokeWidth = 2;
      series.yAxis = valueAxis;
      series.name = name;
      series.tooltipText = "{name}: [bold]{valueY}[/]";
      series.tensionX = 0.8;
      series.showOnInit = true;
      valueAxis.renderer.line.strokeOpacity = 1;
      valueAxis.renderer.line.strokeWidth = 2;
      valueAxis.renderer.line.stroke = series.stroke;
      valueAxis.renderer.labels.template.fill = series.stroke;
      valueAxis.renderer.opposite = opposite;
    }

    parameters.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
    for (var i = 0; i < parameters.length; i++) {
      if (i === 0) {
        createAxisAndSeries(parameters[i].name, parameters[i].name, false, "circle");
      } else {
        createAxisAndSeries(parameters[i].name, parameters[i].name, true, "circle");
      }
    }
    // Add legend
    chart.legend = new am4charts.Legend();

    // Add cursor
    chart.cursor = new am4charts.XYCursor();

    // generate some random data, quite different range
    function generateChartData() {
      var chartData = trendData;
      for (var i = 0; i < trendData.length; i++) {
        chartData[i].date = new Date(trendData[i].date);
      }
      return chartData;
    }
  }

  componentWillUnmount = () => {
    if (this.chart) {
      this.chart.dispose();
    }
  };

  render = () => {
    return (
      <>
        <MDBox
          variant="gradient"
          // bgColor="dark"
          borderRadius="lg"
          coloredShadow="light"
          mx={2}
          mt={2}
          p={2}
          mb={1}
          textAlign="center"
          id="chartdiv"
          style={{ width: "72vw", height: "500px" }}
        ></MDBox>
      </>
    );
  };
}
export default Chart;
