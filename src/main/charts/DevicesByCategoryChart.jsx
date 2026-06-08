import React, { useMemo } from "react";
import { Pie } from "react-chartjs-2";
import { useSelector } from "react-redux";

/*
Displays device distribution by Traccar category values
such as Truck, Car, Bike, Generator.
*/

const DevicesByCategoryChart = () => {
  const devices = useSelector((state) => state.devices.items || {});

  const data = useMemo(() => {
    const categories = {};

    Object.values(devices).forEach((device) => {
      const category = device.category || device.attributes?.category || "Unknown";
      categories[category] = (categories[category] || 0) + 1;
    });

    return {
      labels: Object.keys(categories),
      datasets: [
        {
          data: Object.values(categories),
          backgroundColor: [
            "#3f51b5",
            "#ff9800",
            "#4caf50",
            "#f44336",
            "#9c27b0",
            "#00bcd4",
          ],
        },
      ],
    };
  }, [devices]);

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            usePointStyle: true,
            pointStyle: "circle",
            boxWidth: 12,
            padding: 14,
          },
        },
      },
    }),
    [],
  );

  return <Pie data={data} options={options} />;
};

export default DevicesByCategoryChart;