const useChartConfig = () => {
  return {
    hover: {
      mode: "nearest",
      intersect: true,
    },

    plugins: {
      tooltip: {
        mode: "index",
        intersect: false,
      },
      interaction: {
        intersect: true,
      },

      legend: {
        display: false,
        labels: {
          color: "#000",
          boxWidth: 40,
          padding: 20,
          font: {
            size: 14,
          },
          boxHeight: 10,
        },
        title: {
          display: true,
          font: {
            size: 20,
            weight: "600",
          },
        },
      },
    },

    maintainAspectRatio: false,
    scales: {
      y: {
        display: true,
        grid: {
          display: false,
        },
      },
      x: {
        grid: {
          borderColor: "rgb(255, 255, 255,)",
          borderWidth: 2,
        },
      },
    },

    responsive: true,

    elements: {
      bar: {
        borderRadius: 6,
      },
      line: {
        tension: 0.3,
        borderWidth: 3,
      },
      point: {
        radius: 0,
        hoverRadius: 0,
      },
    },
  };
};

export default useChartConfig;
