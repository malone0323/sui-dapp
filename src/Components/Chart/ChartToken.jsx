import React, { Fragment } from 'react'
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { faker } from '@faker-js/faker';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const ChartToken = ({ dataChart }) => {
  // console.log("dataChart 123 ", dataChart);
  const data = {
    labels: dataChart&&dataChart.map((item)=>item._id), // created_at X-axis labels (manual dates)
    datasets: [
      {
        label: 'Crypto Price (USD)',
        data: dataChart&&dataChart.map((item)=>item.tokenAmount), // Y-axis data adjusted for sharper rises and falls
        borderColor: dataChart?.type !== "up" ? "#039855" : "#E1494C",
        backgroundColor: dataChart?.type == "up" ? "#039855" : "#E1494C",
        borderWidth: 2,
        tension: 0, // Disable curve for sharp angles
        pointRadius: 0, // Remove dots
      },
    ],
  };


  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Show legend for manual data
      },
      tooltip: {
        enabled: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Hide X-axis gridlines
        },
        ticks: {
          display: false, // Hide X-axis labels
        },
      },
      y: {
        beginAtZero: false,
        grid: {
          display: false, // Hide Y-axis gridlines
        },
        ticks: {
          display: false, // Hide Y-axis labels
        },
      },
    },
  };

  return <Line data={data} options={options} />;
}

export default ChartToken
