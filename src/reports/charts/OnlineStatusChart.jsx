import React, { useMemo } from "react";
import { Doughnut } from "react-chartjs-2";
import { useSelector } from "react-redux";

/*
This chart uses the live Traccar session position data to show
how many devices are currently online vs offline.
*/

const OnlineStatusChart = () => {
  const devices = useSelector((state) => state.devices.items || {});
  const positions = useSelector((state) => state.session.positions || {});

  const data = useMemo(() => {
    const now = Date.now();
    let online = 0;
    let offline = 0;

    Object.values(devices).forEach((device) => {
      const position = positions[device.id];

      if (!position) {
        offline++;
        return;
      }

      const fixTime = new Date(position.fixTime).getTime();
      const diffMinutes = (now - fixTime) / 60000;

      if (diffMinutes <= 10) {
        online++;
      } else {
        offline++;
      }
    });

    return {
      labels: ["Online", "Offline"],
      datasets: [
        {
          data: [online, offline],
          backgroundColor: ["#4CAF50", "#F44336"],
          borderColor: ["#388E3C", "#D32F2F"],
          borderWidth: 2,
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

export default OnlineStatusChart;