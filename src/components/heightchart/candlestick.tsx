"use client";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import { useEffect, useRef, useState } from "react";
export default function Candlestick({ data }: { data: any | [[]] }) {
  const chartRef: any = useRef(null);
  const [chartHeight, setChartHeight] = useState(window.innerHeight - 240); // Default height

  useEffect(() => {
    const updateChartHeight = () => { 
      setChartHeight(window.innerHeight - 240);
    };
    // Update chart height when window is resized
    window.addEventListener("resize", updateChartHeight);
    // Clean up event listener
    return () => window.removeEventListener("resize", updateChartHeight);
  }, []);

  const options = {
    tooltip: {
      backgroundColor: "rgba(255, 255, 255, 0.85)", // Background color of the tooltip
      borderColor: "#ccc", // Border color of the tooltip
      borderRadius: 5, // Border radius of the tooltip
      style: {
        color: "#333", // Text color of the tooltip
        fontSize: "12px", // Font size of the tooltip text
      },
      shadow: true, // Whether to display a shadow around the tooltip
      // snap: 10, // Snap the tooltip to a certain distance from the mouse cursor
      // Other tooltip options...
    },
    credits: {
      enabled: false, // Disable the credits
    },
    xAxis: {
      crosshair: true, // Enable crosshair on the X-axis
      // opposite: true,
      tickPosition: "inside", // Position of tick marks (inside/outside)
      lineColor: "#f6465d", // Color of the axis line
      lineWidth: 2, // Width of the axis line
      gridLineWidth: 0.1, // Width of grid lines
      gridLineColor: "#efefef55", // Color of grid lines
      showFirstLabel: true, // Hide the first label on the xAxis
      showLastLabel: true, // Hide the last label on the xAxis
      labels: {
        enabled: true, // Enable or disable labels
        style: {
          color: "#eaecef", // Label text color
          fontSize: "10px", // Label font size
          fontWeight: "normal", // Label font weight
          fontStyle: "italic", // Label font style
        },
      },
    },
    yAxis: {
      tickPosition: "outside", // Position of tick marks (inside/outside)
      crosshair: true, // Enable crosshair on the Y-axis
      opposite: true,
      lineColor: "#f6465d", // Color of the axis line
      lineWidth: 2, // Width of the axis line
      lineDashStyle: "Dash", // Dash style for the axis line (Solid/Dot/Dash)
      gridLineWidth: 0.3, // Width of grid lines
      lineCap: "round",
      showFirstLabel: true, // Hide the first label on the yAxis
      showLastLabel: true, // Hide the last label on the yAxis
      color: "#eaecef",
      labels: {
        align: "left", // Alignment of labels on the yAxis
        // step: 1, // Display every nth label (e.g., 2 for every other label)
        enabled: true, // Enable or disable labels
        style: {
          color: "#eaecef", // Label text color
          fontSize: "10px", // Label font size
          fontWeight: "normal", // Label font weight
          fontStyle: "italic", // Label font style
        },
      },
    },

    chart: {
      type: "candlestick",
      // height: (9 / 16 * 100) + "%", // 16:9 ratio
      height: chartHeight, // 16:9 ratio
      backgroundColor: "#26272b00",
    },

    navigator: {
      enabled: false, // Set to false to hide the navigator
    },

    scrollbar: {
      enabled: false, // Set to false to hide the scrollbar
    },

    plotOptions: {
      candlestick: {
        color: "#f6465d", // Down color (red)
        upColor: "#0ecb81", // Up color (green)
        lineWidth: 1.2, // Candlestick line width
        lineColor: "#f6465d",
        upLineColor: "#0ecb81", // Line color for 'up' candlesticks
        borderColor: "rgba(22,255,255,0.5)", // Border color
        borderOpacity: 0.5, // Border opacity
        pointPadding: 0.8, // Adjust the distance between candles
        groupPadding: 0.9, // Adjust the distance between groups of candles
        shadow: true, // Whether to display shadows
        shadowColor: "rgba(0, 0, 0, 0.3)", // Shadow color
        shadowWidth: 3, // Shadow width
        shadowOffsetX: 2, // Shadow offset in the X direction
        shadowOffsetY: 2, // Shadow offset in the Y direction
        borderRadius: 5, // Border radius for candles
        lineColorLow: "blue", // Color for low lines
        lineColorHigh: "orange", // Color for high lines
      },
    },

    series: [
      {
        marker: {
          enabled: true,
          crosshair: true,
        },
        type: "candlestick",
        // type: "spline",
        name: "Trading Gold",
        data: data,
      },
    ],
  };
  return (
    <div
      ref={chartRef}
      style={{ height: "calc(100vh - 240px)", position: "relative" }}
    >
      <HighchartsReact
        highcharts={Highcharts}
        // className="h-screen w-full"
        constructorType={"stockChart"}
        options={options}
      />
    </div>
  );
}
