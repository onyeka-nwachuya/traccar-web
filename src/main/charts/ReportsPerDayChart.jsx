import React, { useMemo } from "react";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

/*
Aggregates event/report counts per day for the recent data available in Redux.
A historical server-side report will improve accuracy for long-term reporting.
*/

const ReportsPerDayChart = () => {
  const events = useSelector((state) => state.events.items || []);

  const data = useMemo(() => {
    const labels = Array.from({ length: 7 }, (_, index) =>
      dayjs().subtract(6 - index, "day").format("YYYY-MM-DD"),
    );

    const counts = labels.reduce((acc, label) => ({ ...acc, [label]: 0 }), {});

    events.forEach((event) => {
      const timestamp = event.serverTime || event.deviceTime || event.time;
      const day = timestamp ? dayjs(timestamp).format("YYYY-MM-DD") : null;
      if (day && counts[day] !== undefined) {
        counts[day] += 1;
      }
    });

    return {
      labels,
      datasets: [
        {
          label: "Reports per day",
          data: labels.map((day) => counts[day]),
          backgroundColor: "#4caf50",
          borderRadius: 6,
        },
      ],
    };
  }, [events]);

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
          ticks: { precision: 0 },
        },
      },
    }),
    [],
  );

  return <Bar data={data} options={options} />;
};

export default ReportsPerDayChart;
