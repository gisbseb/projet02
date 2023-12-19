import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const MyChart = ({ data, chartId, label, getLabel, getValue, chartType }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    if (!data || data.length === 0) {
      return;
    }

    const labels = data.map(getLabel);
    const values = data.map(getValue);

    const ctx = document.getElementById(chartId);

    chartRef.current = new Chart(ctx, {
      type: chartType,
      data: {
        labels: labels,
        datasets: [
          {
            label: label,
            data: values,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });
  }, [data, chartId, label, getLabel, getValue]);

  return (
    <div className="container custom-chart">
      <h2>{label}</h2>
      <canvas id={chartId} width="300" height="300"></canvas>
    </div>
  );
};

export default MyChart;
