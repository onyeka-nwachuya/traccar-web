import React, { useMemo } from "react";
import { Doughnut } from "react-chartjs-2";
import { useSelector } from "react-redux";

/*
Counts how many devices reported a position in the last 24 hours.
This gives a strong indicator of fleet availability.
*/

const ActiveDevicesChart = () => {
  const devices = useSelector((state) => state.devices.items || {});
  const positions = useSelector((state) => state.session.positions || {});

  const data = useMemo(() => {
    const now = Date.now();
    let active = 0;
    let inactive = 0;

    Object.values(devices).forEach((device) => {
      const position = positions[device.id];
      if (position && now - new Date(position.fixTime).getTime() <= 24 * 60 * 60 * 1000) {
        active++;
      } else {
        inactive++;
      }
    });

    return {
      labels: ["Active (24h)", "Inactive"],
      datasets: [
        {
          data: [active, inactive],
          backgroundColor: ["#00bcd4", "#9e9e9e"],
          borderColor: ["#0288d1", "#616161"],
          borderWidth: 1,
        },
      ],
    };
  }, [devices, positions]);

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

  return <Doughnut data={data} options={options} />;
};

export default ActiveDevicesChart;
