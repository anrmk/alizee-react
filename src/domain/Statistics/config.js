export const useConfig = () => ({
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
      display: true,
      position: "top",
      align: "center",
      fullSize: true,
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
      ticks: {},
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
});

export const useChartData = (data) => {
  const colors = [
    "#ff335a",
    "#ff9501",
    "#67cc2e",
    "#3abfd3",
    "rgba(0, 99, 132, 1)",
    "rgba(255, 99, 0, 1)",
    "rgba(255, 99, 132, 1)",
  ];

  const labels = data.date;
  const datasets = data.dataset.map((item, idx) => ({
    label: item.title,
    maxBarThickness: 100,
    data: item.data,
    borderColor: colors[idx],
    backgroundColor: colors[idx],
  }));

  return {
    labels,
    datasets,
  };
};
