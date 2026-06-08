import React, { useMemo } from "react";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";

/*
Tracks how many live positions are moving vs idling using Traccar motion flags.
This helps identify fleet activity and idle time trends.
*/

const IdleVsMovementChart = () => {
  const positions = useSelector((state) => state.session.positions || {});

  const data = useMemo(() => {
    let moving = 0;
    let idle = 0;

    Object.values(positions).forEach((position) => {
      if (position.attributes?.motion) {
        moving++;
      } else {
        idle++;
      }
    });

    return {
      labels: ["Moving", "Idle"],
      datasets: [
        {
          label: "Position count",
          data: [moving, idle],
          backgroundColor: ["#4caf50", "#ff9800"],
          borderRadius: 6,
        },
      ],
    };
  }, [positions]);

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
        x: {
          grid: { display: false },
        },
        y: {
          beginAtZero: true,
          ticks: { precision: 0 },
        },
      },
    }),
    [],
  );

  return <Bar data={data} options={options} />;
};

export default IdleVsMovementChart;