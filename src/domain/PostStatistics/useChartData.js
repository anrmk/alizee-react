const useChartData = (data) => {
  if (!data?.data) return null;
  const colors = [
    "#ff335a",
    "#ff9501",
    "#67cc2e",
    "#3abfd3",
    "rgba(0, 99, 132, 1)",
    "rgba(255, 99, 0, 1)",
    "rgba(255, 99, 132, 1)",
    "#47b7ab",
    "#951441",
  ];

  const labels = data.date;
  const datasets = data.data.map((item, idx) => ({
    label: item.title,
    maxBarThickness: 100,
    data: item.data,
    borderColor: colors[idx],
    backgroundColor: colors[idx],
    total: item.total,
  }));

  return {
    labels,
    datasets,
  };
};

export default useChartData;
