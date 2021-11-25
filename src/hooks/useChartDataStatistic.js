const useChartData = (data) => {
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

export default useChartData;
