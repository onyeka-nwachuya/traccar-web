import React, { useMemo } from "react";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { distanceFromMeters } from "../../common/util/converter";
import { useAttributePreference } from "../../common/util/preferences";

/*
Displays device mileage using the available Traccar odometer fields.
For a true daily mileage report, use the server API or a historical report endpoint.
*/

const MileageChart = () => {
  const devices = useSelector((state) => state.devices.items || {});
  const positions = useSelector((state) => state.session.positions || {});
  const distanceUnit = useAttributePreference("distanceUnit", "km");

  const data = useMemo(() => {
    const mileage = Object.values(devices).map((device) => {
      const position = positions[device.id];
      const distanceMeters =
        (position?.attributes?.totalDistance || device?.attributes?.totalDistance || 0) * 1 || 0;
      return {
        name: device.name || `Device ${device.id}`,
        distance: distanceFromMeters(distanceMeters, distanceUnit),
      };
    });

    const sorted = mileage.sort((a, b) => b.distance - a.distance).slice(0, 8);

    return {
      labels: sorted.map((item) => item.name),
      datasets: [
        {
          label: `Mileage (${distanceUnit})`,
          data: sorted.map((item) => item.distance.toFixed(1)),
          backgroundColor: "#2196f3",
          borderRadius: 6,
        },
      ],
    };
  }, [devices, positions, distanceUnit]);

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
              return `${context.parsed.y} ${distanceUnit.toUpperCase()}`;
            },
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    }),
    [distanceUnit],
  );

  return <Bar data={data} options={options} />;
};

export default MileageChart;
