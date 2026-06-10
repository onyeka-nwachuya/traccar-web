import React, { useMemo } from "react";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { speedFromKnots } from "../../common/util/converter";

/*
Shows the devices with the highest current reported speed.
Useful for spotting the top speeding instances in live data.
*/

const TopSpeedChart = () => {
  const positions = useSelector((state) => state.session.positions || {});
  const devices = useSelector((state) => state.devices.items || {});

  const data = useMemo(() => {
    const speeds = Object.entries(positions)
      .map(([deviceId, position]) => ({
        deviceId,
        name: devices[deviceId]?.name || `Device ${deviceId}`,
        speed: speedFromKnots(position.speed || 0, "kmh"),
      }))
      .sort((a, b) => b.speed - a.speed)
      .slice(0, 8);

    return {
      labels: speeds.map((item) => item.name),
      datasets: [
        {
          label: "Speed (KM/H)",
          data: speeds.map((item) => item.speed.toFixed(1)),
          backgroundColor: "#f44336",
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
    [],
  );

  return <Bar data={data} options={options} />;
};

export default TopSpeedChart;
