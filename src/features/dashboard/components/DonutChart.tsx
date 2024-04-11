import React from "react";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";

interface DonutChartProps {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string[];
    }[];
  };
}
const DoughnutChart = ({ data }: DonutChartProps) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
    },
    elements: {
      arc: {
        borderWidth: 1, // Set the border width of the arcs to 0
      },
    },
    cutout: "75%", // Adjust the cutout size to control the ring size
  };

  return <Doughnut data={data} options={options} />;
};

export default DoughnutChart;