import React, { useMemo } from "react";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { speedFromKnots } from "../../common/util/converter";

/*
Calculates maximum speed across live positions and groups by device category.
This gives a quick view of top fleet speed for each category.
*/

const AverageSpeedChart = () => {
  const positions = useSelector((state) => state.session.positions || {});
  const devices = useSelector((state) => state.devices.items || {});
  const speedUnit = "kmh";

  const data = useMemo(() => {
    const categoryStats = {};
    Object.entries(positions).forEach(([deviceId, position]) => {
      const speed = position.speed || 0;
      const device = devices[deviceId] || {};
      const category = device.category || device.attributes?.category || "Unknown";
      const convertedSpeed = speedFromKnots(speed, speedUnit);

      if (!categoryStats[category]) {
        categoryStats[category] = { max: 0 };
      }

      categoryStats[category].max = Math.max(categoryStats[category].max, convertedSpeed);
    });

    const chartData = Object.entries(categoryStats)
      .map(([category, stats]) => ({
        category,
        maxSpeed: stats.max,
      }))
      .sort((a, b) => b.maxSpeed - a.maxSpeed)
      .slice(0, 8);

    return {
      labels: chartData.map((item) => item.category),
      datasets: [
        {
          label: `Max speed (${speedUnit.toUpperCase()})`,
          data: chartData.map((item) => item.maxSpeed.toFixed(1)),
          backgroundColor: "#3f51b5",
          borderRadius: 6,
        },
      ],
    };
  }, [positions, devices]);

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: "bottom",
          labels: {
            usePointStyle: true,
            pointStyle: "circle",
            boxWidth: 12,
            padding: 14,
          },
        },
        tooltip: {
          callbacks: {
            label(context) {
              return `${context.parsed.y} KM/H`;
            },
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Speed (KM/H)",
          },
        },
      },
    }),
    [speedUnit],
  );

  return <Bar data={data} options={options} />;
};

export default AverageSpeedChart;
