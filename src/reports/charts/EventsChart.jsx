import React, { useMemo } from "react";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";

/*
Active alarms and events chart for overspeed, geofence enter/exit.
Uses Traccar events held in the Redux store.
*/

const EventsChart = () => {
  const events = useSelector((state) => state.events.items || []);

  const data = useMemo(() => {
    const counts = {
      overspeed: 0,
      geofenceEnter: 0,
      geofenceExit: 0,
      harshBraking: 0,
      harshAcceleration: 0,
    };

    events.forEach((event) => {
      const key = event.type;
      if (counts[key] !== undefined) {
        counts[key]++;
      }
    });

    const labels = Object.keys(counts);
    const values = Object.values(counts);

    return {
      labels,
      datasets: [
        {
          label: "Event count",
          data: values,
          backgroundColor: ["#f44336", "#2196f3", "#ff9800", "#9c27b0", "#4caf50"],
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

export default EventsChart;